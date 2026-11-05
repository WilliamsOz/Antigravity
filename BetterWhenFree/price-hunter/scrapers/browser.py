"""
Playwright Stealth Browser manager for dynamic websites and JavaScript-rendered pages.
Runs locally in headless mode with anti-detection capabilities.
"""

import asyncio
import os
import random
from typing import Any, Dict, Optional
from bs4 import BeautifulSoup


class PlaywrightBrowser:
    def __init__(self, headless: bool = True):
        self.headless = headless
        self.user_agent = (
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/126.0.0.0 Safari/537.36"
        )

    def fetch_page_content(self, url: str, wait_selector: Optional[str] = None, timeout: int = 30000) -> Optional[str]:
        """Synchronous wrapper to fetch rendered HTML via Playwright."""
        return asyncio.run(self._fetch_async(url, wait_selector, timeout))

    async def _fetch_async(self, url: str, wait_selector: Optional[str] = None, timeout: int = 30000) -> Optional[str]:
        from playwright.async_api import async_playwright

        try:
            async with async_playwright() as p:
                browser = await p.chromium.launch(
                    headless=self.headless,
                    args=[
                        "--disable-blink-features=AutomationControlled",
                        "--no-sandbox",
                        "--disable-setuid-sandbox",
                        "--disable-infobars",
                        "--window-size=1920,1080",
                    ],
                )
                
                context = await browser.new_context(
                    user_agent=self.user_agent,
                    viewport={"width": 1920, "height": 1080},
                    locale="fr-FR",
                    timezone_id="Europe/Paris",
                    device_scale_factor=1,
                    has_touch=False,
                    is_mobile=False,
                )

                # Stealth scripts to mask navigator.webdriver
                await context.add_init_script("""
                    Object.defineProperty(navigator, 'webdriver', {
                        get: () => undefined
                    });
                    window.chrome = {
                        runtime: {},
                        loadTimes: function() {},
                        csi: function() {},
                        app: {}
                    };
                    Object.defineProperty(navigator, 'languages', {
                        get: () => ['fr-FR', 'fr', 'en-US', 'en']
                    });
                    Object.defineProperty(navigator, 'plugins', {
                        get: () => [1, 2, 3, 4, 5]
                    });
                """)

                page = await context.new_page()

                # Block images and media to save bandwidth and speed up scraping
                await page.route(
                    "**/*.{png,jpg,jpeg,webp,svg,gif,woff,woff2,ttf,otf,mp4,webm}",
                    lambda route: route.abort(),
                )

                await page.goto(url, wait_until="domcontentloaded", timeout=timeout)
                
                # Small random delay to simulate human timing
                await asyncio.sleep(random.uniform(1.0, 2.0))

                # Dismiss common cookie banners
                await self._dismiss_cookie_banners(page)

                if wait_selector:
                    try:
                        await page.wait_for_selector(wait_selector, timeout=5000)
                    except Exception:
                        pass

                content = await page.content()
                await browser.close()
                return content

        except Exception as e:
            return None

    async def _dismiss_cookie_banners(self, page):
        cookie_selectors = [
            "button:has-text('Tout accepter')",
            "button:has-text('Accepter')",
            "button:has-text('Accept all')",
            "button:has-text('J\'accepte')",
            "button:has-text('Continuer sans accepter')",
            "#sp-cc-accept", # Amazon
            "#onetrust-accept-btn-handler", # Decathlon, Fnac
            "#didomi-notice-agree-button",
            "[data-testid='cookie-accept']",
        ]
        for sel in cookie_selectors:
            try:
                btn = page.locator(sel).first
                if await btn.is_visible(timeout=1000):
                    await btn.click()
                    await asyncio.sleep(0.5)
                    break
            except Exception:
                continue
