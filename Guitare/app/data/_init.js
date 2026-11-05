/* Conteneurs de données : chaque fichier de contenu y ajoute ses éléments. */
(function (root) {
  const GS = root.GS = root.GS || {};
  GS.data = GS.data || {};
  GS.data.songs = [];
  GS.data.courses = [];
  GS.data.exercises = [];
  GS.data.routines = [];
})(typeof window !== 'undefined' ? window : globalThis);
