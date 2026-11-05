# CONTEXTE PROJET — Blender_Agentic

> Synthèse tirée des 7 conversations Antigravity importées (`_t3/historique-antigravity/`), des artefacts Antigravity encore présents sur le disque et d'une vérification des fichiers. Ce qui est incertain est marqué **[incertain]**.
> Dernière mise à jour : **2026-10-13**

---

## 1. Objectif du projet

Piloter **Blender** par un agent IA, via le MCP `blender-mcp`, et le plus souvent aussi **UEFN** via le MCP `uefn`, pour préparer les personnages « Brainrot » du jeu Fortnite/UEFN **BrainrotRNG** de Williams :
- correction de textures, de matériaux et d'UV ;
- rig et contraintes d'animation ;
- textures en puissance de deux (POT) et atlas ;
- export **VAT** (Vertex Animation Textures) avec l'addon **OpenVAT**, puis intégration dans UEFN (textures, Material Instances, Static Meshes, Niagara System).

Objectif ouvert depuis le 08/10 : créer un **skill** réutilisable « VAT Blender → UEFN » (voir § 8).

Le dossier `Blender_Agentic` sert d'espace de travail à l'agent. Les assets du jeu sont ailleurs, dans `D:\Broz\Fornite\BrainrotRNG\` (le mot « Fornite » est bien écrit ainsi sur le disque).

## 2. État actuel (au 2026-10-13)

- **Infrastructure** : en place et vérifiée sur le disque. Ça comprend `uvx`, l'addon `blender_mcp.py` dans Blender 5.0, 5.1 et 5.2, OpenVAT dans les trois versions, et les MCP `blender`, `uefn` et `photoshop` déclarés dans `~/.gemini/config/mcp_config.json`.
- **OneXOneXOneXOne** : le 21/08, Williams a tout fait annuler (« on oublie le blanc pour les os du torse »). Le problème d'origine n'est donc **pas résolu** : le torse s'affiche avec la mauvaise texture dans UEFN.
- **Gunter (Geoff + canard)** : le 05/10, l'os du canard a été détaché de la main dans l'animation Walk, et les textures ont été fusionnées en un atlas unique de 512×512. Les VAT Attack, Idle et Walk existent (dossiers datés du 08/10).
- **Nahuel le Pain** : la texture est passée en 2048×2048 le 08/10 (vérifié). Le 09/10, on a diagnostiqué la tranche de pain qui disparaît dans le VAT Attack. Le VAT Attack a été **re-baké le 09/10 à 11:48** (heure locale), juste après la conversation. On ne sait pas si le problème est réglé dans UEFN **[incertain]**.
- **Skill VAT** : la séance de questions (`/grill-me`) a commencé le 08/10, mais **aucun skill n'a été créé**. Il n'existe rien dans `~/.gemini/config/skills/` ni dans `E:\Antigravity\Blender_Agentic\skills\`, qui est vide.

## 3. Architecture et fichiers clés

### Dossier de travail `E:\Antigravity\Blender_Agentic`
| Chemin | État |
|---|---|
| `GEMINI.md` | Directives du projet : MCP, addon, port, workflow d'activation |
| `T3_RULES.md`, `CLAUDE.md` | Règles T3 |
| `.agents\`, `rules\`, `skills\` | Existent mais **vides** |
| `_t3\historique-antigravity\` | 7 conversations et `INDEX.md` |

> Le projet se trouvait d'abord dans `D:\Antigravity\Blender_Agentic` (conversations du 20 et 21/08). Depuis le 05/10, il est dans `E:\Antigravity\Blender_Agentic`. Le dossier `D:\Antigravity\Blender_Agentic` **n'existe plus**.

### Assets du jeu — `D:\Broz\Fornite\BrainrotRNG\`
On y trouve aussi `Brainrot DataTable.xlsx`, `Scripts\` (BrainrotRNG et SlimeRNG en .txt et .zip), `LuckyBlock\`, `SFX\`, `Slime\`, `Textures\`, ainsi qu'une copie portable de Blender, `Brainrot\blender-5.1.0-windows-x64\`. Le dossier `Brainrot\` contient environ 50 personnages, un sous-dossier par personnage.

| Personnage | Fichiers cités dans les conversations | Vérification |
|---|---|---|
| OneXOneXOneXOne | `B_OneXOneXOneXOne.blend`, `T_OneXOneXOneXOne.png`, `T_OneXOneXOneXOne_Dagger.png` (+ `_nmap`), `VAT_Attack/Idle/Walk\` | Présents. Le .blend est daté du 04/09, donc il a été modifié après la restauration du 21/08 |
| Gunter | Conversation : `...\Brainrot\Gunther\T_Geoff.png`, `B_Gunter.blend` | Incohérence : Le dossier réel s'appelle **`Gunter`**, pas `Gunther`. **`T_Geoff.png` est introuvable**. `T_Gunter.png` (236 772 octets, 05/10) a exactement la même taille que l'atlas fusionné : c'est probablement l'atlas **[incertain]**. Les originaux ont été rangés dans `Gunter\OldTexture\` (`T_Duck*.png`, `T_Gunter_original.png`, ancien `T_Gunter.png`). Il existe aussi `B_Gunterv2.blend1` |
| Nahuel | `T_NahuelLePain.png` (2048²), `T_NahuelLePain_backup_1254.png`, `B_NahuelLePain.blend`, `B_Nahuel.blend`, `B_NahuelLePain_backup.blend`, `VAT_Attack\Nahuel-remap_info.json`, `SM_NahuelLePainAttack.fbx`, `T_VATNahuelLePainAttack.png` | Tous présents. La texture fait bien 2048×2048 |

### Côté UEFN (projet `BrainrotRNG`)
Ces chemins viennent des conversations. Je n'ai pas pu les vérifier directement.
- Master Material VAT : `/BrainrotRNG/Material/VAT/M_NSAnimateBrainrotMesh` (Blend Mode **Opaque**).
- Pour chaque personnage : `/BrainrotRNG/Brainrot/<Nom>/Texture/`, `Material/`, `Mesh/`, `NiagaraSystem/`.
- Exemple de référence : `AvocadiniGuffo`. Il comprend `MI_VATAvocadiniGuffoWalk`, `T_VATAvocadiniGuffoWalk`, `T_AvocadiniGuffo`, `SM_AvocadiniGuffoWalk` et `NS_AvocadiniGuffo`.

### Hors dossier (configuration)
| Chemin | État |
|---|---|
| `C:\Users\willi\.local\bin\uvx.exe` | OK |
| `C:\Users\willi\.gemini\config\mcp_config.json` (serveurs `gdrive`, `uefn`, `blender`, `photoshop`) | OK |
| `%APPDATA%\Blender Foundation\Blender\{5.0,5.1,5.2}\scripts\addons\blender_mcp.py` | OK dans les trois versions |
| `%APPDATA%\Blender Foundation\Blender\{5.0,5.1,5.2}\extensions\user_default\openvat\` | OK dans les trois versions |
| `C:\Users\willi\.gemini\config\skills\` (`send-email`, `uefn-9slice`, `verse-coding-standards`) | OK, aucun skill VAT |

### Artefacts Antigravity (`C:\Users\willi\.gemini\antigravity\brain\<id>\`)
- **5a7fa2d7** (UEFN Multi Texture) : on y trouve `implementation_plan.md` et `walkthrough.md`, tous deux lus. Ils décrivent la version « os blancs » : Slot 1 et vertex colors. Elle est **obsolète**, puisqu'elle a été annulée en fin de conversation. Il y a aussi des PNG de prévisualisation : `onex_tex_inspect.png`, `preview_blender.png`, `preview_torso_fixed.png`.
- **e4ded4d2** (Fusion textures) : `T_Duck.png`, `T_Gunter.png`, `T_Merged_Test.png`.
- **3fe7df4b** (Redimensionner) : `render_check.png`, `render_nahuel.png`.
- **fd29fab3** (Skill VAT) : il n'y a pas d'artefact, mais le `transcript.jsonl` contient les réponses de Williams. Elles sont reprises au § 6.
- **ae495d0e**, **a8a35340**, **21345238** : seulement des logs système, aucun artefact.
- Aucun `task.md` dans aucune conversation.

## 4. Outils, MCP et workflows

- **Blender MCP** : `blender-mcp` (ahujasid), lancé par `uvx`. Il passe par un socket local sur `localhost:9876` et désactive la télémétrie (`BLENDER_MCP_TELEMETRY=false`).
  - Activation : dans Blender, ouvrir `Edit > Preferences > Add-ons` et cocher **Interface: Blender MCP**. Ensuite, dans la vue 3D, appuyer sur `N`, ouvrir l'onglet **BlenderMCP** et cliquer sur **Start MCP Server**.
  - Outils : `execute_blender_code`, `get_scene_info`, `get_object_info`, `get_viewport_screenshot`, plus Poly Haven, Sketchfab et Hyper3D/Hunyuan3D.
- **Versions de Blender** : au départ (20/08), l'addon n'était installé que dans 5.0 et 5.2. Le 21/08, il a été ajouté à **5.1**, la version 5.1.0 étant celle qu'utilise Williams. Il y a aussi une copie portable de 5.1.0 dans `D:\Broz\Fornite\BrainrotRNG\Brainrot\`.
- **MCP UEFN** (`uefn`) : il donne accès à des toolsets de l'éditeur, appelés avec `call_tool`, `list_toolsets` et `describe_toolset`. Toolsets utilisés : `AssetTools` (find_assets, list_folders, get_dependencies), `MaterialInstanceTools` (list/get parameters), `ObjectTools` (get_properties), `NiagaraToolset_System` (GetSystemSummary), et `TextureTools` pour l'import.
- **MCP Photoshop** et **gdrive** : déclarés dans la configuration, mais aucune conversation ne les utilise.
- **OpenVAT** (extension Blender) : il bake la VAT et exporte trois fichiers : le Static Mesh FBX, la texture VAT et `<Nom>-remap_info.json` (Min, Max, Frames).
  - Le réglage **Deformation Basis** se trouve dans la section *Vertex Position*. Il propose `Start Frame` (défaut), `Current Frame` et `Selected Object`.
- **Pipeline UEFN d'un Brainrot** : le Static Mesh est animé par un MI VAT dérivé de `M_NSAnimateBrainrotMesh` et affiché par un Niagara System `NS_<Nom>`.
  - Paramètres du MI VAT : `FrameCount`, `Y-Resolution`, `FPS`, `FrameStart`, `MinValues`, `MaxValues`, `VAT_Texture`, `TexParam` (texture couleur), plus les variantes Shiny et Inverted.
  - Variables utilisateur du NS : `User.Attack`, `User.Idle`, `User.Base`, `User.Big`, `User.Huge`, `User.Shiny`, `User.Inverted`, `User.Hit`, `User.HealthPercent`, `User.TextLevel…`, `User.TextRarity…`.

## 5. Décisions prises

| Décision | Source |
|---|---|
| On utilise `blender-mcp` (ahujasid) via `uvx`, avec une configuration MCP globale Gemini | 20/08, *Blender MCP Server Integration* |
| OneXOneXOneXOne : plusieurs approches ont été essayées. Il y a eu des MI Torso séparés, la peinture des os en blanc sur la texture, un Slot 1 avec vertex colors, puis un atlas avec un seul matériau. **Au final, Williams a demandé de tout annuler** : texture, slots `Cube0101Mtl`, `Cube0071Mtl` et `Mat_1x1x1x1_Torso`, MI Torso supprimés dans UEFN | 21/08, *UEFN Multi Texture Import Fix* |
| Williams préfère **un seul matériau et une seule texture (atlas)** par personnage, parce que c'est plus simple avec les matériaux VAT. Ce choix ressort le 21/08 et a été appliqué le 05/10 sur Gunter | 21/08 et 05/10, *Fusion De Textures* |
| Gunter : on fusionne les textures de Geoff et du canard. L'atlas fait 512×512, avec Geoff dans la moitié gauche et le canard dans la moitié droite. Les U sont remappés, il reste un seul slot `M_Geoff`, le slot `M_Duck` est supprimé, et l'ancienne UV est conservée dans `UVMap_Original` | 05/10, *Fusion De Textures* |
| Gunter : dans l'action Walk, l'influence de la contrainte `Copy Location` de `Duck_Root` (cible `Master Rig → LeftHand`) est mise à 0 sur les frames 0 à 32 | 05/10, *Fix Duck Bone Parenting* |
| Les textures doivent avoir des dimensions en **puissance de deux**. 2048×2048 est présenté comme le « standard du projet », mais c'est l'agent qui l'affirme **[incertain]** | 08/10, *Redimensionner une Texture* |
| VAT avec un objet qui apparaît ou disparaît (scale à 0) : il faut baker le mesh de référence sur une frame où l'objet est visible (`Deformation Basis = Current Frame`), puis reporter le Min et le Max du JSON dans le MI | 09/10, *Missing Bread Slice* |
| Spécifications du skill VAT données par Williams (voir § 6) | 08/10, *Création de Skill VAT* (transcript) |

## 6. Conventions

**Nommage des assets**
- `B_<Nom>.blend` : fichier Blender.
- `T_<Nom>.png` : texture couleur.
- `T_<Nom>Icon.png` : icône.
- `T_VAT<Nom><Anim>` : texture VAT.
- `SM_<Nom><Anim>` : Static Mesh.
- `MI_VAT<Nom><Anim>` : Material Instance VAT.
- `NS_<Nom>` : Niagara System.
- `M_...` : matériau.
- `<Nom>-remap_info.json` : données de remap de la VAT.

**Rangement**
- Dans Blender, chaque animation a son dossier : `VAT_Attack\`, `VAT_Idle\` et `VAT_Walk\`.
- Dans UEFN, chaque personnage a quatre dossiers : `Texture`, `Material`, `Mesh` et `NiagaraSystem`.
- Animations standards : `Idle`, `Walk` et `Attack`. Le mesh d'attaque s'appelle parfois `Attack1`, comme `SM_OneXOneXOneXOneAttack1`.

**Spécifications VAT données par Williams le 08/10, à reprendre dans le skill**
- La VAT se crée avec le plugin **OpenVAT**, à partir d'un mesh dans Blender.
- Format : FBX et **PNG8**, nommé `T_VAT<NomDeL'animation>`.
- Si le mesh a **moins de 4096 vertices**, on coche *single row* ; sinon on le décoche.
- La transformation se fait **toujours en World**.
- On n'exporte **pas de normales** : seule la position est cuite.
- Côté UEFN :
  1. importer `T_VAT…` dans `Texture` et la configurer ;
  2. configurer les MI dans `Material` selon la texture correspondante ;
  3. ajouter et configurer les meshes dans `Mesh` ;
  4. ajouter les meshes dans le `NS_` du dossier `NiagaraSystem`.

