/* Exercices techniques. Format : voir tools/FORMAT_TAB.md, section 3. */
(function (root) {
  const GS = root.GS = root.GS || {};
  GS.data = GS.data || {};
  GS.data.exercises = GS.data.exercises || [];

  // ---------------------------------------------------------------- Échauffement
  GS.data.exercises.push({
    id: 'warmup-reveil', title: 'Le réveil des doigts',
    cat: 'echauffement', level: 'debutant', time: '4/4', bpm: 50, bpmTarget: 70, pima: false,
    chords: ['Em', 'Am'],
    desc: 'Une mise en route très douce : cordes à vide, petite montée chromatique, deux accords. À faire avant tout le reste, surtout les doigts froids.',
    tips: [
      'Secoue les mains et fais rouler les épaules avant de commencer : l\'échauffement part du dos, pas des doigts.',
      'Reste sous le tempo cible : ici, le seul objectif est que chaque note sorte sans effort.',
      'Si une douleur apparaît au poignet ou au pouce, arrête-toi et desserre, ne pousse jamais à travers.',
    ],
    bars: `q 6.0 5.0 4.0 3.0 | 2.0 1.0 2.0 3.0 | e 1.1'1 1.2'2 1.3'3 1.4'4 2.4'4 2.3'3 2.2'2 2.1'1 | h [Em] @Em:D [Am] @Am:D`,
  });
  GS.data.exercises.push({
    id: 'open-strings-rest', title: 'Cordes à vide en apoyando',
    cat: 'echauffement', level: 'debutant', time: '4/4', bpm: 60, bpmTarget: 100, pima: true,
    desc: 'L\'alternance index-majeur en butée (apoyando), sans main gauche : tout le travail porte sur le son et la régularité de la main droite.',
    tips: [
      'Après l\'attaque, le doigt vient se poser sur la corde voisine : c\'est cette butée qui donne un son plein.',
      'Le poignet reste immobile, le mouvement part de l\'articulation à la base du doigt.',
      'Écoute si l\'index et le majeur ont le même volume : le majeur, plus long, prend vite le dessus.',
    ],
    bars: `q 1.0"i 1.0"m 1.0"i 1.0"m | 2.0"i 2.0"m 2.0"i 2.0"m | 3.0"i 3.0"m 3.0"i 3.0"m | e 2.0"i 2.0"m 2.0"i 2.0"m 2.0"i 2.0"m 2.0"i 2.0"m`,
  });
  GS.data.exercises.push({
    id: 'pima-open', title: 'P-i-m-a sur cordes à vide',
    cat: 'echauffement', level: 'debutant', time: '4/4', bpm: 60, bpmTarget: 120, pima: true,
    desc: 'Le geste de base de la main droite : le pouce change de basse, les trois doigts restent sur leurs cordes (i sur Sol, m sur Si, a sur Mi).',
    tips: [
      'Les doigts tirent vers la paume, ils ne soulèvent pas la corde : un petit cercle, pas un crochet.',
      'Le pouce part en avant, vers le bas, sans jamais croiser l\'index.',
      'Garde les doigts posés près de leur corde pour réduire le trajet : plus le geste est petit, plus il ira vite.',
    ],
    bars: `e 6.0 3.0 2.0 1.0 6.0 3.0 2.0 1.0 | 5.0 3.0 2.0 1.0 5.0 3.0 2.0 1.0 | 4.0 3.0 2.0 1.0 4.0 3.0 2.0 1.0 | 5.0 3.0 2.0 1.0 5.0 3.0 2.0 1.0`,
  });

  // ---------------------------------------------------------------- Main gauche
  GS.data.exercises.push({
    id: 'spider-1234', title: 'La chenille 1-2-3-4',
    cat: 'maingauche', level: 'debutant', time: '4/4', bpm: 50, bpmTarget: 110, pima: false,
    desc: 'Un doigt par case sur les six cordes, à l\'aller puis au retour. Le grand classique pour gagner en indépendance et placer la main gauche.',
    tips: [
      'Garde les doigts posés le plus longtemps possible et tout près des cordes : le petit doigt a tendance à s\'envoler, surveille-le.',
      'Appuie juste derrière la frette, avec le minimum de force qui donne un son net.',
      'Si la case 1 tire trop, joue tout quatre cases plus haut : les cases sont plus étroites et le geste reste le même.',
    ],
    bars: `e 6.1'1 6.2'2 6.3'3 6.4'4 5.1 5.2 5.3 5.4 | 4.1 4.2 4.3 4.4 3.1 3.2 3.3 3.4 | 2.1 2.2 2.3 2.4 1.1 1.2 1.3 1.4 | 1.4 1.3 1.2 1.1 2.4 2.3 2.2 2.1 | 3.4 3.3 3.2 3.1 4.4 4.3 4.2 4.1 | 5.4 5.3 5.2 5.1 6.4 6.3 6.2 6.1`,
  });
  GS.data.exercises.push({
    id: 'spider-permutations', title: 'La chenille mélangée',
    cat: 'maingauche', level: 'intermediaire', time: '4/4', bpm: 50, bpmTarget: 100, pima: false,
    desc: 'Les mêmes quatre doigts en position V, mais dans un ordre qui casse les automatismes : 1-3-2-4, 2-4-1-3 et 1-4-2-3.',
    tips: [
      'Le passage 3-2 et le couple 4-2 demandent le plus d\'attention : isole-les si un doigt traîne ou si la note étouffe.',
      'Alterne i et m à la main droite sans jamais répéter le même doigt.',
      'Monte le tempo de 4 BPM seulement quand tu réussis trois passages propres d\'affilée.',
    ],
    bars: `s 6.5 6.7 6.6 6.8 5.5 5.7 5.6 5.8 4.5 4.7 4.6 4.8 3.5 3.7 3.6 3.8 | 2.5 2.7 2.6 2.8 1.5 1.7 1.6 1.8 1.6 1.8 1.5 1.7 2.6 2.8 2.5 2.7 | 3.6 3.8 3.5 3.7 4.6 4.8 4.5 4.7 5.6 5.8 5.5 5.7 6.6 6.8 6.5 6.7 | 6.5 6.8 6.6 6.7 5.5 5.8 5.6 5.7 5.5 5.8 5.6 5.7 6.5 6.8 6.6 6.7`,
  });
  GS.data.exercises.push({
    id: 'spider-stretch', title: 'La chenille écartée',
    cat: 'maingauche', level: 'intermediaire', time: '4/4', bpm: 50, bpmTarget: 84, pima: false,
    desc: 'On ouvre la main en position VII, un écart à la fois : entre 1 et 2, entre 2 et 3, entre 3 et 4, puis deux écarts d\'un coup.',
    tips: [
      'L\'écart vient de la main qui s\'ouvre et du coude qui revient vers le corps, pas de doigts qu\'on tire.',
      'Une tension qui chauffe, c\'est bon ; une douleur vive à la base du pouce, c\'est stop : remonte de deux cases.',
      'Le pouce reste souple derrière le manche, il ne serre pas pour aider les doigts.',
    ],
    bars: `e 5.7'1 5.9'2 5.10'3 5.11'4 4.7'1 4.9'2 4.10'3 4.11'4 | 3.7'1 3.8'2 3.10'3 3.11'4 2.7'1 2.8'2 2.10'3 2.11'4 | 2.7'1 2.8'2 2.9'3 2.11'4 3.7'1 3.8'2 3.9'3 3.11'4 | 4.7'1 4.9'2 4.10'3 4.12'4 5.7'1 5.9'2 5.10'3 5.12'4`,
  });
  GS.data.exercises.push({
    id: 'barre-half', title: 'Le demi-barré descendant',
    cat: 'maingauche', level: 'intermediaire', time: '3/4', bpm: 50, bpmTarget: 90, pima: true,
    desc: 'La cadence andalouse jouée en demi-barrés : case V pour La mineur, case III pour Sol, case I pour Fa, puis Mi à vide. L\'index ne couvre que deux ou trois cordes.',
    tips: [
      'Pose l\'index à plat, légèrement tourné sur le côté osseux, et ne barre que les cordes utiles.',
      'Relâche la pression au moment de glisser d\'une case à l\'autre, puis réappuie à l\'arrivée.',
      'Fais sonner chaque corde seule : l\'arpège trahit tout de suite la corde qui étouffe.',
    ],
    bars: `e [Am] {½CV} 5.0 3.5 2.5 1.5 2.5 3.5 | [G] {½CIII} 4.0 3.4 2.3 1.3 2.3 3.4 | [F] {½CI} 4.3 3.2 2.1 1.1 2.1 3.2 | [E] 6.0 3.1 2.0 1.0 2.0 3.1`,
  });
  GS.data.exercises.push({
    id: 'barre-f', title: 'Le barré de Fa',
    cat: 'maingauche', level: 'intermediaire', time: '4/4', bpm: 50, bpmTarget: 90, pima: false,
    chords: ['F', 'C'],
    desc: 'On vérifie d\'abord chaque corde du Fa barré en arpège, puis on le gratte et on l\'enchaîne avec Do : le changement que tout le monde redoute.',
    tips: [
      'Place l\'index tout près de la frette et tourne-le légèrement vers le côté : la partie osseuse barre mieux que la pulpe.',
      'La force vient du poids du bras qui tire vers toi, pas du pouce qui écrase le manche.',
      'Si une corde frise, ne serre pas plus : déplace l\'index d\'un millimètre, c\'est presque toujours une question de placement.',
    ],
    bars: `e [F] 6.1 5.3 4.3 3.2 2.1 1.1 2.1 3.2 | q @F:D @F:D @F:D @F:D | [C] @C:D @C:D @C:D @C:D | h [F] @F:D [C] @C:D`,
  });

  // ---------------------------------------------------------------- Main droite
  GS.data.exercises.push({
    id: 'pima-mirror', title: 'Le miroir p-i-m-a-m-i',
    cat: 'maindroite', level: 'debutant', time: '3/4', bpm: 60, bpmTarget: 120, pima: true,
    desc: 'L\'arpège monte puis redescend, sur cordes à vide : la cellule la plus courante de tout le répertoire classique.',
    tips: [
      'Au retour, le majeur et l\'index attaquent aussi fort qu\'à l\'aller : écoute la dernière note, c\'est celle qu\'on oublie.',
      'Pense la mesure comme un seul geste de vague, pas comme six notes séparées.',
      'Laisse sonner toutes les cordes : aucun doigt ne doit se reposer sur une corde qui vient de sonner.',
    ],
    bars: `e 6.0 3.0 2.0 1.0 2.0 3.0 | 5.0 3.0 2.0 1.0 2.0 3.0 | 4.0 3.0 2.0 1.0 2.0 3.0 | 5.0 3.0 2.0 1.0 2.0 3.0`,
  });
  GS.data.exercises.push({
    id: 'thumb-bass', title: 'Le pouce seul',
    cat: 'maindroite', level: 'debutant', time: '4/4', bpm: 60, bpmTarget: 110, pima: true,
    desc: 'Le pouce voyage entre les trois basses à vide. C\'est lui qui porte le rythme dans tout le fingerstyle : il doit devenir autonome.',
    tips: [
      'Le pouce frappe avec le côté, près de l\'ongle, et part vers le bas : il ne remonte pas en crochet vers la paume.',
      'Pose les doigts i-m-a sur les trois cordes aiguës : ils servent de point d\'appui et stabilisent la main.',
      'Cherche un son rond et égal sur les trois cordes, la corde de Ré sonne souvent plus faible.',
    ],
    bars: `q 6.0 5.0 4.0 5.0 | 6.0 6.0 5.0 5.0 | 4.0 4.0 5.0 6.0 | e 6.0 6.0 5.0 5.0 4.0 4.0 5.0 5.0`,
  });
  GS.data.exercises.push({
    id: 'thumb-alternate', title: 'Basse alternée au pouce',
    cat: 'maindroite', level: 'debutant', time: '4/4', bpm: 60, bpmTarget: 110, pima: true,
    chords: ['C', 'G', 'Am', 'Em'],
    desc: 'Le pouce alterne la fondamentale et une autre basse de chaque accord. C\'est le moteur du Travis picking et de nombreuses pièces de fingerstyle.',
    tips: [
      'Garde la forme entière de l\'accord en main gauche, même si tu ne joues que les basses.',
      'Vérifie que tu changes bien de corde : la fondamentale d\'abord, l\'autre basse ensuite, jamais l\'inverse.',
      'Vise un balancement de marche, un pas à gauche, un pas à droite, parfaitement régulier.',
    ],
    bars: `q [C] 5.3 4.2 5.3 4.2 | [G] 6.3 4.0 6.3 4.0 | [Am] 5.0 4.2 5.0 4.2 | [Em] 6.0 4.2 6.0 4.2`,
  });
  GS.data.exercises.push({
    id: 'tirando-apoyando', title: 'Tirando et apoyando',
    cat: 'maindroite', level: 'debutant', time: '4/4', bpm: 60, bpmTarget: 110, pima: true,
    desc: 'La même petite phrase jouée deux fois tirando (le doigt passe au-dessus de la corde voisine) puis deux fois apoyando (il se pose dessus). Compare les deux couleurs.',
    tips: [
      'Tirando : le doigt repart vers la paume sans toucher la corde voisine. Apoyando : il s\'arrête sur elle.',
      'L\'apoyando donne un son plus plein, à réserver aux mélodies qu\'on veut mettre en avant.',
      'Le doigté i-m est choisi pour que le passage de corde reste naturel : le majeur, plus long, attaque la corde la plus aiguë.',
    ],
    bars: `e {tirando} 2.1"m 2.3"i 1.0"m 1.1"i 1.3"m 1.1"i 1.0"m 2.3"i | 2.1"m 2.3"i 1.0"m 1.1"i 1.3"m 1.1"i 1.0"m 2.3"i | {apoyando} 2.1"m 2.3"i 1.0"m 1.1"i 1.3"m 1.1"i 1.0"m 2.3"i | 2.1"m 2.3"i 1.0"m 1.1"i 1.3"m 1.1"i 1.0"m 2.3"i`,
  });
  GS.data.exercises.push({
    id: 'muting-clean', title: 'Couper le son proprement',
    cat: 'maindroite', level: 'intermediaire', time: '4/4', bpm: 60, bpmTarget: 100, pima: false,
    chords: ['Em'],
    desc: 'Chaque note est suivie d\'un étouffement net (×) : un doigt ou la paume se pose sur la corde. Savoir faire taire les basses, c\'est ce qui rend un jeu propre.',
    tips: [
      'Le pouce revient simplement se poser sur la corde qu\'il vient de jouer : c\'est le geste le plus économique.',
      'Pour l\'accord, pose le tranchant de la main droite sur toutes les cordes, sans frapper.',
      'Écoute le silence, il doit tomber pile sur le temps, exactement comme une note.',
    ],
    bars: `q 6.0 {étouffe} 6.x 5.0 5.x | 4.0 4.x 5.0 5.x | e 6.0 6.x 5.0 5.x 4.0 4.x 5.0 5.x | q [Em] @Em:D {paume} 6.x+5.x+4.x+3.x+2.x+1.x @Em:D 6.x+5.x+4.x+3.x+2.x+1.x`,
  });

  // ---------------------------------------------------------------- Accords
  GS.data.exercises.push({
    id: 'em-am-switch', title: 'Le passage Mi mineur - La mineur',
    cat: 'accords', level: 'debutant', time: '4/4', bpm: 60, bpmTarget: 100, pima: false,
    chords: ['Em', 'Am'],
    desc: 'Le premier changement à maîtriser. Quatre temps par accord, puis deux : le temps de préparation diminue, la main apprend à anticiper.',
    tips: [
      'Le majeur et l\'annulaire gardent la même forme : descends-les d\'une corde vers l\'aigu, puis ajoute l\'index.',
      'Commence à bouger sur le dernier temps de la mesure : arriver à l\'heure, c\'est partir en avance.',
      'Regarde ta main gauche au début, puis essaie de faire le changement les yeux fermés.',
    ],
    bars: `q [Em] @Em:D @Em:D @Em:D @Em:D | [Am] @Am:D @Am:D @Am:D @Am:D | h [Em] @Em:D [Am] @Am:D | [Em] @Em:D [Am] @Am:D`,
  });
  GS.data.exercises.push({
    id: 'c-g-switch', title: 'Le passage Do - Sol',
    cat: 'accords', level: 'debutant', time: '4/4', bpm: 50, bpmTarget: 90, pima: false,
    chords: ['C', 'G'],
    desc: 'Un passage où toute la main se déplace. On réduit peu à peu le temps entre les changements : quatre temps, puis deux, puis un seul.',
    tips: [
      'Pose d\'abord la basse (annulaire en Do, majeur en Sol), le reste suit : la basse est ce qu\'on entend en premier.',
      'Ne lève pas les doigts haut : ils restent à un centimètre des cordes pendant le trajet.',
      'En Do, évite la corde 6 ; en Sol, joue les six cordes. Ta main droite doit le savoir aussi.',
    ],
    bars: `q [C] @C:D @C:D @C:D @C:D | [G] @G:D @G:D @G:D @G:D | [C] @C:D @C:D [G] @G:D @G:D | [C] @C:D [G] @G:D [C] @C:D [G] @G:D`,
  });
  GS.data.exercises.push({
    id: 'd-a-switch', title: 'Le passage Ré - La',
    cat: 'accords', level: 'debutant', time: '4/4', bpm: 60, bpmTarget: 100, pima: false,
    chords: ['D', 'A'],
    desc: 'Deux accords serrés qui s\'enchaînent sans cesse en tonalité de Ré et de La. Le même plan : quatre temps, puis deux, puis un.',
    tips: [
      'L\'annulaire reste sur la corde de Si et glisse simplement de la case 3 à la case 2 : c\'est ton guide.',
      'En La, les trois doigts sont serrés dans une seule case : place-les en biais pour qu\'ils tiennent.',
      'En Ré, ne gratte que quatre cordes : commence le mouvement à la corde de Ré.',
    ],
    bars: `q [D] @D:D @D:D @D:D @D:D | [A] @A:D @A:D @A:D @A:D | [D] @D:D @D:D [A] @A:D @A:D | [D] @D:D [A] @A:D [D] @D:D [A] @A:D`,
  });
  GS.data.exercises.push({
    id: 'g-d-em-c-switch', title: 'La grille Sol - Ré - Mi mineur - Do',
    cat: 'accords', level: 'debutant', time: '4/4', bpm: 60, bpmTarget: 100, pima: false,
    chords: ['G', 'D', 'Em', 'C'],
    desc: 'La grille de milliers de chansons, à quatre accords. Quand elle tourne sans à-coups, tu as de quoi accompagner beaucoup de monde.',
    tips: [
      'Repère le changement qui te ralentit (souvent Do vers Sol) et travaille-le seul pendant une minute.',
      'Garde la main droite en mouvement régulier, même si l\'accord n\'est pas encore prêt : c\'est le rythme qui commande.',
      'Chante le nom de l\'accord suivant juste avant de le jouer, cela aide à anticiper.',
    ],
    bars: `q [G] @G:D @G:D @G:D @G:D | [D] @D:D @D:D @D:D @D:D | [Em] @Em:D @Em:D @Em:D @Em:D | [C] @C:D @C:D @C:D @C:D`,
  });
  GS.data.exercises.push({
    id: 'prog-c-am-f-g', title: 'La grille des années 50',
    cat: 'accords', level: 'debutant', time: '4/4', bpm: 60, bpmTarget: 100, pima: false,
    chords: ['C', 'Am', 'Fmaj7', 'G'],
    desc: 'Do, La mineur, Fa, Sol, la suite des ballades. Le Fa est joué ici en Fa majeur 7, sans barré, pour se concentrer sur l\'enchaînement.',
    tips: [
      'De Do à La mineur, seul l\'annulaire bouge, de la corde 5 à la corde 3 : le majeur et l\'index restent en place.',
      'Le schéma de grattage est bas - bas haut - bas - bas haut : le bras va et vient tout le temps, même sans toucher les cordes.',
      'Accentue doucement les temps 2 et 4 pour faire balancer la grille.',
    ],
    bars: `q [C] @C:D e @C:D @C:U q @C:D e @C:D @C:U | q [Am] @Am:D e @Am:D @Am:U q @Am:D e @Am:D @Am:U | q [Fmaj7] @Fmaj7:D e @Fmaj7:D @Fmaj7:U q @Fmaj7:D e @Fmaj7:D @Fmaj7:U | q [G] @G:D e @G:D @G:U q @G:D e @G:D @G:U`,
  });
  GS.data.exercises.push({
    id: 'prog-em-c-g-d', title: 'La grille Mi mineur en arpège',
    cat: 'accords', level: 'debutant', time: '4/4', bpm: 60, bpmTarget: 100, pima: true,
    chords: ['Em', 'C', 'G', 'D'],
    desc: 'Mi mineur, Do, Sol, Ré joués aux doigts. La basse change à chaque mesure : le pouce doit trouver la bonne corde sans que tu la regardes.',
    tips: [
      'Repère la basse de chaque accord avant de commencer : corde 6, corde 5, corde 6, corde 4.',
      'Maintiens tout l\'accord posé jusqu\'au dernier instant pour que l\'arpège résonne.',
      'Pense le changement dans la dernière croche de la mesure, pas après le temps 1.',
    ],
    bars: `e [Em] 6.0 3.0 2.0 1.0 2.0 3.0 2.0 3.0 | [C] 5.3 3.0 2.1 1.0 2.1 3.0 2.1 3.0 | [G] 6.3 3.0 2.0 1.3 2.0 3.0 2.0 3.0 | [D] 4.0 3.2 2.3 1.2 2.3 3.2 2.3 3.2`,
  });
  GS.data.exercises.push({
    id: 'prog-am-dm-e7', title: 'La romance La mineur',
    cat: 'accords', level: 'debutant', time: '3/4', bpm: 66, bpmTarget: 110, pima: false,
    chords: ['Am', 'Dm', 'E7'],
    desc: 'La mineur, Ré mineur, Mi 7, le cœur harmonique de la musique espagnole traditionnelle. Basse au pouce, deux accords grattés : une valse lente.',
    tips: [
      'Le pouce joue une seule basse, bien distincte : La, Ré, Mi. Elle doit porter davantage que l\'accord.',
      'Le Mi 7 se résout sur La mineur : mets un peu de tension dans la mesure 3 et laisse-la se poser à la mesure 4.',
      'Gratte avec l\'ongle de l\'index ou du pouce, à l\'endroit où le son te semble le plus chaud : au-dessus de la rosace.',
    ],
    bars: `q [Am] 5.0 @Am:D @Am:D | [Dm] 4.0 @Dm:D @Dm:D | [E7] 6.0 @E7:D @E7:D | [Am] 5.0 e @Am:D @Am:U @Am:D @Am:U`,
  });
  GS.data.exercises.push({
    id: 'prog-bm-g-d-a', title: 'La grille avec barré de Si mineur',
    cat: 'accords', level: 'intermediaire', time: '4/4', bpm: 56, bpmTarget: 100, pima: false,
    chords: ['Bm', 'G', 'D', 'A'],
    desc: 'Si mineur, Sol, Ré, La : un barré court entouré d\'accords ouverts. On apprend à poser et à quitter le barré sans perdre le rythme.',
    tips: [
      'Prépare le barré une fraction de seconde avant, en amenant la main avec le coude.',
      'Dans la forme de Si mineur, l\'index barre à la case 2 et n\'a à bien sonner que sur les cordes 5 et 1 : les autres sont couvertes par les doigts.',
      'Si le changement Si mineur vers Sol décroche, joue-le seul en boucle pendant une minute à la moitié du tempo.',
    ],
    bars: `q [Bm] @Bm:D e @Bm:D q @Bm:U e @Bm:U @Bm:D @Bm:U | q [G] @G:D e @G:D q @G:U e @G:U @G:D @G:U | q [D] @D:D e @D:D q @D:U e @D:U @D:D @D:U | q [A] @A:D e @A:D q @A:U e @A:U @A:D @A:U`,
  });

  // ---------------------------------------------------------------- Rythme
  GS.data.exercises.push({
    id: 'strum-basic-44', title: 'Premier grattage en 4/4',
    cat: 'rythme', level: 'debutant', time: '4/4', bpm: 60, bpmTarget: 100, pima: false,
    chords: ['Em', 'Am'],
    desc: 'D\'abord uniquement vers le bas sur les noires, puis bas-haut sur les croches : le bras ne s\'arrête jamais, il suit un balancier.',
    tips: [
      'Le mouvement vient de l\'avant-bras et du poignet, comme si tu secouais de l\'eau sur tes doigts.',
      'Vers le bas sur les temps, vers le haut entre les temps : garde cette règle, elle ne change jamais.',
      'Compte à voix haute « 1 et 2 et 3 et 4 et » pendant la deuxième partie.',
    ],
    bars: `q [Em] @Em:D @Em:D @Em:D @Em:D | [Am] @Am:D @Am:D @Am:D @Am:D | e [Em] @Em:D @Em:U @Em:D @Em:U @Em:D @Em:U @Em:D @Em:U | [Am] @Am:D @Am:U @Am:D @Am:U @Am:D @Am:U @Am:D @Am:U`,
  });
  GS.data.exercises.push({
    id: 'strum-pop-44', title: 'Le grattage pop',
    cat: 'rythme', level: 'debutant', time: '4/4', bpm: 70, bpmTarget: 110, pima: false,
    chords: ['G', 'D', 'Em', 'C'],
    desc: 'Le schéma bas - bas haut - haut bas haut, qu\'on entend partout. Il se joue sur le balancier des croches, avec un coup dans le vide sur le temps 3.',
    tips: [
      'Le bras passe devant les cordes sur le temps 3 sans les toucher : surtout ne t\'arrête pas pour autant.',
      'Dis-le à voix haute : « bas, bas-haut, haut-bas-haut ». Le rythme se mémorise dans la bouche avant de passer dans la main.',
      'Accentue légèrement le temps 2, c\'est là que naît le groove.',
    ],
    bars: `q [G] {B . B H . H B H} @G:D e @G:D q @G:U e @G:U @G:D @G:U | q [D] @D:D e @D:D q @D:U e @D:U @D:D @D:U | q [Em] @Em:D e @Em:D q @Em:U e @Em:U @Em:D @Em:U | q [C] @C:D e @C:D q @C:U e @C:U @C:D @C:U`,
  });
  GS.data.exercises.push({
    id: 'strum-valse-34', title: 'La valse en 3/4',
    cat: 'rythme', level: 'debutant', time: '3/4', bpm: 70, bpmTarget: 120, pima: false,
    chords: ['C', 'Dm', 'G7'],
    desc: 'Une basse au pouce, deux accords : un - deux - trois, le balancement de la valse. La dernière mesure ajoute des croches pour relancer la phrase.',
    tips: [
      'Le temps 1 est le plus lourd, les temps 2 et 3 sont légers, presque en l\'air.',
      'Trouve la bonne basse à chaque changement : corde 5, puis corde 4, puis corde 6.',
      'Balance doucement le corps en comptant : la valse se sent avant de se jouer.',
    ],
    bars: `q [C] 5.3 @C:D @C:D | [Dm] 4.0 @Dm:D @Dm:D | [G7] 6.3 @G7:D @G7:D | [C] 5.3 e @C:D @C:U @C:D @C:U`,
  });
  GS.data.exercises.push({
    id: 'rhythm-subdiv', title: 'L\'échelle des subdivisions',
    cat: 'rythme', level: 'debutant', time: '4/4', bpm: 60, bpmTarget: 90, pima: true,
    desc: 'Noires, croches, triolets, doubles sur une seule note. Tu passes de 1 à 4 notes par temps sans jamais changer la pulsation.',
    tips: [
      'Le passage des croches aux triolets est le plus piégeux : compte « 1-2-3 » par temps, sans accélérer.',
      'Tape le temps avec le pied. Il ne bouge pas, quoi qu\'il arrive dans les doigts.',
      'Enregistre-toi avec le métronome : l\'oreille entend mieux les décalages à la réécoute qu\'en jouant.',
    ],
    bars: `q {noires} 1.0"i 1.0"m 1.0"i 1.0"m | e {croches} 1.0"i 1.0"m 1.0"i 1.0"m 1.0"i 1.0"m 1.0"i 1.0"m | t {triolets} 1.0"i 1.0"m 1.0"i 1.0"m 1.0"i 1.0"m 1.0"i 1.0"m 1.0"i 1.0"m 1.0"i 1.0"m | s {doubles} 1.0"i 1.0"m 1.0"i 1.0"m 1.0"i 1.0"m 1.0"i 1.0"m 1.0"i 1.0"m 1.0"i 1.0"m 1.0"i 1.0"m 1.0"i 1.0"m`,
  });

  // ---------------------------------------------------------------- Arpèges
  GS.data.exercises.push({
    id: 'arp-pim', title: 'Les trois doigts p-i-m',
    cat: 'arpeges', level: 'debutant', time: '3/4', bpm: 60, bpmTarget: 110, pima: true,
    chords: ['C', 'G', 'Am', 'Em'],
    desc: 'L\'arpège le plus simple sur de vrais accords : une basse, puis l\'index et le majeur en alternance. Idéal pour enchaîner les changements sans penser à l\'annulaire.',
    tips: [
      'L\'index et le majeur tirent vers la paume, sans bouger la main : seuls les doigts travaillent.',
      'Le pouce change de corde à chaque accord, regarde-le une fois puis laisse-le faire tout seul.',
      'Garde une sonorité égale : la basse se distingue, les autres notes restent douces.',
    ],
    bars: `e [C] 5.3 3.0 2.1 3.0 2.1 3.0 | [G] 6.3 3.0 2.0 3.0 2.0 3.0 | [Am] 5.0 3.2 2.1 3.2 2.1 3.2 | [Em] 6.0 3.0 2.0 3.0 2.0 3.0`,
  });
  GS.data.exercises.push({
    id: 'arp-pami', title: 'L\'arpège p-a-m-i',
    cat: 'arpeges', level: 'debutant', time: '4/4', bpm: 60, bpmTarget: 120, pima: true,
    chords: ['Am', 'Dm', 'E'],
    desc: 'L\'arpège qui descend, de l\'annulaire vers l\'index. C\'est aussi le mouvement du trémolo : l\'annulaire y gagne de la force.',
    tips: [
      'L\'annulaire est le doigt faible : donne-lui un léger accent pour l\'équilibrer avec les autres.',
      'Enchaîne a-m-i d\'un seul mouvement fluide, comme si tu fermais doucement la main.',
      'Le pouce doit rester indépendant : il tombe pile sur le temps, jamais en même temps que la dernière note.',
    ],
    bars: `e [Am] 5.0 1.0 2.1 3.2 5.0 1.0 2.1 3.2 | [Dm] 4.0 1.1 2.3 3.2 4.0 1.1 2.3 3.2 | [E] 6.0 1.0 2.0 3.1 6.0 1.0 2.0 3.1 | [Am] 5.0 1.0 2.1 3.2 5.0 1.0 2.1 3.2`,
  });
  GS.data.exercises.push({
    id: 'arp-6-8', title: 'L\'arpège à 6/8',
    cat: 'arpeges', level: 'debutant', time: '6/8', bpm: 50, bpmTarget: 90, pima: true,
    chords: ['C', 'Am', 'Fmaj7', 'G'],
    desc: 'Une ballade à deux grands temps par mesure, chacun divisé en trois. Le p-i-m-a-m-i s\'y pose naturellement : c\'est le mouvement des barcarolles.',
    tips: [
      'Compte « 1-2-3, 4-5-6 », avec un appui sur le 1 et un autre plus léger sur le 4.',
      'Laisse le chant sortir de la note du haut (a) : c\'est elle que l\'oreille suit.',
      'Fais durer chaque accord jusqu\'à la dernière croche, change à la toute fin.',
    ],
    bars: `e [C] 5.3 3.0 2.1 1.0 2.1 3.0 | [Am] 5.0 3.2 2.1 1.0 2.1 3.2 | [Fmaj7] 4.3 3.2 2.1 1.0 2.1 3.2 | [G] 6.3 3.0 2.0 1.3 2.0 3.0`,
  });
  GS.data.exercises.push({
    id: 'arp-plaque', title: 'Plaqués et arpèges',
    cat: 'arpeges', level: 'intermediaire', time: '4/4', bpm: 56, bpmTarget: 100, pima: true,
    chords: ['C', 'Am', 'Dm', 'G7'],
    desc: 'On alterne l\'accord plaqué (les quatre doigts ensemble) et l\'arpège : exactement ce qu\'il faut pour apprendre à faire partir tous les doigts à la même seconde.',
    tips: [
      'Sur le plaqué, les quatre doigts doivent attaquer ensemble, sans arpéger involontairement.',
      'Replace tous les doigts sur leurs cordes avant le plaqué suivant : cette préparation invisible fait la netteté.',
      'Essaie de faire ressortir la note du haut du plaqué, en appuyant un peu plus avec l\'annulaire.',
    ],
    bars: `q [C] 5.3+3.0+2.1+1.0 e 3.0 2.1 1.0 2.1 q 3.0 | [Am] 5.0+3.2+2.1+1.0 e 3.2 2.1 1.0 2.1 q 3.2 | [Dm] 4.0+3.2+2.3+1.1 e 3.2 2.3 1.1 2.3 q 3.2 | [G7] 6.3+3.0+2.0+1.1 e 3.0 2.0 1.1 2.0 q 3.0`,
  });
  GS.data.exercises.push({
    id: 'travis-c-g', title: 'Travis picking Do - Sol',
    cat: 'arpeges', level: 'intermediaire', time: '4/4', bpm: 60, bpmTarget: 110, pima: true,
    chords: ['C', 'G'],
    desc: 'Le pouce marche en noires sur deux basses, l\'index et le majeur tombent entre les temps. C\'est le fameux contretemps du fingerpicking américain, repris par la guitare folk.',
    tips: [
      'Joue d\'abord le pouce seul, puis ajoute le reste : si la basse se décale, reviens au pouce seul.',
      'Le pouce sonne sur le temps, les doigts à côté : ne les laisse pas se retrouver ensemble.',
      'Étouffe légèrement les basses avec le tranchant de la main pour un son rebondi.',
    ],
    bars: `e [C] 5.3 2.1"i 4.2 1.0"m 5.3 2.1"i 4.2 1.0"m | 5.3 2.1"i 4.2 1.0"m 5.3 2.1"i 4.2 1.0"m | [G] 6.3 2.0"i 4.0 1.3"m 6.3 2.0"i 4.0 1.3"m | 6.3 2.0"i 4.0 1.3"m 6.3 2.0"i 4.0 1.3"m`,
  });
  GS.data.exercises.push({
    id: 'giuliani-c', title: 'Dans l\'esprit de Giuliani : p-i-m-i',
    cat: 'arpeges', level: 'intermediaire', time: '4/4', bpm: 56, bpmTarget: 100, pima: true,
    chords: ['C', 'G7'],
    desc: 'Une formule dans l\'esprit des 120 arpèges de Mauro Giuliani (op. 1) : Do majeur et Sol 7, avec un pouce qui alterne les basses sous un balancier i-m-i.',
    tips: [
      'Le passage de Do à Sol 7 ne demande qu\'un léger mouvement : garde les doigts près des cordes.',
      'L\'index joue deux fois plus que le majeur : veille à ce qu\'il ne s\'alourdisse pas.',
      'Cherche un son de boîte à musique : régulier, léger, sans accent parasite.',
    ],
    bars: `s [C] 5.3 3.0 2.1 3.0 4.2 3.0 2.1 3.0 5.3 3.0 2.1 3.0 4.2 3.0 2.1 3.0 | [G7] 5.2 3.0 2.0 3.0 4.0 3.0 2.0 3.0 5.2 3.0 2.0 3.0 4.0 3.0 2.0 3.0 | 6.3 3.0 2.0 3.0 4.0 3.0 2.0 3.0 6.3 3.0 2.0 3.0 4.0 3.0 2.0 3.0 | [C] 5.3 3.0 2.1 3.0 4.2 3.0 2.1 3.0 5.3 3.0 2.1 3.0 4.2 3.0 2.1 3.0`,
  });
  GS.data.exercises.push({
    id: 'giuliani-pinch', title: 'Dans l\'esprit de Giuliani : le pincé',
    cat: 'arpeges', level: 'intermediaire', time: '4/4', bpm: 56, bpmTarget: 100, pima: true,
    chords: ['C', 'G7'],
    desc: 'Le pouce et l\'annulaire pincent ensemble, puis le majeur et l\'index descendent. Un exercice pour faire chanter le dessus tout en gardant la basse.',
    tips: [
      'Le pincé doit sonner comme une seule note : pouce et annulaire partent exactement ensemble.',
      'Fais ressortir la note de l\'annulaire : c\'est la mélodie, le reste l\'accompagne.',
      'Les doigts restent dans l\'axe de la main : ne laisse pas le pincé refermer le poing.',
    ],
    bars: `e [C] 5.3+1.0 2.1 3.0 2.1 4.2+1.0 2.1 3.0 2.1 | [G7] 5.2+1.1 2.0 3.0 2.0 4.0+1.1 2.0 3.0 2.0 | 6.3+1.1 2.0 3.0 2.0 4.0+1.1 2.0 3.0 2.0 | [C] 5.3+1.0 2.1 3.0 2.1 4.2+1.0 2.1 3.0 2.1`,
  });
  GS.data.exercises.push({
    id: 'giuliani-triolet', title: 'Dans l\'esprit de Giuliani : les triolets',
    cat: 'arpeges', level: 'intermediaire', time: '4/4', bpm: 50, bpmTarget: 96, pima: true,
    chords: ['Am', 'E7'],
    desc: 'P-i-m-a-m-i en triolets sur La mineur et Mi 7. Le cycle de six notes se répartit sur deux temps : le pouce ne revient donc qu\'un temps sur deux.',
    tips: [
      'Compte « 1-2-3, 1-2-3 » : l\'annulaire tombe sur le temps 2 et donne donc un petit accent naturel.',
      'L\'arpège doit rouler sans à-coups : pense à une vague qui monte et redescend.',
      'Si tu accélères sur le retour m-i, joue-le en notes égales et plus lent, les yeux fermés.',
    ],
    bars: `t [Am] 5.0 3.2 2.1 1.0 2.1 3.2 4.2 3.2 2.1 1.0 2.1 3.2 | [E7] 6.0 3.1 2.0 1.0 2.0 3.1 4.0 3.1 2.0 1.0 2.0 3.1 | 6.0 3.1 2.0 1.0 2.0 3.1 4.0 3.1 2.0 1.0 2.0 3.1 | [Am] 5.0 3.2 2.1 1.0 2.1 3.2 4.2 3.2 2.1 1.0 2.1 3.2`,
  });
  GS.data.exercises.push({
    id: 'tremolo-pami', title: 'Le trémolo p-a-m-i',
    cat: 'arpeges', level: 'expert', time: '4/4', bpm: 40, bpmTarget: 90, pima: true,
    chords: ['Am', 'Dm', 'E'],
    desc: 'L\'effet de Recuerdos de la Alhambra : le pouce joue l\'accompagnement pendant que a, m, i répètent la même note jusqu\'à donner l\'illusion d\'un son continu.',
    tips: [
      'Commence au tiers de la vitesse, en attaquant chaque doigt à égalité : la vitesse viendra si l\'égalité est là.',
      'Le i ne doit pas tomber plus fort que les autres ; à l\'oreille, le défaut typique est un galop « a-m-i, a-m-i ».',
      'Quand l\'égalité est acquise, essaie le trémolo sur le rythme pointé : long-court, puis court-long.',
    ],
    bars: `s [Am] 5.0 1.0"a 1.0"m 1.0"i 4.2 1.0"a 1.0"m 1.0"i 3.2"p 1.0"a 1.0"m 1.0"i 4.2 1.0"a 1.0"m 1.0"i | [Dm] 4.0 1.1"a 1.1"m 1.1"i 3.2"p 1.1"a 1.1"m 1.1"i 4.0 1.1"a 1.1"m 1.1"i 3.2"p 1.1"a 1.1"m 1.1"i | [E] 6.0 1.0"a 1.0"m 1.0"i 4.2 1.0"a 1.0"m 1.0"i 3.1"p 1.0"a 1.0"m 1.0"i 4.2 1.0"a 1.0"m 1.0"i | [Am] 5.0 1.0"a 1.0"m 1.0"i 4.2 1.0"a 1.0"m 1.0"i 3.2"p 1.0"a 1.0"m 1.0"i 4.2 1.0"a 1.0"m 1.0"i`,
  });

  // ---------------------------------------------------------------- Gammes
  GS.data.exercises.push({
    id: 'scale-c-pos1', title: 'Do majeur en première position',
    cat: 'gammes', level: 'debutant', time: '4/4', bpm: 60, bpmTarget: 120, pima: false,
    desc: 'La gamme de référence, de Do grave à Sol aigu, toute en première position. Chaque doigt reste dans sa case : index case 1, majeur case 2, annulaire case 3.',
    tips: [
      'Alterne i et m à la main droite, sans répéter le même doigt, même au changement de corde.',
      'Nomme les notes à voix haute : Do, Ré, Mi... Ta gamme devient une carte du manche.',
      'Garde le pouce gauche détendu et le poignet droit : si la main se crispe, ralentis de 10 BPM.',
    ],
    bars: `e 5.3 4.0 4.2 4.3 3.0 3.2 2.0 2.1 | 2.3 1.0 1.1 1.3 1.1 1.0 2.3 2.1 | 2.0 3.2 3.0 4.3 4.2 4.0 q 5.3`,
  });
  GS.data.exercises.push({
    id: 'scale-am-natural', title: 'La mineur naturel',
    cat: 'gammes', level: 'debutant', time: '4/4', bpm: 60, bpmTarget: 116, pima: false,
    desc: 'La gamme mineure de base, au départ de la corde de La à vide. Mêmes notes que Do majeur, mais tout tourne autour du La : on l\'entend dès la première note.',
    tips: [
      'Pars et arrive sur le La à vide : il donne le centre de gravité de la gamme.',
      'Sur les notes à vide, laisse la main gauche préparer la note suivante, ne la décolle pas.',
      'Joue-la aussi lentement et en apoyando, elle sonne alors plus chantée.',
    ],
    bars: `e 5.0 5.2 5.3 4.0 4.2 4.3 3.0 3.2 | 2.0 2.1 2.3 1.0 1.1 1.3 1.1 1.0 | 2.3 2.1 2.0 3.2 3.0 4.3 4.2 4.0 | 5.3 5.2 h. 5.0`,
  });
  GS.data.exercises.push({
    id: 'scale-am-harmonic', title: 'La mineur harmonique',
    cat: 'gammes', level: 'intermediaire', time: '4/4', bpm: 56, bpmTarget: 110, pima: false,
    desc: 'La mineur avec son Sol dièse, sur deux octaves. C\'est l\'intervalle de seconde augmentée entre Fa et Sol dièse qui donne le parfum oriental et espagnol.',
    tips: [
      'Le passage Fa - Sol dièse sur la corde 1 fait un écart de 3 cases : anticipe-le en ouvrant la main.',
      'Le La aigu se joue avec l\'auriculaire qui glisse d\'une case : relâche la pression pendant le déplacement.',
      'Chante la seconde augmentée avant de la jouer : l\'oreille guide alors les doigts.',
    ],
    bars: `e 5.0 5.2 5.3 4.0 4.2 4.3 3.1 3.2 | 2.0 2.1 2.3 1.0 1.1'1 1.4'4 1.5'4 1.4'4 | 1.1 1.0 2.3 2.1 2.0 3.2 3.1 4.3 | 4.2 4.0 5.3 5.2 h 5.0`,
  });
  GS.data.exercises.push({
    id: 'scale-penta-am', title: 'Pentatonique de La mineur',
    cat: 'gammes', level: 'debutant', time: '4/4', bpm: 60, bpmTarget: 120, pima: false,
    desc: 'La pentatonique, la gamme à cinq notes en position V : pas une note ne sonne faux, elle est parfaite pour improviser tes premières phrases.',
    tips: [
      'Sur chaque corde, deux notes seulement : index et annulaire, ou index et auriculaire sur les cordes 6, 2 et 1.',
      'Une fois en place, sors de l\'exercice : joue-la dans le désordre, c\'est là que naît l\'improvisation.',
      'L\'index reste sur la case 5 : c\'est le repère de la main, toutes les autres notes se placent à partir de lui.',
    ],
    bars: `e 6.5 6.8 5.5 5.7 4.5 4.7 3.5 3.7 | 2.5 2.8 1.5 1.8 1.5 2.8 2.5 3.7 | 3.5 4.7 4.5 5.7 5.5 6.8 q 6.5`,
  });
  GS.data.exercises.push({
    id: 'scale-g-2oct', title: 'Sol majeur sur deux octaves',
    cat: 'gammes', level: 'intermediaire', time: '4/4', bpm: 60, bpmTarget: 110, pima: false,
    desc: 'Un doigté en position II, sans cordes à vide : le son est homogène et le doigté se transpose partout sur le manche.',
    tips: [
      'Tout reste en position II : l\'index couvre la case 2, le majeur la case 3, l\'annulaire la case 4, l\'auriculaire la case 5.',
      'La main ne bouge pas du tout : si tu te sens glisser, c\'est qu\'un doigt a quitté sa case.',
      'Coupe chaque note au moment où la suivante part : un legato propre, sans chevauchement.',
    ],
    bars: `e 6.3'2 6.5'4 5.2'1 5.3'2 5.5'4 4.2'1 4.4'3 4.5'4 | 3.2'1 3.4'3 3.5'4 2.3'2 2.5'4 1.2'1 1.3'2 1.2'1 | 2.5'4 2.3'2 3.5'4 3.4'3 3.2'1 4.5'4 4.4'3 4.2'1 | 5.5'4 5.3'2 5.2'1 6.5'4 h 6.3'2`,
  });
  GS.data.exercises.push({
    id: 'scale-phrygian-e', title: 'Mi phrygien, la gamme andalouse',
    cat: 'gammes', level: 'debutant', time: '4/4', bpm: 50, bpmTarget: 100, pima: false,
    chords: ['Fmaj7', 'E'],
    desc: 'Les notes de Do majeur, mais à partir de Mi : le demi-ton Mi - Fa donne immédiatement la couleur flamenca. On termine par la cadence Fa - Mi.',
    tips: [
      'Appuie sur le Fa juste après le Mi : ce demi-ton, c\'est toute l\'âme du mode.',
      'Joue en apoyando pour un son plus tranché, à la manière d\'une falseta.',
      'Écoute la résolution finale : le Fa tire vers le Mi, et ce Mi sonne comme un point d\'arrivée.',
    ],
    bars: `e 6.0 6.1 6.3 5.0 5.2 5.3 4.0 4.2 | 4.3 3.0 3.2 2.0 2.1 2.3 1.0 1.1 | 1.3 1.1 1.0 2.3 2.1 2.0 3.2 3.0 | 4.3 4.2 4.0 5.3 5.2 5.0 6.3 6.1 | h [Fmaj7] @Fmaj7:D [E] @E:D`,
  });
  GS.data.exercises.push({
    id: 'scale-thirds-c', title: 'Tierces en Do majeur',
    cat: 'gammes', level: 'intermediaire', time: '4/4', bpm: 50, bpmTarget: 90, pima: false,
    desc: 'Deux notes jouées ensemble, en parallèle, le long des cordes 1 et 2. C\'est la base des doubles notes et un excellent travail de déplacement de la main.',
    tips: [
      'Les deux doigts se déplacent ensemble : garde la forme, seul l\'écart change entre tierces majeures et mineures.',
      'Le pouce gauche accompagne le déplacement, il ne doit pas rester coincé à la position de départ.',
      'Les deux notes doivent sortir strictement ensemble à la main droite : m et a attaquent d\'un seul geste.',
    ],
    bars: `q 2.1+1.0 2.3+1.1 2.5+1.3 2.6+1.5 | 2.8+1.7 2.10+1.8 2.12+1.10 2.13+1.12 | 2.12+1.10 2.10+1.8 2.8+1.7 2.6+1.5 | 2.5+1.3 2.3+1.1 h 2.1+1.0`,
  });

  // ---------------------------------------------------------------- Légato et ornements
  GS.data.exercises.push({
    id: 'legato-hammer', title: 'Hammer-on : frapper la note',
    cat: 'legato', level: 'debutant', time: '4/4', bpm: 60, bpmTarget: 100, pima: false,
    desc: 'La main gauche seule fait sonner la deuxième note, à partir d\'une corde à vide puis d\'une note appuyée, sur quatre cordes.',
    tips: [
      'Frappe du bout du doigt, depuis un petit centimètre, comme un petit marteau : pas besoin de le lever très haut.',
      'Le volume de la note frappée doit approcher celui de la note attaquée à la main droite.',
      'Garde le doigt arrondi et bien vertical pour ne pas effleurer la corde voisine.',
    ],
    bars: `e 1.0 1.1h 1.0 1.2h 1.0 1.3h 1.1 1.3h | 2.0 2.1h 2.0 2.2h 2.0 2.3h 2.1 2.3h | 3.0 3.1h 3.0 3.2h 3.0 3.3h 3.1 3.3h | 4.0 4.1h 4.0 4.2h 4.0 4.3h 4.1 4.3h`,
  });
  GS.data.exercises.push({
    id: 'legato-pull', title: 'Pull-off : tirer la note',
    cat: 'legato', level: 'debutant', time: '4/4', bpm: 60, bpmTarget: 100, pima: false,
    desc: 'L\'inverse du hammer-on : le doigt quitte la corde en la pinçant légèrement vers le bas, ce qui fait sonner la note suivante.',
    tips: [
      'Le doigt tire vers le sol, en direction de la corde suivante : on ne le soulève pas, on l\'écarte en accrochant la corde.',
      'Pour un pull-off d\'une case à l\'autre, l\'index doit déjà être en place avant que l\'annulaire ne parte.',
      'Le pull-off déplace un peu la corde : garde le doigt du dessous ferme pour que la note d\'arrivée reste juste.',
    ],
    bars: `e 1.1 1.0p 1.2 1.0p 1.3 1.0p 1.3 1.1p | 2.1 2.0p 2.2 2.0p 2.3 2.0p 2.3 2.1p | 3.1 3.0p 3.2 3.0p 3.3 3.0p 3.3 3.1p | 4.1 4.0p 4.2 4.0p 4.3 4.0p 4.3 4.1p`,
  });
  GS.data.exercises.push({
    id: 'legato-trill', title: 'Le trille',
    cat: 'legato', level: 'intermediaire', time: '4/4', bpm: 50, bpmTarget: 100, pima: false,
    desc: 'Une seule attaque de main droite, puis une alternance rapide de hammer-ons et de pull-offs. On travaille les quatre couples de doigts, du plus facile au plus faible.',
    tips: [
      'Seule la première note est attaquée à la main droite : le reste vient uniquement de la main gauche.',
      'Vise la régularité avant la vitesse : un trille lent et égal vaut mieux qu\'un trille rapide et bancal.',
      'Le couple 3-4 est le plus lent, c\'est normal : donne-lui une minute de plus que les autres.',
    ],
    bars: `s 2.5 2.6h 2.5p 2.6h 2.5p 2.6h 2.5p 2.6h 2.5p 2.6h 2.5p 2.6h q 2.5 | s 2.5 2.7h 2.5p 2.7h 2.5p 2.7h 2.5p 2.7h 2.5p 2.7h 2.5p 2.7h q 2.5 | s 2.6 2.7h 2.6p 2.7h 2.6p 2.7h 2.6p 2.7h 2.6p 2.7h 2.6p 2.7h q 2.6 | s 2.7 2.8h 2.7p 2.8h 2.7p 2.8h 2.7p 2.8h 2.7p 2.8h 2.7p 2.8h q 2.7`,
  });
  GS.data.exercises.push({
    id: 'slide-shift', title: 'Glissés et changements de position',
    cat: 'legato', level: 'intermediaire', time: '4/4', bpm: 60, bpmTarget: 100, pima: false,
    desc: 'Un seul doigt voyage le long de la corde, en Sol majeur. Le glissé sert à relier deux positions sans rupture, et prépare tous les déplacements du manche.',
    tips: [
      'Maintiens une pression constante mais légère : si tu appuies trop, le doigt freine.',
      'C\'est le bras qui transporte la main, pas le doigt qui rampe : le coude suit le mouvement.',
      'Écoute l\'arrivée : le glissé doit tomber pile sur le temps et sur la bonne case, sans « rattrapage ».',
    ],
    bars: `q 3.2 3.4/ 3.5/ 3.7/ | 1.3 1.5/ 1.7/ 1.8/ | 1.8 1.7/ 1.5/ 1.3/ | 3.7 3.5/ 3.4/ 3.2/`,
  });

  // ---------------------------------------------------------------- Musicalité
  GS.data.exercises.push({
    id: 'vibrato-long', title: 'Le vibrato longitudinal',
    cat: 'musicalite', level: 'intermediaire', time: '4/4', bpm: 60, bpmTarget: 72, pima: false,
    desc: 'Le vibrato classique : on balance la main dans l\'axe de la corde, le doigt reste planté et la note ondule. Notes longues, pour prendre le temps d\'écouter.',
    tips: [
      'Le mouvement vient de l\'avant-bras, qui oscille le long du manche : le doigt ne plie pas, il est simplement emporté.',
      'Démarre après l\'attaque : d\'abord la note, puis l\'onde, en la rendant plus large peu à peu.',
      'Pratique-le d\'abord au milieu du manche : la case 7 répond bien mieux que la case 1.',
    ],
    bars: `h 1.5~ 1.8~ | w 1.7~ | h 2.8~ 2.5~ | w 3.5~`,
  });
  GS.data.exercises.push({
    id: 'harmonics-12-7-5', title: 'Harmoniques aux cases 12, 7 et 5',
    cat: 'musicalite', level: 'intermediaire', time: '4/4', bpm: 60, bpmTarget: 84, pima: false,
    desc: 'Les harmoniques naturelles sur toutes les cordes : la case 12 sonne une octave au-dessus de la corde à vide, la case 7 une douzième, la case 5 deux octaves.',
    tips: [
      'Effleure la corde pile au-dessus de la frette, sans l\'appuyer, puis retire le doigt juste après l\'attaque.',
      'Attaque près du chevalet, avec un doigt ferme : l\'harmonique sort bien plus claire.',
      'La case 5 demande le plus de précision : c\'est aussi la plus petite cible, donc la dernière à venir.',
    ],
    bars: `q 6.12* 5.12* 4.12* 3.12* | 2.12* 1.12* 1.7* 2.7* | 3.7* 4.7* 5.7* 6.7* | 6.5* 5.5* 4.5* 3.5* | 2.5* 1.5* h 1.12*`,
  });
  GS.data.exercises.push({
    id: 'melody-bass-c', title: 'Mélodie et basse en Do',
    cat: 'musicalite', level: 'intermediaire', time: '4/4', bpm: 56, bpmTarget: 90, pima: true,
    chords: ['C', 'G7'],
    desc: 'Une courte phrase où le pouce alterne les basses et où la voix du haut chante. Deux voix, deux plans sonores, pour un seul musicien.',
    tips: [
      'Commence par la mélodie seule, puis la basse seule : chaque voix doit fonctionner sans l\'autre.',
      'La mélodie doit passer au premier plan : donne-lui plus de poids et garde la basse douce.',
      'Sur le Sol aigu de la mesure 1, l\'auriculaire vient s\'ajouter à la forme de Do : le reste de la main ne bouge pas.',
    ],
    bars: `q [C] 5.3+1.0 4.2+1.3 5.3+1.0 4.2+2.1 | [G7] 6.3+2.3 4.0+1.1 6.3+2.3 4.0+2.0 | [C] 5.3+2.1 4.2+1.0 5.3+1.3 4.2+1.0 | [G7] 6.3+2.3 4.0+2.0 h [C] 5.3+2.1`,
  });
  GS.data.exercises.push({
    id: 'sight-reading-1', title: 'Première lecture à vue',
    cat: 'musicalite', level: 'debutant', time: '4/4', bpm: 56, bpmTarget: 90, pima: false,
    desc: 'Huit mesures inconnues sur les trois cordes aiguës, en Do majeur. Le but : lire et jouer en continu, sans jamais t\'arrêter pour corriger.',
    tips: [
      'Avant de jouer, repère les notes les plus aiguës et les plus graves, et le rythme des mesures 3 et 7.',
      'Regarde la page, pas ta main : quitte à te tromper de note, garde le mouvement.',
      'Une erreur ? Continue, sans revenir en arrière : à ce stade, le rythme compte plus que la note.',
    ],
    bars: `q 2.1 2.3 1.0 2.3 | 2.1 3.2 h 3.0 | e 3.0 3.2 2.0 2.1 q 2.3 2.1 | h 2.0 3.0 | q 1.0 1.1 1.0 2.3 | 2.1 2.3 h 1.0 | e 1.0 2.3 2.1 2.3 q 2.1 2.0 | w 2.1`,
  });
  GS.data.exercises.push({
    id: 'dynamics-arpeggio', title: 'L\'arpège qui respire',
    cat: 'musicalite', level: 'intermediaire', time: '4/4', bpm: 60, bpmTarget: 96, pima: true,
    chords: ['C', 'Am', 'Dm', 'G7'],
    desc: 'Le même arpège, de très doux à fort puis à nouveau doux. La technique ne change pas : seul le volume bouge, pour apprendre à faire des phrases.',
    tips: [
      'Piano ne veut pas dire mou : garde des attaques précises avec moins d\'énergie, les doigts près des cordes.',
      'Le crescendo s\'étale sur toute la mesure : ne saute pas directement au forte.',
      'Joue aussi sur le timbre : près du chevalet pour un son brillant, vers la touche pour un son doux.',
    ],
    bars: `e [C] {piano} 5.3 3.0 2.1 1.0 2.1 3.0 2.1 3.0 | [Am] {crescendo} 5.0 3.2 2.1 1.0 2.1 3.2 2.1 3.2 | [Dm] {forte} 4.0 3.2 2.3 1.1 2.3 3.2 2.3 3.2 | [G7] {diminuendo} 6.3 3.0 2.0 1.1 2.0 3.0 2.0 3.0`,
  });

  // ---------------------------------------------------------------- Flamenco et style espagnol
  GS.data.exercises.push({
    id: 'cadence-andalouse-arp', title: 'La cadence andalouse en arpège',
    cat: 'flamenco', level: 'debutant', time: '3/4', bpm: 60, bpmTarget: 110, pima: true,
    chords: ['Am', 'G', 'Fmaj7', 'E'],
    desc: 'La mineur, Sol, Fa, Mi : la descente qui dit l\'Espagne en quatre mesures. Le Fa se joue en Fa majeur 7, sans barré, et sa corde de Mi à vide renforce la couleur.',
    tips: [
      'La basse descend à chaque accord : La, Sol, Fa, Mi. Fais-la ressortir, c\'est elle qui raconte la cadence.',
      'Le Mi final n\'est pas une fin triste, c\'est une tension qui appelle le retour au La : laisse-la en suspens.',
      'Garde la main droite strictement égale pour laisser les basses descendre seules.',
    ],
    bars: `e [Am] 5.0 3.2 2.1 1.0 2.1 3.2 | [G] 6.3 3.0 2.0 1.3 2.0 3.0 | [Fmaj7] 4.3 3.2 2.1 1.0 2.1 3.2 | [E] 6.0 3.1 2.0 1.0 2.0 3.1`,
  });
  GS.data.exercises.push({
    id: 'compas-soleares', title: 'Le compás de soleá',
    cat: 'flamenco', level: 'intermediaire', time: '3/4', bpm: 70, bpmTarget: 120, pima: false,
    chords: ['E', 'Fmaj7'],
    desc: 'Le cycle de 12 temps de la soleá, avec les accents sur 3, 6, 8, 10 et 12. Quatre mesures de 3/4 ici, mais à penser comme un seul grand tour.',
    tips: [
      'Compte à voix haute et frappe plus fort sur 3, 6, 8, 10 et 12 : le compás se sent d\'abord dans la voix.',
      'Le 8 arrive plus tôt qu\'on ne le croit : c\'est lui qui fait basculer le cycle.',
      'Ne joue pas fort partout : les temps non accentués doivent rester légers pour que les accents ressortent.',
    ],
    bars: `q [E] {1} @E:D {2} @E:D {3 >} @E:D | [Fmaj7] {4} @Fmaj7:D {5} @Fmaj7:D {6 >} @Fmaj7:D | {7} @Fmaj7:D {8 >} @Fmaj7:D {9} @Fmaj7:D | [E] {10 >} @E:D {11} @E:D {12 >} @E:D`,
  });
  GS.data.exercises.push({
    id: 'picado-im', title: 'Picado : l\'alternance i-m',
    cat: 'flamenco', level: 'intermediaire', time: '4/4', bpm: 60, bpmTarget: 120, pima: true,
    desc: 'Le picado, c\'est l\'alternance index-majeur en apoyando, très nette et articulée. Trois notes phrygiennes sur la corde de Mi aigu, en croches puis en doubles.',
    tips: [
      'Le son doit claquer : le doigt part ferme depuis la base, et vient s\'arrêter sur la corde voisine.',
      'Garde la main droite stable et les doigts courts : le mouvement est petit, surtout à grande vitesse.',
      'La main gauche doit être parfaitement synchronisée : pose chaque doigt à l\'instant de l\'attaque, pas avant.',
    ],
    bars: `e 1.0"i 1.0"m 1.1"i 1.1"m 1.3"i 1.3"m 1.1"i 1.1"m | s 1.0"i 1.0"m 1.0"i 1.0"m 1.1"i 1.1"m 1.1"i 1.1"m 1.3"i 1.3"m 1.3"i 1.3"m 1.1"i 1.1"m 1.1"i 1.1"m`,
  });
  GS.data.exercises.push({
    id: 'picado-scale', title: 'Picado : la gamme en doubles',
    cat: 'vitesse', level: 'expert', time: '4/4', bpm: 56, bpmTarget: 120, pima: true,
    chords: ['Fmaj7', 'E'],
    desc: 'Le Mi phrygien en doubles croches sur deux octaves, en alternance i-m stricte, avec la cadence Fa - Mi pour finir. C\'est la course typique d\'une falseta.',
    tips: [
      'Divise la gamme en groupes de quatre notes et pense à leurs débuts : tu penses alors quatre temps, plus seize notes.',
      'Le passage de corde est le point faible : travaille-le seul, deux notes à la fois, avant de relancer.',
      'Monte par paliers de 4 BPM et commence chaque séance 10 BPM sous ton record : la vitesse se consolide en dessous de ta limite.',
    ],
    bars: `s 6.0"i 6.1"m 6.3"i 5.0"m 5.2"i 5.3"m 4.0"i 4.2"m 4.3"i 3.0"m 3.2"i 2.0"m 2.1"i 2.3"m 1.0"i 1.1"m | 1.3"i 1.1"m 1.0"i 2.3"m 2.1"i 2.0"m 3.2"i 3.0"m 4.3"i 4.2"m 4.0"i 5.3"m 5.2"i 5.0"m 6.3"i 6.1"m | h [Fmaj7] @Fmaj7:D [E] @E:D`,
  });
  GS.data.exercises.push({
    id: 'rasgueado-4', title: 'Le rasgueado à quatre doigts',
    cat: 'flamenco', level: 'intermediaire', time: '4/4', bpm: 60, bpmTarget: 100, pima: false,
    chords: ['E', 'Fmaj7'],
    desc: 'La main fermée, les doigts se déplient l\'un après l\'autre vers le bas : auriculaire (e), annulaire (a), majeur (m), index (i). Ici, quatre attaques par temps, avec un coup de résolution, puis une roulade continue.',
    tips: [
      'Les doigts partent du creux de la main, un à la fois : c\'est un éventail, pas un coup de poing.',
      'Le bras ne bouge presque pas : tout se passe dans les doigts, et le poignet reste souple.',
      'Vise quatre attaques de même volume : le e et le a sont les doigts faibles, écoute-les particulièrement.',
    ],
    bars: `s [E] {e} @E:D {a} @E:D {m} @E:D {i} @E:D q @E:D s {e} @E:D {a} @E:D {m} @E:D {i} @E:D q @E:D | s [Fmaj7] {e} @Fmaj7:D {a} @Fmaj7:D {m} @Fmaj7:D {i} @Fmaj7:D q @Fmaj7:D s {e} @Fmaj7:D {a} @Fmaj7:D {m} @Fmaj7:D {i} @Fmaj7:D q @Fmaj7:D | s [E] {e} @E:D {a} @E:D {m} @E:D {i} @E:D @E:D @E:D @E:D @E:D @E:D @E:D @E:D @E:D @E:D @E:D @E:D @E:D | q [Fmaj7] @Fmaj7:D [E] @E:D h @E:D`,
  });
  GS.data.exercises.push({
    id: 'rasgueado-triplet', title: 'Le rasgueado en triolets (abanico)',
    cat: 'flamenco', level: 'expert', time: '4/4', bpm: 50, bpmTarget: 100, pima: false,
    chords: ['E', 'Fmaj7'],
    desc: 'L\'abanico, le « coup d\'éventail » en trois attaques : annulaire vers le bas, pouce vers le bas, index vers le haut. Le cycle tourne sans fin et donne un roulement continu.',
    tips: [
      'Le poignet tourne légèrement, comme pour ouvrir une porte : la rotation entraîne les trois attaques.',
      'Le pouce et l\'index doivent se croiser sans se gêner : l\'un descend pendant que l\'autre se prépare à remonter.',
      'Commence bien en dessous du tempo : un triolet inégal se transforme vite en galop, or la régularité fait tout.',
    ],
    bars: `t [E] {a} @E:D {p} @E:D {i} @E:U {a} @E:D {p} @E:D {i} @E:U @E:D @E:D @E:U @E:D @E:D @E:U | [Fmaj7] {a} @Fmaj7:D {p} @Fmaj7:D {i} @Fmaj7:U @Fmaj7:D @Fmaj7:D @Fmaj7:U @Fmaj7:D @Fmaj7:D @Fmaj7:U @Fmaj7:D @Fmaj7:D @Fmaj7:U | [E] @E:D @E:D @E:U @E:D @E:D @E:U @E:D @E:D @E:U @E:D @E:D @E:U | q [Fmaj7] @Fmaj7:D [E] @E:D h @E:D`,
  });
  GS.data.exercises.push({
    id: 'golpe-basic', title: 'Le golpe',
    cat: 'flamenco', level: 'intermediaire', time: '4/4', bpm: 60, bpmTarget: 100, pima: false,
    chords: ['Am', 'E'],
    desc: 'Le golpe est une frappe de l\'annulaire sur la table, sur le golpeador. Il est noté × sur la corde 1 : on l\'alterne d\'abord avec une basse et un accord, puis on le joue en même temps que l\'accord.',
    tips: [
      'Frappe avec le bout de l\'annulaire, près de l\'ongle, à côté de la corde 1 : un coup sec et sans force.',
      'La main ne se déplace pas : c\'est juste le doigt qui se détend, en partant de sa position naturelle.',
      'Sur une guitare sans golpeador, frappe en douceur ou colle une plaque de protection, le vernis n\'aime pas le golpe.',
    ],
    bars: `q [Am] 5.0 {golpe} 1.x"a 5.0 {golpe} 1.x"a | [Am] @Am:D {golpe} 1.x"a @Am:D {golpe} 1.x"a | [E] @E:D {golpe} 1.x"a @E:D {golpe} 1.x"a | [Am] {+ golpe} @Am:D @Am:D {+ golpe} @Am:D @Am:D`,
  });
  GS.data.exercises.push({
    id: 'pulgar-bass', title: 'Le pulgar flamenco',
    cat: 'flamenco', level: 'intermediaire', time: '4/4', bpm: 60, bpmTarget: 120, pima: true,
    chords: ['E'],
    desc: 'Le pouce joue seul une phrase phrygienne sur les basses, en butée sur la corde voisine. C\'est un son puissant, qui donne son caractère à la guitare flamenca.',
    tips: [
      'Le pouce se pose sur la corde suivante après chaque attaque : c\'est le même principe que l\'apoyando, en plus lourd.',
      'Garde le poignet légèrement levé, pour que le pouce descende librement.',
      'Attaque avec le côté de l\'ongle : le son doit claquer, sans jamais frapper la table.',
    ],
    bars: `e 6.0 6.1 6.3 6.1 6.0 6.1 6.3 5.0 | 5.0 5.2 5.3 5.2 5.0 6.3 6.1 6.0 | 4.0 5.3 5.2 5.0 6.3 6.1 6.0 6.1 | 6.0 6.1 q 6.0 h [E] @E:D`,
  });
  GS.data.exercises.push({
    id: 'alzapua-basic', title: 'L\'alzapúa',
    cat: 'flamenco', level: 'expert', time: '4/4', bpm: 40, bpmTarget: 90, pima: false,
    chords: ['Am', 'G', 'Fmaj7', 'E'],
    desc: 'Le pouce fait tout : une basse en butée, un coup vers le bas sur les cordes aiguës, puis un coup vers le haut. La tablature montre l\'accord entier, mais le pouce ne brosse réellement que 3 ou 4 cordes aiguës.',
    tips: [
      'Le mouvement est une rotation de l\'avant-bras, comme pour tourner une clé : le pouce suit, il ne se plie pas.',
      'Remonte avec l\'ongle sur les mêmes cordes : ce retour doit sonner net, pas effleuré.',
      'Travaille d\'abord le cycle à deux notes (basse puis coup vers le bas) avant d\'ajouter le retour.',
    ],
    bars: `t [Am] {p} 5.0 {p↓} @Am:D {p↑} @Am:U 5.0 @Am:D @Am:U 5.0 @Am:D @Am:U 5.0 @Am:D @Am:U | [G] 6.3 @G:D @G:U 6.3 @G:D @G:U 6.3 @G:D @G:U 6.3 @G:D @G:U | [Fmaj7] 4.3 @Fmaj7:D @Fmaj7:U 4.3 @Fmaj7:D @Fmaj7:U 4.3 @Fmaj7:D @Fmaj7:U 4.3 @Fmaj7:D @Fmaj7:U | [E] 6.0 @E:D @E:U 6.0 @E:D @E:U 6.0 @E:D @E:U 6.0 @E:D @E:U`,
  });
  GS.data.exercises.push({
    id: 'rumba-flamenca', title: 'La rumba flamenca',
    cat: 'flamenco', level: 'intermediaire', time: '4/4', bpm: 70, bpmTarget: 110, pima: false,
    chords: ['Am', 'G', 'Fmaj7', 'E'],
    desc: 'La cadence andalouse sur le rythme bas - haut - tapado - haut, où le tapado (×) est une frappe de la main à plat qui étouffe les cordes sur les temps 2 et 4. Un petit rasgueado relance le tour à la dernière mesure.',
    tips: [
      'Le tapado est un geste de toute la main, qui retombe à plat sur les cordes : il remplace le tambour.',
      'Accentue le temps 2 et le temps 4 pour obtenir ce balancement : c\'est tout le groove de la rumba.',
      'Garde l\'avant-bras en va-et-vient régulier, il assure le rythme à ta place.',
    ],
    bars: `e [Am] @Am:D @Am:U {tapado} 3.x+2.x+1.x @Am:U @Am:D @Am:U {tapado} 3.x+2.x+1.x @Am:U | [G] @G:D @G:U {tapado} 3.x+2.x+1.x @G:U @G:D @G:U {tapado} 3.x+2.x+1.x @G:U | [Fmaj7] @Fmaj7:D @Fmaj7:U {tapado} 3.x+2.x+1.x @Fmaj7:U @Fmaj7:D @Fmaj7:U {tapado} 3.x+2.x+1.x @Fmaj7:U | [E] @E:D @E:U {tapado} 3.x+2.x+1.x @E:U s {rasgueado} @E:D @E:D @E:D @E:D q {tapado} 3.x+2.x+1.x`,
  });
})(typeof window !== 'undefined' ? window : globalThis);
