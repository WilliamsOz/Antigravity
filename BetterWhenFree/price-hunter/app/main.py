"""
PriceHunter Main FastAPI Application
"""

from contextlib import asynccontextmanager
import json
import os
import sys
from typing import Optional

# Ensure project root is in sys.path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from apscheduler.schedulers.background import BackgroundScheduler

from app.api.products import router as products_router
from app.api.tracker import router as tracker_router, state_manager
from app.api.search import router as search_router
from app.api.settings import router as settings_router
from app.api.system import router as system_router

from database import Database
from tracker import PriceTracker
from reporter import Reporter

# Background scheduler instance
scheduler = BackgroundScheduler(daemon=True)


def scheduled_price_check():
    """Periodic price check triggered by in-app scheduler."""
    print("⏰ [APScheduler] Démarrage du cycle de vérification automatique des prix...")
    state_manager.start_check()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    cfg_path = os.path.join(BASE_DIR, "config.json")
    interval_hours = 6
    if os.path.exists(cfg_path):
        try:
            with open(cfg_path, "r", encoding="utf-8") as f:
                cfg = json.load(f)
                interval_hours = cfg.get("scheduler", {}).get("interval_hours", 6)
        except Exception:
            pass

    if interval_hours and interval_hours > 0:
        scheduler.add_job(
            scheduled_price_check,
            "interval",
            hours=interval_hours,
            id="periodic_price_check",
            replace_existing=True,
        )
        scheduler.start()
        print(f"🚀 [APScheduler] Planificateur automatique actif (toutes les {interval_hours}h).")

    yield

    # Shutdown
    if scheduler.running:
        scheduler.shutdown(wait=False)
        print("🛑 [APScheduler] Planificateur arrêté.")


app = FastAPI(
    title="PriceHunter",
    description="Application locale de suivi et comparaison de prix multi-boutiques",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files & templates
static_dir = os.path.join(os.path.dirname(__file__), "static")
templates_dir = os.path.join(os.path.dirname(__file__), "templates")

os.makedirs(static_dir, exist_ok=True)
os.makedirs(templates_dir, exist_ok=True)

app.mount("/static", StaticFiles(directory=static_dir), name="static")
templates = Jinja2Templates(directory=templates_dir)

# Register API routers
app.include_router(products_router, prefix="/api")
app.include_router(tracker_router, prefix="/api")
app.include_router(search_router, prefix="/api")
app.include_router(settings_router, prefix="/api")
app.include_router(system_router, prefix="/api")


@app.get("/")
def render_index(request: Request):
    return templates.TemplateResponse(request, "index.html")
