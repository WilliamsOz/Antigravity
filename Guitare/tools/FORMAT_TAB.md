# Format de contenu de GuitarStudio

Tout le contenu vit dans `app/data/` (fichiers JS classiques, sans `import`, chaque fichier ajoute ses éléments à `GS.data.*`, chargés dans `studio_guitare.html`). Chaque ajout se vérifie avec :

```
node tools/validate.js --verbose
```

## 1. Écrire une tablature (`bars`)

Une chaîne ; `|` sépare les mesures. Jetons séparés par des espaces :

| Jeton | Sens |
|---|---|
| `w h q e s x` | ronde, blanche, noire, croche, double, triple. **La durée reste active** jusqu'au changement. |
| `q.` `e.` | durée pointée |
| `t` / `T` / `z` | croche de triolet / noire de triolet / double de triolet |
| `:8` | durée exacte en ticks (noire = 24) |
| `1.0` | corde 1, case 0. Corde 1 = Mi aigu, corde 6 = Mi grave |
| `6.0+1.7` | notes simultanées |
| `r` | silence |
| `1.3h` `1.0p` `1.5/` | note liée : hammer-on, pull-off, glissé (depuis la note précédente sur cette corde) |
| `1.12*` | harmonique naturelle |
| `1.7~` | vibrato |
| `1.x` | note étouffée |
| `1.3'4` | doigt de main gauche (ici auriculaire) — facultatif, à la fin de la note |
| `1.3"a` | doigt de main droite explicite (`p i m a`) |
| `@Am:D` `@Am:U` | accord du dictionnaire gratté vers le bas / le haut |
| `[Am]` | nom d'accord affiché au-dessus de la note suivante |
| `{CVII}` | annotation courte au-dessus de la note suivante (barré, nuance…) |
| `!p` | mesure incomplète (levée / anacrouse), à mettre au début de la mesure |

Une corde sonne tant qu'on ne la rejoue pas : pas besoin de noter les tenues. Une basse et une mélodie qui démarrent ensemble s'écrivent `6.0+1.7`, et la durée est simplement le temps jusqu'à l'événement suivant.

