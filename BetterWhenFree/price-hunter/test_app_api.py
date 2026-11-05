"""
Unit & Integration tests for PriceHunter Web API
"""

import os
import sys
import unittest
from fastapi.testclient import TestClient

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from app.main import app
from database import Database

client = TestClient(app)


class TestPriceHunterAPI(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.db = Database()

    def test_01_health_check(self):
        resp = client.get("/api/system/health")
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertEqual(data["status"], "healthy")
        self.assertEqual(data["app"], "PriceHunter")
        self.assertIn("version", data)

    def test_02_index_page_rendered(self):
        resp = client.get("/")
        self.assertEqual(resp.status_code, 200)
        self.assertIn("text/html", resp.headers["content-type"])
        self.assertIn("PriceHunter", resp.text)
        self.assertIn("Mes Produits Suivis", resp.text)

    def test_03_list_products(self):
        resp = client.get("/api/products")
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertIn("count", data)
        self.assertIn("products", data)
        self.assertIsInstance(data["products"], list)

    def test_04_tracker_status(self):
        resp = client.get("/api/tracker/status")
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertIn("is_running", data)
        self.assertIn("progress", data)
        self.assertIn("total", data)

    def test_05_get_settings(self):
        resp = client.get("/api/settings")
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertIn("config", data)
        self.assertIn("cron_installed", data)
        self.assertIn("stats", data)
        self.assertIn("total_products", data["stats"])

    def test_06_update_settings(self):
        resp = client.post("/api/settings", json={"default_discount_threshold_percent": 18.0})
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertEqual(data["status"], "success")
        self.assertEqual(data["config"]["alerts"]["default_discount_threshold_percent"], 18.0)

    def test_07_product_crud_lifecycle(self):
        # 1. Add mock product directly in DB for testing
        test_url = "https://example.com/test-api-product"
        prod_id = self.db.add_product(
            title="Produit Test API",
            url=test_url,
            category="high-tech",
            target_price=200.0,
            discount_threshold_pct=10.0,
            store="TestStore",
        )
        self.db.record_price(prod_id, 220.0, original_price=250.0)

        # 2. Retrieve via API
        resp = client.get(f"/api/products/{prod_id}")
        self.assertEqual(resp.status_code, 200)
        prod = resp.json()
        self.assertEqual(prod["title"], "Produit Test API")
        self.assertEqual(prod["current_price"], 220.0)
        self.assertEqual(prod["target_price"], 200.0)

        # 3. Retrieve History
        resp_hist = client.get(f"/api/products/{prod_id}/history")
        self.assertEqual(resp_hist.status_code, 200)
        hist_data = resp_hist.json()
        self.assertIn("points", hist_data)
        self.assertGreaterEqual(len(hist_data["points"]), 1)
        self.assertEqual(hist_data["points"][0]["price"], 220.0)

        # 4. Update Target Price via API
        resp_up = client.put(f"/api/products/{prod_id}", json={"target_price": 190.0, "discount_threshold_pct": 12.0})
        self.assertEqual(resp_up.status_code, 200)
        up_data = resp_up.json()
        self.assertEqual(up_data["product"]["target_price"], 190.0)

        # 5. Delete via API
        resp_del = client.delete(f"/api/products/{prod_id}")
        self.assertEqual(resp_del.status_code, 200)

        # 6. Verify 404 after deletion
        resp_not_found = client.get(f"/api/products/{prod_id}")
        self.assertEqual(resp_not_found.status_code, 404)


if __name__ == "__main__":
    unittest.main()
