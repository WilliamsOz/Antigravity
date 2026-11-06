/* Progression, boutique, réglages, bibliothèque. */
(function () {
  const { esc, icons, route, on, setCrumb, md } = GS.ui;
  const U = GS.util;

  const MONTHS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
  const pretty = (key) => { const [y, m, d] = key.split('-').map(Number); return `${d} ${MONTHS[m - 1]} ${y}`; };

  function tooltip() {
    let el = document.querySelector('.chart-tip');
    if (!el) { el = document.createElement('div'); el.className = 'chart-tip'; el.hidden = true; document.body.appendChild(el); }
    return el;
  }
  function bindTips(root) {
    const tip = tooltip();
    const place = (e) => { tip.style.left = Math.min(e.clientX + 12, innerWidth - 170) + 'px'; tip.style.top = e.clientY - 38 + 'px'; };
    root.addEventListener('mousemove', (e) => {
      const t = e.target.closest('[data-tip]');
      if (t) { tip.hidden = false; tip.textContent = t.dataset.tip; place(e); } else tip.hidden = true;
    });
    root.addEventListener('mouseleave', () => { tip.hidden = true; });
    return () => tip.remove();
  }

  /* Minutes par semaine, sur 12 semaines : une seule série, en barres */
  function weeklyChart(s) {
    const weeks = [];
    let start = U.addDays(U.weekKey(), -7 * 11);
    for (let i = 0; i < 12; i++) {
      let sum = 0;
      for (let d = 0; d < 7; d++) sum += (s.days[U.addDays(start, d)] || {}).minutes || 0;
      weeks.push({ start, sum });
      start = U.addDays(start, 7);
    }
    const goalWeek = s.settings.dailyGoal * 5;
    const max = Math.max(goalWeek, ...weeks.map((w) => w.sum), 10);
    const nice = Math.ceil(max / 30) * 30;
    const W = 620, H = 180, L = 30, B = 22, T = 8, pw = W - L - 6, ph = H - B - T, bw = pw / 12;
    const y = (v) => T + ph - v / nice * ph;
    let g = '';
    for (let i = 0; i <= 3; i++) {
      const v = Math.round(nice * i / 3);
      g += `<line class="grid-l" x1="${L}" x2="${W - 6}" y1="${y(v)}" y2="${y(v)}"/><text class="axis" x="${L - 5}" y="${y(v) + 3}" text-anchor="end">${v}</text>`;
    }
    g += `<line class="goal-l" x1="${L}" x2="${W - 6}" y1="${y(goalWeek)}" y2="${y(goalWeek)}"/>`;
    weeks.forEach((w, i) => {
      const x = L + i * bw, h = Math.max(w.sum ? 4 : 0, w.sum / nice * ph), [yy, mm, dd] = w.start.split('-').map(Number);
      g += `<g data-tip="Semaine du ${dd} ${MONTHS[mm - 1]} : ${w.sum} min"><rect class="hit" x="${x}" y="${T}" width="${bw}" height="${ph}"/>`;
      if (h) g += `<rect class="bar-col ${i === 11 ? 'now' : ''}" x="${x + bw * 0.2}" y="${y(0) - h}" width="${bw * 0.6}" height="${h}" rx="4"/>`;
      g += '</g>';
      if (i % 2 === 1) g += `<text class="axis" x="${x + bw / 2}" y="${H - 6}" text-anchor="middle">${dd} ${MONTHS[mm - 1]}</text>`;
    });
    return `<svg class="bars-chart" viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Minutes de pratique par semaine, 12 dernières semaines">${g}</svg>`;
  }

  function heatmap(s, selected) {
    const t = U.today();
    const cells = [];
    const first = U.addDays(U.weekKey(), -7 * 25);
    for (let d = first; d <= t; d = U.addDays(d, 1)) cells.push(d);
    const lvl = (m) => !m ? 0 : m < 5 ? 1 : m < 15 ? 2 : m < 30 ? 3 : 4;
    return `<div class="heatmap">${cells.map((d) => {
      const m = (s.days[d] || {}).minutes || 0;
      return `<button class="heat l${lvl(m)} ${d === selected ? 'sel' : ''}" data-day="${d}" data-tip="${pretty(d)} : ${m} min" aria-label="${pretty(d)}, ${m} minutes"></button>`;
    }).join('')}</div>
    <div class="row between" style="margin-top:7px"><span class="tiny faint">6 derniers mois</span><div class="heat-legend">moins <span class="heat" style="pointer-events:none"></span><span class="heat l1" style="pointer-events:none"></span><span class="heat l2" style="pointer-events:none"></span><span class="heat l3" style="pointer-events:none"></span><span class="heat l4" style="pointer-events:none"></span> plus</div></div>`;
  }

  function bpmChart(hist) {
    if (hist.length < 2) return '<p class="small faint">Reviens enregistrer un autre tempo pour voir ta courbe.</p>';
    const W = 300, H = 90, L = 26, T = 6, B = 6;
    const vals = hist.map((h) => h.bpm), lo = Math.min(...vals) - 4, hi = Math.max(...vals) + 4;
    const x = (i) => L + i / (hist.length - 1) * (W - L - 8), y = (v) => T + (hi - v) / (hi - lo) * (H - T - B);
    const pts = hist.map((h, i) => `${x(i)} ${y(h.bpm)}`).join(' L');
    return `<svg class="line-chart" viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Évolution du tempo">
      <line class="grid-l" x1="${L}" x2="${W - 6}" y1="${y(hi - 4)}" y2="${y(hi - 4)}"/><line class="grid-l" x1="${L}" x2="${W - 6}" y1="${y(lo + 4)}" y2="${y(lo + 4)}"/>
      <text class="axis" x="${L - 4}" y="${y(hi - 4) + 3}" text-anchor="end">${hi - 4}</text><text class="axis" x="${L - 4}" y="${y(lo + 4) + 3}" text-anchor="end">${lo + 4}</text>
      <path d="M${pts}"/>${hist.map((h, i) => `<g data-tip="${pretty(h.d)} : ${h.bpm} BPM"><circle cx="${x(i)}" cy="${y(h.bpm)}" r="${hist.length > 25 ? 2 : 4}"/></g>`).join('')}</svg>`;
  }

  function progress(root) {
    let selected = U.today(), tab = 'stats';
    function draw() {
      const s = GS.store.get(), info = GS.game.levelInfo(s.xp);
      const days = Object.values(s.days).filter((d) => d.minutes > 0);
      const totalMin = Object.values(s.days).reduce((n, d) => n + (d.minutes || 0), 0);
      const stars = Object.values(s.songs).reduce((n, x) => n + (x.stars || 0), 0);
      const lessons = Object.values(s.lessons).filter((l) => l.done).length;
      const badges = GS.data.badges;
      const got = badges.filter((b) => s.badges[b.id]).length;
      const chapters = GS.courses.chapters();
      const fmtTime = totalMin >= 60 ? `${Math.floor(totalMin / 60)} h ${String(totalMin % 60).padStart(2, '0')}` : `${totalMin} min`;
      const day = s.days[selected] || { minutes: 0, note: '', log: [] };
      const exRecords = Object.keys(s.exercises).map((id) => ({ id, ex: GS.data.exercises.find((e) => e.id === id), ...s.exercises[id] })).filter((x) => x.ex).sort((a, b) => b.history.length - a.history.length);

      root.innerHTML = `
        <section class="profile-hero">
          <div class="level-badge" title="Niveau">${info.level}</div>
          <div>
            <div class="eyebrow">Niveau ${info.level}</div>
            <h1 style="margin:3px 0 8px">${esc(info.title)}</h1>
            <div class="fretbar" role="progressbar" aria-valuenow="${Math.round(info.pct)}" aria-valuemin="0" aria-valuemax="100"><i style="width:${info.pct}%"></i></div>
            <div class="row between small muted" style="margin-top:5px"><span class="num">${info.into} / ${info.need} XP</span><span>${info.nextTitle ? `Prochain rang au niveau ${info.nextTitleLevel} : ${esc(info.nextTitle)}` : 'Rang maximal'}</span></div>
          </div>
        </section>
        <nav class="tabs">
          <button class="${tab === 'stats' ? 'on' : ''}" data-tab="stats">Mes chiffres</button>
          <button class="${tab === 'journal' ? 'on' : ''}" data-tab="journal">Journal</button>
          <button class="${tab === 'badges' ? 'on' : ''}" data-tab="badges">Succès <span class="faint">${got}/${badges.length}</span></button>
          <button class="${tab === 'passport' ? 'on' : ''}" data-tab="passport">Passeport</button>
          <button class="${tab === 'ranks' ? 'on' : ''}" data-tab="ranks">Rangs</button>
        </nav>
        ${tab === 'stats' ? `
          <div class="grid g4" style="margin-bottom:14px">
            <div class="tile"><div class="v">${fmtTime}</div><div class="l">de pratique au total</div></div>
            <div class="tile"><div class="v">${s.streak.count} <span style="font-size:1rem" class="faint">/ ${s.streak.best}</span></div><div class="l">jours de suite / record</div></div>
            <div class="tile"><div class="v">${lessons}</div><div class="l">leçons validées</div></div>
            <div class="tile"><div class="v">${stars}</div><div class="l">étoiles de morceaux</div></div>
            <div class="tile"><div class="v">${days.length}</div><div class="l">jours joués</div></div>
            <div class="tile"><div class="v">${Object.values(s.routines.done).reduce((a, b) => a + b, 0)}</div><div class="l">routines terminées</div></div>
            <div class="tile"><div class="v">${Object.values(s.games).reduce((a, g) => a + (g.plays || 0), 0)}</div><div class="l">parties d'entraînement</div></div>
            <div class="tile"><div class="v">${s.counters.questsDone || 0}</div><div class="l">quêtes accomplies</div></div>
          </div>
          <div class="grid g2">
            <div class="card"><div class="row between" style="margin-bottom:9px"><h3>Minutes par semaine</h3><span class="tiny faint">┄ objectif : ${s.settings.dailyGoal * 5} min (5 jours)</span></div>${weeklyChart(s)}</div>
            <div class="card"><h3 style="margin-bottom:9px">Tes jours de guitare</h3>${heatmap(s, selected)}</div>
          </div>
          <div class="section-head"><h2>Records de tempo</h2></div>
          ${exRecords.length ? `<div class="grid gauto">${exRecords.slice(0, 9).map((x) => `<div class="card tight"><div class="row between"><b class="small">${esc(x.ex.title)}</b><span class="chip accent">${x.best} BPM</span></div><div style="margin-top:7px">${bpmChart(x.history.slice(-30))}</div></div>`).join('')}</div>` : '<div class="empty">Pendant une routine, clique « Propre à ce tempo » : tes records s\'afficheront ici.</div>'}
        ` : tab === 'journal' ? `
          <div class="grid g2">
            <div class="card"><h3 style="margin-bottom:9px">Choisis un jour</h3>${heatmap(s, selected)}</div>
            <div class="card stack">
              <div class="row between"><h3>${pretty(selected)}</h3><span class="chip accent">${day.minutes || 0} min</span></div>
              ${(day.log || []).length ? `<ul class="small muted" style="margin:0;padding-left:17px">${day.log.filter((l) => l.minutes > 0).slice(-10).map((l) => `<li>${esc(GS.labels.log[l.kind] || l.kind)}${l.detail ? ' : ' + esc(l.detail) : ''} (${l.minutes} min)</li>`).join('')}</ul>` : '<p class="small faint">Aucune activité enregistrée ce jour-là.</p>'}
              <textarea class="input" data-note placeholder="Tes sensations, ce qui a progressé, ce qui coince…">${esc(day.note || '')}</textarea>
              <div class="row"><button class="btn" data-savenote>Enregistrer</button>${selected === U.today() ? '<button class="btn ghost" data-manual>Ajouter 15 min jouées sans l\'appli</button>' : ''}</div>
            </div>
          </div>
        ` : tab === 'badges' ? `
          <div class="grid gauto">${badges.map((b) => {
            const has = s.badges[b.id];
            return `<div class="badge-card ${has ? 'got' : ''}"><div class="m">${b.icon}</div><div><b class="small bn">${esc(b.title)}</b><div class="tiny faint">${esc(b.desc)}${has ? ` · ${pretty(has)}` : ''}</div></div></div>`;
          }).join('')}</div>
        ` : tab === 'passport' ? `
          <p class="muted" style="margin-bottom:14px">Chaque étape franchie sur la route de l'Andalousie appose son tampon.</p>
          <div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(118px,1fr))">${chapters.map((c) => {
            const has = GS.courses.isDone(GS.courses.bossId(c));
            return `<div class="stamp ${has ? 'got' : ''}"><span>${c.icon}</span>${esc(c.region)}</div>`;
          }).join('')}</div>
        ` : `
          <div class="card"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Niveau</th><th>Rang</th><th></th></tr></thead><tbody>
            ${GS.game.TITLES.map(([l, t]) => `<tr><td class="num">${l}</td><td style="${info.level >= l ? 'font-weight:600' : ''}" class="${info.level >= l ? '' : 'faint'}">${esc(t)}</td><td>${info.title === t ? '<span class="chip accent">Ton rang</span>' : info.level >= l ? '✓' : ''}</td></tr>`).join('')}
          </tbody></table></div>
          <p class="small muted" style="margin-top:11px">Ta série multiplie l'XP gagnée : ×1,1 à 3 jours, ×1,2 à 7 jours, ×1,3 à 14 jours, ×1,5 à 30 jours.</p></div>
        `}`;
    }
    on(root, 'click', '[data-tab]', (e, t) => { tab = t.dataset.tab; draw(); });
    on(root, 'click', '[data-day]', (e, t) => { selected = t.dataset.day; if (tab !== 'journal') tab = 'journal'; draw(); });
    on(root, 'click', '[data-savenote]', () => {
      const v = root.querySelector('[data-note]').value;
      GS.store.update((st) => { st.days[selected] = st.days[selected] || { minutes: 0, xp: 0, note: '', log: [] }; st.days[selected].note = v; });
      if (v.trim()) GS.game.track('journal');
      GS.ui.toast('Journal enregistré.', 'info');
    });
    on(root, 'click', '[data-manual]', () => { GS.game.logPractice(15, 'manual', 'Sans l\'appli'); draw(); });
    draw();
    return bindTips(root);
  }

  /* ---------- Boutique ---------- */
  function shop(root) {
    function draw() {
      const s = GS.store.get(), items = GS.data.shop;
      const card = (it) => {
        const owned = s.shop.owned.includes(it.id);
        const inUse = (it.theme && s.shop.theme === it.theme) || (it.paper && s.shop.paper === it.paper);
        let action;
        if (it.consumable) {
          const max = it.id === 'freeze' && s.streak.freezes >= 3;
          action = `<button class="btn ${s.picks >= it.price && !max ? 'primary' : ''}" data-buy="${it.id}" ${s.picks < it.price || max ? 'disabled' : ''}>${icons.pick}${it.price}</button>`;
        } else if (owned) action = inUse ? '<span class="chip accent">Utilisé</span>' : `<button class="btn" data-use="${it.id}">Utiliser</button>`;
        else action = `<button class="btn ${s.picks >= it.price ? 'primary' : ''}" data-buy="${it.id}" ${s.picks < it.price ? 'disabled' : ''}>${icons.pick}${it.price}</button>`;
        return `<div class="card shop-card">
          ${it.swatches ? `<div class="swatches">${it.swatches.map((c) => `<i style="background:${c}"></i>`).join('')}</div>` : `<div class="shop-ic">${it.icon}</div>`}
          <div><h3>${esc(it.title)}</h3><p class="small muted" style="margin-top:2px">${esc(it.desc)}</p></div>
          <div class="row between" style="margin-top:auto">${it.id === 'freeze' ? `<span class="tiny faint">${s.streak.freezes}/3 en réserve</span>` : '<span></span>'}${action}</div>
        </div>`;
      };
      const group = (k) => items.filter((i) => i.group === k).map(card).join('');
      root.innerHTML = `<header class="page-head"><div class="eyebrow">La boutique du luthier</div><h1 style="margin-top:6px">Boutique</h1><p>Dépense tes médiators : ils se gagnent en jouant, jamais autrement. Tu en as <b style="color:var(--accent-strong)">${s.picks}</b>.</p></header>
        <div class="section-head"><h2>Bonus</h2></div><div class="grid gauto">${group('bonus')}</div>
        <div class="section-head"><h2>Thèmes</h2></div><div class="grid gauto">${group('theme')}</div>
        <div class="section-head"><h2>Papier de tablature</h2></div><div class="grid gauto">${group('paper')}</div>`;
    }
    on(root, 'click', '[data-buy]', (e, t) => {
      const it = GS.data.shop.find((i) => i.id === t.dataset.buy);
      if (GS.game.buy(it)) {
        GS.ui.toast(`<b>${esc(it.title)}</b> : c'est à toi.`, 'reward');
        if (it.theme || it.paper) use(it);
        draw();
      }
    });
    function use(it) {
      GS.store.update((st) => { if (it.theme) st.shop.theme = it.theme; if (it.paper) st.shop.paper = it.paper; });
      GS.applyLook();
    }
    on(root, 'click', '[data-use]', (e, t) => { use(GS.data.shop.find((i) => i.id === t.dataset.use)); draw(); });
    draw();
  }

  /* ---------- Réglages ---------- */
  function settings(root) {
    const s = GS.store.get();
    root.innerHTML = `<div class="lesson"><header class="page-head"><h1>Réglages</h1></header>
      <div class="stack">
        <div class="card stack">
          <label class="row between"><span><b>Objectif quotidien</b><br><span class="small muted">Minutes à atteindre chaque jour</span></span>
            <select class="input" data-goal>${[5, 10, 15, 20, 30, 45, 60].map((m) => `<option value="${m}" ${s.settings.dailyGoal === m ? 'selected' : ''}>${m} min</option>`).join('')}</select></label>
          <label class="row between"><span><b>Volume</b></span><input type="range" min="0" max="1" step="0.05" value="${s.settings.volume}" data-vol style="max-width:200px"></label>
          <label class="row between"><span><b>Sons d'interface</b><br><span class="small muted">Récompenses et son de level up</span></span><input type="checkbox" data-sfx ${s.settings.sfx !== false ? 'checked' : ''}></label>
          <label class="row between"><span><b>Réduire les animations</b></span><input type="checkbox" data-motion ${s.settings.reduceMotion ? 'checked' : ''}></label>
          <label class="row between"><span><b>Tout débloquer dans le cours</b><br><span class="small muted">Si tu as déjà de l'expérience : tous les chapitres et boss accessibles</span></span><input type="checkbox" data-unlock ${s.settings.unlockAll ? 'checked' : ''}></label>
        </div>
        <div class="card stack">
          <h3>Ta progression & Synchronisation Git</h3>
          <p class="small muted">Ta progression se sauvegarde automatiquement en temps réel dans <code>progression.json</code> dès que le serveur local est lancé (via <code>start.command</code> sur Mac ou <code>start.bat</code> sur Windows). Tu n'as plus qu'à faire <code>git push</code> pour la centraliser sur GitHub.</p>
          <div class="row"><button class="btn" data-export>Exporter une copie (.json)</button>
            <label class="btn">Importer un fichier<input type="file" accept="application/json,.json" data-import hidden></label>
            <button class="btn danger" data-reset>Tout effacer</button></div>
        </div>
      </div></div>`;
    root.querySelector('[data-goal]').addEventListener('change', (e) => GS.store.update((st) => { st.settings.dailyGoal = +e.target.value; }));
    root.querySelector('[data-vol]').addEventListener('input', (e) => { GS.store.update((st) => { st.settings.volume = +e.target.value; }); GS.audio.setVolume(+e.target.value); });
    root.querySelector('[data-vol]').addEventListener('change', () => GS.audio.pluck(64, 1));
    root.querySelector('[data-sfx]').addEventListener('change', (e) => GS.store.update((st) => { st.settings.sfx = e.target.checked; }));
    root.querySelector('[data-motion]').addEventListener('change', (e) => { GS.store.update((st) => { st.settings.reduceMotion = e.target.checked; }); GS.applyLook(); });
    root.querySelector('[data-unlock]').addEventListener('change', (e) => GS.store.update((st) => { st.settings.unlockAll = e.target.checked; }));
    on(root, 'click', '[data-export]', () => { GS.store.exportFile(); GS.ui.toast('Fichier de sauvegarde téléchargé.', 'info'); });
    root.querySelector('[data-import]').addEventListener('change', (e) => {
      const f = e.target.files[0];
      if (!f) return;
      f.text().then((txt) => {
        try { GS.store.importText(txt); GS.applyLook(); GS.ui.toast('Progression importée.', 'info'); GS.ui.dispatch(); }
        catch (err) { GS.ui.toast('Ce fichier n\'est pas une sauvegarde valide.', 'bad'); }
      });
    });
    on(root, 'click', '[data-reset]', () => {
      const m = GS.ui.modal(`<h2>Tout effacer ?</h2><p class="muted" style="margin:9px 0 18px">XP, série, étoiles, journal et achats seront supprimés de ce navigateur. Exporte d'abord si tu veux pouvoir revenir en arrière.</p>
        <div class="row" style="justify-content:center"><button class="btn" data-close>Annuler</button><button class="btn danger" data-confirm>Tout effacer</button></div>`, { cls: 'page-modal' });
      m.el.querySelector('[data-confirm]').addEventListener('click', () => { GS.store.reset(); GS.applyLook(); m.close(); location.hash = '#/'; GS.ui.dispatch(); });
    });
  }

  /* ---------- Bibliothèque ---------- */
  function library(root, params) {
    const L = GS.data.library;
    const tab = params.tab || 'lexique';
    const TABS = [['lexique', 'Lexique'], ['soin', 'Entretien'], ['methode', 'Bien travailler'], ['liens', 'Aller plus loin'], ['maitres', 'Les maîtres']];
    let body = '';
    if (tab === 'lexique') {
      body = `<input class="search" type="search" data-q placeholder="Chercher un terme" aria-label="Chercher un terme" style="margin-bottom:12px"><dl style="margin:0" data-list>${L.glossary.map(([t, d]) => `<div class="gloss" data-term="${esc((t + ' ' + d).toLowerCase())}"><dt>${esc(t)}</dt><dd>${md(d)}</dd></div>`).join('')}</dl>`;
    } else if (tab === 'soin' || tab === 'methode') {
      const list = tab === 'soin' ? L.care : L.method;
      body = `<div class="grid g2">${list.map((c) => `<div class="card"><h3>${esc(c.title)}</h3><ul class="small" style="margin:9px 0 0;padding-left:18px;display:grid;gap:6px">${c.items.map((i) => `<li>${md(i)}</li>`).join('')}</ul></div>`).join('')}</div>`;
    } else if (tab === 'liens') {
      body = `<div class="grid gauto">${L.links.map((l) => `<a class="card link" href="${esc(l.url)}" target="_blank" rel="noopener"><h3>${esc(l.title)}</h3><p class="small muted" style="margin-top:3px">${esc(l.desc)}</p></a>`).join('')}</div>`;
    } else {
      body = `<div class="grid gauto">${L.masters.map((m) => `<div class="card"><h3>${esc(m.name)}</h3><div class="tiny faint">${esc(m.style)}</div><p class="small muted" style="margin-top:6px">${esc(m.why)}</p></div>`).join('')}</div>`;
    }
    root.innerHTML = `<header class="page-head" style="margin-bottom:14px"><div class="eyebrow">Pour aller plus loin</div><h1 style="margin-top:6px">Bibliothèque</h1></header>
      <nav class="tabs">${TABS.map(([k, l]) => `<a href="#/bibliotheque/${k}" class="${k === tab ? 'on' : ''}">${l}</a>`).join('')}</nav>${body}`;
    const q = root.querySelector('[data-q]');
    if (q) q.addEventListener('input', () => {
      const v = q.value.toLowerCase();
      root.querySelectorAll('[data-term]').forEach((el) => { el.style.display = el.dataset.term.includes(v) ? '' : 'none'; });
    });
  }

  route('/progres', progress);
  route('/boutique', shop);
  route('/reglages', settings);
  route('/bibliotheque', library);
  route('/bibliotheque/:tab', library);
})();
