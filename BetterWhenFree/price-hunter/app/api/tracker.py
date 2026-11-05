"""
Tracker API endpoints: asynchronous price checking and live status reporting.
"""

import asyncio
from datetime import datetime, timezone
import threading
from typing import Any, Dict, List, Optional
from fastapi import APIRouter, BackgroundTasks, HTTPException
from pydantic import BaseModel

from database import Database
from tracker import PriceTracker
from reporter import Reporter

router = APIRouter(prefix="/tracker", tags=["Tracker"])

db = Database()
tracker = PriceTracker(db=db)
reporter = Reporter(db=db)

# Global tracker state
class TrackerStateManager:
    def __init__(self):
        self.lock = threading.Lock()
        self.is_running = False
        self.total = 0
        self.progress = 0
        self.current_item = ""
        self.last_run: Optional[str] = None
        self.results: List[Dict[str, Any]] = []
        self.errors: List[str] = []

    def get_state(self) -> Dict[str, Any]:
        with self.lock:
            return {
                "is_running": self.is_running,
                "total": self.total,
                "progress": self.progress,
                "current_item": self.current_item,
                "last_run": self.last_run,
                "results": self.results[-15:],
                "errors": self.errors[-10:],
            }

    def start_check(self, product_id: Optional[int] = None):
        with self.lock:
            if self.is_running:
                return False
            self.is_running = True
            self.results = []
            self.errors = []
            self.progress = 0
            self.total = 1 if product_id else len(db.list_products(active_only=True))
            self.current_item = "Initialisation..."
        
        # Run scraping in worker thread
        threading.Thread(target=self._run_task, args=(product_id,), daemon=True).start()
        return True

    def _run_task(self, product_id: Optional[int]):
        try:
            if product_id:
                prod = db.get_product(product_id)
                if prod:
                    with self.lock:
                        self.current_item = prod["title"][:40]
                    res = tracker.check_product(product_id)
                    with self.lock:
                        self.results.append(res)
                        self.progress = 1
            else:
                products = db.list_products(active_only=True)
                with self.lock:
                    self.total = len(products)

                for idx, prod in enumerate(products, 1):
                    with self.lock:
                        self.current_item = prod["title"][:40]
                        self.progress = idx
                    try:
                        res = tracker.check_product(prod["id"])
                        with self.lock:
                            self.results.append(res)
                    except Exception as ex:
                        with self.lock:
                            self.errors.append(f"Erreur #{prod['id']}: {str(ex)}")

            # Refresh visual reports
            reporter.export_csv()
            reporter.export_history_csv()
            reporter.generate_html_dashboard()

        except Exception as e:
            with self.lock:
                self.errors.append(f"Erreur globale: {str(e)}")
        finally:
            with self.lock:
                self.is_running = False
                self.current_item = "Terminé"
                self.last_run = datetime.now(timezone.utc).isoformat()


state_manager = TrackerStateManager()


class CheckRequest(BaseModel):
    product_id: Optional[int] = None


@router.get("/status")
def get_tracker_status():
    return state_manager.get_state()


@router.post("/check")
def trigger_check(req: CheckRequest = CheckRequest()):
    started = state_manager.start_check(product_id=req.product_id)
    if not started:
        raise HTTPException(
            status_code=409,
            detail="Une vérification des prix est déjà en cours d'exécution.",
        )
    return {
        "status": "started",
        "message": "Vérification des prix lancée en tâche de fond",
    }
