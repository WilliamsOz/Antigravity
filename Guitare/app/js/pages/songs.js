/* Répertoire : bibliothèque filtrable et page de travail d'un morceau. */
(function () {
  const { esc, icons, route, on, setCrumb, stars, chordCard } = GS.ui;
  const L = () => GS.labels;
  const filters = { level: 'all', genre: 'all', status: 'all', kind: 'all', q: '' };

  const songState = (id) => GS.store.get().songs[id] || { stars: 0, minutes: 0, plays: 0 };
  const barsCount = (() => {
    const cache = {};
    return (s) => {
      if (s.type) return 0;
      if (cache[s.id] == null) cache[s.id] = GS.music.compile(s, GS.data.chordShape).bars.length;
      return cache[s.id];
    };
  })();

  const clock = (sec) => `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, '0')}`;
  const seekHtml = () => `<div class="seek" data-seek role="slider" tabindex="0" aria-label="Position dans le morceau" aria-valuemin="0" aria-valuemax="0" aria-valuenow="0"><div class="seek-fill"></div></div><span class="small num faint seek-time" data-time></span>`;

  /* Barre de progression cliquable, partagée par toutes les écoutes */
  function seekBar(el, getPlayer, onSeek) {
    const track = el.querySelector('[data-seek]'), fill = el.querySelector('.seek-fill'), time = el.querySelector('[data-time]');
    let shown = '';
    function paint(pos) {
      fill.style.width = `${pos.total ? (pos.elapsed / pos.total) * 100 : 0}%`;
      const label = `${clock(pos.elapsed)} / ${clock(pos.total)}`;
      if (label === shown) return;
      shown = label;
      time.textContent = label;
      track.setAttribute('aria-valuenow', Math.floor(pos.elapsed));
      track.setAttribute('aria-valuemax', Math.floor(pos.total));
      track.setAttribute('aria-valuetext', label);
    }
    track.addEventListener('click', (e) => {
      const p = getPlayer();
      if (!p) return;
      const r = track.getBoundingClientRect();
      onSeek(p.indexAt((e.clientX - r.left) / r.width));
    });
    track.addEventListener('keydown', (e) => {
      const p = getPlayer(), step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (!p || !step) return;
      e.preventDefault();
      onSeek(Math.max(0, Math.min(p.index() + step, p.sequence().length - 1)));
    });
    const reset = () => { const p = getPlayer(); paint({ elapsed: 0, total: p ? p.duration() : 0 }); };
    reset();
    return { paint, reset };
  }

  /* Une grille d'accords devient un morceau jouable : un accord par mesure, avec la rythmique du style */
  const chordsOf = (str) => str.split(/\s+/).map((c) => c.replace(/[()]/g, '')).filter((c) => c && c !== '|' && c !== '-');
  function chartCompile(song, progressions) {
    const time = String(song.time || '4/4');
    const pattern = time === '3/4' ? (c) => `q @${c}:D @${c}:D @${c}:U`
      : time === '6/8' ? (c) => `q. @${c}:D e @${c}:D @${c}:U @${c}:D`
      : (c) => `q @${c}:D e @${c}:D @${c}:U r @${c}:U @${c}:D @${c}:U`;
    return GS.music.compile({
      time, tempo: song.tempo || 80, capo: song.capo,
      sections: progressions.map((p) => ({ name: p.name, bars: chordsOf(p.chords).map(pattern).join(' | ') })),
    }, GS.data.chordShape);
  }

  function matches(s) {
    const st = songState(s.id);
    if (filters.level !== 'all' && s.level !== filters.level) return false;
    if (filters.genre !== 'all' && s.genre !== filters.genre) return false;
    if (filters.kind === 'tab' && s.type) return false;
    if (filters.kind === 'chart' && s.type !== 'chart') return false;
    if (filters.status === 'fav' && !st.fav) return false;
    if (filters.status === 'todo' && st.stars > 0) return false;
    if (filters.status === 'doing' && !(st.stars > 0 && st.stars < 5)) return false;
    if (filters.status === 'done' && st.stars < 5) return false;
    if (filters.q) {
      const hay = (s.title + ' ' + (s.composer || '') + ' ' + (s.techniques || []).join(' ')).toLowerCase();
      if (!hay.includes(filters.q.toLowerCase())) return false;
    }
    return true;
  }

  function card(s) {
    const st = songState(s.id);
    const typeChip = s.type === 'chart' ? '<span class="chip second">Grille d\'accords</span>' : s.type === 'archive' ? '<span class="chip">Archive</span>' : '';
    const canHear = s.type !== 'archive';
    return `<div class="song-cell"><a class="card link song-card" href="#/morceaux/${s.id}">
      <div class="row between" style="--gap:6px"><span class="chip ${s.level}">${L().level[s.level]}</span>${typeChip || (st.fav ? '<span class="fav on">♥</span>' : '')}</div>
      <div class="${canHear ? 'song-title' : ''}"><h3>${esc(s.title)}</h3><div class="small muted">${esc(s.composer || '')}</div></div>
      <div class="foot"><span class="tiny faint">${s.type ? (s.key || '') : `${barsCount(s)} mesures · ${s.time}`}</span>${stars(st.stars)}</div>
    </a>${canHear ? `<button class="btn icon-btn card-play" data-preview="${s.id}" aria-label="Écouter ${esc(s.title)}" title="Écouter">${icons.play}</button>` : ''}</div>`;
  }

  function list(root) {
    const all = GS.data.songs;
    const genres = [...new Set(all.map((s) => s.genre))];

    function results() {
      const hits = all.filter(matches);
      if (!hits.length) return `<div class="empty">Aucun morceau ne correspond. Élargis un filtre.</div>`;
      return ['debutant', 'intermediaire', 'expert'].map((lvl) => {
        const items = hits.filter((s) => s.level === lvl);
        if (!items.length) return '';
        const allLvl = all.filter((s) => s.level === lvl);
        const mastered = allLvl.filter((s) => songState(s.id).stars >= 5).length;
        return `<div class="level-header"><span class="level-dot" style="background:var(--lvl-${lvl})"></span><h2>${L().level[lvl]}</h2><span class="small faint">${items.length} morceau${items.length > 1 ? 'x' : ''} · ${mastered} maîtrisé${mastered > 1 ? 's' : ''}</span></div>
          <div class="grid gauto">${items.map(card).join('')}</div>`;
      }).join('');
    }

    const chips = (group, opts) => opts.map(([v, label]) => `<button class="filter ${filters[group] === v ? 'on' : ''}" data-filter="${group}" data-v="${v}">${esc(label)}</button>`).join('');
    const totalStars = all.reduce((n, s) => n + songState(s.id).stars, 0);

    root.innerHTML = `<header class="page-head">
        <div class="eyebrow">Le répertoire</div>
        <h1 style="margin-top:6px">Les morceaux</h1>
        <p>${all.filter((s) => !s.type).length} tablatures et ${all.filter((s) => s.type === 'chart').length} grilles d'accords. Clique sur ${icons.play.replace('<svg', '<svg class="inline-icon"')} pour écouter un morceau sans quitter la liste. Chaque morceau se gagne en cinq étoiles, du déchiffrage au par-cœur. <span class="faint">${totalStars} étoiles récoltées.</span></p>
      </header>
      <div class="stack" style="--gap:9px;margin-bottom:6px">
        <div class="row between">
          <div class="filter-group">${chips('level', [['all', 'Tous niveaux'], ['debutant', 'Débutant'], ['intermediaire', 'Intermédiaire'], ['expert', 'Expert']])}</div>
          <input class="search" type="search" data-q placeholder="Titre, compositeur, technique…" aria-label="Rechercher un morceau" value="${esc(filters.q)}">
        </div>
        <div class="filter-group">${chips('status', [['all', 'Tous'], ['todo', 'À découvrir'], ['doing', 'En cours'], ['done', 'Maîtrisés'], ['fav', 'Favoris']])}<span style="width:8px"></span>${chips('kind', [['all', 'Tout'], ['tab', 'Tablatures'], ['chart', 'Grilles d\'accords']])}</div>
        <div class="filter-group">${chips('genre', [['all', 'Tous styles'], ...genres.map((g) => [g, L().genre[g] || g])])}</div>
      </div>
      <div data-results>${results()}</div>
      <div class="mini-player no-print" data-dock hidden>
        <button class="btn primary icon-btn" data-dock-stop aria-label="Arrêter l'écoute">${icons.stop}</button>
        <div class="mini-title"><b data-dock-title></b><a class="tiny" data-dock-link>Ouvrir le morceau</a></div>
        ${seekHtml()}
      </div>`;

    /* Écoute depuis la liste */
    const dock = root.querySelector('[data-dock]');
    let hearing = null;
    const bar = seekBar(dock, () => hearing && hearing.player, (i) => hearing.player.play({ fromIndex: i }));
    function paintCards() {
      root.querySelectorAll('[data-preview]').forEach((b) => {
        const isOn = !!hearing && hearing.id === b.dataset.preview;
        b.classList.toggle('on', isOn);
        b.innerHTML = isOn ? icons.stop : icons.play;
      });
    }
    function refresh() { root.querySelector('[data-results]').innerHTML = results(); paintCards(); }
    function stopHearing() {
      if (hearing) hearing.player.stop();
    }
    function hear(song) {
      stopHearing();
      const compiled = song.type === 'chart' ? chartCompile(song, song.progressions) : GS.music.compile(song, GS.data.chordShape);
      const player = new GS.audio.Player(compiled, {
        onTick: (pos) => bar.paint(pos),
        onState: (isOn) => {
          if (isOn || !hearing || hearing.player !== player) return;
          hearing = null;
          dock.hidden = true;
          paintCards();
        },
      });
      hearing = { id: song.id, player };
      GS.audio.current = player;
      dock.querySelector('[data-dock-title]').textContent = song.title;
      dock.querySelector('[data-dock-link]').href = `#/morceaux/${song.id}`;
      dock.hidden = false;
      bar.reset();
      paintCards();
      player.play();
    }
    on(root, 'click', '[data-preview]', (e, t) => {
      const same = hearing && hearing.id === t.dataset.preview;
      if (same) stopHearing(); else hear(all.find((x) => x.id === t.dataset.preview));
    });
    on(root, 'click', '[data-dock-stop]', stopHearing);

    on(root, 'click', '[data-filter]', (e, t) => {
      filters[t.dataset.filter] = t.dataset.v;
      root.querySelectorAll(`[data-filter="${t.dataset.filter}"]`).forEach((b) => b.classList.toggle('on', b === t));
      refresh();
    });
    root.querySelector('[data-q]').addEventListener('input', (e) => { filters.q = e.target.value; refresh(); });
    return stopHearing;
  }

  /* ---------- Colonne latérale commune ---------- */
  function masteryPanel(song) {
    const st = songState(song.id);
    return `<div class="card tight" data-mastery>
      <div class="row between"><h3>Maîtrise</h3>${stars(st.stars)}</div>
      <p class="tiny faint" style="margin:3px 0 7px">Coche honnêtement : personne ne te note, c'est ton oreille qui juge.</p>
      ${GS.game.STAR_STEPS.map((step) => `<button class="star-step ${st.stars >= step.n ? 'on' : ''} ${st.stars + 1 === step.n ? 'nextstep' : ''}" data-star="${step.n}">
        <span class="s">★</span><span><b class="small">${esc(step.label)}</b><br><span class="tiny faint">${esc(step.hint)}</span></span>
      </button>`).join('')}
    </div>`;
  }

  function infoPanel(song) {
    return `${song.chords && song.chords.length ? `<div class="card tight"><h3 style="margin-bottom:9px">Accords</h3><div class="chord-row" style="grid-template-columns:repeat(auto-fill,minmax(94px,1fr))">${song.chords.map((c) => chordCard(c, { size: 92 })).join('')}</div></div>` : ''}
      ${song.tips && song.tips.length ? `<div class="card tight"><h3 style="margin-bottom:6px">Conseils</h3><ul class="small" style="margin:0;padding-left:18px;display:grid;gap:6px">${song.tips.map((t) => `<li>${GS.ui.md(t)}</li>`).join('')}</ul></div>` : ''}
      <div class="card tight small">
        ${song.techniques && song.techniques.length ? `<div class="row" style="--gap:4px;margin-bottom:8px">${song.techniques.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</div>` : ''}
        ${song.source ? `<div class="faint tiny">${song.sourceUrl ? `<a href="${esc(song.sourceUrl)}" target="_blank" rel="noopener">${esc(song.source)}</a>` : esc(song.source)}</div>` : ''}
        ${song.video ? `<a class="btn sm" style="margin-top:8px" href="${esc(song.video)}" target="_blank" rel="noopener">${icons.yt}Voir une interprétation</a>` : ''}
      </div>`;
  }

  function headerHtml(song) {
    const st = songState(song.id);
    return `<header class="page-head" style="margin-bottom:14px">
      <div class="row" style="--gap:6px"><span class="chip ${song.level}">${L().level[song.level]}</span><span class="chip">${esc(L().genre[song.genre] || song.genre)}</span></div>
      <div class="row between" style="align-items:flex-start;margin-top:8px">
        <div class="grow"><h1>${esc(song.title)}</h1><div class="muted">${esc(song.composer || '')}${song.key ? ` · ${esc(song.key)}` : ''}${song.capo ? ` · Capo ${song.capo}` : ''}</div></div>
        <button class="fav ${st.fav ? 'on' : ''}" data-fav aria-label="Favori" style="font-size:1.7rem">${st.fav ? '♥' : '♡'}</button>
      </div>
      <p>${GS.ui.md(song.desc || '')}</p>
    </header>`;
  }

  function bindCommon(root, song) {
    on(root, 'click', '[data-star]', (e, t) => {
      const n = +t.dataset.star, cur = songState(song.id).stars;
      GS.game.setStars(song, cur === n ? n - 1 : n);
      const panel = root.querySelector('[data-mastery]');
      if (panel) panel.outerHTML = masteryPanel(song);
    });
    on(root, 'click', '[data-fav]', (e, t) => {
      GS.store.update((st) => {
        const x = st.songs[song.id] = Object.assign({ stars: 0, minutes: 0, plays: 0 }, st.songs[song.id]);
        x.fav = !x.fav;
      });
      const f = songState(song.id).fav;
      t.classList.toggle('on', !!f);
      t.textContent = f ? '♥' : '♡';
    });
    on(root, 'click', '[data-chord]', (e, t) => GS.audio.playShape(GS.data.chordShape(t.dataset.chord)));
  }

  /* ---------- Morceau avec tablature ---------- */
  function tabSong(root, song) {
    const compiled = GS.music.compile(song, GS.data.chordShape);
    const settings = GS.store.get().settings;
    const base = compiled.tempo;
    let speed = 0.6;
    let mode = 'listen'; // « listen » : le morceau tel quel ; « practice » : au tempo choisi, pour jouer par-dessus
    let sel = null, anchor = null;
    const hasPima = song.pima != null ? song.pima : false;

    root.innerHTML = `${headerHtml(song)}
      <div class="song-layout">
        <div>
          <div class="transport no-print" data-transport>
            <div class="listen-row">
              <button class="btn primary" data-play="listen" title="Le morceau entier, au tempo de ${base} BPM">${icons.play}Écouter</button>
              <button class="btn" data-play="practice" title="Au tempo choisi et avec tes réglages, pour jouer par-dessus">${icons.play}Jouer avec</button>
              ${seekHtml()}
            </div>
            <div class="practice-opts">
              <div class="tempo" title="Tempo de « Jouer avec »">
                <input type="range" min="30" max="130" step="5" value="${speed * 100}" data-speed aria-label="Vitesse de « Jouer avec »">
                <span class="small num" style="white-space:nowrap;min-width:76px" data-bpm></span>
              </div>
              <button class="tgl" data-tgl="metro">${icons.metro}Métronome</button>
              <button class="tgl on" data-tgl="count">Décompte</button>
              <button class="tgl" data-tgl="loop">${icons.loop}Boucle</button>
              <button class="tgl" data-tgl="thumb" title="Coupe les basses pour jouer ta partie par-dessus">Sans basses</button>
            </div>
          </div>
          <div class="row between no-print" style="--gap:6px;margin-bottom:10px;align-items:flex-start">
            <div class="row grow" style="--gap:6px" data-sections>
              ${compiled.sections.length > 1 ? compiled.sections.map((sec, i) => `<button class="filter" data-sec="${i}">${esc(sec.name)}</button>`).join('') : ''}
              <span class="small faint" data-sel-info>Clique deux mesures pour isoler un passage. Clique une note pour l'entendre.</span>
            </div>
            <div class="row" style="--gap:6px">
              <button class="tgl ${settings.noteNames ? 'on' : ''}" data-tgl="names">Notes</button>
              ${hasPima ? `<button class="tgl on" data-tgl="pima">p-i-m-a</button>` : ''}
              <button class="tgl" data-print aria-label="Imprimer">${icons.print}</button>
            </div>
          </div>
          <div data-sheet></div>
        </div>
        <aside class="stack no-print">${masteryPanel(song)}${infoPanel(song)}</aside>
      </div>`;

    const view = GS.tab.mount(root.querySelector('[data-sheet]'), compiled, { pima: hasPima, noteNames: settings.noteNames, onBarClick: barClick });
    const buttons = { listen: root.querySelector('[data-play="listen"]'), practice: root.querySelector('[data-play="practice"]') };
    const labels = { listen: 'Écouter', practice: 'Jouer avec' };
    const transportEl = root.querySelector('[data-transport]');
    const opts = { count: true, metro: false, loop: false, thumb: false };
    let playStart = 0, accumulated = 0, metroCredit = false;

    function paintButtons(isOn) {
      Object.keys(buttons).forEach((m) => { buttons[m].innerHTML = isOn && m === mode ? `${icons.stop}Arrêter` : `${icons.play}${labels[m]}`; });
    }
    const player = new GS.audio.Player(compiled, {
      onLoading: (isOn) => { if (isOn) buttons[mode].textContent = 'Chargement…'; },
      onEvent: (b, e) => view.highlight(b, e),
      onTick: (pos) => bar.paint(pos),
      onState: (isOn) => {
        paintButtons(isOn);
        transportEl.classList.toggle('is-playing', isOn);
        if (isOn) { if (mode === 'practice' && !playStart) playStart = Date.now(); }
        else { view.clear(); flushTime(); bar.reset(); }
      },
    });
    GS.audio.current = player;

    /* L'écoute ignore les réglages de travail, sans les perdre */
    function setMode(m) {
      mode = m;
      const listen = m === 'listen';
      player.speed = listen ? 1 : speed;
      player.metro = !listen && opts.metro;
      player.loop = !listen && opts.loop;
      player.mutedThumb = !listen && opts.thumb;
      player.range = listen ? null : sel;
    }
    setMode('listen');
    const bar = seekBar(root.querySelector('.listen-row'), () => player, (i) => {
      if (player.playing) player.play({ fromIndex: i }); else start(mode, i);
    });

    /* Compte le temps de travail réel passé à jouer avec le lecteur */
    function flushTime() {
      if (playStart) { accumulated += (Date.now() - playStart) / 1000; playStart = 0; }
      if (player.metro && accumulated >= 30 && !metroCredit) { metroCredit = true; GS.game.track('songPractice'); }
      const whole = Math.floor(accumulated / 60);
      if (whole >= 1) {
        accumulated -= whole * 60;
        GS.store.update((st) => { const x = st.songs[song.id] = Object.assign({ stars: 0, minutes: 0, plays: 0 }, st.songs[song.id]); x.minutes += whole; x.lastAt = Date.now(); });
        GS.game.logPractice(whole, 'song', song.title);
      }
    }

    function updateBpm() {
      root.querySelector('[data-bpm]').textContent = `${Math.round(base * speed)} BPM · ${Math.round(speed * 100)} %`;
    }
    updateBpm();

    function start(m, fromIndex) {
      if (player.playing) player.stop();
      setMode(m);
      if (m === 'practice' && fromIndex == null) {
        GS.store.update((st) => { const x = st.songs[song.id] = Object.assign({ stars: 0, minutes: 0, plays: 0 }, st.songs[song.id]); x.plays += 1; x.lastAt = Date.now(); });
      }
      player.play({ countIn: m === 'practice' && opts.count && fromIndex == null, fromIndex });
    }

    on(root, 'click', '[data-play]', (e, t) => {
      if (player.playing && mode === t.dataset.play) player.stop(); else start(t.dataset.play);
    });
    root.querySelector('[data-speed]').addEventListener('input', (e) => {
      speed = +e.target.value / 100;
      if (mode === 'practice') player.speed = speed;
      if (!player.playing) { setMode('practice'); bar.reset(); }
      updateBpm();
    });
    root.querySelector('[data-speed]').addEventListener('change', () => restart());

    /* Repart de la mesure en cours après un changement de réglage */
    function restart() { if (player.playing && mode === 'practice') player.play({ fromIndex: player.index() }); }
    on(root, 'click', '[data-tgl]', (e, t) => {
      const k = t.dataset.tgl;
      t.classList.toggle('on');
      const v = t.classList.contains('on');
      if (k === 'metro' || k === 'count' || k === 'loop' || k === 'thumb') {
        opts[k] = v;
        if (mode === 'practice') setMode('practice');
        if (k === 'metro' || k === 'thumb') restart();
      }
      if (k === 'names') { view.setOptions({ noteNames: v }); GS.store.update((st) => { st.settings.noteNames = v; }); }
      if (k === 'pima') view.setOptions({ pima: v });
    });
    on(root, 'click', '[data-print]', () => window.print());

    /* Sélection d'un passage */
    const info = root.querySelector('[data-sel-info]');
    const baseInfo = info.textContent;
    function applySelection() {
      view.setSelection(sel);
      if (sel) {
        info.innerHTML = `Passage : mesures ${sel.from + 1} à ${sel.to + 1} <button class="btn ghost sm" data-clear>Tout le morceau</button>`;
        if (!opts.loop) { opts.loop = true; root.querySelector('[data-tgl="loop"]').classList.add('on'); }
      } else info.textContent = baseInfo;
      root.querySelectorAll('[data-sec]').forEach((b) => {
        const s = compiled.sections[+b.dataset.sec];
        b.classList.toggle('on', !!sel && sel.from === s.first && sel.to === s.last);
      });
      // Pendant une écoute, le passage attend « Jouer avec » : il ne coupe pas le morceau
      if (player.playing && mode === 'listen') return;
      setMode('practice');
      if (player.playing) player.play(); else bar.reset();
    }
    function barClick(b) {
      if (anchor === null) { anchor = b; sel = { from: b, to: b }; }
      else { sel = { from: Math.min(anchor, b), to: Math.max(anchor, b) }; anchor = null; }
      applySelection();
    }
    on(root, 'click', '[data-clear]', () => { sel = null; anchor = null; applySelection(); });
    on(root, 'click', '[data-sec]', (e, t) => {
      const s = compiled.sections[+t.dataset.sec];
      if (sel && sel.from === s.first && sel.to === s.last) sel = null;
      else sel = { from: s.first, to: s.last };
      anchor = null;
      applySelection();
    });

    function onKey(e) {
      if (e.code !== 'Space' || /INPUT|TEXTAREA|BUTTON|SELECT/.test(e.target.tagName)) return;
      e.preventDefault();
      if (player.playing) player.stop(); else start(mode);
    }
    document.addEventListener('keydown', onKey);

    bindCommon(root, song);
    return () => { document.removeEventListener('keydown', onKey); player.stop(); flushTime(); view.destroy(); };
  }

  /* ---------- Grille d'accords ---------- */
  function chartSong(root, song) {
    root.innerHTML = `${headerHtml(song)}
      <div class="song-layout"><div class="stack">
        <div class="callout tip"><span class="t">Grille d'accords</span>Ce morceau est sous droits : l'appli donne la grille et la rythmique pour l'accompagner, sans la tablature note à note. ${song.link ? `<a href="${esc(song.link)}" target="_blank" rel="noopener">Chercher la tablature sur Songsterr</a>.` : ''}</div>
        <div class="transport no-print" style="margin-bottom:0"><div class="listen-row"><button class="btn primary" data-hear-all>${icons.play}Écouter la grille</button>${seekHtml()}</div></div>
        ${song.strum ? `<div class="card tight"><div class="row between"><div><div class="eyebrow">Rythmique</div><div class="mono" style="font-size:1.1rem;margin-top:3px">${esc(song.strum)}</div><div class="tiny faint">B = vers le bas, H = vers le haut, - = silence</div></div><div class="small muted num">${song.tempo || ''} BPM${song.time ? ' · ' + esc(song.time) : ''}</div></div></div>` : ''}
        ${(song.progressions || []).map((p, i) => `<div class="card tight">
          <div class="row between" style="margin-bottom:9px"><h3>${esc(p.name)}</h3><button class="btn sm" data-listen="${i}">${icons.play}Écouter en boucle</button></div>
          <div class="progression" data-prog="${i}">${chordsOf(p.chords).map((c) => `<span class="prog-chord">${esc(c)}</span>`).join('')}</div>
        </div>`).join('')}
      </div><aside class="stack">${masteryPanel(song)}${infoPanel(song)}</aside></div>`;

    /* Toute la grille, une fois, du début à la fin */
    const allCells = root.querySelectorAll('.prog-chord'), hearAllBtn = root.querySelector('[data-hear-all]');
    const fullPlayer = new GS.audio.Player(chartCompile(song, song.progressions), {
      onLoading: (isOn) => { if (isOn) hearAllBtn.textContent = 'Chargement…'; },
      onEvent: (b) => allCells.forEach((c, k) => c.classList.toggle('on', k === b)),
      onTick: (pos) => fullBar.paint(pos),
      onState: (isOn) => {
        hearAllBtn.innerHTML = isOn ? `${icons.stop}Arrêter` : `${icons.play}Écouter la grille`;
        if (!isOn) { allCells.forEach((c) => c.classList.remove('on')); fullBar.reset(); }
      },
    });
    const fullBar = seekBar(root.querySelector('.listen-row'), () => fullPlayer, (i) => { stopPlayer(); GS.audio.current = fullPlayer; fullPlayer.play({ fromIndex: i }); });
    on(root, 'click', '[data-hear-all]', () => {
      if (fullPlayer.playing) { fullPlayer.stop(); return; }
      stopPlayer();
      GS.audio.current = fullPlayer;
      fullPlayer.play();
    });

    let player = null, activeBtn = null, activeProg = null;
    function stopPlayer() {
      if (player) player.stop();
      player = null;
      if (activeBtn) activeBtn.innerHTML = icons.play + 'Écouter en boucle';
      if (activeProg) activeProg.querySelectorAll('.on').forEach((x) => x.classList.remove('on'));
      activeBtn = null; activeProg = null;
    }
    on(root, 'click', '[data-listen]', (e, t) => {
      const same = activeBtn === t;
      stopPlayer();
      fullPlayer.stop();
      if (same) return;
      const i = +t.dataset.listen;
      const comp = chartCompile(song, [song.progressions[i]]);
      const box = root.querySelector(`[data-prog="${i}"]`), cells = box.querySelectorAll('.prog-chord');
      player = new GS.audio.Player(comp, { onEvent: (b) => { cells.forEach((c, k) => c.classList.toggle('on', k === b)); } });
      player.loop = true;
      GS.audio.current = player;
      activeBtn = t; activeProg = box;
      t.innerHTML = icons.stop + 'Arrêter';
      player.play({ countIn: true });
    });
    bindCommon(root, song);
    return () => { stopPlayer(); fullPlayer.stop(); };
  }

  /* ---------- Archive ---------- */
  function archiveSong(root, song) {
    root.innerHTML = `${headerHtml(song)}
      <div class="song-layout"><div class="stack">
        <div class="callout warn"><span class="t">À vérifier</span>Tablature reprise telle quelle de l'ancienne version, générée par IA et non vérifiée. Ce morceau est sous droits : elle n'est donc ni corrigée ni jouée par l'appli. Compare-la à ${song.video ? `<a href="${esc(song.video)}" target="_blank" rel="noopener">la vidéo de référence</a>` : 'un enregistrement'} ou à une source officielle avant de la travailler.</div>
        <pre class="ascii">${esc(song.ascii)}</pre>
      </div><aside class="stack">${masteryPanel(song)}${infoPanel(song)}</aside></div>`;
    bindCommon(root, song);
  }

  function detail(root, params) {
    const song = GS.data.songs.find((s) => s.id === params.id);
    if (!song) { location.hash = '#/morceaux'; return; }
    setCrumb(`<a href="#/morceaux">Morceaux</a> / ${esc(song.title)}`);
    if (song.type === 'chart') return chartSong(root, song);
    if (song.type === 'archive') return archiveSong(root, song);
    return tabSong(root, song);
  }

  route('/morceaux', list);
  route('/morceaux/:id', detail);
})();
