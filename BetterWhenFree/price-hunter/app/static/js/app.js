/**
 * PriceHunter Web Application Frontend
 */

let allProducts = [];
let activeCategory = 'all';
let searchQuery = '';
let priceChartInstance = null;
let pollTimer = null;

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadSettings();
    checkTrackerStatus();
});

// Toast notification helper
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    
    let bg = 'bg-slate-800 border-slate-700 text-white';
    let icon = 'ℹ️';
    if (type === 'success') {
        bg = 'bg-emerald-950 border-emerald-800 text-emerald-100';
        icon = '✅';
    } else if (type === 'error') {
        bg = 'bg-rose-950 border-rose-800 text-rose-100';
        icon = '❌';
    } else if (type === 'warning') {
        bg = 'bg-amber-950 border-amber-800 text-amber-100';
        icon = '⚠️';
    }

    toast.className = `toast flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl text-sm font-medium ${bg}`;
    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Navigation Tabs
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.nav-btn').forEach(el => {
        el.classList.remove('bg-sky-500/20', 'text-sky-400', 'border-sky-500/40');
        el.classList.add('text-slate-400', 'border-transparent');
    });

    const targetTab = document.getElementById(`tab-${tabId}`);
    if (targetTab) targetTab.classList.remove('hidden');

    const activeBtn = document.getElementById(`nav-${tabId}`);
    if (activeBtn) {
        activeBtn.classList.add('bg-sky-500/20', 'text-sky-400', 'border-sky-500/40');
        activeBtn.classList.remove('text-slate-400', 'border-transparent');
    }

    if (tabId === 'products') loadProducts();
    if (tabId === 'settings') loadSettings();
}

// Fetch and render products
async function loadProducts() {
    try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error("Erreur réseau");
        const data = await res.json();
        allProducts = data.products || [];
        updateKPIs(allProducts);
        renderProductCards();
    } catch (err) {
        showToast("Impossible de charger les produits suivis", "error");
    }
}

// Update Top KPIs
function updateKPIs(products) {
    const total = products.length;
    let priceDrops = 0;
    let targetsReached = 0;
    let totalVal = 0;

    products.forEach(p => {
        if (p.current_price) totalVal += p.current_price;
        if (p.evolution_amount > 0) priceDrops++;
        if (p.target_reached) targetsReached++;
    });

    document.getElementById('kpi-total').textContent = total;
    document.getElementById('kpi-drops').textContent = priceDrops;
    document.getElementById('kpi-targets').textContent = targetsReached;
    document.getElementById('kpi-value').textContent = `${totalVal.toFixed(2)} €`;
}

// Category filter
function setCategory(cat) {
    activeCategory = cat;
    document.querySelectorAll('.cat-pill').forEach(btn => {
        if (btn.dataset.cat === cat) {
            btn.className = 'cat-pill px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-500 text-white shadow-md shadow-sky-500/20';
        } else {
            btn.className = 'cat-pill px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700/50';
        }
    });
    renderProductCards();
}

// Search filter in products
function handleSearch(val) {
    searchQuery = val.trim().toLowerCase();
    renderProductCards();
}

