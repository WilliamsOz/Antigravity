#!/usr/bin/env python3
"""
PriceHunter CLI:
Unified command-line interface for product tracking, searching, price checks, and reporting.
"""

import argparse
import json
import os
import sys

# Auto-switch to virtual environment python if not running inside .venv
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
VENV_PYTHON = os.path.join(BASE_DIR, ".venv", "bin", "python")

if os.path.exists(VENV_PYTHON) and (sys.prefix == sys.base_prefix or not sys.prefix.startswith(BASE_DIR)):
    try:
        os.execv(VENV_PYTHON, [VENV_PYTHON] + sys.argv)
    except Exception:
        pass

from typing import Optional
from rich.console import Console
from rich.panel import Panel
from rich.table import Table

from database import Database
from notifier import Notifier
from tracker import PriceTracker
from scrapers import SearchEngineScraper
from reporter import Reporter

console = Console()


def cmd_add(args, tracker: PriceTracker):
    target = float(args.target) if args.target else None
    thresh = float(args.threshold) if args.threshold else 15.0

    if args.query or not args.input.startswith("http"):
        console.print(f"[cyan]🔍 Recherche automatique pour :[/cyan] [bold]{args.input}[/bold]")
        res = tracker.search_and_add_best(args.input, category=args.category, target_price=target)
        if not res:
            console.print("[red]❌ Aucune offre concluante trouvée pour cette recherche.[/red]")
            sys.exit(1)
    else:
        console.print(f"[cyan]📦 Analyse et ajout de l'URL :[/cyan] {args.input}")
        try:
            res = tracker.add_item_by_url(
                url=args.input,
                category=args.category,
                target_price=target,
                discount_threshold_pct=thresh,
            )
        except Exception as e:
            console.print(f"[red]❌ Erreur :[/red] {e}")
            sys.exit(1)

    table = Table(title="✅ Produit Ajouté au Suivi", show_header=True, header_style="bold magenta")
    table.add_column("ID", style="dim", width=6)
    table.add_column("Titre", style="bold")
    table.add_column("Boutique", style="green")
    table.add_column("Prix Actuel", justify="right", style="yellow")
    table.add_column("Prix Cible", justify="right", style="cyan")

    table.add_row(
        str(res["product_id"]),
        res["title"][:50],
        res["store"],
        f"{res['price']:.2f} {res['currency']}",
        f"{res['target_price']:.2f} €" if res.get("target_price") else "-",
    )
    console.print(table)

    # Automatically refresh CSV and HTML visual reports
    rep = Reporter(db=tracker.db)
    rep.export_csv()
    rep.export_history_csv()
    rep.generate_html_dashboard()


def cmd_list(args, db: Database):
    products = db.list_products(active_only=not args.all, category=args.category)

    if args.json:
        out = []
        for p in products:
            latest = db.get_latest_price(p["id"])
            initial = db.get_initial_price(p["id"])
            p_dict = dict(p)
            p_dict["latest_price"] = latest["price"] if latest else None
            p_dict["initial_price"] = initial["price"] if initial else None
            out.append(p_dict)
        print(json.dumps(out, indent=2, default=str))
        return

    if not products:
        console.print("[yellow]Aucun produit actuellement suivi. Ajoutez-en un avec 'add' ![/yellow]")
        return

    table = Table(title=f"📋 Liste des Produits Suivis ({len(products)})", show_header=True, header_style="bold cyan")
    table.add_column("ID", style="dim", width=4)
    table.add_column("Titre", style="bold", max_width=40)
    table.add_column("Catégorie", style="magenta")
    table.add_column("Boutique", style="blue")
    table.add_column("Prix Actuel", justify="right", style="yellow")
    table.add_column("Prix Cible", justify="right", style="cyan")
    table.add_column("Évolution", justify="right")

    for p in products:
        latest = db.get_latest_price(p["id"])
        initial = db.get_initial_price(p["id"])

        curr_p = f"{latest['price']:.2f} €" if latest else "-"
        tgt_p = f"{p['target_price']:.2f} €" if p.get("target_price") else "-"

        evo = "-"
        if latest and initial and initial["price"] > 0:
            diff = initial["price"] - latest["price"]
            if diff > 0:
                pct = (diff / initial["price"]) * 100
                evo = f"[green]-{pct:.1f}% ({diff:.2f}€)[/green]"
            elif diff < 0:
                pct = (abs(diff) / initial["price"]) * 100
                evo = f"[red]+{pct:.1f}%[/red]"
            else:
                evo = "[dim]0.0%[/dim]"

        table.add_row(
            str(p["id"]),
            p["title"][:40],
            p.get("category", "general"),
            p.get("store", "-"),
            curr_p,
            tgt_p,
            evo,
        )

    console.print(table)