**Réglages de référence relevés sur AvocadiniGuffo (Walk)**
- Texture VAT :
  - `CompressionSettings = TC_VectorDisplacementmap`
  - `SRGB = false`
  - `MipGenSettings = LeaveExistingMips`
  - `Filter = Nearest`
  - `AddressX/Y = Wrap`
- Material Instance :
  - `FrameCount = 25`
  - `Y-Resolution = 50`
  - `FPS = 30`
  - `FrameStart = 0`
  - `MinValues = (-0.3, -0.5, -0.9)`
  - `MaxValues = (0.4, 0.4, 0.4)`
- Static Mesh : un seul slot `Material`, `bGenerateMeshDistanceField = false`.

**Procédures**
- Avant de modifier une texture ou un .blend, on en garde une sauvegarde : `_original`, `_backup`, `_backup_1254`, ou une couche `UVMap_Original`.
- Après une modification, on enregistre le .blend.
- Pour mettre à l'échelle sans altérer les couleurs, on rééchantillonne en Lanczos directement en sRGB.

## 7. Problèmes connus / ouverts

1. **Torse de OneXOneXOneXOne dans UEFN** : non résolu, puisque tout a été annulé.
   - Causes identifiées : le Slot 1 (`Mat_1x1x1x1_Torso`) avait `WorldGridMaterial` dans UEFN ; le torse est une sur-couche en **Alpha Blend à 0,45** dans Blender, alors que le master VAT est **Opaque** ; 252 polygones ont des UV hors de [0,1] ; enfin, bras, jambes et côtes se chevauchent sur les mêmes UV.
   - Le .blend daté du 04/09 laisse penser que Williams a continué seul **[incertain]**.
