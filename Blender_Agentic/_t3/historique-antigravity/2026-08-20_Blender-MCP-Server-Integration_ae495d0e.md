# Blender MCP Server Integration

- Conversation Antigravity : `ae495d0e-d042-4d0e-8fbf-c1305d91d074` (thread T3 : `import:antigravity:ae495d0e-d042-4d0e-8fbf-c1305d91d074`)
- Dernière modification : 2026-08-20 14:58:31.0386223+00:00
- Workspaces d'origine : ["file:///d%3A/Antigravity/Blender_Agentic"]
- Artefacts : aucun

## Williams

J'aimerais que tu connecte le MCP blender le plus performant actuellement.

## Agent

Le MCP **`blender-mcp`** (le standard de référence le plus complet et performant de l'écosystème) a été configuré et connecté.

### 1. Actions réalisées

* **Gestionnaire `uv` / `uvx`** : Installé dans `C:\Users\willi\.local\bin` et ajouté au `PATH` utilisateur.
* **Addon Blender (`blender_mcp.py`)** : Déployé automatiquement dans les répertoires d'extensions/addons Blender 5.0 et 5.2 (`%APPDATA%\Blender Foundation\Blender\<version>\scripts\addons`).
* **Configuration MCP globale (`~/.gemini/config/mcp_config.json`)** :
  ```json
  "blender": {
      "command": "C:/Users/willi/.local/bin/uvx.exe",
      "args": ["blender-mcp"],
      "env": {
          "PYTHONIOENCODING": "utf-8",
          "PYTHONWARNINGS": "ignore",
          "BLENDER_MCP_TELEMETRY": "false"
      }
  }
  ```
* **Règles locales** : Directives créées dans [`D:\Antigravity\Blender_Agentic\GEMINI.md`](file:///D:/Antigravity/Blender_Agentic/GEMINI.md).

---

### 2. Activation côté Blender

1. Ouvrir **Blender** (5.0 ou 5.2).
2. Vérifier dans **Edit > Preferences > Add-ons** que **`Interface: Blender MCP`** est coché.
3. Dans la vue 3D (Viewport), appuyer sur **`N`** pour ouvrir le volet latéral.
4. Ouvrir l'onglet **BlenderMCP** et cliquer sur **Start MCP Server** (écoute sur `localhost:9876`).

---

### 3. Capacités disponibles via le bridge

* **Exécution Python live** (`execute_blender_code`) : Pilotage complet de l'API `bpy`.
* **Inspection** (`get_scene_info`, `get_object_info`) : Arborescence, maillages, modificateurs, matériaux.
* **Feedback visuel** (`get_viewport_screenshot`) : Capture directe du viewport dans le contexte.
* **Assets & Génération 3D** : Intégrations Poly Haven, Sketchfab, Hyper3D / Hunyuan3D.
