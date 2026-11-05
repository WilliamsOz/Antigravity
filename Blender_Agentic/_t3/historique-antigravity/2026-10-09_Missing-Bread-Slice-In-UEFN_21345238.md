# Missing Bread Slice In UEFN

- Conversation Antigravity : `21345238-2f6a-4c88-aee2-c40700435be9` (thread T3 : `import:antigravity:21345238-2f6a-4c88-aee2-c40700435be9`)
- Dernière modification : 2026-10-09 09:46:08.1590965+00:00
- Workspaces d'origine : ["file:///e%3A/Antigravity/Blender_Agentic"]
- Artefacts : aucun

## Williams

J'ai fait le VAT du personnage qui est ouvert actuellement dans l'instance de Blender, donc B_Nabuell_pain, mais dans l'animation attaque, il est censé jeter du pain et quand je le transfère dans UEFN, je ne vois pas le pain. Il fait bien le geste, tout est bien nickel, mais je ne vois pas la tranche de pain qui part. Je ne vois pas de tranche de pain quand il attaque. D'où vient l'erreur ?

## Williams

J'ai fait le VAT du personnage qui est ouvert actuellement dans l'instance de Blender, donc B_Nabuell_pain, mais dans l'animation attaque, il est censé jeter du pain et quand je le transfère dans UEFN, je ne vois pas le pain. Il fait bien le geste, tout est bien nickel, mais je ne vois pas la tranche de pain qui part. Je ne vois pas de tranche de pain quand il attaque. D'où vient l'erreur ?

## Agent

L'erreur vient de **deux causes combinées** dans la chaîne Blender -> OpenVAT -> UEFN :

---

### 1. La géométrie du pain est détruite à l'import dans UEFN (Cause principale)
* **Ce qui se passe dans Blender** : Dans l'animation `Attack`, le bone `Bread_Projectile` est scalé à **`0` de la frame 1 à 12**, passe à `1` aux frames 13 à 21, puis revient à `0`.
* **Le piège OpenVAT (`START_FRAME`)** : Quand OpenVAT bake et exporte le Static Mesh FBX (`SM_NahuelLePainAttack.fbx`), il capture le maillage à la **Frame 1** et applique les modifiers.
* **Résultat** : À la frame 1, les 170 vertices (236 faces) de la tranche de pain sont tous écrasés sur un seul point avec une échelle de 0 (**polygones dégénérés / surface nulle**).
* **Conséquence dans UEFN** : À l'import FBX, Unreal/UEFN a l'option **"Remove Degenerates" cochée par défaut**. Il détecte ces 236 faces à aire nulle et les **supprime purement et simplement**. La géométrie de la tranche de pain n'existe donc même pas dans le Static Mesh importé dans UEFN. Le reste du corps s'anime car ses vertices sont valides, mais le pain est absent du mesh.

---

### 2. Le Bounding Box du Remap VAT est complètement faux (`MinValues` / `MaxValues`)
Même si le mesh contenait le pain, les valeurs de déformation du Material Instance dans UEFN bloqueraient son déplacement :
* Dans votre `Nahuel-remap_info.json` et dans `MI_VATNahuelLePainAttack` :
  * `MinValues` : `[-0.5, -0.5, -0.5]`
  * `MaxValues` : `[1.1, 1.1, 0.5]`
* **Le déplacement réel calculé lors du lancer (frame 21)** :
  * Le pain part à plus de **Y = -4.10** et monte à **Z = 1.88** en déplacement relatif.
* Comme le Max Z est plafonné à `0.5` et le Min Y à `-0.5`, la texture 8-bit sature/clippe complètement et le vertex shader d'Unreal ne peut pas déplacer les sommets au-delà de 50 cm.

---

### Comment corriger :

1. **Pour le Static Mesh (FBX) de référence** :
   * Ne bakez pas le mesh proxy sur une frame où le pain a un `scale = 0`.
   * **Option A** : Dans OpenVAT, cochez **Custom Proxy**, dupliquez votre mesh en pose de repos (où le pain et le personnage ont tous deux leur échelle normale à 1.0) et désignez-le comme proxy pour l'export FBX.
   * **Option B** : Si vous réimportez le FBX dans UEFN, vérifiez dans les options d'import FBN que **"Remove Degenerates"** est décoché (mais utiliser un Custom Proxy à scale 1 reste la méthode propre pour éviter les normales corrompues).

2. **Pour le bake VAT & le Material Instance** :
   * Re-bakez le VAT `Attack` avec la trajectoire complète du pain prise en compte dans le calcul du bounding box.
   * Reportez les nouvelles valeurs `Min` et `Max` générées dans le JSON dans les paramètres `MinValues` et `MaxValues` de `MI_VATNahuelLePainAttack`.

## Williams

Je ne trouve pas l'option Custom Proxy dans OpenVAT ?

## Agent

Dans l'interface d'OpenVAT, elle ne s'appelle pas textuellement "Custom Proxy", elle est ici :

### Où la trouver :
1. Dans le panneau latéral OpenVAT, allez dans la section **Vertex Position** (icône de flèches multidirectionnelles).
2. Repérez la ligne **`Deformation Basis`** (qui est réglée par défaut sur **`Start Frame`**).

Le menu déroulant propose 3 choix :
* **`Start Frame`** *(par défaut — celui qui pose problème car le pain est à scale 0 à la frame 1)*
* **`Current Frame`** *(la solution la plus simple)*
* **`Selected Object`** *(le mode proxy via un autre objet)*

---

### La méthode recommandée :

1. **Placez votre curseur de timeline sur la Frame 15** (ou entre 13 et 20, là où la tranche de pain est visible et à son échelle normale `1.0`).
2. Dans OpenVAT > **Vertex Position**, passez **`Deformation Basis`** sur **`Current Frame`**.
3. Relancez le Bake.
   * Le FBX généré (`SM_NahuelLePainAttack.fbx`) contiendra alors la géométrie complète du pain avec des faces normales (surface non nulle). UEFN ne supprimera plus le pain à l'import.
4. **Important** : Ouvrez le nouveau `Nahuel-remap_info.json` généré et mettez à jour `MinValues` et `MaxValues` dans **`MI_VATNahuelLePainAttack`** dans UEFN avec les nouvelles coordonnées calculées pour couvrir toute la trajectoire du jet.
