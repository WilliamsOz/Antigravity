# CONTEXTE PROJET — Local_Agentic

> Synthèse établie le 2026-10-13 à partir de l'historique Antigravity importé (`_t3/historique-antigravity/`, 2 conversations) et d'une vérification de l'état réel des disques à cette date.
> Légende : **[vérifié]** = constaté sur le disque le 2026-10-13 ; **[à confirmer]** = affirmé dans l'historique mais non vérifiable ou douteux ; **inconnu** = aucune information.

---

## 1. Objectif du projet

**Local_Agentic n'a pas d'objectif produit unique.** C'est l'espace de travail « assistant local » de Williams : on y lance un agent IA pour des tâches ponctuelles sur **sa machine Windows** (administration système, disques, outils installés en local). Les deux conversations n'ont pas de lien fonctionnel entre elles. Leur seul point commun : elles agissent sur l'environnement local (disques C:/D:/E:, dossiers `E:\Solara`, `E:\Antigravity\...`).

- Le nom s'inscrit dans une famille de projets `*_Agentic` sous `E:\Antigravity\` : `Blender_Agentic`, `BrainrotRNG_Agentic`, `Communication_Agentic`, `Drive_Agentic`, `Local_Agentic`, `Photoshop_Agentic`, `UserInterfacesTemplate_Agentic` **[vérifié]**. Chacun semble correspondre à un domaine. Pour `Local_Agentic`, ce domaine serait « le PC local ». C'est une **interprétation**, à confirmer par Williams.
- **Conversation 1 (2026-08-26)** : pure administration système. Formatage du second SSD, puis libération d'espace sur `C:`.
- **Conversation 2 (2026-08-28)** : extraction de la map Roblox *Slime RNG* avec l'injecteur Solara, puis analyse du code extrait. Cette conversation **sert en réalité un autre projet** : *Brainrots vs Slimes* (UEFN / Verse, « Studio Broz »), dont le dossier est `E:\Antigravity\BrainrotRNG_Agentic`. Elle a été menée depuis Local_Agentic sans doute parce qu'elle touchait à des outils installés localement (Solara, Roblox). Le résultat final (modification de `SlimeRNG.txt`) a été écrit **dans BrainrotRNG_Agentic, pas dans Local_Agentic**.

## 2. État actuel (au 2026-10-13)

### Fait
- **Second SSD formaté [vérifié]** : `E:` = `SSD_2`, environ 1,9 To, GPT, NTFS. Il est actuellement occupé à environ 217 Go, avec environ 1,7 To libres.
- **Libération de `C:` [vérifié]** : environ 1,4 To libres sur 1,9 To. Pendant la conversation 1, on était passé de 788 Go à 1 397 Go libres.
- **Dossiers Antigravity migrés de `D:` vers `E:` [vérifié]** : `D:\Antigravity` n'existe plus et tous les projets sont sous `E:\Antigravity\`. L'espace de travail d'origine de la conversation 1 était `d:/Antigravity/Local_Agentic`, celui de la conversation 2 `e:/Antigravity/Local_Agentic`. La migration a donc eu lieu entre le 26 et le 28 août 2026.
- **Autres éléments déplacés sur `E:` [vérifié]** : `E:\Riot Games`, `E:\SteamLibrary`, `E:\Steam`, `E:\Games`, `E:\Fortnite`, `E:\Solara`, `E:\WEAO`, `E:\OST`, `E:\SAMMI.2026.1.0.x64`, `E:\roblox-script-exporter-main`, `E:\AlbionOnline`, `E:\ChatGPT`, `E:\T3Code`.
- **Docker supprimé [vérifié]** : `C:\Users\willi\AppData\Local\Docker` et `C:\Users\willi\.docker` n'existent plus. D'après l'historique, la distribution WSL `docker-desktop` a été désenregistrée. Ubuntu WSL a été conservé.
- **`SlimeRNG.txt` modifié [vérifié]** : `E:\Antigravity\BrainrotRNG_Agentic\SlimeRNG.txt` (73 122 lignes, dernière modification le 2026-08-28 à 14:12). Ligne 16873 : `rollsUntilNext = 3500`. Ligne 65915 : `galaxy = { 3500, 3250, 3000 }`.

