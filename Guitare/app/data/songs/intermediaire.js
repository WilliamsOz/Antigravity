/* Morceaux de niveau intermédiaire. Pièces complètes du domaine public ; notes issues des tablatures de classtab.org,
   rythme relu mesure par mesure (voir le champ source). */
GS.data.songs.push({
  id: 'romance',
  title: 'Romance anonyme (Jeux interdits)',
  composer: 'Anonyme',
  level: 'intermediaire',
  genre: 'espagnol',
  key: 'Mi mineur / Mi majeur',
  time: '3/4',
  tempo: 72,
  pima: true,
  techniques: ['arpège p-i-m', 'barrés V, VII, IX', 'mélodie à l\'annulaire'],
  chords: ['Em', 'Am', 'B7', 'E', 'A'],
  desc: 'La pièce que tout le monde veut jouer : une mélodie à l\'annulaire sur un arpège de triolets, en mineur puis en majeur. Elle t\'apprend à faire chanter une voix pendant que les barrés s\'enchaînent.',
  tips: ['Fais sonner la première note de chaque groupe de trois un peu plus fort : c\'est elle, la mélodie.', 'Prépare chaque barré pendant le dernier triolet de la mesure d\'avant, et ne serre que le temps nécessaire.', 'Garde le pouce et la basse tenus toute la mesure : ne relâche pas la main gauche entre les triolets.'],
  source: 'Transcription : classtab.org — Gianpiero Ciammaricone',
  sourceUrl: 'https://www.classtab.org/anon_romance_de_amor.txt',
  sections: [
    { name: 'Mi mineur', repeat: 2, bars: `
      t [Em] 6.0+1.7 2.0 3.0 1.7 2.0 3.0 1.7 2.0 3.0 | t 6.0+1.7 2.0 3.0 1.5 2.0 3.0 1.3 2.0 3.0 | t 6.0+1.3 2.0 3.0 1.2 2.0 3.0 1.0 2.0 3.0 | t 6.0+1.0 2.0 3.0 1.3 2.0 3.0 1.7 2.0 3.0 |
      t 6.0+1.12 2.0 3.0 1.12 2.0 3.0 1.12 2.0 3.0 | t 6.0+1.12 2.0 3.0 1.10 2.0 3.0 1.8 2.0 3.0 | t [Am] {CV} 5.0+1.8 2.5 3.5 1.7 2.5 3.5 1.5 2.5 3.5 | t 5.0+1.5 2.5 3.5 1.7 2.5 3.5 1.8 2.5 3.5 |
      t [B7] {CVII} 6.7+1.7 2.7 3.8 1.8 2.7 3.8 1.7 2.7 3.8 | t 6.7+1.11 2.7 3.8 1.8 2.7 3.8 1.7 2.7 3.8 | t [Em] 6.0+1.7 2.0 3.0 1.5 2.0 3.0 1.3 2.0 3.0 | t 6.0+1.3 2.0 3.0 1.2 2.0 3.0 1.0 2.0 3.0 |
      t [B7] 5.2+1.2 2.0 3.2 1.2 2.0 3.2 1.2 2.0 3.2 | t 5.2+1.2 2.0 3.2 1.3 2.0 3.2 1.2 2.0 3.2 | t [Em] 4.2+1.0 2.0 3.0 5.2+1.0 2.0 3.0 6.3+1.0 2.0 3.0 | h. 6.0+5.2+4.2+3.0+2.0+1.0 |
    ` },
    { name: 'Mi majeur', repeat: 2, note: 'Ralentis sur les trois dernières mesures à la reprise.', bars: `
      t [E] 6.0+1.4 2.0 3.1 1.4 2.0 3.1 1.4 2.0 3.1 | t 6.0+1.4 2.0 3.1 1.2 2.0 3.1 1.0 2.0 3.1 | t [B7] {CII} 5.0+2.5 3.2 4.4 2.4 3.2 4.4 2.4 3.2 4.4 | t 5.0+2.4 3.2 4.4 2.3 3.2 4.4 2.4 3.2 4.4 |
      t {CVII} 6.7+1.9 2.7 3.8 1.9 2.7 3.8 1.9 2.7 3.8 | t 6.7+1.9 2.7 3.8 1.11 2.7 3.8 1.9 2.7 3.8 | t [E] {CIX} 6.0+1.9 2.9 3.9 1.7 2.9 3.9 1.7 2.9 3.9 | t 6.0+1.7 2.9 3.9 1.9 2.9 3.9 1.11 2.9 3.9 |
      t 6.0+1.12 2.9 3.9 1.12 2.9 3.9 1.12 2.9 3.9 | t 6.0+1.12 2.9 3.9 1.11 2.9 3.9 1.10 2.9 3.9 | t [A] {CV} 5.0+1.9 2.5 3.6 1.9 2.5 3.6 1.9 2.5 3.6 | t 5.0+1.9 2.5 3.6 1.7 2.5 3.6 1.5 2.5 3.6 |
      t [E] 6.0+1.4 2.0 3.1 1.4 2.0 3.1 1.4 2.0 3.1 | t [B7] 5.2+1.4 2.0 3.1 1.5 2.4 3.2 1.2 2.4 3.2 | t [E] 4.2+1.0 2.0 3.1 5.2+1.0 2.0 3.1 6.4+1.0 2.0 3.1 | h. 6.0+5.2+4.2+3.1+2.0+1.0 |
    ` },
  ],
});

GS.data.songs.push({
  id: 'malaguena',
  title: 'Malagueña',
  composer: 'Traditionnel',
  level: 'intermediaire',
  genre: 'flamenco',
  key: 'Mi phrygien',
  time: '3/4',
  tempo: 104,
  pima: true,
  techniques: ['rasgueado', 'mélodie au pouce', 'arpège p-i-m-a'],
  chords: ['Am', 'G', 'F', 'E'],
  desc: 'L\'air andalou par excellence : une cadence La mineur, Sol, Fa, Mi et une falseta jouée au pouce sous deux cordes à vide. Ton premier vrai contact avec le mode phrygien.',
  tips: ['Dans la falseta, le pouce chante seul : i et m se contentent d\'effleurer les cordes à vide.', 'Accentue le premier temps de chaque mesure dans le compás, c\'est lui qui donne le balancement.', 'Laisse sonner les dissonances de Fa contre les cordes à vide : c\'est la couleur du flamenco, pas une faute.'],
  source: 'Traditionnel — arrangement écrit pour GuitarStudio d\'après le modèle populaire',
  form: [0, 1, 1, 2, 1, 0],
  sections: [
    { name: 'Compás', bars: `
      q [Am] @Am:D e @Am:D @Am:U q @Am:D | q [G] @G:D e @G:D @G:U q @G:D | q [F] @F:D e @F:D @F:U q @F:D | q [E] @E:D e @E:D @E:U q @E:D |
      q [F] @F:D e @F:D @F:U q @F:D | h. [E] @E:D |
    ` },
    { name: 'Falseta au pouce', bars: `
      e [E] 6.0 2.0+1.0 6.1 2.0+1.0 6.3 2.0+1.0 | e 5.0 2.0+1.0 5.2 2.0+1.0 5.3 2.0+1.0 | e 4.0 2.0+1.0 5.3 2.0+1.0 5.2 2.0+1.0 | e 5.0 2.0+1.0 6.3 2.0+1.0 6.1 2.0+1.0 |
      e 6.0 2.0+1.0 6.1 2.0+1.0 6.3 2.0+1.0 | e 5.0 2.0+1.0 5.2 2.0+1.0 5.3 2.0+1.0 | e 5.2 2.0+1.0 5.0 2.0+1.0 6.3 2.0+1.0 | q [F] 6.1+4.3+3.2+2.1+1.1 h [E] 6.0+5.2+4.2+3.1+2.0+1.0 |
    ` },
    { name: 'Copla arpégée', bars: `
      e [Am] 5.0 3.2 2.1 1.0 2.1 3.2 | e [G] 6.3 3.0 2.0 1.3 2.0 3.0 | e [F] 4.3 3.2 2.1 1.1 2.1 3.2 | e [E] 6.0 3.1 2.0 1.0 2.0 3.1 |
      e [Am] 5.0 3.2 2.1 1.0 1.1 1.0 | e [G] 6.3 3.0 2.0 1.3 2.0 3.0 | e [F] 4.3 3.2 2.1 1.1 1.3 1.1 | e [E] 6.0 3.1 2.0 1.0 2.0 3.1 |
    ` },
  ],
});

GS.data.songs.push({
  id: 'greensleeves',
  title: 'Greensleeves',
  composer: 'Traditionnel anglais, arr. S. Pasero',
  level: 'intermediaire',
  genre: 'renaissance',
  key: 'La mineur',
  time: '6/8',
  tempo: 80,
  pima: true,
  techniques: ['6/8', 'arpège en doubles', 'ornement lié'],
  chords: ['Am', 'G', 'C', 'Em', 'E'],
  desc: 'La vieille ballade anglaise, d\'abord en accords puis arpégée. Elle t\'apprend à garder la mélodie au-dessus d\'un accompagnement qui bouge.',
  tips: ['Compte à deux grands temps : chaque mesure de 6/8 se balance, elle ne se martèle pas.', 'Détache la note de mélodie du haut de chaque groupe d\'arpège en appuyant un peu plus l\'annulaire.', 'Travaille seul l\'ornement Si-Do-Si avant de l\'intégrer : il doit rester léger.'],
  source: 'Transcription : classtab.org — Miguel Careaga, d\'après Stephen Pasero',
  sourceUrl: 'https://www.classtab.org/anon_greensleeves.txt',
  sections: [
    { name: 'Introduction', bars: `
      !p e 3.2 | q [Am] 5.0+3.2+2.1 e [G] 5.2+3.0+2.3 e. [C] 5.3+2.1+1.0 s 1.2 e 1.0 | e [G] 6.3+3.0+2.3 4.0 2.0 e. [Em] 6.3+4.0+3.0 s 3.2 e 3.4 | q [Am] 5.0+3.2+2.1 e 3.2 e. 5.0+4.2+3.2 s 3.1 e 3.2 |
      q [E] 6.0+3.1+2.0 e 3.1 q 4.2 e 6.0+3.1+2.0 | q [Am] 5.0+3.2+2.1 e [G] 5.2+3.0+2.3 e. [C] 5.3+2.1+1.0 s 1.2 e 1.0 | e [G] 6.3+3.0+2.3 4.0 2.0 e. [Em] 6.3+4.0+3.0 s 3.2 e 3.4 | e [Am] 5.0+3.2+2.1 z 2.0 2.1h 2.0p e 3.2 [E] 5.2+4.0+3.1 4.4 3.1 |
      !p q. [Am] 5.0+4.2+3.2 q r |
    ` },
    { name: 'Thème arpégé', bars: `
      !p e 3.2 | s [Am] 5.0+2.1 3.2 4.2 [G] 5.2+2.3 3.0 4.0 [C] 5.3+1.0 2.1 3.0 1.2 e 1.0 | s [G] 6.3+2.3 3.0 4.0 2.0 3.0 4.0 e. [Em] 6.3+4.0+3.0 s 3.2 e 3.4 | s [Am] 5.0+2.1 3.2 4.2 3.2 4.2 5.0 e. 5.0+4.2+3.2 s 3.1 e 3.2 |
      q [E] 6.0+3.1+2.0 e 3.1 q 4.2 e 6.0+3.1+2.0 | s [Am] 5.0+2.1 3.2 4.2 [G] 5.2+2.3 3.0 4.0 [C] 5.3+1.0 2.1 3.0 1.2 e 1.0 | s [G] 6.3+2.3 3.0 4.0 2.0 3.0 4.0 e. [Em] 6.3+3.0 s 3.2 e 3.4 | e [Am] 5.0+3.2+2.1 z 2.0 2.1h 2.0p e 3.2 [E] 6.0+4.0+3.1 4.4 s 3.1 [Am] 5.0+4.2+3.2 |
    ` },
    { name: 'Refrain arpégé', bars: `
      s [C] 5.3+1.3 3.0 2.1 1.3 2.1 3.0 e. 5.3+1.3 s 1.2 e 1.0 | s [G] 6.3+2.3 4.0 3.0 2.0 3.0 4.0 e. [Em] 6.3+3.0 s 3.2 e 3.4 | s [Am] 5.0+2.1 3.2 4.2 3.2 4.2 5.0 e. 5.0+3.2 s 3.1 e 3.2 | q [E] 6.0+3.1+2.0 e 3.1 q. 4.2 |
      s [C] 5.3+1.3 3.0 2.1 1.3 2.1 3.0 e. 5.3+1.3 s 1.2 e 1.0 | s [G] 6.3+2.3 4.0 3.0 2.0 3.0 4.0 e. [Em] 6.3+3.0 s 3.2 e 3.4 | e [Am] 5.0+3.2+2.1 z 2.0 2.1h 2.0p e 3.2 [E] 6.0+4.0+3.1 4.4 3.1 | h. [Am] 5.0+4.2+3.2 |
    ` },
  ],
});

