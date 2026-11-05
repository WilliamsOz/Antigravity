"""
Multi-channel notification engine for PriceHunter:
Supports Discord Webhooks (rich embeds), Telegram Bot, and native macOS desktop alerts.
"""

import json
import os
import subprocess
from typing import Any, Dict, Optional
import requests


class Notifier:
    def __init__(self, config_path: Optional[str] = None):
        if config_path is None:
            base_dir = os.path.dirname(os.path.abspath(__file__))
            config_path = os.path.join(base_dir, "config.json")
        
        self.config_path = config_path
        self.config = self._load_config()

    def _load_config(self) -> Dict[str, Any]:
        if os.path.exists(self.config_path):
            try:
                with open(self.config_path, "r", encoding="utf-8") as f:
                    return json.load(f)
            except Exception:
                pass
        return {}

    def send_price_drop_alert(
        self,
        product: Dict[str, Any],
        old_price: float,
        new_price: float,
        alert_reason: str = "Baisse de prix détectée !",
    ) -> Dict[str, bool]:
        """Dispatches notification to all configured and enabled channels."""
        # Reload config in case it changed
        self.config = self._load_config()
        alerts_cfg = self.config.get("alerts", {})

        diff = old_price - new_price
        discount_pct = (diff / old_price * 100) if old_price > 0 else 0.0

        title = product.get("title", "Produit")
        url = product.get("url", "")
        store = product.get("store", "Boutique")
        image_url = product.get("image_url")
        target_price = product.get("target_price")

        results = {
            "macos": False,
            "discord": False,
            "telegram": False,
        }

        # 1. macOS Native Banner
        if alerts_cfg.get("macos_banner_enabled", True):
            results["macos"] = self.send_macos_notification(
                title=f"🔥 Alerte Prix : {store}",
                subtitle=f"{new_price:.2f}€ (-{discount_pct:.1f}%)",
                message=f"{title[:60]}... Ancien prix: {old_price:.2f}€",
            )

        # 2. Discord Webhook
        discord_cfg = alerts_cfg.get("discord", {})
        webhook_url = discord_cfg.get("webhook_url") or os.getenv("DISCORD_WEBHOOK_URL")
        if discord_cfg.get("enabled", False) and webhook_url:
            results["discord"] = self.send_discord_alert(
                title=title,
                url=url,
                store=store,
                old_price=old_price,
                new_price=new_price,
                discount_pct=discount_pct,
                target_price=target_price,
                image_url=image_url,
                alert_reason=alert_reason,
                webhook_url=webhook_url,
            )

        # 3. Telegram Bot
        tg_cfg = alerts_cfg.get("telegram", {})
        bot_token = tg_cfg.get("bot_token") or os.getenv("TELEGRAM_BOT_TOKEN")
        chat_id = tg_cfg.get("chat_id") or os.getenv("TELEGRAM_CHAT_ID")
        if tg_cfg.get("enabled", False) and bot_token and chat_id:
            results["telegram"] = self.send_telegram_alert(
                title=title,
                url=url,
                store=store,
                old_price=old_price,
                new_price=new_price,
                discount_pct=discount_pct,
                target_price=target_price,
                bot_token=bot_token,
                chat_id=chat_id,
            )

        return results

    def send_macos_notification(self, title: str, subtitle: str, message: str) -> bool:
        """Triggers a native macOS banner notification via AppleScript."""
        try:
            clean_title = title.replace('"', '\\"')
            clean_sub = subtitle.replace('"', '\\"')
            clean_msg = message.replace('"', '\\"')
            script = f'display notification "{clean_msg}" with title "{clean_title}" subtitle "{clean_sub}" sound name "Glass"'
            subprocess.run(["osascript", "-e", script], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            return True
        except Exception:
            return False

    def send_discord_alert(
        self,
        title: str,
        url: str,
        store: str,
        old_price: float,
        new_price: float,
        discount_pct: float,
        target_price: Optional[float],
        image_url: Optional[str],
        alert_reason: str,
        webhook_url: str,
    ) -> bool:
        """Sends a rich Discord embed card with product details."""
        try:
            fields = [
                {"name": "Nouveau Prix", "value": f"**{new_price:.2f} €**", "inline": True},
                {"name": "Ancien Prix", "value": f"~~{old_price:.2f} €~~", "inline": True},
                {"name": "Économie", "value": f"**-{discount_pct:.1f}%** (-{old_price - new_price:.2f} €)", "inline": True},
                {"name": "Boutique", "value": store, "inline": True},
            ]
            if target_price:
                fields.append({"name": "Prix Cible", "value": f"{target_price:.2f} €", "inline": True})

            embed = {
                "title": f"🚨 {title[:200]}",
                "url": url,
                "description": f"**{alert_reason}**\n[👉 Voir l'offre sur {store}]({url})",
                "color": 0x00FF88 if discount_pct >= 20 else 0xFF9900,
                "fields": fields,
                "footer": {"text": "BetterWhenFree • PriceHunter"},
            }
            if image_url:
                embed["thumbnail"] = {"url": image_url}

            payload = {
                "username": "PriceHunter Bot",
                "embeds": [embed],
            }
            resp = requests.post(webhook_url, json=payload, timeout=10)
            return resp.status_code in [200, 204]
        except Exception:
            return False

    def send_telegram_alert(
        self,
        title: str,
        url: str,
        store: str,
        old_price: float,
        new_price: float,
        discount_pct: float,
        target_price: Optional[float],
        bot_token: str,
        chat_id: str,
    ) -> bool:
        """Sends a formatted message via Telegram Bot API."""
        try:
            text = (
                f"🔥 *Alerte Baisse de Prix !*\n\n"
                f"📦 *{title}*\n"
                f"🏪 Boutique: `{store}`\n"
                f"💰 *Nouveau prix:* *{new_price:.2f} €* (~~{old_price:.2f} €~~)\n"
                f"📉 *Remise:* `-{discount_pct:.1f}%` (-{old_price - new_price:.2f} €)\n"
            )
            if target_price:
                text += f"🎯 *Prix cible fixé:* {target_price:.2f} €\n"
            
            text += f"\n👉 [Accéder à l'offre directement]({url})"

            api_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
            payload = {
                "chat_id": chat_id,
                "text": text,
                "parse_mode": "Markdown",
                "disable_web_page_preview": False,
            }
            resp = requests.post(api_url, json=payload, timeout=10)
            return resp.status_code == 200
        except Exception:
            return False
