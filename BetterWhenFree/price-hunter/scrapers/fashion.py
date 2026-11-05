"""
Fashion and second-hand scrapers for Vinted, Zalando, ASOS, Leboncoin, etc.
"""

import json
import re
from typing import Any, Dict, Optional
from urllib.parse import urlparse
from bs4 import BeautifulSoup
from .universal_ldjson import UniversalJSONLDScraper
from .browser import PlaywrightBrowser


class FashionScraper:
    def __init__(self, browser: Optional[PlaywrightBrowser] = None):
        self.ldjson_scraper = UniversalJSONLDScraper()
        self.browser = browser or PlaywrightBrowser()

    def scrape(self, url: str) -> Optional[Dict[str, Any]]:
        domain = self._get_domain(url)

        # 1. Fast check via Universal JSON-LD (often works for Zalando & Leboncoin)
        data = self.ldjson_scraper.fetch_and_extract(url)
        if data and data.get("price") and data.get("title"):
            data["store"] = domain
            data["url"] = url
            return data

        # 2. Render through Playwright Stealth for anti-bot pages (like Vinted)
        html = self.browser.fetch_page_content(url)
        if not html:
            return None

        # Re-check JSON-LD on rendered HTML
        data = self.ldjson_scraper.extract_from_html(html, url)
        if data and data.get("price") and data.get("title"):
            data["store"] = domain
            data["url"] = url
            return data

        # 3. Custom site extractors
        soup = BeautifulSoup(html, "html.parser")
        parsed = None
        if "vinted" in domain:
            parsed = self._parse_vinted(soup)
        elif "leboncoin" in domain:
            parsed = self._parse_leboncoin(soup)
        elif "zalando" in domain:
            parsed = self._parse_zalando(soup)

        if parsed and parsed.get("price") is not None:
            parsed["store"] = domain
            parsed["url"] = url
            return parsed

        return None

    def _get_domain(self, url: str) -> str:
        netloc = urlparse(url).netloc.lower()
        if netloc.startswith("www."):
            netloc = netloc[4:]
        return netloc

    def _parse_vinted(self, soup: BeautifulSoup) -> Dict[str, Any]:
        title = None
        title_el = soup.find("h1", class_="web_ui__Text__title") or soup.find("h1")
        if title_el:
            title = title_el.get_text().strip()

        price = None
        price_el = soup.find("h2", attrs={"data-testid": "item-price"}) or soup.find("h2")
        if price_el:
            price = UniversalJSONLDScraper._clean_price(price_el.get_text())

        # Vinted sometimes embeds data in __NEXT_DATA__
        next_data = soup.find("script", id="__NEXT_DATA__")
        if next_data and next_data.string:
            try:
                js_data = json.loads(next_data.string)
                item_data = js_data.get("props", {}).get("pageProps", {}).get("item", {})
                if item_data:
                    title = title or item_data.get("title")
                    p_val = item_data.get("price", {}).get("amount") or item_data.get("total_item_price")
                    if p_val:
                        price = UniversalJSONLDScraper._clean_price(p_val)
            except Exception:
                pass

        return {
            "title": title,
            "price": price,
            "original_price": None,
            "currency": "EUR",
            "availability": True,
            "image_url": None,
            "seller": "Vinted Seller",
        }

    def _parse_leboncoin(self, soup: BeautifulSoup) -> Dict[str, Any]:
        title_el = soup.find("h1", attrs={"data-qa-id": "adview_title"}) or soup.find("h1")
        title = title_el.get_text().strip() if title_el else None

        price_el = soup.find(attrs={"data-qa-id": "adview_price"}) or soup.find(attrs={"itemprop": "price"})
        price = UniversalJSONLDScraper._clean_price(price_el.get_text()) if price_el else None

        return {
            "title": title,
            "price": price,
            "original_price": None,
            "currency": "EUR",
            "availability": True,
            "image_url": None,
            "seller": "Leboncoin Particulier",
        }

    def _parse_zalando(self, soup: BeautifulSoup) -> Dict[str, Any]:
        title_el = soup.find("h1")
        title = title_el.get_text().strip() if title_el else None

        price_el = soup.find("span", class_="sDq_FX") or soup.find("p", class_="sDq_FX")
        price = UniversalJSONLDScraper._clean_price(price_el.get_text()) if price_el else None

        return {
            "title": title,
            "price": price,
            "original_price": None,
            "currency": "EUR",
            "availability": True,
            "image_url": None,
            "seller": "Zalando",
        }