// Render Products Grid
function renderProductCards() {
    const container = document.getElementById('products-grid');
    const emptyState = document.getElementById('empty-products');

    const filtered = allProducts.filter(p => {
        const matchCat = activeCategory === 'all' || p.category === activeCategory;
        const matchQuery = !searchQuery || 
            p.title.toLowerCase().includes(searchQuery) || 
            (p.store && p.store.toLowerCase().includes(searchQuery));
        return matchCat && matchQuery;
    });

    if (filtered.length === 0) {
        container.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    container.innerHTML = filtered.map(p => {
        const currPrice = p.current_price !== null ? `${p.current_price.toFixed(2)} €` : 'N/A';
        const origPrice = p.original_price ? `<span class="text-sm line-through text-slate-500 mr-2">${p.original_price.toFixed(2)} €</span>` : '';
        
        let evoBadge = '';
        if (p.evolution_pct > 0) {
            evoBadge = `<span class="px-2 py-0.5 rounded text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">-${p.evolution_pct}% (-${p.evolution_amount}€)</span>`;
        } else if (p.evolution_pct < 0) {
            evoBadge = `<span class="px-2 py-0.5 rounded text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">+${Math.abs(p.evolution_pct)}%</span>`;
        }

        let targetBadge = '';
        if (p.target_price) {
            if (p.target_reached) {
                targetBadge = `<span class="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">🎯 Cible atteinte (${p.target_price.toFixed(2)} €)</span>`;
            } else {
                targetBadge = `<span class="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20">🎯 Cible : ${p.target_price.toFixed(2)} €</span>`;
            }
        }

        const stockBadge = p.is_available 
            ? `<span class="inline-flex items-center gap-1 text-xs font-medium text-emerald-400"><span class="w-2 h-2 rounded-full bg-emerald-500"></span>En stock</span>`
            : `<span class="inline-flex items-center gap-1 text-xs font-medium text-rose-400"><span class="w-2 h-2 rounded-full bg-rose-500"></span>Rupture</span>`;

        const imgPlaceholder = p.image_url 
            ? `<img src="${p.image_url}" alt="${p.title}" class="w-20 h-20 object-contain bg-white rounded-xl p-1.5 shadow-sm flex-shrink-0" onerror="this.onerror=null;this.src='https://placehold.co/80x80/1e293b/94a3b8?text=Image';">`
            : `<div class="w-20 h-20 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">📦</div>`;

        return `
        <div class="product-card glass-panel rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden">
            <div>
                <!-- Top metadata -->
                <div class="flex items-start gap-4">
                    ${imgPlaceholder}
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 mb-1">
                            <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">${p.category}</span>
                            <span class="text-xs font-medium text-sky-400">${p.store || 'Boutique'}</span>
                        </div>
                        <h3 class="text-sm font-semibold text-white line-clamp-2 hover:text-sky-300 cursor-pointer" onclick="window.open('${p.url}', '_blank')">
                            ${p.title}
                        </h3>
                    </div>
                </div>

                <!-- Price section -->
                <div class="mt-4 pt-3 border-t border-slate-800 flex items-end justify-between">
                    <div>
                        <div class="flex items-baseline">
                            ${origPrice}
                            <span class="text-2xl font-extrabold text-amber-400">${currPrice}</span>
                        </div>
                        <div class="mt-1 flex flex-wrap gap-1.5">
                            ${evoBadge}
                            ${targetBadge}
                        </div>
                    </div>
                    <div class="text-right">
                        ${stockBadge}
                        <p class="text-[11px] text-slate-500 mt-1">Relevé : ${p.last_scraped_at ? p.last_scraped_at.substring(11, 16) : '-'}</p>
                    </div>
                </div>
            </div>

            <!-- Card Actions -->
            <div class="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <button onclick="openHistoryModal(${p.id})" class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition">
                    📈 Historique
                </button>
                <div class="flex items-center gap-1.5">
                    <button onclick="openEditTargetModal(${p.id}, ${p.target_price || 'null'}, ${p.discount_threshold_pct || 15})" title="Modifier le prix cible" class="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition">
                        🎯
                    </button>
                    <button onclick="checkSingleProduct(${p.id})" title="Actualiser le prix" class="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition">
                        🔄
                    </button>
                    <button onclick="deleteProduct(${p.id})" title="Supprimer du suivi" class="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition">
                        🗑️
                    </button>
                </div>
            </div>
        </div>
        `;
    }).join('');
}

// Background Tracker Status Polling
async function checkTrackerStatus() {
    try {
        const res = await fetch('/api/tracker/status');
        const data = await res.json();
        
        const banner = document.getElementById('scraping-banner');
        const bar = document.getElementById('scraping-progress-bar');
        const text = document.getElementById('scraping-status-text');

        if (data.is_running) {
            banner.classList.remove('hidden');
            const pct = data.total > 0 ? Math.round((data.progress / data.total) * 100) : 10;
            bar.style.width = `${pct}%`;
            text.textContent = `Actualisation en cours (${data.progress}/${data.total}) : ${data.current_item || 'Analyse...'}`;
            
            if (!pollTimer) {
                pollTimer = setInterval(checkTrackerStatus, 1500);
            }
        } else {
            if (!banner.classList.contains('hidden')) {
                banner.classList.add('hidden');
                showToast("Actualisation des prix terminée !", "success");
                loadProducts();
            }
            if (pollTimer) {
                clearInterval(pollTimer);
                pollTimer = null;
            }
        }
    } catch (err) {
        console.error("Tracker status error", err);
    }
}

// Trigger Scrape All
async function triggerScrapeAll() {
    try {
        const res = await fetch('/api/tracker/check', { method: 'POST' });
        if (res.status === 409) {
            showToast("Une actualisation est déjà en cours", "warning");
            return;
        }
        if (!res.ok) throw new Error("Échec du démarrage");
        showToast("Vérification des prix lancée...", "info");
        checkTrackerStatus();
    } catch (err) {
        showToast("Erreur lors du lancement de la vérification", "error");
    }
}

// Trigger Scrape for Single Product
async function checkSingleProduct(productId) {
    try {
        const res = await fetch('/api/tracker/check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product_id: productId })
        });
        if (res.status === 409) {
            showToast("Une actualisation est déjà en cours", "warning");
            return;
        }
        showToast("Actualisation du produit en cours...", "info");
        checkTrackerStatus();
    } catch (err) {
        showToast("Erreur lors de l'actualisation", "error");
    }
}