GS.data.songs.push({
  id: 'fur-elise',
  title: 'Für Elise (thème A)',
  composer: 'L. van Beethoven',
  level: 'intermediaire',
  genre: 'classique',
  key: 'La mineur',
  time: '3/8',
  tempo: 58,
  pima: true,
  techniques: ['position V', 'arpège basse-aigu', 'harmoniques'],
  chords: ['Am', 'E', 'C', 'G'],
  desc: 'Le thème célèbre avec son pont, joué dans la vraie tessiture du piano grâce à la position V. Un beau travail de démanché et de liaison entre basse et mélodie.',
  tips: ['Commence chaque arpège ascendant dès la basse : le mouvement ne doit jamais s\'arrêter entre deux mesures.', 'Le balancement Mi-Ré♯ se joue à l\'annulaire et au majeur, sans bouger le poignet.', 'Pose le barré en V avant la mesure, pas pendant : ton démanché sera silencieux.'],
  source: 'Transcription : classtab.org — David Atkinson',
  sourceUrl: 'https://www.classtab.org/beethoven_woo059_bagatelle_no25_in_am_fur_elise.txt',
  form: [0, 1, 0, 2, 3, 4, 2, 3, 4, 5],
  sections: [
    { name: 'Thème', bars: `
      !p s 1.12 1.11 | s 1.12 1.11 1.12 1.7 1.10 1.8 | s {CV} [Am] 6.5+1.5 5.7 4.7 3.5 2.5 1.5 | s [E] 6.0+1.7 5.7 4.6 1.0 1.4 1.7 |
      s [Am] 6.5+1.8 5.7 4.7 1.0 1.12 1.11 | s 1.12 1.11 1.12 1.7 1.10 1.8 | s {CV} [Am] 6.5+1.5 5.7 4.7 3.5 2.5 1.5 | s [E] 6.0+1.7 5.7 4.6 2.5 1.8 1.7 |
    ` },
    { name: '1re fin', note: 'Le silence laisse la place aux deux notes de levée de la reprise.', bars: `
      !p s [Am] 6.5+1.5 5.7 4.7 r |
    ` },
    { name: '2e fin', bars: `
      s [Am] 5.0+1.5 4.2 3.2 1.7 1.8 1.10 |
    ` },
    { name: 'Pont', bars: `
      s [C] 6.8+1.12 5.10 4.10 2.8 1.13 1.12 | s [G] 5.10+1.10 3.0 2.0 3.10 1.12 1.10 | s {CV} [Am] 6.5+1.8 5.7 4.7 2.5 1.10 1.8 | s [E] 6.0+1.7 5.7 3.9 3.9 1.12 3.9 |
      s 1.12 1.12* 1.5* 1.11 1.12 1.11 | s 1.12 1.11 1.12 1.11 1.12 1.11 |
    ` },
    { name: 'Retour du thème', bars: `
      s 1.12 1.11 1.12 1.7 1.10 1.8 | s {CV} [Am] 6.5+1.5 5.7 4.7 3.5 2.5 1.5 | s [E] 6.0+1.7 5.7 4.6 1.0 2.9 1.7 | s [Am] 6.5+1.8 5.7 4.7 1.0 1.12 1.11 |
      s 1.12 1.11 1.12 1.7 1.10 1.8 | s {CV} [Am] 6.5+1.5 5.7 4.7 3.5 2.5 1.5 | s [E] 6.0+1.7 5.7 4.6 2.5 1.8 1.7 |
    ` },
    { name: 'Fin', bars: `
      s [Am] 6.5+1.5 5.7 4.7 e. r |
    ` },
  ],
});

GS.data.songs.push({
  id: 'menuet-sol',
  title: 'Menuet en sol',
  composer: 'C. Petzold',
  level: 'intermediaire',
  genre: 'baroque',
  key: 'Sol majeur',
  time: '3/4',
  tempo: 104,
  pima: false,
  techniques: ['contrepoint à deux voix', 'position I', 'liés'],
  chords: ['G', 'C', 'D', 'Am'],
  desc: 'Le menuet du Petit Livre d\'Anna Magdalena Bach, à deux voix bien distinctes. Idéal pour faire entendre une basse indépendante sous la mélodie.',
  tips: ['Joue d\'abord la basse seule au pouce, puis la mélodie seule : chacune doit tenir debout toute seule.', 'Marque légèrement le premier temps : c\'est une danse à trois temps.', 'Détache les croches sans sec : doigts courbés et ongle bien placé.'],
  source: 'Transcription : classtab.org — Richard Darsie',
  sourceUrl: 'https://www.classtab.org/petzold_anh114_minuet_in_g.txt',
  sections: [
    { name: 'Partie I', repeat: 2, bars: `
      q 6.3+2.3 e 3.0 3.2 5.0+2.0 2.1 | q 5.2+2.3 3.0 3.0 | q 5.3+1.0 e 2.1 2.3 1.0 1.2 | q 5.2+1.3 3.0 3.0 |
      q 5.0+2.1 e 2.3 2.1 2.0 3.2 | q 6.3+2.0 e 2.1 2.0 3.2 3.0 | q 5.5+4.4 e 5.2+3.0 3.2 6.3+2.0 3.0 | e 4.0+3.4 3.2p 4.0 5.3 5.2 5.0 |
      q 5.2+2.3 e 3.0 3.2 5.0+2.0 2.1 | q 6.3+2.3 5.2+3.0 6.3+3.0 | q 5.3+1.0 e 2.1 2.3 1.0 1.2 | q 5.2+1.3 e 5.3+3.0 5.2 5.0+3.0 6.3 |
      q 5.0+2.1 e 2.3 2.1 6.2+2.0 3.2 | q 6.3+2.0 e 2.1 2.0 5.2+3.2 3.0 | q 5.3+3.2 e 4.0+2.0 3.2 5.5+3.0 4.4 | h 6.3+2.0 q 6.3 |
    ` },
    { name: 'Partie II', repeat: 2, bars: `
      q 3.0+1.7 e 1.3 1.5 1.7 1.3 | q 4.4+1.5 e 2.3 2.5 1.2 2.3 | q 4.2+1.3 e 3.0+1.0 1.2 4.2+1.3 2.3 | q 3.2+2.2 e 2.0 2.2h q 3.2 |
      e 5.0+3.2 2.0 2.2 2.3 1.0 1.2 | q 5.2+1.3 4.0+1.2 5.4+1.0 | q 4.0+1.2 6.2+3.2 5.0+2.2 | q 4.0+2.3 4.0 5.3 |
      q 5.2+2.3 e 4.0+3.0 4.4 q 5.2+3.0 | q 5.3+1.0 e 4.2+3.0 4.4 q 5.3+3.0 | q 5.2+2.3 5.0+2.1 6.3+2.0 | e 5.5+3.2 3.0 4.4 3.0 q 3.2 |
      e 5.5+4.0 4.2h 4.4 3.0 3.2h 2.0 | q 4.2+2.1 3.0+2.0 4.4+3.2 | e 3.0+2.0 2.3 q 5.2+3.0 5.5+4.4 | q 6.3+3.0 4.0 6.3 |
    ` },
  ],
});

GS.data.songs.push({
  id: 'lagrima',
  title: 'Lágrima',
  composer: 'F. Tárrega',
  level: 'intermediaire',
  genre: 'espagnol',
  key: 'Mi majeur / Mi mineur',
  time: '3/4',
  tempo: 66,
  pima: true,
  techniques: ['mélodie et basse', 'position IX', 'glissé et liés'],
  chords: ['E', 'B7', 'Em', 'Am'],
  desc: 'Une larme en seize mesures : la petite pièce la plus jouée de Tárrega. Une leçon de son et de phrasé, où chaque note compte.',
  tips: ['Laisse respirer la fin de chaque phrase, sans raideur métronomique : c\'est une pièce qui chante.', 'Fais le glissé de la mesure 9 sans précipiter : Sol, glissé vers Do, retombée sur Si.', 'Dans la partie en mineur, écoute bien les tierces descendantes de la mesure 10 : elles doivent rester liées.'],
  source: 'Transcription : classtab.org — Vincenzo della Vecchia',
  sourceUrl: 'https://www.classtab.org/tarrega_lagrima.txt',
  video: 'https://www.youtube.com/watch?v=DwME8Xp9WxA',
  form: [0, 0, 1, 1, 0],
  sections: [
    { name: 'Partie A (mi majeur)', bars: `
      e [E] 4.2+1.4 2.0 4.4+1.5 2.0 4.6+1.7 2.0 | e [B7] 4.1+1.2 2.0 3.2 2.0 5.2 2.0 | e [E] 4.2+1.4 2.0 4.4+1.5 2.0 4.6+1.7 2.0 | e [B7] 4.1+1.2 2.0 3.2 2.0 5.2 2.0 |
      e {CIX} 4.11+1.12 3.9 4.9+1.11 3.9 {CVII} 4.7+1.9 2.7 | e [E] 4.9+1.7 2.9 4.11 1.0 3.11 2.10 | e 4.9+2.9 1.0 {CII} 3.3+2.2 1.2 [B7] 5.2 3.2+2.4 | q [E] 4.2+3.1+1.0 h 6.0 |
    ` },
    { name: 'Partie B (mi mineur)', bars: `
      e [Em] 6.0+2.0+1.3 1.8/ 1.7p 1.0 {CII} [B7] 5.2+3.2+2.4+1.2 1.3 | e [Em] 6.0+1.0 4.7+3.5 4.5+3.4 4.4+3.2 4.2+3.0 4.4+3.2 | e 6.0+3.0+2.0 1.12 4.7 1.8 5.9 2.10 | e {CVII} [B7] 6.7+3.8+2.7 4.9 4.10h 4.9p 2.0 1.2 |
      e [Em] 4.2+1.3 2.0 4.4+1.5 2.0 4.5+1.7 2.0 | e [Am] 5.0+1.10 1.8p 1.7 2.10 2.8 2.7 | e [Em] 6.0+1.0 3.0+2.0 [Am] 5.0+1.2 3.2+2.1 [B7] 5.2+2.0 4.1+3.2 | q [Em] 4.2+3.0+1.0 h 6.0 |
    ` },
  ],
});

GS.data.songs.push({
  id: 'adelita',
  title: 'Adelita',
  composer: 'F. Tárrega',
  level: 'intermediaire',
  genre: 'espagnol',
  key: 'Mi mineur / Mi majeur',
  time: '3/4',
  tempo: 80,
  pima: false,
  techniques: ['mazurka', 'liés et ornements', 'barrés'],
  chords: ['Em', 'D7', 'B7', 'E', 'A'],
  desc: 'Une mazurka de salon pleine de charme, avec ses petits ornements si caractéristiques. Elle t\'apprend à jouer des liés élégants sans casser le tempo.',
  tips: ['Le deuxième temps de la mazurka mérite une légère insistance : laisse-le danser.', 'Les ornements (Fa♯-Sol-Fa♯, Ré♯-Mi-Ré♯) restent légers et sur le temps : isole-les d\'abord au ralenti.', 'Attention au saut vers la position IX dans la partie majeure : regarde la case d\'arrivée avant de bouger.'],
  source: 'Transcription : classtab.org — Carlos Cordero (rythme vérifié avec la version d\'Allen Trotter)',
  sourceUrl: 'https://www.classtab.org/tarrega_adelita.txt',
  video: 'https://www.youtube.com/watch?v=LOCQmO2f_-Y',
  form: [0, 0, 1, 1, 0],
  sections: [
    { name: 'Partie A (mi mineur)', bars: `
      e [Em] 6.0+1.12 1.11p q 1.7 3.9+2.8 | e [D7] 5.0+1.10 1.8p q 2.7 4.10+3.9 | e {CVII} [B7] 6.7+1.8 1.7p q 3.8 6.7+4.7+3.8+2.8 | x [Em] 6.0+2.7 2.8h s 2.7p e 3.9 2.0 1.0 2.8 1.7 |
      e [Em] 6.0+1.12 1.11p q 1.7 3.9+2.8 | e [D7] 5.0+1.10 1.8p q 2.7 4.10+3.9 | e {CVII} [B7] 6.7+1.8 1.7p q 3.8 6.7+4.7+3.8+2.8 | h [Em] 4.5+3.4+2.5 q 6.0 |
    ` },
    { name: 'Partie B (mi majeur)', bars: `
      q {CIV} [E] 6.0+1.4 e 4.6+3.4+2.5 1.7 [A] 5.0+3.6+2.5 2.7 | q [E] 6.0+1.4 e 4.6+3.4+2.5 1.7 [A] 5.0+3.6+2.5 2.7 | e [E] 6.0+3.4+2.5+1.4 1.7 1.12 1.11 x {CIX} 5.9+3.9+1.11 1.12h s 1.11p e 1.9 | x {CVII} [B7] 6.7+4.7+3.8+1.9 1.11h s 1.9p e 1.7 2.10 2.7p 3.8 4.9 |
      q [E] 6.0+4.6 e 2.0+1.0 2.0 [A] 5.0+4.2+2.2+1.0 4.4 | e [E] 6.0+3.1 3.4 1.4 2.4 s 6.8+4.8+3.9 3.11h 3.9p 4.8 | e. {CII} [B7] 6.7+4.9 s 4.7+3.6 q 4.6+3.4 5.2+4.4+3.2+2.4 | h [E] 4.2+3.1+2.0+1.0 q 6.0 |
    ` },
  ],
});

