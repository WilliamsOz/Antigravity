/* Interface commune : icônes, toasts, célébrations, rosace, tablature intégrée, routeur. */
(function () {
  const GS = window.GS = window.GS || {};
  const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  /* Mini-markdown des textes de cours */
  const md = (s) => esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code class="mono">$1</code>');

  const P = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const icons = {
    home: P('<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>'),
    book: P('<path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z"/><path d="M4 19V5"/><path d="M9 8h6"/>'),
    target: P('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>'),
    music: P('<path d="M9 18V6l11-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>'),
    game: P('<rect x="3" y="7" width="18" height="11" rx="4"/><path d="M8 11v3M6.5 12.5h3"/><circle cx="15.5" cy="11.5" r=".8"/><circle cx="17.5" cy="14" r=".8"/>'),
    tool: P('<path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h8M16 18h4"/><circle cx="16" cy="6" r="2"/><circle cx="8" cy="12" r="2"/><circle cx="14" cy="18" r="2"/>'),
    chart: P('<path d="M4 20V10M10 20V4M16 20v-7M21 20H3"/>'),
    shop: P('<path d="M4 8h16l-1 12H5z"/><path d="M9 8V6a3 3 0 016 0v2"/>'),
    lib: P('<path d="M5 3v18M10 3v18M15 4l5 16"/>'),
    gear: P('<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>'),
    flame: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c1 4 6 6 6 12a6 6 0 01-12 0c0-3 2-4 2-7 2 1 3 3 3 4 1-2 1-6 1-9z"/></svg>',
    pick: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 22C8 17 3.5 11 4 7c.3-2.6 4-4 8-4s7.700 1.400 8 4c.5 4-4 10-8 15z"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4l13 8-13 8z"/></svg>',
    stop: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',
    next: P('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    back: P('<path d="M19 12H5M11 6l-6 6 6 6"/>'),
    check: P('<path d="M5 12.5l4.5 4.5L19 7"/>'),
    lock: P('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>'),
    print: P('<path d="M7 8V3h10v5"/><rect x="4" y="8" width="16" height="9" rx="2"/><path d="M7 14h10v7H7z"/>'),
    loop: P('<path d="M4 11V9a3 3 0 013-3h12l-3-3M20 13v2a3 3 0 01-3 3H5l3 3"/>'),
    metro: P('<path d="M8 21l3-17h2l3 17z"/><path d="M12 15l5-8"/><path d="M6 21h12"/>'),
    mic: P('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/>'),
    yt: P('<rect x="3" y="6" width="18" height="12" rx="3"/><path d="M10.500 9.500l4 2.500-4 2.500z" fill="currentColor"/>'),
    plus: P('<path d="M12 5v14M5 12h14"/>'),
    trash: P('<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>'),
  };

  const stars = (n, max = 5) => {
    let out = '';
    for (let i = 1; i <= max; i++) out += i <= n ? '<b>★</b>' : '★';
    return `<span class="stars" aria-label="${n} étoiles sur ${max}">${out}</span>`;
  };

  /* Rosace de guitare : anneau de 60 tesselles qui s'allument selon l'avancement */
  function rosette(pct, size, big, sub) {
    const SEG = 60, s = 120, cx = 60, cy = 60;
    let tiles = '';
    for (let i = 0; i < SEG; i++) {
      const on = i / SEG < pct ? ' on' : '';
      tiles += `<rect class="seg${on}" x="${cx - 2.5}" y="4" width="5" height="10" rx="1" transform="rotate(${i * 6} ${cx} ${cy})"/>`;
    }
    let inner = '';
    for (let i = 0; i < 24; i++) inner += `<circle class="inlay" cx="${cx}" cy="17.5" r="1" transform="rotate(${i * 15} ${cx} ${cy})"/>`;
    return `<svg class="rosette" width="${size}" height="${size}" viewBox="0 0 ${s} ${s}" role="img" aria-label="${Math.round(pct * 100)} %">
      ${tiles}${inner}<circle class="ring" cx="${cx}" cy="${cy}" r="39.500"/><circle class="hole" cx="${cx}" cy="${cy}" r="36"/>
      <text class="big" x="${cx}" y="${sub ? cy + 4 : cy + 8}" text-anchor="middle">${esc(big == null ? '' : big)}</text>
      ${sub ? `<text class="sub" x="${cx}" y="${cy + 17}" text-anchor="middle">${esc(sub)}</text>` : ''}
    </svg>`;
  }

  /* ---------- Toasts ---------- */
  function toastBox() {
    let t = document.getElementById('toasts');
    if (!t) { t = document.createElement('div'); t.id = 'toasts'; t.setAttribute('aria-live', 'polite'); document.body.appendChild(t); }
    return t;
  }
  function toast(html, kind, ms, raw) {
    const el = document.createElement('div');
    el.className = 'toast ' + (kind || '');
    el.innerHTML = raw ? html : `<span>${html}</span>`;
    const box = toastBox();
    while (box.children.length >= 4) box.firstChild.remove();
    box.appendChild(el);
    setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 240); }, ms || 3400);
  }
  function rewardToast(xp, picks, reason) {
    const bits = [];
    if (xp) bits.push(`<b>+${xp} XP</b>`);
    if (picks) bits.push(`<b>+${picks}</b> médiators`);
    toast(`${bits.join(' · ')}${reason ? ` <span class="muted">${esc(reason)}</span>` : ''}`, 'reward');
  }
  function questDone(def) {
    GS.audio.chime('quest');
    toast(`<span style="font-size:1.3rem">${def.icon}</span><span>Quête accomplie : <b>${esc(def.title)}</b> <span class="muted">+${def.xp} XP · +${def.picks} médiators</span></span>`, 'reward', 4600, true);
  }

  /* ---------- Modales ---------- */
  function modal(html, opts) {
    opts = opts || {};
    const o = document.createElement('div');
    o.className = 'overlay ' + (opts.cls || '');
    o.innerHTML = (opts.before || '') + `<div class="modal ${opts.wide ? 'wide' : ''}" role="dialog" aria-modal="true">${html}</div>`;
    const close = () => { o.remove(); document.removeEventListener('keydown', onKey); opts.onClose && opts.onClose(); };
    function onKey(e) { if (e.key === 'Escape') close(); }
    document.addEventListener('keydown', onKey);
    o.addEventListener('click', (e) => { if (e.target === o || e.target.closest('[data-close]')) close(); });
    document.body.appendChild(o);
    const first = o.querySelector('[data-close], button');
    first && first.focus();
    return { el: o, close };
  }

  /* File d'attente : deux célébrations ne se recouvrent jamais */
  const queue = [];
  let showing = false;
  function enqueue(fn) { queue.push(fn); pump(); }
  function pump() {
    if (showing || !queue.length) return;
    showing = true;
    queue.shift()(() => { showing = false; pump(); });
  }

  function levelUp(info, before, bonus) {
    enqueue((done) => {
      try {
        const a = document.getElementById('levelup-audio');
        if (a && GS.store.get().settings.sfx !== false) { a.currentTime = 0; a.volume = 0.8; a.play().catch(() => {}); }
      } catch (e) {}
      confetti();
      const newTitle = info.title !== before.title;
      modal(`<div class="eyebrow">Level up !</div>
        <div class="lvl-num">${info.level}</div>
        <h2>${newTitle ? 'Nouveau rang : ' : ''}${esc(info.title)}</h2>
        <p class="muted" style="margin-top:8px">${info.nextTitle ? `Prochain rang au niveau ${info.nextTitleLevel} : ${esc(info.nextTitle)}.` : 'Tu as atteint le sommet.'}</p>
        <p style="margin:14px 0 18px"><span class="chip accent">+${bonus} médiators</span></p>
        <button class="btn primary lg" data-close>Continuer à jouer</button>`,
      { cls: 'levelup', before: '<div class="beams"><div class="beam"></div><div class="beam"></div><div class="beam"></div></div>', onClose: done });
    });
  }

  function badge(b) {
    enqueue((done) => {
      GS.audio.chime('badge');
      confetti(60);
      modal(`<div class="eyebrow">Succès débloqué</div>
        <div class="badge-medal" style="margin-top:13px">${b.icon}</div>
        <h2>${esc(b.title)}</h2><p class="muted" style="margin:7px 0 13px">${esc(b.desc)}</p>
        <p style="margin-bottom:17px"><span class="chip accent">+${b.xp || 25} XP</span> <span class="chip accent">+${b.picks || 15} médiators</span></p>
        <button class="btn primary" data-close>Génial</button>`, { onClose: done });
    });
  }

  function celebrate(title, text, icon) {
    enqueue((done) => {
      GS.audio.chime('badge');
      confetti();
      modal(`<div style="font-size:3rem;line-height:1.1">${icon || '🏆'}</div><h2 style="margin-top:8px">${esc(title)}</h2><p class="muted" style="margin:8px 0 18px">${esc(text || '')}</p><button class="btn primary" data-close>Continuer</button>`, { onClose: done });
    });
  }

  /* Confettis en médiators et notes */
  function confetti(count) {
    if (GS.store.get().settings.reduceMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let c = document.getElementById('confetti');
    if (c) c.remove();
    c = document.createElement('canvas');
    c.id = 'confetti'; c.width = innerWidth; c.height = innerHeight;
    document.body.appendChild(c);
    const g = c.getContext('2d');
    const cs = getComputedStyle(document.documentElement);
    const colors = ['--accent', '--accent-strong', '--second', '--danger', '--ink'].map((k) => cs.getPropertyValue(k).trim());
    const parts = [];
    for (let i = 0, n = count || 130; i < n; i++) {
      parts.push({ x: Math.random() * c.width, y: -20 - Math.random() * c.height * 0.5, vx: (Math.random() - 0.5) * 2.6, vy: 2 + Math.random() * 3.8, r: Math.random() * 6.3, vr: (Math.random() - 0.5) * 0.22, s: 5 + Math.random() * 7, col: colors[i % colors.length] });
    }
    const start = performance.now();
    (function frame(now) {
      if (!c.isConnected) return;
      g.clearRect(0, 0, c.width, c.height);
      parts.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.r += p.vr; p.vy += 0.018;
        g.save(); g.translate(p.x, p.y); g.rotate(p.r); g.fillStyle = p.col;
        g.beginPath(); g.moveTo(0, p.s * 0.8); g.quadraticCurveTo(-p.s, -p.s * 0.2, -p.s * 0.45, -p.s * 0.7); g.quadraticCurveTo(0, -p.s, p.s * 0.45, -p.s * 0.7); g.quadraticCurveTo(p.s, -p.s * 0.2, 0, p.s * 0.8); g.fill();
        g.restore();
      });
      if (now - start < 3600) requestAnimationFrame(frame); else c.remove();
    })(start);
  }

  /* Lecteur de tablature compact pour leçons et exercices */
  function miniTab(el, def, opts) {
    opts = opts || {};
    const song = { id: def.id || 'mini', title: def.title, time: def.time || '4/4', tempo: def.tempo || def.bpm || 70, sections: [{ name: def.title || '', bars: def.bars }] };
    const compiled = GS.music.compile(song, GS.data.chordShape);
    el.innerHTML = `<div class="row between no-print" style="margin-bottom:6px">
        ${def.title ? `<b class="small">${esc(def.title)}</b>` : '<span></span>'}
        <span class="row" style="--gap:6px">
          <span class="tiny faint num" data-tempo>${compiled.tempo} BPM</span>
          <button class="btn sm" data-mini="metro">${icons.metro}<span class="sr">Métronome</span></button>
          <button class="btn sm" data-mini="play">${icons.play}Écouter</button>
        </span></div>
      <div data-sheet></div>${def.note ? `<p class="small muted" style="margin-top:6px">${esc(def.note)}</p>` : ''}`;
    const view = GS.tab.mount(el.querySelector('[data-sheet]'), compiled, { pima: def.pima || opts.pima, hideSections: true, autoScroll: false, small: true });
    const btn = el.querySelector('[data-mini="play"]'), mbtn = el.querySelector('[data-mini="metro"]');
    const player = new GS.audio.Player(compiled, {
      onEvent: (b, e) => view.highlight(b, e),
      onEnd: () => { view.clear(); },
      onState: (on) => { btn.innerHTML = on ? icons.stop + 'Arrêter' : icons.play + 'Écouter'; if (!on) view.clear(); },
    });
    player.loop = !!opts.loop;
    btn.addEventListener('click', () => {
      if (player.playing) { player.stop(); return; }
      GS.audio.current && GS.audio.current.stop();
      GS.audio.current = player;
      player.play({ countIn: !!opts.countIn });
    });
    mbtn.addEventListener('click', () => { player.metro = !player.metro; mbtn.classList.toggle('on', player.metro); if (player.playing) player.play(); });
    return {
      player, view, compiled,
      setTempo(bpm) { compiled.tempo = bpm; el.querySelector('[data-tempo]').textContent = bpm + ' BPM'; if (player.playing) player.play(); },
      destroy() { player.stop(true); view.destroy(); },
    };
  }

  /* Carte d'accord cliquable */
  function chordCard(name, opts) {
    const c = GS.data.chords.find((x) => x.name === name);
    if (!c) return '';
    return `<button class="chord-card" data-chord="${esc(name)}" title="Écouter ${esc(c.full)}">${GS.tab.chordDiagram(c.shape, c.fingers, opts)}<b>${esc(c.name)}</b>${opts && opts.full ? `<small>${esc(c.full)}</small>` : ''}</button>`;
  }

  /* Délégation d'événements limitée à une page */
  function on(root, type, selector, fn) {
    root.addEventListener(type, (e) => {
      const t = e.target.closest && e.target.closest(selector);
      if (t && root.contains(t)) fn(e, t);
    });
  }

  /* ---------- Routeur ---------- */
  const routes = [];
  function route(pattern, handler, meta) {
    const keys = [];
    const re = new RegExp('^' + pattern.replace(/:([a-z]+)/g, (_, k) => { keys.push(k); return '([^/]+)'; }) + '$');
    routes.push({ re, keys, handler, meta: meta || {} });
  }
  let cleanup = null;
  function dispatch() {
    const hash = decodeURIComponent(location.hash.replace(/^#/, '')).split('#')[0] || '/';
    GS.audio.stopAll();
    if (cleanup) { try { cleanup(); } catch (e) { console.error(e); } cleanup = null; }
    document.querySelectorAll('.overlay.page-modal').forEach((o) => o.remove()); // les célébrations survivent au changement de page
    const page = document.getElementById('page');
    const fresh = page.cloneNode(false); // repart d'un élément vierge : les écouteurs de l'ancienne page disparaissent
    page.replaceWith(fresh);
    const match = routes.map((r) => ({ r, m: r.re.exec(hash) })).find((x) => x.m);
    if (!match) { location.hash = '#/'; return; }
    const params = {};
    match.r.keys.forEach((k, i) => { params[k] = match.m[i + 1]; });
    window.scrollTo(0, 0);
    document.querySelectorAll('[data-nav]').forEach((a) => {
      const k = a.dataset.nav;
      a.classList.toggle('on', k === '/' ? hash === '/' : hash.startsWith(k));
      if (a.classList.contains('on')) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    setCrumb('');
    try { cleanup = match.r.handler(fresh, params) || null; }
    catch (e) { console.error(e); fresh.innerHTML = `<div class="empty"><h2>Cette page a rencontré un problème.</h2><p class="small" style="margin-top:8px">${esc(e.message)}</p><p style="margin-top:12px"><a class="btn" href="#/">Retour à l'accueil</a></p></div>`; }
  }
  function setCrumb(html) { const c = document.getElementById('crumb'); if (c) c.innerHTML = html; }

  GS.ui = { esc, md, icons, stars, rosette, toast, rewardToast, questDone, modal, levelUp, badge, celebrate, confetti, miniTab, chordCard, on, route, dispatch, setCrumb };
})();
