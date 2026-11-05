/* Entraînement : mini-jeux qui musclent le manche, l'oreille, le rythme et les changements d'accords. */
(function () {
  const { esc, icons, route, on, setCrumb, chordCard } = GS.ui;
  const M = GS.music;
  const rand = (n) => Math.floor(Math.random() * n);
  const pick = (arr) => arr[rand(arr.length)];
  const shuffle = (arr) => arr.map((x) => [Math.random(), x]).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
  const NATURAL = [0, 2, 4, 5, 7, 9, 11];

  const GAMES = [
    { id: 'fret', title: 'Chasse aux notes', icon: '🧭', desc: 'Une note s\'affiche : trouve-la sur le manche, le plus vite possible.', unit: 'points' },
    { id: 'ear', title: 'L\'oreille d\'or', icon: '👂', desc: 'Majeur ou mineur ? Quel intervalle ? Quelle corde ? Écoute et réponds.', unit: 'bonnes réponses' },
    { id: 'chordid', title: 'Quel est cet accord ?', icon: '🎴', desc: 'Reconnais un accord à son schéma, puis à son nom.', unit: 'points' },
    { id: 'rhythm', title: 'Le Compás', icon: '🥁', desc: 'Tape en rythme avec le métronome : chaque coup est jugé à la milliseconde.', unit: '% de précision' },
    { id: 'changes', title: 'La minute des changements', icon: '🤘', desc: 'Compte combien de fois tu changes d\'accord proprement en 60 secondes.', unit: 'changements' },
    { id: 'mic', title: 'Joue la note', icon: '🎙️', desc: 'Le jeu écoute ta guitare au micro : joue la note demandée.', unit: 'notes' },
  ];

  const gameState = (id) => GS.store.get().games[id] || { best: 0, plays: 0 };

  /* Enregistre la partie et récompense à la mesure de l'effort */
  function endGame(id, score, xp, picks) {
    const prev = gameState(id).best;
    GS.store.update((st) => {
      const g = st.games[id] = st.games[id] || { best: 0, plays: 0 };
      g.plays += 1;
      g.best = Math.max(g.best, score);
    });
    GS.game.track('game');
    GS.game.logPractice(1, 'game', id);
    const isRecord = score > prev && prev > 0;
    GS.game.award({ xp: xp + (isRecord ? 15 : 0), picks: picks + (isRecord ? 5 : 0), reason: isRecord ? 'Nouveau record !' : 'Partie terminée' });
    return isRecord;
  }

  function hub(root) {
    root.innerHTML = `<header class="page-head">
        <div class="eyebrow">Salle d'entraînement</div>
        <h1 style="margin-top:6px">Les mini-jeux</h1>
        <p>Deux minutes par jour suffisent pour que ton oreille et ta mémoire du manche progressent, et ça compte pour tes quêtes.</p>
      </header>
      <div class="grid gauto">${GAMES.map((g) => {
        const st = gameState(g.id);
        return `<a class="card link game-card" href="#/entrainement/${g.id}">
          <span class="ic">${g.icon}</span><div><h3>${esc(g.title)}</h3><p class="small muted" style="margin-top:3px">${esc(g.desc)}</p></div>
          <div class="row between" style="margin-top:auto"><span class="tiny faint">${st.plays ? `${st.plays} partie${st.plays > 1 ? 's' : ''}` : 'Pas encore joué'}</span>${st.best ? `<span class="chip accent">Record : ${st.best} ${esc(g.unit)}</span>` : ''}</div>
        </a>`;
      }).join('')}</div>`;
  }

  function shell(root, g, setup) {
    setCrumb(`<a href="#/entrainement">Entraînement</a> / ${esc(g.title)}`);
    root.innerHTML = `<div class="lesson" style="max-width:900px"><header class="page-head"><div class="row between"><h1>${g.icon} ${esc(g.title)}</h1>${gameState(g.id).best ? `<span class="chip accent">Record : ${gameState(g.id).best} ${esc(g.unit)}</span>` : ''}</div><p>${esc(g.desc)}</p></header><div data-game></div></div>`;
    return root.querySelector('[data-game]');
  }

  function resultScreen(box, title, line, again, id) {
    box.innerHTML = `<div class="card" style="text-align:center;padding:30px 18px"><h2>${esc(title)}</h2><p class="muted" style="margin:9px 0 18px">${line}</p>
      <div class="row" style="justify-content:center"><button class="btn primary" data-again>Rejouer</button><a class="btn" href="#/entrainement">Autres jeux</a></div></div>`;
    box.querySelector('[data-again]').addEventListener('click', again);
  }

  /* ---------- Chasse aux notes ---------- */
  function fretGame(root, g) {
    const box = shell(root, g);
    let timer = null;
    const MODES = [
      { id: 'p1', label: 'Position I (cases 0 à 3)', frets: 3, strings: [1, 2, 3, 4, 5, 6] },
      { id: 'p5', label: 'Cases 0 à 5', frets: 5, strings: [1, 2, 3, 4, 5, 6] },
      { id: 'all', label: 'Tout le manche (0 à 12)', frets: 12, strings: [1, 2, 3, 4, 5, 6] },
      { id: 'bass', label: 'Cordes graves (6 et 5)', frets: 12, strings: [5, 6] },
    ];
    function menu() {
      box.innerHTML = `<div class="card stack"><h3>Choisis ton terrain</h3><div class="answer-grid">${MODES.map((m) => `<button class="answer" data-mode="${m.id}">${esc(m.label)}</button>`).join('')}</div></div>`;
      box.querySelectorAll('[data-mode]').forEach((b) => b.addEventListener('click', () => play(MODES.find((m) => m.id === b.dataset.mode))));
    }
    function play(mode) {
      let score = 0, combo = 0, right = 0, left = 60, target = null, marks = [];
      const newTarget = () => { target = NATURAL[rand(7)]; };
      function draw() {
        box.innerHTML = `<div class="game-hud"><div><div class="v">${score}</div><div class="tiny faint">points</div></div>
            <div style="text-align:center"><div class="v" style="color:var(--accent-strong)">${combo > 1 ? '×' + Math.min(5, combo) : ''}</div><div class="tiny faint">${combo > 1 ? 'combo' : ''}</div></div>
            <div style="text-align:right"><div class="v" data-left>${left}</div><div class="tiny faint">secondes</div></div></div>
          <div class="game-prompt"><div class="big">${M.NOTES_FR[target]}</div><div class="small muted">Trouve un ${M.NOTES_FR[target]} sur ${mode.strings.length === 6 ? 'n\'importe quelle corde' : 'les cordes 5 et 6'}</div></div>
          <div class="fb-wrap">${GS.tab.fretboard({ frets: mode.frets, clickable: true, marks })}</div>`;
      }
      newTarget(); draw();
      timer = setInterval(() => {
        left--;
        const el = box.querySelector('[data-left]');
        if (el) el.textContent = left;
        if (left <= 0) {
          clearInterval(timer); timer = null;
          GS.game.track('fretRight', right);
          const rec = endGame('fret', score, Math.min(60, 10 + right * 2), Math.min(15, 2 + Math.floor(right / 3)));
          resultScreen(box, rec ? 'Nouveau record !' : 'Temps écoulé', `<b>${score} points</b>, ${right} notes trouvées.`, menu);
        }
      }, 1000);
      box.onclick = (e) => {
        const hit = e.target.closest('.fb-hit');
        if (!hit || !timer) return;
        const s = +hit.dataset.s, f = +hit.dataset.f;
        if (!mode.strings.includes(s) || f > mode.frets) return;
        const midi = M.noteMidi(s, f);
        GS.audio.pluck(midi, 1.1);
        if (midi % 12 === target) {
          right++; combo++;
          score += 10 * Math.min(5, combo);
          marks = [{ s, f, label: M.NOTES_FR[target].slice(0, 3), cls: 'good' }];
          newTarget();
        } else {
          combo = 0;
          marks = [{ s, f, label: '×', cls: 'bad' }];
        }
        draw();
      };
    }
    menu();
    return () => { if (timer) clearInterval(timer); box.onclick = null; };
  }

  /* ---------- L'oreille d'or ---------- */
  function earGame(root, g) {
    const box = shell(root, g);
    const MODES = {
      quality: { label: 'Majeur ou mineur ?', opts: ['Majeur', 'Mineur'] },
      interval: { label: 'Quel intervalle ?', opts: ['Tierce mineure', 'Tierce majeure', 'Quarte', 'Quinte', 'Octave'] },
      strings: { label: 'Quelle corde à vide ?', opts: ['Mi grave', 'La', 'Ré', 'Sol', 'Si', 'Mi aigu'] },
    };
    const INT = { 'Tierce mineure': 3, 'Tierce majeure': 4, 'Quarte': 5, 'Quinte': 7, 'Octave': 12 };
    const OPENS = { 'Mi grave': 40, 'La': 45, 'Ré': 50, 'Sol': 55, 'Si': 59, 'Mi aigu': 64 };

    function menu() {
      box.innerHTML = `<div class="card stack"><h3>Choisis un exercice</h3><div class="answer-grid">${Object.entries(MODES).map(([k, m]) => `<button class="answer" data-m="${k}">${esc(m.label)}</button>`).join('')}</div></div>`;
      box.querySelectorAll('[data-m]').forEach((b) => b.addEventListener('click', () => play(b.dataset.m)));
    }
    function play(modeKey) {
      const mode = MODES[modeKey], ROUNDS = 10;
      let round = 0, good = 0, answer, sound;
      function nextRound() {
        answer = pick(mode.opts);
        if (modeKey === 'quality') {
          const root0 = 45 + rand(10), third = answer === 'Majeur' ? 4 : 3;
          sound = () => GS.audio.strum([root0, root0 + 7, root0 + 12, root0 + 12 + third, root0 + 19], 0.05);
        } else if (modeKey === 'interval') {
          const low = 48 + rand(12), semis = INT[answer];
          sound = () => GS.audio.load().then(() => {
            const t = GS.audio.context().currentTime + 0.03;
            GS.audio.playNote(low, t, 1); GS.audio.playNote(low + semis, t + 0.65, 1.2);
          });
        } else {
          sound = () => GS.audio.pluck(OPENS[answer], 2);
        }
        draw();
        sound();
      }
      function draw(feedback) {
        box.innerHTML = `<div class="game-hud"><div><div class="v num">${round + 1} / ${ROUNDS}</div></div><div style="text-align:right"><div class="v num">${good}</div><div class="tiny faint">bonnes réponses</div></div></div>
          <div class="game-prompt"><button class="btn lg" data-replay>${icons.play}Réécouter</button></div>
          <div class="answer-grid">${mode.opts.map((o) => `<button class="answer" data-a="${esc(o)}">${esc(o)}</button>`).join('')}</div>`;
        box.querySelector('[data-replay]').addEventListener('click', () => sound());
        box.querySelectorAll('[data-a]').forEach((b) => b.addEventListener('click', () => {
          if (box.dataset.lock) return;
          box.dataset.lock = '1';
          const ok = b.dataset.a === answer;
          b.classList.add(ok ? 'right' : 'wrong');
          if (!ok) box.querySelector(`[data-a="${answer}"]`).classList.add('right');
          if (ok) { good++; GS.game.track('earRight'); }
          GS.audio.chime(ok ? 'ok' : 'bad');
          setTimeout(() => {
            delete box.dataset.lock;
            round++;
            if (round >= ROUNDS) {
              const rec = endGame('ear', good, 8 + good * 3, 2 + Math.floor(good / 2));
              resultScreen(box, rec ? 'Nouveau record !' : 'Écoute terminée', `<b>${good} sur ${ROUNDS}</b>.`, menu);
            } else nextRound();
          }, ok ? 650 : 1400);
        }));
      }
      nextRound();
    }
    menu();
  }

  /* ---------- Quel est cet accord ? ---------- */
  function chordGame(root, g) {
    const box = shell(root, g);
    const pool = GS.data.chords.filter((c) => c.level <= 2 && !['E5', 'A5', 'D5'].includes(c.name));
    function play() {
      const ROUNDS = 12;
      let round = 0, score = 0, streak = 0, answer;
      function next() {
        answer = pick(pool);
        const wrong = shuffle(pool.filter((c) => c.name !== answer.name)).slice(0, 3);
        const opts = shuffle([answer, ...wrong]);
        const flip = round % 2 === 1; // une fois sur deux : du nom vers le schéma
        box.innerHTML = `<div class="game-hud"><div class="v num">${round + 1} / ${ROUNDS}</div><div class="v num">${score} pts</div></div>
          <div class="game-prompt">${flip ? `<div class="big">${esc(answer.name)}</div><div class="small muted">${esc(answer.full)}</div>` : `<div style="display:inline-block;width:150px">${chordCardStatic(answer)}</div>`}</div>
          <div class="${flip ? 'chord-row' : 'answer-grid'}">${opts.map((o) => flip
            ? `<button class="chord-card" data-pick="${esc(o.name)}">${GS.tab.chordDiagram(o.shape, o.fingers)}</button>`
            : `<button class="answer" data-pick="${esc(o.name)}">${esc(o.name)}</button>`).join('')}</div>`;
        box.querySelectorAll('[data-pick]').forEach((b) => b.addEventListener('click', () => {
          const ok = b.dataset.pick === answer.name;
          GS.audio.playShape(answer.shape);
          if (ok) { streak++; score += 10 + Math.min(streak, 5) * 2; } else { streak = 0; GS.audio.chime('bad'); }
          b.style.outline = `3px solid var(--${ok ? 'good' : 'danger'})`;
          setTimeout(() => {
            round++;
            if (round >= ROUNDS) {
              const rec = endGame('chordid', score, 8 + Math.round(score / 8), 2 + Math.round(score / 40));
              resultScreen(box, rec ? 'Nouveau record !' : 'Partie terminée', `<b>${score} points</b>.`, play);
            } else next();
          }, ok ? 550 : 1100);
        }));
      }
      next();
    }
    play();
  }
  const chordCardStatic = (c) => `<div class="chord-card">${GS.tab.chordDiagram(c.shape, c.fingers, { size: 136 })}</div>`;

  /* ---------- Le Compás ---------- */
  function rhythmGame(root, g) {
    const box = shell(root, g);
    let cleanup = null;
    const PATTERNS = [
      { id: 'q', label: 'Noires à 70', bpm: 70, num: 4, sub: 1, hits: [0, 1, 2, 3], accents: [0], total: 16 },
      { id: 'e', label: 'Croches à 70', bpm: 70, num: 4, sub: 2, hits: [0, .5, 1, 1.5, 2, 2.5, 3, 3.5], accents: [0], total: 16 },
      { id: 'valse', label: 'Valse à 110', bpm: 110, num: 3, sub: 1, hits: [0, 1, 2], accents: [0], total: 18 },
      { id: 'tresillo', label: 'Rumba (3-3-2) à 80', bpm: 80, num: 4, sub: 2, hits: [0, 1.5, 3], accents: [0], total: 16 },
      { id: 'solea', label: 'Compás de soleá (accents)', bpm: 120, num: 12, sub: 1, hits: [2, 5, 7, 9, 11], accents: [2, 5, 7, 9, 11], total: 24 },
    ];
    function menu() {
      box.innerHTML = `<div class="card stack"><h3>Choisis un rythme</h3><div class="answer-grid">${PATTERNS.map((p) => `<button class="answer" data-p="${p.id}">${esc(p.label)}</button>`).join('')}</div></div>`;
      box.querySelectorAll('[data-p]').forEach((b) => b.addEventListener('click', () => play(PATTERNS.find((p) => p.id === b.dataset.p))));
    }
    function play(p) {
      const c = GS.audio.context();
      const spb = 60 / p.bpm, start = c.currentTime + spb * p.num + 0.2;
      // Décompte : une mesure ; puis la grille à viser
      const targets = [];
      const barsCount = Math.ceil(p.total / p.num);
      for (let bar = 0; bar < barsCount; bar++) p.hits.forEach((h) => targets.push(start + (bar * p.num + h) * spb));
      for (let i = 0; i < p.num; i++) GS.audio.click(c.currentTime + 0.2 + i * spb, i === 0, 0.7);
      for (let i = 0; i < barsCount * p.num; i++) GS.audio.click(start + i * spb, i % p.num === 0, 0.6);
      const endAt = start + barsCount * p.num * spb;
      const results = targets.map(() => null);
      box.innerHTML = `<div class="game-hud"><div><div class="v" data-judge>Prépare-toi</div></div><div style="text-align:right"><div class="v num" data-acc>—</div><div class="tiny faint">précision</div></div></div>
        <div class="beats">${Array.from({ length: p.num }, (_, i) => `<span class="beat ${p.accents.includes(i) ? 'accent' : ''}" data-beat="${i}"></span>`).join('')}</div>
        <button class="tap-pad" data-tap>Tape ici, ou barre d'espace</button>`;
      const judgeEl = box.querySelector('[data-judge]'), accEl = box.querySelector('[data-acc]');
      const beats = box.querySelectorAll('[data-beat]');
      let raf = 0, over = false;
      function frame() {
        const now = c.currentTime;
        if (now >= start) {
          const pos = Math.floor((now - start) / spb) % p.num;
          beats.forEach((b, i) => b.classList.toggle('on', i === pos));
        }
        if (now >= endAt + 0.2) { finish(); return; }
        raf = requestAnimationFrame(frame);
      }
      raf = requestAnimationFrame(frame);
      function tap() {
        const now = c.currentTime;
        if (now < start - 0.25 || over) return;
        let bestI = -1, bestD = 9;
        targets.forEach((t, i) => { const d = Math.abs(now - t); if (d < bestD && results[i] === null) { bestD = d; bestI = i; } });
        if (bestI < 0 || bestD > 0.22) { judgeEl.textContent = 'Hors temps'; return; }
        const ms = Math.round((now - targets[bestI]) * 1000);
        results[bestI] = Math.abs(ms);
        judgeEl.textContent = Math.abs(ms) < 30 ? 'Parfait' : Math.abs(ms) < 65 ? 'Bien' : ms < 0 ? 'En avance' : 'En retard';
        const done = results.filter((r) => r !== null);
        accEl.textContent = Math.round(score(done, done.length)) + ' %';
      }
      function score(arr, n) {
        if (!n) return 0;
        return arr.reduce((s, r) => s + Math.max(0, 1 - r / 160), 0) / n * 100;
      }
      function onKey(e) { if (e.code === 'Space') { e.preventDefault(); tap(); } }
      document.addEventListener('keydown', onKey);
      box.querySelector('[data-tap]').addEventListener('pointerdown', tap);
      cleanup = () => { over = true; cancelAnimationFrame(raf); document.removeEventListener('keydown', onKey); };
      function finish() {
        cleanup(); cleanup = null;
        const done = results.filter((r) => r !== null);
        const acc = Math.round(score(done, targets.length));
        const rec = endGame('rhythm', acc, 8 + Math.round(acc / 4), 2 + Math.round(acc / 20));
        resultScreen(box, rec ? 'Nouveau record !' : acc >= 85 ? 'Tu tiens le compás' : 'Fin de la partie', `<b>${acc} %</b> de précision sur ${targets.length} coups.`, menu);
      }
    }
    menu();
    return () => { if (cleanup) cleanup(); };
  }

  /* ---------- La minute des changements ---------- */
  function changesGame(root, g) {
    const box = shell(root, g);
    let timer = null;
    const PAIRS = [['Em', 'Am'], ['Am', 'C'], ['C', 'G'], ['G', 'D'], ['D', 'A'], ['Am', 'E'], ['A', 'E'], ['Dm', 'G'], ['C', 'Fmaj7'], ['Am', 'Fmaj7'], ['E', 'Fmaj7'], ['F', 'C'], ['Bm', 'G']];
    const key = (p) => p.join('-');
    function bestFor(p) { return ((GS.store.get().games.changes || {}).pairs || {})[key(p)] || 0; }
    function menu() {
      box.innerHTML = `<div class="card stack"><p class="small muted">Prends un duo d'accords, lance la minute, change d'accord autant de fois que possible et gratte à chaque fois. Un changement ne compte que si toutes les notes sonnent. Note ton score : le plaisir est de le voir monter d'une semaine à l'autre.</p>
        <div class="answer-grid">${PAIRS.map((p, i) => `<button class="answer" data-pair="${i}">${p.join(' ↔ ')}${bestFor(p) ? `<br><span class="tiny faint">record : ${bestFor(p)}</span>` : ''}</button>`).join('')}</div></div>`;
      box.querySelectorAll('[data-pair]').forEach((b) => b.addEventListener('click', () => ready(PAIRS[+b.dataset.pair])));
    }
    function ready(p) {
      box.innerHTML = `<div class="chord-row" style="max-width:300px;margin:0 auto 16px">${p.map((c) => chordCard(c)).join('')}</div>
        <div style="text-align:center"><div class="timer-big" data-clock>60</div>
        <p class="small muted" style="margin:7px 0 14px">Record sur ce duo : ${bestFor(p) || '—'}</p>
        <button class="btn primary lg" data-go>Partez !</button></div>`;
      box.querySelectorAll('[data-chord]').forEach((b) => b.addEventListener('click', () => GS.audio.playShape(GS.data.chordShape(b.dataset.chord))));
      box.querySelector('[data-go]').addEventListener('click', (e) => {
        e.target.disabled = true;
        let left = 60;
        const clock = box.querySelector('[data-clock]');
        GS.audio.chime('ok');
        timer = setInterval(() => {
          left--;
          clock.textContent = left;
          if (left <= 0) { clearInterval(timer); timer = null; GS.audio.chime('quest'); ask(p); }
        }, 1000);
      });
    }
    function ask(p) {
      box.innerHTML = `<div class="card" style="text-align:center"><h2>Temps écoulé !</h2><p class="muted" style="margin:7px 0 14px">Combien de changements propres ?</p>
        <input class="input num" type="number" min="0" max="240" data-n aria-label="Nombre de changements" style="width:110px;font-size:1.5rem;text-align:center" value="${bestFor(p) || 20}">
        <div style="margin-top:14px"><button class="btn primary" data-ok>Enregistrer</button></div></div>`;
      box.querySelector('[data-ok]').addEventListener('click', () => {
        const n = Math.max(0, Math.min(240, +box.querySelector('[data-n]').value || 0));
        const prev = bestFor(p);
        GS.store.update((st) => {
          const g2 = st.games.changes = st.games.changes || { best: 0, plays: 0 };
          g2.pairs = g2.pairs || {};
          g2.pairs[key(p)] = Math.max(g2.pairs[key(p)] || 0, n);
        });
        GS.game.track('chordChanges');
        endGame('changes', n, 12 + (n > prev ? 10 : 0), 3);
        resultScreen(box, n > prev && prev ? `Record battu : +${n - prev}` : 'Score enregistré', `<b>${n}</b> changements en ${p.join(' ↔ ')}.`, menu);
      });
    }
    menu();
    return () => { if (timer) clearInterval(timer); };
  }

  /* ---------- Joue la note (micro) ---------- */
  function micGame(root, g) {
    const box = shell(root, g);
    let timer = null;
    function intro(err) {
      box.innerHTML = `<div class="card" style="text-align:center"><p class="muted">Ton navigateur va te demander l'accès au micro. Le son reste sur ton ordinateur : rien n'est enregistré ni envoyé.</p>
        ${err ? `<div class="callout warn" style="margin-top:12px;text-align:left"><span class="t">Micro indisponible</span>${esc(err)}</div>` : ''}
        <div class="row" style="justify-content:center;margin-top:14px"><button class="btn primary" data-go="low">${icons.mic}Position I</button><button class="btn" data-go="mid">${icons.mic}Jusqu'à la case 5</button></div></div>`;
      box.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', () => start(b.dataset.go)));
    }
    async function start(level) {
      const maxFret = level === 'low' ? 3 : 5;
      let left = 60, found = 0, target, hold = 0;
      const nextTarget = () => {
        const s = 1 + rand(6), f = rand(maxFret + 1);
        const midi = M.noteMidi(s, f);
        if (!NATURAL.includes(midi % 12)) return nextTarget();
        target = { s, f, midi };
        hold = 0;
      };
      nextTarget();
      function draw() {
        box.innerHTML = `<div class="game-hud"><div><div class="v num">${found}</div><div class="tiny faint">notes jouées</div></div><div style="text-align:right"><div class="v num" data-left>${left}</div><div class="tiny faint">secondes</div></div></div>
          <div class="game-prompt"><div class="big">${M.NOTES_FR[target.midi % 12]}</div><div class="muted">corde ${target.s}, case ${target.f}</div><div class="small faint" data-heard style="margin-top:6px">J'écoute…</div></div>
          <div class="fb-wrap">${GS.tab.fretboard({ frets: 5, marks: [{ s: target.s, f: target.f, label: String(target.f), cls: '' }] })}</div>`;
      }
      draw();
      try {
        await GS.pitch.start((r) => {
          const heard = box.querySelector('[data-heard]');
          if (!heard) return;
          if (!r) { hold = Math.max(0, hold - 1); return; }
          heard.textContent = 'J\'entends : ' + M.midiFull(r.midi);
          if (r.midi === target.midi) {
            hold++;
            if (hold >= 2) { found++; GS.audio.chime('ok'); nextTarget(); draw(); }
          } else hold = 0;
        });
      } catch (e) {
        intro('Autorise le micro pour ce fichier, ou ouvre l\'appli avec Chrome ou Edge. Détail : ' + e.message);
        return;
      }
      timer = setInterval(() => {
        left--;
        const el = box.querySelector('[data-left]');
        if (el) el.textContent = left;
        if (left <= 0) {
          clearInterval(timer); timer = null; GS.pitch.stop();
          GS.game.track('fretRight', found);
          const rec = endGame('mic', found, 12 + found * 2, 3 + Math.floor(found / 3));
          resultScreen(box, rec ? 'Nouveau record !' : 'Temps écoulé', `<b>${found} notes</b> jouées juste, en une minute.`, () => intro());
        }
      }, 1000);
    }
    intro();
    return () => { if (timer) clearInterval(timer); GS.pitch.stop(); };
  }

  const handlers = { fret: fretGame, ear: earGame, chordid: chordGame, rhythm: rhythmGame, changes: changesGame, mic: micGame };
  route('/entrainement', hub);
  route('/entrainement/:id', (root, params) => {
    const g = GAMES.find((x) => x.id === params.id);
    if (!g) { location.hash = '#/entrainement'; return; }
    return handlers[g.id](root, g);
  });
})();
