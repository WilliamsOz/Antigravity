"""
Food and supermarket drive scraper (Leclerc Drive, Carrefour Drive, Auchan, Intermarché).
Handles local store selection and per-unit price extraction.
"""

from typing import Any, Dict, Optional
from urllib.parse import urlparse
from bs4 import BeautifulSoup
from .universal_ldjson import UniversalJSONLDScraper
from .browser import PlaywrightBrowser


class FoodDriveScraper:
    def __init__(self, postal_code: str = "75001", browser: Optional[PlaywrightBrowser] = None):
        self.postal_code = postal_code
        self.ldjson_scraper = UniversalJSONLDScraper()
        self.browser = browser or PlaywrightBrowser()

    def scrape(self, url: str) -> Optional[Dict[str, Any]]:
        domain = self._get_domain(url)

        # 1. Fast JSON-LD extract (Carrefour heavily utilizes JSON-LD)
        data = self.ldjson_scraper.fetch_and_extract(url)
        if data and data.get("price") and data.get("title"):
            data["store"] = domain
            data["url"] = url
            return data

        # 2. Render via Playwright
        html = self.browser.fetch_page_content(url)
        if not html:
            return None

        # Re-check JSON-LD
        data = self.ldjson_scraper.extract_from_html(html, url)
        if data and data.get("price") and data.get("title"):
            data["store"] = domain
            data["url"] = url
            return data

        # 3. Custom site parse
        soup = BeautifulSoup(html, "html.parser")
        parsed = None
        if "leclerc" in domain:
            parsed = self._parse_leclerc(soup)
        elif "carrefour" in domain:
            parsed = self._parse_carrefour(soup)
        elif "auchan" in domain:
            parsed = self._parse_auchan(soup)

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

    def _parse_leclerc(self, soup: BeautifulSoup) -> Dict[str, Any]:
        title_el = soup.find("h1", class_="product-title") or soup.find("h1")
        title = title_el.get_text().strip() if title_el else None

        price_el = (
            soup.find("span", class_="price")
            or soup.find("div", class_="prix-container")
            or soup.find("p", class_="product-price")
        )
        price = UniversalJSONLDScraper._clean_price(price_el.get_text()) if price_el else None

        return {
            "title": title,
            "price": price,
            "original_price": None,
            "currency": "EUR",
            "availability": True,
            "image_url": None,
            "seller": "E.Leclerc Drive",
        }

    def _parse_carrefour(self, soup: BeautifulSoup) -> Dict[str, Any]:
        title_el = soup.find("h1", class_="product-header__title") or soup.find("h1")
        title = title_el.get_text().strip() if title_el else None

        price_el = soup.find("div", class_="product-price__amount") or soup.find("span", class_="product-card-price")
        price = UniversalJSONLDScraper._clean_price(price_el.get_text()) if price_el else None

        return {
            "title": title,
            "price": price,
            "original_price": None,
            "currency": "EUR",
            "availability": True,
            "image_url": None,
            "seller": "Carrefour Drive",
        }

    def _parse_auchan(self, soup: BeautifulSoup) -> Dict[str, Any]:
        title_el = soup.find("h1", class_="product-detail--title") or soup.find("h1")
        title = title_el.get_text().strip() if title_el else None

        price_el = soup.find("span", class_="product-price--current") or soup.find("div", class_="product-price")
        price = UniversalJSONLDScraper._clean_price(price_el.get_text()) if price_el else None

        return {
            "title": title,
            "price": price,
            "original_price": None,
            "currency": "EUR",
            "availability": True,
            "image_url": None,
            "seller": "Auchan Drive",
        }