GS.data.songs.push({
  id: 'canon-re',
  title: 'Canon de Pachelbel',
  composer: 'J. Pachelbel, arr. C. Noda',
  level: 'intermediaire',
  genre: 'baroque',
  key: 'Ré majeur',
  time: '4/4',
  tempo: 60,
  tuning: { 6: 38 },
  pima: true,
  techniques: ['6e en Ré', 'basse obstinée', 'gammes en doubles'],
  chords: ['D', 'A', 'Bm', 'F#m', 'G'],
  desc: 'Le fameux canon arrangé pour une seule guitare, sur sa basse de huit notes qui revient sans cesse. La difficulté monte peu à peu, des accords arpégés aux gammes rapides.',
  tips: ['Accorde bien ta 6e corde en Ré avant de commencer, puis vérifie-la à l\'octave de la 4e.', 'Mémorise la suite D-A-Bm-F#m-G-D-G-A : tout le morceau repose dessus.', 'Dans les doubles croches, alterne i et m sans jamais perdre la basse, même si tu dois réduire le tempo.'],
  source: 'Transcription : classtab.org — David Atkinson, d\'après Chief Noda',
  sourceUrl: 'https://www.classtab.org/pachelbel_p37_canon_and_gigue_in_d_1_canon.txt',
  sections: [
    { name: 'Basse et accords', bars: `
      e [D] 4.0 3.2 2.3 1.2 [A] 5.0 4.2 3.2 2.2 | e [Bm] 5.2 4.4 3.4 2.3 [F#m] 6.4 4.4 3.2 2.2 | e [G] 6.5 4.0 3.0 2.0 [D] 6.0 4.4 3.2 2.3 | e [G] 6.5 4.5 3.4 2.3 [A] 5.0 4.2 3.2 2.2 |
      e [D] 6.0+1.2 4.0 3.2 2.3 [A] 5.0+1.0 3.2 2.2 4.2 | e [Bm] 5.2+2.3 4.4 3.4 4.4 [F#m] 6.4+2.2 4.4 3.2 4.4 | e [G] 6.5+2.0 4.0 3.0 4.0 [D] 6.0+3.2 5.5 4.4 5.5 | e [G] 6.5+2.0 4.0 3.0 2.0 [A] 5.0+2.2 4.2 3.2 2.2 |
      e [D] 6.0+2.3+1.2 3.2 2.3 4.0 [A] 5.0+2.2+1.0 3.2 2.2 4.2 | e [Bm] 5.2+3.4+2.3 4.4 3.4 5.2 [F#m] 6.4+3.2+2.2 4.4 3.2 4.4 | e [G] 6.5+3.0+2.0 4.0 3.0 4.0 [D] 6.0+4.4+3.2 5.5 4.4 5.5 | e [G] 6.5+3.0+2.0 4.0 3.0 2.0 [A] 5.0+3.2+2.2 4.2 3.2 2.2 |
      e [D] 4.0+2.3 3.2 2.3+1.2 3.2 [A] 5.0+1.5 4.2 3.2+1.3 2.2 | e [Bm] 5.2+1.2 4.4 3.4+2.3 4.4 [F#m] 6.4+1.2 4.4 q 3.2+2.5 | e [G] 6.5+2.3 4.0 3.0+2.0 4.0 [D] 6.0+2.3 4.4 5.5+3.2 4.4 | e [G] 6.5+2.3 4.5 6.5+3.4 4.5 [A] 5.0+2.3 4.2 3.2+2.2 4.2 |
    ` },
    { name: 'Voix en croches', bars: `
      e [D] 6.0+2.3 2.2 2.3 4.0 [A] 5.0 3.2 4.2 4.4 | e [Bm] 5.2+4.0 2.3 2.2 2.0 [F#m] 6.4+3.6 2.7 1.5 1.7 | e [G] 6.5+2.8 2.7 2.5 2.8 [D] 6.0+2.7 1.0 2.3 2.2 | e [G] 6.5+2.0 3.2 3.0 4.4 [A] 5.0+4.2 3.0 4.4 4.2 |
      e [D] 6.0+4.0 4.2 4.4 3.0 [A] 5.0+3.2 4.2 3.2 3.0 | e [Bm] 5.2+4.4 3.4 3.2 4.5 [F#m] 6.4+3.2 4.5 4.4 4.2 | e [G] 6.5+3.0 4.4 4.2 3.0 [D] 6.0+4.4 4.2 4.0 4.4 | e [G] 6.5+3.0 4.4 4.2 2.0 [A] 5.0+3.2 3.4 3.2 3.0 |
      e [D] 6.0 4.0 3.2+1.2 2.3 [A] 5.0+2.2+1.0 3.2 2.2 3.0 | e [Bm] 5.2+2.3 4.4 3.4 4.4 [F#m] 6.4+1.2 4.4 3.2 4.2 | e [G] 6.5+1.7 4.0 2.0 3.0 [D] 6.0+1.5 4.0 2.7 2.5 | e [G] 6.5+1.7 4.0 2.0 3.0 [A] 5.0+1.5 2.5 3.6 4.7 |
    ` },
    { name: 'Doubles croches', bars: `
      e [D] 6.0+1.5 s 1.2 1.3 e 1.5 s 1.2 1.3 [A] 5.0+1.5 3.2 2.0 2.2 2.3 1.0 1.2 1.3 | e [Bm] 5.2+1.2 s 2.3 2.5 e 1.2 s 4.4 3.0 [F#m] 6.4+3.2 2.0 3.2 3.0 3.2 4.4 3.0 3.2 | e [G] 6.5+3.0 s 2.0 3.2 e 3.0 s 4.4 4.2 [D] 6.0+4.4 4.2 4.0 4.2 4.4 3.0 3.2 2.0 | e [G] 6.5+3.0 s 2.0 3.2 e 2.0 s 2.2 2.3 [A] 5.0+3.2 2.0 2.2 2.3 2.5 1.2 1.3 1.5 |
      e [D] 6.0+1.2 s 2.3 1.0 e 1.2 s 1.0 2.3 [A] 5.0+1.0 2.2 2.3 1.0 1.2 1.0 2.3 2.2 | e [Bm] 5.2+2.3 s 3.4 2.2 e 2.3 s 4.0 4.2 [F#m] 6.4+4.4 3.0 4.4 4.2 4.4 2.3 2.2 2.3 | e [G] 6.5+3.4 s 2.3 3.6 e 2.0 s 3.2 3.0 [D] 6.0+3.2 3.0 4.4 3.0 3.2 2.0 2.2 2.3 | e [G] 6.5+3.4 s 2.3 3.6 e 2.3 s 3.6 2.0 [A] 5.0+2.2 2.3 2.5 2.3 2.2 2.3 2.0 2.2 |
      e [D] 6.0+3.2+2.3+1.2 s 2.3 1.0 e 1.2 2.3 [A] 5.0+3.2+2.2+1.0 s 2.2 2.3 e 1.0 2.2 | e [Bm] 5.2+4.4+3.4+2.3 s 3.4 2.2 e 2.3 3.4 [F#m] 6.4+4.4+3.2+2.2 s 3.2 4.5 e 4.4 4.2 | e [G] 6.5+4.0+3.0+2.0 s 3.0 4.4 e 4.2 3.0 [D] 6.0+5.5+4.4+3.2 s 5.5 4.2 e 4.4 3.2 | e [G] 6.5+4.0+3.0+2.0 s 2.0 3.2 e 3.0 4.4 [A] 5.0+4.2 s 3.2 4.5 e 4.4 4.2 |
      e [D] 6.0+4.4 s 2.3 2.2 e 2.3 4.4 [A] 5.0+3.2 s 3.2 2.0 e 2.2 3.2 | e [Bm] 5.2+4.4 s 2.3 2.5 e 1.2 2.3 [F#m] 6.4+1.2 s 1.2 2.5 e 2.3 2.2 | e [G] 6.5+2.0 s 2.0 3.2 e 2.0 2.2 [D] 6.0+2.3 s 1.2 1.0 e 2.3 1.2 | e [G] 6.5+1.3 s 2.3 3.6 e 3.4 3.4 [A] 5.0+3.2 4.2 3.2 4.2+3.2+2.2 |
    ` },
    { name: 'Accords brisés', bars: `
      e [D] 6.0+3.2+2.3+1.2 4.0 3.2 1.2 [A] 5.0+4.2+3.2+2.2+1.2 1.3 1.2 2.5 | e [Bm] 5.2+4.4+3.4+2.3 4.4 3.4 2.3 [F#m] 6.4+3.2+2.3 2.5 2.3 2.2 | e [G] 6.5+4.0+3.0+2.0 3.0 2.0 1.0 [D] 6.0+2.3+1.2 3.2 2.3+1.0 3.2 | e [G] 6.5+4.0+3.0+2.3 3.5 3.4 3.5 [A] 5.0+4.2+3.2 4.2 3.2 2.2 |
      e [D] 6.0 4.0 3.7 2.7+1.5 [A] 5.0+2.7+1.5 2.8+1.7 2.7+1.5 2.5+1.3 | e [Bm] 5.2+3.4+2.3+1.2 4.4 3.4 2.3+1.2 [F#m] 6.4+2.3+1.2 2.5+1.3 2.3+1.2 2.2+1.0 | e [G] 6.5+2.3 3.5 3.4 3.5 [D] 6.0+3.2 4.4 3.2 4.0 | e [G] 6.5+4.0+3.0+2.3 3.5 3.4 3.5 [A] 5.0+3.2 4.2 3.2 2.2 |
    ` },
    { name: 'Sommet et conclusion', bars: `
      e [D] 6.0 3.7 s 2.7 e 2.10 e. 6.7+2.10 s [A] 1.7 e. 2.10 e 2.8 | e [Bm] 6.9+2.7 s 3.7 e. 1.10 e 2.7 e. [F#m] 5.9+2.10 e 2.7p 1.9 s 2.7 | e [G] 6.5+1.7 4.0 3.7 2.0 [D] 6.0+1.5 4.0 3.7 2.7 | e [G] 6.5+1.7 4.0 2.0 3.0 [A] 5.0+4.7+3.6+2.5+1.5 1.5 2.5 3.6 |
      e [D] 6.0+3.2+2.3+1.2 4.0 3.2 2.3 [A] 5.0 3.2 2.2 4.2 | e [Bm] 5.2+4.4+3.4+2.3 4.4 3.4 4.4 [F#m] 6.4 5.0 3.2+2.1 4.0 | e [G] 6.5+4.0+3.0+2.0 4.0 3.0 2.3 [D] 6.0+3.2 4.4 2.3 3.2 | e [G] 6.5+3.0+2.0+1.0 2.0 3.0 4.0 s [A] 5.0+4.2+3.2+2.3 2.2 2.3 2.2 2.3 2.2 e 2.3 |
      w [D] 6.0+5.0+4.4+3.2+2.3 |
    ` },
  ],
});

