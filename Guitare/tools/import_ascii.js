#!/usr/bin/env node
/* Convertit une tablature ASCII (ex. classtab.org) vers le format de l'app.
 * Usage : node tools/import_ascii.js fichier.txt --time 3/4 [--from N] [--to N] [--per 8]
 *   --from / --to : numéros de lignes du fichier à considérer
 *   --per : mesures par « ligne » dans la sortie
 * Le rythme est déduit de l'espacement des colonnes puis calé sur une grille :
 * le résultat DOIT être relu (voir tools/FORMAT_TAB.md). */
const fs = require('fs');
const args = process.argv.slice(2);
const file = args[0];
const opt = (k, d) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : d; };
const time = opt('time', '4/4').split('/').map(Number);
const from = +opt('from', 1), to = +opt('to', 1e9), per = +opt('per', 6);
const barTicks = time[0] * (96 / time[1]);

const lines = fs.readFileSync(file, 'latin1').split(/\r?\n/);
const isStaff = (l) => /^\s*[eEBGDAaAbdg]?\|?[|:*]*[-0-9a-z~\/\\()|*.<>^]{6,}/i.test(l) && /^\s*[eEBGDA]\s*[|:]/.test(l);

// Repère les blocs de 6 lignes consécutives
const blocks = [];
for (let i = from - 1; i < Math.min(lines.length, to); i++) {
  if (isStaff(lines[i]) && i + 5 < lines.length && [1, 2, 3, 4, 5].every((k) => isStaff(lines[i + k]))) {
    blocks.push(lines.slice(i, i + 6));
    i += 5;
  }
}

const out = [];
blocks.forEach((blk) => {
  // Normalise les lignes : retire « E| », repère les barres de mesure
  const norm = blk.map((l) => l.replace(/\s+$/, '').replace(/^\s*[eEBGDA]\s*/, ''));
  const maxLen = Math.max(...norm.map((l) => l.length));
  const pad = norm.map((l) => l.padEnd(maxLen, '-'));
  // Une colonne est une barre si TOUTES les cordes y ont | (ou : / *)
  const bars = [];
  for (let c = 0; c < maxLen; c++) if (pad.every((l) => '|'.includes(l[c]))) bars.push(c);
  const segments = [];
  for (let i = 0; i < bars.length - 1; i++) {
    const a = bars[i] + 1, b = bars[i + 1];
    if (b - a > 2) segments.push([a, b]);
  }
  segments.forEach(([a, b]) => {
    const events = {}; // col → [{s,f,tech}]
    pad.forEach((line, si) => {
      const s = si + 1;
      let c = a;
      while (c < b) {
        const ch = line[c];
        if (/[0-9]/.test(ch)) {
          let num = ch, start = c;
          if (/[0-9]/.test(line[c + 1] || '') && +(ch + line[c + 1]) <= 24) { num += line[c + 1]; c++; }
          const before = line[start - 1] || '';
          let tech = '';
          if (before === 'h' || before === 'H') tech = 'h';
          if (before === 'p' || before === 'P') tech = 'p';
          if (before === '/' || before === '\\' || before === 's') tech = '/';
          const harm = before === '<' || before === '(' && false;
          (events[start] = events[start] || []).push({ s, f: +num, tech, harm });
        } else if (ch === 'x' || ch === 'X') {
          (events[c] = events[c] || []).push({ s, f: 'x', tech: '' });
        }
        c++;
      }
    });
    const cols = Object.keys(events).map(Number).sort((x, y) => x - y);
    if (!cols.length) { out.push(`:${barTicks} r`); return; }
    // La colonne de fin n'est pas fiable (texte de fin de mesure) : on essaie plusieurs longueurs
    // de mesure et on garde celle qui tombe le mieux sur la grille la plus simple.
    const first = cols[0], last = cols[cols.length - 1];
    const gaps = cols.slice(1).map((c, i) => c - cols[i]).sort((x, y) => x - y);
    const med = gaps.length ? gaps[gaps.length >> 1] : 1;
    const spans = [b - first, b - first - 1, b - first - 2, last - first + med].filter((v, i, arr) => v > last - first && arr.indexOf(v) === i);
    let chosen = null;
    [24, 12, 8, 6, 4, 3].filter((g) => barTicks % g === 0).some((g) => spans.some((span) => {
      const err = cols.reduce((m, c) => { const v = (c - first) / span * barTicks / g; return Math.max(m, Math.abs(v - Math.round(v))); }, 0);
      if (err < 0.2) { chosen = { g, span }; return true; }
      return false;
    }));
    if (!chosen) chosen = { g: 3, span: b - first };
    let ticks = cols.map((c) => Math.round((c - first) / chosen.span * barTicks / chosen.g) * chosen.g);
    // évite deux événements au même instant / dépassement
    for (let i = 1; i < ticks.length; i++) if (ticks[i] <= ticks[i - 1]) ticks[i] = ticks[i - 1] + 3;
    ticks = ticks.map((t) => Math.min(t, barTicks - 3));
    const toks = [];
    let lastDur = null;
    cols.forEach((c, i) => {
      const next = i + 1 < cols.length ? ticks[i + 1] : barTicks;
      const d = next - ticks[i];
      if (d <= 0) return;
      const dd = { 96: 'w', 72: 'h.', 48: 'h', 36: 'q.', 24: 'q', 18: 'e.', 16: 'T', 12: 'e', 9: 's.', 8: 't', 6: 's', 4: 'z', 3: 'x' }[d] || ':' + d;
      if (dd !== lastDur) { toks.push(dd); lastDur = dd; }
      toks.push(events[c].sort((x, y) => y.s - x.s).map((n) => `${n.s}.${n.f}${n.tech}`).join('+'));
    });
    out.push(toks.join(' '));
  });
});

// Sortie groupée
for (let i = 0; i < out.length; i += per) console.log(out.slice(i, i + per).join(' | ') + ' |');
console.error(`\n${blocks.length} systèmes, ${out.length} mesures.`);
