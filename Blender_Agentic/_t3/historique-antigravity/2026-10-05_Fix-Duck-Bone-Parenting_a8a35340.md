# Fix Duck Bone Parenting

- Conversation Antigravity : `a8a35340-b638-463f-8fcf-337aaeda14ca` (thread T3 : `import:antigravity:a8a35340-b638-463f-8fcf-337aaeda14ca`)
- Dernière modification : 2026-10-05 12:59:38.3755512+00:00
- Workspaces d'origine : ["file:///e%3A/Antigravity/Blender_Agentic"]
- Artefacts : aucun

## Williams

Dans l'instance de blender ouvert actuellement via le mcp, Dans l'animation walk l'os du canard ne devrait pas être un child of de la main du personnage. Tu peux régler ça ?

## Agent

C'est réglé.

### Diagnostic
- La liaison entre le canard et la main du personnage reposait sur une contrainte **`Copy Location`** présente sur le pose bone `Duck_Root`, ciblant `Master Rig -> LeftHand`.
- Dans les actions `Attack` et `Idle`, l'influence de cette contrainte était déjà animée (`1.0` pour l'attaque, transition `1.0 -> 0.0 -> 1.0` pour l'idle).
- Dans l'action **`Walk`**, aucune F-Curve n'existait sur `constraints["Copy Location"].influence`. L'influence restait donc active à `1.0`, plaquant `Duck_Root` sur la main gauche au lieu de laisser s'exécuter son cycle de marche autonome.

### Modifications effectuées
1. Insertion de keyframes d'influence sur `pose.bones["Duck_Root"].constraints["Copy Location"].influence` dans l'action `Walk` :
   - Frame `0` : influence = `0.0`
   - Frame `32` : influence = `0.0`
2. Vérification du découplage : `Duck_Root` suit désormais son propre cycle d'animation indépendant sans subir les mouvements de `LeftHand`.
3. Les actions `Attack` et `Idle` conservent leur comportement respectif.
4. Fichier sauvegardé (`B_Gunter.blend`).
