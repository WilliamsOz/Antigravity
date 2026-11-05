"""
System and lifecycle management API endpoints for PriceHunter.
"""

from datetime import datetime, timezone
import os
import signal
import threading
from fastapi import APIRouter

router = APIRouter(prefix="/system", tags=["System"])


@router.get("/health")
def health_check():
    return {
        "status": "healthy",
        "app": "PriceHunter",
        "version": "1.0.0",
        "pid": os.getpid(),
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@router.post("/shutdown")
def shutdown_app():
    def _kill():
        # Short delay to allow response to be transmitted
        import time
        time.sleep(0.6)
        os.kill(os.getpid(), signal.SIGINT)

    threading.Thread(target=_kill, daemon=True).start()
    return {
        "status": "shutdown_initiated",
        "message": "Le serveur PriceHunter s'arrête. Vous pouvez fermer cet onglet.",
    }
