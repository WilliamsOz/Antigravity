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

## Ta progression

Elle est enregistrée dans le navigateur. Pense à l'exporter de temps en temps : **Réglages → Exporter ma progression**.

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
