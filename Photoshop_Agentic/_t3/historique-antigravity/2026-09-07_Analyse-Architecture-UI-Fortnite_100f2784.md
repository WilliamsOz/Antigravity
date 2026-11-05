# Analyse Architecture UI Fortnite

- Conversation Antigravity : `100f2784-b391-4544-8fcf-afa00728651f` (thread T3 : `import:antigravity:100f2784-b391-4544-8fcf-afa00728651f`)
- Dernière modification : 2026-09-07 09:23:12.2503662+00:00
- Workspaces d'origine : ["file:///e%3A/Antigravity/Photoshop_Agentic"]
- Artefacts : aucun

## Williams

Je vais m'occuper de l'UI front du jeu, est-ce que dans ce path E:\Fortnite\UI\BrainrotRNG_UI tu serais me dire quelle dossier sert a quelle partie de l'UI (Header, core, Footer, ... )

## Agent

Voici le découpage technique des **18 dossiers** de `E:\Fortnite\UI\BrainrotRNG_UI`, structuré selon l'architecture UI standard (Header, Core, Footer et Transversal) adaptée à un jeu RNG / RPG sous UEFN :

---

### 1. HEADER (Bandeau supérieur, HUD haut & Entêtes de fenêtres)

* **`Headers/`** (54 assets)
  * **Rôle** : Bannières de titre, rubans supérieurs de modales et fenêtres (`Header1_*`, `headerBow_*`, `headerAsim_*`, `notebook_*`).
  * **Usage** : Titre des fenêtres pop-up ("BOUTIQUE", "INVENTAIRE", "INDEX / BRAINROTS", "QUÊTES"). Déclinés par couleur pour s'accorder au thème ou à la rareté.
* **`Labels/`** (31 assets)
  * **Rôle** : Cartouches / pilules de compteurs de devises et badges (`coin_label.png`, `gem_label.png`, `energy_label.png`, `labelAdvanced_*`).
  * **Usage** : Affichage permanent des ressources du joueur (Gold, Gems, Pity / Luck multiplier) dans le coin supérieur droit ou gauche de l'écran.

---

### 2. CORE / BODY (Corps de l'écran, Fenêtres modales, Grilles & Contenu)

* **`Modals/`** (13 assets)
  * **Rôle** : Châssis / arrière-plans racines des grandes fenêtres (`darkModalSimple_*`, `modalCastle.png`, `WoodenModal.png`, `notebookModal_*`, `topBarPremade.png`).
  * **Usage** : La structure englobante (fond opaque / fenêtré) qui s'affiche quand le joueur ouvre un menu (Shop, Inventaire, Quêtes, Settings).
* **`Containers/`** (96 assets)
  * **Rôle** : Boîtes de regroupement interne (`cardContainer_*`, `containerReward_*`, `colorContainer_*`, `ButtonContainer.png`).
  * **Usage** : Sous-sections à l'intérieur d'une modale pour grouper des items, un résumé de roll ("REWARD"), ou délimiter une zone de craft.
* **`Cards/`** (32 assets)
  * **Rôle** : Cartes verticales de présentation (`Card1_*`, `Card2_*`, `cardShop_*`, `CardSelection_*`).
  * **Usage** : Carte d'affichage des Brainrots / Auras obtenus lors d'un roll, fiches de monstres dans l'Index, ou cartes d'achat dans la boutique. Code couleur par rareté (blanc = Common, vert = Uncommon, bleu = Rare, violet = Epic, jaune = Legendary, rouge = Mythic).
* **`Item Slots/`** & **`Inventory/`** (29 assets)
  * **Rôle** : Emplacements carrés de grille (`itemSlot_*`, `itemSlotAdvanced_*`, `SlotDefault*`, `SlotHover*`).
  * **Usage** : Grille de stockage de l'inventaire, slots d'équipement actif (hotbar) ou slots de fusion. Comprend les états normaux, sélectionnés et désactivés.
* **`Panels/`** (25 assets)
  * **Rôle** : Panneaux d'affichage d'informations secondaires (`panel_*`, `panelEpic_*`, `mail_*`).
  * **Usage** : Fiches de statistiques, panneau de description d'un brainrot sélectionné, ou interface de messagerie / récompenses quotidiennes (`mail_*`).
* **`Frames/`** (15 assets)
  * **Rôle** : Cadres ornementaux (`Frame1_*`, `EmptyWoodenFrame.png`, `GoldenFrameELements`).
  * **Usage** : Encadrement des portraits de joueurs, icônes d'aura légendaire ou vue 3D d'un Brainrot.