// Modal: Add Product
function openAddModal(prefillValue = '', prefillType = 'url') {
    document.getElementById('add-modal').classList.remove('hidden');
    document.getElementById('add-type').value = prefillType;
    document.getElementById('add-value').value = prefillValue;
    document.getElementById('add-target').value = '';
    document.getElementById('add-threshold').value = '15';
    document.getElementById('add-category').value = 'general';
    updateAddFormLabels();
}

function closeAddModal() {
    document.getElementById('add-modal').classList.add('hidden');
}

function updateAddFormLabels() {
    const type = document.getElementById('add-type').value;
    const label = document.getElementById('add-value-label');
    const input = document.getElementById('add-value');
    if (type === 'url') {
        label.textContent = "URL directe du produit :";
        input.placeholder = "https://www.amazon.fr/dp/... ou fnac, decathlon...";
    } else {
        label.textContent = "Mots-clés de recherche :";
        input.placeholder = "Ex : Casque Sony WH-1000XM5 Noir";
    }
}

async function submitAddProduct(event) {
    event.preventDefault();
    const type = document.getElementById('add-type').value;
    const value = document.getElementById('add-value').value.trim();
    const targetVal = document.getElementById('add-target').value;
    const threshVal = document.getElementById('add-threshold').value;
    const category = document.getElementById('add-category').value;

    if (!value) {
        showToast("Veuillez renseigner l'URL ou les mots-clés", "warning");
        return;
    }

    const submitBtn = document.getElementById('add-submit-btn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>⏳ Analyse en cours...</span>`;

    try {
        const res = await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: type,
                value: value,
                target_price: targetVal ? parseFloat(targetVal) : null,
                discount_threshold_pct: threshVal ? parseFloat(threshVal) : 15.0,
                category: category
            })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || "Erreur lors de l'ajout");

        showToast("Produit ajouté avec succès au suivi !", "success");
        closeAddModal();
        loadProducts();
    } catch (err) {
        showToast(err.message, "error");
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Ajouter au Suivi</span>`;
    }
}

// Modal: Edit Target
function openEditTargetModal(id, currentTarget, currentThreshold) {
    document.getElementById('edit-target-modal').classList.remove('hidden');
    document.getElementById('edit-prod-id').value = id;
    document.getElementById('edit-target-val').value = currentTarget !== null ? currentTarget : '';
    document.getElementById('edit-thresh-val').value = currentThreshold || 15;
}

function closeEditTargetModal() {
    document.getElementById('edit-target-modal').classList.add('hidden');
}

async function submitEditTarget(e) {
    e.preventDefault();
    const id = document.getElementById('edit-prod-id').value;
    const targetVal = document.getElementById('edit-target-val').value;
    const threshVal = document.getElementById('edit-thresh-val').value;

    try {
        const res = await fetch(`/api/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                target_price: targetVal ? parseFloat(targetVal) : null,
                discount_threshold_pct: threshVal ? parseFloat(threshVal) : 15.0
            })
        });
        if (!res.ok) throw new Error("Échec de la mise à jour");
        showToast("Paramètres du produit modifiés", "success");
        closeEditTargetModal();
        loadProducts();
    } catch (err) {
        showToast(err.message, "error");
    }
}