def cmd_check(args, tracker: PriceTracker):
    console.print("[bold cyan]🔄 Vérification des prix en cours...[/bold cyan]")
    if args.id:
        results = [tracker.check_product(args.id)]
    else:
        results = tracker.check_all_products()

    if args.json:
        print(json.dumps(results, indent=2, default=str))
        return

    table = Table(title="Résultats de la Vérification", show_header=True, header_style="bold green")
    table.add_column("ID", width=4)
    table.add_column("Titre", max_width=45)
    table.add_column("Ancien Prix", justify="right")
    table.add_column("Nouveau Prix", justify="right", style="yellow")
    table.add_column("Différence", justify="right")
    table.add_column("Statut Alerte")

    for r in results:
        if r.get("status") == "error":
            table.add_row(str(r.get("product_id", "-")), "Erreur de scraping", "-", "-", "-", "[red]Échec[/red]")
            continue

        diff_str = "-"
        if r["diff"] > 0:
            diff_str = f"[green]-{r['diff']:.2f} €[/green]"
        elif r["diff"] < 0:
            diff_str = f"[red]+{abs(r['diff']):.2f} €[/red]"
        else:
            diff_str = "[dim]Stable[/dim]"

        status = "[bold green]🚨 ALERTE ENVOYÉE[/bold green]" if r.get("alert_triggered") else "[dim]Pas d'alerte[/dim]"

        table.add_row(
            str(r["product_id"]),
            r["title"][:45],
            f"{r['old_price']:.2f} €",
            f"{r['new_price']:.2f} €",
            diff_str,
            status,
        )

    console.print(table)

    # Automatically refresh CSV and HTML visual reports
    rep = Reporter(db=tracker.db)
    rep.export_csv()
    rep.export_history_csv()
    rep.generate_html_dashboard()


def cmd_search(args):
    scraper = SearchEngineScraper()
    console.print(f"[cyan]🔎 Recherche multi-boutiques pour :[/cyan] [bold]{args.query}[/bold]...")
    offers = scraper.search_and_compare(args.query, max_results=args.limit)

    if args.json:
        print(json.dumps(offers, indent=2, default=str))
        return

    if not offers:
        console.print("[yellow]Aucune offre trouvée.[/yellow]")
        return

    table = Table(title=f"Offres trouvées pour '{args.query}'", show_header=True, header_style="bold magenta")
    table.add_column("#", width=3)
    table.add_column("Titre", max_width=45)
    table.add_column("Boutique", style="blue")
    table.add_column("Prix", justify="right", style="bold yellow")
    table.add_column("URL", max_width=50, style="dim")

    for i, off in enumerate(offers, 1):
        table.add_row(
            str(i),
            off.get("title", "")[:45],
            off.get("store", "-"),
            f"{off.get('price', 0):.2f} {off.get('currency', 'EUR')}",
            off.get("url", "")[:50],
        )

    console.print(table)


def cmd_history(args, db: Database):
    prod = db.get_product(args.id)
    if not prod:
        console.print(f"[red]Produit ID {args.id} introuvable.[/red]")
        sys.exit(1)

    hist = db.get_price_history(args.id, limit=args.limit)
    if args.json:
        print(json.dumps(hist, indent=2, default=str))
        return

    table = Table(title=f"📈 Historique des Prix : {prod['title'][:50]}", show_header=True)
    table.add_column("Date", style="dim")
    table.add_column("Prix", justify="right", style="yellow")
    table.add_column("Frais de Port", justify="right")
    table.add_column("Disponibilité")

    for h in hist:
        avail = "[green]En stock[/green]" if h["is_available"] else "[red]Rupture[/red]"
        table.add_row(
            str(h["recorded_at"])[:19],
            f"{h['price']:.2f} {h['currency']}",
            f"{h['shipping_cost']:.2f} €" if h["shipping_cost"] else "0.00 €",
            avail,
        )
    console.print(table)


def cmd_delete(args, db: Database):
    if db.delete_product(args.id):
        console.print(f"[green]✅ Produit ID {args.id} supprimé avec succès.[/green]")
        rep = Reporter(db=db)
        rep.export_csv()
        rep.export_history_csv()
        rep.generate_html_dashboard()
    else:
        console.print(f"[red]❌ Impossible de supprimer le produit ID {args.id}.[/red]")


def cmd_export(args, db: Database):
    rep = Reporter(db=db)
    csv_p = rep.export_csv()
    hist_p = rep.export_history_csv()
    html_p = rep.generate_html_dashboard()
    console.print(Panel(
        f"📊 [bold green]Rapports générés avec succès ![/bold green]\n\n"
        f"• [cyan]Fichier CSV Résumé (Excel / Numbers) :[/cyan] [bold]{csv_p}[/bold]\n"
        f"• [cyan]Historique Complet CSV :[/cyan] [bold]{hist_p}[/bold]\n"
        f"• [cyan]Dashboard Visuel HTML :[/cyan] [bold]{html_p}[/bold]\n\n"
        f"💡 [dim]Astuce macOS : tapez [bold]open {html_p}[/bold] pour ouvrir le tableau de bord dans votre navigateur.[/dim]",
        title="✨ Export des Données",
    ))
    if args.open:
        os.system(f"open '{html_p}'")


