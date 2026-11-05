"""
Unit and integration test suite for PriceHunter.
"""

import os
import unittest
import tempfile
import json
from database import Database
from scrapers.universal_ldjson import UniversalJSONLDScraper
from notifier import Notifier
from tracker import PriceTracker


class TestDatabase(unittest.TestCase):
    def setUp(self):
        self.temp_db_file = tempfile.NamedTemporaryFile(suffix=".db", delete=False)
        self.db = Database(db_path=self.temp_db_file.name)

    def tearDown(self):
        if os.path.exists(self.temp_db_file.name):
            os.remove(self.temp_db_file.name)

    def test_add_and_list_product(self):
        prod_id = self.db.add_product(
            title="Casque Sony Test",
            url="https://example.com/sony-test",
            category="high-tech",
            target_price=200.0,
            discount_threshold_pct=15.0,
            store="example.com",
        )
        self.assertGreater(prod_id, 0)

        prods = self.db.list_products()
        self.assertEqual(len(prods), 1)
        self.assertEqual(prods[0]["title"], "Casque Sony Test")
        self.assertEqual(prods[0]["target_price"], 200.0)

    def test_price_history_and_lowest(self):
        prod_id = self.db.add_product(
            title="Produit Prix",
            url="https://example.com/prix",
            category="sport",
        )
        self.db.record_price(prod_id, price=100.0, original_price=120.0)
        self.db.record_price(prod_id, price=80.0, original_price=120.0)
        self.db.record_price(prod_id, price=90.0, original_price=120.0)

        latest = self.db.get_latest_price(prod_id)
        self.assertEqual(latest["price"], 90.0)

        lowest = self.db.get_lowest_price(prod_id)
        self.assertEqual(lowest["price"], 80.0)

        initial = self.db.get_initial_price(prod_id)
        self.assertEqual(initial["price"], 100.0)


class TestUniversalJSONLD(unittest.TestCase):
    def setUp(self):
        self.scraper = UniversalJSONLDScraper()

    def test_parse_json_ld_schema(self):
        sample_html = """
        <!DOCTYPE html>
        <html>
        <head>
            <script type="application/ld+json">
            {
                "@context": "https://schema.org/",
                "@type": "Product",
                "name": "Sony WH-1000XM5 Casque sans fil",
                "image": "https://example.com/sony.jpg",
                "brand": {
                    "@type": "Brand",
                    "name": "Sony"
                },
                "offers": {
                    "@type": "Offer",
                    "priceCurrency": "EUR",
                    "price": "299.99",
                    "availability": "https://schema.org/InStock",
                    "seller": {
                        "@type": "Organization",
                        "name": "Fnac"
                    }
                }
            }
            </script>
        </head>
        <body></body>
        </html>
        """
        extracted = self.scraper.extract_from_html(sample_html)
        self.assertIsNotNone(extracted)
        self.assertEqual(extracted["title"], "Sony WH-1000XM5 Casque sans fil")
        self.assertEqual(extracted["price"], 299.99)
        self.assertEqual(extracted["currency"], "EUR")
        self.assertTrue(extracted["availability"])
        self.assertEqual(extracted["seller"], "Fnac")

    def test_parse_opengraph_fallback(self):
        sample_html = """
        <!DOCTYPE html>
        <html>
        <head>
            <meta property="og:title" content="T-Shirt Running Kalenji Decathlon" />
            <meta property="og:price:amount" content="14,99" />
            <meta property="og:price:currency" content="EUR" />
        </head>
        <body></body>
        </html>
        """
        extracted = self.scraper.extract_from_html(sample_html)
        self.assertIsNotNone(extracted)
        self.assertEqual(extracted["title"], "T-Shirt Running Kalenji Decathlon")
        self.assertEqual(extracted["price"], 14.99)


class TestTrackerAndAlerts(unittest.TestCase):
    def setUp(self):
        self.temp_db = tempfile.NamedTemporaryFile(suffix=".db", delete=False)
        self.db = Database(db_path=self.temp_db.name)
        self.notifier = Notifier()
        self.tracker = PriceTracker(db=self.db, notifier=self.notifier)

    def tearDown(self):
        if os.path.exists(self.temp_db.name):
            os.remove(self.temp_db.name)

    def test_alert_logic(self):
        prod_id = self.db.add_product(
            title="Vélo Ville Elops 520",
            url="https://example.com/velo",
            category="sport",
            target_price=250.0,
            discount_threshold_pct=15.0,
            store="decathlon.fr",
        )
        self.db.record_price(prod_id, price=300.0)

        # Mock check with price drop to 240 (target reached & >15% drop)
        product = self.db.get_product(prod_id)
        # Verify alert trigger method
        res = self.notifier.send_price_drop_alert(
            product=product,
            old_price=300.0,
            new_price=240.0,
            alert_reason="Prix cible atteint !",
        )
        self.assertIsInstance(res, dict)
        self.assertIn("macos", res)


class TestReporter(unittest.TestCase):
    def setUp(self):
        self.temp_dir = tempfile.mkdtemp()
        self.temp_db_file = os.path.join(self.temp_dir, "test.db")
        self.db = Database(db_path=self.temp_db_file)
        from reporter import Reporter
        self.reporter = Reporter(db=self.db, output_dir=self.temp_dir)

    def test_csv_and_html_generation(self):
        prod_id = self.db.add_product(
            title="Blender Test",
            url="https://example.com/blender",
            category="cuisine",
            target_price=50.0,
            store="amazon.fr",
        )
        self.db.record_price(prod_id, price=45.0, original_price=60.0)

        csv_file = self.reporter.export_csv("test.csv")
        self.assertTrue(os.path.exists(csv_file))
        with open(csv_file, "r", encoding="utf-8-sig") as f:
            content = f.read()
            self.assertIn("Blender Test", content)
            self.assertIn("45.00", content)

        html_file = self.reporter.generate_html_dashboard("test.html")
        self.assertTrue(os.path.exists(html_file))
        with open(html_file, "r", encoding="utf-8") as f:
            html = f.read()
            self.assertIn("Blender Test", html)
            self.assertIn("45.00 €", html)


if __name__ == "__main__":
    unittest.main()