// Delete Product
async function deleteProduct(id) {
    if (!confirm("Voulez-vous vraiment retirer ce produit de votre liste de suivi ?")) return;

    try {
        const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error("Erreur de suppression");
        showToast("Produit supprimé du suivi", "info");
        loadProducts();
    } catch (err) {
        showToast(err.message, "error");
    }
}

// Modal: Chart History
async function openHistoryModal(id) {
    const modal = document.getElementById('history-modal');
    modal.classList.remove('hidden');

    const titleEl = document.getElementById('history-title');
    const tableBody = document.getElementById('history-table-body');
    titleEl.textContent = "Chargement de l'historique...";
    tableBody.innerHTML = '<tr><td colspan="4" class="text-center py-4 text-slate-400">Chargement...</td></tr>';

    try {
        const res = await fetch(`/api/products/${id}/history`);
        if (!res.ok) throw new Error("Erreur lors de la récupération de l'historique");
        const data = await res.json();

        titleEl.textContent = `Historique : ${data.title}`;
        
        // Render Chart.js
        renderHistoryChart(data.points, data.target_price);

        // Render Table (most recent first)
        const recentPoints = [...data.points].reverse();
        if (recentPoints.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="4" class="text-center py-4 text-slate-500">Aucun historique disponible</td></tr>';
        } else {
            tableBody.innerHTML = recentPoints.map(p => `
                <tr class="border-b border-slate-800 text-xs">
                    <td class="py-2 px-3 text-slate-400">${p.recorded_at.substring(0, 16)}</td>
                    <td class="py-2 px-3 font-bold text-amber-400 text-right">${p.price.toFixed(2)} €</td>
                    <td class="py-2 px-3 text-slate-400 text-right">${p.shipping_cost ? p.shipping_cost.toFixed(2) + ' €' : 'Gratuit'}</td>
                    <td class="py-2 px-3 text-center">${p.is_available ? '<span class="text-emerald-400">En stock</span>' : '<span class="text-rose-400">Rupture</span>'}</td>
                </tr>
            `).join('');
        }

    } catch (err) {
        showToast("Impossible d'afficher l'historique", "error");
    }
}

function closeHistoryModal() {
    document.getElementById('history-modal').classList.add('hidden');
    if (priceChartInstance) {
        priceChartInstance.destroy();
        priceChartInstance = null;
    }
}

