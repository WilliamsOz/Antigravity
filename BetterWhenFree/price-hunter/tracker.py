"""
PriceTracker orchestrator:
Coordinates scrapers, database storage, and alert triggers.
"""

from typing import Any, Dict, List, Optional
from urllib.parse import urlparse
from database import Database
from notifier import Notifier
from scrapers import (
    EcommerceScraper,
    FashionScraper,
    FoodDriveScraper,
    SearchEngineScraper,
    UniversalJSONLDScraper,
)


class PriceTracker:
    def __init__(self, db: Optional[Database] = None, notifier: Optional[Notifier] = None):
        self.db = db or Database()
        self.notifier = notifier or Notifier()
        self.universal_scraper = UniversalJSONLDScraper()
        self.ecommerce_scraper = EcommerceScraper()
        self.fashion_scraper = FashionScraper()
        self.food_scraper = FoodDriveScraper()
        self.search_engine = SearchEngineScraper()

    def add_item_by_url(
        self,
        url: str,
        category: str = "general",
        target_price: Optional[float] = None,
        discount_threshold_pct: float = 15.0,
    ) -> Dict[str, Any]:
        """Scrapes the URL, adds it to tracked products, and records initial price."""
        scraped = self._scrape_url(url, category)
        if not scraped or scraped.get("price") is None:
            raise ValueError(f"Impossible d'extraire le prix depuis l'URL: {url}")

        title = scraped.get("title") or "Produit sans titre"
        price = scraped["price"]
        original_price = scraped.get("original_price")
        store = scraped.get("store") or self._extract_domain(url)
        image_url = scraped.get("image_url")
        seller = scraped.get("seller")
        currency = scraped.get("currency", "EUR")

        product_id = self.db.add_product(
            title=title,
            url=url,
            category=category,
            target_price=target_price,
            discount_threshold_pct=discount_threshold_pct,
            store=store,
            image_url=image_url,
        )

        self.db.record_price(
            product_id=product_id,
            price=price,
            original_price=original_price,
            currency=currency,
            is_available=scraped.get("availability", True),
            seller=seller,
        )

        return {
            "product_id": product_id,
            "title": title,
            "url": url,
            "price": price,
            "original_price": original_price,
            "currency": currency,
            "store": store,
            "target_price": target_price,
        }

    def search_and_add_best(
        self,
        query: str,
        category: str = "general",
        target_price: Optional[float] = None,
    ) -> Optional[Dict[str, Any]]:
        """Searches for top offers and adds the best one to tracking."""
        results = self.search_engine.search_and_compare(query, max_results=5)
        if not results:
            return None

        best_offer = results[0]
        return self.add_item_by_url(
            url=best_offer["url"],
            category=category,
            target_price=target_price,
        )

    def check_product(self, product_id: int) -> Dict[str, Any]:
        """Checks a single product, records price, and sends alerts if a drop occurred."""
        product = self.db.get_product(product_id)
        if not product:
            return {"error": "Produit introuvable"}

        url = product["url"]
        category = product.get("category", "general")
        scraped = self._scrape_url(url, category)

        if not scraped or scraped.get("price") is None:
            return {"status": "error", "message": "Scraping échoué", "product": product}

        new_price = scraped["price"]
        prev_price_record = self.db.get_latest_price(product_id)
        old_price = prev_price_record["price"] if prev_price_record else new_price
        initial_record = self.db.get_initial_price(product_id)
        initial_price = initial_record["price"] if initial_record else old_price

        # Record new snapshot in history
        self.db.record_price(
            product_id=product_id,
            price=new_price,
            original_price=scraped.get("original_price"),
            currency=scraped.get("currency", "EUR"),
            is_available=scraped.get("availability", True),
            seller=scraped.get("seller"),
        )

        alert_triggered = False
        alert_reason = ""
        target_price = product.get("target_price")
        threshold_pct = product.get("discount_threshold_pct", 15.0)

        # Condition 1: Target price reached
        if target_price and new_price <= target_price and old_price > target_price:
            alert_triggered = True
            alert_reason = f"🎯 Prix cible atteint ({new_price:.2f}€ <= {target_price:.2f}€) !"

        # Condition 2: Significant price drop compared to initial or previous price
        elif new_price < old_price:
            diff = old_price - new_price
            drop_pct = (diff / old_price * 100) if old_price > 0 else 0
            if drop_pct >= threshold_pct or (new_price < initial_price and (initial_price - new_price) / initial_price * 100 >= threshold_pct):
                alert_triggered = True
                alert_reason = f"📉 Baisse de {drop_pct:.1f}% détectée !"
            elif new_price < old_price:
                alert_reason = f"Petite baisse de {drop_pct:.1f}%"

        if alert_triggered:
            diff = old_price - new_price
            drop_pct = (diff / old_price * 100) if old_price > 0 else 0.0
            self.notifier.send_price_drop_alert(product, old_price, new_price, alert_reason)
            self.db.record_alert(
                product_id=product_id,
                old_price=old_price,
                new_price=new_price,
                discount_pct=drop_pct,
                alert_type="drop",
                channel="multi",
            )

        return {
            "status": "success",
            "product_id": product_id,
            "title": product["title"],
            "old_price": old_price,
            "new_price": new_price,
            "diff": round(old_price - new_price, 2),
            "alert_triggered": alert_triggered,
            "reason": alert_reason,
        }

    def check_all_products(self) -> List[Dict[str, Any]]:
        """Checks all active products in database."""
        products = self.db.list_products(active_only=True)
        results = []
        for p in products:
            res = self.check_product(p["id"])
            results.append(res)
        return results

    def _scrape_url(self, url: str, category: str = "general") -> Optional[Dict[str, Any]]:
        domain = self._extract_domain(url)

        if "vinted" in domain or "leboncoin" in domain or category == "fashion":
            return self.fashion_scraper.scrape(url)
        elif "leclerc" in domain or "carrefour" in domain or "auchan" in domain or category == "food":
            return self.food_scraper.scrape(url)
        elif any(k in domain for k in ["amazon", "fnac", "darty", "cdiscount", "decathlon", "boulanger"]):
            return self.ecommerce_scraper.scrape(url)
        else:
            # Universal fallback
            data = self.universal_scraper.fetch_and_extract(url)
            if data and data.get("price"):
                data["store"] = domain
                data["url"] = url
                return data
            return self.ecommerce_scraper.scrape(url)

    def _extract_domain(self, url: str) -> str:
        netloc = urlparse(url).netloc.lower()
        if netloc.startswith("www."):
            netloc = netloc[4:]
        return netloc
