#!/usr/bin/env python3
"""
PriceHunter Launcher Script:
Starts the FastAPI uvicorn server in background (if not already running),
waits for health check, and opens the default web browser.
"""

import os
import signal
import subprocess
import sys
import time
import urllib.request
import urllib.error

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VENV_PYTHON = os.path.join(BASE_DIR, ".venv", "bin", "python")
PID_FILE = os.path.join(BASE_DIR, "data", "pricehunter.pid")
LOG_FILE = os.path.join(BASE_DIR, "data", "app.log")
APP_URL = "http://127.0.0.1:8000"
HEALTH_URL = f"{APP_URL}/api/system/health"


def is_server_healthy() -> bool:
    try:
        req = urllib.request.Request(HEALTH_URL, headers={"User-Agent": "PriceHunterLauncher"})
        with urllib.request.urlopen(req, timeout=1.5) as resp:
            return resp.status == 200
    except Exception:
        return False


def notify_macos(title: str, message: str):
    try:
        apple_script = f'display notification "{message}" with title "{title}"'
        subprocess.run(["osascript", "-e", apple_script], check=False)
    except Exception:
        pass


def open_browser(url: str):
    subprocess.run(["open", url], check=False)


def start_server():
    os.makedirs(os.path.join(BASE_DIR, "data"), exist_ok=True)
    python_exec = VENV_PYTHON if os.path.exists(VENV_PYTHON) else sys.executable

    with open(LOG_FILE, "a") as log_f:
        proc = subprocess.Popen(
            [python_exec, "-m", "uvicorn", "app.main:app", "--host", "127.0.0.1", "--port", "8000"],
            cwd=BASE_DIR,
            stdout=log_f,
            stderr=log_f,
            preexec_fn=os.setpgrp,
        )
        with open(PID_FILE, "w") as pid_f:
            pid_f.write(str(proc.pid))
    return proc.pid


def main():
    print("🚀 Vérification de l'état de PriceHunter...")

    if is_server_healthy():
        print("✅ PriceHunter est déjà actif !")
        open_browser(APP_URL)
        notify_macos("PriceHunter", "Interface ouverte dans votre navigateur.")
        return

    print("⚡ Démarrage du serveur PriceHunter...")
    pid = start_server()
    print(f"📦 Processus serveur démarré (PID {pid}).")

    # Wait for server to become responsive
    max_wait = 10
    start_time = time.time()
    while time.time() - start_time < max_wait:
        if is_server_healthy():
            print(f"🎉 PriceHunter est prêt sur {APP_URL} !")
            open_browser(APP_URL)
            notify_macos("PriceHunter", "Application prête sur http://127.0.0.1:8000")
            return
        time.sleep(0.5)

    print("⚠️ Le serveur a mis plus de temps que prévu à démarrer.")
    open_browser(APP_URL)


if __name__ == "__main__":
    main()
