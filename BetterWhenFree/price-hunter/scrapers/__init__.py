"""
Scrapers package for PriceHunter.
Contains specialized scrapers, browser automation, and universal JSON-LD extractor.
"""

from .universal_ldjson import UniversalJSONLDScraper
from .browser import PlaywrightBrowser
from .ecommerce import EcommerceScraper
from .fashion import FashionScraper
from .food_drive import FoodDriveScraper
from .search_engine import SearchEngineScraper

__all__ = [
    "UniversalJSONLDScraper",
    "PlaywrightBrowser",
    "EcommerceScraper",
    "FashionScraper",
    "FoodDriveScraper",
    "SearchEngineScraper",
]