GS.data.songs.push({
  id: 'el-noi-de-la-mare',
  title: 'El Noi de la Mare',
  composer: 'Traditionnel catalan, arr. M. Llobet',
  level: 'intermediaire',
  genre: 'noel',
  key: 'Ré majeur',
  time: '6/8',
  tempo: 66,
  tuning: { 6: 38 },
  pima: false,
  techniques: ['6e en Ré', 'accords arpégés', 'timbres ponticello'],
  chords: ['D', 'G', 'A', 'Bm'],
  desc: 'Le Noël catalan harmonisé par Llobet, doux et plein de couleurs. On y apprend à soigner le timbre : ponticello, son naturel et notes tenues.',
  tips: ['Fais sonner la note du haut de chaque accord : le reste accompagne à mi-voix.', 'Change vraiment de son quand la partition passe en ponticello, puis reviens en naturale.', 'Prends ton temps sur les deux dernières mesures, l\'harmonique doit flotter avant l\'accord final.'],
  source: 'Transcription : classtab.org — tabeur inconnu, arrangement de Miguel Llobet',
  sourceUrl: 'https://www.classtab.org/anon_el_noi_de_la_mare.txt',
  video: 'https://youtu.be/hlg5gPti27M?t=13',
  sections: [
    { name: 'Thème', bars: `
      e 6.0+3.2+2.3+1.2 s 6.0 1.3 e 1.5 6.0+3.6+2.5+1.5 s 6.0 1.7 e 1.9 | e 6.0+4.9+2.7+1.10 s 6.0 1.9 e 1.7 6.0+3.6+2.5+1.7 6.0 1.5 | e 4.0+3.2+2.3+1.2 s 4.0 1.3 e 1.5 5.4+3.2+2.5+1.5 s 5.4 1.7 e 1.9 | e 6.9+3.7+2.7+1.10 s 5.7+3.7+2.9 1.9 e 1.7 q 5.0+3.7+2.5+1.5 e 3.6 |
      e 4.0+3.2+2.2+1.2 s 4.0 1.3 e 1.5 6.5+3.4+2.7+1.5 s 6.5 3.9+2.8 e 3.7+2.7 | e 5.0+3.0+2.3+1.0 s 5.0 2.3 e 1.0 5.1+2.3+1.2 5.1 2.3 | e 5.2+2.3+1.2 s 5.2 2.5+1.3 e 2.7+1.5 e. 6.2+3.0+2.0+1.5 s 6.4+2.5+1.3 e 6.5+3.7+2.7 | e 5.0+3.7+2.5 s 3.6 2.7 e 4.5+3.6+2.5 q 6.0+4.5+3.2+2.3 e 4.4 |
    ` },
    { name: 'Reprise du thème', bars: `
      e 6.0+3.2+2.3+1.2 s 6.0 1.3 e 1.5 6.0+3.6+2.5+1.5 s 6.0 1.7 e 1.9 | e 6.0+4.9+2.7+1.10 s 6.0 1.9 e 1.7 6.0+3.6+2.5+1.7 6.0 1.5 | e 4.0+3.2+2.3+1.2 s 4.0 1.3 e 1.5 5.4+3.2+2.5+1.5 s 5.4 1.7 e 1.9 | e 6.9+3.7+2.7+1.10 s 5.7+3.7+2.9 1.9 e 1.7 q 5.0+3.7+2.5+1.5 e 3.6 |
      e 4.0+3.2+2.2+1.2 s 4.0 1.3 e 1.5 6.5+3.4+2.7+1.5 s 6.5 3.9+2.8 e 3.7+2.7 | e 5.0+3.0+2.3+1.0 s 5.0 2.3 e 1.0 5.1+2.3+1.2 5.1 2.3 | e 5.2+2.3+1.2 s 5.2 2.5+1.3 e 2.7+1.5 e. 6.2+3.0+2.0+1.5 s 6.4+2.5+1.3 e 6.5+3.7+2.7 | e 5.0+3.7+2.5 s 3.6 2.7 e 4.5+3.6+2.5 q 6.0+4.5+3.2+2.3 e 4.4 |
    ` },
    { name: 'Développement', bars: `
      e 6.0+4.9+2.7+1.10 s 6.0 1.9 e 1.7 6.0+3.6+2.7+1.5 s 6.0 1.3 e 1.2 | e 6.0+3.4+2.3+1.0 s 6.0 2.3 e 3.0+2.2+1.0 q 6.0+3.2+2.3+1.2 e 2.3 | e 6.9+3.7+2.7+1.10 s 6.9 1.9 e 1.7 6.4+3.2+2.2+1.5 s 6.4 1.3 e 1.2 | e 6.5+3.0+2.0+1.0 s 5.0+3.0+2.2 1.2 e 1.0 q. 6.0+4.4+3.2+2.3 |
      e 4.0+3.2+2.2+1.2 s 4.0 1.3 e 1.5 6.5+3.4+2.7+1.5 s 6.5 3.9+2.8 e 3.7+2.7 | e 5.0+3.0+2.3+1.0 s 5.0 2.3 e 1.0 5.1+2.3+1.2 5.1 2.3 | e 5.2+2.3+1.2 s 5.2 2.5+1.3 e 2.7+1.5 e. 6.2+3.0+2.0+1.5 s 6.4+2.5+1.3 e 6.5+3.7+2.7 | e 5.0+3.7+2.5 s 3.6 2.7 e 4.5+3.6+2.5 q 6.0+4.5+3.2+2.3 e 4.4 |
    ` },
    { name: 'Conclusion', bars: `
      e 6.9+3.7+2.7+1.10 s 6.9 1.9 e 1.7 6.4+3.2+2.2+1.5 s 6.4 1.3 e 1.2 | e 6.5+3.0+2.0+1.0 s 5.0 2.2 e 3.0+2.2+1.0 6.0+3.2+2.3+1.2 4.0 3.5+2.3 | e 6.5+3.0+2.0+1.10 s 6.5 1.9 e 1.7 6.4+3.4+2.4+1.5 s 6.4 1.3 e 5.2+3.2+2.4+1.2 | e 4.2+3.0+2.0+1.0 s 5.0+2.1 1.3 e 3.0+2.2+1.0 q 6.0+4.4+3.2+2.3 e 5.12 |
      e. 4.7 s 3.1+2.1+1.1 e 5.0+3.0+2.2+1.0 q 6.0+4.4+3.2+2.3 e 4.7 | s 1.5 e. 1.12* q 5.7+4.6+3.7+2.7 5.0+4.5+3.6+2.5 | q. [D] 6.0+5.0+4.4+3.2+2.3 6.0+5.0+4.0+3.7+2.7+1.10 |
    ` },
  ],
});

GS.data.songs.push({
  id: 'el-vito',
  title: 'El Vito',
  composer: 'Traditionnel espagnol',
  level: 'intermediaire',
  genre: 'espagnol',
  key: 'Mi phrygien',
  time: '3/4',
  tempo: 112,
  pima: false,
  techniques: ['butés', 'liés', 'gammes phrygiennes'],
  chords: ['E', 'Am', 'F', 'G'],
  desc: 'La danse populaire andalouse dans toute sa fierté : un thème grave en butés, qui s\'emballe en variations de plus en plus vives.',
  tips: ['Attaque les huit premières mesures en butés bien nets, pour poser le caractère.', 'Sens la pulsation à trois temps avec un accent sur le premier : c\'est une danse, pas une gamme.', 'Dans le passage aigu, repère les positions à l\'avance et monte d\'un seul geste, sans glisser les doigts.'],
  source: 'Transcription : classtab.org — tabeur non indiqué',
  sourceUrl: 'https://www.classtab.org/anon_el_vito.txt',
  sections: [
    { name: 'Thème à la basse', note: 'Buté, en pouce ou en i-m : le thème doit sonner comme une voix.', bars: `
      h 4.2 q 4.2 | h 4.2 q 4.0 | q 4.0 h 5.3 | q r q 5.2 5.3 |
      q 4.2 h 5.2 | q 5.3 h 5.0 | h 6.4 q 6.0 | q r q 5.2 5.2 |
      q 4.2+2.0 3.1 4.2+3.2 | q 4.2+2.0 2.3 4.0+2.1 | q 4.0+2.0 5.3 3.2 | q 3.1 5.2 5.3+3.2 |
      q 4.2+3.0+2.3 5.2 3.0+2.3 | q 5.3+2.1+1.1 5.0 2.1+1.1 | q [E] 6.4+1.0 2.0 e 6.0+3.1 2.0 | q 1.0 6.0 6.4 |
    ` },
    { name: 'Variation en croches', bars: `
      e 5.2 3.1 3.2 2.0 6.4 3.4 | e 3.5 1.0 5.0 2.1 6.2 3.1 | e 5.0 2.1 2.0 3.2 6.4+2.0 2.3 | e 1.0 2.0 5.0+2.1 3.2 5.2+3.1 2.3 |
      e 5.3+1.0 1.1 5.0+2.1 3.2 2.0 2.1 | e 5.2+2.3 1.3 6.3+2.0 3.0 3.2 2.0 | e 6.1+2.1 3.2 2.0 2.2 6.0+2.3 1.0 | e 2.1 2.3 6.0+2.0 2.1 6.4+1.0 2.0 |
      e 5.2+2.3 2.1 2.0 3.2 q 6.4+2.0 | e 2.1 2.0 5.0+2.3 2.1 5.2+1.0 2.3 | e 5.0+1.0 2.3 2.1 2.0 q 6.4+2.3 | e 1.0 2.3 5.0+2.1 2.0 5.2+3.2 3.1 |
      e 5.3+3.2 2.1 5.0+1.1 1.5 1.3 1.1 | e 5.2+3.0 2.3 6.3+1.3 1.1 1.0 2.3 | e 6.1+3.2 2.1 1.1 2.1 6.0+3.2 2.1 | e 1.0 2.0 q 1.0 1.0 |
    ` },
    { name: 'Passage aigu', bars: `
      e [E7] 6.0+1.12 1.10p 1.10 1.7 1.7 2.9 | q. 6.0+2.9 e 2.6 q 2.5 | t 5.0+1.8 1.10 1.8 e 1.7 1.5 2.8 2.6 | q. 5.0+1.0 e 2.3 q 2.1 |
      e 3.0+1.10 q 1.7 e 2.10 q 2.8 | q. [F] 5.8+1.8 e 2.10 q 3.10 | t 6.0+1.7 1.8h 1.7p e 2.10 2.9 3.10 3.9 | q. 3.7 e 4.10 q 4.9 |
      q 6.0 e 3.9 3.11 2.9 2.10 | e 2.12 2.9 2.10 2.12 1.8 1.10 | t 5.0+1.12 1.13h 1.12p e 1.10 1.8 2.12 2.10 | q. 1.8 e 2.12 q 2.10 |
      e [G] 1.7 5.10 4.9 3.7 q 2.8 | e [F] 1.5 5.8 4.7 3.5 q 2.6 | t 6.0+1.4 1.5 1.4 e 2.6 1.0 2.6 1.0 | t 2.3 2.5 2.3 e 3.5 2.0 3.5 2.0 |
    ` },
    { name: 'Deuxième variation', bars: `
      q 6.0+2.5 4.3 2.3 | q 2.1 4.2 2.0 | q 6.0+2.3 4.2 2.1 | q 2.0 4.2 3.2 |
      e 5.0+2.1 2.0p 3.2 2.1 q 1.0 | e [G] 2.3 6.3 5.2 4.0 3.0 2.0 | q [F] 2.1 e 6.1 5.3 4.3 3.2 | q 3.0 e 6.0 5.2 4.2 3.1 |
      e 6.0+1.0 1.1 1.0 4.3 2.0 1.0 | e 2.3 4.2 4.3h 3.1 2.0 2.1 | e 6.0+2.3 4.2 4.3h 3.1 q 2.1 | q 6.0+2.1 e 4.2 4.3h 3.1 2.0 |
      e 5.0+2.0 3.2 2.1 1.0 q 1.5 | e [G] 1.7 5.10 4.9 3.7 q 2.8 | e [Dm7] 1.5 5.5 4.7 3.5 q 2.6 | e [E] 6.0+1.0 4.2 3.1 2.0 q 1.0 |
      e 4.2+1.0 1.1h 1.0 2.0 4.2+2.3 3.1 | e 4.2+2.0 2.1h 2.0 3.1 4.0+3.2 2.0 | e 4.0+2.1 1.0 5.3+2.1 3.2 2.0 2.1 | e 3.2 1.0 5.2+2.3 3.0 5.3+3.2 4.2 |
      e 4.2+3.0 2.0 5.2+2.3 3.0 2.3 1.0 | e 5.3+3.2 2.1 5.0+1.1 3.2 2.1 1.1 | e 6.4+1.0 2.0 3.2 2.0 6.0+3.1 2.0 | q 4.2 5.2 5.2 |
    ` },
    { name: 'Retour et fin', bars: `
      q 4.2+2.0 3.1 4.2+3.2 | q 4.2+2.0 2.3 4.0+2.1 | q 4.0+2.0 5.3 3.2 | q 3.1 5.2 5.3+3.2 |
      q 4.2+3.0+2.3 5.2 3.0+2.3 | q 5.3+2.1+1.1 5.0 2.1+1.1 | q 6.4+1.0 2.0 e 6.0+3.1 3.0p | q 1.0 4.2 4.2 |
      q 4.2 e 3.1 3.2 q 4.2+2.0 | q 4.2 e 3.1 3.2 q 4.0+2.0 | q 4.0 e 5.3+3.2 2.1 q 1.0 | q 3.2 5.2 5.3 |
      q 4.2 e 5.2+3.0 2.0 q 2.3 | q 5.3 e 5.0+3.2 2.1 q 1.1 | h 6.4+2.0+1.0 q 6.0+3.1+2.0+1.0 | q r h 2.12*+1.12* |
    ` },
  ],
});

