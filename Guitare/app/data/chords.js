/* Dictionnaire d'accords. shape : de la corde 6 à la corde 1 (x = non jouée). fingers : doigts main gauche (0 = à vide). */
(function (root) {
  const GS = root.GS = root.GS || {};
  GS.data = GS.data || {};
  const C = (name, full, shape, fingers, group, level) => ({ name, full, shape, fingers, group, level: level || 2 });
  GS.data.chords = [
    // Les essentiels
    C('Em', 'Mi mineur', '022000', '023000', 'Ouverts', 1),
    C('Am', 'La mineur', 'x02210', 'x02310', 'Ouverts', 1),
    C('C', 'Do majeur', 'x32010', 'x32010', 'Ouverts', 1),
    C('G', 'Sol majeur', '320003', '210003', 'Ouverts', 1),
    C('D', 'Ré majeur', 'xx0232', 'xx0132', 'Ouverts', 1),
    C('E', 'Mi majeur', '022100', '023100', 'Ouverts', 1),
    C('A', 'La majeur', 'x02220', 'x01230', 'Ouverts', 1),
    C('Dm', 'Ré mineur', 'xx0231', 'xx0231', 'Ouverts', 1),
    C('Fmaj7', 'Fa majeur 7 (Fa sans barré)', 'xx3210', 'xx3210', 'Ouverts', 1),
    C('G6', 'Sol 6', '320000', '210000', 'Ouverts', 1),
    C('Cadd9', 'Do add9', 'x32033', 'x21034', 'Ouverts', 2),
    C('Asus2', 'La sus2', 'x02200', 'x01200', 'Ouverts', 2),
    C('Asus4', 'La sus4', 'x02230', 'x01240', 'Ouverts', 2),
    C('Dsus2', 'Ré sus2', 'xx0230', 'xx0130', 'Ouverts', 2),
    C('Dsus4', 'Ré sus4', 'xx0233', 'xx0134', 'Ouverts', 2),
    C('Esus4', 'Mi sus4', '022200', '023400', 'Ouverts', 2),
    C('Em7', 'Mi mineur 7', '020000', '010000', 'Septièmes', 1),
    C('Am7', 'La mineur 7', 'x02010', 'x02010', 'Septièmes', 1),
    C('E7', 'Mi 7', '020100', '020100', 'Septièmes', 1),
    C('A7', 'La 7', 'x02020', 'x01020', 'Septièmes', 1),
    C('D7', 'Ré 7', 'xx0212', 'xx0213', 'Septièmes', 1),
    C('G7', 'Sol 7', '320001', '320001', 'Septièmes', 1),
    C('C7', 'Do 7', 'x32310', 'x32410', 'Septièmes', 2),
    C('B7', 'Si 7', 'x21202', 'x21304', 'Septièmes', 2),
    C('Dm7', 'Ré mineur 7', 'xx0211', 'xx0211', 'Septièmes', 2),
    C('Cmaj7', 'Do majeur 7', 'x32000', 'x32000', 'Septièmes', 2),
    C('Dmaj7', 'Ré majeur 7', 'xx0222', 'xx0123', 'Septièmes', 2),
    C('Gmaj7', 'Sol majeur 7', '320002', '320001', 'Septièmes', 2),
    C('Amaj7', 'La majeur 7', 'x02120', 'x02130', 'Septièmes', 2),
    C('Emaj7', 'Mi majeur 7', '021100', '031200', 'Septièmes', 2),
    // Barrés
    C('F', 'Fa majeur', '133211', '134211', 'Barrés', 3),
    C('Fm', 'Fa mineur', '133111', '134111', 'Barrés', 3),
    C('F#', 'Fa♯ majeur', '244322', '134211', 'Barrés', 3),
    C('F#m', 'Fa♯ mineur', '244222', '134111', 'Barrés', 3),
    C('Gm', 'Sol mineur', '355333', '134111', 'Barrés', 3),
    C('Bb', 'Si♭ majeur', 'x13331', 'x12341', 'Barrés', 3),
    C('Bbm', 'Si♭ mineur', 'x13321', 'x13421', 'Barrés', 3),
    C('B', 'Si majeur', 'x24442', 'x12341', 'Barrés', 3),
    C('Bm', 'Si mineur', 'x24432', 'x13421', 'Barrés', 3),
    C('C#m', 'Do♯ mineur', 'x46654', 'x13421', 'Barrés', 3),
    C('Cm', 'Do mineur', 'x35543', 'x13421', 'Barrés', 3),
    C('Eb', 'Mi♭ majeur', 'x68886', 'x12341', 'Barrés', 3),
    C('Ab', 'La♭ majeur', '466544', '134211', 'Barrés', 3),
    C('F#m7', 'Fa♯ mineur 7', '242222', '131111', 'Barrés', 3),
    C('Bm7', 'Si mineur 7', 'x24232', 'x13121', 'Barrés', 3),
    C('C#7', 'Do♯ 7', 'x46464', 'x13141', 'Barrés', 3),
    C('F#7', 'Fa♯ 7', '242322', '131211', 'Barrés', 3),
    // Couleurs espagnoles et extensions
    C('E7b9', 'Mi 7 (♭9) — couleur flamenca', '020131', '020131', 'Couleurs', 3),
    C('Am9', 'La mineur 9', 'x02413', 'x02413', 'Couleurs', 3),
    C('Bbmaj7', 'Si♭ majeur 7', 'x13231', 'x13241', 'Couleurs', 3),
    C('Bm7b5', 'Si demi-diminué', 'x2323x', 'x1324x', 'Couleurs', 3),
    C('Bdim', 'Si diminué', 'x2343x', 'x1243x', 'Couleurs', 3),
    C('F/C', 'Fa basse Do', 'x33211', 'x34211', 'Couleurs', 3),
    C('G/B', 'Sol basse Si', 'x20003', 'x10003', 'Renversements', 2),
    C('C/G', 'Do basse Sol', '332010', '342010', 'Renversements', 2),
    C('D/F#', 'Ré basse Fa♯', '200232', '100243', 'Renversements', 2),
    C('Am/G', 'La mineur basse Sol', '302210', '302410', 'Renversements', 2),
    C('Em/G', 'Mi mineur basse Sol', '322000', '312000', 'Renversements', 2),
    C('Dm/F', 'Ré mineur basse Fa', '1x0231', '1x0342', 'Renversements', 2),
    C('E5', 'Quinte de Mi', '022xxx', '012xxx', 'Quintes', 1),
    C('A5', 'Quinte de La', 'x022xx', 'x012xx', 'Quintes', 1),
    C('D5', 'Quinte de Ré', 'xx023x', 'xx013x', 'Quintes', 1),
  ];
  GS.data.chordShape = (name) => {
    const c = GS.data.chords.find((x) => x.name === name);
    return c ? c.shape : null;
  };
})(typeof window !== 'undefined' ? window : globalThis);
