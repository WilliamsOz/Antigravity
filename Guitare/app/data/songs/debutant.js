/* Morceaux débutants, domaine public. Sons réels, position I (ou guère plus haut), ordre de difficulté croissant.
 * check = mélodie saisie en notes, indépendamment de la tablature. Quand une note de mélodie se prolonge
 * au-delà de la barre de mesure, une basse seule la soutient : cette basse figure alors dans check,
 * puisque c'est la note la plus aiguë de l'événement. */
(function () {
  const add = (s) => GS.data.songs.push(Object.assign({ level: 'debutant', source: 'Domaine public' }, s));

  add({
    id: 'au-clair', title: 'Au clair de la lune', composer: 'Traditionnel français',
    genre: 'traditionnel', key: 'Do majeur', time: '4/4', tempo: 80,
    pima: false, techniques: ['mélodie', 'position I', 'alternance i-m'], chords: [],
    desc: 'La toute première mélodie : cinq notes voisines sur les cordes aiguës, sans basse. Parfait pour relier la lecture de la tablature à ce que tu entends.',
    tips: [
      'Alterne index et majeur de la main droite, même sur les notes répétées.',
      'Laisse le doigt 1 posé sur le Do (corde 2, case 1) tant que tu peux : il revient sans arrêt.',
      'La partie centrale descend sur le La et le Sol (corde 3) : regarde la corde avant de la jouer, puis ne regarde plus.',
    ],
    check: 'C4 C4 C4 D4 E4 D4 C4 E4 D4 D4 C4 D4 D4 D4 D4 A3 A3 D4 C4 B3 A3 G3',
    form: [0, 0, 1, 0],
    sections: [
      { name: 'Thème', bars: `q 2.1 2.1 2.1 2.3 | h 1.0 2.3 | q 2.1 1.0 2.3 2.3 | w 2.1` },
      { name: 'Partie centrale', bars: `q 2.3 2.3 2.3 2.3 | h 3.2 3.2 | q 2.3 2.1 2.0 3.2 | w 3.0` },
    ],
  });

  add({
    id: 'frere-jacques', title: 'Frère Jacques', composer: 'Traditionnel français',
    genre: 'traditionnel', key: 'Sol majeur', time: '4/4', tempo: 90,
    pima: false, techniques: ['mélodie', 'position I', 'croches'], chords: [],
    desc: 'Un canon que tout le monde connaît, donc une oreille qui te corrige toute seule. Tu y croises tes premières croches.',
    tips: [
      'Compte « 1 et 2 et » sur la mesure en croches, qui va deux fois plus vite que le reste.',
      'La dernière phrase (Sol, Ré, Sol) saute sur la corde 4 : le Ré grave se joue à vide.',
      'Joue-le en canon avec un ami : le second entre après deux mesures.',
    ],
    check: 'G3 A3 B3 G3 G3 A3 B3 G3 B3 C4 D4 B3 C4 D4 D4 E4 D4 C4 B3 G3 D4 E4 D4 C4 B3 G3 G3 D3 G3 G3 D3 G3',
    sections: [
      { name: 'Le canon', bars: `q 3.0 3.2 2.0 3.0 | q 3.0 3.2 2.0 3.0 | q 2.0 2.1 h 2.3 | q 2.0 2.1 h 2.3 |
        e 2.3 1.0 2.3 2.1 q 2.0 3.0 | e 2.3 1.0 2.3 2.1 q 2.0 3.0 | q 3.0 4.0 h 3.0 | q 3.0 4.0 h 3.0` },
    ],
  });

  add({
    id: 'ah-vous-dirai-je', title: 'Ah ! Vous dirai-je, maman', composer: 'Traditionnel français',
    genre: 'traditionnel', key: 'Sol majeur', time: '4/4', tempo: 90,
    pima: false, techniques: ['mélodie', 'position I', 'changements de corde'], chords: [],
    desc: 'L\'air de « Twinkle Twinkle Little Star », que Mozart a varié. Il t\'apprend à sauter de corde sans perdre le rythme.',
    tips: [
      'Le saut du Sol (corde 3 à vide) au Ré (corde 2, case 3) est le passage clé : prépare le doigt 3 pendant que tu joues le Sol.',
      'Chaque note est doublée : profite de la seconde pour préparer la suivante.',
      'La partie centrale tient en deux mesures répétées : apprends-les d\'abord seules.',
    ],
    check: 'G3 G3 D4 D4 E4 E4 D4 C4 C4 B3 B3 A3 A3 G3 D4 D4 C4 C4 B3 B3 A3 D4 D4 C4 C4 B3 B3 A3',
    form: [0, 1, 0],
    sections: [
      { name: 'Thème', bars: `q 3.0 3.0 2.3 2.3 | q 1.0 1.0 h 2.3 | q 2.1 2.1 2.0 2.0 | q 3.2 3.2 h 3.0` },
      { name: 'Partie centrale', bars: `q 2.3 2.3 2.1 2.1 | q 2.0 2.0 h 3.2 | q 2.3 2.3 2.1 2.1 | q 2.0 2.0 h 3.2` },
    ],
  });

  add({
    id: 'ode-joie', title: 'Ode à la joie', composer: 'L. van Beethoven',
    genre: 'classique', key: 'Sol majeur', time: '4/4', tempo: 92,
    pima: false, techniques: ['mélodie', 'basse + mélodie', 'position I'], chords: ['G', 'D'],
    desc: 'Le thème de la 9e symphonie, ici avec ta première basse : une seule note au début de chaque mesure. C\'est le pas vers le jeu « une guitare qui fait deux voix ».',
    tips: [
      'Joue la basse au pouce et la mélodie à l\'index ou au majeur, exactement ensemble.',
      'Sol grave (corde 6, case 3) puis Ré à vide : deux basses seulement, apprends-les avant d\'ajouter la mélodie.',
      'La note pointée de la fin de phrase (noire pointée + croche) est le piège : compte « 1 et 2 et ».',
    ],
    check: 'B3 B3 C4 D4 D4 C4 B3 A3 G3 G3 A3 B3 B3 A3 A3 B3 B3 C4 D4 D4 C4 B3 A3 G3 G3 A3 B3 A3 G3 G3 A3 A3 B3 G3 A3 B3 C4 B3 G3 A3 B3 C4 B3 A3 G3 A3 D3',
    form: [0, 1, 2, 1],
    sections: [
      { name: 'Phrase A', bars: `[G] q 6.3+2.0 2.0 2.1 2.3 | [D] q 4.0+2.3 2.1 2.0 3.2 | [G] q 6.3+3.0 3.0 3.2 2.0 | [D] q. 4.0+2.0 e 3.2 h 3.2` },
      { name: 'Phrase A (conclusion)', bars: `[G] q 6.3+2.0 2.0 2.1 2.3 | [D] q 4.0+2.3 2.1 2.0 3.2 | [G] q 6.3+3.0 3.0 3.2 2.0 | [D] q. 4.0+3.2 e 3.0 [G] h 6.3+3.0` },
      { name: 'Phrase B', bars: `[D] q 4.0+3.2 3.2 2.0 3.0 | [D] q 4.0+3.2 e 2.0 2.1 q 2.0 3.0 | [D] q 4.0+3.2 e 2.0 2.1 q 2.0 3.2 | [G] q 6.3+3.0 3.2 [D] h 4.0` },
    ],
  });

  add({
    id: 'kumbaya', title: 'Kumbaya', composer: 'Traditionnel (spiritual)',
    genre: 'folk', key: 'Sol majeur', time: '4/4', tempo: 84,
    pima: false, techniques: ['basse + mélodie', 'notes tenues', 'levée'], chords: ['G', 'C', 'D'],
    desc: 'Une mélodie très lente qui t\'apprend à laisser sonner : la note du haut continue pendant que le pouce frappe une nouvelle basse.',
    tips: [
      'Quand une mesure commence par une basse seule, la mélodie de la mesure précédente doit continuer à sonner : ne relève pas le doigt.',
      'La levée (Sol, Si) se joue seule : compte « 3, 4 » à vide avant de commencer.',
      'Sur les trois Ré répétés, alterne i et m pour que le son reste égal.',
    ],
    check: 'G3 B3 D4 D4 D4 C3 E4 E4 D4 G2 G3 B3 D4 D4 D4 G2 C4 B3 A3 D3 G3 B3 D4 D4 D4 C3 E4 E4 D4 G2 C4 B3 A3 A3 G3',
    sections: [
      { name: 'Levée', bars: `!p q 3.0 2.0` },
      { name: 'Couplet', bars: `[G] q. 6.3+2.3 e 2.3 h 2.3 | [C] h 5.3 q 1.0 1.0 | [G] w 6.3+2.3 | h 6.3 q 3.0 2.0 |
        [G] q. 6.3+2.3 e 2.3 h 2.3 | h 6.3 q 2.1 2.0 | [D] w 4.0+3.2 | h 4.0 q 3.0 2.0 |
        [G] q. 6.3+2.3 e 2.3 h 2.3 | [C] h 5.3 q 1.0 1.0 | [G] w 6.3+2.3 | h 6.3 [C] h 5.3+2.1 |
        [G] h 6.3+2.0 [D] q 4.0+3.2 3.2 | [G] w 6.3+3.0` },
    ],
  });

  add({
    id: 'joyeux-anniversaire', title: 'Joyeux anniversaire', composer: 'Patty et Mildred Hill',
    genre: 'traditionnel', key: 'Do majeur', time: '3/4', tempo: 90,
    pima: false, techniques: ['basse + mélodie', '3/4', 'levée', 'rythme pointé'], chords: ['C', 'G', 'F'],
    desc: 'La pièce la plus utile du répertoire : tu en auras besoin une fois par an au moins. Elle t\'apprend le 3/4 et la levée pointée.',
    tips: [
      'La levée est courte-longue à l\'envers : croche pointée puis double, comme un petit élan vers le temps fort.',
      'Compte « 1, 2, 3 » : la basse tombe toujours sur le 1.',
      'Le saut vers le Sol aigu (corde 1, case 3) est le sommet : prépare le doigt pendant la levée, et chante-le avant de le jouer.',
    ],
    check: 'G3 G3 A3 G3 C4 B3 G3 G3 A3 G3 D4 C4 G3 G3 G4 E4 C4 B3 A3 F4 F4 E4 C4 D4 C4',
    sections: [
      { name: 'Levée', bars: `!p e. 3.0 s 3.0` },
      { name: 'Chanson', bars: `[C] q 5.3+3.2 3.0 2.1 | [G] h 6.3+2.0 e. 3.0 s 3.0 | q 6.3+3.2 3.0 2.3 | [C] h 5.3+2.1 e. 3.0 s 3.0 |
        [C] q 5.3+1.3 1.0 2.1 | [F] q 6.1+2.0 3.2 e. 1.1 s 1.1 | [C] q 5.3+1.0 2.1 [G] 6.3+2.3 | [C] h. 5.3+2.1` },
    ],
  });

  add({
    id: 'aura-lee', title: 'Aura Lee', composer: 'George R. Poulton (1861)',
    genre: 'folk', key: 'Do majeur', time: '4/4', tempo: 84,
    pima: false, techniques: ['basse + mélodie', 'position I', 'rythme pointé'], chords: ['C', 'D', 'G', 'E', 'Am', 'F'],
    desc: 'Une ballade américaine de la guerre de Sécession, dont Elvis a repris la mélodie pour « Love Me Tender ». Six basses différentes, mais toujours sur le premier temps.',
    tips: [
      'Repère la basse de chaque mesure avant de jouer : Do (corde 5, case 3), Ré à vide, Sol (corde 6, case 3), Mi à vide, La à vide, Fa (corde 6, case 1).',
      'Dans le refrain, la noire pointée + croche se fait sans précipiter la croche : elle appartient à la note suivante.',
      'Chante la mélodie en jouant seulement les basses : tu sentiras où tombent les changements.',
    ],
    check: 'G3 C4 B3 C4 D4 A3 D4 C4 B3 A3 B3 C4 E4 E4 E4 E4 E4 E4 E4 D4 C4 D4 E4 E4 E4 F4 E4 D4 A3 D4 C4 C4 B3 E4 D4 C4',
    sections: [
      { name: 'Couplet', repeat: 2, bars: `[C] q 5.3+3.0 2.1 2.0 2.1 | [D] q 4.0+2.3 3.2 h 2.3 | [G] q 6.3+2.1 2.0 3.2 2.0 | [C] w 5.3+2.1` },
      { name: 'Refrain', bars: `[C] q. 5.3+1.0 e 1.0 h 1.0 | [E] q. 6.0+1.0 e 1.0 h 1.0 | [Am] q 5.0+1.0 2.3 2.1 2.3 | [C] w 5.3+1.0 |
        [F] q 6.1+1.0 1.0 1.1 1.0 | [D] q 4.0+2.3 3.2 q. 2.3 e 2.1 | [G] q 6.3+2.1 2.0 q. 1.0 e 2.3 | [C] w 5.3+2.1` },
    ],
  });

  add({
    id: 'oh-susanna', title: 'Oh! Susanna', composer: 'Stephen Foster (1848)',
    genre: 'folk', key: 'Sol majeur', time: '4/4', tempo: 100,
    pima: false, techniques: ['basse + mélodie', 'levée', 'rythme pointé'], chords: ['G', 'D', 'C'],
    desc: 'Le grand classique de la musique américaine du XIXe siècle : joyeux, rapide à mémoriser, et sa levée en croches donne de l\'élan à tout le morceau.',
    tips: [
      'La levée (Sol, La) se joue comme un petit saut vers le temps fort : ne la traîne pas.',
      'Noire pointée + croche partout : garde le pouce régulier sur la basse, le rythme se cale dessus.',
      'Le refrain commence par deux blanches sur le Do : profites-en pour bien poser ta main.',
    ],
    check: 'G3 A3 B3 D4 D4 E4 D4 B3 G3 A3 B3 B3 A3 G3 A3 G3 A3 B3 D4 D4 E4 D4 B3 G3 A3 B3 B3 A3 A3 G3 G3 A3 G3 C4 C4 E4 E4 E4 D4 D4 B3 G3 A3 G3 A3 B3 D4 D4 E4 D4 B3 G3 A3 B3 B3 A3 A3 G3',
    form: [0, 1, 2, 1, 3, 4],
    sections: [
      { name: 'Levée', bars: `!p e 3.0 3.2` },
      { name: 'Couplet', bars: `[G] q 6.3+2.0 2.3 2.3 1.0 | q 6.3+2.3 2.0 q. 3.0 e 3.2 | q 6.3+2.0 2.0 3.2 3.0 | [D] h. 4.0+3.2 e 3.0 3.2 |
        [G] q 6.3+2.0 2.3 q. 2.3 e 1.0 | q 6.3+2.3 2.0 q. 3.0 e 3.2 | q 6.3+2.0 2.0 [D] q 4.0+3.2 3.2` },
      { name: 'Fin de couplet (reprise)', bars: `[G] h 6.3+3.0 q r e 3.0 3.2` },
      { name: 'Fin de couplet', bars: `[G] h 6.3+3.0 h r` },
      { name: 'Refrain', bars: `[C] h 5.3+2.1 2.1 | q 5.3+1.0 h 1.0 q 1.0 | [G] q 6.3+2.3 2.3 2.0 3.0 | [D] h 4.0+3.2 q r e 3.0 3.2 |
        [G] q 6.3+2.0 2.3 2.3 1.0 | q 6.3+2.3 2.0 3.0 3.2 | q 6.3+2.0 2.0 [D] q 4.0+3.2 3.2 | [G] h 6.3+3.0 h r` },
    ],
  });

  add({
    id: 'when-saints', title: 'When the Saints Go Marching In', composer: 'Traditionnel (gospel)',
    genre: 'traditionnel', key: 'Do majeur', time: '4/4', tempo: 104,
    pima: false, techniques: ['basse + mélodie', 'levée', 'notes tenues'], chords: ['C', 'G', 'F'],
    desc: 'L\'hymne de La Nouvelle-Orléans. Beaucoup de notes longues : idéal pour travailler la tenue de la mélodie pendant que la basse repart.',
    tips: [
      'La phrase commence toujours après le premier temps : le pouce frappe seul sur le 1, puis la mélodie démarre sur le 2.',
      'Les rondes sur le Sol (corde 1, case 3) doivent sonner jusqu\'au bout : garde bien le doigt enfoncé.',
      'Compte à voix haute « 1, 2, 3, 4 » les premières fois, c\'est la seule difficulté du morceau.',
    ],
    check: 'C4 E4 F4 G4 C3 C4 E4 F4 G4 C3 C4 E4 F4 G4 E4 C4 E4 D4 G2 E4 E4 D4 C4 C4 E4 G4 G4 F4 F2 F4 E4 F4 G4 E4 C4 D4 C4',
    sections: [
      { name: 'Levée', bars: `!p q 2.1 1.0 1.1` },
      { name: 'Thème', bars: `[C] w 5.3+1.3 | q 5.3 2.1 1.0 1.1 | w 5.3+1.3 | q 5.3 2.1 1.0 1.1 | h 5.3+1.3 1.0 | h 5.3+2.1 1.0 | [G] w 6.3+2.3 | q 6.3 1.0 1.0 2.3 |
        [C] h. 5.3+2.1 q 2.1 | h 5.3+1.0 1.3 | [F] q 6.1+1.3 h. 1.1 | q 6.1 1.1 1.0 1.1 | [C] h 5.3+1.3 1.0 | h 5.3+2.1 [G] 6.3+2.3 | [C] w 5.3+2.1` },
    ],
  });

  add({
    id: 'jingle-bells', title: 'Jingle Bells', composer: 'James Pierpont (1857)',
    genre: 'noel', key: 'Sol majeur', time: '4/4', tempo: 110,
    pima: false, techniques: ['basse + mélodie', 'position I', 'couplet et refrain'], chords: ['G', 'C', 'D', 'A'],
    desc: 'Le couplet que personne ne connaît vraiment et le refrain que tout le monde connaît. Écrit dans le grave pour rester en première position du début à la fin.',
    tips: [
      'Commence par le refrain, plus facile : les Si répétés reposent la main gauche.',
      'Le Ré grave du couplet se joue à vide sur la corde 4, avec le Sol de basse (corde 6, case 3) en dessous.',
      'Le Fa♯ grave (corde 4, case 4) se prend au petit doigt : prépare-le dès la mesure précédente.',
    ],
    check: 'D3 B3 A3 G3 D3 D3 D3 D3 B3 A3 G3 E3 E3 C4 B3 A3 F#3 D4 D4 C4 A3 B3 D3 B3 A3 G3 D3 D3 B3 A3 G3 E3 E3 E3 C4 B3 A3 D4 D4 D4 D4 E4 D4 C4 A3 G3 D4 B3 B3 B3 B3 B3 B3 B3 D4 G3 A3 B3 C4 C4 C4 C4 C4 B3 B3 B3 B3 B3 A3 A3 B3 A3 D4 B3 B3 B3 B3 B3 B3 B3 D4 G3 A3 B3 C4 C4 C4 C4 C4 B3 B3 B3 B3 D4 D4 C4 A3 G3',
    sections: [
      { name: 'Couplet', bars: `[G] q 6.3+4.0 2.0 3.2 3.0 | h. 6.3+4.0 e 4.0 4.0 | q 6.3+4.0 2.0 3.2 3.0 | [C] w 5.3+4.2 |
        q 5.3+4.2 2.1 2.0 3.2 | [D] w 5.0+4.4 | q 4.0+2.3 2.3 2.1 3.2 | [G] w 6.3+2.0 |
        q 6.3+4.0 2.0 3.2 3.0 | w 6.3+4.0 | q 6.3+4.0 2.0 3.2 3.0 | [C] h. 5.3+4.2 q 4.2 |
        q 5.3+4.2 2.1 2.0 3.2 | [G] q 6.3+2.3 2.3 2.3 2.3 | [D] q 4.0+1.0 2.3 2.1 3.2 | [G] h 6.3+3.0 [D] 4.0+2.3` },
      { name: 'Refrain', bars: `[G] q 6.3+2.0 2.0 h 2.0 | q 6.3+2.0 2.0 h 2.0 | q 6.3+2.0 2.3 q. 3.0 e 3.2 | w 6.3+2.0 |
        [C] q 5.3+2.1 2.1 q. 2.1 e 2.1 | q 5.3+2.1 [G] 6.3+2.0 2.0 e 2.0 2.0 | [A] q 5.0+2.0 3.2 3.2 2.0 | [D] h 4.0+3.2 2.3 |
        [G] q 6.3+2.0 2.0 h 2.0 | q 6.3+2.0 2.0 h 2.0 | q 6.3+2.0 2.3 q. 3.0 e 3.2 | w 6.3+2.0 |
        [C] q 5.3+2.1 2.1 q. 2.1 e 2.1 | q 5.3+2.1 [G] 6.3+2.0 2.0 e 2.0 2.0 | [D] q 4.0+2.3 2.3 2.1 3.2 | [G] w 6.3+3.0` },
    ],
  });

  add({
    id: 'red-river-valley', title: 'Red River Valley', composer: 'Traditionnel américain',
    genre: 'folk', key: 'Sol majeur', time: '4/4', tempo: 80,
    pima: false, techniques: ['basse + mélodie', 'levée', 'chromatisme'], chords: ['G', 'D', 'C'],
    desc: 'Une ballade de cow-boy, tranquille et chantante. Chaque phrase démarre sur deux croches de levée : c\'est tout l\'esprit du morceau.',
    tips: [
      'Couplet et refrain ont la même mélodie : une seule chose à apprendre.',
      'Les deux croches de levée doivent mener vers le temps fort : pense « et-un » plutôt que deux notes isolées.',
      'Mi puis Ré♯ (corde 4, cases 2 puis 1) : un petit chromatisme, garde le doigt 2 posé en préparant le doigt 1.',
    ],
    check: 'D3 G3 B3 B3 B3 B3 A3 B3 A3 G3 D3 G3 B3 G3 B3 D4 C4 B3 A3 D4 C4 B3 B3 A3 G3 A3 B3 D4 C4 E3 D#3 D3 F#3 G3 A3 B3 A3 G3 D3 G3 G3',
    form: [0, 1, 2, 1, 3],
    sections: [
      { name: 'Levée', bars: `!p e 4.0 3.0` },
      { name: 'Couplet / refrain', bars: `[G] q 6.3+2.0 e 2.0 2.0 q 2.0 e 3.2 2.0 | e 3.2 :60 6.3+3.0 e 4.0 3.0 | q 6.3+2.0 e 3.0 2.0 q 2.3 e 2.1 2.0 | [D] h. 4.0+3.2 e 2.3 2.1 |
        [G] q 6.3+2.0 e 2.0 3.2 q 3.0 e 3.2 2.0 | e 2.3 [C] :60 5.3+2.1 e 4.2 4.1 | [D] q 4.0 e 4.4 3.0 q 3.2 e 2.0 3.2` },
      { name: 'Fin de phrase (reprise)', bars: `[G] h. 6.3+3.0 e 4.0 3.0` },
      { name: 'Fin', bars: `[G] h. 6.3+3.0 q r` },
    ],
  });

  add({
    id: 'swing-low', title: 'Swing Low, Sweet Chariot', composer: 'Traditionnel (spiritual)',
    genre: 'traditionnel', key: 'Sol majeur', time: '4/4', tempo: 88,
    pima: false, techniques: ['basse + mélodie', 'syncope', 'notes tenues'], chords: ['G', 'C', 'D'],
    desc: 'Le spiritual repris par tous les stades de rugby. Sa phrase « com-ing for to car-ry me home » démarre après le temps : ta première vraie syncope.',
    tips: [
      'La dernière note de la mesure (Ré à vide) déborde sur la mesure suivante : la basse tombe seule sur le 1, la mélodie repart sur le 2.',
      'Les Sol répétés se jouent i-m-i-m sur la corde 3 à vide : ta main gauche se repose, écoute ta main droite.',
      'Forme : refrain, couplet, refrain. Apprends le refrain d\'abord, le couplet en reprend presque tous les gestes.',
    ],
    check: 'B3 G3 B3 G3 G3 E3 D3 G2 G3 G3 G3 G3 B3 B3 D4 D4 E4 D4 B3 D4 G3 G3 E3 D3 G2 G3 G3 G3 G3 B3 B3 A3 G3 B3 D4 G3 E3 G3 G3 G3 G3 G3 G3 E3 D3 G2 G3 G3 G3 G3 B3 B3 D4 D4 D4 E4 D4 B3 B3 G3 G3 G3 G3 G3 E3 D3 G2 G3 G3 G3 G3 B3 B3 A3 G3',
    form: [0, 1, 0],
    sections: [
      { name: 'Refrain', bars: `[G] q 6.3+2.0 h. 3.0 | [C] q 5.3+2.0 [G] q. 3.0 e 3.0 4.2 4.0 | q 6.3 e 3.0 3.0 3.0 3.0 2.0 2.0 | [D] q 4.0+2.3 h. 2.3 |
        [G] e 6.3+1.0 2.3 h. 2.0 | [C] q 5.3+2.3 [G] q. 3.0 e 3.0 4.2 4.0 | q 6.3 e 3.0 3.0 3.0 3.0 2.0 2.0 | [D] q 4.0+3.2 [G] h. 6.3+3.0` },
      { name: 'Couplet', bars: `[G] q 6.3+2.0 2.3 e 3.0 4.2 q 3.0 | e 6.3+3.0 3.0 3.0 3.0 q 3.0 e 4.2 4.0 | q 6.3 e 3.0 3.0 3.0 3.0 2.0 2.0 | [D] q 4.0+2.3 h. 2.3 |
        [G] q 6.3+2.3 e 1.0 2.3 q 2.0 2.0 | [C] q 5.3+3.0 e 3.0 3.0 3.0 3.0 4.2 4.0 | [G] q 6.3 e 3.0 3.0 3.0 3.0 2.0 2.0 | [D] q 4.0+3.2 [G] h. 6.3+3.0` },
    ],
  });

  add({
    id: 'amazing-grace', title: 'Amazing Grace', composer: 'Traditionnel (air « New Britain »)',
    genre: 'traditionnel', key: 'Do majeur', time: '3/4', tempo: 76,
    pima: false, techniques: ['basse + mélodie', '3/4', 'levée', 'chant'], chords: ['C', 'F', 'G'],
    desc: 'L\'un des plus beaux airs à faire chanter sur une guitare en nylon. Peu de notes, tout est dans la façon de les relier.',
    tips: [
      'Cherche le son de la voix : attaque douce, près de la rosace, et laisse la note précédente sonner jusqu\'à la suivante.',
      'Le Sol aigu (corde 1, case 3) est le sommet de la pièce : ne le joue pas plus fort, juste plus long.',
      'Les deux croches Mi-Do sont un petit ornement chanté : elles ne doivent jamais presser le tempo.',
    ],
    check: 'G3 C4 E4 C4 E4 D4 C4 A3 G3 G3 C4 E4 C4 E4 D4 G4 G2 E4 G4 E4 G4 E4 C4 G3 A3 C4 C4 A3 G3 G3 C4 E4 C4 E4 D4 C4',
    sections: [
      { name: 'Levée', bars: `!p q 3.0` },
      { name: 'Chant', bars: `[C] h 5.3+2.1 e 1.0 2.1 | h 5.3+1.0 q 2.3 | [F] h 6.1+2.1 q 3.2 | [C] h 5.3+3.0 q 3.0 |
        [C] h 5.3+2.1 e 1.0 2.1 | h 5.3+1.0 q 2.3 | [G] h. 6.3+1.3 | h 6.3 q 1.0 |
        [C] q. 5.3+1.3 e 1.0 1.3 1.0 | h 5.3+2.1 q 3.0 | [F] q. 6.1+3.2 e 2.1 2.1 3.2 | [C] h 5.3+3.0 q 3.0 |
        [C] h 5.3+2.1 e 1.0 2.1 | h 5.3+1.0 [G] q 6.3+2.3 | [C] h. 5.3+2.1` },
    ],
  });

  add({
    id: 'auld-lang-syne', title: 'Auld Lang Syne (Ce n\'est qu\'un au revoir)', composer: 'Traditionnel écossais',
    genre: 'traditionnel', key: 'Sol majeur', time: '4/4', tempo: 84,
    pima: false, techniques: ['basse + mélodie', 'levée', 'rythme pointé'], chords: ['G', 'D', 'C', 'Em'],
    desc: 'L\'air du Nouvel An et des adieux. Son rythme pointé revient à chaque mesure : une fois installé dans le corps, le morceau joue presque tout seul.',
    tips: [
      'La cellule noire pointée + croche + deux noires ne change presque jamais : travaille-la d\'abord sur une seule note.',
      'Le refrain monte jusqu\'au Sol aigu (corde 1, case 3) : prépare-le depuis le Mi à vide.',
      'Le Ré grave de levée est aussi la note de fin de phrase : joue-le à vide, sans le frapper plus fort.',
    ],
    check: 'D3 G3 G3 G3 B3 A3 G3 A3 B3 G3 G3 B3 D4 E4 E4 D4 B3 B3 G3 A3 G3 A3 B3 G3 E3 E3 D3 G3 E4 D4 B3 B3 G3 A3 G3 A3 E4 D4 B3 B3 D4 E4 G4 D4 B3 B3 G3 A3 G3 A3 B3 G3 E3 E3 D3 G3',
    sections: [
      { name: 'Levée', bars: `!p q 4.0` },
      { name: 'Couplet', bars: `[G] q. 6.3+3.0 e 3.0 q 3.0 2.0 | [D] q. 4.0+3.2 e 3.0 q 3.2 2.0 | [G] q. 6.3+3.0 e 3.0 q 2.0 2.3 | [C] h. 5.3+1.0 q 1.0 |
        [G] q. 6.3+2.3 e 2.0 q 2.0 3.0 | [D] q. 4.0+3.2 e 3.0 q 3.2 2.0 | [Em] q. 6.0+3.0 e 4.2 q 4.2 4.0 | [G] h. 6.3+3.0 q 1.0` },
      { name: 'Refrain', bars: `[G] q. 6.3+2.3 e 2.0 q 2.0 3.0 | [D] q. 4.0+3.2 e 3.0 q 3.2 1.0 | [G] q. 6.3+2.3 e 2.0 q 2.0 2.3 | [C] h. 5.3+1.0 q 1.3 |
        [G] q. 6.3+2.3 e 2.0 q 2.0 3.0 | [D] q. 4.0+3.2 e 3.0 q 3.2 2.0 | [Em] q. 6.0+3.0 e 4.2 q 4.2 4.0 | [G] h. 6.3+3.0 q r` },
    ],
  });

  add({
    id: 'sakura', title: 'Sakura', composer: 'Traditionnel japonais',
    genre: 'traditionnel', key: 'Mi, mode japonais', time: '4/4', tempo: 72,
    pima: false, techniques: ['basse + mélodie', 'gamme japonaise', 'sonorité'], chords: ['Em', 'Am', 'C'],
    desc: 'La chanson des cerisiers en fleur, sur une gamme japonaise pleine de demi-tons. Tu y découvres qu\'une couleur peut naître de cinq notes.',
    tips: [
      'Joue près du chevalet sur les notes tenues pour imiter le son pincé du koto, puis reviens vers la rosace.',
      'Le Fa♯ grave (corde 4, case 4) se prend au petit doigt : laisse la main en place plutôt que de la déplacer.',
      'Ne remplis pas les notes longues : ce morceau vit de ses silences et de ses résonances.',
    ],
    check: 'E4 E4 F#4 E4 E4 F#4 E4 F#4 G4 F#4 E4 F#4 E4 C4 B3 G3 B3 C4 B3 B3 G3 F#3 E4 F#4 G4 F#4 E4 F#4 E4 C4 B3 G3 B3 C4 B3 B3 G3 F#3 E4 E4 F#4 E4 E4 F#4 B3 C4 F#4 E4 C4 B3',
    sections: [
      { name: 'Sakura', bars: `[Em] q 6.0+1.0 1.0 h 1.2 | q 6.0+1.0 1.0 h 1.2 | [Am] q 5.0+1.0 1.2 1.3 1.2 | q 5.0+1.0 e 1.2 1.0 [C] h 5.3+2.1 |
        [Em] q 6.0+2.0 3.0 2.0 2.1 | q 6.0+2.0 e 2.0 3.0 h 4.4 | [Am] q 5.0+1.0 1.2 1.3 1.2 | q 5.0+1.0 e 1.2 1.0 [C] h 5.3+2.1 |
        [Em] q 6.0+2.0 3.0 2.0 2.1 | q 6.0+2.0 e 2.0 3.0 h 4.4 | q 6.0+1.0 1.0 h 1.2 | q 6.0+1.0 1.0 h 1.2 |
        q 6.0+2.0 2.1 e 1.2 1.0 [C] q 5.3+2.1 | [Em] w 6.0+2.0` },
    ],
  });

  add({
    id: 'douce-nuit', title: 'Douce nuit', composer: 'Franz Xaver Gruber (1818)',
    genre: 'noel', key: 'Do majeur', time: '6/8', tempo: 72,
    pima: false, techniques: ['basse + mélodie', '6/8', 'rythme pointé'], chords: ['C', 'G', 'F'],
    desc: 'Le chant de Noël écrit à l\'origine pour voix et guitare. Ton premier 6/8 mélodique, avec son balancement à deux temps.',
    tips: [
      'Pense deux grands temps par mesure, pas six : la basse tombe sur le premier.',
      'Dans le motif Sol-La-Sol, la double (La) est très courte : elle touche à peine la note suivante.',
      'Sur l\'avant-dernière mesure, la mélodie descend jusqu\'à la dernière note, un Do grave : garde un son doux jusqu\'au bout.',
    ],
    check: 'G3 A3 G3 E3 G3 A3 G3 E3 D4 D4 B3 C4 C4 G3 A3 A3 C4 B3 A3 G3 A3 G3 E3 A3 A3 C4 B3 A3 G3 A3 G3 E3 D4 D4 F4 D4 B3 C4 E4 C4 G3 E3 G3 F3 D3 C3',
    sections: [
      { name: 'Douce nuit', bars: `[C] e. 5.3+3.0 s 3.2 e 3.0 q. 4.2 | e. 5.3+3.0 s 3.2 e 3.0 q. 4.2 | [G] q 6.3+2.3 e 2.3 q. 2.0 | [C] q 5.3+2.1 e 2.1 q. 3.0 |
        [F] q 6.1+3.2 e 3.2 e. 2.1 s 2.0 e 3.2 | [C] e. 5.3+3.0 s 3.2 e 3.0 q. 4.2 | [F] q 6.1+3.2 e 3.2 e. 2.1 s 2.0 e 3.2 | [C] e. 5.3+3.0 s 3.2 e 3.0 q. 4.2 |
        [G] q 6.3+2.3 e 2.3 e. 1.1 s 2.3 e 2.0 | [C] q. 5.3+2.1 1.0 | e. 5.3+2.1 s 3.0 e 4.2 [G] e. 6.3+3.0 s 4.3 e 4.0 | [C] h. 5.3` },
    ],
  });

  add({
    id: 'drunken-sailor', title: 'What Shall We Do with the Drunken Sailor', composer: 'Traditionnel (chant de marins)',
    genre: 'traditionnel', key: 'Mi dorien', time: '4/4', tempo: 104,
    pima: false, techniques: ['basse + mélodie', 'croches', 'mode dorien'], chords: ['Em', 'D'],
    desc: 'Un chant de marins à deux accords, qui se joue vite et fort. Le mode dorien lui donne sa couleur ni triste ni gaie.',
    tips: [
      'Garde le pouce très régulier sur le Mi grave et le Ré à vide : c\'est lui le moteur.',
      'Les croches répétées se jouent en alternant i et m, jamais avec le même doigt.',
      'Le Do♯ (corde 2, case 2) est la note qui donne la couleur dorienne : fais-la bien entendre.',
    ],
    check: 'B3 B3 B3 B3 B3 B3 B3 E3 G3 B3 A3 A3 A3 A3 A3 A3 A3 D3 F#3 A3 B3 B3 B3 B3 B3 B3 B3 C#4 D4 E4 D4 B3 A3 F#3 E3 E3 B3 B3 B3 B3 E3 G3 B3 A3 A3 A3 A3 D3 F#3 A3 B3 B3 B3 B3 C#4 D4 E4 D4 B3 A3 F#3 E3 E3',
    sections: [
      { name: 'Couplet', bars: `[Em] q 6.0+2.0 e 2.0 2.0 q 2.0 e 2.0 2.0 | q 6.0+2.0 4.2 3.0 2.0 | [D] q 4.0+3.2 e 3.2 3.2 q 3.2 e 3.2 3.2 | q 4.0+3.2 4.0 4.4 3.2 |
        [Em] q 6.0+2.0 e 2.0 2.0 q 2.0 e 2.0 2.0 | q 6.0+2.0 2.2 2.3 1.0 | [D] q 4.0+2.3 2.0 3.2 4.4 | [Em] h 6.0+4.2 4.2` },
      { name: 'Refrain', bars: `[Em] h 6.0+2.0 q. 2.0 e 2.0 | q 6.0+2.0 4.2 3.0 2.0 | [D] h 4.0+3.2 q. 3.2 e 3.2 | q 4.0+3.2 4.0 4.4 3.2 |
        [Em] h 6.0+2.0 q. 2.0 e 2.0 | q 6.0+2.0 2.2 2.3 1.0 | [D] q 4.0+2.3 2.0 3.2 4.4 | [Em] h 6.0+4.2 4.2` },
    ],
  });

  add({
    id: 'la-cucaracha', title: 'La Cucaracha', composer: 'Traditionnel mexicain',
    genre: 'traditionnel', key: 'Sol majeur', time: '4/4', tempo: 150,
    pima: false, techniques: ['basse + mélodie', 'syncope', 'levée'], chords: ['G', 'D'],
    desc: 'Le refrain le plus entraînant du Mexique, avec ses deux parties. Tout repose sur la syncope : la phrase tombe entre les temps.',
    tips: [
      'Les trois croches répétées (Ré à vide) sont l\'élan du morceau : joue-les i-m-i, légères.',
      'Commence à la moitié du tempo : la syncope se sent mieux lentement qu\'à toute vitesse.',
      'La basse tombe sur le 1 même quand la mélodie arrive juste après : c\'est ce décalage qui fait danser.',
    ],
    check: 'D3 D3 D3 G3 B3 D3 D3 D3 G3 B3 G2 G3 G3 F#3 F#3 E3 E3 D3 D3 D3 D3 F#3 A3 D3 D3 D3 F#3 A3 A2 D4 E4 D4 C4 B3 A3 B3 G3 D3 D3 D3 G3 G2 D3 D3 G3 G3 B3 B3 D4 B3 D3 D4 D4 E4 D4 C4 B3 D4 C4 A3 A2 D3 D3 F#3 F#3 A3 A3 C4 A3 A2 D4 E4 D4 C4 B3 A3 B3 G3',
    form: [0, 1, 2, 1, 3, 4, 5, 4, 3],
    sections: [
      { name: 'Levée', bars: `!p e 4.0 4.0 4.0` },
      { name: 'Première partie', bars: `[G] q. 6.3+3.0 q 2.0 e 4.0 4.0 4.0 | q. 6.3+3.0 :60 2.0 | e 6.3 q 3.0 e 3.0 4.4 4.4 4.2 4.2 | [D] h 4.0 e r 4.0 4.0 4.0 |
        q. 5.0+4.4 q 3.2 e 4.0 4.0 4.0 | q. 5.0+4.4 :60 3.2 | e 5.0 q 2.3 e 1.0 2.3 2.1 2.0 3.2` },
      { name: 'Retour', bars: `[G] q. 6.3+2.0 q 3.0 e 4.0 4.0 4.0` },
      { name: 'Fin de partie', bars: `[G] h 6.3+3.0 h r` },
      { name: 'Seconde partie', bars: `[G] e 6.3 q 4.0 e 4.0 3.0 3.0 2.0 2.0 | q. 6.3+2.3 :60 2.0 | [D] e 4.0 2.3 2.3 1.0 2.3 2.1 2.0 2.3 | q. 5.0+2.1 :60 3.2 |
        e 5.0 q 4.0 e 4.0 4.4 4.4 3.2 3.2 | q. 5.0+2.1 :60 3.2 | e 5.0 q 2.3 e 1.0 2.3 2.1 2.0 3.2` },
      { name: 'Retour (seconde partie)', bars: `[G] q. 6.3+2.0 :60 3.0` },
    ],
  });

  add({
    id: 'scarborough-fair', title: 'Scarborough Fair', composer: 'Traditionnel anglais',
    genre: 'folk', key: 'Mi dorien', time: '3/4', tempo: 104,
    pima: false, techniques: ['basse + mélodie', 'mode dorien', 'notes tenues'], chords: ['Em', 'D', 'G', 'A'],
    desc: 'La ballade médiévale rendue célèbre par Simon & Garfunkel, ici dans sa mélodie traditionnelle. Sa couleur vient du Do♯, la note qui rend le mode dorien.',
    tips: [
      'Laisse sonner le Mi grave à vide : il sert de bourdon et porte toute la pièce.',
      'Le Do♯ (corde 2, case 2) arrive sur le mot le plus doux : ne le frappe pas.',
      'Fa♯ grave puis Ré à vide sur la corde 4 : le doigt se lève juste au moment où le Ré doit sonner, pas avant.',
    ],
    check: 'E3 E3 B3 B3 F#3 G3 F#3 E3 E2 B3 D4 E4 D4 B3 C#4 A3 B3 E2 E4 E4 E4 D4 B3 B3 A3 G3 F#3 D3 A2 E3 B3 A3 G3 F#3 E3 D3 E3',
    sections: [
      { name: 'Ballade', bars: `[Em] h 6.0+4.2 q 4.2 | h 6.0+2.0 q 2.0 | [D] q. 5.0+4.4 e 3.0 q 4.4 | [Em] h. 6.0+4.2 | q 6.0 2.0 2.3 |
        [G] h 6.3+1.0 q 2.3 | [A] q 5.0+2.0 2.2 3.2 | [Em] h. 6.0+2.0 | h 6.0 q 1.0 |
        h 6.0+1.0 q 1.0 | [D] h 4.0+2.3 q 2.0 | [G] q 6.3+2.0 3.2 3.0 | [D] q 4.4 h 4.0 | h. 5.0 |
        [Em] h 6.0+4.2 q 2.0 | [D] h 5.0+3.2 q 3.0 | q 4.4 4.2 4.0 | [Em] h. 6.0+4.2` },
    ],
  });

  add({
    id: 'greensleeves-melodie', title: 'Greensleeves (mélodie)', composer: 'Traditionnel anglais (XVIe siècle)',
    genre: 'renaissance', key: 'La mineur', time: '3/4', tempo: 96,
    pima: false, techniques: ['basse + mélodie', '3/4', 'rythme pointé', 'sensible'], chords: ['Am', 'G', 'E', 'C'],
    desc: 'L\'air de la Renaissance anglaise par excellence, réduit à sa mélodie et une basse. Il t\'apprend le balancement à trois temps et le Sol♯ qui rend le mineur si expressif.',
    tips: [
      'Le rythme noire pointée + croche + noire revient partout : donne-lui un léger balancement, jamais raide.',
      'Sol♯ (corde 3, case 1) entre deux La : laisse le doigt 2 prêt, un demi-ton suffit à tout changer.',
      'La deuxième partie monte au Sol aigu (corde 1, case 3) : respire avant, comme un chanteur.',
      'Il existe deux versions de la descente Sol-Fa-Mi : avec Fa♯ (ici, la plus courante à la guitare) ou avec Fa naturel. Essaie les deux.',
    ],
    check: 'A3 C4 D4 E4 F4 E4 D4 B3 G3 A3 B3 C4 A3 A3 G#3 A3 B3 G#3 E3 A3 C4 D4 E4 F4 E4 D4 B3 G3 A3 B3 C4 B3 A3 G#3 F#3 G#3 A3 A3 G4 G4 F#4 E4 D4 B3 G3 A3 B3 C4 A3 A3 G#3 A3 B3 G#3 E3 G4 G4 F#4 E4 D4 B3 G3 A3 B3 C4 B3 A3 G#3 F#3 G#3 A3',
    sections: [
      { name: 'Levée', bars: `!p q 3.2` },
      { name: 'Première partie', bars: `[Am] h 5.0+2.1 q 2.3 | q. 5.0+1.0 e 1.1 q 1.0 | [G] h 6.3+2.3 q 2.0 | q. 6.3+3.0 e 3.2 q 2.0 |
        [Am] h 5.0+2.1 q 3.2 | q. 5.0+3.2 e 3.1 q 3.2 | [E] h 6.0+2.0 q 3.1 | h 6.0+4.2 q 3.2 |
        [Am] h 5.0+2.1 q 2.3 | q. 5.0+1.0 e 1.1 q 1.0 | [G] h 6.3+2.3 q 2.0 | q. 6.3+3.0 e 3.2 q 2.0 |
        [Am] q. 5.0+2.1 e 2.0 q 3.2 | [E] q. 6.0+3.1 e 4.4 q 3.1 | [Am] h. 5.0+3.2 | h. 5.0+3.2` },
      { name: 'Deuxième partie', bars: `[C] h. 5.3+1.3 | q. 5.3+1.3 e 1.2 q 1.0 | [G] h 6.3+2.3 q 2.0 | q. 6.3+3.0 e 3.2 q 2.0 |
        [Am] h 5.0+2.1 q 3.2 | q. 5.0+3.2 e 3.1 q 3.2 | [E] h 6.0+2.0 q 3.1 | h. 6.0+4.2 |
        [C] h. 5.3+1.3 | q. 5.3+1.3 e 1.2 q 1.0 | [G] h 6.3+2.3 q 2.0 | q. 6.3+3.0 e 3.2 q 2.0 |
        [Am] q. 5.0+2.1 e 2.0 q 3.2 | [E] q. 6.0+3.1 e 4.4 q 3.1 | [Am] h. 5.0+3.2` },
    ],
  });

  add({
    id: 'danny-boy', title: 'Danny Boy (Londonderry Air)', composer: 'Traditionnel irlandais',
    genre: 'traditionnel', key: 'Fa majeur', time: '4/4', tempo: 66,
    pima: false, techniques: ['basse + mélodie', 'grand ambitus', 'démanché', 'chant'], chords: ['F', 'Bb', 'C'],
    desc: 'L\'air irlandais le plus bouleversant, et le plus exigeant de cette liste : il couvre une octave et demie. Tu y fais ton premier petit démanché.',
    tips: [
      'Le La aigu (corde 1, case 5) se prend en glissant toute la main : installe-toi avec le doigt 1 en case 3 dès le début de la mesure.',
      'Si♭ (corde 3, case 3) et Fa (corde 4, case 3) : les deux au doigt 3, sans lever toute la main.',
      'La basse de Fa (corde 6, case 1) se joue en même temps que la mélodie : commence par ces deux notes seules, sans le reste.',
      'Fais durer le sommet : tout le morceau est construit pour y arriver.',
    ],
    check: 'E3 F3 G3 A3 G3 A3 D4 C4 A3 G3 F3 D3 F3 A3 Bb3 C4 D4 C4 A3 F3 A3 G3 E3 F3 G3 A3 G3 A3 D4 C4 A3 G3 F3 D3 E3 F3 G3 A3 Bb3 A3 G3 F3 E3 F3 C4 D4 E4 F4 E4 E4 D4 C4 A3 C4 A3 F3 C4 D4 E4 F4 E4 E4 D4 C4 A3 G3 C4 C4 C4 A4 G4 G4 F4 D4 F4 C4 A3 F3 E3 F3 G3 A3 D4 C4 A3 G3 F3 D3 E3 F3',
    sections: [
      { name: 'Levée', bars: `!p e 4.2 4.3 3.0` },
      { name: 'Première partie', bars: `[F] q. 6.1+3.2 e 3.0 3.2 2.3 2.1 3.2 | [Bb] e 5.1+3.0 4.3 q. 4.0 e 4.3 3.2 3.3 | [F] q. 6.1+2.1 e 2.3 2.1 3.2 4.3 3.2 | [C] :60 5.3+3.0 e 4.2 4.3 3.0 |
        [F] q. 6.1+3.2 e 3.0 3.2 2.3 2.1 3.2 | [Bb] e 5.1+3.0 4.3 q. 4.0 e 4.2 4.3 3.0 | [F] q. 6.1+3.2 e 3.3 3.2 3.0 4.3 4.2 | :60 6.1+4.3 e 2.1 2.3 1.0` },
      { name: 'Deuxième partie', bars: `[F] q. 6.1+1.1 e 1.0 1.0 2.3 2.1 3.2 | e 2.1 3.2 q. 6.1+4.3 e 2.1 2.3 1.0 | q. 6.1+1.1 e 1.0 1.0 2.3 2.1 3.2 | [C] :60 5.3+3.0 e 2.1 2.1 2.1 |
        {pos. III} q. 5.3+1.5 e 1.3 1.3 1.1 2.3 1.1 | [F] e 2.1 3.2 q. 6.1+4.3 e 4.2 4.3 3.0 | e 6.1+3.2 2.3 2.1 3.2 3.0 4.3 4.0 4.2 | w 6.1+4.3` },
    ],
  });

  add({
    id: 'bella-ciao', title: 'Bella Ciao', composer: 'Traditionnel italien',
    genre: 'traditionnel', key: 'La mineur', time: '4/4', tempo: 104,
    pima: false, techniques: ['basse + mélodie', 'levée', 'syncope'], chords: ['Am', 'Dm', 'E'],
    desc: 'Le chant des partisans italiens. La mélodie tient en huit mesures : le « o bella ciao » y est intégré, sans refrain à part, et la strophe entière se reprend. Tout l\'élan vient de la levée de trois croches.',
    tips: [
      'La levée (Mi, La, Si) revient avant chaque phrase : joue-la légère, elle pousse vers le Do.',
      'Sur « ciao ciao ciao », garde les Mi aigus bien égaux : basse de La au premier temps, puis la corde à vide fait tout le travail.',
      'Fa puis Mi sur la corde 1 : le doigt 1 se lève juste au moment où le Mi doit sonner.',
    ],
    check: 'E3 A3 B3 C4 A3 E3 A3 B3 C4 A3 E3 A3 B3 C4 B3 A3 C4 B3 A3 E4 E4 E4 E4 D4 E4 F4 F4 F4 E4 D4 F4 E4 E4 D4 C4 B3 E4 C4 B3 A3 E3 A3 B3 A3',
    form: [0, 1, 2, 1, 3],
    sections: [
      { name: 'Levée', bars: `!p e 4.2 3.2 2.0` },
      { name: 'Strophe', bars: `[Am] e 5.0+2.1 h 3.2 e 4.2 3.2 2.0 | e 5.0+2.1 h 3.2 e 4.2 3.2 2.0 | q 5.0+2.1 e 2.0 3.2 q 2.1 e 2.0 3.2 | q 5.0+1.0 1.0 e 1.0 1.0 2.3 1.0 |
        [Dm] e 4.0+1.1 h 1.1 e 1.1 1.0 2.3 | e 1.1 [Am] h 5.0+1.0 e 1.0 2.3 2.1 | [E] q 6.0+2.0 1.0 2.1 2.0` },
      { name: 'Retour', bars: `[Am] h 5.0+3.2 e r 4.2 3.2 2.0` },
      { name: 'Fin', bars: `[Am] w 5.0+3.2` },
    ],
  });

  add({
    id: 'rising-sun', title: 'The House of the Rising Sun', composer: 'Traditionnel américain',
    genre: 'folk', key: 'La mineur', time: '6/8', tempo: 96,
    pima: true, techniques: ['arpège', 'p-i-m-a', '6/8', 'enchaînement d\'accords'], chords: ['Am', 'C', 'D', 'F', 'E'],
    desc: 'L\'arpège que tous les guitaristes ont appris un jour, sur un couplet complet. Pas de mélodie ici : c\'est l\'accompagnement, à toi de chanter par-dessus.',
    tips: [
      'Le motif p-i-m-a-m-i ne change jamais : installe-le sur le La mineur seul avant de changer d\'accord.',
      'Le pouce change de corde selon l\'accord : corde 5 pour Am et C, corde 4 pour D et F, corde 6 pour E.',
      'Le Fa est joué en petit barré (doigt 1 sur les cordes 1 et 2, case 1), sans la corde 6 : pas besoin du grand barré du dictionnaire.',
      'Change d\'accord sur le dernier i, pas après : la basse suivante doit tomber pile sur le temps.',
    ],
    sections: [
      { name: 'Couplet', bars: `[Am] e 5.0 3.2 2.1 1.0 2.1 3.2 | [C] e 5.3 3.0 2.1 1.0 2.1 3.0 | [D] e 4.0 3.2 2.3 1.2 2.3 3.2 | [F] e 4.3 3.2 2.1 1.1 2.1 3.2 |
        [Am] e 5.0 3.2 2.1 1.0 2.1 3.2 | [C] e 5.3 3.0 2.1 1.0 2.1 3.0 | [E] e 6.0 3.1 2.0 1.0 2.0 3.1 | [E] e 6.0 3.1 2.0 1.0 2.0 3.1 |
        [Am] e 5.0 3.2 2.1 1.0 2.1 3.2 | [C] e 5.3 3.0 2.1 1.0 2.1 3.0 | [D] e 4.0 3.2 2.3 1.2 2.3 3.2 | [F] e 4.3 3.2 2.1 1.1 2.1 3.2 |
        [Am] e 5.0 3.2 2.1 1.0 2.1 3.2 | [E] e 6.0 3.1 2.0 1.0 2.0 3.1 | [Am] e 5.0 3.2 2.1 1.0 2.1 3.2 | [E] e 6.0 3.1 2.0 1.0 2.0 3.1` },
      { name: 'Accord final', bars: `[Am] h. 5.0+3.2+2.1+1.0` },
    ],
  });
})();