Hauteurs réelles (sons réels, pas la notation classique à l'octave) :
cordes à vide E2 A2 D3 G3 B3 E4. Exemples : `2.1` = C4, `2.3` = D4, `1.0` = E4, `1.1` = F4, `1.3` = G4, `3.0` = G3, `3.2` = A3, `2.0` = B3.

Exemple (Em en 3/4, triolets) : `t [Em] 6.0+1.7 2.0 3.0 1.7 2.0 3.0 1.7 2.0 3.0`

**Vérification de la mélodie** — pour les pièces où la voix du haut est la mélodie, ajouter un champ `check` : la note la plus aiguë de chaque événement, en notation anglaise avec octave (`check: 'E4 E4 F4 G4 ...'`). Le validateur compare note par note avec la tablature : c'est une double saisie indépendante qui repère les erreurs de case. Utilise-le systématiquement sur les pièces monodiques ou « mélodie + basse » où la mélodie est toujours au-dessus.

## 2. Morceau (`app/data/songs/*.js`)

```js
GS.data.songs.push({
  id: 'ode-joie',                // minuscules, tirets
  title: 'Ode à la joie',
  composer: 'L. van Beethoven',
  level: 'debutant',             // debutant | intermediaire | expert
  genre: 'classique',            // classique | espagnol | flamenco | folk | traditionnel | baroque | renaissance | noel | populaire
  key: 'Do majeur', time: '4/4', tempo: 92,   // tempo = BPM à la noire, y compris en 6/8
  capo: 0,                       // facultatif
  tuning: { 6: 38 },             // facultatif : corde → MIDI (Drop D). Sinon standard.
  pima: false,                   // true = affiche la ligne p-i-m-a (pièces arpégées)
  techniques: ['mélodie', 'position I'],
  chords: ['C', 'G'],            // tous présents dans app/data/chords.js
  desc: '1 ou 2 phrases : pourquoi le jouer, ce qu\'il apprend.',
  tips: ['Conseil concret 1', 'Conseil concret 2', 'Conseil concret 3'],
  source: 'Domaine public',      // ou 'Transcription : classtab.org — <auteur>'
  sourceUrl: '',                 // facultatif
  video: '',                     // facultatif : URL YouTube d'une référence que tu as vue dans la source. Jamais inventée.
  check: '...',                  // facultatif, voir plus haut
  form: [0, 0, 1, 0],            // facultatif : ordre de lecture des parties. Sinon dans l'ordre.
  sections: [
    { name: 'Thème A', repeat: 2, note: 'facultatif', bars: `...` },
  ],
});
```

### Grille d'accords (morceau sous droits, sans paroles ni tablature note à note)
```js
GS.data.songs.push({
  id: 'knockin', type: 'chart', title: "Knockin' on Heaven's Door", composer: 'Bob Dylan',
  level: 'debutant', genre: 'populaire', key: 'Sol majeur', tempo: 68, time: '4/4', capo: 0,
  chords: ['G', 'D', 'Am', 'C'],
  strum: 'B - B H - H B H',
  desc: '...', tips: ['...'],
  progressions: [{ name: 'Couplet', chords: 'G D Am Am G D C C' }],
  link: 'https://www.songsterr.com/?pattern=knockin%20on%20heaven%20s%20door',
});
```

## 3. Exercice (`app/data/exercises.js`) et routine (`app/data/routines.js`)

```js
GS.data.exercises.push({
  id: 'spider-1234', title: 'La chenille 1-2-3-4',
  cat: 'maingauche',  // echauffement | maingauche | maindroite | accords | arpeges | rythme | vitesse | legato | flamenco | gammes | musicalite
  level: 'debutant', time: '4/4', bpm: 60, bpmTarget: 120, pima: false,
  chords: [],         // facultatif
  desc: 'But de l\'exercice.', tips: ['...'],
  bars: 's 6.1 6.2 6.3 6.4 ... |',
});

GS.data.routines.push({
  id: 'express-10', title: 'Express 10 minutes', subtitle: '...', icon: '⚡',
  goal: 'equilibre',  // equilibre | dexterite | accords | arpeges | rythme | vitesse | flamenco | morceaux | echauffement
  level: 'debutant', minutes: 10,  // égal à la somme des étapes
  steps: [
    { ex: 'spider-1234', min: 3, note: 'consigne facultative' },
    { free: 'Morceau au choix', hint: 'Reprends ton morceau en cours, lentement.', min: 4 },
  ],
});
```

## 4. Cours (`app/data/courses/*.js`)

```js
GS.data.courses.push({
  id: 'ch1', order: 1, title: 'Les premiers pas', subtitle: 'Tenir, accorder, lire', icon: '🌱',
  region: 'Le village',        // lieu du voyage (thème : une route vers l'Andalousie)
  lessons: [{
    id: 'ch1-posture', title: 'Tenir sa guitare sans douleur', minutes: 6,
    goal: 'Ce que tu sauras faire à la fin, en une phrase.',
    blocks: [ /* voir ci-dessous */ ],
    quiz: [{ q: 'Question ?', options: ['A', 'B', 'C'], answer: 1, why: 'Explication de la bonne réponse.' }],  // 2 à 4 questions
    practice: { text: 'Consigne à faire à la guitare', minutes: 3, exercise: 'id-exercice', song: 'id-morceau' },  // exercise et song facultatifs
  }],
  boss: {
    title: 'Le Gardien du Village', desc: 'Mise en scène en 1 phrase.',
    quiz: [ /* 4 à 6 questions */ ],
    song: 'id-morceau', stars: 1,   // facultatif : morceau à valider pour vaincre le boss
  },
});
```

Blocs : `{t:'p', text}` · `{t:'h', text}` · `{t:'list', items:[]}` · `{t:'steps', items:[]}` · `{t:'tip', text}` · `{t:'warn', text}` · `{t:'key', text}` (à retenir) · `{t:'tab', title, time, tempo, bars, pima, note}` · `{t:'chords', names:[]}` · `{t:'fret', frets:5, marks:[{s,f,label}], caption}` · `{t:'table', head:[], rows:[[]]}` · `{t:'compare', a:{title,text}, b:{title,text}}` · `{t:'song', id}` · `{t:'tool', id:'tuner|metronome|chords|scales|fretboard|circle', label}`.

Le texte accepte `**gras**`, `*italique*` et `` `code` ``. Ton : français, tutoiement, concret, chaleureux, pas de blabla. Pas d'emoji dans le corps du texte.
