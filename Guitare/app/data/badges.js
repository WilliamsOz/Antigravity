/* Succès et articles de la boutique. */
(function () {
  const GS = window.GS;
  const lessonsDone = (s) => Object.keys(s.lessons).filter((k) => !k.startsWith('boss-') && s.lessons[k].done).length;
  const bossesDone = (s) => Object.keys(s.lessons).filter((k) => k.startsWith('boss-') && s.lessons[k].done).length;
  const songs = (s, n) => Object.keys(s.songs).filter((id) => (s.songs[id].stars || 0) >= n);
  const levelSong = (s, lvl, n) => songs(s, n).filter((id) => { const x = GS.data.songs.find((y) => y.id === id); return x && x.level === lvl; }).length;
  const totalStars = (s) => Object.values(s.songs).reduce((n, x) => n + (x.stars || 0), 0);
  const minutes = (s) => Object.values(s.days).reduce((n, d) => n + (d.minutes || 0), 0);
  const routinesDone = (s) => Object.values(s.routines.done).reduce((a, b) => a + b, 0);
  const plays = (s) => Object.values(s.games).reduce((a, g) => a + (g.plays || 0), 0);
  const c = (s, k) => s.counters[k] || 0;
  const B = (id, icon, title, desc, test, xp, picks) => ({ id, icon, title, desc, test, xp: xp || 25, picks: picks || 15 });

  GS.data.badges = [
    // Premiers pas
    B('first-note', '🎵', 'Première note', 'Enregistrer ta première minute de pratique.', (s) => minutes(s) >= 1, 20, 10),
    B('first-lesson', '📖', 'Première leçon', 'Valider une leçon du cours.', (s) => lessonsDone(s) >= 1, 20, 10),
    B('first-routine', '🎯', 'Première routine', 'Terminer une routine en entier.', (s) => routinesDone(s) >= 1, 25, 10),
    B('first-star', '⭐', 'Première étoile', 'Gagner une étoile sur un morceau.', (s) => totalStars(s) >= 1, 25, 10),
    B('first-game', '🕹️', 'Salle de jeux', 'Faire une partie d\'entraînement.', (s) => plays(s) >= 1, 15, 8),
    B('first-buy', '🛍️', 'Client du luthier', 'Acheter quelque chose à la boutique.', (s) => c(s, 'purchases') >= 1, 15, 5),
    B('tuned', '🎚️', 'Oreille juste', 'Accorder une corde avec l\'accordeur.', (s) => c(s, 'tuner') >= 1, 15, 8),
    B('writer', '✍️', 'Carnet de route', 'Écrire 5 notes dans ton journal.', (s) => c(s, 'journal') >= 5, 30, 15),
    // Assiduité
    B('streak-3', '🔥', 'Ça chauffe', '3 jours de suite.', (s) => s.streak.best >= 3, 30, 15),
    B('streak-7', '🔥', 'Une semaine entière', '7 jours de suite.', (s) => s.streak.best >= 7, 60, 30),
    B('streak-14', '🔥', 'Quinzaine de feu', '14 jours de suite.', (s) => s.streak.best >= 14, 100, 50),
    B('streak-30', '🌋', 'Le mois parfait', '30 jours de suite.', (s) => s.streak.best >= 30, 200, 100),
    B('streak-100', '🏛️', 'Cent jours', '100 jours de suite.', (s) => s.streak.best >= 100, 500, 250),
    B('goal-10', '🎯', 'Dans le mille', 'Atteindre 10 fois ton objectif quotidien.', (s) => c(s, 'goalDays') >= 10, 60, 30),
    B('goal-50', '🏹', 'Tireur d\'élite', 'Atteindre 50 fois ton objectif quotidien.', (s) => c(s, 'goalDays') >= 50, 150, 70),
    B('early', '🌅', 'Lève-tôt', 'Jouer avant 8 heures.', (s) => c(s, 'earlyBird') >= 1, 20, 10),
    B('night', '🌙', 'Noctambule', 'Jouer après 23 heures.', (s) => c(s, 'nightOwl') >= 1, 20, 10),
    // Temps de jeu
    B('min-60', '⏱️', 'Une heure', 'Cumuler 1 heure de pratique.', (s) => minutes(s) >= 60, 40, 20),
    B('min-300', '⏳', 'Cinq heures', 'Cumuler 5 heures de pratique.', (s) => minutes(s) >= 300, 80, 40),
    B('min-1200', '⌛', 'Vingt heures', 'Le cap où tout commence à sonner.', (s) => minutes(s) >= 1200, 200, 100),
    B('min-6000', '🕰️', 'Cent heures', 'Cumuler 100 heures de pratique.', (s) => minutes(s) >= 6000, 600, 300),
    // Cours
    B('lessons-10', '📚', 'Bon élève', 'Valider 10 leçons.', (s) => lessonsDone(s) >= 10, 50, 25),
    B('lessons-30', '🎓', 'Élève assidu', 'Valider 30 leçons.', (s) => lessonsDone(s) >= 30, 120, 60),
    B('lessons-all', '🏅', 'Diplômé', 'Valider toutes les leçons du cours.', (s) => lessonsDone(s) >= GS.data.courses.reduce((n, x) => n + x.lessons.length, 0), 400, 200),
    B('perfect-5', '💯', 'Sans faute', 'Réussir 5 quiz du premier coup.', (s) => c(s, 'perfectQuiz') >= 5, 50, 25),
    B('perfect-25', '🧠', 'Tête bien faite', 'Réussir 25 quiz du premier coup.', (s) => c(s, 'perfectQuiz') >= 25, 130, 60),
    B('boss-1', '⚔️', 'Premier boss', 'Franchir ta première étape.', (s) => bossesDone(s) >= 1, 50, 25),
    B('boss-5', '🗡️', 'À mi-chemin', 'Franchir 5 étapes du voyage.', (s) => bossesDone(s) >= 5, 150, 75),
    B('boss-10', '👑', 'Arrivé à Grenade', 'Terminer tout le voyage.', (s) => bossesDone(s) >= 10, 500, 250),
    // Répertoire
    B('song-1', '🎶', 'Premier morceau', 'Maîtriser un morceau (5 étoiles).', (s) => songs(s, 5).length >= 1, 60, 30),
    B('song-5', '🎼', 'Petit répertoire', 'Maîtriser 5 morceaux.', (s) => songs(s, 5).length >= 5, 150, 70),
    B('song-15', '🎭', 'Concertiste', 'Maîtriser 15 morceaux.', (s) => songs(s, 5).length >= 15, 400, 200),
    B('stars-25', '🌟', 'Pluie d\'étoiles', 'Récolter 25 étoiles.', (s) => totalStars(s) >= 25, 70, 35),
    B('stars-100', '🌌', 'Voie lactée', 'Récolter 100 étoiles.', (s) => totalStars(s) >= 100, 250, 120),
    B('mid-1', '🌿', 'Cap intermédiaire', 'Maîtriser un morceau intermédiaire.', (s) => levelSong(s, 'intermediaire', 5) >= 1, 100, 50),
    B('expert-1', '🔥', 'Premier chef-d\'œuvre', 'Maîtriser un morceau expert.', (s) => levelSong(s, 'expert', 5) >= 1, 300, 150),
    B('romance', '🌹', 'Jeux interdits', 'Maîtriser la Romance.', (s) => (s.songs.romance || {}).stars >= 5, 100, 50),
    B('asturias', '💃', 'Leyenda', 'Maîtriser Asturias.', (s) => (s.songs.asturias || {}).stars >= 5, 300, 150),
    B('recuerdos', '🏰', 'L\'Alhambra', 'Maîtriser Recuerdos de la Alhambra.', (s) => (s.songs.recuerdos || {}).stars >= 5, 400, 200),
    // Routines
    B('routine-10', '🏋️', 'Régulier', 'Terminer 10 routines.', (s) => routinesDone(s) >= 10, 70, 35),
    B('routine-50', '💪', 'Infatigable', 'Terminer 50 routines.', (s) => routinesDone(s) >= 50, 220, 100),
    B('builder', '🧩', 'Architecte', 'Créer ta propre routine.', (s) => s.routines.custom.length >= 1, 25, 15),
    B('bpm-record', '⚡', 'Plus vite !', 'Battre un record de tempo.', (s) => c(s, 'bpmRecord') >= 1, 25, 15),
    B('bpm-120', '🚀', 'Cap des 120', 'Enregistrer un exercice à 120 BPM ou plus.', (s) => Object.values(s.exercises).some((e) => e.best >= 120), 60, 30),
    // Entraînement
    B('fret-100', '🧭', 'Cartographe', 'Trouver 100 notes sur le manche.', (s) => c(s, 'fretRight') >= 100, 70, 35),
    B('fret-500', '🗺️', 'Le manche n\'a plus de secret', 'Trouver 500 notes sur le manche.', (s) => c(s, 'fretRight') >= 500, 200, 100),
    B('ear-50', '👂', 'Oreille fine', 'Reconnaître 50 sons.', (s) => c(s, 'earRight') >= 50, 70, 35),
    B('rhythm-90', '🥁', 'Métronome humain', 'Faire 90 % de précision au Compás.', (s) => (s.games.rhythm || {}).best >= 90, 80, 40),
    B('changes-30', '🤘', 'Mains agiles', '30 changements d\'accords en une minute.', (s) => (s.games.changes || {}).best >= 30, 60, 30),
    B('changes-60', '🖐️', 'Un par seconde', '60 changements en une minute.', (s) => (s.games.changes || {}).best >= 60, 150, 70),
    // Quêtes et niveaux
    B('quest-10', '🗝️', 'Aventurier', 'Accomplir 10 quêtes.', (s) => c(s, 'questsDone') >= 10, 60, 30),
    B('quest-100', '🏆', 'Légende des quêtes', 'Accomplir 100 quêtes.', (s) => c(s, 'questsDone') >= 100, 300, 150),
    B('chest-10', '🎁', 'Chasseur de coffres', 'Ouvrir 10 coffres.', (s) => c(s, 'chests') >= 10, 70, 35),
    B('level-10', '🥉', 'Niveau 10', 'Atteindre le niveau 10.', (s, g) => g.levelInfo(s.xp).level >= 10, 80, 40),
    B('level-25', '🥈', 'Niveau 25', 'Atteindre le niveau 25.', (s, g) => g.levelInfo(s.xp).level >= 25, 200, 100),
    B('level-50', '🥇', 'Niveau 50', 'Atteindre le niveau 50.', (s, g) => g.levelInfo(s.xp).level >= 50, 500, 250),
  ];

  GS.data.shop = [
    { id: 'freeze', group: 'bonus', consumable: true, price: 60, icon: '🛡️', title: 'Capo de protection', desc: 'Protège ta série une journée si tu ne peux pas jouer. 3 en réserve au maximum.' },
    { id: 'boost', group: 'bonus', consumable: true, price: 45, icon: '☕', title: 'Café du conservatoire', desc: 'Double toute l\'XP gagnée pendant une heure.' },
    { id: 'theme-palissandre', group: 'theme', price: 0, theme: 'palissandre', title: 'Palissandre', desc: 'Bois sombre et laiton, le thème d\'origine.', swatches: ['#14100d', '#2a201a', '#e5ab42', '#66bfad'] },
    { id: 'theme-epicea', group: 'theme', price: 120, theme: 'epicea', title: 'Épicéa', desc: 'Le clair de la table d\'harmonie, pour jouer en plein jour.', swatches: ['#f4ead8', '#fff9ee', '#a8620f', '#1d7c6c'] },
    { id: 'theme-oliveraie', group: 'theme', price: 180, theme: 'oliveraie', title: 'Oliveraie', desc: 'Le vert des collines de Jaén.', swatches: ['#11140d', '#262b1d', '#c4cf5e', '#e0975a'] },
    { id: 'theme-azulejo', group: 'theme', price: 250, theme: 'azulejo', title: 'Azulejo', desc: 'Le bleu et l\'or des faïences de Séville.', swatches: ['#0c1623', '#1b2c3f', '#f0c04d', '#5cc2e6'] },
    { id: 'theme-tablao', group: 'theme', price: 350, theme: 'tablao', title: 'Tablao', desc: 'Noir et rouge, comme une scène de flamenco à minuit.', swatches: ['#0e0a0b', '#261b1e', '#ef4d3c', '#e9b949'] },
    { id: 'paper-parchemin', group: 'paper', price: 0, paper: 'parchemin', title: 'Parchemin', desc: 'Le papier chaud d\'origine.', swatches: ['#f6ecd8', '#2b1d11', '#a95c0c'] },
    { id: 'paper-ivoire', group: 'paper', price: 80, paper: 'ivoire', title: 'Ivoire', desc: 'Une feuille de partition nette et blanche.', swatches: ['#fdfbf5', '#18181a', '#1b6fb2'] },
    { id: 'paper-ardoise', group: 'paper', price: 120, paper: 'ardoise', title: 'Ardoise', desc: 'Des tablatures sombres, reposantes le soir.', swatches: ['#20262b', '#edf1f2', '#f0c04d'] },
    { id: 'paper-nuit', group: 'paper', price: 160, paper: 'nuit', title: 'Nuit d\'Andalousie', desc: 'Encre claire sur un fond violet nuit.', swatches: ['#120e1b', '#f0e9ff', '#ff9f5a'] },
  ];
})();
