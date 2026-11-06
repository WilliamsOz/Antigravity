# GuitarStudio

Double-clique sur **`studio_guitare.html`**. Il n'y a rien à installer, et tout fonctionne hors ligne sauf les liens externes (vidéos, Songsterr).

Le micro (accordeur, jeu « Joue la note ») marche mieux dans Chrome ou Edge.

## Organisation

```
studio_guitare.html     Point d'entrée de l'appli
app/
  css/                  Thèmes, composants, pages
  js/core/              Musique, son, micro, sauvegarde, gamification
  js/ui/                Rendu des tablatures, interface commune
  js/pages/             Une page par fichier
  data/                 Tout le contenu (morceaux, cours, exercices, routines, accords, succès)
assets/                 Polices et sons embarqués
tools/                  Validateur de contenu, import de tablatures, format des données
_ancienne_version/      Ton appli Gemini et tes notes d'origine, intactes
```

## Écouter un morceau

- **Depuis la liste des morceaux :** clique sur le bouton lecture d'une carte. Le morceau joue sans quitter la liste.
- **Sur la page d'un morceau :** « Écouter » joue tout le morceau au tempo réel. Clique sur la barre pour aller à un endroit précis.
- **Pour jouer par-dessus :** « Jouer avec » utilise ton tempo, le décompte, le métronome et la boucle. Ce temps-là compte comme de la pratique, pas l'écoute.

Les grilles d'accords s'écoutent aussi. Les trois archives restent sans lecture : elles ne sont pas vérifiées.

## Lancement & Sauvegarde automatique

Pour que ta progression (XP, niveaux, séries, leçons) soit **automatiquement sauvegardée dans les fichiers du projet** :

- **Sur Mac** : Double-clique sur **`start.command`** (ou lance `npm start` ou `node server.js` dans le terminal).
- **Sur Windows** : Double-clique sur **`start.bat`** (ou lance `npm start` ou `node server.js`).

L'application s'ouvre toute seule dans ton navigateur (`http://localhost:3000`).
Chaque fois que tu gagnes de l'XP ou passes un niveau, elle met à jour en temps réel :
- **`progression.json`** (fichier principal de progression)
- **`app/progression.js`** (secours statique)

*(Tu peux toujours double-cliquer directement sur `studio_guitare.html` sans serveur : la progression sera gardée dans ton navigateur et synchronisée dès que tu relanceras le serveur).*

## Synchroniser sur GitHub (Mac <-> Windows)

Quand tu as fini ta session de guitare :
```bash
git add progression.json app/progression.js
git commit -m "Progression niveau"
git push
```

Quand tu passes sur ton autre machine (Windows ou Mac) :
```bash
git pull
```
Lance ensuite l'app via le raccourci (`start.command` ou `start.bat`) : ton niveau, ton XP et toutes tes stats sont là.

## Ajouter du contenu

Tout est décrit dans [`tools/FORMAT_TAB.md`](tools/FORMAT_TAB.md). Pour un morceau, écris-le dans `app/data/songs/`, puis vérifie-le :

```
node tools/validate.js --verbose
```

Le validateur contrôle les durées de chaque mesure, les cases, les écarts jouables et les renvois entre fichiers.

## Sources

- Pièces intermédiaires et expertes : transcriptions de [classtab.org](https://www.classtab.org/), créditées sur chaque morceau. Œuvres du domaine public.
- Son de guitare : FluidR3 GM, via [midi-js-soundfonts](https://github.com/gleitz/midi-js-soundfonts).
- Polices : Fraunces, Instrument Sans, JetBrains Mono (licence SIL OFL).