GS.data.songs.push({
  id: 'el-jaleo-de-jerez',
  title: 'El Jaleo de Jerez',
  composer: 'Traditionnel espagnol',
  level: 'intermediaire',
  genre: 'espagnol',
  key: 'Mi mineur',
  time: '3/8',
  tempo: 72,
  pima: false,
  techniques: ['triolets', 'ornements', 'accords répétés'],
  chords: ['Em', 'Am', 'B7', 'C', 'G', 'D'],
  desc: 'Une danse de Jerez vive et ornée, en sections contrastées, qui alterne rythmes de triolets et accords francs. Le plus long morceau de ce niveau : prends-le partie par partie.',
  tips: ['Commence chaque partie à la moitié du tempo : les six notes rapides qui suivent la basse doivent rester égales.', 'Les basses à vide servent de pivot, laisse-les sonner pendant que la mélodie ornemente.', 'Travaille les contrastes forte et piano indiqués entre les sections : c\'est ce qui donne vie à la danse.'],
  source: 'Transcription : classtab.org — Evgenij Voos',
  sourceUrl: 'https://www.classtab.org/anon_el_jaleo_de_jerez.txt',
  sections: [
    { name: 'Thème', bars: `
      e 6.0+1.7 z 3.0+2.0+1.7 1.8 1.7 3.0+2.0+1.5 1.7 1.5 | e 6.0+1.3 z 3.0+2.0+1.3 1.5 1.3 3.0+2.0+1.2 1.3 1.2 | e 6.0+1.0 s 3.0+2.0+1.0 2.4 3.0+1.0 1.3 | e 6.0+1.2 4.2+3.2+2.1 s 4.2 2.1 |
      e 6.0+1.2 4.2+3.2+2.1 4.2 | e 5.0+1.2 4.2+3.2+2.1 4.2 | e 5.2+4.1+3.2+2.0+1.2 z 2.0 2.1 2.0 3.2 2.0 3.2 | s. 3.0 x 4.4 e 4.2 5.2+2.0 |
      e 6.0+1.7 z 3.0+2.0+1.7 1.8 1.7 3.0+2.0+1.5 1.7 1.5 | e 6.0+1.3 z 3.0+2.0+1.3 1.5 1.3 3.0+2.0+1.2 1.3 1.2 | e 6.0+1.0 s 3.0+2.0+1.0 2.4 3.0+1.0 1.3 | e 5.0+1.2 4.2+3.2+2.1 4.2 |
      e 5.0+2.7 q 5.0+4.7+3.9+2.7+1.8 | s. 6.7+1.7 x 1.8 s. 3.0+1.7 x 1.8 e 3.0+1.7 | s. 6.7+1.7 x 1.8 s. 3.8+1.7 x 1.5 s. 5.2+1.2 x 1.3 | e [Em] 6.0+1.0 q 6.0+3.12+2.0+1.12 |
    ` },
    { name: 'Partie B', repeat: 2, bars: `
      e 5.0+1.8 s 4.7+3.7+2.7+1.8 1.7 4.7+3.7+2.7+1.8 1.10 | s 4.0+1.8 1.7 e 4.4+3.5+2.3+1.5 4.4+3.5+2.3 | e 6.3+1.7 s 3.0+2.0+1.7 1.5 3.0+2.0+1.3 1.5 | e 6.3+1.7 3.0+2.1 3.0+2.0 |
      e 4.4+1.5 s 3.4+2.4+1.5 1.4 3.4+2.4+1.5 1.7 | s 5.2+1.5 1.3 e 3.2+2.4+1.2 3.2+2.4 | e 6.0+1.3 s 3.0+2.0+1.3 1.2 3.0+1.0 1.3 | s [B] 5.2+1.2 2.4 e 4.1+2.0 4.1 |
      e 6.0+1.3 s 3.0+2.0+1.3 1.2 3.0+1.0 1.3 | e 6.7+1.7 3.8+2.7 3.8+2.7 | e 6.0+1.3 s 3.0+2.0+1.3 1.2 3.0+1.0 1.3 | s 6.2+1.2 2.4 e 4.1+2.0 4.1 |
      e 6.0+1.3 s 3.0+2.0+1.3 1.2 3.0+1.0 1.3 | s. 6.7+3.8+2.7+1.7 x 1.9 s. 1.7 x 1.9 s. 1.7 x 1.9 | s. 1.7 x 1.8 s. 1.7 x 1.8 s. 1.7 x 1.8 | e 6.0+1.7 z 3.0+2.0+1.7 1.8 1.7 3.0+2.0+1.5 1.7 1.5 |
      e 6.0+1.3 z 3.0+2.0+1.3 1.5 1.3 3.0+2.0+1.2 1.3 1.2 | e [Em7] 6.0+1.0 s 3.0+2.0+1.0 2.3 3.0+1.0 1.3 | e 5.0+1.2 4.2+3.2+2.1 4.2 | e 5.0+2.7 q 5.0+4.7+3.9+2.7+1.8 |
      s. 6.7+1.7 x 1.8 s. 4.9+1.7 x 1.8 e 4.9+1.7 | s. 6.7+1.7 x 1.8 s. 3.8+1.7 x 1.5 s. 5.2+1.3 x 1.2 | e [Em] 6.0+1.0 q 6.0+3.12+2.0+1.12 |
    ` },
    { name: 'Partie C', repeat: 2, bars: `
      e 6.3 s 4.0+2.0 2.1 3.0+2.0 2.1 | e [G] 6.3+2.3 s 5.2+2.3 2.3 4.0+2.3 2.3 | e 6.3+2.3 e. 3.0+2.0+1.0 s 2.3 | e 6.3+2.3 s 5.2+2.0 4.0 5.2 4.0 |
      e 6.3 s 4.0+2.0 2.1 3.0+2.0 2.1 | e 6.3+2.3 s 5.2+2.3 2.3 4.0+2.3 2.3 | e 6.3+2.3 e. 4.0+3.0+2.0+1.0 s 2.3 | e 5.3+1.2 4.2+3.2+2.1+1.0 5.3 |
      e 5.0 s 4.2+2.1 2.3 3.2+2.1 2.3 | e [Am] 5.0+1.0 s 3.2+1.0 1.0 2.1+1.0 1.0 | e 5.3+1.0 3.2+2.1+1.2 3.2+2.1+1.3 | e 4.0+1.5 3.7+2.7+1.7 s 3.7 1.5 |
      e 4.0+1.3 3.2+2.1+1.2 3.2+2.1+1.0 | e 4.0+2.3 3.2+2.1+1.2 s 3.2 1.0 | e 6.2+2.1 3.2+2.1+1.0 s 3.2 2.3 | e [G] 6.3+2.0 5.2 4.0 |
    ` },
    { name: 'Partie D', bars: `
      e 6.3+2.0 4.0 5.2+2.0 | e [Em] 6.0+1.3 3.0+2.0+1.3 3.0+2.0+1.3 | e 4.0 3.2+2.1+1.5 s 3.2+2.1 1.3 | e 5.2+1.3 s 3.2+2.0+1.2 1.3 3.2+2.0+1.2 1.3 |
      e [B7] 5.2+1.2 3.2+2.0 4.4+3.4+2.4 | e [C] 5.3+1.0 3.0+1.0 3.0+1.0 | e 5.0+1.0 4.2+3.2+2.3 4.2+3.2+2.1 | e 5.2+2.0 s 4.1+2.0 2.1 4.1+2.0 2.1 |
      e [B] 5.2+2.0 4.1 4.1+2.0 | e [Em] 6.0+1.3 3.0+2.0+1.3 3.0+2.0+1.3 | e 6.0 3.0+2.0+1.5 s 3.0 1.3 | e 5.2+1.3 s 3.2+2.0+1.2 1.3 3.2+2.0+1.2 1.3 |
      e [B7] 5.2+1.2 3.2+2.0 4.4+3.4+2.4 | e [C] 5.3+1.0 3.0+2.1+1.0 3.0+2.1+1.0 | e 5.0 4.2+3.2+2.3 4.2+3.2+2.1 | e [B] 5.2+2.0 4.1+1.2 4.1 |
      e 6.2+2.1 4.2+2.1+1.2 4.2 | e [Bm] 5.2+2.0 4.0+2.0+1.2 4.0 | e 6.2+2.1 4.2+2.1+1.2 4.2 | s. 5.2+2.0 x 2.1 s. 2.0 x 2.1 s. 2.0 x 2.1 |
      s. 2.0 x 2.1 s. 2.0 x 2.1 e 2.0 | e 6.3 s 4.0+2.0 2.1 3.0+2.0 2.1 | e [G] 6.3+2.3 s 5.2+2.3 2.3 3.0+2.3 2.3 | e 6.3+2.3 e. 3.0+2.0+1.0 s 2.3 |
      e 6.3+2.3 s 5.2+2.0 4.0 5.2 4.0 | e 6.3 s 4.0+2.0 2.1 3.0+2.0 2.1 | e 6.3+2.3 s 5.2+2.3 2.3 4.0+2.3 2.3 | e 5.2+2.3 e. 4.0+3.0+2.0+1.3 s 1.2 |
      e 5.3+1.2 4.2+3.2+2.1+1.0 5.3 | e 5.0 s 4.2+2.1 2.3 3.2+2.1 2.3 | e [Am] 5.0+1.0 s 3.2+1.0 1.0 2.1+1.0 1.0 | e 5.3+1.0 3.2+2.1+1.2 3.2+2.1+1.3 |
      e 4.2+1.5 3.7+2.7+1.7 s 2.3 1.5 | e 4.0+1.3 3.2+2.1+1.2 3.2+2.1+1.0 | e 4.0+2.3 3.2+2.1+1.0 s 3.2 1.0 | e 6.2+2.1 3.2+2.1+1.0 s 3.2 2.3 |
      e [G] 6.3+3.0+2.0 4.0 5.2 | q. 6.2+4.1+3.2+2.0 |
    ` },
    { name: 'Reprise et coda', bars: `
      e 6.0+1.7 z 3.0+2.0+1.7 1.8 1.7 3.0+2.0+1.5 1.7 1.5 | e 6.0+1.3 z 3.0+2.0+1.3 1.5 1.3 3.0+2.0+1.2 1.3 1.2 | e 6.0+1.0 s 3.0+2.0+1.0 2.4 3.0+1.0 1.3 | e 6.0+1.2 4.2+3.2+2.1 s 4.2 2.1 |
      e 6.0+1.2 4.2+3.2+2.1 4.2 | e 5.0+1.2 4.2+3.2+2.1 4.2 | e 5.2+4.1+3.2+2.0+1.2 z 2.0 2.1 2.0 3.2 2.0 3.2 | s. 3.0 x 4.4 e 4.2 5.2+2.0 |
      e 6.0+1.7 z 3.0+2.0+1.7 1.8 1.7 3.0+2.0+1.5 1.7 1.5 | e 6.0+1.3 z 3.0+2.0+1.3 1.5 1.3 3.0+2.0+1.2 1.3 1.2 | e 6.0+1.0 s 3.0+2.0+1.0 2.4 3.0+1.0 1.3 | e 5.0+1.2 4.2+3.2+2.1 4.2 |
      e 5.0+2.7 q 5.0+4.7+3.9+2.7+1.8 | s. 6.7+1.7 x 1.8 s. 3.0+1.7 x 1.8 e 3.0+1.7 | s. 6.7+1.7 x 1.8 s. 3.8+1.7 x 1.5 s. 5.2+1.2 x 1.3 | s 6.0+1.0 1.2 3.0+1.3 1.5 3.0+1.7 1.8 |
      z 5.6+1.7 1.8 1.7 e 3.2+2.4+1.2 3.2+2.4+1.2 | s. [Em] 6.0+1.7 x 1.3 e 3.0+1.0 3.0 | s 5.2+1.3 1.2 3.2+1.3 1.2 4.4+2.4 3.4 | s 6.0+1.0 1.2 3.0+1.3 1.5 3.0+1.7 1.8 |
      z 5.6+1.7 1.8 1.7 e 3.2+2.4+1.2 3.2+2.4+1.2 | s. 6.2+1.7 x 1.3 e 3.0+1.0 3.0 | s 6.3+1.3 1.2 3.2+1.3 1.2 4.4+2.4 3.4 | q. 6.0+3.0+2.0+1.0 |
      e 4.2+3.0+2.0+1.0 5.2+3.0+2.0+1.0 6.3+3.0+2.0+1.0 | q. 6.0+3.0+2.0+1.0 | q 6.0+3.12+2.0+1.12 e 6.0+5.2+4.2+3.0+2.0+1.0 | q. 6.0+5.2+4.2+3.0+2.0+1.0 |
    ` },
  ],
});

