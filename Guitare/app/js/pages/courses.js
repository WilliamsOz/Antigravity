/* Cours : carte du voyage, leçons, boss de fin de chapitre. */
(function () {
  const { esc, md, icons, route, on, setCrumb, miniTab, chordCard, stars } = GS.ui;

  const chapters = () => GS.data.courses.slice().sort((a, b) => a.order - b.order);
  const isDone = (id) => { const l = GS.store.get().lessons[id]; return !!(l && l.done); };
  const bossId = (c) => 'boss-' + c.id;

  function chapterUnlocked(i) {
    if (GS.store.get().settings.unlockAll || i === 0) return true;
    const list = chapters();
    return isDone(bossId(list[i - 1]));
  }
  function bossUnlocked(c) {
    return GS.store.get().settings.unlockAll || c.lessons.every((l) => isDone(l.id));
  }

  /* ---------- Carte ---------- */
  function mapPage(root) {
    const list = chapters();
    const total = list.reduce((n, c) => n + c.lessons.length, 0);
    const done = list.reduce((n, c) => n + c.lessons.filter((l) => isDone(l.id)).length, 0);
    const bosses = list.filter((c) => isDone(bossId(c))).length;
    let foundNext = false;

    root.innerHTML = `<header class="page-head">
        <div class="eyebrow">La route de l'Andalousie</div>
        <h1 style="margin-top:6px">Le cours</h1>
        <p>Dix étapes, du premier son à Grenade. Chaque leçon dure quelques minutes, chaque étape se termine par un personnage à convaincre.</p>
      </header>
      <div class="course-stats">
        <div class="tile"><div class="v">${done}<span class="faint" style="font-size:1rem"> / ${total}</span></div><div class="l">Leçons validées</div></div>
        <div class="tile"><div class="v">${bosses}<span class="faint" style="font-size:1rem"> / ${list.length}</span></div><div class="l">Étapes franchies</div></div>
        <div class="tile"><div class="v">${Math.round(done / total * 100)} %</div><div class="l">Du voyage</div></div>
      </div>
      ${list.map((c, i) => {
        const open = chapterUnlocked(i);
        const dn = c.lessons.filter((l) => isDone(l.id)).length;
        const bossOpen = open && bossUnlocked(c);
        const bossDone = isDone(bossId(c));
        const nodes = c.lessons.map((l, li) => {
          const d = isDone(l.id);
          let cls = d ? 'done' : '';
          if (!d && open && !foundNext) { cls = 'next'; foundNext = true; }
          if (!open) cls = 'locked';
          return `<a class="node ${cls}" href="#/cours/${c.id}/${l.id}"><span class="dot">${d ? '✓' : li + 1}</span><span class="lbl">${esc(l.title)}</span></a>`;
        }).join('');
        let bCls = bossDone ? 'done' : '';
        if (!bossOpen) bCls = 'locked';
        else if (!bossDone && !foundNext) { bCls = 'next'; foundNext = true; }
        return `<section class="world ${open ? '' : 'locked'}" id="${c.id}">
          <div class="world-head">
            <div class="ic">${open ? c.icon : '🔒'}</div>
            <div class="grow">
              <div class="eyebrow">Étape ${c.order} · ${esc(c.region)}</div>
              <h2 style="margin-top:2px">${esc(c.title)}</h2>
              <div class="small muted">${esc(c.subtitle)}</div>
            </div>
            <div class="num small muted" style="white-space:nowrap">${dn} / ${c.lessons.length}</div>
          </div>
          <div class="world-path">${nodes}
            <a class="node boss ${bCls}" href="#/cours/${c.id}/boss"><span class="dot"><span>${bossDone ? '✓' : '⚔️'}</span></span><span class="lbl">${esc(c.boss.title)}</span></a>
          </div>
        </section>`;
      }).join('')}
      ${GS.store.get().settings.unlockAll ? '' : '<p class="small faint" style="text-align:center">Tu as déjà de l\'expérience ? Tout débloquer se fait dans les <a href="#/reglages">réglages</a>.</p>'}`;
  }

  /* ---------- Blocs de contenu ---------- */
  function renderBlock(b, i) {
    switch (b.t) {
      case 'p': return `<p>${md(b.text)}</p>`;
      case 'h': return `<h3>${esc(b.text)}</h3>`;
      case 'list': return `<ul>${b.items.map((x) => `<li>${md(x)}</li>`).join('')}</ul>`;
      case 'steps': return `<ol>${b.items.map((x) => `<li>${md(x)}</li>`).join('')}</ol>`;
      case 'tip': return `<div class="callout tip"><span class="t">Astuce</span>${md(b.text)}</div>`;
      case 'warn': return `<div class="callout warn"><span class="t">Attention</span>${md(b.text)}</div>`;
      case 'key': return `<div class="callout key"><span class="t">À retenir</span>${md(b.text)}</div>`;
      case 'tab': return `<div class="mini-tab" data-tabblock="${i}"></div>`;
      case 'chords': return `<div class="chord-row">${b.names.map((n) => chordCard(n, { full: true })).join('')}</div>`;
      case 'fret': return `<figure style="margin:0"><div class="fb-wrap">${GS.tab.fretboard({ frets: b.frets || 5, marks: b.marks || [] })}</div>${b.caption ? `<figcaption class="small muted" style="margin-top:5px">${md(b.caption)}</figcaption>` : ''}</figure>`;
      case 'table': return `<div class="tbl-wrap"><table class="tbl"><thead><tr>${b.head.map((h) => `<th>${md(h)}</th>`).join('')}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${md(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
      case 'compare': return `<div class="compare"><div><b>${esc(b.a.title)}</b>${md(b.a.text)}</div><div><b>${esc(b.b.title)}</b>${md(b.b.text)}</div></div>`;
      case 'song': {
        const s = GS.data.songs.find((x) => x.id === b.id);
        return s ? `<a class="card link tight" href="#/morceaux/${s.id}"><div class="row between"><div><div class="eyebrow">Au répertoire</div><b>${esc(s.title)}</b> <span class="small muted">${esc(s.composer || '')}</span></div><span class="chip ${s.level}">${GS.labels.level[s.level]}</span></div></a>` : '';
      }
      case 'tool': return `<a class="btn" href="#/outils/${b.id}" style="align-self:flex-start">${icons.tool}${esc(b.label || 'Ouvrir l\'outil')}</a>`;
      default: return '';
    }
  }

  function quizHtml(l) {
    return l.quiz.map((q, i) => `<div class="card tight" data-q="${i}" style="margin-bottom:9px">
      <div class="quiz-q">${md(q.q)}</div>
      <div class="quiz-opts">${q.options.map((o, oi) => `<button class="quiz-opt" data-qi="${i}" data-oi="${oi}">${md(o)}</button>`).join('')}</div>
      <div class="quiz-why" hidden>${md(q.why || '')}</div>
    </div>`).join('');
  }

  /* ---------- Leçon ---------- */
  function lessonPage(root, params) {
    const list = chapters();
    const ci = list.findIndex((c) => c.id === params.chapter);
    const c = list[ci];
    if (!c) { location.hash = '#/cours'; return; }
    const li = c.lessons.findIndex((l) => l.id === params.lesson);
    const l = c.lessons[li];
    if (!l) { location.hash = '#/cours'; return; }
    if (!chapterUnlocked(ci)) { GS.ui.toast('Cette étape se débloque en battant le boss précédent.', 'info'); location.hash = '#/cours'; return; }
    setCrumb(`<a href="#/cours">Cours</a> / <a href="#/cours#${c.id}">${esc(c.title)}</a>`);
    const already = isDone(l.id);
    const nextHref = li + 1 < c.lessons.length ? `#/cours/${c.id}/${c.lessons[li + 1].id}` : `#/cours/${c.id}/boss`;
    const p = l.practice;
    const ex = p && p.exercise && GS.data.exercises.find((e) => e.id === p.exercise);
    const song = p && p.song && GS.data.songs.find((s) => s.id === p.song);

    root.innerHTML = `<article class="lesson">
      <header class="lesson-head">
        <div class="eyebrow">${esc(c.region)} · Leçon ${li + 1} sur ${c.lessons.length}${l.minutes ? ` · ${l.minutes} min` : ''}</div>
        <h1 style="margin-top:6px">${esc(l.title)}</h1>
        <div class="lesson-goal small"><b>Objectif :</b> ${md(l.goal)}</div>
      </header>
      <div class="lesson-body">${l.blocks.map(renderBlock).join('')}</div>

      ${p ? `<section class="lesson-pane">
        <div class="eyebrow">À la guitare</div>
        <h2 style="margin:5px 0 7px">À toi de jouer</h2>
        <p>${md(p.text)}</p>
        ${ex ? `<div data-ex style="margin-top:12px"></div>` : ''}
        ${song ? `<a class="card link tight" style="margin-top:12px" href="#/morceaux/${song.id}"><div class="row between"><b>${esc(song.title)}</b><span class="chip ${song.level}">${GS.labels.level[song.level]}</span></div></a>` : ''}
        <div class="row" style="margin-top:13px">
          <span class="timer-big" data-clock style="font-size:1.7rem">${String(p.minutes || 3).padStart(2, '0')}:00</span>
          <button class="btn" data-timer>${icons.play}Lancer le chrono</button>
          <button class="btn ghost" data-did>J'ai fait cet exercice (${p.minutes || 3} min)</button>
        </div>
      </section>` : ''}

      <section class="lesson-pane">
        <div class="eyebrow">Vérifie que c'est acquis</div>
        <h2 style="margin:5px 0 12px">Quiz</h2>
        ${quizHtml(l)}
      </section>

      <div class="row between" style="margin-top:22px">
        ${li > 0 ? `<a class="btn ghost" href="#/cours/${c.id}/${c.lessons[li - 1].id}">${icons.back}Précédente</a>` : '<span></span>'}
        <button class="btn primary lg" data-finish ${already ? '' : 'disabled'}>${already ? 'Suivant' : 'Réponds au quiz pour valider'}</button>
      </div>
    </article>`;

    const mounted = [];
    root.querySelectorAll('[data-tabblock]').forEach((el) => {
      const b = l.blocks[+el.dataset.tabblock];
      mounted.push(miniTab(el, { title: b.title, time: b.time, tempo: b.tempo, bars: b.bars, pima: b.pima, note: b.note }));
    });
    const exEl = root.querySelector('[data-ex]');
    if (exEl && ex && ex.bars) mounted.push(miniTab(exEl, { title: ex.title, time: ex.time, tempo: ex.bpm, bars: ex.bars, pima: ex.pima }, { loop: true }));

    /* Quiz */
    const firstTry = {}, solved = {};
    const fin = root.querySelector('[data-finish]');
    on(root, 'click', '.quiz-opt', (e, t) => {
      const qi = +t.dataset.qi, oi = +t.dataset.oi, q = l.quiz[qi];
      const box = root.querySelector(`[data-q="${qi}"]`);
      if (solved[qi]) return;
      const right = oi === q.answer;
      if (firstTry[qi] === undefined) firstTry[qi] = right;
      if (right) {
        solved[qi] = true;
        t.classList.add('right');
        box.querySelectorAll('.quiz-opt').forEach((b) => { b.disabled = true; });
        if (q.why) box.querySelector('.quiz-why').hidden = false;
        GS.audio.chime('ok');
        if (Object.keys(solved).length === l.quiz.length && !already) {
          fin.disabled = false;
          fin.textContent = 'Valider la leçon';
        }
      } else {
        t.classList.add('wrong');
        t.disabled = true;
        GS.audio.chime('bad');
      }
    });

    /* Chrono de pratique */
    let timer = null, startedAt = 0, logged = false;
    const clock = root.querySelector('[data-clock]');
    const planned = ((p && p.minutes) || 3) * 60;
    function stopTimer() {
      if (timer) { clearInterval(timer); timer = null; }
      if (startedAt) {
        const sec = Math.round((Date.now() - startedAt) / 1000);
        startedAt = 0;
        const min = Math.round(sec / 60);
        if (min >= 1) { GS.game.logPractice(min, 'lesson', l.title); logged = true; }
      }
    }
    on(root, 'click', '[data-timer]', (e, t) => {
      if (timer) { stopTimer(); t.innerHTML = icons.play + 'Lancer le chrono'; return; }
      startedAt = Date.now();
      t.innerHTML = icons.stop + 'Arrêter';
      timer = setInterval(() => {
        const left = Math.max(0, planned - Math.round((Date.now() - startedAt) / 1000));
        clock.textContent = `${String(Math.floor(left / 60)).padStart(2, '0')}:${String(left % 60).padStart(2, '0')}`;
        if (left <= 0) { stopTimer(); GS.audio.chime('quest'); t.innerHTML = icons.check + 'Temps écoulé'; t.disabled = true; root.querySelector('[data-did]').hidden = true; }
      }, 500);
    });
    on(root, 'click', '[data-did]', (e, t) => {
      if (logged) return;
      logged = true;
      GS.game.logPractice((p && p.minutes) || 3, 'lesson', l.title);
      t.hidden = true;
      const timerBtn = root.querySelector('[data-timer]');
      if (timerBtn) timerBtn.hidden = true;
      clock.hidden = true;
    });

    on(root, 'click', '[data-finish]', () => {
      if (already) { location.hash = nextHref; return; }
      const total = l.quiz.length, good = l.quiz.filter((_, i) => firstTry[i]).length;
      const perfect = good === total;
      GS.store.update((st) => { st.lessons[l.id] = { done: true, score: good / total, at: Date.now() }; });
      GS.game.touchStreak();
      GS.game.track('lesson');
      GS.game.award({ xp: 30 + good * 10, picks: perfect ? 12 : 7, reason: perfect ? 'Leçon validée, sans faute !' : 'Leçon validée' });
      if (perfect) GS.store.update((st) => { st.counters.perfectQuiz = (st.counters.perfectQuiz || 0) + 1; });
      GS.game.checkBadges();
      location.hash = nextHref;
    });
    on(root, 'click', '[data-chord]', (e, t) => GS.audio.playShape(GS.data.chordShape(t.dataset.chord)));

    return () => { stopTimer(); mounted.forEach((m) => m.destroy()); };
  }

  /* ---------- Boss ---------- */
  function bossPage(root, params) {
    const list = chapters();
    const ci = list.findIndex((c) => c.id === params.chapter);
    const c = list[ci];
    if (!c) { location.hash = '#/cours'; return; }
    if (!chapterUnlocked(ci) || !bossUnlocked(c)) { GS.ui.toast('Termine d\'abord les leçons de cette étape.', 'info'); location.hash = '#/cours'; return; }
    setCrumb(`<a href="#/cours">Cours</a> / <a href="#/cours#${c.id}">${esc(c.title)}</a>`);
    const b = c.boss, id = bossId(c), song = b.song && GS.data.songs.find((s) => s.id === b.song), need = b.stars || 1;
    let qi = 0, hearts = 3, phase = 'intro';
    const state = () => GS.store.get().lessons[id] || {};
    if (state().done) phase = 'won';
    else if (state().quiz) phase = 'song';

    function draw() {
      const q = b.quiz[qi];
      let body = '';
      if (phase === 'intro') {
        body = `<p class="muted" style="margin:10px 0 16px">${esc(b.desc)}</p>
          <p class="small" style="margin-bottom:15px">Trois erreurs et il te renvoie réviser. Bonne nouvelle : tu peux revenir autant de fois que tu veux.</p>
          <button class="btn primary lg" data-start>Relever le défi</button>`;
      } else if (phase === 'quiz') {
        body = `<div class="row between" style="margin:12px 0 16px">
            <div class="hp" title="Résistance du boss">${b.quiz.map((_, i) => `<i class="${i < qi ? 'off' : ''}"></i>`).join('')}</div>
            <div class="hearts" aria-label="${hearts} vies">${'❤️'.repeat(hearts)}${'🖤'.repeat(3 - hearts)}</div>
          </div>
          <div class="quiz-q" style="font-size:1.1rem">${md(q.q)}</div>
          <div class="quiz-opts">${q.options.map((o, oi) => `<button class="quiz-opt" data-boss="${oi}">${md(o)}</button>`).join('')}</div>
          <div class="quiz-why" hidden></div>
          <div class="row" style="justify-content:flex-end;margin-top:12px"><button class="btn primary" data-nextq hidden>Suivant</button></div>`;
      } else if (phase === 'lost') {
        body = `<p style="margin:13px 0">Pas encore. Reprends les leçons de l'étape : tu connais presque tout.</p>
          <div class="row"><button class="btn primary" data-start>Réessayer</button><a class="btn" href="#/cours#${c.id}">Revoir les leçons</a></div>`;
      } else if (phase === 'song') {
        const have = (GS.store.get().songs[song.id] || {}).stars || 0;
        const ok = have >= need;
        body = `<p style="margin:12px 0">Le quiz est gagné. Dernière épreuve : joue-lui un morceau.</p>
          <a class="card link tight" href="#/morceaux/${song.id}"><div class="row between"><div><b>${esc(song.title)}</b><div class="small muted">Atteindre ${need} étoile${need > 1 ? 's' : ''}</div></div>${stars(have)}</div></a>
          <div class="row" style="margin-top:14px"><button class="btn primary lg" data-win ${ok ? '' : 'disabled'}>${ok ? 'Présenter le morceau' : 'Morceau pas encore prêt'}</button></div>`;
      } else {
        const nextC = list[ci + 1];
        body = `<p style="margin:13px 0">Tu as gagné le tampon de cette étape dans ton passeport.</p>
          <div class="row">${nextC ? `<a class="btn primary" href="#/cours#${nextC.id}">En route pour ${esc(nextC.region)}</a>` : '<a class="btn primary" href="#/morceaux">Place au répertoire</a>'}<a class="btn" href="#/progres">Voir mon passeport</a></div>`;
      }
      root.innerHTML = `<div class="lesson"><section class="boss-arena">
        <div class="eyebrow" style="color:var(--danger)">Boss · ${esc(c.region)}</div>
        <h1 style="margin-top:6px">${phase === 'won' ? esc(b.title) + ' est conquis·e' : esc(b.title)}</h1>
        ${body}
      </section></div>`;
    }

    function win() {
      GS.store.update((st) => { st.lessons[id] = { done: true, at: Date.now() }; st.counters.bosses = (st.counters.bosses || 0) + 1; });
      phase = 'won';
      draw();
      GS.game.award({ xp: 120 + c.order * 15, picks: 40 + c.order * 5, reason: 'Boss vaincu' });
      GS.ui.celebrate(`${c.region} : étape franchie`, b.title + ' te laisse poursuivre la route.', c.icon);
    }

    on(root, 'click', '[data-start]', () => { qi = 0; hearts = 3; phase = 'quiz'; draw(); });
    on(root, 'click', '[data-boss]', (e, t) => {
      const q = b.quiz[qi], oi = +t.dataset.boss;
      if (oi === q.answer) {
        t.classList.add('right');
        root.querySelectorAll('[data-boss]').forEach((x) => { x.disabled = true; });
        const why = root.querySelector('.quiz-why');
        if (q.why) { why.innerHTML = md(q.why); why.hidden = false; }
        root.querySelector('[data-nextq]').hidden = false;
        root.querySelectorAll('.hp i')[qi].classList.add('off');
        GS.audio.chime('ok');
      } else {
        t.classList.add('wrong');
        t.disabled = true;
        hearts--;
        GS.audio.chime('bad');
        const hEl = root.querySelector('.hearts');
        hEl.innerHTML = '❤️'.repeat(Math.max(0, hearts)) + '🖤'.repeat(3 - Math.max(0, hearts));
        hEl.setAttribute('aria-label', Math.max(0, hearts) + ' vies');
        if (hearts <= 0) setTimeout(() => { phase = 'lost'; draw(); }, 650);
      }
    });
    on(root, 'click', '[data-nextq]', () => {
      qi++;
      if (qi < b.quiz.length) { draw(); return; }
      if (song) {
        GS.store.update((st) => { st.lessons[id] = { quiz: true }; });
        phase = 'song'; draw();
      } else win();
    });
    on(root, 'click', '[data-win]', win);
    draw();
  }

  route('/cours', mapPage);
  route('/cours/:chapter/boss', bossPage);
  route('/cours/:chapter/:lesson', lessonPage);
  GS.courses = { chapters, isDone, bossId };
})();
