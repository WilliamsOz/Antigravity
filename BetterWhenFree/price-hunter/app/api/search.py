"""
Search & Comparator API endpoints for PriceHunter.
"""

from typing import Optional
from fastapi import APIRouter, Query
from scrapers import SearchEngineScraper

router = APIRouter(prefix="/search", tags=["Search"])

scraper = SearchEngineScraper()


@router.get("")
def search_offers(
    q: str = Query(..., min_length=2, description="Search keywords"),
    limit: int = Query(default=10, ge=1, le=30, description="Max results"),
):
    results = scraper.search_and_compare(q, max_results=limit)
    return {
        "query": q,
        "count": len(results),
        "results": results,
    }