def cmd_test_alert(args, notifier: Notifier):
    console.print("[cyan]🔔 Envoi d'une alerte de test...[/cyan]")
    fake_product = {
        "title": "Produit Démo - Sony WH-1000XM5 Casque Bluetooth Réduction de Bruit",
        "url": "https://example.com/demo-product",
        "store": "demo-store.fr",
        "target_price": 250.0,
        "image_url": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    }
    res = notifier.send_price_drop_alert(
        product=fake_product,
        old_price=349.99,
        new_price=249.99,
        alert_reason="Test d'alerte PriceHunter (Baisse de -28.6% !)",
    )
    console.print(Panel(
        f"Résultat des envois :\n"
        f"• Bannière macOS : {'[green]Succès[/green]' if res['macos'] else '[red]Échec / Désactivé[/red]'}\n"
        f"• Webhook Discord : {'[green]Succès[/green]' if res['discord'] else '[yellow]Non configuré / Échec[/yellow]'}\n"
        f"• Bot Telegram : {'[green]Succès[/green]' if res['telegram'] else '[yellow]Non configuré / Échec[/yellow]'}\n\n"
        f"Pour activer Discord ou Telegram, éditez simplement [bold]config.json[/bold] !",
        title="🔔 Rapport de Test",
    ))


def main():
    parser = argparse.ArgumentParser(description="PriceHunter - Suivi et Comparateur de Prix Local")
    subparsers = parser.add_subparsers(dest="command", required=True)

    # add
    p_add = subparsers.add_parser("add", help="Ajouter un produit à suivre")
    p_add.add_argument("input", help="URL du produit ou mots-clés de recherche")
    p_add.add_argument("--target", "-t", type=float, help="Prix cible en €")
    p_add.add_argument("--threshold", type=float, default=15.0, help="Pourcentage de baisse déclenchant une alerte")
    p_add.add_argument("--category", "-c", default="general", help="Catégorie (high-tech, sport, fashion, food)")
    p_add.add_argument("--query", "-q", action="store_true", help="Forcer la recherche par mot-clé")

    # list
    p_list = subparsers.add_parser("list", help="Lister les produits suivis")
    p_list.add_argument("--all", "-a", action="store_true", help="Inclure les produits inactifs")
    p_list.add_argument("--category", "-c", help="Filtrer par catégorie")
    p_list.add_argument("--json", action="store_true", help="Sortie au format JSON")

    # check
    p_check = subparsers.add_parser("check", help="Vérifier les prix et envoyer les alertes")
    p_check.add_argument("--id", type=int, help="Vérifier uniquement l'ID spécifié")
    p_check.add_argument("--json", action="store_true", help="Sortie au format JSON")

    # search
    p_search = subparsers.add_parser("search", help="Rechercher les meilleurs prix sans ajouter")
    p_search.add_argument("query", help="Mots-clés du produit")
    p_search.add_argument("--limit", type=int, default=5, help="Nombre max de résultats")
    p_search.add_argument("--json", action="store_true", help="Sortie au format JSON")

    # history
    p_hist = subparsers.add_parser("history", help="Afficher l'historique d'un produit")
    p_hist.add_argument("id", type=int, help="ID du produit")
    p_hist.add_argument("--limit", type=int, default=15, help="Nombre max d'entrées")
    p_hist.add_argument("--json", action="store_true", help="Sortie au format JSON")

    # delete
    p_del = subparsers.add_parser("delete", help="Supprimer un produit du suivi")
    p_del.add_argument("id", type=int, help="ID du produit")

    # export
    p_exp = subparsers.add_parser("export", help="Générer les exports CSV et le dashboard HTML")
    p_exp.add_argument("--open", action="store_true", help="Ouvrir automatiquement le dashboard dans le navigateur")

    # test-alert
    subparsers.add_parser("test-alert", help="Tester le système de notifications")

    # app / serve
    p_app = subparsers.add_parser("app", help="Lancer l'application web & bureau PriceHunter")
    p_app.add_argument("--stop", action="store_true", help="Arrêter l'application en cours d'exécution")

    args = parser.parse_args()

    db = Database()
    notifier = Notifier()
    tracker = PriceTracker(db=db, notifier=notifier)

    if args.command == "app":
        if args.stop:
            from scripts.stop_app import main as stop_main
            stop_main()
        else:
            from scripts.run_app import main as run_main
            run_main()
    elif args.command == "add":
        cmd_add(args, tracker)
    elif args.command == "list":
        cmd_list(args, db)
    elif args.command == "check":
        cmd_check(args, tracker)
    elif args.command == "search":
        cmd_search(args)
    elif args.command == "history":
        cmd_history(args, db)
    elif args.command == "delete":
        cmd_delete(args, db)
    elif args.command == "export":
        cmd_export(args, db)
    elif args.command == "test-alert":
        cmd_test_alert(args, notifier)


if __name__ == "__main__":
    main()
