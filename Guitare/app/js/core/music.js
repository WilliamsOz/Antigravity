/* Noyau musical : notes, accordage, et compilation du format de tablature.
 *
 * Une tablature s'écrit une seule fois (voir tools/FORMAT_TAB.md) ; l'affichage ET le son
 * sont générés à partir de la même donnée, donc ce qu'on entend est toujours ce qui est écrit.
 */
(function (root) {
  const GS = root.GS = root.GS || {};

  const PPQ = 24; // ticks par noire : gère croches, doubles, triples et triolets
  const DUR = { w: 96, h: 48, q: 24, e: 12, s: 6, x: 3, t: 8, T: 16, z: 4 };
  const OPEN = { 1: 64, 2: 59, 3: 55, 4: 50, 5: 45, 6: 40 };
  const NOTES_FR = ['Do', 'Do♯', 'Ré', 'Mi♭', 'Mi', 'Fa', 'Fa♯', 'Sol', 'Sol♯', 'La', 'Si♭', 'Si'];
  const NOTES_EN = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];
  const STRING_NAMES = { 1: 'Mi aigu', 2: 'Si', 3: 'Sol', 4: 'Ré', 5: 'La', 6: 'Mi grave' };
  // Hauteur réelle d'une harmonique naturelle selon la case
  const HARMONIC_OFFSET = { 12: 12, 7: 19, 19: 19, 5: 24, 24: 24 };

  function midiToFreq(m) { return 440 * Math.pow(2, (m - 69) / 12); }
  function midiName(m, lang) { return (lang === 'en' ? NOTES_EN : NOTES_FR)[((m % 12) + 12) % 12]; }
  function midiFull(m) { return midiName(m) + (Math.floor(m / 12) - 1); }

  function noteMidi(s, f, opts) {
    const open = ((opts && opts.tuning) || {})[s] || OPEN[s];
    const capo = (opts && opts.capo) || 0;
    return open + capo + f;
  }

  /* Forme d'accord "x32010" (ou "x-10-12-…") → liste de notes [{s,f}] */
  function shapeToNotes(shape) {
    const parts = shape.includes('-') ? shape.split('-') : shape.split('');
    const out = [];
    parts.forEach((c, i) => {
      if (c === 'x' || c === 'X') return;
      out.push({ s: 6 - i, f: parseInt(c, 36) });
    });
    return out;
  }

  function parseDuration(tok) {
    if (tok.startsWith(':')) return parseInt(tok.slice(1), 10);
    let base = DUR[tok[0]];
    if (base === undefined) return null;
    if (tok.length === 1) return base;
    if (tok === tok[0] + '.') return base * 1.5;
    if (tok === tok[0] + '..') return base * 1.75;
    return null;
  }

  const DUR_RE = /^(?:[whqesxtTz]\.{0,2}|:\d+)$/;
  const NOTE_RE = /^([1-6])\.(\d{1,2}|x)([hp\/\\*~]*)(?:'([1-4]))?(?:"([pima]))?$/;

  function parseNote(tok, errors, where) {
    const m = NOTE_RE.exec(tok);
    if (!m) { errors.push(where + ' : note illisible « ' + tok + ' »'); return null; }
    const n = { s: +m[1], f: m[2] === 'x' ? 0 : +m[2] };
    if (m[2] === 'x') n.dead = true;
    if (m[3]) {
      if (m[3].includes('h')) n.tech = 'h';
      if (m[3].includes('p')) n.tech = 'p';
      if (m[3].includes('/')) n.tech = 's';
      if (m[3].includes('\\')) n.tech = 's';
      if (m[3].includes('*')) n.harm = true;
      if (m[3].includes('~')) n.vib = true;
    }
    if (m[4]) n.lh = +m[4];
    if (m[5]) n.rh = m[5];
    return n;
  }

  /* Compile une pièce {time, sections:[{name, repeat, bars}]} → {bars, timeline, errors} */
  function compile(song, chordLookup) {
    const errors = [];
    const parts = String(song.time || '4/4').split('/').map(Number);
    const barTicks = parts[0] * (96 / parts[1]);
    const opts = { tuning: song.tuning, capo: song.capo };
    const bars = [];
    const sections = [];

    (song.sections || []).forEach((sec, si) => {
      const raw = String(sec.bars).split('|').map(b => b.trim()).filter(Boolean);
      const first = bars.length;
      let cur = 24;
      raw.forEach((rawBar) => {
        const where = (song.id || song.title || 'pièce') + ' / ' + (sec.name || si) + ' / mesure ' + (bars.length + 1);
        const bar = { index: bars.length, section: si, events: [], ticks: barTicks, pickup: false };
        let t = 0, pendingChord = null, pendingAnn = null;
        // sépare les annotations {avec espaces} des autres jetons
        const tokens = rawBar.match(/\{[^}]*\}|\[[^\]]*\]|\S+/g) || [];
        tokens.forEach((tok) => {
          if (tok === '!p') { bar.pickup = true; return; }
          if (tok[0] === '[') { pendingChord = tok.slice(1, -1); return; }
          if (tok[0] === '{') { pendingAnn = tok.slice(1, -1); return; }
          if (DUR_RE.test(tok)) { cur = parseDuration(tok); return; }

          const ev = { t, dur: cur, notes: [] };
          if (pendingChord) { ev.chord = pendingChord; pendingChord = null; }
          if (pendingAnn) { ev.ann = pendingAnn; pendingAnn = null; }

          if (tok === 'r') {
            ev.rest = true;
          } else if (tok[0] === '@') {
            // @Am:D = accord gratté vers le bas, @Am:U = vers le haut
            const mm = /^@([^:]+)(?::([DU]))?$/.exec(tok);
            const shape = mm && chordLookup ? chordLookup(mm[1]) : null;
            if (!shape) errors.push(where + ' : accord inconnu « ' + tok + ' »');
            else { ev.notes = shapeToNotes(shape); ev.strum = mm[2] || 'D'; }
          } else {
            tok.split('+').forEach((p) => {
              const n = parseNote(p, errors, where);
              if (n) ev.notes.push(n);
            });
          }
          ev.notes.forEach((n) => {
            n.midi = noteMidi(n.s, n.f, opts);
            if (n.harm) n.midi = noteMidi(n.s, 0, opts) + (HARMONIC_OFFSET[n.f] || 12);
          });
          bar.events.push(ev);
          t += cur;
        });
        if (bar.pickup) bar.ticks = t;
        else if (t !== barTicks) errors.push(where + ' : durée ' + t + ' ticks au lieu de ' + barTicks);
        bars.push(bar);
      });
      sections.push({ name: sec.name || 'Partie ' + (si + 1), first, last: bars.length - 1, repeat: sec.repeat || 1, note: sec.note });
    });

    const timeline = [];
    const order = song.form || sections.map((_, i) => i);
    order.forEach((si) => {
      const s = sections[si];
      if (!s) return;
      for (let r = 0; r < s.repeat; r++) for (let b = s.first; b <= s.last; b++) timeline.push(b);
    });
    return { bars, sections, timeline, barTicks, num: parts[0], den: parts[1], errors, tempo: song.tempo || 80, title: song.title };
  }

  /* Doigt de main droite conventionnel d'une note (pouce sur les basses, puis i-m-a) */
  function rhFinger(n) { return n.rh || (n.s >= 4 ? 'p' : n.s === 3 ? 'i' : n.s === 2 ? 'm' : 'a'); }

  GS.music = { PPQ, OPEN, NOTES_FR, NOTES_EN, STRING_NAMES, midiToFreq, midiName, midiFull, noteMidi, shapeToNotes, compile, rhFinger };
  if (typeof module !== 'undefined') module.exports = GS.music;
})(typeof window !== 'undefined' ? window : globalThis);