### Non fait ou non vérifié
- **`C:\Users\willi\.gemini` n'a pas été déplacé** sur `E:` (il est toujours sur `C:`, sans jonction) **[vérifié]**. La conversation 1 l'avait proposé, mais rien ne montre que Williams l'ait validé. Même constat pour `.antigravity-ide` : non déplacé, comme proposé.
- **Solara n'a pas été mis à jour [vérifié]** : `E:\Solara\Solara\SolaraE\SolaraV3.dll` date du 15 mai 2026 et `Solara.exe` du 7 avril 2026.
- **Aucune nouvelle extraction de Slime RNG [vérifié]** : le dossier `workspace` de Solara ne contient que le fichier du 11 juin. Aucun `SlimeRNG_Map.rbxl` ni `SlimeRNG_August_Full`.
- **Export 3D (.obj vers Blender vers UEFN)** : aucune trace. Statut inconnu.
- **Restes à nettoyer proposés dans la conversation 1** (Fortnite et UE_5.8 sur `C:`, `C:\Autodesk\..._dlm`, `$WINDOWS.~BT`, caches NVIDIA, `.cache`, Ubuntu WSL) : statut inconnu, non vérifié.
- **`D:`** : environ 302 Go libres aujourd'hui, contre 126 Go en fin de conversation 1. D'autres déplacements ont donc eu lieu depuis.

## 3. Architecture et fichiers clés