2. **Pain manquant dans le VAT Attack de Nahuel** : diagnostiqué le 09/10.
   - Causes : le mesh proxy est baké à la frame 1, où le pain est à scale 0, et UEFN supprime ces faces dégénérées à l'import (« Remove Degenerates »). Par ailleurs, le Min/Max du remap était trop étroit : `[-0.5…1.1]` contre un déplacement réel d'environ Y = -4,1 et Z = 1,88.
   - Après le re-bake du 09/10, `Nahuel-remap_info.json` donne Min `[-0.6, -1.4, -1.0]` et Max `[1.5, 0.2, 0.2]` pour 38 frames. Ces valeurs semblent **toujours plus petites** que les déplacements annoncés par l'agent.
   - Les unités ou l'espace utilisés ne sont peut-être pas les mêmes **[incertain]**. Il faut vérifier dans UEFN.
3. **Instance Blender gelée** : le 08/10, le thread principal s'est bloqué dans une boucle d'évaluation RNA pendant le travail sur Nahuel. À surveiller lors des opérations lourdes via MCP.
4. **Chemins incohérents dans les conversations** : l'agent a cité `Gunther\T_Geoff.png`, mais le dossier réel est `Gunter` et `T_Geoff.png` n'existe pas. De même, le personnage est appelé `B_Nabuell_pain` dans la conversation, alors que le fichier réel est `B_NahuelLePain.blend`.
5. **Fiabilité des affirmations de l'agent Antigravity** : le 21/08, plusieurs messages disaient « c'est fait », puis Williams répondait « ça ne fonctionne pas ». Il faut vérifier visuellement (capture du viewport, UEFN) avant d'annoncer un succès.
6. **Gunter** : on ne sait pas si l'atlas fusionné a été validé dans UEFN, ni ce que contient `B_Gunterv2.blend1` **[incertain]**.

