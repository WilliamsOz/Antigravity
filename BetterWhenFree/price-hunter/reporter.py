"""
PriceHunter Reporter:
Generates user-friendly CSV exports and modern interactive HTML visual dashboards
from the local SQLite database (prices.db).
Zero-cost, 100% local, no external server or API tokens required.
"""

import csv
import json
import os
from datetime import datetime
from typing import Any, Dict, List, Optional
from database import Database


BASE_DIR = os.path.dirname(os.path.abspath(__file__))


class Reporter:
    def __init__(self, db: Optional[Database] = None, output_dir: Optional[str] = None):
        self.db = db or Database()
        self.output_dir = output_dir or BASE_DIR
        os.makedirs(self.output_dir, exist_ok=True)
        self.data_dir = os.path.join(self.output_dir, "data")
        os.makedirs(self.data_dir, exist_ok=True)

    def export_csv(self, filename: str = "prices.csv") -> str:
        """
        Exports the latest status of all tracked products into a clean CSV file
        optimized for Excel, Apple Numbers, and Google Sheets.
        """
        filepath = os.path.join(self.output_dir, filename)
        data_filepath = os.path.join(self.data_dir, filename)
        products = self.db.list_products(active_only=False)

        headers = [
            "ID",
            "Titre",
            "Boutique",
            "Catégorie",
            "Prix Actuel (€)",
            "Prix d'Origine (€)",
            "Prix Cible (€)",
            "Évolution (%)",
            "Statut Stock",
            "Dernier Scrape (Date & Heure)",
            "Vendeur",
            "Frais de Port (€)",
            "URL Produit",
        ]

        rows = []
        for p in products:
            latest = self.db.get_latest_price(p["id"])
            initial = self.db.get_initial_price(p["id"])

            curr_price = latest["price"] if latest else None
            orig_price = latest.get("original_price") if latest else None
            scrape_date = str(latest["recorded_at"])[:19] if latest and latest.get("recorded_at") else str(p.get("updated_at", ""))[:19]
            
            # Evolution calculation
            evolution_str = "0.0%"
            if latest and initial and initial["price"] > 0:
                diff = initial["price"] - latest["price"]
                pct = (diff / initial["price"]) * 100
                evolution_str = f"-{pct:.1f}%" if pct > 0 else (f"+{abs(pct):.1f}%" if pct < 0 else "0.0%")
            elif orig_price and curr_price and orig_price > curr_price:
                discount_pct = ((orig_price - curr_price) / orig_price) * 100
                evolution_str = f"-{discount_pct:.1f}% (vs origine)"

            stock_status = "En stock" if (latest and latest.get("is_available")) else "Rupture"
            seller = latest.get("seller", "") if latest else ""
            shipping = latest.get("shipping_cost", 0.0) if latest else 0.0

            rows.append([
                p["id"],
                p["title"],
                p.get("store", ""),
                p.get("category", "general"),
                f"{curr_price:.2f}" if curr_price is not None else "-",
                f"{orig_price:.2f}" if orig_price is not None else "-",
                f"{p['target_price']:.2f}" if p.get("target_price") else "-",
                evolution_str,
                stock_status,
                scrape_date,
                seller,
                f"{shipping:.2f}" if shipping else "0.00",
                p["url"],
            ])

        # Write with UTF-8 BOM so Excel and Apple Numbers display French accents cleanly
        for path in set([filepath, data_filepath]):
            with open(path, mode="w", newline="", encoding="utf-8-sig") as f:
                writer = csv.writer(f, delimiter=";")
                writer.writerow(headers)
                writer.writerows(rows)

        return filepath

    def export_history_csv(self, filename: str = "prices_history.csv") -> str:
        """
        Exports the entire price history log line by line with every timestamped scrape.
        """
        filepath = os.path.join(self.output_dir, filename)

        headers = [
            "Date du Relevé",
            "Produit ID",
            "Titre Produit",
            "Boutique",
            "Catégorie",
            "Prix Relevé (€)",
            "Prix d'Origine (€)",
            "Frais de Port (€)",
            "Disponibilité",
            "Vendeur",
            "URL Produit",
        ]

        rows = []
        with self.db._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT h.*, p.title, p.store, p.category, p.url
                FROM price_history h
                JOIN products p ON h.product_id = p.id
                ORDER BY h.recorded_at DESC, h.id DESC
            """)
            for r in cursor.fetchall():
                rows.append([
                    str(r["recorded_at"])[:19],
                    r["product_id"],
                    r["title"],
                    r["store"],
                    r["category"],
                    f"{r['price']:.2f}",
                    f"{r['original_price']:.2f}" if r["original_price"] else "-",
                    f"{r['shipping_cost']:.2f}",
                    "En stock" if r["is_available"] else "Rupture",
                    r["seller"] or "-",
                    r["url"],
                ])

        data_filepath = os.path.join(self.data_dir, filename)
        for path in set([filepath, data_filepath]):
            with open(path, mode="w", newline="", encoding="utf-8-sig") as f:
                writer = csv.writer(f, delimiter=";")
                writer.writerow(headers)
                writer.writerows(rows)

        return filepath

    def generate_html_dashboard(self, filename: str = "dashboard.html") -> str:
        """
        Generates a self-contained, modern, visual dashboard in HTML.
        Opens directly in any browser (Safari, Chrome) without requiring any web server.
        """
        filepath = os.path.join(self.output_dir, filename)
        products = self.db.list_products(active_only=False)

        cards_data = []
        total_products = len(products)
        in_stock_count = 0
        total_value = 0.0

        for p in products:
            latest = self.db.get_latest_price(p["id"])
            lowest = self.db.get_lowest_price(p["id"])

            curr_price = latest["price"] if latest else 0.0
            orig_price = latest.get("original_price") if latest else None
            is_avail = latest.get("is_available", True) if latest else True
            scrape_date = str(latest["recorded_at"])[:19] if latest and latest.get("recorded_at") else str(p.get("updated_at", ""))[:19]
            
            if is_avail:
                in_stock_count += 1
            total_value += curr_price

            discount_pct = 0.0
            if orig_price and orig_price > curr_price:
                discount_pct = ((orig_price - curr_price) / orig_price) * 100

            target_reached = bool(p.get("target_price") and curr_price <= p["target_price"])

            cards_data.append({
                "id": p["id"],
                "title": p["title"],
                "url": p["url"],
                "store": p.get("store", "Inconnu"),
                "category": p.get("category", "Général"),
                "image_url": p.get("image_url") or "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300",
                "current_price": curr_price,
                "original_price": orig_price,
                "target_price": p.get("target_price"),
                "target_reached": target_reached,
                "discount_pct": round(discount_pct, 1),
                "is_available": is_avail,
                "scrape_date": scrape_date,
                "lowest_price": lowest["price"] if lowest else curr_price,
            })

        generated_at = datetime.now().strftime("%d/%m/%Y à %H:%M:%S")

        html_content = f"""<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PriceHunter - Dashboard Visuel</title>
  <style>
    :root {{
      --bg: #0b0f19;
      --card-bg: #151c2c;
      --card-border: #232f48;
      --text: #f1f5f9;
      --text-muted: #94a3b8;
      --primary: #38bdf8;
      --accent: #10b981;
      --danger: #ef4444;
      --warning: #f59e0b;
    }}
    * {{ box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }}
    body {{ background: var(--bg); color: var(--text); padding: 2.5rem 1.5rem; min-height: 100vh; }}
    .container {{ max-width: 1100px; margin: 0 auto; }}
    
    /* Header */
    header {{ display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.2rem; flex-wrap: wrap; gap: 1.5rem; border-bottom: 1px solid var(--card-border); padding-bottom: 1.5rem; }}
    h1 {{ font-size: 1.85rem; font-weight: 800; color: #fff; letter-spacing: -0.02em; }}
    .badge-refresh {{ background: rgba(56, 189, 248, 0.12); color: var(--primary); padding: 0.55rem 1.1rem; border-radius: 9999px; font-size: 0.85rem; font-weight: 600; border: 1px solid rgba(56, 189, 248, 0.2); white-space: nowrap; }}

    /* KPI Card in Header */
    .kpi-card {{ background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 14px; padding: 0.7rem 1.4rem; box-shadow: 0 4px 16px rgba(0,0,0,0.25); display: flex; align-items: center; gap: 0.9rem; }}
    .kpi-val {{ font-size: 1.9rem; font-weight: 800; color: #fff; line-height: 1; }}
    .kpi-label {{ color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 700; }}
    .kpi-sub {{ font-size: 0.8rem; color: var(--accent); margin-top: 0.2rem; font-weight: 600; }}

    /* Actions Bar */
    .actions-bar {{ display: flex; justify-content: flex-start; align-items: center; margin-bottom: 2rem; }}
    .search-box {{ background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 12px; padding: 0.75rem 1.25rem; color: #fff; width: 100%; max-width: 420px; font-size: 0.95rem; box-shadow: 0 2px 8px rgba(0,0,0,0.15); }}
    .search-box:focus {{ outline: 2px solid var(--primary); border-color: var(--primary); }}

    /* Products Grid */
    .product-grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 1.75rem; }}
    .product-card {{ background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 18px; overflow: hidden; display: flex; flex-direction: column; transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s; box-shadow: 0 6px 20px rgba(0,0,0,0.25); }}
    .product-card:hover {{ transform: translateY(-4px); border-color: var(--primary); box-shadow: 0 10px 25px rgba(56, 189, 248, 0.15); }}
    
    .card-top {{ display: flex; gap: 1.2rem; padding: 1.5rem; }}
    .prod-img {{ width: 100px; height: 100px; object-fit: contain; background: #fff; border-radius: 12px; padding: 0.4rem; flex-shrink: 0; box-shadow: 0 2px 8px rgba(0,0,0,0.15); }}
    .prod-info {{ flex: 1; min-width: 0; }}
    .prod-cat {{ display: inline-block; background: rgba(148, 163, 184, 0.15); color: #cbd5e1; font-size: 0.75rem; padding: 0.25rem 0.6rem; border-radius: 6px; text-transform: uppercase; font-weight: 700; margin-bottom: 0.4rem; letter-spacing: 0.05em; }}
    .prod-title {{ font-size: 1.05rem; font-weight: 700; line-height: 1.4; max-height: 2.8em; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; color: #fff; }}
    .prod-store {{ font-size: 0.85rem; color: var(--primary); margin-top: 0.4rem; font-weight: 600; }}

    .card-pricing {{ padding: 0 1.5rem 1.5rem; display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 1px solid var(--card-border); }}
    .price-main {{ font-size: 2.2rem; font-weight: 800; color: #fbbf24; line-height: 1; }}
    .price-orig {{ text-decoration: line-through; color: var(--text-muted); font-size: 1rem; margin-right: 0.6rem; }}
    .badge-discount {{ background: rgba(239, 68, 68, 0.2); color: #f87171; padding: 0.25rem 0.55rem; border-radius: 6px; font-weight: 700; font-size: 0.85rem; }}
    .target-badge {{ font-size: 0.82rem; padding: 0.35rem 0.7rem; border-radius: 8px; font-weight: 600; margin-top: 0.5rem; display: inline-block; }}
    .target-badge.reached {{ background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); }}
    .target-badge.waiting {{ background: rgba(245, 158, 11, 0.15); color: #fbbf24; }}

    .card-meta {{ padding: 0.9rem 1.5rem; font-size: 0.82rem; color: var(--text-muted); display: flex; justify-content: space-between; align-items: center; background: rgba(11, 15, 25, 0.5); }}
    .card-footer {{ padding: 1.2rem 1.5rem; display: flex; justify-content: space-between; align-items: center; }}
    .btn-store {{ background: #2563eb; color: white; text-decoration: none; padding: 0.6rem 1.2rem; border-radius: 10px; font-size: 0.88rem; font-weight: 700; transition: 0.2s; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3); }}
    .btn-store:hover {{ background: #3b82f6; transform: translateY(-1px); }}
    .stock-badge {{ display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.82rem; font-weight: 700; }}
    .stock-dot {{ width: 8px; height: 8px; border-radius: 50%; }}
    .in-stock {{ color: #34d399; }}
    .in-stock .stock-dot {{ background: #34d399; }}
    .out-of-stock {{ color: #f87171; }}
    .out-of-stock .stock-dot {{ background: #f87171; }}
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>PriceHunter Dashboard</h1>

      <div class="kpi-card">
        <div class="kpi-val">{total_products}</div>
        <div>
          <div class="kpi-label">Produits Suivis</div>
          <div class="kpi-sub">{in_stock_count} disponible(s) en stock</div>
        </div>
      </div>

      <div class="badge-refresh">Dernière mise à jour : {generated_at}</div>
    </header>

    <!-- Actions & Filter -->
    <div class="actions-bar">
      <input type="text" class="search-box" id="search" placeholder="🔍 Filtrer un produit..." onkeyup="filterCards()">
    </div>

    <!-- Products Cards Grid -->
    <div class="product-grid" id="grid">
"""

        for item in cards_data:
            orig_html = f'<span class="price-orig">{item["original_price"]:.2f} €</span>' if item.get("original_price") else ""
            discount_html = f'<span class="badge-discount">-{item["discount_pct"]}%</span>' if item.get("discount_pct") > 0 else ""
            
            target_html = ""
            if item.get("target_price"):
                if item["target_reached"]:
                    target_html = f'<div class="target-badge reached">🎯 Prix cible atteint ! ({item["target_price"]:.2f} €)</div>'
                else:
                    target_html = f'<div class="target-badge waiting">🎯 Cible : {item["target_price"]:.2f} €</div>'

            stock_class = "in-stock" if item["is_available"] else "out-of-stock"
            stock_label = "En stock" if item["is_available"] else "Rupture"

            html_content += f"""
      <div class="product-card" data-title="{item['title'].lower()}">
        <div class="card-top">
          <img src="{item['image_url']}" alt="{item['title']}" class="prod-img" onerror="this.src='https://via.placeholder.com/100?text=Produit'">
          <div class="prod-info">
            <span class="prod-cat">{item['category']}</span>
            <div class="prod-title" title="{item['title']}">{item['title']}</div>
            <div class="prod-store">📍 {item['store']}</div>
          </div>
        </div>

        <div class="card-pricing">
          <div>
            <div>{orig_html}{discount_html}</div>
            <div class="price-main">{item['current_price']:.2f} €</div>
            {target_html}
          </div>
          <div style="text-align: right; font-size: 0.85rem; color: var(--text-muted);">
            Plus bas : <strong style="color: #fff;">{item['lowest_price']:.2f} €</strong>
          </div>
        </div>

        <div class="card-meta">
          <span>🕒 Relevé le {item['scrape_date']}</span>
          <span class="stock-badge {stock_class}"><span class="stock-dot"></span>{stock_label}</span>
        </div>

        <div class="card-footer">
          <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">ID #{item['id']}</span>
          <a href="{item['url']}" target="_blank" class="btn-store">Voir sur {item['store']} ↗</a>
        </div>
      </div>
"""

        html_content += """
    </div>
  </div>

  <script>
    function filterCards() {
      const q = document.getElementById('search').value.toLowerCase();
      const cards = document.querySelectorAll('.product-card');
      cards.forEach(card => {
        const title = card.getAttribute('data-title') || '';
        card.style.display = title.includes(q) ? 'flex' : 'none';
      });
    }
  </script>
</body>
</html>
"""

        data_filepath = os.path.join(self.data_dir, filename)
        for path in set([filepath, data_filepath]):
            with open(path, "w", encoding="utf-8") as f:
                f.write(html_content)

        return filepath


if __name__ == "__main__":
    rep = Reporter()
    csv_file = rep.export_csv()
    hist_file = rep.export_history_csv()
    html_file = rep.generate_html_dashboard()
    print("CSV generated:", csv_file)
    print("History CSV generated:", hist_file)
    print("Dashboard HTML generated:", html_file)
