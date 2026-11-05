/* Grilles d'accords de morceaux sous droits : accords, rythmique et conseils uniquement (ni paroles, ni tablature).
 * Chaque accord d'une grille vaut une mesure, sauf indication contraire dans les conseils. */
(function () {
  const chart = (id, title, composer, level, key, time, tempo, capo, strum, progressions, desc, tips, search) => GS.data.songs.push({
    id, type: 'chart', title, composer, level, genre: 'populaire', key, time, tempo, capo,
    chords: [...new Set(progressions.flatMap((p) => p.chords.split(/\s+/)))],
    strum, desc, tips, progressions,
    link: 'https://www.songsterr.com/?pattern=' + encodeURIComponent(search),
  });

  chart('knockin', "Knockin' on Heaven's Door", 'Bob Dylan', 'debutant', 'Sol majeur', '4/4', 68, 0, 'B - B H - H B H',
    [{ name: 'Tout le morceau', chords: 'G D Am Am G D C C' }],
    'Quatre accords, tempo lent, une grille en boucle du début à la fin : la première chanson complète idéale.',
    ['Prépare le Am pendant la dernière croche du Ré : les doigts bougent presque ensemble.', 'Joue doux, au pouce ou avec le dos des ongles : sur du nylon, le médiator n\'apporte rien ici.', 'Garde le poignet souple : c\'est lui qui balance, pas le bras.'],
    'knockin on heavens door');

  chart('stand-by-me', 'Stand by Me', 'Ben E. King', 'debutant', 'La majeur (formes de Sol, capo 2)', '4/4', 118, 2, 'B - B H - H B H',
    [{ name: 'Tout le morceau', chords: 'G G Em Em C D G G' }],
    'La grille « années 50 » la plus célèbre. Elle se joue partout, et t\'ouvre des dizaines d\'autres chansons bâties pareil.',
    ['Sans capo, en Sol, le morceau marche très bien pour jouer seul ; le capo 2 te met au ton du disque.', 'Essaie de jouer la célèbre ligne de basse au pouce sur les temps forts, sans gratter.', 'La main droite reste en mouvement même sur les silences : elle passe sans toucher.'],
    'stand by me');

  chart('let-it-be', 'Let It Be', 'The Beatles', 'debutant', 'Do majeur', '4/4', 76, 0, 'B - B H - H B H',
    [{ name: 'Couplet', chords: 'C G Am F C G F C' }, { name: 'Refrain', chords: 'Am G F C C G F C' }],
    'Quatre accords au programme, le Fa est le seul vrai obstacle : le morceau idéal pour le travailler sans s\'ennuyer.',
    ['Si le Fa barré résiste, joue Fmaj7 à la place : ça sonne très bien dans ce contexte.', 'Ici, chaque accord écrit vaut deux temps, comme sur le disque : la ligne tient en quatre mesures.', 'Passe en arpège p-i-m-a sur le couplet pour vraiment l\'entendre sur une guitare classique.'],
    'let it be');

  chart('hallelujah', 'Hallelujah', 'Leonard Cohen', 'intermediaire', 'Do majeur', '6/8', 84, 0, 'B - B H B H',
    [{ name: 'Couplet', chords: 'C Am C Am F G C G C F G Am F G E7 Am' }, { name: 'Refrain', chords: 'F Am F C G C G' }],
    'Une grille plus longue que les autres, en 6/8, très agréable en arpèges sur du nylon.',
    ['Compte deux grands temps par mesure, pas six.', 'L\'arpège p-i-m-a-m-i convient parfaitement et cache très bien les changements.', 'Sur le E7, laisse bien entendre le Sol♯ : c\'est lui qui fait tout basculer vers le La mineur.'],
    'hallelujah leonard cohen');

  chart('hotel-california', 'Hotel California', 'Eagles', 'intermediaire', 'Si mineur (formes de La mineur, capo 2)', '4/4', 74, 2, 'B - H - B H - H',
    [{ name: 'Couplet', chords: 'Am E G D F C Dm E' }, { name: 'Refrain', chords: 'F C E Am F C Dm E' }],
    'Une descente célèbre : avec le capo 2, ces formes ouvertes sonnent au ton du disque.',
    ['Écoute le disque pour la pulsation : elle est lente mais très marquée, façon reggae léger.', 'Le capo 2 donne Si mineur, le ton du disque.', 'Sans capo, tu joues simplement la grille en La mineur, plus grave.'],
    'hotel california');

  chart('zombie', 'Zombie', 'The Cranberries', 'debutant', 'Mi mineur', '4/4', 84, 0, 'B - B H - H B H',
    [{ name: 'Tout le morceau', chords: 'Em C G D' }],
    'Quatre accords ouverts qui tournent sans arrêt : un excellent exercice de changements nets.',
    ['Marque fortement le premier temps de chaque mesure.', 'Essaie le Ré avec le Fa♯ à la basse (D/F#) quand les changements seront acquis.', 'Pour le côté rock sur guitare classique, joue près du chevalet.'],
    'zombie cranberries');

  chart('horse-no-name', 'A Horse with No Name', 'America', 'debutant', 'Mi mineur', '4/4', 122, 0, 'B - B H - H B H',
    [{ name: 'Tout le morceau', chords: 'Em D Em D' }],
    'Deux accords, un seul mouvement de main : une chanson entière dans laquelle te concentrer uniquement sur le rythme.',
    ['Pour le son du disque, le second accord n\'est pas un Ré classique : pose le doigt 1 en case 2 de la corde 6 et le doigt 2 en case 2 de la corde 3 (forme 200200), et laisse tout le reste à vide.', 'Chaque accord dure une mesure : ne te précipite pas.', 'La régularité de la main droite est tout le morceau.'],
    'a horse with no name');

  chart('sweet-home-alabama', 'Sweet Home Alabama', 'Lynyrd Skynyrd', 'debutant', 'Sol majeur (mixolydien)', '4/4', 98, 0, 'B - B H - H B H',
    [{ name: 'Tout le morceau', chords: 'D C G G' }],
    'La boucle sudiste par excellence. Trois accords, et le plaisir de jouer avec un vrai groove.',
    ['Ici, chaque accord écrit vaut deux temps : Ré, Do, puis Sol sur quatre temps. La boucle tient donc en deux mesures.', 'Le riff du disque est sous droits : garde ici la version en accords, mais écoute-le pour le groove.', 'Laisse les cordes résonner, sans étouffer entre les accords.'],
    'sweet home alabama');

  chart('wonderwall', 'Wonderwall', 'Oasis', 'intermediaire', 'Fa♯ mineur (formes de Mi mineur, capo 2)', '4/4', 87, 2, 'B - B H - H B H',
    [{ name: 'Couplet', chords: 'Em7 G Dsus4 Asus4' }, { name: 'Pré-refrain', chords: 'Cadd9 Dsus4 Em7 Em7 Cadd9 Dsus4 Asus4 Asus4' }, { name: 'Refrain', chords: 'Cadd9 Em7 G Em7 Cadd9 Em7 G Em7' }],
    'Un classique de feu de camp : les annulaire et auriculaire restent posés d\'un accord à l\'autre, c\'est ce qui fait son son.',
    ['Pour le son du disque : garde les doigts 3 et 4 sur les cases 3 des cordes 1 et 2 sur Em7, G, Dsus4 et sur le La (x02033, qui est un A7sus4 ; l\'appli affiche Asus4, voisin et plus simple).', 'Le capo 2 te place au ton du disque ; sans capo, le morceau reste juste si tu joues seul.', 'Les doubles du disque sont serrées : commence avec cette rythmique en croches et accélère ensuite.'],
    'wonderwall');

  chart('wish-you-were-here', 'Wish You Were Here', 'Pink Floyd', 'intermediaire', 'Sol majeur', '4/4', 62, 0, 'B - B H - H B H',
    [{ name: 'Intro', chords: 'Em7 G Em7 G Em7 Asus4 Em7 Asus4 G G' }, { name: 'Couplet', chords: 'C D Am G D C Am G' }],
    'Une ballade parfaite pour le nylon. L\'intro et le couplet n\'ont pas le même caractère : à toi de faire entendre la différence.',
    ['Sur le disque, le La est un A7sus4 (x02033), très voisin de l\'Asus4 du dictionnaire ; utilise celui que tu préfères.', 'Le célèbre riff d\'intro est sous droits : écoute-le à part, puis cherche-le à l\'oreille.', 'Joue doucement, pouce et index seulement.'],
    'wish you were here pink floyd');

  chart('perfect', 'Perfect', 'Ed Sheeran', 'debutant', 'La♭ majeur (formes de Sol, capo 1)', '6/8', 95, 1, 'B - B H B H',
    [{ name: 'Couplet', chords: 'G Em C D G Em C D' }, { name: 'Refrain', chords: 'Em C G D Em C D D' }],
    'Une valse lente moderne : les accords les plus simples, avec un balancement à deux grands temps.',
    ['Compte « UN-deux-trois, DEUX-deux-trois » : six croches, deux grands temps.', 'Le capo 1 t\'aligne sur le disque ; sans capo, le résultat reste agréable seul.', 'Arpège p-i-m-a sur le couplet, grattage léger sur le refrain : le morceau grandit tout seul.'],
    'perfect ed sheeran');

  chart('riptide', 'Riptide', 'Vance Joy', 'debutant', 'Si♭ mineur (formes de Am, capo 1)', '4/4', 102, 1, 'B - B H - H B H',
    [{ name: 'Couplet et refrain', chords: 'Am G C C' }],
    'Trois accords en boucle : le morceau qui fait aimer le grattage dès la première semaine.',
    ['La main droite ne s\'arrête jamais, c\'est le secret du morceau.', 'Le pont du disque comporte un accord de plus (Fa) ; tu peux rester sur cette boucle pour commencer.', 'Sans capo, c\'est tout aussi agréable si tu joues seul.'],
    'riptide vance joy');

  chart('no-woman-no-cry', 'No Woman, No Cry', 'Bob Marley', 'debutant', 'Do majeur', '4/4', 78, 0, '- H - H - H - H',
    [{ name: 'Tout le morceau', chords: 'C G Am F C F C G' }],
    'Le reggae par excellence, et une leçon de contretemps : la main droite accentue ce que personne ne joue d\'habitude.',
    ['Chaque accord écrit vaut deux temps. Joue seulement sur les contretemps, en coups vers le haut : c\'est tout le style reggae.', 'Étouffe les cordes avec la paume sur les temps, pour que le contretemps ressorte.', 'Si le Fa résiste, Fmaj7 convient très bien ici aussi.'],
    'no woman no cry');

  chart('la-bamba', 'La Bamba', 'Traditionnel, version Ritchie Valens', 'debutant', 'Do majeur', '4/4', 140, 0, 'B - B H - H B H',
    [{ name: 'Tout le morceau', chords: 'C F G G' }],
    'Trois accords en boucle à bonne vitesse : l\'exercice le plus festif pour accélérer tes changements.',
    ['Chaque accord écrit vaut deux temps. Commence à la moitié du tempo, puis monte progressivement.', 'Fmaj7 peut remplacer le Fa tant que le barré n\'est pas acquis.', 'Une fois à l\'aise, essaie un coup de pouce sur le premier temps, à la façon du rasgueado.'],
    'la bamba');

  chart('penitencier', 'Le Pénitencier', 'Johnny Hallyday (adaptation de The House of the Rising Sun)', 'debutant', 'La mineur', '6/8', 96, 0, 'B - B H B H',
    [{ name: 'Couplet', chords: 'Am C D F Am C E E Am C D F Am E Am Am' }],
    'L\'adaptation française de « The House of the Rising Sun », sur la même grille. L\'arpège de cette pièce, dans les morceaux débutants, s\'applique tel quel.',
    ['Arpège p-i-m-a-m-i, une mesure par accord.', 'Fa en petit barré (cordes 1 et 2) : inutile de barrer les six cordes.', 'Monte en puissance à chaque couplet : c\'est tout le drame de cette chanson.'],
    'le penitencier johnny hallyday');

  chart('champs-elysees', 'Les Champs-Élysées', 'Joe Dassin', 'intermediaire', 'Sol majeur', '4/4', 116, 0, 'B - B H - H B H',
    [{ name: 'Couplet', chords: 'G B7 Em G7 C G A7 D7' }, { name: 'Refrain', chords: 'G B7 Em G7 C G D7 G' }],
    'Une grille plus riche, pleine de septièmes qui s\'enchaînent : un très bon apprentissage de la logique des accords.',
    ['Le B7 est le passage difficile : travaille Sol vers Si 7 seul, lentement.', 'Le dernier couple d\'accords de la ligne peut durer deux temps chacun : écoute le disque pour placer les changements.', 'Compare toujours à un enregistrement : c\'est une grille de travail, à ajuster à l\'oreille.'],
    'les champs elysees joe dassin');

  chart('imagine', 'Imagine', 'John Lennon', 'debutant', 'Do majeur', '4/4', 76, 0, 'B - B H - H B H',
    [{ name: 'Couplet', chords: 'C Cmaj7 F F C Cmaj7 F F' }, { name: 'Pont', chords: 'F Am Dm F G G G7 G7' }, { name: 'Refrain', chords: 'F G C E7 F G C E7' }],
    'Une chanson pensée au piano, qui passe très bien sur une guitare classique en arpèges doux.',
    ['Do vers Cmaj7 : un seul doigt se lève, c\'est le plus simple des enchaînements.', 'Le Fa barré peut céder la place à Fmaj7 sur le couplet : ça s\'entend à peine.', 'Pouce sur le temps, puis arpège court i-m : on retrouve le rebond du piano.'],
    'imagine john lennon');

  chart('hey-jude', 'Hey Jude', 'The Beatles', 'intermediaire', 'Fa majeur', '4/4', 74, 0, 'B - B H - H B H',
    [{ name: 'Couplet', chords: 'F C C7 F Bb F C F' }, { name: 'Final', chords: 'F Eb Bb F' }],
    'Un bon défi de barrés en Fa, avec un final qui peut durer aussi longtemps que tu veux.',
    ['Les barrés Fa, Si♭ et Mi♭ te demanderont de la force : monte le capo pour t\'alléger la tâche, puis descends-le.', 'Le final est une boucle : idéal pour installer ton endurance.', 'Écoute le disque pour placer les changements à l\'intérieur des mesures.'],
    'hey jude');

  chart('creep', 'Creep', 'Radiohead', 'intermediaire', 'Sol majeur', '4/4', 92, 0, 'B - B H - H B H',
    [{ name: 'Tout le morceau', chords: 'G B C Cm' }],
    'Quatre accords, mais deux barrés qui s\'enchaînent : la plus belle des raisons de travailler le Si et le Do mineur.',
    ['Do vers Do mineur : un seul doigt bouge si tu joues le Do en barré case 3.', 'Le passage Sol vers Si est le plus dur : anticipe-le dès le troisième temps.', 'Alterne un couplet très doux et un refrain franc, le morceau existe par ce contraste.'],
    'creep radiohead');

  chart('with-or-without-you', 'With or Without You', 'U2', 'intermediaire', 'Ré majeur', '4/4', 110, 0, 'B - - H B - - H',
    [{ name: 'Tout le morceau', chords: 'D A Bm G' }],
    'Une seule boucle, un seul barré (Si mineur) : toute la musicalité passe par la nuance.',
    ['Commence presque sans son, puis monte très progressivement sur toute la chanson.', 'Le Si mineur en barré reste le seul obstacle : prends-le en petit barré sur les quatre cordes aiguës pour commencer.', 'Essaie la boucle en arpèges : elle y gagne beaucoup sur du nylon.'],
    'with or without you');

  chart('dust-in-the-wind', 'Dust in the Wind', 'Kansas', 'intermediaire', 'Mi♭ majeur (formes de Do, capo 3)', '4/4', 88, 3, 'B - H - B - H -',
    [{ name: 'Intro', chords: 'C Cmaj7 Cadd9 C Asus2 Asus4 Am Asus2' }, { name: 'Couplet', chords: 'C G/B Am G Dm7 Am' }],
    'Un classique du picking folk, à jouer en arpèges plutôt que gratté : la rythmique indiquée ne sert qu\'à poser le tempo.',
    ['Le motif de doigts reste identique sur toute la pièce : automatise-le sur un seul accord.', 'Dans l\'intro, l\'accord de base ne bouge pas : seuls un ou deux doigts se posent et se lèvent, comme une petite mélodie.', 'Le relevé note à note est sous droits : écoute le disque et cherche à l\'oreille.'],
    'dust in the wind kansas');

  chart('brown-eyed-girl', 'Brown Eyed Girl', 'Van Morrison', 'debutant', 'Sol majeur', '4/4', 150, 0, 'B - B H - H B H',
    [{ name: 'Couplet', chords: 'G C G D' }, { name: 'Refrain', chords: 'C D G Em C D G D' }],
    'L\'énergie d\'un tube des années 60 avec seulement quatre accords ouverts.',
    ['Commence nettement plus lentement que le disque : c\'est un morceau très rapide.', 'Chaque accord dure une mesure, et les changements arrivent vite : prépare-les dès la dernière croche.', 'Ne cherche pas à jouer fort : la vitesse donne déjà l\'énergie.'],
    'brown eyed girl');

  chart('have-you-ever-seen', 'Have You Ever Seen the Rain', 'Creedence Clearwater Revival', 'debutant', 'Do majeur', '4/4', 116, 0, 'B - B H - H B H',
    [{ name: 'Couplet', chords: 'C C C G C C' }, { name: 'Refrain', chords: 'F G C Am F G C C' }],
    'Un rock simple et efficace, avec un refrain qui te fait enfin travailler le Fa dans un vrai contexte.',
    ['Fmaj7 convient très bien pour démarrer, garde le barré pour plus tard.', 'Marque les temps 2 et 4 : le morceau prend tout de suite son allure rock.', 'Les changements du couplet sont rares : profites-en pour bien installer ta rythmique.'],
    'have you ever seen the rain');

  chart('bad-moon-rising', 'Bad Moon Rising', 'Creedence Clearwater Revival', 'debutant', 'Ré majeur', '4/4', 178, 0, 'B - B H - H B H',
    [{ name: 'Couplet', chords: 'D A G D' }, { name: 'Refrain', chords: 'G D A G D D' }],
    'Trois accords ouverts à toute allure : la grille idéale pour accélérer tes changements en restant propre.',
    ['Commence à 100 et monte par paliers : le tempo du disque est très rapide.', 'La et Sol durent souvent la moitié d\'une mesure dans le couplet : ajoute ce détail à l\'oreille une fois à l\'aise.', 'Garde le grattage petit : l\'amplitude ralentit la main droite.'],
    'bad moon rising');
})();