GS.data.songs.push({
  id: 'canarios',
  title: 'Canarios',
  composer: 'G. Sanz',
  level: 'intermediaire',
  genre: 'baroque',
  key: 'Ré majeur',
  time: '6/8',
  tempo: 96,
  pima: false,
  techniques: ['6/8 et hémioles', 'liés rapides', 'basse et dessus'],
  chords: ['D', 'A', 'G', 'Bm'],
  desc: 'La danse bondissante du baroque espagnol, écrite pour guitare par Gaspar Sanz. Elle travaille tes liés et ce balancement si particulier entre deux et trois temps.',
  tips: ['Compte à deux temps dans les mesures en croches et à trois noires dans les mesures en hémiole.', 'Isole les groupes liés, lents d\'abord : le pouce de la main gauche reste souple.', 'Dans la partie d\'accords, laisse la basse à vide rebondir au pouce en dessous des doubles cordes.'],
  source: 'Transcription : classtab.org — Kevin J. Manges',
  sourceUrl: 'https://www.classtab.org/sanz_gaspar_canarios.txt',
  sections: [
    { name: 'Canarios', bars: `
      !p e 2.3 1.0 | e 4.0+1.2 1.0p 1.2 2.0+1.3 1.2p 1.3 | q 2.3+1.2 e 4.0 2.5 2.3p 2.2 | e 2.0 2.2h 2.3 z 5.0+1.0 1.2h 1.0p e 2.3 2.2 |
      q 2.3 e 4.0 1.2 1.3h 1.2 | e 5.4+1.0 1.2h 1.0 5.2+2.3 2.5h 2.3 | e 5.0+2.2 2.3h 2.2 6.2+4.4+3.2 3.0p 3.2 | e 6.3+3.0+2.0 2.2 2.3h 5.0+1.0 1.2h 1.3 |
      q [D] 4.0+1.2 2.3 e 1.5 4.0 | e 1.7 3.0 1.7 1.9 4.7 1.9 | q 5.9+1.10 1.10 e 1.2 5.0 | e 1.3 5.2 1.3 1.5 5.4 1.5 |
      q 4.0+1.2 2.3 e 3.2 4.4 | e 2.0 3.0 2.0 2.2 3.2 2.2 | q 4.4+2.3 4.0 e 1.5 5.0 | e 1.3 5.2 1.3 2.5 5.4 2.5 |
      q 4.0+2.3 q. 2.3 e 1.5 | e 4.0+1.2 1.3h 1.5 5.0+1.0 1.2h 1.3 | q 2.3 q. 4.0 e 1.10 | e 3.0+2.0+1.7 1.9h 1.10 5.0+1.0 5.2 5.4 |
      q 4.0+2.3 e 2.3 4.0+2.3 2.2p 2.0 | e 5.0+3.2 3.4h 3.2 3.0 3.2h 3.0 | e 4.4 4.2p 4.0 1.5 1.3p 1.2 | e 3.0+1.3 1.2p 1.0 5.0+3.2 3.4h 2.2 |
      q 4.0+2.3 2.3 1.5 | e 4.0+2.3 2.2p 2.3 5.0+1.0 1.2h 1.0 | q 4.0+1.2 2.3 1.0 | e 3.2+1.2 1.3h 1.2 5.0+2.5 2.3p 2.2 |
      q 4.0+2.3 2.3 1.5 | e 1.7 3.0 1.7 1.9 4.7 1.9 | q 5.9+1.10 1.10 3.2 | e 3.0 2.0 3.0 3.2 2.2 3.2 |
      q 4.4+2.3 e 4.0 4.0+1.2 1.3h 1.2 | e 5.4+1.0 1.2h 1.0 4.2+1.4 1.2p 1.4 | e 5.0+1.5 1.3p 1.5 4.0+1.5 1.3p 1.5 | e 3.0+1.7 1.5p 1.7 5.0+1.9 1.7p 1.9 |
      q 4.0+1.10 e 2.7+1.10 4.0 5.0 4.0 | e 2.7+1.10 4.0 2.7+1.10 2.8+1.10 5.0 2.8+1.10 | q 2.7+1.10 e 4.0 5.0 4.0 5.0 | e 2.7+1.10 4.0 2.7+1.10 2.10+1.9 5.0 2.10+1.9 |
      q 2.7+1.10 e 4.0 5.0 4.0 5.0 | e 2.7+1.10 4.0 2.7+1.10 2.10+1.9 5.0 2.10+1.9 | e 2.8+1.7 3.0 2.8+1.7 2.7+1.5 4.0 2.7+1.5 | e 2.5+1.3 4.0 2.5+1.3 2.2+1.5 5.0 2.2+1.5 |
      q 2.3+1.2 e 4.0 5.0 4.0 5.0 | e 2.3+1.2 4.0 2.3+1.2 2.2+1.0 5.0 2.2+1.0 | e 3.4+2.3 4.0 3.4+2.3 3.2+2.2 5.0 3.2+2.2 | e 3.0+2.0 4.0 3.0+2.0 2.2+1.5 5.0 2.2+1.5 |
      q 2.3+1.2 e 4.0 5.0 4.0 5.0 | e 4.0+1.10 1.7p 1.8 3.0+1.7 2.10 2.8 | q 5.0+2.7 q. 3.7 e 5.0+1.0 | e 4.0+1.2 1.3h 1.2 5.0+2.5 2.3p 2.2 |
      q 2.3 q. 4.0 e 1.5 | e 4.0+2.3 2.2p 2.3 5.0+1.0 1.2h 1.3 | q 4.0+1.2 q. 4.0+3.2+2.3+1.2 e 1.10 | e 3.0+1.7 1.9h 1.10 5.0+1.9 1.10h 1.9 |
      !p q 1.10 e 4.0 |
    ` },
    { name: 'Final', repeat: 2, bars: `
      !p e 5.0 4.0 5.0 | e 4.0+1.10 1.9p 1.10 5.0+1.9 1.10h 1.9 | e 3.0+1.7 1.9h 1.7 4.7+1.5 1.7h 1.5 | e 3.0+1.7 1.5p 1.7 5.0+2.10+1.9 2.8 2.10 |
      !p q [D] 4.0+2.7+1.10 e 3.7 |
    ` },
  ],
});

GS.data.songs.push({
  id: 'carcassi-op60-3',
  title: 'Étude en la, op. 60 n° 3',
  composer: 'M. Carcassi',
  level: 'intermediaire',
  genre: 'classique',
  key: 'La majeur',
  time: '4/4',
  tempo: 84,
  pima: true,
  techniques: ['arpège p-i-m-a', 'triolets', 'position IX'],
  chords: ['A', 'E7', 'B7', 'E', 'D'],
  desc: 'L\'étude la plus célèbre de Carcassi : un arpège continu dont la mélodie ressort au-dessus. Un classique pour stabiliser ta main droite.',
  tips: ['Garde le même geste p-i-m-a sur toute la pièce, et ne laisse pas l\'annulaire accrocher.', 'Change les accords de la main gauche à l\'avance : le premier temps de chaque mesure doit être net.', 'Fais ressortir la note de la 1re corde : c\'est elle, la mélodie.'],
  source: 'Transcription : classtab.org — Kevin J. Manges',
  sourceUrl: 'https://www.classtab.org/carcassi_op60_no03_study_in_a.txt',
  video: 'https://www.youtube.com/watch?v=T1iE6WbSwp4',
  sections: [
    { name: 'Partie A', repeat: 2, bars: `
      t [A] 5.0 3.2 2.2 1.2 3.2 2.2 1.0 3.2 2.2 5.0 3.2 2.2 | t [E7] 6.4 3.4 2.3 1.2 3.4 2.3 1.0 3.4 2.3 6.4 3.4 2.3 | t 6.0 3.4 2.3 1.5 3.4 2.3 1.4 3.4 2.3 6.0 3.4 2.3 | t [A] 5.0 3.6 2.5 1.7 3.6 2.5 1.5 3.6 2.5 5.0 3.6 2.5 |
      t 5.0 3.2 2.2 1.4 3.2 2.2 1.2 3.2 2.2 5.0 3.2 2.2 | t 5.1 3.0 2.2 1.2 3.0 2.2 1.0 3.0 2.2 5.1 3.0 2.2 | t [B7] 5.2 4.4 3.2 2.5 4.4 3.2 5.2 4.4 3.2 2.4 4.4 3.2 | t [E] 6.0 3.1 2.0 1.0 3.1 2.0 h 4.2 |
    ` },
    { name: 'Partie B', repeat: 2, bars: `
      t [E] 6.0 3.1 2.0 1.2 3.1 2.0 1.0 3.1 2.0 4.2 3.1 2.0 | t 6.0 3.2 2.2 1.4 3.2 2.2 1.2 3.2 2.2 4.2 3.2 2.2 | t 6.0 3.3 2.2 1.3 3.3 2.2 1.2 3.3 2.2 4.2 3.3 2.2 | t 6.0 3.4 2.3 1.5 3.4 2.3 1.4 3.4 2.3 4.2 3.4 2.3 |
      t 4.3 3.4 2.3 1.5 3.4 2.3 1.4 3.4 2.3 4.3 3.4 2.3 | t 4.4 3.2 2.2 1.5 3.2 2.2 4.4 3.2 2.2 1.5 3.2 2.2 | t 4.0 3.7 2.7 1.7 3.7 2.7 4.0 3.7 2.7 1.8 3.7 2.7 | t 6.9 3.10 2.9 1.9 3.10 2.9 e 4.11 4.12 2.0 1.0 |
      t [A] 5.0 3.2 2.2 1.2 3.2 2.2 1.0 3.2 2.2 5.0 3.2 2.2 | t 5.0 3.4 2.3 1.5 3.4 2.3 1.4 3.4 2.3 5.0 3.4 2.3 | t 5.0 3.1 2.0 1.2 3.1 2.0 1.0 3.1 2.0 5.0 3.1 2.0 | t [D] 5.0 3.6 2.5 1.7 3.6 2.5 1.5 3.6 2.5 4.7 3.6 2.5 |
      t 4.4 3.6 2.5 1.7 3.6 2.5 1.6 3.6 2.5 4.4 3.6 2.5 | t [E7] 4.0 3.7 2.7 1.9 3.7 2.7 1.7 3.7 2.7 1.10 3.7 2.7 | t 4.1 3.2 2.0 1.1 3.2 2.0 4.2 3.1 2.3 1.0 3.1 2.0 | t [A] 5.0 3.6 2.5 1.5 3.6 2.5 h 4.7 |
    ` },
  ],
});

