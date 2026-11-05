#!/usr/bin/env python3
"""
PriceHunter Stopper Script:
Gracefully terminates any running PriceHunter server instance.
"""

import os
import signal
import subprocess
import time
import urllib.request

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PID_FILE = os.path.join(BASE_DIR, "data", "pricehunter.pid")
SHUTDOWN_URL = "http://127.0.0.1:8000/api/system/shutdown"


def notify_macos(title: str, message: str):
    try:
        apple_script = f'display notification "{message}" with title "{title}"'
        subprocess.run(["osascript", "-e", apple_script], check=False)
    except Exception:
        pass


def stop_via_api() -> bool:
    try:
        req = urllib.request.Request(SHUTDOWN_URL, data=b"", method="POST")
        with urllib.request.urlopen(req, timeout=2.0) as resp:
            return resp.status == 200
    except Exception:
        return False


def main():
    print("🛑 Arrêt de PriceHunter...")
    stopped = False

    if stop_via_api():
        print("✅ Signal d'extinction envoyé avec succès via l'API.")
        stopped = True
        time.sleep(1.0)

    # Fallback to PID file if needed
    if os.path.exists(PID_FILE):
        try:
            with open(PID_FILE, "r") as f:
                pid = int(f.read().strip())
            print(f"Tentative d'arrêt du processus PID {pid}...")
            os.kill(pid, signal.SIGTERM)
            time.sleep(0.5)
            stopped = True
        except Exception:
            pass
        finally:
            if os.path.exists(PID_FILE):
                os.remove(PID_FILE)

    if stopped:
        print("🎉 PriceHunter a été arrêté.")
        notify_macos("PriceHunter", "L'application a été arrêtée avec succès.")
    else:
        print("ℹ️ Aucun processus PriceHunter actif trouvé.")


if __name__ == "__main__":
    main()
