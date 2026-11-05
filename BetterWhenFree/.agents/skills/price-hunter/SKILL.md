---
name: price-hunter
description: >-
  Suivi et comparaison de prix multi-catégories (High-Tech, Sport, Vêtements/Mode, Alimentation/Drive).
  À activer dès que l'utilisateur souhaite chercher le meilleur prix pour un objet, ajouter un produit
  à sa liste de suivi, vérifier les baisses de prix actuelles, consulter l'historique ou configurer ses alertes.
---

# Skill : PriceHunter (Comparateur & Traqueur de Prix Local)

Ce skill permet à l'agent d'interagir avec le moteur local **PriceHunter** situé dans `workdirectory/BetterWhenFree/price-hunter/`.
Toutes les opérations de scraping et de calcul de prix s'exécutent en local via Python et Playwright (0 coût, 0 token d'IA consommé pendant l'extraction).

---

## 🛠️ Commandes CLI et Exécution

L'interpréteur Python virtuel du projet est :
`PROJECT_DIR=/Users/willyiony/workdirectory/BetterWhenFree/price-hunter`
`PYTHON="$PROJECT_DIR/.venv/bin/python"`
`CLI="$PROJECT_DIR/cli.py"`

### 1. Ajouter un produit à suivre
Quand l'utilisateur donne un lien ou un nom de produit avec optionnellement un prix cible :
```bash
# Ajout par URL directe (ex: Amazon, Fnac, Decathlon, Vinted, Carrefour...)
$PYTHON $CLI add "https://..." --target 150.00 --category "high-tech"

# Ajout par recherche automatique (si l'utilisateur donne juste un nom)
$PYTHON $CLI add "Sony WH-1000XM5" --query --target 280.00 --category "high-tech"
```

### 2. Rechercher et comparer les meilleures offres
Quand l'utilisateur veut juste comparer les prix sans forcément ajouter l'objet à sa liste :
```bash
$PYTHON $CLI search "Chaussures Nike Pegasus 40" --limit 5 --json
```

### 3. Lister les produits suivis
```bash
$PYTHON $CLI list --json
```

### 4. Vérifier les prix et déclencher les alertes
Lance un cycle de scraping sur tous les produits enregistrés :
```bash
$PYTHON $CLI check --json
```

### 5. Consulter l'historique d'un produit
```bash
$PYTHON $CLI history <ID_PRODUIT> --json
```

### 6. Supprimer un produit du suivi
```bash
$PYTHON $CLI delete <ID_PRODUIT>
```

### 7. Tester les alertes (Mac, Discord, Telegram)
```bash
$PYTHON $CLI test-alert
```

### 8. Activer la tâche de fond automatique (3x / jour)
```bash
bash "$PROJECT_DIR/setup_cron.sh"
```

### 9. Lancer l'Application Web & Bureau PriceHunter
```bash
# Lancement direct via script
$PYTHON "$PROJECT_DIR/scripts/run_app.py"

# Ou arrêt de l'application
$PYTHON "$PROJECT_DIR/scripts/stop_app.py"

# Sur macOS Finder : double-cliquer sur PriceHunter.app ou PriceHunter.command
```
L'application démarre le serveur FastAPI local (`http://127.0.0.1:8000`) et ouvre automatiquement le navigateur avec le centre de contrôle interactif complet (gestion des produits, graphiques Chart.js, comparateur multi-boutiques en direct, barre de scraping temps réel et configuration des alertes).

---

## 📋 Directives de Restitution pour l'Agent

1. **Recherche rapide ou ajout simple** :
   * Répondre directement dans le fil de discussion de manière concise.
   * Indiquer clairement : Le titre du produit, le prix actuel, la boutique, et le prix cible s'il a été défini.
2. **Bilan complet ou comparatif multi-offres** :
   * Créer un **Artifact Markdown** présentant un tableau comparatif propre avec :
     * Le nom du produit
     * Le prix initial vs prix actuel
     * Le pourcentage d'évolution (badge vert pour les baisses)
     * Le lien direct cliquable vers la boutique
   * Rappeler à l'utilisateur que le système tourne en local sans consommer de tokens d'IA.
3. **Configuration des notifications externes** :
   * Si l'utilisateur souhaite recevoir les alertes sur son smartphone, lui indiquer qu'il suffit d'ouvrir le fichier :
     `workdirectory/BetterWhenFree/price-hunter/config.json`
     et d'y coller son Webhook Discord ou son Token de Bot Telegram.