| Élément | Chemin exact | Statut |
|---|---|---|
| Dossier du projet | `E:\Antigravity\Local_Agentic` | Contient seulement `CLAUDE.md`, `GEMINI.md`, `T3_RULES.md` et `_t3\` |
| Règles T3 | `E:\Antigravity\Local_Agentic\T3_RULES.md` | [vérifié] |
| Historique importé | `E:\Antigravity\Local_Agentic\_t3\historique-antigravity\` | [vérifié] |
| Brains Antigravity | `C:\Users\willi\.gemini\antigravity\brain\f99fdaf5-e722-4708-accc-64f0811056bb\` et `...\84344ad3-2309-4a40-b208-033848d2e71e\` | [vérifié] Uniquement des logs système (`transcript.jsonl`, `tasks`, `steps`). **Aucun artefact** (pas de plan, walkthrough ni task.md) |
| Capture d'erreur Solara | `...\84344ad3-...\.user_uploaded\media_1787917402209.png` | [vérifié] « Roblox version mismatch! Try Settings -> [Fix Roblox Version]… rdd.WEAO.xyz » |
| Solara (injecteur) | `E:\Solara\Solara\SolaraE\` (exe, DLL, `workspace\`, `scripts\`, `autoexec\`) | [vérifié] version de mai 2026 |
| Extraction Slime RNG du 11 juin | `E:\Solara\Solara\SolaraE\workspace\place 92416421522960 Slime RNG.rbxlx` (20 Mo) | [vérifié]. **L'historique donne un mauvais chemin** : `E:\Solara\Solara\place …rbxlx` |
| Code Slime RNG (texte) | `E:\Antigravity\BrainrotRNG_Agentic\SlimeRNG.txt` (environ 2,4 Mo) | [vérifié], modifié le 2026-08-28 |
| Note sur une variante de SaveInstance | `E:\Universal Syn Save Instance MODIFIED PARALLELIZED DECOMP VERSION.txt` | [vérifié] existe, non lu dans l'historique |
| Autres outils liés | `E:\WEAO`, `E:\roblox-script-exporter-main` | [vérifié] existent, rôle non documenté |

Disques (état au 2026-10-13) :

| Lecteur | Matériel | Rôle |
|---|---|---|
| `C:` | NVMe WD_BLACK SN770 2 To (GPT) | Système, **à ne pas toucher** |
| `D:` | HDD WDC WD10EZEX 1 To (MBR), libellé « HDD » | Données mécaniques, **à ne pas toucher** |
| `E:` | SSD SATA 2 To, libellé `SSD_2` (GPT, NTFS) | Stockage : jeux, projets Antigravity, outils |

## 4. Outils, MCP et workflows utilisés

- **Agent Antigravity (Gemini)**. Outils natifs relevés dans les transcripts : `run_command` (PowerShell, très utilisé), `view_file`, `grep_search`, `replace_file_content`, `search_web`, `read_url_content`, `manage_task`, `schedule`. **Aucun MCP** utilisé.
- **Limite constatée** : l'agent ne pouvait pas s'élever en administrateur (UAC). Les opérations disque bas niveau ont donc été **exécutées par Williams** dans un PowerShell administrateur (`Clear-Disk`, `Initialize-Disk -PartitionStyle GPT`, `New-Partition`, puis `format E: /FS:NTFS /V:SSD_2 /Q /Y`). L'agent a ensuite vérifié le résultat.
- **Workflow d'audit d'espace disque** : l'agent analyse les tailles et propose une liste, Williams déplace lui-même, puis l'agent revérifie.
- **Chaîne Roblox** : Solara (injecteur) + script `UniversalSynSaveInstance` (dépôt GitHub `luau/UniversalSynSaveInstance`, anciennement `centerepic`) → `.rbxl`/`.rbxlx` → Roblox Studio (« Export Selection » en `.obj`) → Blender → `.fbx` → UEFN.
- Projet aval : *Brainrots vs Slimes* en **Verse / UEFN** (Studio Broz).

## 5. Décisions prises

| Date | Conversation | Décision |
|---|---|---|
| 2026-08-26 | Formatage du second SSD | Effacer entièrement le disque 2, le convertir en GPT, créer une partition unique NTFS libellée `SSD_2`. |
| 2026-08-26 | idem | **Lettre `E:`** au lieu de `F:`, à la demande de Williams. L'ancienne partition `E:` « Réservé au système » a été supprimée. |
| 2026-08-26 | idem | Rien n'est déplacé sans validation : l'agent fournit la liste, Williams décide et déplace. |
| 2026-08-26 | idem | **Suppression totale de Docker** (et non un déplacement). Ubuntu WSL est conservé. |
| 26-28/08/2026 | (constat) | Projets Antigravity déplacés de `D:\Antigravity` vers `E:\Antigravity`. |
| 2026-08-28 | Roblox SlimeRNG | Pour extraire une map seule sous Solara : `noscripts = true`, `Decompile = false`. Pour extraire aussi le code : `Decompile = true`, `DecompileTimeout = 15`. |
| 2026-08-28 | idem | Pour obtenir un Solara à jour, passer par le Discord officiel plutôt que par les sites Linkvertise, LootLabs ou WEAO. |
| 2026-08-28 | idem | **Seuils des Galaxy Rolls abaissés** dans `SlimeRNG.txt` : de `{5000, 4750, 4500}` à `{3500, 3250, 3000}`, et `rollsUntilNext` de 5000 à 3500. Attention, voir la section 7 : ces valeurs ont été choisies par l'agent, pas reprises du jeu. |

## 6. Conventions

- Langue : **français** pour tous les échanges et documents.
- Dossiers de projets : `E:\Antigravity\<Domaine>_Agentic`.
- Le volume de stockage s'appelle `SSD_2` et porte la lettre `E:`.
- Les opérations destructrices ou administratives sont confirmées explicitement par Williams, qui les exécute lui-même en mode administrateur.
- Règles T3 (`T3_RULES.md`) : on n'écrit que dans `E:\Antigravity\Local_Agentic`, et la mémoire du projet se trouve dans `_t3/`.

## 7. Problèmes connus ou ouverts

1. **Les données post-11 juin sur Slime RNG ne sont pas fiables.** L'« update Raid Boss du 4 juillet » vient d'un résumé de recherche web (`search_web`), pas du code du jeu. Les « ajustements d'équilibrage » cités (lissage des prix du Slime Gun, baisse des seuils Void/Galaxy, hausse des coins sur les zones 28 à 33) n'ont **aucune source vérifiable**. Le fichier analysé date du 11 juin, il ne peut donc pas contenir de changement postérieur. Les formules de luck et de roll présentées en LaTeX sont des **généralisations de l'agent**, pas du code extrait. **[à confirmer]**
2. **Les valeurs Galaxy (3500/3250/3000) ont été inventées par l'agent.** Il parlait d'une « légère réduction » mais a appliqué −30 %. Ce ne sont pas les vraies valeurs actuelles de Slime RNG. `SlimeRNG.txt` ne reflète donc plus l'extraction d'origine. Aucune sauvegarde de l'original n'a été vue.
3. **Mauvais chemin dans l'historique** : l'agent a indiqué `E:\Solara\Solara\place …rbxlx`, alors que le fichier se trouve dans `E:\Solara\Solara\SolaraE\workspace\`.
4. **Solara est obsolète** (mai 2026) : erreur « Roblox version mismatch », le bouton « Fix Roblox Version » échoue. La version `0.1.7` annoncée par l'agent le 28 août via l'API WEAO est **[à confirmer]**.
5. **Risque de sécurité** : les sites de distribution d'exploits (Linkvertise, LootLabs, pubs WEAO) ont été jugés suspects par Williams (« virus »). Il faut aussi rappeler que l'utilisation d'exploits et l'extraction d'une map tierce relèvent des CGU de Roblox et du droit d'auteur du créateur. Pour un projet commercial (UEFN), il vaut mieux s'inspirer de la structure que reprendre les assets ou le code.
6. Le libellé « 610 scripts décompilés » attribué au fichier du 11 juin n'a pas été revérifié. **[à confirmer]**
7. `C:\Users\willi\.gemini` (historique Antigravity) est toujours sur `C:`. Ce n'est pas bloquant, mais la proposition est restée ouverte.

## 8. Prochaines étapes (proposées, à valider par Williams)

1. Préciser le périmètre de Local_Agentic : est-ce bien l'espace « maintenance du PC et outils locaux » ? Le travail Slime RNG doit-il être rattaché à `BrainrotRNG_Agentic` ?
2. Décider du sort de `SlimeRNG.txt` : garder les seuils Galaxy modifiés (choix de design pour *Brainrots vs Slimes*), ou revenir aux valeurs d'origine `{5000, 4750, 4500}` / `5000`.
3. Si une extraction récente de Slime RNG est toujours voulue : obtenir un Solara à jour par un canal sûr, puis relancer SaveInstance avec décompilation (le script figure dans la conversation 2).
4. Finir le nettoyage de `C:` si Williams le souhaite : Fortnite et UE_5.8 vers `E:`, suppression de `C:\Autodesk\Autodesk_Maya_2023_ML_Windows_64bit_dlm`, Nettoyage de disque (`$WINDOWS.~BT`), éventuel déplacement d'Ubuntu WSL ou de `.gemini` avec une jonction.
5. Si besoin, export 3D des zones depuis Roblox Studio, puis Blender, puis UEFN.

## 9. Préférences de Williams

- Écrit en **français**, de façon informelle et souvent dictée (fautes et oralité). Il attend des réponses en français.
- Aime les réponses **structurées** : tableaux, étapes numérotées, gains chiffrés.
- **Veut garder le contrôle** sur les actions risquées : « Surtout ne déplace rien, fais-moi juste la liste ». Il valide avant toute suppression ou tout déplacement, mais accepte que l'agent exécute une fois qu'il a dit oui (par exemple pour supprimer Docker).
- Demande des **vérifications après coup** (« vérifie que tout est bon »).
- Est prudent face aux contenus payants ou suspects. Il pose des questions de fond pour comprendre (« c'est quoi exactement ? »).
- Contexte : il développe des jeux sous **UEFN / Verse** (Studio Broz, *Brainrots vs Slimes*) et utilise Blender, Unreal Engine, Maya et Photoshop.

## 10. Historique résumé

| Date | Conversation | Sujet | Résultat |
|---|---|---|---|
| 2026-08-26 | `f99fdaf5` — Formatage du second SSD (espace de travail alors sur `D:\Antigravity\Local_Agentic`) | L'ancien SSD système SATA de 2 To est rebranché en secondaire. Explication du `E:` fantôme (partition « Réservé au système » MBR). Formatage, puis audit d'espace de `C:`. | Disque `E:` = `SSD_2` en GPT/NTFS. Williams a déplacé environ 600 Go (DD SAVE, Bureau, jeux, UE 5.1/5.5…). Docker supprimé. `C:` passe de 788 Go à 1 397 Go libres. |
| 2026-08-28 | `84344ad3` — Roblox SlimeRNG Map Extraction (espace de travail désormais sur `E:\Antigravity\Local_Agentic`) | Extraction de la map Slime RNG avec Solara, puis échec d'injection (Solara obsolète après une mise à jour de Roblox). Analyse du code de l'extraction du 11 juin (UpgradeTree, luckRolls). | Pas de nouvelle extraction. L'extraction du 11 juin a été localisée. `SlimeRNG.txt` (BrainrotRNG_Agentic) a été modifié : seuils Galaxy abaissés à 3500/3250/3000. Les affirmations sur les mises à jour post-juin sont non vérifiées. |
