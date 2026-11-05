/* Accueil : ce qu'il faut faire aujourd'hui, en un coup d'œil. */
(function () {
  const { esc, icons, rosette, stars, route, on } = GS.ui;
  const U = GS.util;

  function greeting() {
    const h = new Date().getHours();
    return h < 5 ? 'Encore debout ?' : h < 12 ? 'Bonjour.' : h < 18 ? 'Bon après-midi.' : 'Bonsoir.';
  }

  /* Niveau conseillé d'après l'avancement dans le cours */
  function playerTier() {
    const s = GS.store.get(), done = Object.keys(s.lessons).filter((k) => s.lessons[k].done).length;
    return done < 18 ? 'debutant' : done < 42 ? 'intermediaire' : 'expert';
  }

  function recommendRoutine() {
    const s = GS.store.get(), tier = playerTier(), goal = s.settings.dailyGoal;
    const pool = GS.data.routines.filter((r) => r.level === tier);
    const sorted = pool.slice().sort((a, b) => Math.abs(a.minutes - goal) - Math.abs(b.minutes - goal));
    const near = sorted.filter((r) => r.minutes === sorted[0].minutes);
    const list = near.length ? near : GS.data.routines;
    return list[U.hash(U.today()) % list.length];
  }

  function nextLesson() {
    const s = GS.store.get();
    const chapters = GS.data.courses.slice().sort((a, b) => a.order - b.order);
    for (const c of chapters) {
      for (const l of c.lessons) if (!(s.lessons[l.id] && s.lessons[l.id].done)) return { chapter: c, lesson: l };
      if (!(s.lessons['boss-' + c.id] && s.lessons['boss-' + c.id].done)) return { chapter: c, boss: true };
    }
    return null;
  }

  function currentSong() {
    const s = GS.store.get();
    const started = Object.keys(s.songs).filter((id) => s.songs[id].stars < 5 && GS.data.songs.find((x) => x.id === id));
    started.sort((a, b) => (s.songs[b].lastAt || 0) - (s.songs[a].lastAt || 0));
    if (started[0]) return GS.data.songs.find((x) => x.id === started[0]);
    return null;
  }

  function songOfDay() {
    const tier = playerTier();
    const s = GS.store.get();
    const pool = GS.data.songs.filter((x) => !x.type && x.level === tier && !((s.songs[x.id] || {}).stars >= 5));
    const list = pool.length ? pool : GS.data.songs.filter((x) => !x.type);
    return list[U.hash('s' + U.today()) % list.length];
  }

  function questsPanel() {
    const s = GS.store.get();
    GS.game.refreshQuests();
    const q = GS.store.get().quests;
    const row = (it, i, daily) => {
      const d = GS.game.questDef(it.id);
      if (!d) return '';
      return `<div class="quest ${it.done ? 'done' : ''}">
        <div class="ic">${it.done ? '✅' : d.icon}</div>
        <div class="grow"><div class="qt small" style="font-weight:600">${esc(d.title)}</div>
          <div class="bar-simple ${it.done ? 'good' : ''}" style="margin-top:5px"><i style="width:${it.progress / d.goal * 100}%"></i></div>
        </div>
        <div class="tiny faint num" style="text-align:right;white-space:nowrap">${it.progress}/${d.goal}<br>+${d.xp} XP</div>
        ${daily && !it.done && !q.rerolled ? `<button class="btn ghost sm" data-reroll="${i}" title="Changer cette quête pour 15 médiators" aria-label="Changer cette quête">↻</button>` : ''}
      </div>`;
    };
    const ready = GS.game.canOpenChest();
    return `<div class="card" id="quests">
      <div class="row between"><h3>Quêtes du jour</h3><span class="tiny faint">renouvelées à minuit</span></div>
      <div style="margin-top:4px">${q.list.map((it, i) => row(it, i, true)).join('')}</div>
      <div class="chest ${ready ? 'ready' : ''}">
        <div class="ic">${q.chest ? '📭' : '🎁'}</div>
        <div class="grow small">${q.chest ? 'Coffre ouvert. Reviens demain !' : ready ? '<b>Ton coffre est prêt.</b>' : 'Termine les 3 quêtes pour ouvrir le coffre.'}</div>
        ${ready ? '<button class="btn primary sm" data-chest>Ouvrir</button>' : ''}
      </div>
      <div class="row between" style="margin-top:19px"><h3>Défis de la semaine</h3></div>
      <div style="margin-top:4px">${q.weekly.map((it) => row(it)).join('')}</div>
    </div>`;
  }

  function weekStrip() {
    const s = GS.store.get(), t = U.today(), monday = U.weekKey();
    const names = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    return `<div class="week-strip">${names.map((n, i) => {
      const k = U.addDays(monday, i), d = s.days[k];
      return `<div class="week-day ${d && d.minutes > 0 ? 'done' : ''} ${k === t ? 'today' : ''}"><i>✓</i>${n}</div>`;
    }).join('')}</div>`;
  }

  function render(root) {
    const s = GS.store.get(), today = s.days[U.today()] || { minutes: 0 };
    const goal = s.settings.dailyGoal, pct = Math.min(1, today.minutes / goal);
    const rec = recommendRoutine(), nl = nextLesson(), cur = currentSong(), sod = songOfDay();
    const left = Math.max(0, goal - today.minutes);
    const heroLine = today.minutes === 0
      ? (s.streak.count > 0 ? `Ta série de ${s.streak.count} jour${s.streak.count > 1 ? 's' : ''} t'attend. Quelques minutes suffisent pour la garder.` : 'Quelques minutes aujourd\'hui, et ta première série démarre.')
      : left > 0 ? `Encore ${Math.ceil(left)} minute${left > 1 ? 's' : ''} pour atteindre ton objectif du jour.` : 'Objectif du jour atteint. Tout ce que tu joues maintenant, c\'est du bonus.';

    root.innerHTML = `
      <section class="hero">
        <div>
          <div class="eyebrow">Séance du jour</div>
          <h1 style="margin-top:7px">${greeting()}</h1>
          <p class="muted">${esc(heroLine)}</p>
          <div class="cta">
            <a class="btn primary lg" href="#/routines/${rec.id}/jouer">${icons.play}${esc(rec.title)} · ${rec.minutes} min</a>
            <a class="btn lg" href="#/routines">Choisir une autre routine</a>
          </div>
        </div>
        <div class="rosette-wrap" title="Objectif du jour">${rosette(pct, 158, Math.round(today.minutes), `sur ${goal} min`)}</div>
      </section>

      <div class="home-grid">
        <div class="stack">
          <div class="card">
            <div class="row between" style="margin-bottom:11px">
              <h3>Cette semaine</h3>
              <span class="small muted">${s.streak.count > 0 ? `<b style="color:var(--accent-strong)">${s.streak.count} jour${s.streak.count > 1 ? 's' : ''}</b> de suite` : 'Pas de série en cours'}${GS.game.streakMult() > 1 ? ` · XP ×${GS.game.streakMult()}` : ''}</span>
            </div>
            ${weekStrip()}
          </div>

          ${nl ? `<a class="card link feature" href="${nl.boss ? `#/cours/${nl.chapter.id}/boss` : `#/cours/${nl.chapter.id}/${nl.lesson.id}`}">
            <div class="continue-card">
              <div class="ic">${nl.boss ? '⚔️' : nl.chapter.icon}</div>
              <div class="grow">
                <div class="eyebrow">${nl.boss ? 'Boss du chapitre' : 'Prochaine leçon'} · ${esc(nl.chapter.region)}</div>
                <h3 style="margin-top:3px">${esc(nl.boss ? nl.chapter.boss.title : nl.lesson.title)}</h3>
                <div class="small muted" style="margin-top:2px">${nl.boss ? 'Convaincs ce personnage pour passer à l\'étape suivante.' : esc(nl.lesson.goal)}</div>
              </div>
              <span class="btn sm">${icons.next}</span>
            </div></a>` : `<div class="card"><h3>Le voyage est terminé.</h3><p class="muted small">Tu as vaincu tous les boss. Il reste le répertoire : à toi Grenade.</p></div>`}

          <div class="grid g2">
            ${cur ? songTile('Morceau en cours', cur, s) : ''}
            ${songTile('Suggestion du jour', sod, s)}
            ${cur ? '' : `<a class="card link" href="#/entrainement"><div class="eyebrow">Échauffe ton oreille</div><h3 style="margin-top:4px">Mini-jeux</h3><p class="small muted" style="margin-top:3px">Notes sur le manche, oreille, rythme : une partie dure deux minutes.</p></a>`}
          </div>

          <div class="grid g3">
            <a class="card link tight" href="#/outils/tuner"><b>Accorder</b><div class="tiny faint">Micro ou à l'oreille</div></a>
            <a class="card link tight" href="#/outils/metronome"><b>Métronome</b><div class="tiny faint">Avec accélérateur</div></a>
            <a class="card link tight" href="#/progres"><b>Journal</b><div class="tiny faint">Note ta séance</div></a>
          </div>
        </div>
        ${questsPanel()}
      </div>`;

    on(root, 'click', '[data-chest]', () => {
      const r = GS.game.openChest();
      if (r) { GS.ui.confetti(70); GS.audio.chime('badge'); render(root); }
    });
    on(root, 'click', '[data-reroll]', (e, t) => {
      if (GS.store.get().picks < 15) { GS.ui.toast('Il te faut 15 médiators pour changer une quête.', 'bad'); return; }
      if (GS.game.rerollQuest(+t.dataset.reroll)) render(root);
    });
  }

  function songTile(label, song, s) {
    const st = (s.songs[song.id] || {}).stars || 0;
    return `<a class="card link" href="#/morceaux/${song.id}"><div class="eyebrow">${esc(label)}</div>
      <h3 style="margin-top:4px">${esc(song.title)}</h3>
      <div class="small muted">${esc(song.composer || '')}</div>
      <div class="row between" style="margin-top:9px"><span class="chip ${song.level}">${GS.labels.level[song.level]}</span>${stars(st)}</div></a>`;
  }

  route('/', (root) => { render(root); });
  GS.home = { recommendRoutine, playerTier, currentSong };
})();
