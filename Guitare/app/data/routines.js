/* Routines de pratique. Format : voir tools/FORMAT_TAB.md, section 3. */
(function (root) {
  const GS = root.GS = root.GS || {};
  GS.data = GS.data || {};
  GS.data.routines = GS.data.routines || [];

  // ---------------------------------------------------------------- 5 minutes
  GS.data.routines.push({
    id: 'express-matin', title: 'Express du matin', subtitle: 'Cinq minutes avant le café, et la journée démarre en musique.', icon: '☕',
    goal: 'equilibre', level: 'debutant', minutes: 5,
    steps: [
      { ex: 'warmup-reveil', min: 1, note: 'Très lent, juste pour sentir les cordes sous les doigts.' },
      { ex: 'em-am-switch', min: 2, note: 'Commence à bouger sur le temps 4, pour arriver à l\'heure.' },
      { free: 'Morceau au choix', hint: 'Joue ce que tu aimes, sans chercher à corriger.', min: 2 },
    ],
  });
  GS.data.routines.push({
    id: 'pause-arpege', title: 'La Pause arpège', subtitle: 'Une respiration aux doigts entre deux tâches.', icon: '🍃',
    goal: 'arpeges', level: 'debutant', minutes: 5,
    steps: [
      { ex: 'pima-open', min: 2, note: 'Écoute si les trois doigts sonnent au même volume.' },
      { ex: 'arp-pim', min: 2 },
      { free: 'Morceau au choix', hint: 'Une petite phrase arpégée, le plus doucement possible.', min: 1 },
    ],
  });
  GS.data.routines.push({
    id: 'reveil-5', title: 'Cinq doigts réveillés', subtitle: 'L\'échauffement minimum, pour toutes les autres séances.', icon: '🌅',
    goal: 'echauffement', level: 'debutant', minutes: 5,
    steps: [
      { ex: 'warmup-reveil', min: 2, note: 'Relâche les épaules à chaque changement de mesure.' },
      { ex: 'spider-1234', min: 2, note: 'Sous le tempo de départ si les doigts sont froids.' },
      { free: 'Morceau au choix', hint: 'Une minute de plaisir, sur les notes qui te viennent.', min: 1 },
    ],
  });
  GS.data.routines.push({
    id: 'etincelle-flamenca', title: 'Étincelle flamenca', subtitle: 'Cinq minutes de duende quand l\'envie te prend.', icon: '🔥',
    goal: 'flamenco', level: 'intermediaire', minutes: 5,
    steps: [
      { ex: 'warmup-reveil', min: 1 },
      { ex: 'rasgueado-4', min: 2, note: 'Écoute surtout si le e et le a sont aussi présents que le m et le i.' },
      { free: 'Morceau au choix', hint: 'Un air qui balance, avec un rasgueado à la fin de la phrase.', min: 2 },
    ],
  });
  GS.data.routines.push({
    id: 'coup-de-fouet', title: 'Coup de fouet', subtitle: 'Cinq minutes pour remettre le moteur en route.', icon: '⚡',
    goal: 'vitesse', level: 'expert', minutes: 5,
    steps: [
      { ex: 'spider-1234', min: 1, note: 'Une minute au tempo cible, mains relâchées.' },
      { ex: 'picado-scale', min: 2, note: 'Deux passages sous ton record, un seul à ton record.' },
      { free: 'Morceau au choix', hint: 'La course que tu as dans le doigt, à plein tempo.', min: 2 },
    ],
  });

  // ---------------------------------------------------------------- 10 minutes
  GS.data.routines.push({
    id: 'doigts-eveil', title: 'Les Doigts en éveil', subtitle: 'Un programme court pour une main gauche plus autonome.', icon: '🕷️',
    goal: 'dexterite', level: 'debutant', minutes: 10,
    steps: [
      { ex: 'warmup-reveil', min: 2 },
      { ex: 'spider-1234', min: 2, note: 'Garde les doigts posés après leur note, aussi longtemps que possible.' },
      { ex: 'legato-hammer', min: 2, note: 'La note frappée doit sonner presque aussi fort que la note attaquée.' },
      { ex: 'scale-am-natural', min: 2, note: 'Un doigt par case : la main gauche reste en place, seuls les doigts bougent.' },
      { free: 'Morceau au choix', hint: 'Un passage où ta main gauche doit se déplacer : observe le progrès.', min: 2 },
    ],
  });
  GS.data.routines.push({
    id: 'bascule-accords', title: 'La Bascule des accords', subtitle: 'Moins de trous entre les accords, en dix minutes.', icon: '🎚️',
    goal: 'accords', level: 'debutant', minutes: 10,
    steps: [
      { ex: 'open-strings-rest', min: 2 },
      { ex: 'em-am-switch', min: 2, note: 'Essaie une fois les yeux fermés.' },
      { ex: 'c-g-switch', min: 2, note: 'La basse d\'abord, le reste de la main suit.' },
      { ex: 'g-d-em-c-switch', min: 2, note: 'Ne t\'arrête pas si l\'accord n\'est pas prêt : le rythme commande.' },
      { free: 'Morceau au choix', hint: 'Une chanson avec ces accords, au tempo où aucun trou ne s\'entend.', min: 2 },
    ],
  });
  GS.data.routines.push({
    id: 'metronome-ami', title: 'Le Métronome, ton ami', subtitle: 'Pour poser enfin le temps à sa place.', icon: '⏱️',
    goal: 'rythme', level: 'debutant', minutes: 10,
    steps: [
      { ex: 'pima-open', min: 2 },
      { ex: 'rhythm-subdiv', min: 3, note: 'Tape le temps au pied : il ne bouge pas quand les notes se resserrent.' },
      { ex: 'strum-basic-44', min: 3, note: 'Compte « 1 et 2 et 3 et 4 et » à voix haute.' },
      { free: 'Morceau au choix', hint: 'Un morceau simple, avec le métronome, sans ralentir aux passages durs.', min: 2 },
    ],
  });
  GS.data.routines.push({
    id: 'premieres-couleurs', title: 'Premières couleurs d\'Espagne', subtitle: 'Le son andalou, dès les premiers mois.', icon: '🌹',
    goal: 'flamenco', level: 'debutant', minutes: 10,
    steps: [
      { ex: 'pima-open', min: 2 },
      { ex: 'scale-phrygian-e', min: 2, note: 'Écoute le demi-ton Mi - Fa : il donne toute la couleur.' },
      { ex: 'cadence-andalouse-arp', min: 2, note: 'Fais chanter la basse qui descend : La, Sol, Fa, Mi.' },
      { ex: 'prog-am-dm-e7', min: 2, note: 'Le pouce marque le temps 1, les deux accords restent légers.' },
      { free: 'Morceau au choix', hint: 'Un air espagnol, ou improvise sur ces quatre accords.', min: 2 },
    ],
  });
  GS.data.routines.push({
    id: 'rafale', title: 'La Rafale', subtitle: 'Dix minutes de vitesse propre.', icon: '🚀',
    goal: 'vitesse', level: 'intermediaire', minutes: 10,
    steps: [
      { ex: 'spider-1234', min: 2, note: 'Un tempo confortable, le relâchement d\'abord.' },
      { ex: 'picado-im', min: 3, note: 'Monte de 4 BPM à chaque passage réussi, redescends dès que le son se crispe.' },
      { ex: 'spider-permutations', min: 3, note: 'Reste sous ta limite : ce sont les trois derniers passages propres qui comptent.' },
      { free: 'Morceau au choix', hint: 'Un passage rapide, joué 10 BPM sous le tempo final.', min: 2 },
    ],
  });
  GS.data.routines.push({
    id: 'mise-en-doigts', title: 'Mise en doigts du concertiste', subtitle: 'Avant de jouer ce qui compte vraiment.', icon: '🎩',
    goal: 'echauffement', level: 'expert', minutes: 10,
    steps: [
      { ex: 'warmup-reveil', min: 2 },
      { ex: 'spider-permutations', min: 2, note: 'Tempo moyen, attention portée au silence des doigts.' },
      { ex: 'spider-stretch', min: 2, note: 'Ouvre doucement, ne force pas l\'écart à froid.' },
      { ex: 'tremolo-pami', min: 2, note: 'Sous-tempo, à la recherche de l\'égalité parfaite.' },
      { free: 'Morceau au choix', hint: 'L\'ouverture de ta pièce, comme si le public venait d\'arriver.', min: 2 },
    ],
  });

  // ---------------------------------------------------------------- 15 minutes
  GS.data.routines.push({
    id: 'rendez-vous-quotidien', title: 'Le Rendez-vous quotidien', subtitle: 'Un peu de tout, tous les jours : c\'est ainsi qu\'on progresse.', icon: '📅',
    goal: 'equilibre', level: 'debutant', minutes: 15,
    steps: [
      { ex: 'warmup-reveil', min: 2 },
      { ex: 'spider-1234', min: 2 },
      { ex: 'prog-em-c-g-d', min: 3, note: 'Trouve la basse de chaque accord sans regarder la main droite.' },
      { ex: 'pima-mirror', min: 3, note: 'La dernière note de l\'arpège aussi bien attaquée que la première.' },
      { ex: 'scale-c-pos1', min: 2, note: 'Nomme les notes à voix haute.' },
      { free: 'Morceau au choix', hint: 'Ton morceau en cours : un passage, lentement, jusqu\'à ce qu\'il tienne.', min: 3 },
    ],
  });
  GS.data.routines.push({
    id: 'atelier-main-droite', title: 'L\'Atelier de la main droite', subtitle: 'Quatre doigts, un seul son.', icon: '🖐️',
    goal: 'arpeges', level: 'debutant', minutes: 15,
    steps: [
      { ex: 'pima-open', min: 2 },
      { ex: 'thumb-bass', min: 2, note: 'Le pouce seul : un son rond et égal sur les trois cordes.' },
      { ex: 'thumb-alternate', min: 2, note: 'Un balancement de marche, parfaitement régulier.' },
      { ex: 'arp-pami', min: 3, note: 'Un petit accent sur l\'annulaire, le temps qu\'il prenne de la force.' },
      { ex: 'arp-6-8', min: 3, note: 'Sens deux grands temps par mesure, pas six notes.' },
      { free: 'Morceau au choix', hint: 'Une pièce arpégée : écoute si la mélodie sort au-dessus.', min: 3 },
    ],
  });
  GS.data.routines.push({
    id: 'petit-repertoire', title: 'Le Petit Répertoire', subtitle: 'Un quart d\'heure pour jouer, tout simplement.', icon: '🎵',
    goal: 'morceaux', level: 'debutant', minutes: 15,
    steps: [
      { ex: 'warmup-reveil', min: 2 },
      { ex: 'sight-reading-1', min: 3, note: 'Une seule lecture sans t\'arrêter, puis une seconde en corrigeant.' },
      { free: 'Passage difficile', hint: 'Choisis deux mesures de ton morceau, joue-les lentement, cinq fois de suite.', min: 4 },
      { free: 'Morceau au choix', hint: 'Joue-le du début à la fin, sans revenir en arrière.', min: 6 },
    ],
  });
  GS.data.routines.push({
    id: 'long-reveil', title: 'Le Long Réveil', subtitle: 'Prendre le temps avant une longue séance.', icon: '🧘',
    goal: 'echauffement', level: 'intermediaire', minutes: 15,
    steps: [
      { ex: 'warmup-reveil', min: 3 },
      { ex: 'open-strings-rest', min: 2, note: 'Cherche le plus beau son possible, sans main gauche pour te distraire.' },
      { ex: 'pima-mirror', min: 2 },
      { ex: 'spider-permutations', min: 3, note: 'À mi-tempo seulement : tu échauffes, tu ne performes pas.' },
      { ex: 'harmonics-12-7-5', min: 2, note: 'Une pause d\'écoute : laisse chaque harmonique s\'éteindre seule.' },
      { free: 'Morceau au choix', hint: 'Une pièce lente que tu connais par cœur.', min: 3 },
    ],
  });
  GS.data.routines.push({
    id: 'legato-soie', title: 'Légato de soie', subtitle: 'Faire chanter la main gauche, sans la droite.', icon: '🧵',
    goal: 'dexterite', level: 'intermediaire', minutes: 15,
    steps: [
      { ex: 'spider-1234', min: 2 },
      { ex: 'legato-hammer', min: 3, note: 'Marteau précis, pas plus haut qu\'un centimètre.' },
      { ex: 'legato-pull', min: 3, note: 'Tire vers le sol, en accrochant un peu la corde.' },
      { ex: 'legato-trill', min: 3, note: 'Un trille lent et égal vaut mieux qu\'un trille rapide et bancal.' },
      { ex: 'slide-shift', min: 2 },
      { free: 'Morceau au choix', hint: 'Un passage où tu peux remplacer deux attaques par une liaison.', min: 2 },
    ],
  });
  GS.data.routines.push({
    id: 'grille-groove', title: 'Grille et groove', subtitle: 'Mettre du balancement dans la main droite.', icon: '🥁',
    goal: 'rythme', level: 'intermediaire', minutes: 15,
    steps: [
      { ex: 'warmup-reveil', min: 2 },
      { ex: 'muting-clean', min: 2, note: 'Le silence tombe pile sur le temps : c\'est lui qui fait le groove.' },
      { ex: 'strum-pop-44', min: 3, note: 'Le bras ne s\'arrête jamais, même dans le coup à vide.' },
      { ex: 'strum-valse-34', min: 3, note: 'Un temps lourd, deux temps légers.' },
      { ex: 'rumba-flamenca', min: 3, note: 'Tu dois pouvoir taper du pied sans y penser.' },
      { free: 'Morceau au choix', hint: 'Accompagne une chanson avec le groove que tu préfères.', min: 2 },
    ],
  });

  // ---------------------------------------------------------------- 20 minutes
  GS.data.routines.push({
    id: 'forge-arpeges', title: 'La Forge des arpèges', subtitle: 'Forge une main droite de guitariste classique.', icon: '⚒️',
    goal: 'arpeges', level: 'intermediaire', minutes: 20,
    steps: [
      { ex: 'pima-open', min: 2 },
      { ex: 'pima-mirror', min: 2 },
      { ex: 'arp-pami', min: 3, note: 'Pense à un seul geste, comme si la main se refermait.' },
      { ex: 'giuliani-c', min: 4, note: 'Vise un son léger et régulier, de boîte à musique.' },
      { ex: 'travis-c-g', min: 4, note: 'Pouce seul d\'abord, pendant 30 secondes, puis ajoute les doigts.' },
      { ex: 'arp-plaque', min: 2, note: 'Les quatre doigts partent à la même seconde.' },
      { free: 'Morceau au choix', hint: 'Applique un de ces arpèges à une grille de ton choix.', min: 3 },
    ],
  });
  GS.data.routines.push({
    id: 'camp-barre', title: 'Le Camp de base du barré', subtitle: 'Vingt minutes pour ne plus craindre le Fa.', icon: '🏔️',
    goal: 'accords', level: 'intermediaire', minutes: 20,
    steps: [
      { ex: 'warmup-reveil', min: 2 },
      { ex: 'spider-stretch', min: 3 },
      { ex: 'barre-half', min: 4, note: 'Relâche la pression pendant les glissés.' },
      { ex: 'barre-f', min: 4, note: 'Secoue la main chaque minute : le barré fatigue vite, ne force pas.' },
      { ex: 'prog-bm-g-d-a', min: 4, note: 'Prépare le barré avec le coude, juste avant le temps.' },
      { free: 'Morceau au choix', hint: 'Une chanson avec un barré, même si tu ralentis un peu.', min: 3 },
    ],
  });
  GS.data.routines.push({
    id: 'tablao', title: 'Le Tablao', subtitle: 'La séance des nuits sans sommeil, de Séville à Cadix.', icon: '💃',
    goal: 'flamenco', level: 'intermediaire', minutes: 20,
    steps: [
      { ex: 'warmup-reveil', min: 2 },
      { ex: 'pulgar-bass', min: 3, note: 'Le pouce se pose sur la corde suivante : le son doit être plein.' },
      { ex: 'rasgueado-4', min: 4 },
      { ex: 'golpe-basic', min: 3, note: 'Une frappe sèche, avec le bout du doigt, sans déplacer la main.' },
      { ex: 'rumba-flamenca', min: 5, note: 'Les temps 2 et 4 claquent : tout le monde doit pouvoir danser.' },
      { free: 'Morceau au choix', hint: 'Une pièce espagnole, avec un rasgueado ou un golpe glissé dedans.', min: 3 },
    ],
  });
  GS.data.routines.push({
    id: 'salon-tarrega', title: 'Le Salon de Tárrega', subtitle: 'Soigner le son comme dans un salon du XIXe siècle.', icon: '🕯️',
    goal: 'morceaux', level: 'intermediaire', minutes: 20,
    steps: [
      { ex: 'spider-1234', min: 2 },
      { ex: 'tirando-apoyando', min: 3 },
      { ex: 'vibrato-long', min: 3, note: 'D\'abord la note, puis l\'onde : ne vibre jamais dès l\'attaque.' },
      { ex: 'dynamics-arpeggio', min: 4, note: 'Exagère les nuances : ce qui te semble trop est à peine audible.' },
      { free: 'Morceau au choix', hint: 'Une pièce classique : ajoute-lui un vibrato et un crescendo que tu avais oubliés.', min: 8 },
    ],
  });
  GS.data.routines.push({
    id: 'turbo-picado', title: 'Turbo Picado', subtitle: 'Vers les courses qui font lever la salle.', icon: '🏎️',
    goal: 'vitesse', level: 'expert', minutes: 20,
    steps: [
      { ex: 'open-strings-rest', min: 2, note: 'Cherche déjà le son du picado, sans main gauche pour te distraire.' },
      { ex: 'spider-permutations', min: 4 },
      { ex: 'picado-im', min: 4, note: 'Toujours en apoyando, la main droite immobile.' },
      { ex: 'picado-scale', min: 5, note: 'Palier de 4 BPM, trois passages propres avant de monter.' },
      { ex: 'scale-g-2oct', min: 3, note: 'Dernier tour à ton record, puis un autre tout doux, pour redescendre.' },
      { free: 'Morceau au choix', hint: 'La falseta qui te résiste, au tempo juste en dessous de ta limite.', min: 2 },
    ],
  });

  // ---------------------------------------------------------------- 30 minutes
  GS.data.routines.push({
    id: 'tour-manche', title: 'Le Tour du manche', subtitle: 'La vraie demi-heure du débutant motivé.', icon: '🧭',
    goal: 'equilibre', level: 'debutant', minutes: 30,
    steps: [
      { ex: 'warmup-reveil', min: 3 },
      { ex: 'spider-1234', min: 3 },
      { ex: 'd-a-switch', min: 3, note: 'L\'annulaire reste sur la corde de Si : c\'est ton guide.' },
      { ex: 'c-g-switch', min: 3, note: 'Une minute au tempo où tout passe, puis une minute un peu au-dessus.' },
      { ex: 'prog-c-am-f-g', min: 4, note: 'Le bras va et vient sans arrêt, même quand il ne touche pas les cordes.' },
      { ex: 'pima-mirror', min: 3 },
      { ex: 'scale-penta-am', min: 3, note: 'Une fois en place, joue-la dans le désordre : tu improvises déjà.' },
      { ex: 'sight-reading-1', min: 3, note: 'Pas d\'arrêt, même si une note te manque.' },
      { free: 'Morceau au choix', hint: 'Ton morceau en cours : d\'abord un passage isolé, puis le tout.', min: 5 },
    ],
  });
  GS.data.routines.push({
    id: 'grand-rendez-vous', title: 'Le Grand Rendez-vous', subtitle: 'Toutes les familles techniques, en une demi-heure.', icon: '🎯',
    goal: 'equilibre', level: 'intermediaire', minutes: 30,
    steps: [
      { ex: 'open-strings-rest', min: 3 },
      { ex: 'spider-permutations', min: 4 },
      { ex: 'barre-f', min: 4 },
      { ex: 'arp-6-8', min: 4 },
      { ex: 'legato-trill', min: 3 },
      { ex: 'scale-g-2oct', min: 4, note: 'Coupe chaque note au moment où la suivante part.' },
      { ex: 'vibrato-long', min: 3 },
      { free: 'Morceau au choix', hint: 'Une pièce où tu utilises au moins deux techniques de la séance.', min: 5 },
    ],
  });
  GS.data.routines.push({
    id: 'main-de-fer', title: 'La Main droite de fer', subtitle: 'Une demi-heure d\'exigence pour le trémolo et les pincés.', icon: '🛡️',
    goal: 'arpeges', level: 'expert', minutes: 30,
    steps: [
      { ex: 'pima-open', min: 3 },
      { ex: 'giuliani-triolet', min: 5, note: 'Ne laisse pas le retour m-i accélérer.' },
      { ex: 'giuliani-pinch', min: 5, note: 'Fais chanter l\'annulaire au-dessus de tout le reste.' },
      { ex: 'dynamics-arpeggio', min: 5, note: 'Le même crescendo avec une main parfaitement relâchée.' },
      { ex: 'tremolo-pami', min: 7, note: 'Long-court, puis court-long, puis égal. Un seul son à l\'arrivée.' },
      { free: 'Morceau au choix', hint: 'Recuerdos, ou le trémolo de ton choix, à tempo réduit.', min: 5 },
    ],
  });
  GS.data.routines.push({
    id: 'soiree-grenade', title: 'Soirée à Grenade', subtitle: 'Le crépuscule sur l\'Alhambra, la guitare sur le genou.', icon: '🏰',
    goal: 'flamenco', level: 'intermediaire', minutes: 30,
    steps: [
      { ex: 'warmup-reveil', min: 3 },
      { ex: 'scale-phrygian-e', min: 4, note: 'En apoyando, le son tranché d\'une falseta.' },
      { ex: 'cadence-andalouse-arp', min: 4 },
      { ex: 'pulgar-bass', min: 4 },
      { ex: 'rasgueado-4', min: 5, note: 'Commence par une main fermée, puis déplie un doigt à la fois.' },
      { ex: 'rumba-flamenca', min: 5 },
      { free: 'Morceau au choix', hint: 'Une pièce andalouse, à jouer comme si la nuit tombait.', min: 5 },
    ],
  });
  GS.data.routines.push({
    id: 'repertoire-loupe', title: 'Le Répertoire à la loupe', subtitle: 'La séance des pièces qui demandent un vrai travail.', icon: '🔍',
    goal: 'morceaux', level: 'expert', minutes: 30,
    steps: [
      { ex: 'spider-1234', min: 3 },
      { ex: 'dynamics-arpeggio', min: 4 },
      { ex: 'vibrato-long', min: 3 },
      { free: 'Passage difficile', hint: 'Trois mesures seulement, à la moitié du tempo. Trouve d\'abord le doigté qui ne te fatiguera pas.', min: 8 },
      { free: 'Morceau au choix', hint: 'Joue toute la pièce comme un concert : pas d\'arrêt, attention à la fin des phrases.', min: 12 },
    ],
  });

  // ---------------------------------------------------------------- 45 minutes
  GS.data.routines.push({
    id: 'grand-voyage', title: 'Le Grand Voyage', subtitle: 'Trois quarts d\'heure de route, du classique jusqu\'à l\'Andalousie.', icon: '🗺️',
    goal: 'equilibre', level: 'intermediaire', minutes: 45,
    steps: [
      { ex: 'warmup-reveil', min: 3 },
      { ex: 'spider-permutations', min: 4 },
      { ex: 'prog-bm-g-d-a', min: 5 },
      { ex: 'scale-thirds-c', min: 4, note: 'Les deux doigts voyagent ensemble, le pouce gauche les accompagne.' },
      { ex: 'giuliani-c', min: 5 },
      { ex: 'scale-am-harmonic', min: 4, note: 'Chante la seconde augmentée Fa - Sol dièse avant de la jouer.' },
      { ex: 'legato-trill', min: 4 },
      { ex: 'strum-pop-44', min: 3, note: 'Une pause pour le corps : joue debout si tu peux.' },
      { ex: 'cadence-andalouse-arp', min: 4 },
      { ex: 'vibrato-long', min: 3 },
      { free: 'Morceau au choix', hint: 'Termine sur une pièce que tu aimes vraiment : c\'est elle qui te fera revenir demain.', min: 6 },
    ],
  });
  GS.data.routines.push({
    id: 'nuit-jerez', title: 'Nuit à Jerez', subtitle: 'La grande séance flamenca, du compás aux falsetas.', icon: '🌙',
    goal: 'flamenco', level: 'expert', minutes: 45,
    steps: [
      { ex: 'warmup-reveil', min: 3 },
      { ex: 'pulgar-bass', min: 4 },
      { ex: 'compas-soleares', min: 5, note: 'Compte les 12 temps à voix haute, jusqu\'à ce qu\'ils tournent seuls.' },
      { ex: 'rasgueado-4', min: 4 },
      { ex: 'rasgueado-triplet', min: 5, note: 'L\'abanico d\'abord lent, avec une rotation souple du poignet.' },
      { ex: 'alzapua-basic', min: 5, note: 'Ne brosse que les cordes aiguës, pense à une clé qu\'on tourne.' },
      { ex: 'picado-scale', min: 5 },
      { ex: 'tremolo-pami', min: 5, note: 'Après la force, retour à la délicatesse.' },
      { ex: 'rumba-flamenca', min: 4 },
      { free: 'Morceau au choix', hint: 'Une soleá ou une pièce flamenca, avec ton compás bien dans le corps.', min: 5 },
    ],
  });
  GS.data.routines.push({
    id: 'recital-maison', title: 'Le Récital à la maison', subtitle: 'Préparer ses pièces, puis les jouer pour de vrai.', icon: '🎭',
    goal: 'morceaux', level: 'intermediaire', minutes: 45,
    steps: [
      { ex: 'warmup-reveil', min: 3 },
      { ex: 'spider-1234', min: 3 },
      { ex: 'melody-bass-c', min: 4, note: 'Fais passer la voix du haut devant : prépare déjà l\'oreille.' },
      { ex: 'dynamics-arpeggio', min: 4 },
      { free: 'Passage difficile', hint: 'Isole la mesure qui fait trébucher, puis ajoute une mesure avant et une après.', min: 8 },
      { free: 'Morceau en cours', hint: 'Une lecture lente et attentive, puis une lecture à tempo.', min: 10 },
      { free: 'Un ancien morceau', hint: 'Reprends une pièce oubliée : la mémoire revient vite, et le plaisir aussi.', min: 5 },
      { free: 'Morceau au choix', hint: 'Enregistre-toi, comme si c\'était un concert, et écoute-toi ensuite sans te juger.', min: 8 },
    ],
  });
})(typeof window !== 'undefined' ? window : globalThis);
