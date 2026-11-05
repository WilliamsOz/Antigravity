/* Sauvegarde locale de la progression, avec import de l'ancienne version et export/import en fichier. */
(function () {
  const GS = window.GS = window.GS || {};
  const KEY = 'gs2_state';

  // Jours pré-remplis par l'ancienne app sans que l'utilisateur ait joué : on ne les importe pas.
  const OLD_FAKE_DAYS = ['2026-10-02', '2026-10-03', '2026-10-05', '2026-10-06', '2026-10-08', '2026-10-09', '2026-10-12', '2026-10-14', '2026-10-15', '2026-10-16', '2026-10-17', '2026-10-18'];
  const OLD_SONG_MAP = { romance: 'romance', malaguena: 'malaguena', bellaciao: 'bella-ciao', greensleeves: 'greensleeves', asturias: 'asturias', rising: 'rising-sun', zorro: 'spanish-tango', godfather: 'godfather', nothing: 'nothing-else-matters' };

  function fresh() {
    return {
      v: 2, createdAt: Date.now(),
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

  function load() {
    let saved = null;
    try { saved = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { saved = null; }
    state = saved ? deepMerge(fresh(), saved) : fresh();
    migrateOld(state);
    save();
    return state;
  }

  let saveQueued = false;
  function save() {
    if (saveQueued) return;
    saveQueued = true;
    Promise.resolve().then(() => {
      saveQueued = false;
      try { localStorage.setItem(KEY, JSON.stringify(state)); }
      catch (e) { GS.ui && GS.ui.toast('Sauvegarde impossible : stockage plein ou bloqué.', 'bad'); }
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
    state = deepMerge(fresh(), data);
    save(); emit();
  }

  function reset() {
    state = fresh();
    state.migrated = true; // une remise à zéro volontaire ne réimporte pas l'ancienne version
    save(); emit();
  }

  GS.store = { load, get: () => state, update, save, onChange: (fn) => listeners.add(fn), exportFile, importText, reset };
})();