function renderHistoryChart(points, targetPrice) {
    const ctx = document.getElementById('history-chart-canvas').getContext('2d');
    if (priceChartInstance) {
        priceChartInstance.destroy();
    }

    const labels = points.map(p => p.recorded_at.substring(5, 16));
    const prices = points.map(p => p.price);

    const datasets = [
        {
            label: 'Prix (€)',
            data: prices,
            borderColor: '#38bdf8',
            backgroundColor: 'rgba(56, 189, 248, 0.12)',
            fill: true,
            tension: 0.3,
            pointBackgroundColor: '#38bdf8',
            pointRadius: 4,
            pointHoverRadius: 6,
        }
    ];

    if (targetPrice) {
        datasets.push({
            label: `Prix Cible (${targetPrice.toFixed(2)} €)`,
            data: Array(points.length).fill(targetPrice),
            borderColor: '#10b981',
            borderDash: [5, 5],
            borderWidth: 2,
            pointRadius: 0,
            fill: false
        });
    }

    priceChartInstance = new Chart(ctx, {
        type: 'line',
        data: { labels, datasets },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#94a3b8' } },
                tooltip: {
                    callbacks: {
                        label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(2)} €`
                    }
                }
            },
            scales: {
                x: { ticks: { color: '#64748b' }, grid: { color: 'rgba(51, 65, 85, 0.2)' } },
                y: { ticks: { color: '#64748b' }, grid: { color: 'rgba(51, 65, 85, 0.3)' } }
            }
        }
    });
}

// Multi-Store Search Tab
async function executeSearch() {
    const q = document.getElementById('search-tab-input').value.trim();
    if (!q) {
        showToast("Veuillez saisir un nom de produit à comparer", "warning");
        return;
    }

    const btn = document.getElementById('search-tab-btn');
    const container = document.getElementById('search-results-container');
    btn.disabled = true;
    btn.innerHTML = `<span>Recherche en cours...</span>`;
    container.innerHTML = `
        <div class="col-span-full text-center py-12">
            <div class="inline-block animate-spin text-3xl mb-3">🔄</div>
            <p class="text-slate-400 text-sm">Interrogation des boutiques partenaires en cours...</p>
        </div>
    `;

    try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&limit=12`);
        const data = await res.json();
        
        if (!data.results || data.results.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-12 text-slate-400">
                    <p class="text-3xl mb-2">🔍</p>
                    <p>Aucune offre trouvée pour "<b>${q}</b>". Essayez d'autres mots-clés.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = data.results.map(off => `
            <div class="glass-panel rounded-xl p-4 flex flex-col justify-between hover:border-sky-500/40 transition">
                <div>
                    <div class="flex items-center justify-between mb-2">
                        <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30">${off.store}</span>
                        <span class="text-lg font-extrabold text-amber-400">${off.price.toFixed(2)} ${off.currency || '€'}</span>
                    </div>
                    <h4 class="text-sm font-medium text-white line-clamp-2 mb-2">${off.title}</h4>
                </div>
                <div class="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2">
                    <button onclick="openAddModal('${off.url}', 'url')" class="flex-1 py-1.5 px-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow transition">
                        🎯 Suivre ce prix
                    </button>
                    <a href="${off.url}" target="_blank" class="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition">
                        Voir ↗
                    </a>
                </div>
            </div>
        `).join('');

    } catch (err) {
        container.innerHTML = `<div class="col-span-full text-center py-8 text-rose-400">Erreur lors de la recherche multi-boutiques.</div>`;
    } finally {
        btn.disabled = false;
        btn.innerHTML = `<span>Rechercher & Comparer</span>`;
    }
}

// Settings Tab: Load & Save
async function loadSettings() {
    try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        const cfg = data.config || {};
        const alerts = cfg.alerts || {};
        const discord = alerts.discord || {};
        const telegram = alerts.telegram || {};

        document.getElementById('sett-threshold').value = alerts.default_discount_threshold_percent || 15;
        document.getElementById('sett-macos').checked = alerts.macos_banner_enabled !== false;
        
        document.getElementById('sett-discord-enabled').checked = !!discord.enabled;
        document.getElementById('sett-discord-url').value = discord.webhook_url || '';

        document.getElementById('sett-telegram-enabled').checked = !!telegram.enabled;
        document.getElementById('sett-telegram-token').value = telegram.bot_token || '';
        document.getElementById('sett-telegram-chatid').value = telegram.chat_id || '';

        document.getElementById('sett-scheduler').value = data.scheduler_interval_hours || 6;

        // Cron status
        const cronBadge = document.getElementById('sett-cron-status');
        const cronBtn = document.getElementById('sett-cron-btn');
        if (data.cron_installed) {
            cronBadge.innerHTML = `<span class="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">🟢 Actif (3x par jour)</span>`;
            cronBtn.textContent = "Désactiver le LaunchAgent";
            cronBtn.className = "px-3 py-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-500 text-white text-xs font-medium transition";
            cronBtn.dataset.active = "true";
        } else {
            cronBadge.innerHTML = `<span class="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-400 border border-slate-700">⚪ Inactif</span>`;
            cronBtn.textContent = "Activer la veille système (3x/jour)";
            cronBtn.className = "px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium transition";
            cronBtn.dataset.active = "false";
        }

        // DB Stats
        if (data.stats) {
            document.getElementById('sett-db-info').textContent = 
                `${data.stats.total_products} produits suivis • Taille de la base SQLite : ${data.stats.db_size_kb} KB`;
        }
    } catch (err) {
        showToast("Impossible de charger les paramètres", "error");
    }
}

async function saveSettings(e) {
    e.preventDefault();
    const payload = {
        default_discount_threshold_percent: parseFloat(document.getElementById('sett-threshold').value),
        macos_banner_enabled: document.getElementById('sett-macos').checked,
        discord_enabled: document.getElementById('sett-discord-enabled').checked,
        discord_webhook_url: document.getElementById('sett-discord-url').value.trim(),
        telegram_enabled: document.getElementById('sett-telegram-enabled').checked,
        telegram_bot_token: document.getElementById('sett-telegram-token').value.trim(),
        telegram_chat_id: document.getElementById('sett-telegram-chatid').value.trim(),
        scheduler_interval_hours: parseInt(document.getElementById('sett-scheduler').value),
    };

    try {
        const res = await fetch('/api/settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error("Échec de la sauvegarde");
        showToast("Paramètres sauvegardés avec succès !", "success");
    } catch (err) {
        showToast(err.message, "error");
    }
}

async function testAlert(channel) {
    try {
        showToast(`Test de notification (${channel})...`, "info");
        const res = await fetch('/api/settings/test-alert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ channel })
        });
        const data = await res.json();
        const results = data.results || {};
        
        let msg = "Résultats du test : ";
        if (results.macos) msg += "• Mac: OK ";
        if (results.discord) msg += "• Discord: OK ";
        if (results.telegram) msg += "• Telegram: OK ";

        if (!results.macos && !results.discord && !results.telegram) {
            showToast("Aucun canal n'a pu envoyer de notification. Vérifiez vos réglages.", "warning");
        } else {
            showToast(msg, "success");
        }
    } catch (err) {
        showToast("Erreur lors de l'envoi du test", "error");
    }
}

async function toggleCron() {
    const btn = document.getElementById('sett-cron-btn');
    const isCurrentlyActive = btn.dataset.active === "true";
    const enable = !isCurrentlyActive;

    btn.disabled = true;
    try {
        const res = await fetch('/api/settings/cron/toggle', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ enabled: enable })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || "Erreur toggle cron");
        showToast(data.message, "success");
        loadSettings();
    } catch (err) {
        showToast(err.message, "error");
    } finally {
        btn.disabled = false;
    }
}

// App Shutdown
function openShutdownModal() {
    document.getElementById('shutdown-modal').classList.remove('hidden');
}

function closeShutdownModal() {
    document.getElementById('shutdown-modal').classList.add('hidden');
}

async function confirmShutdown() {
    try {
        await fetch('/api/system/shutdown', { method: 'POST' });
        document.body.innerHTML = `
            <div class="min-h-screen flex items-center justify-center bg-slate-950 text-white p-6">
                <div class="glass-panel p-8 rounded-3xl border border-slate-800 text-center max-w-md shadow-2xl">
                    <div class="text-5xl mb-4">👋</div>
                    <h2 class="text-2xl font-bold text-sky-400 mb-2">PriceHunter est éteint</h2>
                    <p class="text-slate-400 text-sm mb-6">Le serveur et le planificateur ont été arrêtés avec succès. Vous pouvez désormais fermer cet onglet en toute sécurité.</p>
                    <p class="text-xs text-slate-500">Pour le relancer, double-cliquez simplement sur <b>PriceHunter.app</b>.</p>
                </div>
            </div>
        `;
    } catch (err) {
        showToast("Erreur lors de l'arrêt du serveur", "error");
    }
}