## 8. Prochaines étapes

1. **Créer le skill VAT Blender → UEFN.** La séance de questions (`/grill-me`) s'est arrêtée après 4 questions. Une recherche de `remap_info.json` a été annulée et aucun fichier n'a été produit.
   - Il faut reprendre à partir des spécifications du § 6 et de l'exemple AvocadiniGuffo.
   - Emplacement probable : `E:\Antigravity\Blender_Agentic\skills\`. **À confirmer** avec Williams, car les autres skills sont dans `~/.gemini/config/skills/`.
   - Questions encore ouvertes : FPS et nombre de frames, valeur `Y-Resolution`, options d'import FBX dans UEFN, configuration du Niagara (Mesh Renderer, variables `User.*`), automatisation via les MCP ou procédure manuelle.
2. **Nahuel** : vérifier dans UEFN que la tranche de pain apparaît bien après le re-bake du 09/10, et que `MinValues`/`MaxValues` de `MI_VATNahuelLePainAttack` correspondent au JSON.
3. **OneXOneXOneXOne** : demander à Williams si le problème du torse est toujours d'actualité. Piste privilégiée : atlas unique avec un seul matériau, et suppression de la sur-couche alpha.
4. Remplir les dossiers `rules\`, `.agents\` et `skills\` du projet, ou les supprimer, selon ce que veut Williams.

## 9. Préférences de Williams

- Il écrit en **français**, souvent oralement ou par dictée : fautes de frappe, noms approximatifs comme « Nabuell » ou « T_Nawel_Le_Pain ». Il tutoie l'agent et attend des réponses en français.
- Il demande souvent que l'agent **agisse directement via les MCP** dans *l'instance Blender ouverte*, plutôt que de recevoir des instructions manuelles.
- Il préfère les solutions **simples à intégrer avec les VAT** : un seul matériau et une seule texture par personnage.
- Il est **exigeant sur la précision** (« fais ça minutieusement »). Il veut que seule la zone demandée soit modifiée, sans débordement.
- Il n'hésite pas à **tout annuler** quand le résultat ne lui convient pas. Il faut donc garder des sauvegardes et rendre chaque changement réversible.
- Il utilise des commandes d'agent comme `/goal` et `/grill-me`. Pour la conception du skill, il veut être interrogé étape par étape.
- Il fournit des captures d'écran (UEFN, Blender) pour montrer les problèmes.

## 10. Journal chronologique

| Date | Conversation | Résultat |
|---|---|---|
| 20/08 | Blender MCP Server Integration | `uvx` installé, addon `blender_mcp.py` déployé dans Blender 5.0 et 5.2, configuration MCP Gemini, `GEMINI.md` créé (alors dans `D:\Antigravity\…`) |
| 21/08 | UEFN Multi Texture Import Fix (49 msg) | Torse de OneXOneXOneXOne mal texturé dans UEFN. Nombreux essais : MI Torso, peinture des os, alpha, vertex colors, atlas. Addon ajouté à Blender 5.1. **Tout est annulé à la demande de Williams** ; non résolu |
| 05/10 | Fix Duck Bone Parenting | `B_Gunter.blend` : influence de la `Copy Location` de `Duck_Root` mise à 0 dans Walk (fait) |
| 05/10 | Fusion De Textures Blender | Gunter : atlas de 512×512 (Geoff + canard), UV remappées, un seul slot `M_Geoff`. Le fichier annoncé `T_Geoff.png` est aujourd'hui introuvable |
| 08/10 | Création de Skill VAT Blender UEFN | Séance de questions entamée, spécifications VAT recueillies, MI et texture d'AvocadiniGuffo analysés. **Interrompue, aucun skill créé** |
| 08/10 | Redimensionner une Texture Blender | `T_NahuelLePain.png` passé de 1254² à 2048² (Lanczos), packé dans `B_NahuelLePain.blend` et `B_Nahuel.blend`, sauvegardes faites. L'instance Blender s'est gelée |
| 09/10 | Missing Bread Slice In UEFN | Diagnostic du pain absent du VAT Attack : faces dégénérées à scale 0 sur la frame de base, et remap Min/Max trop étroit. Solution : `Deformation Basis = Current Frame` (frames 13 à 20) et report du Min/Max. Re-bake constaté à 11:48 ; résultat dans UEFN inconnu |