GS.data.songs.push({
  id: 'carcassi-op60-7',
  title: 'Étude en la mineur, op. 60 n° 7',
  composer: 'M. Carcassi',
  level: 'intermediaire',
  genre: 'classique',
  key: 'La mineur',
  time: '4/4',
  tempo: 72,
  pima: true,
  techniques: ['notes répétées a-m-i', 'basse mélodique', 'doubles croches'],
  chords: ['Am', 'E7', 'Dm', 'F', 'C'],
  desc: 'Une étude sombre et chantante : la mélodie est à la basse, sous des notes répétées qui lui font comme un souffle. Un superbe travail de main droite.',
  tips: ['Joue les notes répétées a-m-i aussi égales que possible, comme un tremolo très doux.', 'Mets la basse en avant : le pouce porte le chant.', 'Marque un vrai temps d\'arrêt sur la fin de la partie A avant de lancer la suite.'],
  source: 'Transcription : classtab.org — Mike Yukish',
  sourceUrl: 'https://www.classtab.org/carcassi_op60_no07_study_in_am.txt',
  video: 'https://www.youtube.com/watch?v=RRAVzEeXEX4',
  form: [0, 1, 0, 1, 2],
  sections: [
    { name: 'Partie A', bars: `
      s 5.0 3.2 3.2 3.2 5.3 3.2 3.2 3.2 4.3 3.2 3.2 3.2 4.2 3.2 3.2 3.2 | s 4.0 3.2 1.1 3.2 5.3 3.2 1.0 3.2 5.2 3.1 2.3 3.1 5.0 3.2 2.1 3.2 | s 4.0 3.2 2.0 3.2 4.1 3.2 2.0 3.2 4.2 3.2 2.0 3.2 4.3 3.2 2.0 3.2 | s 4.2 3.2 2.1 3.2 6.0 3.2 2.1 3.2 4.2 3.2 2.0 3.2 6.0 3.1 1.0 3.1 |
      s 5.0 3.2 3.2 3.2 5.3 3.2 3.2 3.2 4.3 3.2 3.2 3.2 4.2 3.2 3.2 3.2 | s 4.0 3.2 1.1 3.2 5.3 3.2 1.0 3.2 5.2 3.1 2.3 3.1 5.0 3.2 2.1 3.2 | s 4.0 3.2 2.0 3.2 4.1 3.2 2.0 3.2 4.2 3.2 2.1 3.2 6.0 3.1 2.0 1.0 | s 5.0 3.2 2.1 1.0 1.1 1.0 2.4 1.0 h 1.5 |
    ` },
    { name: 'Partie B', bars: `
      s 5.3 2.1 2.1 2.1 4.2 2.1 2.1 2.1 3.2 2.1 2.1 2.1 3.0 2.1 2.1 2.1 | s 4.3 3.2 2.3 3.2 4.2 2.2 1.0 2.2 4.0 2.3 1.1 2.3 4.0 2.1 1.2 2.1 | s 3.0 2.0 1.3 2.0 6.3 3.0 1.3 3.0 5.0 3.0 1.2 3.0 5.2 3.0 1.1 3.0 | s 5.3 3.0 1.0 3.0 4.0 3.0 2.3 3.0 4.2 3.0 2.1 3.0 5.3 3.0 1.0 3.0 |
      s 4.3 3.2 3.2 3.2 4.2 2.2 2.2 2.2 4.0 2.3 2.3 2.3 4.4 3.5 3.5 3.5 | s 4.5 2.0 2.0 2.0 4.3 2.4 2.4 2.4 4.2 1.0 1.0 1.0 3.1 2.3 2.3 2.3 | s 3.2 2.1 2.1 2.1 5.0 2.1 2.1 2.1 4.0 2.0 2.0 2.0 4.1 3.2 3.2 3.2 | s 4.2 3.1 2.0 1.0 1.1 1.0 1.0 1.0 1.4 1.0 1.0 1.0 1.7 1.0 1.0 1.0 |
      s 6.0+1.5 1.0 1.0 1.0 1.1 1.0 2.4 1.0 2.3 1.0 2.1 1.0 2.0 1.0 3.2 1.0 | s 4.2 3.1 2.0 1.0 1.1 1.0 1.0 1.0 1.4 1.0 1.0 1.0 1.7 1.0 1.0 1.0 | s 6.0+1.5 1.0 1.0 1.0 1.1 1.0 2.4 1.0 2.3 1.0 2.1 1.0 2.0 1.0 3.2 1.0 | e 3.1 s 4.3 1.0 4.2 1.0 4.1 1.0 4.2 1.0 4.0 1.0 5.3 1.0 5.2 1.0 |
    ` },
    { name: 'Partie A variée', bars: `
      s 5.0 3.2 3.2 3.2 5.3 3.2 3.2 3.2 4.3 3.2 3.2 3.2 4.2 3.2 3.2 3.2 | s 4.0 3.2 1.1 3.2 5.3 3.2 1.0 3.2 5.2 3.1 2.3 3.1 5.0 3.2 2.1 3.2 | s 5.5 4.3 3.3 4.3 5.5 4.3 3.3 4.3 4.2 3.0 2.2 3.0 4.2 3.0 2.2 3.0 | s 4.3 3.2 2.3 3.2 5.4 3.2 1.0 3.2 4.0 3.2 1.1 3.2 4.2 3.2 1.0 3.2 |
      s 4.4 2.4 2.4 2.4 3.2 2.4 2.4 2.4 3.1 1.0 1.0 1.0 4.2 2.3 2.3 2.3 | s 3.2 2.1 2.1 2.1 4.2 2.0 2.0 2.0 4.3 3.2 3.2 3.2 5.3 3.2 2.1 3.2 | s 4.0 3.2 2.0 3.2 4.1 3.2 2.0 3.2 4.2 3.2 2.1 3.2 6.0 3.1 2.0 1.0 | s 5.0 3.2 2.1 1.0 1.1 1.0 2.4 1.0 h 1.5 |
    ` },
  ],
});

GS.data.songs.push({
  id: 'sor-op35-22',
  title: 'Étude en si mineur, op. 35 n° 22',
  composer: 'F. Sor',
  level: 'intermediaire',
  genre: 'classique',
  key: 'Si mineur',
  time: '3/4',
  tempo: 84,
  pima: true,
  techniques: ['arpège', 'barré II', 'voix cachée'],
  chords: ['Bm', 'F#7', 'G', 'A7', 'Em', 'D'],
  desc: 'L\'étude n° 5 de Segovia, l\'une des plus belles de Sor. Un arpège simple, mais une voix du haut à faire chanter avec patience.',
  tips: ['Garde le barré en II le moins serré possible : tu joueras longtemps, économise ta main.', 'Tiens un peu plus la première note de la mesure, comme le suggère le tabeur : la phrase respire mieux.', 'Ne ralentis pas sur les changements de position : prépare-les pendant la dernière croche.'],
  source: 'Transcription : classtab.org — Michael et Victor Zefas',
  sourceUrl: 'https://www.classtab.org/sor_op35_no22_allegretto_in_bm.txt',
  sections: [
    { name: 'Partie A', bars: `
      e {CII} [Bm] 5.2+2.3 3.4 4.4 3.4 2.3 3.4 | e 1.2 2.3 4.4 2.3 1.2 2.3 | e [F#7] 1.0 2.2 4.4 2.2 1.0 2.2 | e [Bm] 2.3 3.4 4.4 3.4 2.3 3.4 |
      e [F#] 2.2 3.3 4.4 3.3 2.2 3.3 | e [Bm] 2.3 3.4 4.4 3.4 2.3 3.4 | e [Em] 1.0 2.0 3.0 2.0 1.1 2.0 | e [F#] 1.2 2.2 3.3 2.2 4.4 3.3 |
      e [Bm] 5.2+2.3 3.4 4.4 3.4 2.3 3.4 | e 1.2 2.3 4.4 2.3 1.2 2.3 | e [F#7] 1.0 2.2 4.4 2.2 1.0 2.2 | e [G] 2.3 3.4 4.5 3.4 2.3 3.4 |
      e [A7] 1.0 2.2 3.0 2.2 4.2+1.0 2.2 | e [Bm] 2.3 3.4 4.4 3.4 2.3 3.4 | e [F#] 2.2 3.3 4.4 3.3 2.2 3.3 | e [Bm] 3.4 2.3 4.4 3.4 q 5.2 |
    ` },
    { name: 'Partie B', repeat: 2, bars: `
      e 1.2 2.3 4.4 2.3 1.2 2.3 | e [F#7] 1.0 2.2 4.4 2.2 1.0 2.2 | e [Bm] 2.3 3.4 4.4 3.4 2.3 3.4 | e [F#] 2.2 3.3 4.4 3.3 2.2 3.3 |
      e [Bm] 2.3 3.4 4.4 3.4 1.2 2.3 | e [F#7] 1.0 2.2 4.4 3.3 2.2 3.3 | e [Bm] 2.3 3.4 4.4 3.4 2.3 3.4 | e [F#] 2.2 1.2 3.3 2.2 q 4.4 |
      e {CII} [B7] 5.2+2.4 3.2 4.4 3.2 2.4 3.2 | e [Em] 6.0+1.0 3.0 4.2 3.0 2.0 3.0 | e [A7] 5.0+2.2 3.0 4.2 3.0 2.2 3.0 | e [D] 2.3 4.0 4.4 3.2 2.3 3.2 |
      e {CII} [C] 6.0+2.1 3.0 4.2 3.0 2.1 3.0 | e 4.2+1.3 3.0 4.2+1.0 3.0 4.2+2.1 3.0 | e [Bdim] 6.1+2.0 3.1 4.0 3.1 2.0 3.1 | e [F#] 6.2+3.3 5.4 4.4 3.3 2.2 1.2 |
      e {CII} [Bm] 5.2+2.3 3.4 4.4 3.4 2.3 3.4 | e 1.2 2.3 4.4 2.3 1.2 2.3 | e [F#] 1.0 2.2 4.4 2.2 1.0 2.2 | e [Bm] 2.3 3.4 4.4 3.4 2.3 3.4 |
      e [F#] 2.2 3.3 4.4 3.3 2.2 3.3 | e [Bm] 2.3 3.4 4.4 3.4 2.3 3.4 | e [Em] 1.0 2.0 3.0 2.0 1.1 2.0 | e [F#] 1.2 4.4 3.3 2.2 4.2 2.2 |
      e [Bm] 4.0+1.2 2.3 3.4 2.3 1.2 2.3 | e {CIV} [C#7] 5.4+1.4 2.6 3.4 2.6 1.4 2.6 | e [F#7] 4.4+1.6 2.5 3.6 2.5 1.6 2.5 | e [G] 4.5+1.7 2.0 3.7 2.0 1.7 2.0 |
      e {CII} [Em] 4.2+1.3 2.2 3.4 2.2 1.3 2.2 | e [Bm] 4.4+1.2 2.3 3.4 2.3 1.2 2.3 | e [F#] 6.2+1.2 2.2 3.3 2.2 4.2 2.2 | h [Bm] 5.2+4.0+2.0 q r |
    ` },
  ],
});

