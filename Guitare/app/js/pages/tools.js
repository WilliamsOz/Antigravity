/* Outils : accordeur, métronome, accords, gammes, manche, cycle des quintes, accompagnateur. */
(function () {
  const { esc, icons, route, on, setCrumb, chordCard } = GS.ui;
  const M = GS.music;

  const TABS = [
    ['tuner', 'Accordeur'], ['metronome', 'Métronome'], ['chords', 'Accords'], ['scales', 'Gammes'],
    ['fretboard', 'Manche'], ['circle', 'Cycle des quintes'], ['backing', 'Accompagnateur'],
  ];

  function shell(root, active) {
    root.innerHTML = `<header class="page-head" style="margin-bottom:14px"><div class="eyebrow">La boîte à outils</div><h1 style="margin-top:6px">Outils</h1></header>
      <nav class="tabs">${TABS.map(([k, l]) => `<a href="#/outils/${k}" class="${k === active ? 'on' : ''}">${l}</a>`).join('')}</nav><div data-tool></div>`;
    return root.querySelector('[data-tool]');
  }

  /* ---------- Accordeur ---------- */
  function tuner(box) {
    const STR = [[6, 40], [5, 45], [4, 50], [3, 55], [2, 59], [1, 64]];
    let target = null, listening = false, inTuneMs = 0, credited = false;
    box.innerHTML = `<div class="grid g2">
      <div class="card">
        <div class="row between"><h3>Au micro</h3><button class="btn primary" data-mic>${icons.mic}Démarrer</button></div>
        <div class="tuner-note" style="margin-top:14px" data-note>—</div>
        <div class="small muted" style="text-align:center" data-hz>Joue une corde à vide</div>
        <div class="tuner-needle" data-needle><i data-i></i></div>
        <div class="tuner-ticks"><span>Trop bas</span><span data-cents>0</span><span>Trop haut</span></div>
        <div class="callout tip small" style="margin-top:13px" data-hint>Le son reste sur ton ordinateur : rien n'est enregistré ni envoyé.</div>
      </div>
      <div class="card">
        <h3>Cordes de référence</h3>
        <p class="small muted" style="margin:3px 0 11px">Clique pour entendre une corde, ou pour que l'accordeur la suive. Accorde en montant vers la note : c'est plus stable, surtout en nylon.</p>
        <div class="grid" style="grid-template-columns:repeat(6,minmax(0,1fr));gap:6px">${STR.map(([s, m]) => `<button class="string-btn" data-str="${s}" data-m="${m}">${M.midiName(m, 'en')}<small>${M.NOTES_FR[m % 12]}</small><small>corde ${s}</small></button>`).join('')}</div>
        <p class="small muted" style="margin-top:14px">Des cordes neuves en nylon se détendent pendant plusieurs jours : réaccorde-les souvent, c'est normal.</p>
      </div></div>`;

    const needle = box.querySelector('[data-needle]'), bar = box.querySelector('[data-i]');
    const noteEl = box.querySelector('[data-note]'), hz = box.querySelector('[data-hz]'), cents = box.querySelector('[data-cents]');
    let smooth = 0;
    function onPitch(r) {
      if (!r) return;
      let midi = r.midi, c = r.cents;
      if (target) { c = 1200 * Math.log2(r.freq / M.midiToFreq(target)); midi = target; }
      c = Math.max(-50, Math.min(50, c));
      smooth = smooth * 0.55 + c * 0.45;
      noteEl.textContent = M.midiName(midi);
      hz.textContent = `${r.freq.toFixed(1)} Hz · cible ${M.midiFull(midi)}`;
      cents.textContent = (smooth > 0 ? '+' : '') + Math.round(smooth);
      bar.style.left = 50 + smooth + '%';
      const ok = Math.abs(smooth) < 5;
      needle.classList.toggle('ok', ok);
      if (ok && !credited) {
        inTuneMs += 55;
        if (inTuneMs > 900) { credited = true; GS.game.track('tuner'); GS.ui.toast('Corde juste. Passe à la suivante !', 'reward'); }
      }
    }
    on(box, 'click', '[data-mic]', async (e, t) => {
      if (listening) { GS.pitch.stop(); listening = false; t.innerHTML = icons.mic + 'Démarrer'; return; }
      try {
        await GS.pitch.start(onPitch);
        listening = true;
        t.innerHTML = icons.stop + 'Arrêter';
      } catch (err) {
        box.querySelector('[data-hint]').innerHTML = `Micro indisponible (${esc(err.message)}). Autorise-le dans ton navigateur, ou accorde à l'oreille avec les cordes de référence.`;
        box.querySelector('[data-hint]').className = 'callout warn small';
      }
    });
    on(box, 'click', '[data-str]', (e, t) => {
      const m = +t.dataset.m;
      GS.audio.pluck(m, 3);
      target = target === m ? null : m;
      box.querySelectorAll('[data-str]').forEach((b) => b.classList.toggle('on', +b.dataset.m === target));
    });
    return () => GS.pitch.stop();
  }

  /* ---------- Métronome ---------- */
  function metronome(box) {
    const met = GS.audio.metro;
    let bpm = 72, num = 4, sub = 1, trainer = false, step = 2, every = 4, barsDone = 0, limit = 160, tapTimes = [], timer = null;
    box.innerHTML = `<div class="grid g2">
      <div class="card" style="text-align:center">
        <div class="metro-bpm" data-v>${bpm}</div><div class="small faint" data-name style="margin-bottom:9px"></div>
        <input type="range" min="30" max="240" value="${bpm}" data-range aria-label="Tempo">
        <div class="row" style="justify-content:center;margin-top:8px;--gap:6px">
          <button class="btn sm" data-add="-5">−5</button><button class="btn sm" data-add="-1">−1</button><button class="btn sm" data-add="1">+1</button><button class="btn sm" data-add="5">+5</button>
          <button class="btn sm" data-tap>Taper le tempo</button>
        </div>
        <div class="beats" data-beats></div>
        <button class="btn primary lg" data-toggle>${icons.play}Démarrer</button>
      </div>
      <div class="card stack">
        <div><div class="small" style="font-weight:600;margin-bottom:6px">Temps par mesure</div>
          <div class="filter-group">${[2, 3, 4, 6, 12].map((n) => `<button class="filter ${n === num ? 'on' : ''}" data-num="${n}">${n}</button>`).join('')}</div></div>
        <div><div class="small" style="font-weight:600;margin-bottom:6px">Subdivision</div>
          <div class="filter-group">${[[1, 'Noires'], [2, 'Croches'], [3, 'Triolets'], [4, 'Doubles']].map(([v, l]) => `<button class="filter ${v === sub ? 'on' : ''}" data-sub="${v}">${l}</button>`).join('')}</div></div>
        <div style="border-top:1px solid var(--line);padding-top:13px">
          <label class="row between" style="font-weight:600"><span>Accélérateur</span><input type="checkbox" data-trainer></label>
          <p class="small muted" style="margin:4px 0 9px">Le tempo monte tout seul : idéal pour dépasser un plafond sans s'en rendre compte.</p>
          <div class="row small"><label>+<input class="input num" type="number" data-step value="${step}" min="1" max="20" style="width:58px;padding:3px 6px"> BPM</label><label>toutes les <input class="input num" type="number" data-every value="${every}" min="1" max="32" style="width:58px;padding:3px 6px"> mesures</label><label>jusqu'à <input class="input num" type="number" data-limit value="${limit}" min="40" max="260" style="width:68px;padding:3px 6px"></label></div>
        </div>
      </div></div>`;
    const v = box.querySelector('[data-v]'), range = box.querySelector('[data-range]'), nameEl = box.querySelector('[data-name]');
    const tempoName = (b) => b < 60 ? 'Largo' : b < 76 ? 'Adagio' : b < 108 ? 'Andante' : b < 120 ? 'Moderato' : b < 168 ? 'Allegro' : 'Presto';
    function setBpm(b) {
      bpm = Math.max(30, Math.min(260, Math.round(b)));
      v.textContent = bpm; range.value = bpm; nameEl.textContent = tempoName(bpm);
      if (met.running) met.setBpm(bpm);
    }
    setBpm(bpm);
    function drawBeats() {
      box.querySelector('[data-beats]').innerHTML = Array.from({ length: num }, (_, i) => `<span class="beat ${i === 0 ? 'accent' : ''}" data-b="${i}"></span>`).join('');
    }
    drawBeats();
    function onBeat(b) {
      box.querySelectorAll('[data-b]').forEach((el, i) => el.classList.toggle('on', i === b));
      if (b === 0 && trainer) {
        barsDone++;
        if (barsDone > every) { barsDone = 1; if (bpm < limit) setBpm(Math.min(limit, bpm + step)); }
      }
    }
    function start() {
      barsDone = 0;
      met.start({ bpm, num, sub, onBeat });
      box.querySelector('[data-toggle]').innerHTML = icons.stop + 'Arrêter';
      if (!timer) timer = setInterval(() => { GS.game.logPractice(1, 'metronome'); }, 60000);
    }
    function stop() {
      met.stop();
      box.querySelector('[data-toggle]').innerHTML = icons.play + 'Démarrer';
      box.querySelectorAll('[data-b]').forEach((el) => el.classList.remove('on'));
      clearInterval(timer); timer = null;
    }
    range.addEventListener('input', () => setBpm(+range.value));
    on(box, 'click', '[data-add]', (e, t) => setBpm(bpm + +t.dataset.add));
    on(box, 'click', '[data-toggle]', () => { if (met.running) stop(); else start(); });
    on(box, 'click', '[data-num]', (e, t) => {
      num = +t.dataset.num;
      box.querySelectorAll('[data-num]').forEach((b) => b.classList.toggle('on', b === t));
      drawBeats();
      if (met.running) { stop(); start(); }
    });
    on(box, 'click', '[data-sub]', (e, t) => {
      sub = +t.dataset.sub;
      box.querySelectorAll('[data-sub]').forEach((b) => b.classList.toggle('on', b === t));
      if (met.running) { stop(); start(); }
    });
    on(box, 'click', '[data-tap]', () => {
      const now = performance.now();
      tapTimes = tapTimes.filter((t) => now - t < 2500);
      tapTimes.push(now);
      if (tapTimes.length >= 2) {
        const gaps = tapTimes.slice(1).map((t, i) => t - tapTimes[i]);
        setBpm(60000 / (gaps.reduce((a, b) => a + b, 0) / gaps.length));
      }
    });
    box.querySelector('[data-trainer]').addEventListener('change', (e) => { trainer = e.target.checked; barsDone = 0; });
    box.querySelector('[data-step]').addEventListener('change', (e) => { step = Math.max(1, +e.target.value || 1); });
    box.querySelector('[data-every]').addEventListener('change', (e) => { every = Math.max(1, +e.target.value || 1); });
    box.querySelector('[data-limit]').addEventListener('change', (e) => { limit = +e.target.value || 160; });
    return () => { stop(); };
  }

  /* ---------- Accords ---------- */
  function chords(box) {
    const groups = [...new Set(GS.data.chords.map((c) => c.group))];
    let q = '';
    function list() {
      return groups.map((g) => {
        const xs = GS.data.chords.filter((c) => c.group === g && (!q || (c.name + ' ' + c.full).toLowerCase().includes(q)));
        return xs.length ? `<div class="section-head"><h2>${esc(g)}</h2><span class="small faint">${xs.length}</span></div><div class="chord-row" style="grid-template-columns:repeat(auto-fill,minmax(122px,1fr))">${xs.map((c) => chordCard(c.name, { full: true })).join('')}</div>` : '';
      }).join('') || '<div class="empty">Aucun accord trouvé.</div>';
    }
    box.innerHTML = `<div class="row between"><p class="muted small">Clique pour entendre. Les chiffres sont les doigts de la main gauche.</p><input class="search" type="search" data-q placeholder="Chercher un accord" aria-label="Chercher un accord"></div><div data-list>${list()}</div>`;
    box.querySelector('[data-q]').addEventListener('input', (e) => { q = e.target.value.toLowerCase(); box.querySelector('[data-list]').innerHTML = list(); });
    on(box, 'click', '[data-chord]', (e, t) => GS.audio.playShape(GS.data.chordShape(t.dataset.chord)));
  }

  /* ---------- Gammes ---------- */
  const SCALES = {
    'Majeure': { i: [0, 2, 4, 5, 7, 9, 11], d: 'Le son « de base » de la musique occidentale.' },
    'Mineure naturelle': { i: [0, 2, 3, 5, 7, 8, 10], d: 'Mélancolique, le mode de Greensleeves.' },
    'Mineure harmonique': { i: [0, 2, 3, 5, 7, 8, 11], d: 'Dramatique : la sensible crée la tension de la dominante.' },
    'Pentatonique mineure': { i: [0, 3, 5, 7, 10], d: 'Cinq notes qui sonnent presque toujours bien.' },
    'Pentatonique majeure': { i: [0, 2, 4, 7, 9], d: 'Lumineuse, folk et country.' },
    'Blues': { i: [0, 3, 5, 6, 7, 10], d: 'La pentatonique mineure plus la note bleue.' },
    'Phrygienne': { i: [0, 1, 3, 5, 7, 8, 10], d: 'La couleur du flamenco : la seconde mineure donne tout le caractère.' },
    'Phrygienne dominante': { i: [0, 1, 4, 5, 7, 8, 10], d: 'Le son andalou par excellence : tierce majeure et seconde mineure.' },
    'Dorienne': { i: [0, 2, 3, 5, 7, 9, 10], d: 'Mineure mais lumineuse, très présente dans la musique celtique.' },
  };
  function scales(box) {
    let root = 4, name = 'Phrygienne';
    const toLabels = (m) => M.NOTES_FR[m].replace('♯', '#');
    function draw() {
      const def = SCALES[name];
      const marks = [];
      for (let s = 1; s <= 6; s++) for (let f = 0; f <= 15; f++) {
        const pc = (M.noteMidi(s, f) - root + 120) % 12;
        if (def.i.includes(pc)) marks.push({ s, f, label: toLabels(M.noteMidi(s, f) % 12).slice(0, 3), cls: pc === 0 ? 'root' : '' });
      }
      box.querySelector('[data-board]').innerHTML = GS.tab.fretboard({ frets: 15, marks });
      box.querySelector('[data-desc]').textContent = def.d;
      box.querySelector('[data-notes]').textContent = def.i.map((i) => M.NOTES_FR[(root + i) % 12]).join(' · ');
    }
    box.innerHTML = `<div class="row" style="margin-bottom:12px">
        <label class="small" style="font-weight:600">Tonique <select class="input" data-root>${M.NOTES_FR.map((n, i) => `<option value="${i}" ${i === root ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
        <label class="small" style="font-weight:600">Gamme <select class="input" data-name>${Object.keys(SCALES).map((n) => `<option ${n === name ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
        <button class="btn" data-hear>${icons.play}Écouter</button>
      </div>
      <div class="card"><div class="fb-wrap" data-board></div>
      <p style="margin-top:11px"><b data-notes></b></p><p class="small muted" data-desc></p></div>`;
    box.querySelector('[data-root]').addEventListener('change', (e) => { root = +e.target.value; draw(); });
    box.querySelector('[data-name]').addEventListener('change', (e) => { name = e.target.value; draw(); });
    on(box, 'click', '[data-hear]', () => {
      GS.audio.load().then(() => {
        const t = GS.audio.context().currentTime + 0.05, base = 48 + ((root - 0 + 12) % 12);
        const seq = SCALES[name].i.map((i) => base + i).concat(base + 12);
        seq.forEach((m, k) => GS.audio.playNote(m, t + k * 0.32, 0.5));
      });
    });
    draw();
  }

  /* ---------- Manche ---------- */
  function fretboardTool(box) {
    let filter = 'all';
    function draw() {
      const marks = [];
      for (let s = 1; s <= 6; s++) for (let f = 0; f <= 15; f++) {
        const m = M.noteMidi(s, f), pc = m % 12, natural = [0, 2, 4, 5, 7, 9, 11].includes(pc);
        if (filter === 'natural' && !natural) continue;
        if (filter !== 'all' && filter !== 'natural' && pc !== +filter) continue;
        marks.push({ s, f, label: M.NOTES_FR[pc].slice(0, 3), cls: natural ? '' : 'alt' });
      }
      box.querySelector('[data-board]').innerHTML = GS.tab.fretboard({ frets: 15, marks, clickable: true });
    }
    box.innerHTML = `<div class="filter-group" style="margin-bottom:12px">
        <button class="filter on" data-f="all">Toutes</button><button class="filter" data-f="natural">Naturelles</button>
        ${[0, 2, 4, 5, 7, 9, 11].map((p) => `<button class="filter" data-f="${p}">${M.NOTES_FR[p]}</button>`).join('')}
      </div>
      <div class="card"><div class="fb-wrap" data-board></div><p class="small muted" style="margin-top:9px">Clique une case pour l'entendre. Astuce de mémoire : la case 12 répète les cordes à vide, et les cordes 1 et 6 portent les mêmes notes.</p></div>`;
    on(box, 'click', '[data-f]', (e, t) => {
      filter = t.dataset.f;
      box.querySelectorAll('[data-f]').forEach((b) => b.classList.toggle('on', b === t));
      draw();
    });
    box.addEventListener('click', (e) => {
      const hit = e.target.closest('.fb-hit');
      if (hit) GS.audio.pluck(M.noteMidi(+hit.dataset.s, +hit.dataset.f), 1.4);
    });
    draw();
  }

  /* ---------- Cycle des quintes ---------- */
  function circle(box) {
    const MAJ = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
    const MIN = ['Am', 'Em', 'Bm', 'F#m', 'C#m', 'G#m', 'D#m', 'Bbm', 'Fm', 'Cm', 'Gm', 'Dm'];
    const SIG = ['aucune altération', '1 ♯', '2 ♯', '3 ♯', '4 ♯', '5 ♯', '6 ♯', '5 ♭', '4 ♭', '3 ♭', '2 ♭', '1 ♭'];
    let sel = 0;
    const arc = (r0, r1, a0, a1) => {
      const p = (r, a) => `${(r * Math.cos(a)).toFixed(2)} ${(r * Math.sin(a)).toFixed(2)}`;
      return `M${p(r0, a0)} L${p(r1, a0)} A${r1} ${r1} 0 0 1 ${p(r1, a1)} L${p(r0, a1)} A${r0} ${r0} 0 0 0 ${p(r0, a0)} Z`;
    };
    function draw() {
      let s = '';
      for (let i = 0; i < 12; i++) {
        const a0 = (i - 3.5) * Math.PI / 6, a1 = (i - 2.5) * Math.PI / 6, mid = (a0 + a1) / 2;
        const dist = Math.min((i - sel + 12) % 12, (sel - i + 12) % 12);
        const cls = i === sel ? 'on' : dist === 1 ? 'near' : '';
        s += `<path class="seg ${cls}" data-k="${i}" d="${arc(92, 145, a0, a1)}"/><path class="seg ${cls}" data-k="${i}" d="${arc(52, 90, a0, a1)}"/>`;
        s += `<text x="${118 * Math.cos(mid)}" y="${118 * Math.sin(mid) + 6}" text-anchor="middle" font-size="17" style="${i === sel ? 'fill:var(--accent-ink)' : ''}">${MAJ[i]}</text>`;
        s += `<text x="${71 * Math.cos(mid)}" y="${71 * Math.sin(mid) + 4}" text-anchor="middle" font-size="11" style="${i === sel ? 'fill:var(--accent-ink)' : ''}">${MIN[i]}</text>`;
      }
      box.querySelector('[data-c]').innerHTML = s;
      const fam = [MAJ[(sel + 11) % 12], MAJ[sel], MAJ[(sel + 1) % 12]], rel = [MIN[(sel + 11) % 12], MIN[sel], MIN[(sel + 1) % 12]];
      box.querySelector('[data-info]').innerHTML = `<h2>${MAJ[sel]} majeur</h2><p class="muted small" style="margin:4px 0 11px">Armure : ${SIG[sel]}. Relatif mineur : <b>${MIN[sel]}</b>.</p>
        <div class="small" style="font-weight:600;margin-bottom:4px">Accords qui vont ensemble</div>
        <div class="progression" style="margin-bottom:8px">${fam.concat(rel).map((c) => `<span class="prog-chord">${c}</span>`).join('')}</div>
        <p class="small muted">Les voisins sur le cercle partagent presque toutes leurs notes. Dans une tonalité majeure, tu trouves le IV à gauche, le V à droite, et leurs relatifs mineurs juste en dessous.</p>`;
    }
    box.innerHTML = `<div class="grid g2" style="align-items:center"><div class="card" style="text-align:center"><svg class="circle-svg" viewBox="-150 -150 300 300" style="max-width:380px;width:100%" data-c></svg></div><div class="card" data-info></div></div>`;
    on(box, 'click', '[data-k]', (e, t) => { sel = +t.dataset.k; draw(); });
    draw();
  }

  /* ---------- Accompagnateur ---------- */
  function backing(box) {
    const PRESETS = [
      { name: 'Cadence andalouse', chords: 'Am G Fmaj7 E', time: '4/4' },
      { name: 'Andalouse en valse', chords: 'Am G Fmaj7 E', time: '3/4' },
      { name: 'Pop I-V-vi-IV', chords: 'C G Am Fmaj7', time: '4/4' },
      { name: 'Ballade mineure', chords: 'Am Fmaj7 C G', time: '4/4' },
      { name: 'Blues 12 mesures', chords: 'A7 A7 A7 A7 D7 D7 A7 A7 E7 D7 A7 E7', time: '4/4' },
      { name: 'Rising Sun', chords: 'Am C D Fmaj7 Am E Am E', time: '3/4' },
      { name: 'Doo-wop', chords: 'G Em C D', time: '4/4' },
      { name: 'Phrygien en Mi', chords: 'E Fmaj7 G Fmaj7', time: '4/4' },
    ];
    let current = PRESETS[0], bpm = 80, player = null;
    const pat = (time) => time === '3/4' ? (c) => `q @${c}:D @${c}:D @${c}:U` : (c) => `q @${c}:D e @${c}:D @${c}:U r @${c}:U @${c}:D @${c}:U`;
    function draw() {
      box.querySelector('[data-seq]').innerHTML = current.chords.split(' ').map((c) => `<span class="prog-chord">${esc(c)}</span>`).join('');
      const pentas = current.name.includes('Blues') ? 'Improvise en pentatonique ou blues de La.' : current.name.includes('Phrygien') || current.name.includes('andalouse') ? 'Improvise en phrygien de Mi : les notes de Do majeur, autour de Mi.' : 'Improvise avec les notes de la tonalité, en partant des notes de chaque accord.';
      box.querySelector('[data-hint]').textContent = pentas;
    }
    function stop() {
      if (player) player.stop();
      player = null;
      const t = box.querySelector('[data-go]');
      if (t) t.innerHTML = icons.play + 'Lancer';
      box.querySelectorAll('.prog-chord.on').forEach((c) => c.classList.remove('on'));
    }
    function start() {
      stop();
      const cells = box.querySelectorAll('[data-seq] .prog-chord');
      const comp = GS.music.compile({ time: current.time, tempo: bpm, sections: [{ name: 'b', bars: current.chords.split(' ').map(pat(current.time)).join(' | ') }] }, GS.data.chordShape);
      player = new GS.audio.Player(comp, { onEvent: (b) => cells.forEach((c, i) => c.classList.toggle('on', i === b)) });
      player.loop = true;
      GS.audio.current = player;
      player.play({ countIn: true });
      box.querySelector('[data-go]').innerHTML = icons.stop + 'Arrêter';
    }
    box.innerHTML = `<div class="card stack">
      <p class="small muted">L'appli joue la grille en boucle, à toi de jouer dessus : mélodie, arpèges ou improvisation.</p>
      <div class="filter-group">${PRESETS.map((p, i) => `<button class="filter ${i === 0 ? 'on' : ''}" data-preset="${i}">${esc(p.name)}</button>`).join('')}</div>
      <div class="progression" data-seq></div>
      <div class="row"><button class="btn primary" data-go>${icons.play}Lancer</button>
        <label class="row small grow" style="max-width:300px">Tempo <input type="range" min="50" max="160" value="${bpm}" data-b><span class="num" data-bv>${bpm}</span></label></div>
      <p class="small muted" data-hint></p></div>`;
    on(box, 'click', '[data-preset]', (e, t) => {
      current = PRESETS[+t.dataset.preset];
      box.querySelectorAll('[data-preset]').forEach((b) => b.classList.toggle('on', b === t));
      const was = player && player.playing;
      stop(); draw();
      if (was) start();
    });
    on(box, 'click', '[data-go]', () => { if (player && player.playing) stop(); else start(); });
    box.querySelector('[data-b]').addEventListener('input', (e) => { bpm = +e.target.value; box.querySelector('[data-bv]').textContent = bpm; });
    box.querySelector('[data-b]').addEventListener('change', () => { if (player && player.playing) start(); });
    draw();
    return () => stop();
  }

  const handlers = { tuner, metronome, chords, scales, fretboard: fretboardTool, circle, backing };
  route('/outils', (root) => { location.hash = '#/outils/tuner'; });
  route('/outils/:id', (root, params) => {
    const h = handlers[params.id];
    if (!h) { location.hash = '#/outils/tuner'; return; }
    setCrumb('');
    return h(shell(root, params.id));
  });
})();