* **`Effects/`** (9 assets)
  * **Rôle** : Halos lumineux et fonds d'aura (`effect_blue.png`, `effect_yellow.png`, `effect_purple.png`...).
  * **Usage** : Glow / rayonnement placé en arrière-plan immédiat d'une carte ou d'un slot pour marquer l'impact d'un drop à haute rareté.
* **`Dialogues/`** (5 assets)
  * **Rôle** : Composants narratifs (`Dialogue2.png`, `DialogueCharacterName2.png`, `DialogueRadialChoice2.png`, `Separator3.png`).
  * **Usage** : Boîtes de réplique avec les PNJ (Forgeron, PNJ de quête), cartouche de nom de l'interlocuteur et roue/boutons de choix de dialogue.

---

### 3. FOOTER (Bandeau bas, Barres d'action, Navigation & Contrôles)

* **`Buttons/`** (139 assets)
  * **Rôle** : Boutons d'action (`buttonAdvanced_*`, `buttonCircle_*`, `adventure_*`, états default / pressed).
  * **Usage** :
    * Bouton central d'action principale : **ROLL / SPIN** au bas du HUD.
    * Boutons d'action dans les modales : "BUY", "EQUIP", "CLAIM", "CLOSE" (utiliser les `buttonCircle` pour la croix de fermeture).
* **`ProgressBars/`** (19 assets)
  * **Rôle** : Jauges et barres de remplissage (`progressBarBase_*`, `ProgressBarFill*`, `ProgressBarMaxFill*`, `SteppedProgressBar*`).
  * **Usage** : Jauge de Pity (ex: 90/100 avant le garanti Mythic), barre d'XP de compte, ou temps restant sur une potion de Luck temporaire.
* **`Arrows/`** (30 assets)
  * **Rôle** : Flèches directionnelles (`Arrow1_wood.png`, `arrowAdvanced_*`, etc.).
  * **Usage** : Pagination bas d'écran (Page 1/5 de l'inventaire), navigation entre les catégories du shop ou sélecteur de spawn.
* **`Toggles/`** (7 assets) & **`Checkboxes/`** (4 assets dans `RadioBoxes`)
  * **Rôle** : Interrupteurs ON/OFF et cases à cocher (`Toggle1_*`, `Radiobox*`).
  * **Usage** : Options de contrôle en bas d'écran ou dans les réglages : commutateurs **"Auto-Roll"**, **"Fast Roll / Skip Anim"**, **"Mute Audio"**, ou filtres de rareté ("Cacher Communs").

---

### 4. TRANSVERSAL / UTILITAIRES

* **`Icons/`** (61 assets) : Banque d'icônes 512px (coffres, clés, armures, devises, fermeture). Utilisées aussi bien dans le Header (compteurs), le Core (fiches) que le Footer (pictogrammes sur les boutons).
* **`Spritesheets/`** (2 assets) : Atlas complets (`spritesheet.png`, `spritesheet_noIcons.png`). Pratique pour générer des textures atlas et limiter les draw calls sous UEFN si tu passes par des matériaux d'interface avec UV offset.

## Williams

Est-ce que tu peux rename tout les png dans les sous dossier par T_NomDuPNG par exemple pour arrow_black ca deviendrait T_ArrowBlack, je veux 1 seul _ apres le T et une majuscule a chaque mot

## Agent

Opération terminée. Les **571 fichiers PNG** répartis dans l'ensemble des sous-dossiers de `E:\Fortnite\UI\BrainrotRNG_UI` ont été renommés selon la convention Unreal / UEFN (`T_NomDuPNG`).

### Règles appliquées
* Préfixe systématique **`T_`** (un seul underscore dans tout le nom).
* **PascalCase** intégral (majuscule au début de chaque mot/token).
* Nettoyage des caractères résiduels et caractères corrompus d'origine (ex: `colorContainer_pnk` $\rightarrow$ `T_ColorContainerPink.png`).

### Exemples de conversion
* `arrow_black.png` $\rightarrow$ `T_ArrowBlack.png`
* `coin_label.png` $\rightarrow$ `T_CoinLabel.png`
* `buttonAdvanced_black.png` $\rightarrow$ `T_ButtonAdvancedBlack.png`
* `darkModalSimple_dark.png` $\rightarrow$ `T_DarkModalSimpleDark.png`
* `adventure_1ButtonDefault.png` $\rightarrow$ `T_Adventure1ButtonDefault.png`
* `itemSlotAdvanced_yellow.png` $\rightarrow$ `T_ItemSlotAdvancedYellow.png`
* `ProgressBarMaxFill5_blue.png` $\rightarrow$ `T_ProgressBarMaxFill5Blue.png`
