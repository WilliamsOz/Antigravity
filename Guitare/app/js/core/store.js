/* Sauvegarde locale de la progression, avec import de l'ancienne version, auto-sauvegarde Git et export/import en fichier. */
(function () {
  const GS = window.GS = window.GS || {};
  const KEY = 'gs2_state';

  // Jours pré-remplis par l'ancienne app sans que l'utilisateur ait joué : on ne les importe pas.
  const OLD_FAKE_DAYS = ['2026-10-02', '2026-10-03', '2026-10-05', '2026-10-06', '2026-10-08', '2026-10-09', '2026-10-12', '2026-10-14', '2026-10-15', '2026-10-16', '2026-10-17', '2026-10-18'];
  const OLD_SONG_MAP = { romance: 'romance', malaguena: 'malaguena', bellaciao: 'bella-ciao', greensleeves: 'greensleeves', asturias: 'asturias', rising: 'rising-sun', zorro: 'spanish-tango', godfather: 'godfather', nothing: 'nothing-else-matters' };

  function fresh() {
    return {
      v: 2, createdAt: Date.now(),
      updatedAt: Date.now(),
      resetAt: null,
      xp: 0, picks: 40,
      streak: { count: 0, best: 0, last: null, freezes: 1 },
      days: {},
      lessons: {},
      songs: {},
      routines: { done: {}, custom: [], lastId: null },
      exercises: {},
      games: {},
      quests: { date: null, list: [], chest: false, week: null, weekly: [] },
      badges: {},
      shop: { owned: ['theme-palissandre', 'paper-parchemin'], theme: 'palissandre', paper: 'parchemin', boostUntil: 0 },
      counters: {},
      settings: { volume: 0.9, sfx: true, dailyGoal: 15, unlockAll: false, pima: true, noteNames: false, reduceMotion: false },
      migrated: false,
    };
  }

  function deepMerge(base, extra) {
    Object.keys(extra || {}).forEach((k) => {
      const v = extra[k];
      if (v && typeof v === 'object' && !Array.isArray(v) && base[k] && typeof base[k] === 'object' && !Array.isArray(base[k])) deepMerge(base[k], v);
      else base[k] = v;
    });
    return base;
  }

  /* Fusion intelligente multi-appareils (Mac <-> Windows) pour ne jamais perdre de points, leçons ou étoiles */
  function smartMerge(a, b) {
    if (!a && !b) return fresh();
    if (!a) return deepMerge(fresh(), b);
    if (!b) return deepMerge(fresh(), a);

    // Prise en compte d'un reset volontaire
    const resetA = a.resetAt || 0, resetB = b.resetAt || 0;
    if (resetB && resetB > (a.updatedAt || 0)) {
      return deepMerge(fresh(), b);
    }
    if (resetA && resetA > (b.updatedAt || 0)) {
      return deepMerge(fresh(), a);
    }

    const res = deepMerge(fresh(), a);

    res.xp = Math.max(a.xp || 0, b.xp || 0);
    res.picks = Math.max(a.picks || 0, b.picks || 0);

    const stA = a.streak || {}, stB = b.streak || {};
    res.streak = {
      count: Math.max(stA.count || 0, stB.count || 0),
      best: Math.max(stA.best || 0, stB.best || 0),
      last: (stA.last && stB.last) ? (stA.last > stB.last ? stA.last : stB.last) : (stA.last || stB.last || null),
      freezes: Math.max(stA.freezes || 0, stB.freezes || 0),
    };

    res.days = Object.assign({}, b.days || {}, a.days || {});
    const allDays = new Set([...Object.keys(a.days || {}), ...Object.keys(b.days || {})]);
    allDays.forEach((d) => {
      const d1 = (a.days || {})[d], d2 = (b.days || {})[d];
      if (d1 && d2) {
        res.days[d] = {
          minutes: Math.max(d1.minutes || 0, d2.minutes || 0),
          xp: Math.max(d1.xp || 0, d2.xp || 0),
          note: d1.note || d2.note || '',
          log: ((d1.log && d1.log.length) > ((d2.log && d2.log.length) || 0)) ? d1.log : (d2.log || []),
        };
      }
    });

    res.lessons = Object.assign({}, b.lessons || {}, a.lessons || {});

    res.songs = {};
    const allSongs = new Set([...Object.keys(a.songs || {}), ...Object.keys(b.songs || {})]);
    allSongs.forEach((id) => {
      const s1 = (a.songs || {})[id], s2 = (b.songs || {})[id];
      if (s1 && s2) {
        res.songs[id] = {
          stars: Math.max(s1.stars || 0, s2.stars || 0),
          minutes: Math.max(s1.minutes || 0, s2.minutes || 0),
          plays: Math.max(s1.plays || 0, s2.plays || 0),
        };
      } else {
        res.songs[id] = s1 || s2;
      }
    });

    res.badges = Object.assign({}, b.badges || {}, a.badges || {});
    res.exercises = Object.assign({}, b.exercises || {}, a.exercises || {});
    res.games = Object.assign({}, b.games || {}, a.games || {});
    res.counters = Object.assign({}, b.counters || {}, a.counters || {});

    const rA = a.routines || {}, rB = b.routines || {};
    const customs = new Map();
    (rA.custom || []).concat(rB.custom || []).forEach((c) => { if (c) customs.set(c.id || c.title, c); });
    res.routines = {
      done: Object.assign({}, rB.done || {}, rA.done || {}),
      custom: Array.from(customs.values()),
      lastId: rA.lastId || rB.lastId || null,
    };

    const owned = new Set([...((a.shop && a.shop.owned) || []), ...((b.shop && b.shop.owned) || [])]);
    const newer = ((b.updatedAt || 0) > (a.updatedAt || 0)) ? b : a;
    res.shop = {
      owned: Array.from(owned),
      theme: (newer.shop && newer.shop.theme) || (a.shop && a.shop.theme) || 'palissandre',
      paper: (newer.shop && newer.shop.paper) || (a.shop && a.shop.paper) || 'parchemin',
      boostUntil: Math.max((a.shop && a.shop.boostUntil) || 0, (b.shop && b.shop.boostUntil) || 0),
    };

    res.settings = Object.assign({}, fresh().settings, (newer.settings || a.settings || b.settings || {}));
    res.quests = newer.quests || a.quests || b.quests;

    res.updatedAt = Math.max(a.updatedAt || 0, b.updatedAt || 0, Date.now());
    res.migrated = a.migrated || b.migrated || false;
    return res;
  }

  function migrateOld(s) {
    if (s.migrated) return s;
    s.migrated = true;
    try {
      const oldXp = parseInt(localStorage.getItem('guitare_xp') || '0', 10);
      if (oldXp > 45) s.xp += oldXp; // 45 était la valeur offerte par défaut
      const cal = JSON.parse(localStorage.getItem('guitare_routine_calendar') || 'null');
      if (cal) {
        Object.keys(cal).forEach((d) => {
          const e = cal[d];
          if (!e || !e.completed) return;
          if (OLD_FAKE_DAYS.includes(d) && e.xp === 100 && e.minutes === 15) return;
          s.days[d] = { minutes: e.minutes || 15, xp: e.xp || 0, note: e.note || '', log: [] };
        });
      }
      Object.keys(OLD_SONG_MAP).forEach((id) => {
        if (localStorage.getItem('guitare_song_learned_' + id) === 'true') s.songs[OLD_SONG_MAP[id]] = { stars: 3, minutes: 0, plays: 0 };
      });
    } catch (e) { /* ancienne donnée illisible : on repart proprement */ }
    return s;
  }

  let state = null;
  const listeners = new Set();
  let serverSyncActive = false;

  function load() {
    let saved = null;
    try { saved = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { saved = null; }
    const fileState = (typeof window !== 'undefined' && window.GS_SAVED_STATE) ? window.GS_SAVED_STATE : null;

    state = smartMerge(saved, fileState);
    migrateOld(state);
    save();

    // Si on tourne via le serveur local (HTTP), on synchronise immédiatement avec progression.json
    if (typeof location !== 'undefined' && location.protocol.startsWith('http')) {
      fetch('/api/save')
        .then((r) => (r.ok ? r.json() : null))
        .then((serverData) => {
          if (serverData && serverData.v === 2) {
            serverSyncActive = true;
            const merged = smartMerge(state, serverData);
            const isDifferent = JSON.stringify(merged) !== JSON.stringify(state);
            state = merged;
            if (isDifferent) {
              try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
              emit();
            }
            if (JSON.stringify(merged) !== JSON.stringify(serverData)) {
              syncServer();
            }
          }
        })
        .catch(() => {
          serverSyncActive = false;
        });
    }

    return state;
  }

  let saveQueued = false;
  let syncTimer = null;

  function save() {
    if (saveQueued) return;
    saveQueued = true;
    Promise.resolve().then(() => {
      saveQueued = false;
      if (state) state.updatedAt = Date.now();
      try { localStorage.setItem(KEY, JSON.stringify(state)); }
      catch (e) { GS.ui && GS.ui.toast('Sauvegarde impossible : stockage plein ou bloqué.', 'bad'); }
      syncServer();
    });
  }

  function syncServer() {
    if (typeof location === 'undefined' || !location.protocol.startsWith('http')) return;
    if (syncTimer) clearTimeout(syncTimer);
    syncTimer = setTimeout(() => {
      if (!state) return;
      fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      })
      .then((r) => {
        if (r.ok) serverSyncActive = true;
      })
      .catch(() => {
        serverSyncActive = false;
      });
    }, 250);
  }

  // Sauvegarde garantie à la fermeture de l'onglet ou rafraîchissement
  if (typeof window !== 'undefined' && window.addEventListener) {
    window.addEventListener('beforeunload', () => {
      if (location.protocol.startsWith('http') && state && navigator.sendBeacon) {
        state.updatedAt = Date.now();
        const blob = new Blob([JSON.stringify(state)], { type: 'application/json' });
        navigator.sendBeacon('/api/save', blob);
      }
    });
  }

  function emit() { listeners.forEach((fn) => fn(state)); }

  function update(fn) { fn(state); save(); emit(); }

  function exportFile() {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'guitarstudio-progression-' + GS.util.today() + '.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  function importText(txt) {
    const data = JSON.parse(txt);
    if (!data || data.v !== 2) throw new Error('Fichier non reconnu');
    state = smartMerge(state, data);
    save(); emit();
  }

  function reset() {
    state = fresh();
    state.migrated = true;
    state.resetAt = Date.now();
    state.updatedAt = Date.now();
    save(); emit();
  }

  GS.store = {
    load,
    get: () => state,
    update,
    save,
    onChange: (fn) => listeners.add(fn),
    exportFile,
    importText,
    reset,
    isServerActive: () => serverSyncActive,
  };
})();
