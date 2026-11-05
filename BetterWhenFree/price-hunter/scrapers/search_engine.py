"""
Search engine scraper: searches for products by keyword across multiple stores
and returns ranked product offers (cheapest first).
"""

import base64
import re
import urllib.parse
from typing import Any, Dict, List, Optional
from bs4 import BeautifulSoup
import requests
from .universal_ldjson import UniversalJSONLDScraper
from .ecommerce import EcommerceScraper
from .browser import PlaywrightBrowser


class SearchEngineScraper:
    def __init__(self, timeout: int = 15):
        self.timeout = timeout
        self.headers = {
            "User-Agent": (
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/126.0.0.0 Safari/537.36"
            ),
            "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8",
        }
        self.browser = PlaywrightBrowser()
        self.ecommerce_scraper = EcommerceScraper(browser=self.browser)

    def search_and_compare(self, query: str, max_results: int = 5) -> List[Dict[str, Any]]:
        """Searches for a product by keyword and extracts offers from multiple retailers."""
        candidate_urls = self._find_product_urls(query, limit=8)
        results = []

        for item in candidate_urls:
            url = item.get("url")
            if not url:
                continue
            try:
                scraped = self.ecommerce_scraper.scrape(url)
                if scraped and scraped.get("price") is not None:
                    scraped["matched_query"] = query
                    scraped["search_snippet"] = item.get("title")
                    results.append(scraped)
                    if len(results) >= max_results:
                        break
            except Exception:
                continue

        # Sort by price ascending (cheapest first)
        results.sort(key=lambda x: x.get("price", float("inf")))
        return results

    def _find_product_urls(self, query: str, limit: int = 10) -> List[Dict[str, str]]:
        """Searches targeting French e-commerce platforms (direct Amazon search + Bing)."""
        found_links: List[Dict[str, str]] = []

        # 1. Direct Amazon France search (highly reliable and structured)
        try:
            amz_url = f"https://www.amazon.fr/s?k={urllib.parse.quote_plus(query)}"
            html = self.browser.fetch_page_content(amz_url)
            if html:
                soup = BeautifulSoup(html, "html.parser")
                for item in soup.find_all("div", {"data-component-type": "s-search-result"}):
                    link = item.find("a", class_="a-link-normal s-no-outline")
                    h2 = item.find("h2")
                    if link and link.get("href"):
                        href = link["href"]
                        if not href.startswith("http"):
                            href = "https://www.amazon.fr" + href
                        # Strip query params from Amazon product URL for cleanliness
                        clean_href = href.split("/ref=")[0] if "/ref=" in href else href
                        clean_href = clean_href.split("?")[0]
                        title = h2.get_text().strip() if h2 else ""
                        if self._is_product_url(clean_href) and not any(f["url"] == clean_href for f in found_links):
                            found_links.append({"url": clean_href, "title": title})
                        if len(found_links) >= limit:
                            return found_links
        except Exception:
            pass

        # 2. Bing Search targeting French stores
        target_sites = "site:amazon.fr OR site:fnac.com OR site:darty.com OR site:cdiscount.com OR site:decathlon.fr OR site:boulanger.com"
        search_query = f"{query} ({target_sites})"
        search_url = f"https://www.bing.com/search?q={urllib.parse.quote_plus(search_query)}"

        try:
            html = self.browser.fetch_page_content(search_url)
            if html:
                soup = BeautifulSoup(html, "html.parser")
                for h2 in soup.find_all("h2"):
                    a = h2.find("a")
                    if not a or not a.get("href"):
                        continue
                    
                    raw_href = a["href"]
                    actual_url = self._decode_bing_url(raw_href) or raw_href
                    title = a.get_text().strip()

                    if actual_url and self._is_product_url(actual_url):
                        if not any(f["url"] == actual_url for f in found_links):
                            found_links.append({"url": actual_url, "title": title})

                    if len(found_links) >= limit:
                        break
        except Exception:
            pass

        return found_links

    def _decode_bing_url(self, href: str) -> Optional[str]:
        if "bing.com/ck/a?" in href and "u=" in href:
            match = re.search(r"u=a1([a-zA-Z0-9_-]+)", href)
            if match:
                raw_b64 = match.group(1)
                # Pad to multiple of 4
                padded = raw_b64 + "=" * ((4 - len(raw_b64) % 4) % 4)
                try:
                    # Replace URL-safe chars if any
                    padded = padded.replace("-", "+").replace("_", "/")
                    decoded = base64.b64decode(padded.encode("ascii")).decode("utf-8", errors="ignore")
                    if decoded.startswith("http"):
                        # Clean tracking parameters like msockid
                        clean_url = decoded.split("?msockid=")[0]
                        return clean_url
                except Exception:
                    pass
        return None

    def _is_product_url(self, url: str) -> bool:
        url_lower = url.lower()
        blacklisted_patterns = ["/recherche", "/s?", "/search", "/category", "/rayon", "/c/", "/bons-plans", "lesnumeriques.com", "frandroid.com", "lefigaro.fr"]
        if any(p in url_lower for p in blacklisted_patterns):
            return False

        allowed_domains = ["amazon.fr", "fnac.com", "darty.com", "cdiscount.com", "decathlon.fr", "boulanger.com"]
        return any(d in url_lower for d in allowed_domains)
