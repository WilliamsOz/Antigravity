"""
Products API endpoints for PriceHunter.
"""

from typing import Any, Dict, List, Optional
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field

from database import Database
from tracker import PriceTracker
from reporter import Reporter

router = APIRouter(prefix="/products", tags=["Products"])

db = Database()
tracker = PriceTracker(db=db)
reporter = Reporter(db=db)


class ProductCreateRequest(BaseModel):
    type: str = Field(default="url", description="'url' or 'search'")
    value: str = Field(..., description="Product URL or search query keywords")
    target_price: Optional[float] = Field(default=None, description="Optional target price in EUR")
    discount_threshold_pct: float = Field(default=15.0, description="Discount notification threshold %")
    category: str = Field(default="general", description="Product category")


class ProductUpdateRequest(BaseModel):
    target_price: Optional[float] = None
    discount_threshold_pct: Optional[float] = None
    is_active: Optional[bool] = None
    category: Optional[str] = None
    title: Optional[str] = None


def _format_product(p: Dict[str, Any], db_instance: Database) -> Dict[str, Any]:
    prod_id = p["id"]
    latest = db_instance.get_latest_price(prod_id)
    initial = db_instance.get_initial_price(prod_id)
    lowest = db_instance.get_lowest_price(prod_id)

    curr_price = latest["price"] if latest else None
    orig_price = latest.get("original_price") if latest else None
    init_price = initial["price"] if initial else curr_price
    low_price = lowest["price"] if lowest else curr_price

    # Evolution calculation
    evo_pct = 0.0
    evo_amount = 0.0
    if curr_price is not None and init_price and init_price > 0:
        evo_amount = round(init_price - curr_price, 2)
        evo_pct = round(((init_price - curr_price) / init_price) * 100, 1)

    target_price = p.get("target_price")
    target_reached = False
    if target_price is not None and curr_price is not None:
        target_reached = curr_price <= target_price

    return {
        "id": p["id"],
        "title": p["title"],
        "url": p["url"],
        "category": p.get("category", "general"),
        "store": p.get("store") or "Boutique",
        "image_url": p.get("image_url") or "",
        "target_price": target_price,
        "discount_threshold_pct": p.get("discount_threshold_pct", 15.0),
        "is_active": bool(p.get("is_active", 1)),
        "created_at": str(p.get("created_at", ""))[:19],
        "updated_at": str(p.get("updated_at", ""))[:19],
        "current_price": curr_price,
        "original_price": orig_price,
        "initial_price": init_price,
        "lowest_price": low_price,
        "is_available": bool(latest.get("is_available", 1)) if latest else True,
        "seller": latest.get("seller") if latest else None,
        "last_scraped_at": str(latest["recorded_at"])[:19] if latest and latest.get("recorded_at") else str(p.get("updated_at", ""))[:19],
        "evolution_pct": evo_pct,
        "evolution_amount": evo_amount,
        "target_reached": target_reached,
    }


@router.get("")
def list_products(
    category: Optional[str] = None,
    q: Optional[str] = None,
    active_only: bool = False,
):
    products = db.list_products(active_only=active_only, category=category)
    result = []
    for p in products:
        item = _format_product(p, db)
        if q:
            q_lower = q.lower()
            if q_lower not in item["title"].lower() and q_lower not in (item["store"] or "").lower():
                continue
        result.append(item)
    return {"count": len(result), "products": result}


@router.get("/{product_id}")
def get_product(product_id: int):
    prod = db.get_product(product_id)
    if not prod:
        raise HTTPException(status_code=404, detail="Produit introuvable")
    return _format_product(prod, db)


@router.post("")
def add_product(req: ProductCreateRequest):
    try:
        if req.type == "search" or not req.value.startswith("http"):
            res = tracker.search_and_add_best(
                query=req.value,
                category=req.category,
                target_price=req.target_price,
            )
            if not res:
                raise HTTPException(
                    status_code=404,
                    detail=f"Aucune offre trouvée pour la recherche '{req.value}'",
                )
            prod_id = res["product_id"]
        else:
            res = tracker.add_item_by_url(
                url=req.value,
                category=req.category,
                target_price=req.target_price,
                discount_threshold_pct=req.discount_threshold_pct,
            )
            prod_id = res["product_id"]

        # Refresh reports
        reporter.export_csv()
        reporter.export_history_csv()
        reporter.generate_html_dashboard()

        prod = db.get_product(prod_id)
        return {
            "status": "success",
            "message": "Produit ajouté avec succès au suivi",
            "product": _format_product(prod, db) if prod else res,
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de l'ajout: {str(e)}")


@router.put("/{product_id}")
def update_product(product_id: int, req: ProductUpdateRequest):
    prod = db.get_product(product_id)
    if not prod:
        raise HTTPException(status_code=404, detail="Produit introuvable")

    success = db.update_product(
        product_id=product_id,
        target_price=req.target_price,
        discount_threshold_pct=req.discount_threshold_pct,
        is_active=req.is_active,
        category=req.category,
        title=req.title,
    )
    if not success:
        return {"status": "unchanged", "message": "Aucun champ modifié"}

    reporter.export_csv()
    reporter.generate_html_dashboard()

    updated = db.get_product(product_id)
    return {
        "status": "success",
        "message": "Produit mis à jour",
        "product": _format_product(updated, db),
    }


@router.delete("/{product_id}")
def delete_product(product_id: int):
    prod = db.get_product(product_id)
    if not prod:
        raise HTTPException(status_code=404, detail="Produit introuvable")

    success = db.delete_product(product_id)
    if success:
        reporter.export_csv()
        reporter.export_history_csv()
        reporter.generate_html_dashboard()
        return {"status": "success", "message": f"Produit #{product_id} supprimé"}
    raise HTTPException(status_code=500, detail="Échec de suppression")


@router.get("/{product_id}/history")
def get_product_history(product_id: int, limit: int = Query(default=60, ge=1, le=200)):
    prod = db.get_product(product_id)
    if not prod:
        raise HTTPException(status_code=404, detail="Produit introuvable")

    history = db.get_price_history(product_id, limit=limit)
    # Return chronologically ascending for charts
    chronological = list(reversed(history))

    points = []
    for h in chronological:
        points.append({
            "recorded_at": str(h["recorded_at"])[:19],
            "price": h["price"],
            "original_price": h.get("original_price"),
            "shipping_cost": h.get("shipping_cost", 0.0),
            "is_available": bool(h.get("is_available", 1)),
            "seller": h.get("seller") or "",
        })

    return {
        "product_id": product_id,
        "title": prod["title"],
        "target_price": prod.get("target_price"),
        "points": points,
    }
