# Directives Projet - Blender Agentic

## 1. Contexte & Outils
- **MCP Server** : `blender-mcp` (ahujasid) exécuté via `uvx`.
- **Addon Blender** : `Interface: Blender MCP` installé dans Blender 5.0, 5.1 & 5.2 (`scripts/addons/blender_mcp.py`).
- **Port de communication** : Socket local `localhost:9876`.

## 2. Workflow Opérationnel
- **Activation dans Blender** :
  1. Ouvrir Blender.
  2. Vérifier que l'addon **Interface: Blender MCP** est activé dans `Edit > Preferences > Add-ons`.
  3. Dans la vue 3D, ouvrir le panneau latéral (`N`), onglet **BlenderMCP**.
  4. Cliquer sur **Start MCP Server**.
- **Capacités** :
  - Exécution de code Python `bpy` (`execute_blender_code`).
  - Inspection de scène et objets (`get_scene_info`, `get_object_info`).
  - Capture visuelle du viewport (`get_viewport_screenshot`).
  - Import et gestion Poly Haven / Sketchfab / Générateurs 3D.


## Règles T3 Code (prioritaires)

Avant toute tâche, lis et applique `T3_RULES.md` (dans ce même dossier).
