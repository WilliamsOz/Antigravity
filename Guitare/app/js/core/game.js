/* Gamification : XP, niveaux, médiators, série, quêtes, succès, boutique. */
(function () {
  const GS = window.GS = window.GS || {};
  const U = GS.util = GS.util || {};

  U.dateKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  U.today = () => U.dateKey(new Date());
  U.addDays = (key, n) => { const [y, m, d] = key.split('-').map(Number); return U.dateKey(new Date(y, m - 1, d + n)); };
  U.weekKey = (d) => { const x = new Date(d || new Date()); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return U.dateKey(x); };
  U.hash = (str) => { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
  U.seeded = (seed) => { let x = seed || 1; return () => { x ^= x << 13; x ^= x >>> 17; x ^= x << 5; x >>>= 0; return x / 4294967296; }; };

  /* ----------- Niveaux ----------- */
  const MAX_LEVEL = 60;
  const need = (lvl) => 40 + lvl * 35; // XP pour passer du niveau lvl à lvl+1
  const TITLES = [
    [1, 'Apprenti des cordes'], [3, 'Gratteur de salon'], [6, 'Tisseur d\'arpèges'], [10, 'Troubadour'],
    [14, 'Ménestrel'], [18, 'Explorateur andalou'], [23, 'Virtuose fingerstyle'], [28, 'Tocaor de Grenade'],
    [34, 'Maestro du nylon'], [41, 'Gardien du duende'], [50, 'Légende de la six-cordes'],
  ];

  function levelInfo(xp) {
    let lvl = 1, left = xp;
    while (lvl < MAX_LEVEL && left >= need(lvl)) { left -= need(lvl); lvl++; }
    const n = need(lvl);
    let title = TITLES[0][1];
    TITLES.forEach(([l, t]) => { if (lvl >= l) title = t; });
    const nextT = TITLES.find(([l]) => l > lvl);
    return { level: lvl, into: left, need: n, pct: Math.min(100, left / n * 100), title, nextTitle: nextT ? nextT[1] : null, nextTitleLevel: nextT ? nextT[0] : null };
  }

  function streakMult() {
    const c = GS.store.get().streak.count;
    return c >= 30 ? 1.5 : c >= 14 ? 1.3 : c >= 7 ? 1.2 : c >= 3 ? 1.1 : 1;
  }
  function boostActive() { return GS.store.get().shop.boostUntil > Date.now(); }

  /* ----------- Gains ----------- */
  function award(o) {
    const s = GS.store.get();
    const before = levelInfo(s.xp);
    const mult = streakMult() * (boostActive() ? 2 : 1);
    const xp = Math.round((o.xp || 0) * (o.raw ? 1 : mult));
    const picks = o.picks || 0;
    GS.store.update((st) => {
      st.xp += xp;
      st.picks += picks;
      const day = dayEntry(st);
      day.xp = (day.xp || 0) + xp;
    });
    if (!o.silent && (xp || picks)) GS.ui.rewardToast(xp, picks, o.reason);
    const after = levelInfo(GS.store.get().xp);
    if (after.level > before.level) {
      const bonus = 15 + after.level * 3;
      GS.store.update((st) => { st.picks += bonus; });
      GS.ui.levelUp(after, before, bonus);
    } else if (!o.silent && xp) GS.audio.chime('xp');
    checkBadges();
    return xp;
  }

  function dayEntry(st) {
    const k = U.today();
    return st.days[k] = st.days[k] || { minutes: 0, xp: 0, note: '', log: [] };
  }

  /* ----------- Série ----------- */
  function touchStreak() {
    const s = GS.store.get(), t = U.today();
    if (s.streak.last === t) return false;
    let gained = false;
    GS.store.update((st) => {
      const k = st.streak;
      if (k.last === U.addDays(t, -1)) k.count += 1; else k.count = 1;
      k.last = t;
      k.best = Math.max(k.best, k.count);
      gained = true;
    });
    return gained;
  }

  /* À l'ouverture : les jours manqués consomment un capo de protection, sinon la série retombe */
  function reviewStreak() {
    const s = GS.store.get(), t = U.today();
    if (!s.streak.last || s.streak.last === t || s.streak.last === U.addDays(t, -1)) return;
    let cursor = U.addDays(s.streak.last, 1), missed = 0;
    while (cursor !== t && missed < 400) { missed++; cursor = U.addDays(cursor, 1); }
    if (s.streak.freezes >= missed && missed > 0) {
      GS.store.update((st) => { st.streak.freezes -= missed; st.streak.last = U.addDays(t, -1); });
      GS.ui.toast(`Série sauvée ! ${missed} capo${missed > 1 ? 's' : ''} de protection utilisé${missed > 1 ? 's' : ''}.`, 'info');
    } else if (s.streak.count > 0) {
      const old = s.streak.count;
      GS.store.update((st) => { st.streak.count = 0; });
      GS.ui.toast(`Ta série de ${old} jour${old > 1 ? 's' : ''} est terminée. On en relance une aujourd'hui ?`, 'info');
    }
  }

  /* ----------- Pratique ----------- */
  function logPractice(minutes, kind, detail) {
    const before = GS.store.get().days[U.today()];
    const prevMin = before ? before.minutes : 0;
    const goal = GS.store.get().settings.dailyGoal;
    GS.store.update((st) => {
      const d = dayEntry(st);
      d.minutes += minutes;
      d.log.push({ kind, detail: detail || '', minutes, at: Date.now() });
      st.counters.minutes = (st.counters.minutes || 0) + minutes;
      const hour = new Date().getHours();
      if (hour < 8) st.counters.earlyBird = (st.counters.earlyBird || 0) + 1;
      if (hour >= 23) st.counters.nightOwl = (st.counters.nightOwl || 0) + 1;
    });
    touchStreak();
    track('minutes', minutes);
    award({ xp: Math.round(minutes * 4), reason: 'Pratique', silent: minutes <= 1 });
    if (prevMin < goal && prevMin + minutes >= goal) {
      award({ xp: 25, picks: 10, reason: 'Objectif du jour atteint !' });
      GS.store.update((st) => { st.counters.goalDays = (st.counters.goalDays || 0) + 1; });
      GS.audio.chime('quest');
    }
  }

  /* ----------- Quêtes ----------- */
  const QUESTS = [
    { id: 'min10', type: 'minutes', goal: 10, title: 'Joue 10 minutes', xp: 25, picks: 5, icon: '⏱️' },
    { id: 'min20', type: 'minutes', goal: 20, title: 'Joue 20 minutes', xp: 45, picks: 10, icon: '🔥' },
    { id: 'routine1', type: 'routine', goal: 1, title: 'Termine une routine', xp: 40, picks: 10, icon: '🎯' },
    { id: 'lesson1', type: 'lesson', goal: 1, title: 'Valide une leçon', xp: 35, picks: 8, icon: '📖' },
    { id: 'lesson2', type: 'lesson', goal: 2, title: 'Valide deux leçons', xp: 60, picks: 14, icon: '📚' },
    { id: 'song1', type: 'songPractice', goal: 1, title: 'Travaille un morceau au métronome', xp: 30, picks: 6, icon: '🎵' },
    { id: 'songStar', type: 'songStar', goal: 1, title: 'Gagne une étoile sur un morceau', xp: 50, picks: 12, icon: '⭐' },
    { id: 'game1', type: 'game', goal: 1, title: 'Fais une partie d\'entraînement', xp: 20, picks: 5, icon: '🕹️' },
    { id: 'game3', type: 'game', goal: 3, title: 'Fais trois parties d\'entraînement', xp: 40, picks: 10, icon: '🎮' },
    { id: 'fret10', type: 'fretRight', goal: 10, title: 'Trouve 10 notes sur le manche', xp: 30, picks: 8, icon: '🧭' },
    { id: 'ear5', type: 'earRight', goal: 5, title: 'Reconnais 5 sons à l\'oreille', xp: 30, picks: 8, icon: '👂' },
    { id: 'changes', type: 'chordChanges', goal: 1, title: 'Fais un test de changements d\'accords', xp: 30, picks: 8, icon: '🤘' },
    { id: 'bpm', type: 'bpmRecord', goal: 1, title: 'Bats ton record de tempo sur un exercice', xp: 45, picks: 12, icon: '⚡' },
    { id: 'tune', type: 'tuner', goal: 1, title: 'Accorde ta guitare', xp: 10, picks: 3, icon: '🎚️' },
    { id: 'journal', type: 'journal', goal: 1, title: 'Écris une note dans ton journal', xp: 10, picks: 3, icon: '✍️' },
  ];
  const WEEKLY = [
    { id: 'w-days5', type: 'weekDays', goal: 5, title: 'Joue 5 jours cette semaine', xp: 150, picks: 50, icon: '📅' },
    { id: 'w-min90', type: 'minutes', goal: 90, title: 'Cumule 90 minutes cette semaine', xp: 150, picks: 50, icon: '⏳' },
    { id: 'w-routine4', type: 'routine', goal: 4, title: 'Termine 4 routines cette semaine', xp: 120, picks: 40, icon: '🏋️' },
    { id: 'w-lesson5', type: 'lesson', goal: 5, title: 'Valide 5 leçons cette semaine', xp: 140, picks: 45, icon: '🎓' },
    { id: 'w-star3', type: 'songStar', goal: 3, title: 'Gagne 3 étoiles cette semaine', xp: 130, picks: 45, icon: '🌟' },
  ];

  function refreshQuests() {
    const s = GS.store.get(), t = U.today(), w = U.weekKey();
    if (s.quests.date !== t) {
      const rnd = U.seeded(U.hash('q' + t));
      const pool = QUESTS.slice();
      const list = [];
      while (list.length < 3 && pool.length) {
        const q = pool.splice(Math.floor(rnd() * pool.length), 1)[0];
        if (list.some((x) => x.type === q.type)) continue;
        list.push({ id: q.id, progress: 0, done: false });
      }
      GS.store.update((st) => { st.quests.date = t; st.quests.list = list; st.quests.chest = false; st.quests.rerolled = false; });
    }
    if (s.quests.week !== w) {
      const rnd = U.seeded(U.hash('w' + w));
      const pool = WEEKLY.slice();
      const picks = [pool.splice(Math.floor(rnd() * pool.length), 1)[0], pool.splice(Math.floor(rnd() * pool.length), 1)[0]];
      GS.store.update((st) => { st.quests.week = w; st.quests.weekly = picks.map((q) => ({ id: q.id, progress: 0, done: false })); });
    }
  }

  const questDef = (id) => QUESTS.find((q) => q.id === id) || WEEKLY.find((q) => q.id === id);

  function track(type, amount) {
    amount = amount == null ? 1 : amount;
    refreshQuests();
    const finished = [];
    GS.store.update((st) => {
      st.counters[type] = (st.counters[type] || 0) + amount;
      st.quests.list.concat(st.quests.weekly).forEach((q) => {
        const def = questDef(q.id);
        if (!def || q.done || def.type !== type) return;
        q.progress = Math.min(def.goal, q.progress + amount);
        if (q.progress >= def.goal) { q.done = true; finished.push(def); }
      });
    });
    // Jours joués dans la semaine (un seul incrément par jour)
    if (type === 'minutes') {
      GS.store.update((st) => {
        const days = Object.keys(st.days).filter((d) => U.weekKey(new Date(d + 'T12:00:00')) === U.weekKey() && st.days[d].minutes > 0).length;
        st.quests.weekly.forEach((q) => {
          const def = questDef(q.id);
          if (def && def.type === 'weekDays' && !q.done) {
            q.progress = Math.min(def.goal, days);
            if (q.progress >= def.goal) { q.done = true; finished.push(def); }
          }
        });
      });
    }
    finished.forEach((def) => {
      GS.ui.questDone(def);
      award({ xp: def.xp, picks: def.picks, reason: 'Quête : ' + def.title, silent: true });
      GS.store.update((st) => { st.counters.questsDone = (st.counters.questsDone || 0) + 1; });
    });
    checkBadges();
  }

  function canOpenChest() {
    const q = GS.store.get().quests;
    return q.list.length > 0 && q.list.every((x) => x.done) && !q.chest;
  }

  function openChest() {
    if (!canOpenChest()) return null;
    const rnd = Math.random();
    const reward = rnd > 0.92 ? { xp: 150, picks: 60, label: 'Coffre légendaire' } : rnd > 0.65 ? { xp: 90, picks: 35, label: 'Coffre rare' } : { xp: 50, picks: 20, label: 'Coffre de bois' };
    GS.store.update((st) => { st.quests.chest = true; st.counters.chests = (st.counters.chests || 0) + 1; });
    award({ xp: reward.xp, picks: reward.picks, reason: reward.label, raw: true });
    return reward;
  }

  function rerollQuest(i) {
    const s = GS.store.get();
    if (s.quests.rerolled || s.picks < 15 || s.quests.list[i].done) return false;
    const taken = s.quests.list.map((q) => questDef(q.id).type);
    const pool = QUESTS.filter((q) => !taken.includes(q.type));
    const q = pool[Math.floor(Math.random() * pool.length)];
    GS.store.update((st) => { st.picks -= 15; st.quests.rerolled = true; st.quests.list[i] = { id: q.id, progress: 0, done: false }; });
    return true;
  }

  /* ----------- Morceaux : étoiles de maîtrise ----------- */
  const STAR_STEPS = [
    { n: 1, label: 'Déchiffré', hint: 'Tu connais toutes les notes, même très lentement.', xp: 30, picks: 8 },
    { n: 2, label: 'À 60 % du tempo', hint: 'Sans arrêt, au métronome, à 60 %.', xp: 50, picks: 12 },
    { n: 3, label: 'À 80 % du tempo', hint: 'Fluide, avec des changements propres.', xp: 80, picks: 18 },
    { n: 4, label: 'Au tempo', hint: 'Au tempo indiqué, du début à la fin.', xp: 120, picks: 28 },
    { n: 5, label: 'Par cœur', hint: 'Sans regarder la tablature, avec des nuances.', xp: 180, picks: 45 },
  ];
  const LEVEL_MULT = { debutant: 1, intermediaire: 1.5, expert: 2.2 };

  function setStars(song, n) {
    const s = GS.store.get(), cur = (s.songs[song.id] || {}).stars || 0;
    if (n <= cur) {
      GS.store.update((st) => { st.songs[song.id] = Object.assign({ minutes: 0, plays: 0 }, st.songs[song.id], { stars: n }); });
      return;
    }
    let xp = 0, picks = 0;
    for (let i = cur; i < n; i++) { xp += STAR_STEPS[i].xp; picks += STAR_STEPS[i].picks; }
    const mult = LEVEL_MULT[song.level] || 1;
    GS.store.update((st) => { st.songs[song.id] = Object.assign({ minutes: 0, plays: 0 }, st.songs[song.id], { stars: n, lastAt: Date.now() }); });
    track('songStar', n - cur);
    award({ xp: Math.round(xp * mult), picks: Math.round(picks * mult), reason: `${song.title} — ${n} ★` });
    if (n === 5) GS.ui.celebrate(`${song.title} maîtrisé !`, 'Cinq étoiles. Il fait maintenant partie de ton répertoire.');
    else GS.audio.chime('ok');
  }

  /* ----------- Records de tempo ----------- */
  function setBpmRecord(exId, bpm) {
    const prev = (GS.store.get().exercises[exId] || {}).best || 0;
    GS.store.update((st) => {
      const e = st.exercises[exId] = st.exercises[exId] || { best: 0, history: [] };
      e.history.push({ d: U.today(), bpm });
      e.best = Math.max(e.best, bpm);
    });
    if (bpm > prev && prev > 0) {
      track('bpmRecord');
      award({ xp: 20, picks: 5, reason: `Record : ${bpm} BPM` });
    }
    return bpm > prev;
  }

  /* ----------- Succès ----------- */
  function checkBadges() {
    const s = GS.store.get(), list = (GS.data && GS.data.badges) || [];
    const fresh = [];
    list.forEach((b) => {
      if (s.badges[b.id]) return;
      let ok = false;
      try { ok = b.test(s, api); } catch (e) { ok = false; }
      if (ok) fresh.push(b);
    });
    if (!fresh.length) return;
    GS.store.update((st) => { fresh.forEach((b) => { st.badges[b.id] = U.today(); }); });
    fresh.forEach((b) => {
      GS.store.update((st) => { st.picks += b.picks || 15; st.xp += b.xp || 25; });
      GS.ui.badge(b);
    });
  }

  /* ----------- Boutique ----------- */
  function buy(item) {
    const s = GS.store.get();
    if (s.picks < item.price) return false;
    const owned = s.shop.owned.includes(item.id);
    if (owned && !item.consumable) return false;
    if (item.id === 'freeze' && s.streak.freezes >= 3) return false;
    GS.store.update((st) => {
      st.picks -= item.price;
      st.counters.purchases = (st.counters.purchases || 0) + 1;
      if (item.consumable) {
        if (item.id === 'freeze') st.streak.freezes += 1;
        if (item.id === 'boost') st.shop.boostUntil = Math.max(Date.now(), st.shop.boostUntil) + 3600 * 1000;
      } else st.shop.owned.push(item.id);
    });
    GS.audio.chime('ok');
    checkBadges();
    return true;
  }

  const api = {
    levelInfo, award, logPractice, track, touchStreak, reviewStreak, refreshQuests, questDef, canOpenChest, openChest, rerollQuest,
    setStars, setBpmRecord, checkBadges, buy, streakMult, boostActive, STAR_STEPS, LEVEL_MULT, QUESTS, WEEKLY, MAX_LEVEL, TITLES,
  };
  GS.game = api;
})();