GS.data.songs.push({
  id: 'sor-op35-17',
  title: 'Étude en ré, op. 35 n° 17',
  composer: 'F. Sor',
  level: 'intermediaire',
  genre: 'classique',
  key: 'Ré majeur',
  time: '4/4',
  tempo: 88,
  pima: true,
  techniques: ['voix du dessus tenue', 'basse au pouce', 'arpège brisé'],
  chords: ['D', 'A', 'G', 'E7'],
  desc: 'L\'étude n° 6 de Segovia : une conversation entre basse et dessus sur un arpège en croches. Excellente pour apprendre à tenir les notes de la mélodie.',
  tips: ['Laisse sonner la note du dessus jusqu\'à sa reprise, ne lève pas le doigt trop tôt.', 'Le pouce joue les basses avec une attaque ronde, jamais lourde.', 'Travaille la mesure 30 et ses liés à part, puis réintègre-la dans la phrase.'],
  source: 'Transcription : classtab.org — Chris Bolton',
  sourceUrl: 'https://www.classtab.org/sor_op35_no17_moderato_in_d.txt',
  video: 'https://www.youtube.com/watch?v=MjL4NZBZkdI',
  sections: [
    { name: 'Partie A', bars: `
      !p e 3.2 | e 1.2 4.0 3.2 1.2 1.0 5.0 3.0 1.0 | e [D] 2.3 5.5 4.4 1.2 3.2 5.5 4.4 3.2 | e 2.0 6.3 3.0 2.0 1.0 6.4 4.2 2.3 |
      e 2.3 5.0 4.2 2.2 2.5 5.0 4.2 3.2 | e 1.2 5.5 3.2 1.2 1.0 5.0 3.0 1.0 | e 2.3 5.2 4.4 2.3 2.4 5.0 4.4 2.4 | e 1.0 6.3 4.2+3.0 2.0 2.2 5.0 4.2+3.0 1.0 |
      e 4.4+2.3 5.5 3.2 4.4 q. 5.5 e 2.7 | e 2.5 5.4 3.2 2.5 2.4 5.3 3.2 2.4 | e [A] 2.5 5.4 3.2 2.5 2.2 5.0 3.2 2.2 | e 2.3 5.2 4.4 2.3 2.0 4.2 3.1 1.0 |
      e 2.3 4.2 3.1 4.2 3.2+2.2 4.2 5.0 1.0 | e 1.0 5.4 3.2 1.0 1.1 5.4 3.2 1.1 | e 1.2 4.0 3.2 1.2 2.0 4.1 3.2 2.1 | e 2.2 4.2 3.2 2.2 6.0+2.3 4.2 2.0 3.1+2.0 |
      e 5.0+2.2 3.2 4.2 5.4 q. 5.0 e 2.10 |
    ` },
    { name: 'Partie B', bars: `
      e 2.10 5.9 4.7 2.10 2.1 4.2 3.2 2.1 | e 2.0 4.1 3.2 2.0 1.2 4.1 3.2 1.2 | e 1.3 4.2 3.0 1.3 3.3 5.5 4.5 3.3 | e 3.2 5.4 4.5 3.2 1.0 5.4 3.0 1.0 |
      e 1.1 4.0 4.3 2.3 2.2 4.2 3.0 1.0 | e 2.3 4.3 3.2 1.0 1.1 4.0 3.2 1.0 | e 2.3 5.1 3.2 2.3 1.0 5.1 3.1 1.0 | e 2.2 5.0 3.2 4.2 5.4 4.2 5.0 3.2 |
      e 1.2 4.0 3.2 1.2 1.0 5.0 3.0 1.0 | e [D] 2.3 5.5 4.4 1.2 3.2 5.5 4.4 2.3 | e 2.0 6.3 3.0 2.0 1.0 6.4 4.2 2.3 | e 2.3 5.0 4.2 2.2 2.5 5.0 4.2 3.2 |
      e 1.2 5.5 3.2 s 1.3 1.2p e 1.0 6.6 3.0 s 2.7 2.5p | e 3.7 6.7 4.4 2.0 3.0+1.0 6.0 6.3+2.0 s 1.2 1.0p | e 2.3 5.0 4.4+3.2 2.3 2.2 5.0 4.2+3.0 2.2 | e 4.4+2.3 5.5 3.2 4.4 h 5.5 |
    ` },
  ],
});

GS.data.songs.push({
  id: 'giuliani-op50-15',
  title: 'Allegretto en la mineur, op. 50 n° 15',
  composer: 'M. Giuliani',
  level: 'intermediaire',
  genre: 'classique',
  key: 'La mineur',
  time: '6/8',
  tempo: 76,
  pima: true,
  techniques: ['6/8', 'mélodie et basse', 'levée'],
  chords: ['Am', 'E', 'C', 'G', 'Dm'],
  desc: 'Une petite pièce du Papillon de Giuliani, mélancolique et dansante. Elle t\'apprend le balancement du 6/8 avec une ligne chantante.',
  tips: ['Compte à deux grands temps et attaque la levée sans précipiter.', 'Fais entendre les basses sur chaque grand temps, elles portent la danse.', 'Soigne la fin de chaque phrase : une pièce simple devient belle grâce à la nuance.'],
  source: 'Transcription : classtab.org — Weed',
  sourceUrl: 'https://www.classtab.org/giuliani_op050_15_allegretto_in_am.txt',
  video: 'https://www.youtube.com/watch?v=ULq_jkF80Z4',
  sections: [
    { name: 'Allegretto', bars: `
      !p e 3.2 2.0 | e 5.0+2.1 2.0 3.2 6.0+3.1 3.2 2.0 | e 5.0+3.2 4.2 5.3 5.0 2.1 2.3 | e 5.0+1.0 2.1 3.2 4.0+1.1 2.3 2.0 |
      e [E] 6.0+3.1 2.0 3.1 4.2 1.0 1.0 | e 5.3+1.0 2.3 2.1 4.0+2.0 3.2 3.0 | e 6.0+3.0 2.0 2.1 6.1+3.2 1.0 2.3 | e 6.3+4.2 3.0 2.1 6.3+4.0 3.0 2.0 |
      e [C] 5.3+2.1 3.0 4.2 5.3 2.1 2.1 | e 5.3+2.0 4.3 3.0 5.3 2.3 2.3 | e 5.3+2.1 4.2 3.0 5.3 1.0 2.1 | e 4.0 2.1 2.0 4.1 2.1 3.2 |
      e [E7] 6.0+3.1 2.0 3.1 6.0+4.2 1.0 2.3 | e 5.0+2.1 2.0 3.2 6.0+3.1 1.0 2.3 | e 5.0+2.1 2.0 3.2 6.0+3.1 1.0 2.3 | e 5.0+2.2 1.0 1.3 1.6 1.5 1.3 |
      e 4.0 1.1 1.0 4.0+1.3 1.1 2.3 | e 6.0+2.1 1.0 3.2 6.0+2.0 1.0 3.1 | e 5.0+3.2 2.1 1.0 6.0+2.3 2.0 1.0 | e 5.0+2.1 3.2 1.0 6.0+2.3 3.4 1.0 |
      e 5.0+3.5 2.5 1.5 4.0+2.6 3.7 2.0 | e 6.0+2.1 1.0 3.2 6.0+2.0 1.0 3.1 | e [Am] 5.0+3.2 2.1 4.2 3.2 5.3 4.2 | h. 5.0 |
    ` },
  ],
});

GS.data.songs.push({
  id: 'aguado-valse-la-mineur',
  title: 'Valse en la mineur, op. 3 n° 2',
  composer: 'D. Aguado',
  level: 'intermediaire',
  genre: 'espagnol',
  key: 'La mineur / La majeur',
  time: '3/8',
  tempo: 50,
  pima: false,
  techniques: ['valse', 'ornements', 'position V et VII'],
  chords: ['Am', 'E', 'C', 'G', 'A', 'E7'],
  desc: 'Une valse d\'Aguado, compagnon de Sor et grand pédagogue madrilène. Écrite pour une guitare plus petite, elle demande de belles extensions, mais reste un vrai bijou chantant.',
  tips: ['Sens la valse à un temps par mesure : la basse donne l\'élan, le reste flotte.', 'Certains écarts sont grands sur une guitare moderne : garde le poignet souple et ne force jamais.', 'Soigne le contraste : la partie majeure doit s\'ouvrir comme une éclaircie.'],
  source: 'Transcription : classtab.org — Weed',
  sourceUrl: 'https://www.classtab.org/aguado_op03_8_petites_pieces_2_valse_in_am.txt',
  form: [0, 1, 2, 0, 1],
  sections: [
    { name: 'La mineur', repeat: 2, bars: `
      s. 5.0+1.0 x 2.1 e 3.2 2.3+1.1 | s. [Am] 5.0+1.0 x 2.1 e 3.2 1.5 | s. [E7] 6.0+1.4 x 1.0 e 3.7 1.7 | s. [Am] 5.0+1.5 x 2.5 e 3.5 1.8 |
      e 2.10+1.8 2.8+1.7 2.6+1.5 | e. 3.9+2.8 s 1.8 3.5+2.5 1.5 | e. [G7] 6.3+4.3+1.3 s 2.6 2.3 3.4 | q. [C] 5.3+4.2+2.1 |
    ` },
    { name: 'La mineur (suite)', repeat: 2, bars: `
      s. 2.1 x 1.0 e 1.5 1.3 | s [G7] 2.0+1.3 3.0 4.3 4.0p 5.2 6.3 | s. 5.0+3.2 x 2.1 e 1.1 1.0 | s [E7] 3.1+1.0 4.2 4.0p 5.2 6.4 6.0 |
      s. 6.1+3.2 x 2.0 e 2.1 2.2 | s. 6.0+2.3 x 2.0 e 3.1 4.2 | s. 4.3+3.2 x 2.0 e 2.1 2.2 | s. 4.2+2.3 x 2.0 q 3.1 |
      s. 4.0+3.1+1.1 x 1.0 e 1.1 1.1 | e [Am] 5.3+3.2+1.0 1.5 s 5.0 3.5 | e 4.0+2.0 1.1 s 6.0+3.1 1.0 | q. 6.5+5.3+3.2 |
    ` },
    { name: 'La majeur', repeat: 2, bars: `
      s 2.3 2.2p 2.0 2.2h s. 2.3 x 2.2 | s [A] 3.2 4.2 5.4 4.2 e 5.0 | s 3.7+2.7 3.6+2.5 3.5+2.4 3.6+2.5 s. 3.7+2.7 x 3.6+2.5 | s. 5.0+4.7+3.6 x 2.5 e 1.5 1.9 |
      s. 4.0+1.7 x 2.9 e 3.9 1.10 | e 4.7+1.9 z 1.9 1.7p 2.10 2.9 2.7 3.9 | e [B7] 6.7+3.8 4.7+3.8+1.7 4.7+3.8+1.7 | q. [E] 5.7+4.6+2.5 |
      z [E7] 1.10 1.7p 2.9 e 1.0 5.7+3.7 | z [A] 4.7+3.6 2.5 1.5 e 1.9 1.9 | z [C#7] 1.7 1.4p 2.6 e 3.6 5.4+3.4 | z 4.4+3.2 2.2 1.2 e 1.5 s 1.4 1.2 |
      s. 3.1+2.0+1.0 x 1.2 e 1.0 4.2+3.4+2.3 | s 4.7+3.6 2.5 1.5 1.9 1.7 1.5 | e 4.0+3.7+1.7 2.7+1.10 5.7+4.9+3.7+2.9 | q. [A] 5.0+3.6+1.5 |
    ` },
  ],
});

GS.data.songs.push({
  id: 'mrs-winters-jump',
  title: 'Mrs Winter\'s Jump',
  composer: 'J. Dowland',
  level: 'intermediaire',
  genre: 'renaissance',
  key: 'La mineur',
  time: '3/4',
  tempo: 104,
  pima: false,
  techniques: ['contrepoint', 'style de luth', 'accords'],
  chords: ['Am', 'E', 'C', 'G', 'Dm'],
  desc: 'Une courte danse de Dowland, pleine de bonne humeur, à l\'origine pour le luth. Parfaite pour aborder le style Renaissance sans se perdre dans les doigtés.',
  tips: ['Garde un son clair et léger, sans vibrato : imagine le luth.', 'Fais rebondir le rythme pointé : c\'est un saut, comme le dit le titre.', 'Joue les accords plaqués bien ensemble, avec le pouce et les doigts en un seul geste.'],
  source: 'Transcription : classtab.org — Kevin J. Manges',
  sourceUrl: 'https://www.classtab.org/dowland_john_mrs_winters_jump.txt',
  sections: [
    { name: 'Partie A', repeat: 2, bars: `
      q 5.0+1.0 1.5 1.0 | h [A] 5.0+1.5 q 5.4+1.0 | q. 4.0+3.2+1.2 e 1.0 q 5.2+3.1+2.3 | h. 5.0+3.2+2.2 |
      q 5.0+3.2+2.2 1.0 6.0 | q 6.3+3.0+2.0 2.3 5.0+2.2 | q. 6.0+3.1+2.0 e 3.2 q 6.0+3.1 | h. 5.0+4.2+3.2 |
    ` },
    { name: 'Partie B', repeat: 2, bars: `
      q 4.2 3.1 3.2 | q. 4.2+2.0 e 4.0 q 5.4+3.2 | q. 5.2+2.3 e 2.0 q 5.0+2.2 | h [E] 4.2+3.1+2.0 q 6.0 |
      q 5.0 2.2 2.3 | h 3.2+2.2+1.0 q 3.1+2.0+1.0 | q. 4.4+1.2 e 1.4 q 1.5 | h. 4.2+3.4+1.4 |
      q [A] 5.0+1.5 1.0 2.2 | q 5.0+1.0 2.2 3.2 | q [Bm] 5.2+1.2 2.3 2.0 | q [E] 6.0+1.7 2.9 3.9 |
      h 5.0+1.5 q 2.5 | h [A] 5.0+1.5 q 5.4+2.5 | q. 5.0+3.2+1.2 e 1.0 q 5.2+3.1+2.3 | h. 5.0+3.2+2.2 |
    ` },
  ],
});
