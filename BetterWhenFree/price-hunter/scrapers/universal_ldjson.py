"""
Universal scraper based on JSON-LD (schema.org/Product) and OpenGraph metadata.
Extracts product price and details without relying on brittle CSS selectors.
"""

import json
import re
from typing import Any, Dict, Optional
from urllib.parse import urlparse
from bs4 import BeautifulSoup
import requests


class UniversalJSONLDScraper:
    def __init__(self, timeout: int = 15):
        self.timeout = timeout
        self.headers = {
            "User-Agent": (
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/126.0.0.0 Safari/537.36"
            ),
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
        }

    def fetch_and_extract(self, url: str) -> Optional[Dict[str, Any]]:
        try:
            response = requests.get(url, headers=self.headers, timeout=self.timeout, allow_redirects=True)
            if response.status_code != 200:
                return None
            return self.extract_from_html(response.text, url)
        except Exception:
            return None

    def extract_from_html(self, html: str, url: str = "") -> Optional[Dict[str, Any]]:
        soup = BeautifulSoup(html, "html.parser")
        
        # 1. Try JSON-LD schema.org
        ld_result = self._extract_ld_json(soup)
        if ld_result and ld_result.get("price"):
            return ld_result
            
        # 2. Try OpenGraph / Twitter meta tags
        og_result = self._extract_meta_tags(soup)
        if og_result and og_result.get("price"):
            return og_result

        # 3. Try Microdata itemprop="price"
        micro_result = self._extract_microdata(soup)
        if micro_result and micro_result.get("price"):
            return micro_result

        return None

    def _extract_ld_json(self, soup: BeautifulSoup) -> Optional[Dict[str, Any]]:
        scripts = soup.find_all("script", type="application/ld+json")
        for script in scripts:
            if not script.string:
                continue
            try:
                data = json.loads(script.string.strip())
                product_data = self._find_product_in_json(data)
                if product_data:
                    res = self._parse_schema_product(product_data)
                    if res and res.get("price"):
                        return res
            except Exception:
                continue
        return None

    def _find_product_in_json(self, data: Any) -> Optional[Dict[str, Any]]:
        if isinstance(data, dict):
            t = data.get("@type", "")
            if isinstance(t, list) and any("Product" in str(item) for item in t):
                return data
            if isinstance(t, str) and "Product" in t:
                return data
            if "@graph" in data and isinstance(data["@graph"], list):
                for item in data["@graph"]:
                    found = self._find_product_in_json(item)
                    if found:
                        return found
            for k, v in data.items():
                if isinstance(v, (dict, list)):
                    found = self._find_product_in_json(v)
                    if found:
                        return found
        elif isinstance(data, list):
            for item in data:
                found = self._find_product_in_json(item)
                if found:
                    return found
        return None

    def _parse_schema_product(self, prod: Dict[str, Any]) -> Dict[str, Any]:
        title = prod.get("name") or prod.get("title")
        image = prod.get("image")
        image_url = None
        if isinstance(image, str):
            image_url = image
        elif isinstance(image, list) and image:
            image_url = image[0] if isinstance(image[0], str) else image[0].get("url")
        elif isinstance(image, dict):
            image_url = image.get("url")

        brand = None
        if "brand" in prod:
            if isinstance(prod["brand"], dict):
                brand = prod["brand"].get("name")
            elif isinstance(prod["brand"], str):
                brand = prod["brand"]

        offers = prod.get("offers")
        price = None
        original_price = None
        currency = "EUR"
        availability = True
        seller = None

        offer_list = []
        if isinstance(offers, dict):
            if "@graph" in offers:
                offer_list = offers["@graph"]
            elif "offers" in offers and isinstance(offers["offers"], list):
                offer_list = offers["offers"]
            else:
                offer_list = [offers]
        elif isinstance(offers, list):
            offer_list = offers

        if offer_list:
            prices = []
            for off in offer_list:
                if not isinstance(off, dict):
                    continue
                p = off.get("price") or off.get("lowPrice") or off.get("priceSpecification", {}).get("price")
                if p is not None:
                    p_clean = self._clean_price(p)
                    if p_clean is not None:
                        prices.append(p_clean)
                
                curr = off.get("priceCurrency") or off.get("priceSpecification", {}).get("priceCurrency")
                if curr:
                    currency = curr
                
                avail = str(off.get("availability", ""))
                if "OutOfStock" in avail or "Discontinued" in avail:
                    availability = False
                
                if "seller" in off:
                    if isinstance(off["seller"], dict):
                        seller = off["seller"].get("name")
                    elif isinstance(off["seller"], str):
                        seller = off["seller"]

            if prices:
                price = min(prices)
                if len(prices) > 1 and max(prices) > price:
                    original_price = max(prices)

        return {
            "title": str(title).strip() if title else None,
            "price": price,
            "original_price": original_price,
            "currency": currency,
            "availability": availability,
            "image_url": image_url,
            "seller": seller,
            "brand": brand,
        }

    def _extract_meta_tags(self, soup: BeautifulSoup) -> Dict[str, Any]:
        title = None
        price = None
        currency = "EUR"
        image_url = None

        og_title = soup.find("meta", property="og:title") or soup.find("meta", attrs={"name": "twitter:title"})
        if og_title and og_title.get("content"):
            title = og_title["content"].strip()

        og_image = soup.find("meta", property="og:image") or soup.find("meta", attrs={"name": "twitter:image"})
        if og_image and og_image.get("content"):
            image_url = og_image["content"].strip()

        price_meta = (
            soup.find("meta", property="product:price:amount")
            or soup.find("meta", property="og:price:amount")
            or soup.find("meta", attrs={"name": "twitter:data1"})
        )
        if price_meta and price_meta.get("content"):
            price = self._clean_price(price_meta["content"])

        curr_meta = soup.find("meta", property="product:price:currency") or soup.find("meta", property="og:price:currency")
        if curr_meta and curr_meta.get("content"):
            currency = curr_meta["content"].strip()

        return {
            "title": title,
            "price": price,
            "original_price": None,
            "currency": currency,
            "availability": True,
            "image_url": image_url,
            "seller": None,
            "brand": None,
        }

    def _extract_microdata(self, soup: BeautifulSoup) -> Dict[str, Any]:
        price_elem = soup.find(attrs={"itemprop": "price"})
        price = None
        if price_elem:
            val = price_elem.get("content") or price_elem.get_text()
            price = self._clean_price(val)

        title_elem = soup.find(attrs={"itemprop": "name"})
        title = title_elem.get_text().strip() if title_elem else None

        return {
            "title": title,
            "price": price,
            "original_price": None,
            "currency": "EUR",
            "availability": True,
            "image_url": None,
            "seller": None,
            "brand": None,
        }

    @staticmethod
    def _clean_price(val: Any) -> Optional[float]:
        if val is None:
            return None
        if isinstance(val, (int, float)):
            return float(val)
        val_str = str(val).replace("\xa0", " ").replace("€", "").replace("$", "").replace("£", "").strip()
        # Handle french decimal comma: '199,99' -> '199.99'
        match = re.search(r"(\d+[\s\d]*[.,]?\d*)", val_str)
        if not match:
            return None
        raw_num = match.group(1).replace(" ", "")
        if "," in raw_num and "." in raw_num:
            # 1.299,99 -> 1299.99
            raw_num = raw_num.replace(".", "").replace(",", ".")
        elif "," in raw_num:
            raw_num = raw_num.replace(",", ".")
        try:
            p = float(raw_num)
            return round(p, 2)
        except ValueError:
            return None
