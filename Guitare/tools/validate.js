#!/usr/bin/env node
/* Contrôle tout le contenu : tablatures (durées, cases, écarts jouables, mélodie), leçons, routines.
 * Usage : node tools/validate.js [--verbose] */
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const verbose = process.argv.includes('--verbose');

const sandbox = { console };
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
const load = (f) => vm.runInContext(fs.readFileSync(f, 'utf8'), sandbox, { filename: f });

load(path.join(ROOT, 'app/js/core/music.js'));
const dataDir = path.join(ROOT, 'app/data');
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith('.js') ? [path.join(d, e.name)] : []);
load(path.join(dataDir, '_init.js'));
walk(dataDir).filter((f) => !f.endsWith('_init.js') && !f.endsWith('badges.js') && !f.endsWith('library.js')).forEach(load);

const GS = sandbox.GS, M = GS.music, D = GS.data;
const errors = [], warnings = [];
const err = (m) => errors.push(m), warn = (m) => warnings.push(m);
const NAMES = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const parseSci = (t) => { const m = /^([A-G])([#b]?)(\d)$/.exec(t); if (!m) return null; return (+m[3] + 1) * 12 + NAMES[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0); };

function checkTab(owner, obj) {
  const c = M.compile(obj, D.chordShape);
  c.errors.forEach(err);
  c.bars.forEach((bar) => bar.events.forEach((ev) => {
    const where = `${owner} mesure ${bar.index + 1}`;
    const strs = ev.notes.map((n) => n.s);
    if (new Set(strs).size !== strs.length) err(`${where} : deux notes sur la même corde (${strs})`);
    if (ev.strum) return;
    const fr = ev.notes.filter((n) => n.f > 0 && !n.harm).map((n) => n.f);
    fr.forEach((f) => { if (f > 22) err(`${where} : case ${f} hors manche`); });
    if (fr.length > 1 && Math.max(...fr) - Math.min(...fr) > 5) warn(`${where} : écart de ${Math.max(...fr) - Math.min(...fr)} cases dans un accord (${fr})`);
    if (ev.notes.filter((n) => n.f > 0).length > 4 && new Set(fr).size > 4) warn(`${where} : plus de 4 doigts nécessaires`);
  }));
  // Contre-vérification : la voix supérieure doit donner exactement la mélodie déclarée
  if (obj.check) {
    const expected = obj.check.trim().split(/\s+/).map(parseSci);
    if (expected.includes(null)) err(`${owner} : champ check illisible`);
    const actual = [];
    c.bars.forEach((b) => b.events.forEach((e) => { if (e.notes.length) actual.push(Math.max(...e.notes.map((n) => n.midi))); }));
    const n = Math.min(expected.length, actual.length);
    for (let i = 0; i < n; i++) if (expected[i] !== actual[i]) { err(`${owner} : note ${i + 1} de la mélodie = ${M.midiFull(actual[i])}, attendu ${obj.check.trim().split(/\s+/)[i]}`); break; }
    if (expected.length !== actual.length) err(`${owner} : ${actual.length} notes dans la tab, ${expected.length} dans check`);
  }
  return c;
}

const uniq = (arr, label) => { const seen = new Set(); arr.forEach((x) => { if (seen.has(x)) err(`${label} en double : ${x}`); seen.add(x); }); return seen; };

// ---- Accords
D.chords.forEach((c) => {
  if (c.shape.length !== 6) err(`Accord ${c.name} : forme invalide`);
  if (c.fingers.length !== 6) err(`Accord ${c.name} : doigtés invalides`);
});

// ---- Morceaux
const songs = D.songs || [];
const songIds = uniq(songs.map((s) => s.id), 'Morceau');
const levels = { debutant: 0, intermediaire: 0, expert: 0 };
songs.forEach((s) => {
  ['id', 'title', 'level', 'genre', 'time', 'tempo', 'desc'].forEach((k) => { if (s.type !== 'chart' && s.type !== 'archive' && !s[k]) err(`Morceau ${s.id} : champ ${k} manquant`); });
  if (!(s.level in levels)) err(`Morceau ${s.id} : niveau inconnu ${s.level}`); else levels[s.level]++;
  (s.chords || []).forEach((c) => { if (!D.chordShape(c)) err(`Morceau ${s.id} : accord ${c} absent du dictionnaire`); });
  if (s.type === 'chart') {
    if (!s.progressions || !s.progressions.length) err(`Morceau ${s.id} : grille vide`);
    (s.progressions || []).forEach((p) => p.chords.split(/\s+/).forEach((c) => { const n = c.replace(/[()]/g, ''); if (n && n !== '|' && n !== '-' && !D.chordShape(n)) err(`Morceau ${s.id} : accord ${n} absent du dictionnaire`); }));
  } else if (s.type === 'archive') {
    if (!s.ascii) err(`Morceau ${s.id} : tab archivée manquante`);
  } else {
    const c = checkTab(`Morceau ${s.id}`, s);
    if (!c.bars.length) err(`Morceau ${s.id} : aucune mesure`);
    if (verbose) console.log(`  ${s.level.padEnd(14)} ${String(c.bars.length).padStart(4)} mes.  ${s.title}`);
  }
});

// ---- Exercices & routines
const exos = D.exercises || [];
const exoIds = uniq(exos.map((e) => e.id), 'Exercice');
exos.forEach((e) => { if (e.bars) checkTab(`Exercice ${e.id}`, { id: e.id, time: e.time || '4/4', tempo: e.bpm, sections: [{ name: 'x', bars: e.bars }] }); (e.chords || []).forEach((c) => { if (!D.chordShape(c)) err(`Exercice ${e.id} : accord ${c} inconnu`); }); });
const routines = D.routines || [];
uniq(routines.map((r) => r.id), 'Routine');
routines.forEach((r) => {
  let sum = 0;
  r.steps.forEach((st) => { sum += st.min; if (st.ex && !exoIds.has(st.ex)) err(`Routine ${r.id} : exercice ${st.ex} inconnu`); if (!st.ex && !st.free) err(`Routine ${r.id} : étape vide`); });
  if (sum !== r.minutes) err(`Routine ${r.id} : durée annoncée ${r.minutes} ≠ somme ${sum}`);
});

// ---- Cours
const courses = D.courses || [];
const lessonIds = uniq(courses.flatMap((c) => c.lessons.map((l) => l.id)), 'Leçon');
const BLOCKS = new Set(['p', 'h', 'list', 'steps', 'tip', 'warn', 'key', 'tab', 'chords', 'fret', 'table', 'compare', 'song', 'tool']);
function checkQuiz(owner, quiz) {
  (quiz || []).forEach((q, i) => {
    if (!q.q || !Array.isArray(q.options) || q.options.length < 2) err(`${owner} quiz ${i + 1} invalide`);
    if (!(q.answer >= 0 && q.answer < q.options.length)) err(`${owner} quiz ${i + 1} : réponse hors limites`);
  });
}
courses.forEach((c) => {
  c.lessons.forEach((l) => {
    const owner = `Leçon ${l.id}`;
    if (!l.title || !l.goal || !l.blocks || !l.blocks.length) err(`${owner} incomplète`);
    if (!l.quiz || l.quiz.length < 2) err(`${owner} : au moins 2 questions`);
    checkQuiz(owner, l.quiz);
    if (l.practice && l.practice.exercise && !exoIds.has(l.practice.exercise)) err(`${owner} : exercice ${l.practice.exercise} inconnu`);
    if (l.practice && l.practice.song && !songIds.has(l.practice.song)) err(`${owner} : morceau ${l.practice.song} inconnu`);
    l.blocks.forEach((b, i) => {
      if (!BLOCKS.has(b.t)) err(`${owner} bloc ${i} : type ${b.t} inconnu`);
      if (b.t === 'tab') checkTab(`${owner} bloc ${i}`, { id: l.id, time: b.time || '4/4', tempo: b.tempo || 70, sections: [{ name: 'x', bars: b.bars }] });
      if (b.t === 'chords') b.names.forEach((n) => { if (!D.chordShape(n)) err(`${owner} : accord ${n} inconnu`); });
      if (b.t === 'song' && !songIds.has(b.id)) err(`${owner} : morceau ${b.id} inconnu`);
    });
  });
  if (!c.boss) err(`Chapitre ${c.id} sans boss`);
  else {
    checkQuiz(`Boss ${c.id}`, c.boss.quiz);
    if (!c.boss.quiz || c.boss.quiz.length < 4) err(`Boss ${c.id} : au moins 4 questions`);
    if (c.boss.song && !songIds.has(c.boss.song)) err(`Boss ${c.id} : morceau ${c.boss.song} inconnu`);
  }
});

console.log(`Morceaux : ${songs.length} (débutant ${levels.debutant}, intermédiaire ${levels.intermediaire}, expert ${levels.expert}) · Exercices : ${exos.length} · Routines : ${routines.length} · Chapitres : ${courses.length} · Leçons : ${lessonIds.size} · Accords : ${D.chords.length}`);
if (warnings.length) { console.log(`\n${warnings.length} avertissement(s) :`); warnings.slice(0, verbose ? 500 : 40).forEach((w) => console.log('  ! ' + w)); }
if (errors.length) { console.log(`\n${errors.length} erreur(s) :`); errors.slice(0, verbose ? 500 : 60).forEach((e) => console.log('  ✗ ' + e)); process.exit(1); }
console.log('\nContenu valide ✓');
