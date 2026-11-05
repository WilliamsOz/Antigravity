"""
Database manager for PriceHunter using SQLite.
Stores tracked products, detailed price history, and alert logs.
"""

import os
import sqlite3
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional


class Database:
    def __init__(self, db_path: Optional[str] = None):
        if db_path is None:
            base_dir = os.path.dirname(os.path.abspath(__file__))
            db_dir = os.path.join(base_dir, "data")
            os.makedirs(db_dir, exist_ok=True)
            db_path = os.path.join(db_dir, "prices.db")
        
        self.db_path = db_path
        self._init_db()

    def _get_connection(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn

    def _now(self) -> str:
        return datetime.now(timezone.utc).isoformat()

    def _init_db(self):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS products (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL,
                    url TEXT NOT NULL UNIQUE,
                    category TEXT DEFAULT 'general',
                    target_price REAL,
                    discount_threshold_pct REAL DEFAULT 15.0,
                    store TEXT,
                    image_url TEXT,
                    is_active INTEGER DEFAULT 1,
                    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
                )
            """)

            cursor.execute("""
                CREATE TABLE IF NOT EXISTS price_history (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    product_id INTEGER NOT NULL,
                    price REAL NOT NULL,
                    original_price REAL,
                    shipping_cost REAL DEFAULT 0.0,
                    currency TEXT DEFAULT 'EUR',
                    is_available INTEGER DEFAULT 1,
                    seller TEXT,
                    recorded_at TEXT DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
                )
            """)

            cursor.execute("""
                CREATE TABLE IF NOT EXISTS alerts (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    product_id INTEGER NOT NULL,
                    old_price REAL,
                    new_price REAL,
                    discount_pct REAL,
                    alert_type TEXT,
                    channel TEXT,
                    sent_at TEXT DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
                )
            """)
            conn.commit()

    def add_product(
        self,
        title: str,
        url: str,
        category: str = "general",
        target_price: Optional[float] = None,
        discount_threshold_pct: float = 15.0,
        store: Optional[str] = None,
        image_url: Optional[str] = None,
    ) -> int:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO products (title, url, category, target_price, discount_threshold_pct, store, image_url, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(url) DO UPDATE SET
                    title = excluded.title,
                    category = excluded.category,
                    target_price = COALESCE(excluded.target_price, products.target_price),
                    discount_threshold_pct = excluded.discount_threshold_pct,
                    store = COALESCE(excluded.store, products.store),
                    image_url = COALESCE(excluded.image_url, products.image_url),
                    is_active = 1,
                    updated_at = excluded.updated_at
            """, (title, url, category, target_price, discount_threshold_pct, store, image_url, self._now()))
            conn.commit()
            
            if cursor.lastrowid:
                return cursor.lastrowid
            
            cursor.execute("SELECT id FROM products WHERE url = ?", (url,))
            row = cursor.fetchone()
            return row["id"] if row else 0

    def get_product(self, product_id: int) -> Optional[Dict[str, Any]]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM products WHERE id = ?", (product_id,))
            row = cursor.fetchone()
            return dict(row) if row else None

    def get_product_by_url(self, url: str) -> Optional[Dict[str, Any]]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM products WHERE url = ?", (url,))
            row = cursor.fetchone()
            return dict(row) if row else None

    def list_products(self, active_only: bool = True, category: Optional[str] = None) -> List[Dict[str, Any]]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            query = "SELECT * FROM products WHERE 1=1"
            params: List[Any] = []
            if active_only:
                query += " AND is_active = 1"
            if category:
                query += " AND category = ?"
                params.append(category)
            query += " ORDER BY id DESC"
            cursor.execute(query, params)
            return [dict(row) for row in cursor.fetchall()]

    def delete_product(self, product_id: int) -> bool:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM products WHERE id = ?", (product_id,))
            conn.commit()
            return cursor.rowcount > 0

    def toggle_product(self, product_id: int, is_active: bool) -> bool:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("UPDATE products SET is_active = ?, updated_at = ? WHERE id = ?", (1 if is_active else 0, self._now(), product_id))
            conn.commit()
            return cursor.rowcount > 0

    def update_product(
        self,
        product_id: int,
        target_price: Optional[float] = None,
        discount_threshold_pct: Optional[float] = None,
        is_active: Optional[bool] = None,
        category: Optional[str] = None,
        title: Optional[str] = None,
    ) -> bool:
        updates = []
        params = []
        if target_price is not None:
            updates.append("target_price = ?")
            params.append(target_price)
        if discount_threshold_pct is not None:
            updates.append("discount_threshold_pct = ?")
            params.append(discount_threshold_pct)
        if is_active is not None:
            updates.append("is_active = ?")
            params.append(1 if is_active else 0)
        if category is not None:
            updates.append("category = ?")
            params.append(category)
        if title is not None:
            updates.append("title = ?")
            params.append(title)
        
        if not updates:
            return False

        updates.append("updated_at = ?")
        params.append(self._now())
        params.append(product_id)

        with self._get_connection() as conn:
            cursor = conn.cursor()
            query = f"UPDATE products SET {', '.join(updates)} WHERE id = ?"
            cursor.execute(query, params)
            conn.commit()
            return cursor.rowcount > 0

    def record_price(
        self,
        product_id: int,
        price: float,
        original_price: Optional[float] = None,
        shipping_cost: float = 0.0,
        currency: str = "EUR",
        is_available: bool = True,
        seller: Optional[str] = None,
    ) -> int:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO price_history (product_id, price, original_price, shipping_cost, currency, is_available, seller, recorded_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, (product_id, price, original_price, shipping_cost, currency, 1 if is_available else 0, seller, self._now()))
            
            cursor.execute("UPDATE products SET updated_at = ? WHERE id = ?", (self._now(), product_id))
            conn.commit()
            return cursor.lastrowid

    def get_latest_price(self, product_id: int) -> Optional[Dict[str, Any]]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT * FROM price_history
                WHERE product_id = ?
                ORDER BY recorded_at DESC, id DESC
                LIMIT 1
            """, (product_id,))
            row = cursor.fetchone()
            return dict(row) if row else None

    def get_previous_price(self, product_id: int) -> Optional[Dict[str, Any]]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT * FROM price_history
                WHERE product_id = ?
                ORDER BY recorded_at DESC, id DESC
                LIMIT 1 OFFSET 1
            """, (product_id,))
            row = cursor.fetchone()
            return dict(row) if row else None

    def get_initial_price(self, product_id: int) -> Optional[Dict[str, Any]]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT * FROM price_history
                WHERE product_id = ?
                ORDER BY recorded_at ASC, id ASC
                LIMIT 1
            """, (product_id,))
            row = cursor.fetchone()
            return dict(row) if row else None

    def get_lowest_price(self, product_id: int) -> Optional[Dict[str, Any]]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT * FROM price_history
                WHERE product_id = ? AND price > 0
                ORDER BY price ASC
                LIMIT 1
            """, (product_id,))
            row = cursor.fetchone()
            return dict(row) if row else None

    def get_price_history(self, product_id: int, limit: int = 30) -> List[Dict[str, Any]]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT * FROM price_history
                WHERE product_id = ?
                ORDER BY recorded_at DESC
                LIMIT ?
            """, (product_id, limit))
            return [dict(row) for row in cursor.fetchall()]

    def record_alert(
        self,
        product_id: int,
        old_price: float,
        new_price: float,
        discount_pct: float,
        alert_type: str,
        channel: str,
    ) -> int:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO alerts (product_id, old_price, new_price, discount_pct, alert_type, channel, sent_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (product_id, old_price, new_price, discount_pct, alert_type, channel, datetime.utcnow()))
            conn.commit()
            return cursor.lastrowid
