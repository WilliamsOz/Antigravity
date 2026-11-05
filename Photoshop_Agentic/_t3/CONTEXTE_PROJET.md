# CONTEXTE PROJET — Photoshop_Agentic

Dernière mise à jour : 2026-10-13 (import de l'historique Antigravity, 64 conversations)

> Mémoire permanente du projet. À lire en premier. Le détail conversation par conversation se trouve dans `_t3/historique-antigravity/INDEX.md`.
> Légende : **[fait]** = établi par l'historique ou vérifié sur disque le 2026-10-13. **[déduction]** = interprétation non confirmée par Williams.
> Rappel règle T3 n°1 : seul `E:\Antigravity\Photoshop_Agentic` est accessible en écriture. Tous les chemins `E:\Fortnite\UI\...` et `C:\Users\willi\.gemini\...` cités ci-dessous sont **en lecture seule** sans accord explicite de Williams (voir §9).

---

## 1. Objectif du projet

- Piloter **Photoshop 2022** avec un agent IA (historiquement Antigravity/Gemini, désormais T3 Code) via un serveur **MCP** et des scripts, pour produire et retoucher des textures sans manipulation manuelle.
- Usage concret : l'**UI front du jeu UEFN/Fortnite « BrainrotRNG »** (jeu RNG de collection de « Brainrots », raretés Common → Secret/God, DA « Studio Broz » inspirée des packs **Dobo UI**). Williams : « Je vais m'occuper de l'UI front du jeu » (09-07).
- Livrables types : textures **9-slice POT** avec marges UMG prêtes à coller, recolorisations, icônes dans la DA, retouches pixel-perfect et traitements par lot.

## 2. État actuel (au 2026-10-02, dernière conversation)

**Fait / livré**
- MCP `@alisaitteke/photoshop-mcp` v1.7.4 installé dans le workspace et branché sur Antigravity (09-02).
- Packs Dobo UI normalisés : 743 PNG en canvas POT centré avec calque noir à 0.01 (09-07). 571 PNG renommés en `T_PascalCase` dans `BrainrotRNG_UI` (09-07).
- Skill Antigravity `uefn-9slice` créé le 09-07, dernière modification le 09-10 (règle anti-écrasement). **[fait]** Il est présent sur disque.
- Bibliothèque `E:\Fortnite\UI\9Slices\` : **63 fichiers** (headers, boutons, Mail, conteneurs, panneaux, modals, cartes de zone).
- Famille **T_Mail\*** (Purple, Cream, Cyan, Green, GreenLight, Pink, Yellow, puis WhitePink/Red/Gold) : formes homogénéisées, palettes harmonisées sur T_MailCyan, sources ramenées à 1024×256.
- Icônes : `T_FlagIcon`, `T_BookIcon` (fermé), `T_OpenBookIcon` (archive), `T_EnemyRush` (versions GPT et Gemini).
- **Chantier actif au 10-02 : UI du téléporteur.**
  - Header rouge : `T_HeaderRed_9Slice_256x256`.
  - Fond de modal : `T_ModalRed_DarkCrimson_9Slice_512x512`, choisi par Williams.
  - Cartes de zone : `T_CardZone_Unlocked_Red` / `T_CardZone_ToUnlock_Gold` (9-slice 256×256).
  - 30 images de zones 1024×256 avec bordure noire de 8 px et rayon de 28 px, dans `E:\Fortnite\UI\ImageTeleporter\Outlined\`.

**En cours / non tranché**
- Choix `T_EnemyRush` entre `FinalIcon\v1 - gtp` et `v2 - gemini`. Note : il existe aussi un `E:\Fortnite\UI\T_EnemyRush.PNG` à la racine.
- `T_ButtonAdvancedCyan` : option A (bi-ton) ou B (`_Smooth`), non tranché (09-08).
- Layout UX de l'écran Équipe/Inventaire : proposé le 09-07, jamais implémenté.
- Ombre portée verticale (`ca9b75fa`, 09-23) : demande restée **sans réponse**.

## 3. Architecture et fichiers clés

### Workspace (seul dossier en écriture)
`E:\Antigravity\Photoshop_Agentic\`
- `photoshop-mcp\` : clone de `@alisaitteke/photoshop-mcp` v1.7.4 (Node/TS : `src\`, `dist\index.js`, `uxp-plugin\{manifest.json,main.js,index.html}`, `web\`). Expose 102 outils atomiques, 16 recettes, `get_state`, `get_preview`, `get_capabilities`, ainsi qu'un mode Action Plan.
- `GEMINI.md` (renvoie à `T3_RULES.md`), `T3_RULES.md`, `CLAUDE.md`.
- `_t3\` : `CONTEXTE_PROJET.md` (ce fichier), `historique-antigravity\INDEX.md` et 64 conversations.
- Racine : **164 entrées**. On y trouve des copies de travail et de livrables : `T_1.psd`, `T_2.psd`, `T_ContainerEquippedTeam*.psd/png`, `T_HeaderCream_9Slice_256x256.png`, `T_ModalSimple_9Slice_512x512.png`, `T_FlagIcon*`, `T_CardZone_*`, `T_Mail*_9Slice*`, `v1_bleu_nuit_bronze.png`, `v2_bleu_nuit_complet.png`… On y trouve aussi environ 130 PNG de debug (`test_*`, `check_*`, `preview_*`, `debug_*`, `orig_*`, `zoom_*`). Voir §9.

### Config Antigravity (hors workspace, lecture seule)
- `C:\Users\willi\.gemini\config\mcp_config.json` → serveur `photoshop` : `node E:/Antigravity/Photoshop_Agentic/photoshop-mcp/dist/index.js`.
- `C:\Users\willi\.gemini\antigravity\mcp\photoshop\` : 118 schémas d'outils exportés.
- Skill `C:\Users\willi\.gemini\config\skills\uefn-9slice\SKILL.md` + `scripts\process_9slice.py` (Pillow/NumPy, environ 370 lignes, mtime du 09-10). Autres skills : `send-email`, `verse-coding-standards`.
- Artefacts (brain) : `C:\Users\willi\.gemini\antigravity\brain\<id>\`. Exemples : `d2eaf541…\scratch\process_all_ui_pngs.py`, `process_packs.py` (batch POT) et `376d0def…\modal_red_textures.md`, `zone_cards_textures.md`, `mockup_teleporter_final.png`.

### Assets du jeu (hors workspace, lecture seule)
`E:\Fortnite\UI\`
- `9Slices\` : dépôt central de toutes les textures 9-slice (`*_9Slice_<W>x<H>[_n].png`, quelques `.psd` et `.bak`).
- `BrainrotRNG_UI\` : arborescence numérotée.
  - `1_HEADER\` : `Headers\`, `Labels\`.
  - `2_CORE\` : `Cards\`, `Containers\`, `Dialogues\`, `Effects\`, `Frames\`, `Item Slots\`, `Modals\`, `Panels\`.
  - `3_FOOTER\` : `Arrows\`, `ProgressBars\`, `Toggles\`.
  - `4_UTILITIES\` : `Buttons\`, `Icons\`, etc. Les Icons servent de **référence de DA**.
  - Mapping d'origine (09-07) : HEADER = Headers, Labels ; CORE = Modals, Containers, Cards, Item Slots + Inventory, Panels, Frames, Effects, Dialogues ; FOOTER = Buttons, ProgressBars, Arrows, Toggles, RadioBoxes ; TRANSVERSAL = Icons, Spritesheets. **[déduction]** Buttons et Icons sont aujourd'hui sous `4_UTILITIES`.
- `Vector_UI_Pack_dobo_ui\`, `DEMO_Fantasy_RPG_UI_doboui\`, `DEMO_MegaCozyUIPack_doboui - copia\` (+ .zip) : packs sources. Le master du modal est `Vector_UI_Pack_dobo_ui\Vector_UI_Pack_dobo_ui\Modals\modalSimple_v2.png`.
- `FinalIcon\` : icônes d'upgrade Slimes, dans `v1 - gtp\`, `v2 - backup_before_gemini\`, `v2 - gemini\`.
- `ImageTeleporter\` : 30 images de zones 1024×256 brutes, plus `Outlined\` (versions avec bordure).
- Racine `E:\Fortnite\UI\` : beaucoup de textures isolées.
  - Sources Mail 1024×256 `T_Mail{Cream,Cyan,Green,GreenLight,Pink,Purple,WhitePink,Yellow}.png`, avec des `.bak`.
  - `T_Luck*.PNG`, `T_LuckyBox*`, `T_Jelly.PNG`, `T_Button*.png`, `T_CloseIcon.PNG`, `T_PinkRightArrow.png`, `T_ModalInner/Outer`, `right.png`, etc.
- `BrainrotRNG_UI\2_CORE\Panels\` : contient d'**autres** fichiers Mail (`T_MailPurple.psd`, `T_MailPurple_OriginalBackup.png`, `T_MailPinkier.png`, `T_MailRed.png`, `T_MailWhite.png`…) et des `T_Panel*`.

## 4. Outils, MCP et workflows

### Pilotage de Photoshop
- **MCP** `photoshop` : `photoshop_ping`, `photoshop_execute_script` (ExtendScript/JSX), `photoshop_open_image`… Il passe par le pont COM Windows et n'a pas besoin du plugin UXP. Il a fallu « enregistrer le serveur COM Photoshop » lors de l'installation.
- **Python `win32com.client.Dispatch("Photoshop.Application")`** : sert à générer et exécuter du JSX, notamment en batch.
- **JSX** : lecture `app.activeDocument.fullName.fsName`, `close(SaveOptions.DONOTSAVECHANGES)`, `app.open(new File(...))`, Canvas Size / Image Size, calques, guides.
- **Pillow/NumPy hors Photoshop** pour tout le traitement pixel lourd (analyse, recolorisation, SDF, Lanczos, suréchantillonnage). Le PNG est ensuite rechargé dans Photoshop.
- **Ne jamais faire de boucle pixel par pixel en JSX** : le 09-12, cela a bloqué Photoshop (Échap inopérant) et il a fallu le tuer.
- UI web du MCP : `npx.cmd -p @alisaitteke/photoshop-mcp photoshop-mcp-ui`.

### Cycle type
1. Identifier le **document actif** de l'instance ouverte. Vérifier que son contenu correspond à son nom : il y a eu des cas de mauvaise cible ou de fichier mal nommé.
2. Traiter en Python sur disque.
3. Écrire la sortie sans écraser (voir §5).
4. Fermer l'ancien document sans sauvegarder, puis ouvrir le résultat dans PS (« synchronisation »).
5. Rendre une fiche technique.

### Procédure 9-slice standard (skill `uefn-9slice`)
Phrase déclencheur : « Prépare-moi cette texture en 9-slice pour UEFN (sans padding, en puissance de 2) et donne-moi les marges UMG. » En pratique, Williams dit : « fais-moi le 9 slice de la texture ouverte dans Photoshop ».
1. Lire le chemin du document actif.
2. Lancer `python process_9slice.py "<source>" --json [--output-dir …] [--target WxH] [--left/--top/--right/--bottom px] [--simulate WxH] [--backup] [-o sortie]`.
   - Le script purge le bruit alpha (α ≤ 5 → 0) et fait un tight crop du padding transparent.
   - Il détecte les coins par variance des lignes et colonnes. Cette détection **surestime** les bordures épaisses, à vérifier visuellement.
   - Il choisit une POT adaptative :
     - ratio ≥ 2.5 → 256×128 / 256×256 / 512×256 ;
     - ratio ≤ 0.4 → 128×256 / 256×256 / 256×512 ;
     - sinon → 256×256 (coin ≤ 70 px), 512×512 (coin ≤ 140 px) ou 1024².
   - Il garde les coins à 1:1, étire seulement les bords et le centre, puis calcule les marges en ratio (px / taille POT).
   - La fonction `get_unique_filepath` gère le suffixe `_n`.
3. Fermer la source sans sauvegarder, ouvrir le 9-slice et injecter des **guides** sur les lignes de coupe.
4. Rendre la fiche technique « Studio Broz » :
   - lien `file:///` vers le fichier ;
   - config UMG : Image → Brush → **`Draw As: Box`**, `Image Size` = taille POT, `Margin` à coller (Ctrl+V) au format `(Left=…,Top=…,Right=…,Bottom=…)` ;
   - tableau Marge / Ratio / px / rôle ;
   - en option, un snippet Verse `texture_block` (`DefaultImage`, `DefaultDesiredSize := vector2{…}`).
- Règles de marge :
  - Left+Right ≤ 1 et Top+Bottom ≤ 1 ;
  - la marge doit englober **toute** la courbure du biseau, avec 1 px de sécurité ;
  - pour les headers à ruban ou à repli, mesurer des marges **asymétriques** (le Bottom souvent > Top) ;
  - un dégradé dur ne doit pas être coupé dans une zone étirée.
- **[fait]** Dans le lot 3 (09-22 → 10-02), les conversations ne citent plus le skill. L'agent réécrivait ses scripts à chaque fois, d'où des marges variables (ex. la 1ʳᵉ découpe fausse de `T_HeaderAsimBlack`).
- Alternatives au 9-slice :
  - texture native NPOT taillée à ras avec `Compression = UserInterface2D (RGBA)` et `Mip Gen = NoMipmaps` ;
  - texture POT « Stretch » pré-compensée en `Draw As: Image`.

### Recolorisation
- Remplacement ciblé (Color Range / Teinte-Saturation dans PS, ou au pixel en Python). Les contours noirs, l'alpha et l'AA sont conservés et les **franges d'AA retraitées**.
- « Garder la logique » veut dire dériver une **rampe de tons** (highlight / clair / base / ombre / ombre profonde) et non un swap 1:1. Étagement de luminosité : fond > cadre intérieur > biseau bas. Ratio ΔE cadre/biseau ≈ 37 %, calqué sur T_MailCyan.
- Non destructif : nouveau calque actif, original en calque masqué (`… (Original)`).
- Remplacements chaînés : ordonner les swaps pour éviter les collisions (ex. `d1ced7→fff` avant `e2e8eb→d1ced7`).

### Redimensionnement / POT
- POT par axe, `nextPowerOfTwo()`, `resizeCanvas(..., AnchorPosition.MIDDLECENTER)`, pas de déformation.
- « Mettre en 1024×256 » veut dire **remplir le cadre bord à bord**, sans réduction homothétique avec marges ni transparence ajoutée (décision du 09-10).
- Pour réduire la transparence à taille constante : coins à 1:1 et étirement seulement des segments centraux (Lanczos).
- Pour réduire un PNG non carré à 512×512 : caler le côté long, centrer, Lanczos, purger α ≤ 5.

### Batch
- POT + anti-bleed sur des dossiers entiers : JSX via win32com, puis audit Pillow (dimensions POT, coins RGBA `(0,0,0,3)`). **Attention à l'opacité cumulée** en cas de double passe.
- Bordure + coins arrondis par lot (10-02) : bordure 8 px, rayon 28 px, AA par SDF analytique, intérieur intact, coins α=0 et RGB=0.

### Qualité UEFN
- Alpha 0 strict sur les bords extérieurs et RGB=0 sous α=0, contre les halos de mipmap.
- Formes générées en vectoriel ou suréchantillonnées 8× puis réduites en Lanczos.
- Symétrie au pixel près, épaisseurs de contour constantes, aucun pixel orphelin.

### Workflow Antigravity historique
Pour les tâches lourdes : `implementation_plan.md` → validation de Williams → exécution → `walkthrough.md`. `/grill-me` servait à concevoir un skill.

## 5. Conventions

- **Nommage** : `T_` + PascalCase descriptif + couleur (`T_ButtonAdvancedCyan`, `T_MailCyan`, `T_HeaderBowGreen`).
  - Règle d'origine : un seul `_` après `T`. En pratique, les suffixes techniques sont tolérés (non contestés par Williams).
  - 9-slice : `<Nom>_9Slice_<W>x<H>.png`.
  - Anti-écrasement : `_1`, `_2`… (skill, depuis le 09-10).
  - Icônes : `T_<Nom>Icon.psd` + `T_<Nom>Icon512Px.png`.
  - Variantes : `_DarkCrimson`, `_Unlocked_Red`, `_ToUnlock_Gold`, `_Smooth`.
  - Autres suffixes : `_Master`, `_Copy`, `_Original_<WxH>`, `_Proportional`, `_orig_backup`.
- **Tailles POT obligatoires** pour toute sortie, previews compris. Tailles courantes :
  - 9-slice : 256×256 par défaut, 512×256 pour les boutons et headers larges, 512×512 pour les modals, 256×128 pour les conteneurs plats ;
  - sources Mail et images de zones : 1024×256 ;
  - icônes : 512×512 (FlagIcon : canevas 1024 malgré le suffixe `512Px`).
  - Pour Williams, « multiple de 2 » veut dire puissance de 2.
  - Si Williams impose une taille (« reste en 512×256 »), utiliser `--target`.
- **Marges UMG** : struct FMargin `(Left=0.093750,Top=0.066406,Right=0.093750,Bottom=0.066406)`, ratios à **6 décimales** = px / dimension POT, prêts à coller.
- **Calque anti-bleed** : noir #000000 plein canvas, opacité 1 % (α 3/255), sous l'icône, nommé `BG_0.01`.
- **Export** : PNG RGBA. PSD à côté quand il y a création graphique, avec calques nommés (`Flag_Icon`, `Flag_Shadow`, `*_Backup` masqué).
- **Anti-écrasement** : ne jamais écraser une texture existante (versionner `_n`, ou `.bak` au minimum si Williams demande explicitement de modifier la source). Si Williams dit « ne l'enregistre pas, je ferai l'enregistrement moi-même », ne rien écrire.
- **Sortie 9-slice par défaut** : `E:\Fortnite\UI\9Slices` (historique). Désormais soumise à la règle T3 n°1 (§9).

## 6. Décisions prises (datées)

| Date | Décision |
|---|---|
| 09-02 | MCP retenu : `@alisaitteke/photoshop-mcp` v1.7.4, dans `photoshop-mcp\`. |
| 09-02 / 09-07 | Toutes les textures des packs passent en canvas POT centré + calque noir 0.01, en écrasant les originaux. |
| 09-07 | Nommage `T_PascalCase` pour tout `BrainrotRNG_UI` (571 fichiers). |
| 09-07 | Méthode **9-slice `Draw As: Box`** adoptée pour les conteneurs et modals redimensionnables (« la solution 1 a l'air de bien marcher »). |
| 09-07 | Skill global `uefn-9slice` créé. Format de marges FMargin à 6 décimales. POT aussi pour les sorties dérivées. Dossier de sortie `E:\Fortnite\UI\9Slices`. Un seul fichier produit (backup et preview seulement via options). |
| 09-08 | Boutons à dégradé bi-ton : 2 variantes (bi-ton corrigé / `_Smooth`). Marge basse couvrant tout le biseau. |
| 09-08 | Boutons de pagination : fichiers séparés gauche et droite en 256×256, plutôt qu'une planche 512×256. |
| 09-10 | **Règle anti-écrasement** ajoutée au skill (`_1`, `_2`…). |
| 09-10 | « Redimensionner en 1024×256 » = remplir bord à bord. |
| 09-10 | T_MailPurple : icône à part, composition UMG Overlay (Image Box) + HorizontalBox [Image carrée 64/72 px + TextBlock]. |
| 09-11 | Famille T_Mail homogénéisée : losange, points, arcs et carré retirés. Marges 9-slice communes 32/32/32/48. |
| 09-11 | **T_MailCyan = palette de référence** : cadre intérieur plus clair que le biseau bas. Règle reportée sur Pink, Green, Yellow. |
| 09-12 | Palettes validées en 9-slice reportées sur les sources 1024×256 (Cyan, GreenLight, Green). `.bak` avant écrasement. |
| 09-22 | Réduire la transparence à taille constante : étirer le centre, coins 1:1, original masqué. |
| 09-23 | Bouton d'achat premium : jaune `#F9E745` (au lieu de l'orange `#F6BB45`). |
| 09-23 | Drapeau sans emblème ni bande spéculaire, tissu aplat `#CC1243`. |
| 09-25 | Icône livre : **fermé** retenu (l'ouvert est archivé en `T_OpenBookIcon`). |
| 09-25 | `T_BlueFramedContainer1` : version « Bleu_Nuit_Complet » (outlines `#183ead`, fond `#131623`). |
| 09-28 | Fond de modal téléporteur : **DarkCrimson** (choix de Williams ; l'agent recommandait DarkTeal). |
| 09-28 | Cartes de zone : rouge rubis = zone débloquée, **or/ambre = zone à débloquer**. Mint et Cyan en réserve. |
| 09-30 | `T_HeaderAsimBlack` : 2ᵉ découpe 136/21/137/59 retenue. |
| 10-02 | Images du téléporteur : bordure noire 8 px, rayon 28 px, 1024×256 conservé. |

## 7. Valeurs de référence (les plus récentes)

### Marges UMG 9-slice
Tous en `Draw As: Box`, `Image Size` = taille du fichier. Fichiers dans `E:\Fortnite\UI\9Slices\` sauf mention contraire.

| Texture | Taille | Margin (L,T,R,B) | px | Date |
|---|---|---|---|---|
| T_ModalSimple_9Slice (workspace) | 512×512 | 0.3125, 0.0586, 0.3125, 0.2344 | 160/30/160/120 | 09-07 |
| T_HeaderCream / White / Purple / Yellow | 256×256 | 0.25, 0.15625, 0.25, 0.125 | 64/40/64/32 | 09-07 / 09-09 |
| T_1_POT_2048x2048_Padded_blue_9Slice | 512×512 | 0.109375, 0.109375, 0.109375, 0.123047 | 56/56/56/63 | 09-07 |
| T_1_POT_1024x2048_Padded_blue_Stretched_9Slice | 256×256 | 0.093750, 0.093750, 0.093750, 0.101562 | 24/24/24/26 | 09-07 |
| T_1_…_Stretched_9Slice_256x256**_1** (en réalité violet `#4218A5`) | 256×256 | 0.085938 ×4 | 22 ×4 | 09-10 |
| T_FramedContainer1 | 256×256 | 0.093750, 0.066406, 0.093750, 0.066406 | 24/17/24/17 | 09-07 |
| T_WoodenContainer4 | 256×128 | 0.093750, 0.117188, 0.093750, 0.117188 | — | 09-07 |
| T_WoodenContainer2 (forme FramedContainer1) | 256×256 | 0.093750, 0.066406, 0.093750, 0.066406 | 24/17/24/17 | 09-08 |
| T_WoodenContainer2_…_1 (bleu, 09-25), **absent du disque** | 256×256 | 0.050781 ×4 | 13 ×4 | 09-25 |
| T_ButtonAdvancedCyan (+ `_Smooth`) | 256×256 | 0.148438, 0.132812, 0.148438, 0.167969 | 38/34/38/43 | 09-08 |
| T_ButtonSquareCyan | 256×256 | 0.164062, 0.121094, 0.164062, 0.164062 | — | 09-08 |
| T_ButtonCyan | 256×256 | 0.152344, 0.125000, 0.152344, 0.164062 | — | 09-08 |
| T_ButtonCyan | 512×256 | 0.076172, 0.125000, 0.076172, 0.164062 | 39/32/39/42 | 09-08 |
| T_ButtonAdvancedYellow | 256×256 | 0.128906, 0.128906, 0.132812, 0.167969 | 33/33/34/43 | 09-09 |
| T_ButtonAdvancedBlue | 256×256 | 0.148438, 0.128906, 0.148438, 0.167969 | 38/33/38/43 | 09-10 |
| T_DarkModalSimpleDark | 512×512 | 0.195312, 0.03125, 0.195312, 0.21875 | 100/16/100/112 | 09-09 |
| T_CardContainerBlue / T_CardSelectionBlue | 256×256 | 0.25, 0.25, 0.25, 0.125 | 64/64/64/32 | 09-10 |
| T_CardContainerPurple (forme Wooden Container 2) | 256×256 | 0.0625 ×4 | 16 ×4 | 09-10 |
| T_ColorContainerYellow | 256×256 | 0.066406, 0.136719, 0.066406, 0.132812 | 17/35/17/34 | 09-10 |
| T_Mail{Cyan,Cream,Green,GreenLight,Pink,Yellow} + T_MailPurple_…_1 | 256×256 | 0.125, 0.125, 0.125, 0.1875 | 32/32/32/48 | 09-11 |
| T_HeaderBowGreen | 512×256 | 0.25, 0.097656, 0.25, 0.222656 | 128/25/128/57 | 09-12 |
| T_ButtonPink (aussi dans `4_UTILITIES\Buttons\`) | 512×256 | 0.070312, 0.125, 0.070312, 0.164062 | — | 09-22 |
| T_ButtonYellow (aussi dans `4_UTILITIES\Buttons\`) | 512×256 | 0.068359, 0.125, 0.068359, 0.160156 | — | 09-22 |
| T_ButtonYellow | 256×256 | 0.136719, 0.125, 0.136719, 0.160156 | 35/32/35/41 | 09-22 |
| T_HeaderPink | 256×256 | 0.128906, 0.109375, 0.128906, 0.277344 | 33/28/33/71 | 09-23 |
| T_HeaderBlue | 256×256 | 0.195312, 0.113281, 0.195312, 0.277344 | 50/29/50/71 | 09-23 |
| T_BlueFramedContainer1 (+ .psd) | 256×256 | 0.042969 ×4 | 11 ×4 | 09-25 |
| T_Modal12 | 256×256 | 0.066406, 0.070312, 0.066406, 0.066406 | 17/18/17/17 | 09-25 |
| T_DarkBorderBluePanel / T_LightBorderBluePanel | 256×256 | 0.0625 ×4 | 16 ×4 | 09-25 |
| T_HeaderRed | 256×256 | 0.125, 0.109375, 0.125, 0.277344 | 32/28/32/71 | 09-28 |
| T_ModalRed_{DarkCrimson (retenu), DarkTeal, ParchmentRose, DarkSlate} | 512×512 | 0.09375, 0.019531, 0.09375, 0.082031 | 48/10/48/42 | 09-28 |
| T_CardZone_Unlocked_Red (= T_MailRed) / T_CardZone_ToUnlock_Gold (= T_MailGold) | 256×256 | **0.125, 0.125, 0.125, 0.140625** | 32/32/32/36 | 09-28 |
| T_HeaderAsimBlack | 512×256 | **0.265625, 0.082031, 0.267578, 0.230469** | 136/21/137/59 | 09-30 |

### Palettes et couleurs de référence

| Élément | Valeurs | Date |
|---|---|---|
| **T_MailCyan (référence)** | fond 197,230,234 (`#C5E6EA`) / cadre 160,213,238 (`#A0D5EE`) / bas 61,168,219 (`#3DA8DB`) ; bordure noire 7 px, cadre intérieur 6 px | 09-11 |
| T_MailPink | fond 251,217,255 / cadre `#EFA1DF` / bas `#DB3EA5` | 09-11 |
| T_MailGreen | fond 204,240,210 / cadre 148,219,145 / bas 72,188,54 (cible de Williams : rgb(51,163,67), non validée) | 09-12 |
| T_MailGreenLight (= ex-palette Yellow, **[déduction]**) | fond 244,255,217 / cadre `#D7E999` / bas `#ACC839` | 09-11 / 09-12 |
| T_MailWhitePink | fond `#f9e2c1`, liseré `#efa1df`, biseau `#db3ea5` | 09-23 |
| T_MailPurple | fond 236,217,255 (`#ECD9FF`) | 09-10 |
| Contour violet T_1 / CardContainerPurple | `#4218A5` (6 px) + filet doré `#F5C248` (1 px) | 09-10 |
| Bouton premium T_ButtonYellow | `#F9E745` | 09-23 |
| Rose pour boutons et flèches | `#fe69cc` / `#f545b9` / `#9f187e` (depuis cyan `6bd0ff/45bcf5/17729c` ou vert `94e368/67d461`) | 09-23 |
| T_ButtonWhite | corps blanc, reflet et ombre `#d1ced7` | 09-24 |
| T_ButtonDarkGrey | `#6a6a76` / reflet `#8a8a98` / ombre `#373742` | 09-25 |
| Bleu nuit des conteneurs | rampe `#6b8cff / #557dfc / #466df9 / #1f4ae4 / #0b2a9e` ; outlines `#183ead` ; fond `#131623` | 09-25 |
| Cyan des boutons | `#45bcf5` / `#36a9e0` ; T_ButtonSquareCyan, centre RGBA 69,188,245,255 | 09-08 |
| Bois (T_WoodenContainer2) | `#cc8669 #b35f49 #ac4f36 #9f432a #852d23`, parchemin `#fff0cd`, liseré `#f7d2b0` | 09-08 |
| **Fond de modal téléporteur choisi** | DarkCrimson `#2B1D24` (alternatives : DarkTeal `#1B282A`, ParchmentRose `#FFDEDC`, DarkSlate `#262634`) | 09-28 |
| CardZone Unlocked Red | `#FFEAEB` / liseré `#F7A8B4` / lèvre `#D42B58` ; liseré 5 px, R=24, lèvre 8 px | 09-28 |
| CardZone ToUnlock Gold | `#FFF4DA` / `#F7CE72` / `#D48E19` | 09-28 |
| T_FlagIcon | tissu `#CC1243` | 09-23 |
| T_Jelly | `#FD8D9C` | 09-04 |
| T_Modal (09-03) | slot `#1F213C`, container `#3B426B`, contours `#000000` | 09-03 |
| Bordure des images de zones | noir, 8 px, rayon 28 px | 10-02 |

## 8. Informations qui ont évolué (ancienne → nouvelle)

| Sujet | Ancienne → nouvelle (la nouvelle fait foi) | Date |
|---|---|---|
| Noms des PNG BrainrotRNG_UI | `arrow_black.png` → `T_ArrowBlack.png` | 09-07 |
| Arborescence BrainrotRNG_UI | 18 dossiers plats → `1_HEADER` / `2_CORE` / `3_FOOTER` / `4_UTILITIES` (réorganisation non tracée) | 09-07 |
| Approche du redimensionnement des modals | POT padded / étiré / pré-compensé → 9-slice `Draw As: Box` | 09-07 |
| Format des marges | `Left: 0.17188` (5 décimales) → FMargin à 6 décimales | 09-07 |
| Sortie du skill | à côté de la source, avec backup et preview → `E:\Fortnite\UI\9Slices`, fichier unique | 09-07 |
| Enregistrement 9-slice | écrasement silencieux → suffixe `_n` | 09-10 |
| Politique de backup | aucun / scratchpad → `.bak` à côté avant écrasement | 09-12 |
| T_1_POT_2048x2048 9-slice | 88 px → 62/62/62/69 → 56/56/56/63 | 09-07 |
| T_1_POT_1024x2048 9-slice | 56/56/56/64 → 24/24/24/26 | 09-07 |
| T_WoodenContainer2 9-slice | 29/18/29/18 → 24/17/24/17 (09-08) ; version bleue `_1` en 13 px (09-25, absente du disque) | 09-08 / 09-25 |
| T_ButtonAdvancedCyan | 48/39/48/34 → 38/34/38/43 + `_Smooth` | 09-08 |
| Boutons de pagination | planche 512×256 → 2 fichiers 256×256 | 09-08 |
| T_CardContainerPurple | 0.25/0.25/0.25/0.125 → 0.09375 ×4 → **0.0625 ×4** ; contour `#3468F6` → `#4218A5` | 09-10 |
| T_MailPurple | 2048×512 → 1024×256 bord à bord ; losange → carré → retiré ; marges B 0.15625 → 0.1875 (`_1`) | 09-10 → 09-11 |
| Sources T_Mail\* | 2048×512 → 1024×256 | 09-11 |
| T_MailCyan | fond `#C6E9E0` → 197,230,234 ; cadre 171,224,218 → 160,213,238 ; bas 108,175,159 → 61,168,219 | 09-11 |
| T_MailPink | 232,192,249 / 184,137,216 → cadre `#EFA1DF`, bas `#DB3EA5` ; fond `#fbd9ff` → `#fff` → `#f9e2c1` (sous le nom `T_MailWhitePink`) | 09-11 / 09-23 |
| T_MailGreen | 227,245,188 / 192,212,134 → `#D2E999` / `#ACC839` → fond 204,240,210 / cadre 148,219,145 / bas 72,188,54 | 09-11 → 09-12 |
| T_MailYellow → T_MailGreenLight **[déduction]** | la palette Yellow du 09-11 se retrouve à l'identique sous GreenLight le 09-12 | 09-12 |
| T_ButtonYellow | `#F6BB45` → `#F9E745` | 09-23 |
| Outline violette → bleu nuit | `#2c1767` → `#183ead` ; ombre `#1f4ae4` → `#183ead` | 09-25 |
| T_BookIcon | ouvert → fermé | 09-25 |
| Fond de modal | V1 DarkTeal recommandée → **DarkCrimson** choisi | 09-28 |
| Margin CardZone | 0.078125/0.070312/0.078125/0.109375 → **0.125/0.125/0.125/0.140625** | 09-28 |
| T_CloseIcon | 512×1024 → 512×512 | 09-30 |
| Margin T_HeaderAsimBlack | 0.160156/0.351562/0.160156/0.078125 → **0.265625/0.082031/0.267578/0.230469** | 09-30 |
| Images du téléporteur | brutes → bordure + coins ; dossier annoncé `v2\` → réel `Outlined\` | 10-02 |
| FinalIcon | fichiers à la racine → sous-dossiers `v1 - gtp` / `v2 - backup_before_gemini` / `v2 - gemini` (par Williams) | 09-28 |

## 9. Problèmes connus et points ouverts

**Règles et organisation**
- **Écritures hors workspace** : tout l'historique a écrit dans `E:\Fortnite\UI\...` (9Slices, BrainrotRNG_UI, racine UI, `.bak`) et dans `C:\Users\willi\.gemini\...` (skill, config MCP, brain, scratchpad). C'est désormais **contraire à la règle T3 n°1** sans accord explicite de Williams. Il faut une convention, par exemple produire dans `E:\Antigravity\Photoshop_Agentic\out\` et laisser Williams copier, ou obtenir une autorisation permanente pour `E:\Fortnite\UI\`.
- **Skill hors workspace** : `uefn-9slice` vit dans `~/.gemini`. T3 Code ne le charge pas. **[déduction]** Il faudra le copier ou porter `process_9slice.py` dans le workspace (accord requis pour toute écriture dans `~/.gemini`).
- **Workspace pollué** : environ 130 PNG de debug et des copies de livrables à la racine (164 entrées). À ranger ou archiver avec l'accord de Williams (règle : ne rien supprimer sans accord).

**Fiabilité**
- **Règle anti-écrasement mal respectée** :
  - recolorisations des 09-11 et 09-12 réécrites sous le même nom (Pink, Green, Yellow en 9-slice, sources Mail) ;
  - `T_CardContainerPurple_9Slice_256x256` régénéré 3 fois le 09-10 ;
  - sources `T_Mail*` de `2_CORE\Panels\` écrasées le 09-11 ;
  - `T_HeaderAsimBlack_9Slice_512x256` régénéré sous le même nom le 09-30.
- **Doublons de versions** : `T_MailPurple_9Slice_256x256.png` et `…_1.png` coexistent. Pour Cyan, le `…_1.png` annoncé le 09-11 est **absent** du disque, alors qu'un `T_MailCyan_9Slice_256x128.png` jamais cité existe. Un `T_MailCyan_9Slice_256x256.png` traîne aussi à la racine `E:\Fortnite\UI\`. Version de référence inconnue.
- **Chemins annoncés introuvables** :
  - `ImageTeleporter\v2\` (on trouve `Outlined\`) ;
  - `FinalIcon\T_EnemyRush.*` à la racine (versions dans les sous-dossiers, plus un `E:\Fortnite\UI\T_EnemyRush.PNG`) ;
  - `9Slices\T_WoodenContainer2_9Slice_256x256_1.png` ;
  - `E:\Fortnite\UI\T_Modal.PNG` / `T_Modal_Back.PNG` (09-03), absents. **[déduction]** Peut-être renommés en `T_ModalInner` / `T_ModalOuter`.
  - Fichiers présents mais jamais cités : `T_ModalRed_LightCeladon_9Slice_512x512.png`, `T_CloseBookIcon.png`, `T_RacingFlag.png`.
  - → **Toujours vérifier sur disque avant de se fier à un chemin de l'historique.**
- **Emplacement ambigu des sources Mail** : racine `E:\Fortnite\UI\T_Mail*.png` (1024×256, palettes du 09-12) contre `BrainrotRNG_UI\2_CORE\Panels\` (PSD, Red, White, Pinkier…).
- **Nommage trompeur** : `T_1_POT_1024x2048_Padded_blue_Stretched_9Slice_256x256_1.png` est violet. `T_FlagIcon512Px.png` fait 1024×1024. `T_ButtonDarkGrey.png` existe à la racine UI et dans `9Slices\`.
- **Détection auto des marges** peu fiable sur les bordures épaisses et les headers asymétriques : il a fallu corriger −60 %, ÷2.5 et la 1ʳᵉ découpe de AsimBlack était fausse.
- **Qualité générative** : bavures et décalages de pixels sur le drapeau et les CardZone, jusqu'au passage au vectoriel 8×.
- **Blocage de Photoshop** par une boucle JSX (09-12) : faire l'analyse pixel en Python.
- **Opacité cumulée** du calque anti-bleed en cas de double passe batch.

**Demandes restées sans réponse ou non vérifiées**
- `ca9b75fa` (09-23) : ombre portée haut→bas au lieu de gauche→droite. **Non traitée.**
- `e25a785a` (09-25) : `2c1767 → 183ead`, sans réponse, probablement absorbée par `0aac9e5f`.
- `e16e6c54` (09-09, 3ᵉ demande) : interrompue, refaite dans `d2c15d41`.
- `f3c7b315` (09-11) : T_MailCyan teinte +22, confirmation d'écrasement jamais donnée (remplacée ensuite par `de3d734e`).
- `2c6b79fc` (09-10) : canvas 512×256 de `T_ButtonAdvancedBlue`, visuel de 272 px donc ~8 px rognés en haut et en bas. Non résolu.
- `3a2a5954` / `bce4924d` (09-11) : étirement non homothétique des Mail (546×149 → 1024×256), déformation possible, rendu non vérifié.
- Vert final de T_MailGreen (72,188,54) ≠ cible de Williams rgb(51,163,67), non validé.
- Rendu UEFN réel de la plupart des 9-slices non confirmé (seul T_ModalSimple l'a été).
- Affirmations non vérifiées de l'agent : gains VRAM, « méthode préconisée par Epic », recompression BC7/DXT.

## 10. Prochaines étapes (priorisées)

1. **Fixer avec Williams la politique d'écriture** : sortie dans le workspace ou autorisation pour `E:\Fortnite\UI\...`. Préalable à toute production.
2. **Rapatrier l'outillage dans le workspace** : copier ou porter `process_9slice.py` (+ SKILL) et créer des scripts réutilisables (9-slice avec mesure fiable des marges, recolorisation en rampe avec AA, bordure + coins par lot, POT + anti-bleed). Objectif : des marges reproductibles.
3. **Téléporteur** : confirmer que `ImageTeleporter\Outlined\` est la version validée, puis assembler le widget (header Red + modal DarkCrimson + cartes Red/Gold).
4. Mettre à jour dans les widgets UMG les marges devenues obsolètes : CardZone, `T_HeaderAsimBlack`.
5. Traiter la demande en suspens : ombre portée verticale (`ca9b75fa`). Identifier d'abord la texture concernée avec Williams.
6. Faire trancher : `T_EnemyRush` (GPT ou Gemini), `T_ButtonAdvancedCyan` (A ou B), versions `_1` des Mail (Purple, Cyan).
7. Nettoyer, avec accord, la racine du workspace (archiver dans un sous-dossier plutôt que supprimer) et les `.bak` et doublons.
8. Plus tard : implémenter le layout Équipe/Inventaire proposé le 09-07 si Williams le souhaite.

## 11. Préférences et façons de travailler de Williams

- **Français**, messages courts souvent dictés (fautes, « neuf slices »). Formule type : « fais-moi le 9 slice de la texture ouverte dans l'instance de Photoshop actuelle ».
- Travaille **toujours sur l'instance Photoshop ouverte et le document actif**. Veut voir le résultat rechargé dans PS. Envoie des **captures d'écran** pour désigner les zones.
- Exigences constantes :
  - **puissance de 2** ;
  - **« sans perdre en qualité »**, **jamais déformer** (icônes centrées, outlines non étirées, bordures « sans les agrandir ») ;
  - **cohérence de la DA et de la logique des bords et outlines** ;
  - bords **pixel-perfect** : épaisseur constante, aucun saut de pixel, aucun pixel parasite, coins symétriques.
- Couleurs données en `rgb(r,g,b)` ou en **hex sans `#`**, par paires « X par Y ». Attend un remplacement exact avec l'harmonie clair/sombre conservée.
- **Portée stricte** : « uniquement celle que je t'ai dite », ne pas toucher aux autres fichiers. Respecter « ne l'enregistre pas ».
- Distingue taille d'image et texture : ni zoom/dézoom ni transparence ajoutée, la texture doit remplir la taille demandée. Il corrige vite en cas de malentendu.
- Le 9-slice est le livrable par défaut, sauf s'il dit « pas besoin du 9 slice, garde les dimensions ». Pour l'agent, « fermer le 9-slice » veut dire finaliser, enregistrer et fermer dans PS **[déduction]**.
- Attend une **réponse prête à l'emploi** : fiche UMG avec Margin copiable, tableau, snippet Verse, liens `file:///`.
- Itère avec des retours visuels chiffrés (« −60 % », « ÷2.5 », « ça bave »). Garde le choix final entre variantes : proposer 2 à 4 options nommées.
- Travaille par lot : « fais ça pour toutes les instances ouvertes ».
- DA : cartoon Dobo UI, contours noirs épais, cel-shading 2–3 tons, reflets en gélule, ombre portée verticale noire à ~25 %. Marron/jaune/orange + bleu complémentaire, cyan pour les boutons. Préfère les designs **simples**.
- Veut comprendre le pourquoi (principe du 9-slice, perf) et **capitaliser en skills**.
- Réorganise lui-même les sorties et compare plusieurs IA (GPT vs Gemini).

## 12. Questions à poser à Williams / incohérences relevées

1. **Écriture** : autorises-tu une écriture permanente dans `E:\Fortnite\UI\` (9Slices, BrainrotRNG_UI…) ? Sinon, faut-il produire dans le workspace (ex. `out\`) pour que tu copies ?
2. **Skill 9-slice** : peut-on copier `~/.gemini/config/skills/uefn-9slice/` dans le workspace pour que T3 Code l'utilise et l'améliore ?
3. **Nettoyage** : peut-on archiver dans un sous-dossier du workspace les ~130 PNG de debug et les copies de livrables de la racine ?
4. **Téléporteur** : `ImageTeleporter\Outlined\` est-il bien la version finale (l'agent annonçait `v2\`) ?
5. **T_EnemyRush** : version `v1 - gtp` ou `v2 - gemini` ? À quoi correspond `E:\Fortnite\UI\T_EnemyRush.PNG` ?
6. **Mail** : quelles versions font foi ?
   - `T_MailPurple_9Slice_256x256` ou `_1` ?
   - Où est passé `T_MailCyan_9Slice_256x256_1`, et d'où vient `T_MailCyan_9Slice_256x128` ?
   - Les sources de référence sont-elles à la racine `E:\Fortnite\UI\` ou dans `2_CORE\Panels\` ?
7. **T_MailYellow vs T_MailGreenLight** : GreenLight remplace-t-il Yellow (même palette) ? `T_MailYellow.png` existe toujours.
8. **T_MailGreen** : le vert final 72,188,54 te convient-il (ta cible était rgb(51,163,67)) ?
9. **Ombre portée verticale** (09-23, jamais traitée) : sur quelle texture ? Est-ce toujours d'actualité ?
10. **T_ButtonAdvancedCyan** : option A (bi-ton) ou B (`_Smooth`) ?
11. **T_ButtonAdvancedBlue en 512×256** (09-10) : le rognage de ~8 px en haut et en bas est-il accepté ?
12. **T_WoodenContainer2 bleu `_1`** (09-25) : il est absent du disque. Supprimé volontairement ?
13. **Fichiers non tracés** (`T_ModalRed_LightCeladon`, `T_CloseBookIcon`, `T_RacingFlag`, `T_ModalInner/Outer`) : créés hors agent ? `T_Modal.PNG` / `T_Modal_Back.PNG` ont-ils été renommés ?
14. **Nommage** : la règle « un seul `_` » est-elle abandonnée au profit des suffixes `_9Slice_WxH`, `_1`… ? Faut-il renommer `T_1_…_blue_…_1` (qui est violet) et `T_FlagIcon512Px` (1024 px) ?
15. **Écran Équipe/Inventaire** (proposition du 09-07) : à reprendre ?
