#!/usr/bin/env python3
import json
import os
import sys
from pathlib import Path

PROJECTS = [
    {
        "id": "b6c5bde0-52eb-4473-8781-731c1cf350db",
        "name": "LifeStyle",
        "folder": "LifeStyle",
    },
    {
        "id": "e323a621-a1e8-40ea-aae1-765193d5f076",
        "name": "Blender",
        "folder": "Blender_Agentic",
    },
    {
        "id": "2a6cff8e-6f29-4f99-b122-6472140faff2",
        "name": "Photoshop_Agentic",
        "folder": "Photoshop_Agentic",
    },
    {
        "id": "fd7ba934-38aa-4acb-a8af-e0220179f098",
        "name": "Local_Agentic",
        "folder": "Local_Agentic",
    },
]

def setup():
    script_dir = Path(__file__).resolve().parent
    repo_root = script_dir.parent

    home = Path.home()
    config_dir = home / ".gemini" / "config"
    projects_dir = config_dir / "projects"
    projects_dir.mkdir(parents=True, exist_ok=True)

    print(f"-> Configuration d'Antigravity pour : {home.name}")
    print(f"-> Dossier cible : {projects_dir}")

    for proj in PROJECTS:
        proj_folder = repo_root / proj["folder"]
        if not proj_folder.exists():
            print(f"  [!] Dossier introuvable : {proj_folder}")
            continue

        folder_uri = proj_folder.resolve().as_uri()
        project_config = {
            "id": proj["id"],
            "name": proj["name"],
            "projectResources": {
                "resources": [
                    {
                        "folderUri": folder_uri
                    }
                ]
            },
            "settings": {},
            "isWorkspaceOnly": False
        }

        target_file = projects_dir / f"{proj['id']}.json"
        with open(target_file, "w", encoding="utf-8") as f:
            json.dump(project_config, f, indent=2)

        print(f"  [OK] Projet configure : {proj['name']} -> {folder_uri}")

    agents_src = script_dir / "AGENTS.md"
    agents_dst = config_dir / "AGENTS.md"
    if agents_src.exists():
        if os.name != "nt":
            try:
                if agents_dst.is_symlink() or agents_dst.exists():
                    agents_dst.unlink()
                agents_dst.symlink_to(agents_src)
                print(f"  [OK] Lien symbolique cree : {agents_dst} -> {agents_src}")
            except Exception:
                import shutil
                shutil.copyfile(agents_src, agents_dst)
                print(f"  [OK] AGENTS.md copie vers {agents_dst}")
        else:
            import shutil
            shutil.copyfile(agents_src, agents_dst)
            print(f"  [OK] AGENTS.md copie vers {agents_dst}")

    print("\nTous les projets ont ete enregistres avec succes dans Antigravity !")
    print("Relance l'application Antigravity pour voir tes 4 projets dans la barre laterale.")

if __name__ == "__main__":
    setup()
