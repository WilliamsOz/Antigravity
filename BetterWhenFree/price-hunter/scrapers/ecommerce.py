"""
Specialized e-commerce scraper for major marketplaces:
Amazon, Fnac, Darty, Cdiscount, Decathlon, Boulanger, etc.
"""

import re
from typing import Any, Dict, Optional
from urllib.parse import urlparse
from bs4 import BeautifulSoup
from .universal_ldjson import UniversalJSONLDScraper
from .browser import PlaywrightBrowser


class EcommerceScraper:
    def __init__(self, browser: Optional[PlaywrightBrowser] = None):
        self.ldjson_scraper = UniversalJSONLDScraper()
        self.browser = browser or PlaywrightBrowser()

    def scrape(self, url: str) -> Optional[Dict[str, Any]]:
        domain = self._get_domain(url)

        # 1. First attempt: Fast Universal JSON-LD / HTTP parsing
        data = self.ldjson_scraper.fetch_and_extract(url)
        if data and data.get("price") and data.get("title"):
            data["store"] = domain
            data["url"] = url
            return data

        # 2. Second attempt: Headless Playwright Stealth for dynamic DOM or JS protections
        html = self.browser.fetch_page_content(url)
        if not html:
            return None

        # Re-check JSON-LD on fully rendered HTML
        data = self.ldjson_scraper.extract_from_html(html, url)
        if data and data.get("price") and data.get("title"):
            data["store"] = domain
            data["url"] = url
            return data

        # 3. Fallback to site-specific DOM parsing
        soup = BeautifulSoup(html, "html.parser")
        parsed = None
        if "amazon" in domain:
            parsed = self._parse_amazon(soup)
        elif "fnac" in domain:
            parsed = self._parse_fnac(soup)
        elif "darty" in domain:
            parsed = self._parse_darty(soup)
        elif "cdiscount" in domain:
            parsed = self._parse_cdiscount(soup)
        elif "decathlon" in domain:
            parsed = self._parse_decathlon(soup)
        elif "boulanger" in domain:
            parsed = self._parse_boulanger(soup)

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

    def _parse_amazon(self, soup: BeautifulSoup) -> Dict[str, Any]:
        title_el = soup.find(id="productTitle")
        title = title_el.get_text().strip() if title_el else None

        price = None
        # Whole + fraction price
        whole = soup.find("span", class_="a-price-whole")
        fraction = soup.find("span", class_="a-price-fraction")
        if whole:
            w_text = whole.get_text().replace(",", "").replace(".", "").strip()
            f_text = fraction.get_text().strip() if fraction else "00"
            price = UniversalJSONLDScraper._clean_price(f"{w_text}.{f_text}")
        
        if price is None:
            price_el = soup.find("span", class_="a-offscreen") or soup.find(id="priceblock_ourprice")
            if price_el:
                price = UniversalJSONLDScraper._clean_price(price_el.get_text())

        orig_price = None
        basis_price_el = soup.find("span", class_="a-price a-text-price")
        if basis_price_el:
            off_el = basis_price_el.find("span", class_="a-offscreen")
            if off_el:
                orig_price = UniversalJSONLDScraper._clean_price(off_el.get_text())

        image_el = soup.find(id="landingImage")
        image_url = image_el.get("src") if image_el else None

        availability = True
        avail_el = soup.find(id="availability")
        if avail_el and "actuellement indisponible" in avail_el.get_text().lower():
            availability = False

        return {
            "title": title,
            "price": price,
            "original_price": orig_price,
            "currency": "EUR",
            "availability": availability,
            "image_url": image_url,
            "seller": "Amazon",
        }

    def _parse_fnac(self, soup: BeautifulSoup) -> Dict[str, Any]:
        title_el = soup.find("h1", class_="f-productHeader-Title") or soup.find("h1")
        title = title_el.get_text().strip() if title_el else None

        price_el = soup.find("span", class_="f-priceBox-price") or soup.find("span", class_="userPrice")
        price = UniversalJSONLDScraper._clean_price(price_el.get_text()) if price_el else None

        orig_price_el = soup.find("span", class_="f-priceBox-oldPrice") or soup.find("span", class_="oldPrice")
        orig_price = UniversalJSONLDScraper._clean_price(orig_price_el.get_text()) if orig_price_el else None

        return {
            "title": title,
            "price": price,
            "original_price": orig_price,
            "currency": "EUR",
            "availability": True,
            "image_url": None,
            "seller": "Fnac",
        }

    def _parse_darty(self, soup: BeautifulSoup) -> Dict[str, Any]:
        title_el = soup.find("h1", class_="product-title") or soup.find("h1")
        title = title_el.get_text().strip() if title_el else None

        price_el = soup.find("div", class_="product-price__main") or soup.find("span", class_="price")
        price = UniversalJSONLDScraper._clean_price(price_el.get_text()) if price_el else None

        return {
            "title": title,
            "price": price,
            "original_price": None,
            "currency": "EUR",
            "availability": True,
            "image_url": None,
            "seller": "Darty",
        }

    def _parse_cdiscount(self, soup: BeautifulSoup) -> Dict[str, Any]:
        title_el = soup.find("h1", attrs={"itemprop": "name"}) or soup.find("h1")
        title = title_el.get_text().strip() if title_el else None

        price_el = soup.find("span", class_="fpPrice") or soup.find("span", attrs={"itemprop": "price"})
        price = UniversalJSONLDScraper._clean_price(price_el.get_text()) if price_el else None

        return {
            "title": title,
            "price": price,
            "original_price": None,
            "currency": "EUR",
            "availability": True,
            "image_url": None,
            "seller": "Cdiscount",
        }

    def _parse_decathlon(self, soup: BeautifulSoup) -> Dict[str, Any]:
        title_el = soup.find("h1", class_="vtmn-title-1") or soup.find("h1")
        title = title_el.get_text().strip() if title_el else None

        price_el = soup.find("span", class_="vtmn-price") or soup.find("span", class_="price")
        price = UniversalJSONLDScraper._clean_price(price_el.get_text()) if price_el else None

        return {
            "title": title,
            "price": price,
            "original_price": None,
            "currency": "EUR",
            "availability": True,
            "image_url": None,
            "seller": "Decathlon",
        }

    def _parse_boulanger(self, soup: BeautifulSoup) -> Dict[str, Any]:
        title_el = soup.find("h1", class_="product-title") or soup.find("h1")
        title = title_el.get_text().strip() if title_el else None

        price_el = soup.find("span", class_="price__amount") or soup.find("span", class_="price")
        price = UniversalJSONLDScraper._clean_price(price_el.get_text()) if price_el else None

        return {
            "title": title,
            "price": price,
            "original_price": None,
            "currency": "EUR",
            "availability": True,
            "image_url": None,
            "seller": "Boulanger",
        }
