/* Démarrage : charge la progression, dessine le cadre de l'appli, lance le routeur. */
(function () {
  const GS = window.GS;
  const { icons, esc } = GS.ui;

  GS.labels = {
    level: { debutant: 'Débutant', intermediaire: 'Intermédiaire', expert: 'Expert' },
    genre: { classique: 'Classique', espagnol: 'Espagnol', flamenco: 'Flamenco', folk: 'Folk', traditionnel: 'Traditionnel', baroque: 'Baroque', renaissance: 'Renaissance', noel: 'Noël', populaire: 'Populaire' },
    goal: { equilibre: 'Équilibre', echauffement: 'Échauffement', dexterite: 'Dextérité', accords: 'Accords', arpeges: 'Arpèges', rythme: 'Rythme', vitesse: 'Vitesse', flamenco: 'Flamenco', morceaux: 'Morceaux' },
    cat: { echauffement: 'Échauffement', maingauche: 'Main gauche', maindroite: 'Main droite', accords: 'Accords', arpeges: 'Arpèges', rythme: 'Rythme', gammes: 'Gammes', vitesse: 'Vitesse', legato: 'Légato', flamenco: 'Flamenco', musicalite: 'Musicalité' },
    log: { lesson: 'Leçon', routine: 'Routine', song: 'Morceau', game: 'Entraînement', metronome: 'Métronome', manual: 'Jeu libre' },
  };

  const NAV = [
    ['/', 'Accueil', 'home'], ['/cours', 'Cours', 'book'], ['/routines', 'Routines', 'target'], ['/morceaux', 'Morceaux', 'music'],
    ['/entrainement', 'Entraînement', 'game'],
  ];
  const NAV2 = [['/outils', 'Outils', 'tool'], ['/progres', 'Progression', 'chart'], ['/boutique', 'Boutique', 'shop'], ['/bibliotheque', 'Bibliothèque', 'lib'], ['/reglages', 'Réglages', 'gear']];
  const link = ([href, label, ic]) => `<a class="nav-link" data-nav="${href}" href="#${href}">${icons[ic]}<span>${label}</span></a>`;

  function frame() {
    document.getElementById('app').innerHTML = `
      <aside class="side">
        <a class="brand" href="#/">${GS.ui.rosette(1, 38, '')}<span><b>GuitarStudio</b><small>nylon et flamenco</small></span></a>
        <nav aria-label="Navigation principale">${NAV.map(link).join('')}<div class="nav-sep">Suivi et outils</div>${NAV2.map(link).join('')}</nav>
        <a class="side-foot" href="#/progres" style="text-decoration:none;color:inherit" data-sidehud></a>
      </aside>
      <div class="main">
        <div class="topbar"><div class="crumb" id="crumb"></div><div class="row" style="--gap:6px;flex-wrap:nowrap" id="hud"></div></div>
        <main class="page" id="page"></main>
      </div>
      <nav class="bottom-nav" aria-label="Navigation">
        ${NAV.slice(0, 4).map(([h, l, i]) => `<a data-nav="${h}" href="#${h}">${icons[i]}${l}</a>`).join('')}
        <a data-nav="/progres" href="#/progres">${icons.chart}Progrès</a>
      </nav>`;
  }

  function hud() {
    const s = GS.store.get(), info = GS.game.levelInfo(s.xp);
    const today = (s.days[GS.util.today()] || {}).minutes || 0;
    const h = document.getElementById('hud');
    if (h) {
      h.innerHTML = `
        ${GS.game.boostActive() ? `<a class="hud boost" href="#/boutique" title="XP doublée">☕ ×2</a>` : ''}
        <a class="hud flame" href="#/progres" title="Jours de suite">${icons.flame}<span class="num">${s.streak.count}</span></a>
        <a class="hud" href="#/boutique" title="Médiators">${icons.pick}<span class="num">${s.picks}</span></a>
        <a class="hud" href="#/progres" title="Niveau ${info.level} : ${esc(info.title)}">Niv. <span class="num">${info.level}</span></a>`;
    }
    const sh = document.querySelector('[data-sidehud]');
    if (sh) {
      sh.innerHTML = `<div class="row between small" style="margin-bottom:5px"><b style="font-family:Fraunces,serif;font-weight:600">${esc(info.title)}</b></div>
        <div class="fretbar"><i style="width:${info.pct}%"></i></div>
        <div class="row between tiny faint" style="margin-top:4px"><span>Niveau ${info.level}</span><span class="num">${info.into}/${info.need} XP</span></div>
        <div class="tiny faint" style="margin-top:2px">${today} min aujourd'hui</div>`;
    }
  }

  GS.applyLook = function () {
    const s = GS.store.get(), root = document.documentElement;
    root.dataset.theme = s.shop.theme;
    root.dataset.paper = s.shop.paper;
    if (s.settings.reduceMotion) root.dataset.motion = 'reduce'; else delete root.dataset.motion;
  };

  function start() {
    GS.store.load();
    GS.applyLook();
    frame();
    GS.store.onChange(hud);
    hud();
    GS.game.reviewStreak();
    GS.game.refreshQuests();
    window.addEventListener('hashchange', GS.ui.dispatch);
    /* La première interaction déverrouille le son du navigateur et précharge les échantillons */
    const unlock = () => { GS.audio.load(); document.removeEventListener('pointerdown', unlock); };
    document.addEventListener('pointerdown', unlock);
    GS.ui.dispatch();
    GS.game.checkBadges();
    setInterval(hud, 60000);
  }

  // Les pages de cartes ouvrent parfois une ancre interne (#/cours#ch3) : on défile jusqu'à elle
  window.addEventListener('hashchange', scrollAnchor);
  function scrollAnchor() {
    const m = /#\/cours#(ch\d+)/.exec(location.hash);
    if (m) setTimeout(() => { const el = document.getElementById(m[1]); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 60);
  }

  start();
})();
