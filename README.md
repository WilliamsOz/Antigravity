# Antigravity Workspace

Espace de travail et synchronisation cross-platform (Windows & macOS) pour l'environnement Antigravity et les projets associés.

## Architecture

```
Antigravity/
├── .gemini_config/      # Configuration globale de l'agent (AGENTS.md, templates MCP)
├── Blender_Agentic/     # Outils et scripts Blender
├── LifeStyle/           # Projets personnels, santé, sport et routines
├── Local_Agentic/       # Automatisations locales
└── Photoshop_Agentic/   # MCP et intégrations Photoshop
```

## Synchronisation Machine

### Sur Windows
La configuration globale de l'agent est liée à `C:\Users\<user>\.gemini\config\`.

### Sur macOS
1. Cloner ce dépôt :
   ```bash
   git clone https://github.com/WilliamsOz/Antigravity.git ~/Antigravity
   ```
2. Lier ou copier la configuration globale :
   ```bash
   mkdir -p ~/.gemini/config
   cp ~/Antigravity/.gemini_config/AGENTS.md ~/.gemini/config/AGENTS.md
   ```
3. Configurer `~/.gemini/config/mcp_config.json` en adaptant les commandes Node/uvx locales.
