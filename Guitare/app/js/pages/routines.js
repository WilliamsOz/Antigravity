/* Routines : bibliothèque, créateur, lecteur guidé. */
(function () {
  const { esc, icons, route, on, setCrumb, miniTab, chordCard, rosette } = GS.ui;
  const filters = { goal: 'all', level: 'all', time: 'all' };
  const findEx = (id) => GS.data.exercises.find((e) => e.id === id);
  const allRoutines = () => GS.store.get().routines.custom.concat(GS.data.routines);
  const findRoutine = (id) => allRoutines().find((r) => r.id === id);
  const fmt = (t) => { const sec = Math.ceil(t); return `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`; };

  function card(r) {
    const n = GS.store.get().routines.done[r.id] || 0;
    return `<a class="card link routine-card" href="#/routines/${r.id}">
      <div class="row between"><span class="ic">${r.icon || '🎯'}</span><span class="chip accent">${r.minutes} min</span></div>
      <div><h3>${esc(r.title)}</h3><div class="small muted" style="margin-top:2px">${esc(r.subtitle || '')}</div></div>
      <div class="foot"><span class="chip ${r.level}">${GS.labels.level[r.level]}</span><span class="chip">${esc(GS.labels.goal[r.goal] || r.goal)}</span>${n ? `<span class="tiny faint">fait ${n}×</span>` : ''}</div>
    </a>`;
  }

  function list(root) {
    const rec = GS.home.recommendRoutine();
    const custom = GS.store.get().routines.custom;
    const matches = (r) => (filters.goal === 'all' || r.goal === filters.goal) && (filters.level === 'all' || r.level === filters.level) && (filters.time === 'all' || (filters.time === 'long' ? r.minutes >= 30 : r.minutes === +filters.time));
    const chips = (g, opts) => opts.map(([v, l]) => `<button class="filter ${filters[g] === v ? 'on' : ''}" data-f="${g}" data-v="${v}">${esc(l)}</button>`).join('');
    const results = () => {
      const hits = GS.data.routines.filter(matches);
      return hits.length ? `<div class="grid gauto">${hits.map(card).join('')}</div>` : '<div class="empty">Aucune routine avec ces filtres.</div>';
    };
    root.innerHTML = `<header class="page-head">
        <div class="eyebrow">Tes séances</div>
        <h1 style="margin-top:6px">Les routines</h1>
        <p>Choisis le temps que tu as et ce que tu veux travailler. L'appli te guide exercice par exercice, avec chrono, tablature et métronome.</p>
      </header>
      <a class="card link feature" href="#/routines/${rec.id}" style="margin-bottom:18px"><div class="row between">
        <div class="grow"><div class="eyebrow">Conseillée aujourd'hui</div><h2 style="margin-top:4px">${rec.icon || ''} ${esc(rec.title)}</h2><p class="small muted">${esc(rec.subtitle || '')}</p></div>
        <span class="chip accent">${rec.minutes} min</span></div></a>
      <div class="stack" style="--gap:8px;margin-bottom:16px">
        <div class="filter-group">${chips('time', [['all', 'Toute durée'], ['5', '5 min'], ['10', '10 min'], ['15', '15 min'], ['20', '20 min'], ['long', '30 min et plus']])}</div>
        <div class="filter-group">${chips('level', [['all', 'Tous niveaux'], ['debutant', 'Débutant'], ['intermediaire', 'Intermédiaire'], ['expert', 'Expert']])}</div>
        <div class="filter-group">${chips('goal', [['all', 'Tous objectifs'], ...Object.entries(GS.labels.goal)])}</div>
      </div>
      <div data-results>${results()}</div>
      <div class="section-head"><h2>Mes routines</h2><a class="btn" href="#/routines/creer">${icons.plus}Créer une routine</a></div>
      ${custom.length ? `<div class="grid gauto">${custom.map(card).join('')}</div>` : '<div class="empty">Compose ta séance idéale à partir des exercices : elle apparaîtra ici.</div>'}`;
    on(root, 'click', '[data-f]', (e, t) => {
      filters[t.dataset.f] = t.dataset.v;
      root.querySelectorAll(`[data-f="${t.dataset.f}"]`).forEach((b) => b.classList.toggle('on', b === t));
      root.querySelector('[data-results]').innerHTML = results();
    });
  }

  function detail(root, params) {
    const r = findRoutine(params.id);
    if (!r) { location.hash = '#/routines'; return; }
    setCrumb(`<a href="#/routines">Routines</a> / ${esc(r.title)}`);
    const isCustom = r.id.startsWith('c-');
    root.innerHTML = `<div class="lesson">
      <header class="page-head"><div class="row" style="--gap:6px"><span class="chip ${r.level}">${GS.labels.level[r.level]}</span><span class="chip">${esc(GS.labels.goal[r.goal] || '')}</span><span class="chip accent">${r.minutes} min</span></div>
        <h1 style="margin-top:9px">${r.icon || ''} ${esc(r.title)}</h1><p>${esc(r.subtitle || '')}</p></header>
      <div class="step-list">${r.steps.map((st, i) => {
        const ex = st.ex && findEx(st.ex);
        return `<div class="step-item"><span class="n">${i + 1}</span><div class="grow"><b>${esc(ex ? ex.title : st.free)}</b>${st.note || st.hint ? `<div class="small muted">${esc(st.note || st.hint)}</div>` : ''}</div><span class="small faint num">${st.min} min</span></div>`;
      }).join('')}</div>
      <div class="row" style="margin-top:20px">
        <a class="btn primary lg" href="#/routines/${r.id}/jouer">${icons.play}Démarrer</a>
        ${isCustom ? `<button class="btn danger" data-del>${icons.trash}Supprimer</button>` : ''}
      </div></div>`;
    on(root, 'click', '[data-del]', () => {
      GS.store.update((st) => { st.routines.custom = st.routines.custom.filter((x) => x.id !== r.id); });
      location.hash = '#/routines';
    });
  }

  /* ---------- Lecteur guidé ---------- */
  function player(root, params) {
    const r = findRoutine(params.id);
    if (!r) { location.hash = '#/routines'; return; }
    setCrumb(`<a href="#/routines">Routines</a> / ${esc(r.title)}`);
    let idx = 0, left = r.steps[0].min * 60, paused = false, spent = 0, last = Date.now(), mini = null, bpm = 0, finished = false;
    const total = r.steps.reduce((n, s) => n + s.min * 60, 0);

    function chrome() {
      const step = r.steps[idx], ex = step.ex && findEx(step.ex);
      bpm = ex ? Math.max(ex.bpm, (GS.store.get().exercises[ex.id] || {}).best || 0) : 0;
      const song = GS.home.currentSong();
      root.innerHTML = `
        <div class="player-seg no-print">${r.steps.map((s, i) => `<i style="flex:${s.min}" data-seg="${i}"><b style="width:${i < idx ? 100 : 0}%"></b></i>`).join('')}</div>
        <section class="player-top">
          <div data-ring></div>
          <div class="grow">
            <div class="eyebrow">Étape ${idx + 1} sur ${r.steps.length} · ${esc(r.title)}</div>
            <h2 style="margin-top:3px">${esc(ex ? ex.title : step.free)}</h2>
            <div class="small muted">${esc(step.note || step.hint || (ex && ex.desc) || '')}</div>
          </div>
          <div class="row actions">
            <button class="btn" data-pause>${paused ? icons.play + 'Reprendre' : icons.pause + 'Pause'}</button>
            <button class="btn primary" data-next>${idx + 1 < r.steps.length ? 'Étape suivante' : 'Terminer'}${icons.next}</button>
          </div>
        </section>
        <div class="song-layout">
          <div class="stack">
            ${ex && ex.bars ? `<div data-tab></div>` : ''}
            ${ex ? `<div class="card tight"><div class="row between">
                <div class="row" style="--gap:7px">
                  <button class="btn sm" data-bpm="-5">−5</button>
                  <span class="num" style="font:600 1.45rem 'Fraunces',serif" data-bpmv>${bpm}</span><span class="small faint">BPM</span>
                  <button class="btn sm" data-bpm="5">+5</button>
                </div>
                <div class="row" style="--gap:7px">
                  <span class="tiny faint">Record : ${(GS.store.get().exercises[ex.id] || {}).best || '—'} · Cible : ${ex.bpmTarget || '—'}</span>
                  <button class="btn sm" data-record>${icons.check}Propre à ce tempo</button>
                </div>
              </div></div>` : ''}
            ${!ex ? `<div class="card"><p>${esc(step.hint || 'Joue ce que tu veux, pour le plaisir.')}</p>
              ${song ? `<a class="btn" style="margin-top:12px" href="#/morceaux/${song.id}" target="_blank" rel="noopener">${icons.music}Ouvrir ${esc(song.title)} dans un onglet</a>` : `<a class="btn" style="margin-top:12px" href="#/morceaux" target="_blank" rel="noopener">${icons.music}Choisir un morceau dans un onglet</a>`}
            </div>` : ''}
            ${ex && ex.chords && ex.chords.length ? `<div class="chord-row">${ex.chords.map((c) => chordCard(c)).join('')}</div>` : ''}
          </div>
          <aside class="stack">
            ${ex && ex.tips && ex.tips.length ? `<div class="card tight"><h3 style="margin-bottom:6px">Le conseil du prof</h3><ul class="small" style="margin:0;padding-left:18px;display:grid;gap:6px">${ex.tips.map((t) => `<li>${GS.ui.md(t)}</li>`).join('')}</ul></div>` : ''}
            <div class="card tight"><h3 style="margin-bottom:8px">Programme</h3><div class="step-list">${r.steps.map((s, i) => {
              const e2 = s.ex && findEx(s.ex);
              return `<div class="step-item ${i === idx ? 'now' : i < idx ? 'past' : ''}" style="padding:6px 8px"><span class="n" style="width:21px;height:21px">${i < idx ? '✓' : i + 1}</span><span class="small grow">${esc(e2 ? e2.title : s.free)}</span><span class="tiny faint num">${s.min}'</span></div>`;
            }).join('')}</div></div>
          </aside>
        </div>`;
      if (mini) { mini.destroy(); mini = null; }
      const tabEl = root.querySelector('[data-tab]');
      if (tabEl) mini = miniTab(tabEl, { title: '', time: ex.time, tempo: bpm, bars: ex.bars, pima: ex.pima }, { loop: true, countIn: true });
      paint();
    }

    function paint() {
      const step = r.steps[idx], dur = step.min * 60;
      const ring = root.querySelector('[data-ring]');
      if (ring) ring.innerHTML = rosette(1 - left / dur, 100, fmt(left));
      const seg = root.querySelector(`[data-seg="${idx}"] b`);
      if (seg) seg.style.width = (1 - left / dur) * 100 + '%';
    }

    function next() {
      if (idx + 1 < r.steps.length) {
        idx++;
        left = r.steps[idx].min * 60;
        GS.audio.stopAll();
        GS.audio.chime('ok');
        chrome();
      } else finish();
    }

    function finish() {
      if (finished) return;
      finished = true;
      clearInterval(tick);
      GS.audio.stopAll();
      const minutes = Math.max(1, Math.round(spent / 60));
      const wasFull = spent >= total * 0.6;
      GS.game.logPractice(minutes, 'routine', r.title);
      if (wasFull) {
        GS.store.update((st) => { st.routines.done[r.id] = (st.routines.done[r.id] || 0) + 1; st.routines.lastId = r.id; });
        GS.game.track('routine');
        GS.game.award({ xp: 25 + r.minutes * 2, picks: 6 + r.minutes, reason: 'Routine terminée' });
        GS.ui.confetti(90);
        GS.audio.chime('quest');
      }
      const s = GS.store.get();
      root.innerHTML = `<div class="lesson" style="text-align:center;padding-top:20px">
        <div style="font-size:3rem">${wasFull ? '🎉' : '👍'}</div>
        <h1 style="margin-top:6px">${wasFull ? 'Séance terminée !' : 'C\'est toujours ça de pris.'}</h1>
        <p class="muted" style="margin-top:7px">${minutes} minute${minutes > 1 ? 's' : ''} de guitare, ${s.streak.count} jour${s.streak.count > 1 ? 's' : ''} de suite.${wasFull ? '' : ' Termine au moins 60 % d\'une routine pour la valider et gagner son bonus.'}</p>
        <div class="card" style="margin:20px 0;text-align:left">
          <label class="small" for="journal" style="font-weight:600">Comment ça s'est passé ? (facultatif)</label>
          <textarea id="journal" class="input" style="margin-top:7px" placeholder="Ce qui a bien marché, ce qui coince encore…"></textarea>
          <button class="btn sm" style="margin-top:7px" data-savenote>Enregistrer dans mon journal</button>
        </div>
        <div class="row" style="justify-content:center"><a class="btn primary" href="#/">Retour à l'accueil</a><a class="btn" href="#/morceaux">Jouer un morceau</a></div>
      </div>`;
      on(root, 'click', '[data-savenote]', (e, t) => {
        const v = root.querySelector('#journal').value.trim();
        if (!v) return;
        GS.store.update((st) => { const d = st.days[GS.util.today()]; if (d) d.note = (d.note ? d.note + '\n' : '') + v; });
        GS.game.track('journal');
        t.textContent = 'Enregistré ✓'; t.disabled = true;
      });
    }

    const tick = setInterval(() => {
      const now = Date.now(), dt = (now - last) / 1000;
      last = now;
      if (paused || finished) return;
      spent += dt;
      left = Math.max(0, left - dt);
      paint();
      if (left <= 0) { GS.audio.chime('quest'); next(); }
    }, 250);

    on(root, 'click', '[data-pause]', (e, t) => {
      paused = !paused;
      t.innerHTML = paused ? icons.play + 'Reprendre' : icons.pause + 'Pause';
      if (paused) GS.audio.stopAll();
    });
    on(root, 'click', '[data-next]', next);
    on(root, 'click', '[data-bpm]', (e, t) => {
      bpm = Math.max(30, Math.min(260, bpm + +t.dataset.bpm));
      root.querySelector('[data-bpmv]').textContent = bpm;
      if (mini) mini.setTempo(bpm);
    });
    on(root, 'click', '[data-record]', () => {
      const ex = findEx(r.steps[idx].ex);
      const isNew = GS.game.setBpmRecord(ex.id, bpm);
      GS.ui.toast(isNew ? `<b>${bpm} BPM</b> enregistré : c'est ton meilleur tempo.` : `${bpm} BPM noté dans ton historique.`, 'reward');
    });
    on(root, 'click', '[data-chord]', (e, t) => GS.audio.playShape(GS.data.chordShape(t.dataset.chord)));

    chrome();
    return () => { clearInterval(tick); if (mini) mini.destroy(); };
  }

  /* ---------- Créateur ---------- */
  function builder(root) {
    setCrumb('<a href="#/routines">Routines</a> / Nouvelle');
    const draft = { title: '', icon: '🎸', steps: [] };
    const cats = GS.labels.cat;

    function draw() {
      const totalMin = draft.steps.reduce((n, s) => n + s.min, 0);
      root.innerHTML = `<div class="lesson">
        <header class="page-head"><h1>Créer une routine</h1><p>Assemble les exercices dans l'ordre que tu veux. Commence par un échauffement, finis par de la musique.</p></header>
        <div class="card stack">
          <div class="row"><label class="small grow" style="font-weight:600">Nom<br><input class="input" style="width:100%;margin-top:4px" data-title value="${esc(draft.title)}" placeholder="Ma séance du soir"></label>
          <label class="small" style="font-weight:600">Icône<br><select class="input" style="margin-top:4px" data-icon>${['🎸', '🔥', '🌙', '☕', '⚡', '💃', '🎯', '🏋️', '🧘', '🌹'].map((i) => `<option ${draft.icon === i ? 'selected' : ''}>${i}</option>`).join('')}</select></label></div>
          <div class="step-list">${draft.steps.length ? draft.steps.map((s, i) => {
            const ex = s.ex && findEx(s.ex);
            return `<div class="step-item"><span class="n">${i + 1}</span><span class="grow"><b class="small">${esc(ex ? ex.title : s.free)}</b></span>
              <label class="small faint"><input class="input num" type="number" min="1" max="60" value="${s.min}" data-min="${i}" style="width:62px;padding:3px 6px" aria-label="Durée en minutes"> min</label>
              <button class="btn ghost sm" data-up="${i}" aria-label="Monter">↑</button><button class="btn ghost sm" data-rm="${i}" aria-label="Retirer">${icons.trash}</button></div>`;
          }).join('') : '<div class="empty">Aucun exercice pour l\'instant.</div>'}</div>
          <div class="row">
            <select class="input grow" data-pick aria-label="Choisir un exercice"><option value="">Ajouter un exercice…</option>
              ${Object.keys(cats).map((c) => {
                const xs = GS.data.exercises.filter((e) => e.cat === c);
                return xs.length ? `<optgroup label="${esc(cats[c])}">${xs.map((e) => `<option value="${e.id}">${esc(e.title)} (${GS.labels.level[e.level]})</option>`).join('')}</optgroup>` : '';
              }).join('')}
            </select>
            <button class="btn" data-free>${icons.music}Morceau au choix</button>
          </div>
          <div class="row between"><span class="small muted num">${totalMin} minutes au total</span><button class="btn primary" data-save ${draft.steps.length && draft.title.trim() ? '' : 'disabled'}>Enregistrer</button></div>
        </div></div>`;
    }
    on(root, 'input', '[data-title]', (e) => {
      draft.title = e.target.value;
      root.querySelector('[data-save]').disabled = !(draft.steps.length && draft.title.trim());
    });
    on(root, 'change', '[data-icon]', (e) => { draft.icon = e.target.value; });
    on(root, 'change', '[data-pick]', (e) => { if (e.target.value) { draft.steps.push({ ex: e.target.value, min: 3 }); draw(); } });
    on(root, 'change', '[data-min]', (e, t) => { draft.steps[+t.dataset.min].min = Math.max(1, Math.min(60, +t.value || 1)); draw(); });
    on(root, 'click', '[data-free]', () => { draft.steps.push({ free: 'Morceau au choix', hint: 'Reprends ton morceau en cours.', min: 5 }); draw(); });
    on(root, 'click', '[data-rm]', (e, t) => { draft.steps.splice(+t.dataset.rm, 1); draw(); });
    on(root, 'click', '[data-up]', (e, t) => {
      const i = +t.dataset.up;
      if (i > 0) { [draft.steps[i - 1], draft.steps[i]] = [draft.steps[i], draft.steps[i - 1]]; draw(); }
    });
    on(root, 'click', '[data-save]', () => {
      const id = 'c-' + Date.now().toString(36);
      const minutes = draft.steps.reduce((n, s) => n + s.min, 0);
      GS.store.update((st) => { st.routines.custom.unshift({ id, title: draft.title.trim(), subtitle: 'Ma routine personnelle', icon: draft.icon, goal: 'equilibre', level: GS.home.playerTier(), minutes, steps: draft.steps }); });
      GS.game.checkBadges();
      location.hash = '#/routines/' + id;
    });
    draw();
  }

  route('/routines', list);
  route('/routines/creer', builder);
  route('/routines/:id', detail);
  route('/routines/:id/jouer', player);
})();
