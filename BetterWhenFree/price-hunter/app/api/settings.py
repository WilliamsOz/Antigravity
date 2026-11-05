"""
Settings, alert configuration, and scheduler management API endpoints.
"""

import json
import os
import subprocess
from typing import Any, Dict, Optional
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from notifier import Notifier
from database import Database

router = APIRouter(prefix="/settings", tags=["Settings"])

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CONFIG_PATH = os.path.join(BASE_DIR, "config.json")
PLIST_PATH = os.path.expanduser("~/Library/LaunchAgents/com.betterwhenfree.pricehunter.plist")

notifier = Notifier(config_path=CONFIG_PATH)
db = Database()


class SettingsUpdateRequest(BaseModel):
    currency: Optional[str] = None
    default_discount_threshold_percent: Optional[float] = None
    macos_banner_enabled: Optional[bool] = None
    discord_enabled: Optional[bool] = None
    discord_webhook_url: Optional[str] = None
    telegram_enabled: Optional[bool] = None
    telegram_bot_token: Optional[str] = None
    telegram_chat_id: Optional[str] = None
    scheduler_interval_hours: Optional[int] = Field(default=None, ge=1, le=48)


class TestAlertRequest(BaseModel):
    channel: str = Field(default="all", description="'all', 'macos', 'discord', 'telegram'")


class CronToggleRequest(BaseModel):
    enabled: bool


def _load_config() -> Dict[str, Any]:
    if os.path.exists(CONFIG_PATH):
        try:
            with open(CONFIG_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return {}


def _save_config(data: Dict[str, Any]):
    with open(CONFIG_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


@router.get("")
def get_settings():
    cfg = _load_config()
    products = db.list_products(active_only=False)
    db_size = os.path.getsize(db.db_path) if os.path.exists(db.db_path) else 0

    cron_installed = os.path.exists(PLIST_PATH)

    return {
        "config": cfg,
        "cron_installed": cron_installed,
        "scheduler_interval_hours": cfg.get("scheduler", {}).get("interval_hours", 6),
        "stats": {
            "total_products": len(products),
            "active_products": len([p for p in products if p.get("is_active", 1)]),
            "db_size_kb": round(db_size / 1024, 1),
            "db_path": db.db_path,
        },
    }


@router.post("")
def update_settings(req: SettingsUpdateRequest):
    cfg = _load_config()
    
    if "general" not in cfg:
        cfg["general"] = {}
    if "alerts" not in cfg:
        cfg["alerts"] = {}
    if "scheduler" not in cfg:
        cfg["scheduler"] = {}

    if req.currency is not None:
        cfg["general"]["currency"] = req.currency

    if req.default_discount_threshold_percent is not None:
        cfg["alerts"]["default_discount_threshold_percent"] = req.default_discount_threshold_percent

    if req.macos_banner_enabled is not None:
        cfg["alerts"]["macos_banner_enabled"] = req.macos_banner_enabled

    if "discord" not in cfg["alerts"]:
        cfg["alerts"]["discord"] = {}
    if req.discord_enabled is not None:
        cfg["alerts"]["discord"]["enabled"] = req.discord_enabled
    if req.discord_webhook_url is not None:
        cfg["alerts"]["discord"]["webhook_url"] = req.discord_webhook_url

    if "telegram" not in cfg["alerts"]:
        cfg["alerts"]["telegram"] = {}
    if req.telegram_enabled is not None:
        cfg["alerts"]["telegram"]["enabled"] = req.telegram_enabled
    if req.telegram_bot_token is not None:
        cfg["alerts"]["telegram"]["bot_token"] = req.telegram_bot_token
    if req.telegram_chat_id is not None:
        cfg["alerts"]["telegram"]["chat_id"] = req.telegram_chat_id

    if req.scheduler_interval_hours is not None:
        cfg["scheduler"]["interval_hours"] = req.scheduler_interval_hours

    _save_config(cfg)
    return {"status": "success", "message": "Paramètres enregistrés avec succès", "config": cfg}


@router.post("/test-alert")
def trigger_test_alert(req: TestAlertRequest = TestAlertRequest()):
    test_prod = {
        "title": "Produit Démo - Test de Notification PriceHunter",
        "url": "https://betterwhenfree.local",
        "store": "PriceHunter Démo",
        "target_price": 199.99,
        "image_url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    }
    
    results = {}
    cfg = _load_config().get("alerts", {})

    # macOS banner
    if req.channel in ["all", "macos"]:
        results["macos"] = notifier.send_macos_notification(
            title="🎯 PriceHunter Test",
            subtitle="199.99€ (-25.0%)",
            message="Le système d'alerte macOS fonctionne parfaitement !",
        )

    # Discord
    if req.channel in ["all", "discord"]:
        discord_cfg = cfg.get("discord", {})
        webhook = discord_cfg.get("webhook_url")
        if webhook:
            results["discord"] = notifier.send_discord_alert(
                title=test_prod["title"],
                url=test_prod["url"],
                store=test_prod["store"],
                old_price=269.99,
                new_price=199.99,
                discount_pct=25.9,
                target_price=test_prod["target_price"],
                image_url=test_prod["image_url"],
                webhook_url=webhook,
            )
        else:
            results["discord"] = False

    # Telegram
    if req.channel in ["all", "telegram"]:
        telegram_cfg = cfg.get("telegram", {})
        bot_token = telegram_cfg.get("bot_token")
        chat_id = telegram_cfg.get("chat_id")
        if bot_token and chat_id:
            results["telegram"] = notifier.send_telegram_alert(
                title=test_prod["title"],
                url=test_prod["url"],
                store=test_prod["store"],
                old_price=269.99,
                new_price=199.99,
                discount_pct=25.9,
                target_price=test_prod["target_price"],
                bot_token=bot_token,
                chat_id=chat_id,
            )
        else:
            results["telegram"] = False

    return {
        "status": "success",
        "channel": req.channel,
        "results": results,
    }


@router.post("/cron/toggle")
def toggle_cron(req: CronToggleRequest):
    if req.enabled:
        setup_script = os.path.join(BASE_DIR, "setup_cron.sh")
        res = subprocess.run(["bash", setup_script], capture_output=True, text=True)
        if res.returncode == 0:
            return {"status": "success", "enabled": True, "message": "Tâche LaunchAgent macOS activée (3x/jour)"}
        else:
            raise HTTPException(status_code=500, detail=f"Échec de l'activation du cron: {res.stderr}")
    else:
        if os.path.exists(PLIST_PATH):
            subprocess.run(["launchctl", "unload", PLIST_PATH], capture_output=True)
            try:
                os.remove(PLIST_PATH)
            except Exception:
                pass
        return {"status": "success", "enabled": False, "message": "Tâche LaunchAgent macOS désactivée"}
