# BetterWhenFree - Workspace Overview & Guidelines

Bienvenue dans le workspace **BetterWhenFree**.
L'objectif de cet espace est de regrouper des outils, scripts, automatisations et compétences pour obtenir des produits, services et biens au meilleur prix possible (ou gratuitement).

## Projets Actifs
- **`price-hunter/`** : Moteur de scraping de prix, comparateur multi-catégories (High-Tech, Sport, Vêtements, Alimentation/Drive) et système d'alerte en temps réel (Discord, Telegram, macOS).

## Règles de Développement
1. **Zéro coût & Économie de tokens** : Privilégier le scraping déterministe en Python local (Playwright Stealth, parsing JSON-LD) pour ne pas gaspiller de tokens d'IA sur du HTML brut.
2. **Modularité** : Chaque sous-projet dans `BetterWhenFree/` doit être autonome avec son propre environnement virtuel ou configuration, tout en partageant les compétences Antigravity définies dans `.agents/skills/`.
3. **Sécurité des identifiants** : Ne jamais stocker de tokens de bot, webhooks ou clés d'API directement dans le code source ; utiliser `config.json` ou un fichier `.env`.
4. **Données locales** : Stocker les historiques et bases de données dans `price-hunter/data/` (fichiers SQLite).
