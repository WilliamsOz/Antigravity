/* Rendu SVG d'une tablature compilée : lignes de cordes, frettes, rythme, doigtés, curseur de lecture. */
(function () {
  const GS = window.GS = window.GS || {};
  const M = GS.music;
  const NS = { lineGap: 13, top: 34, left: 30, rhythm: 40 };

  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

  function gapFor(dur) { return 12.5 + 10 * Math.sqrt(dur / 12); }
  function naturalWidth(bar, scale) {
    return bar.events.reduce((w, e) => w + gapFor(e.dur), 0) * scale + 22;
  }

  /* Répartit les mesures en lignes (retour à la ligne à chaque nouvelle partie) */
  function layout(c, width, scale, opts) {
    const lines = [];
    let line = null, sum = 0;
    const firstOfSection = new Set(c.sections.map((s) => s.first));
    const avail = width - NS.left - 4;
    c.bars.forEach((bar, i) => {
      const w = naturalWidth(bar, scale);
      if (!line || sum + w > avail || (firstOfSection.has(i) && line.bars.length) || (opts.perLine && line.bars.length >= opts.perLine)) {
        line = { bars: [], natural: 0 };
        lines.push(line);
        sum = 0;
      }
      line.bars.push({ bar, w });
      sum += w;
      line.natural = sum;
    });
    return lines;
  }

  function beatTicks(c) { return c.den === 8 && c.num % 3 === 0 ? 36 : c.den === 8 ? 12 : 96 / c.den; }

  function beams(ev) { return ev.dur <= 3 ? 3 : ev.dur <= 6 ? 2 : ev.dur <= 12 ? 1 : 0; }
  function isTriplet(ev) { return ev.dur === 8 || ev.dur === 16 || ev.dur === 4; }
  function isDotted(ev) { return ev.dur === 36 || ev.dur === 18 || ev.dur === 9 || ev.dur === 72; }

  function renderRhythm(bar, xs, y, c) {
    let out = '';
    const beat = beatTicks(c), stemY = y + 22;
    const groups = {};
    bar.events.forEach((ev, i) => {
      const x = xs[i];
      if (ev.rest) {
        if (ev.dur >= 48) out += `<rect class="r-rest" x="${x - 5}" y="${y + 8 + (ev.dur >= 96 ? 0 : 3)}" width="10" height="3"/>`;
        else if (ev.dur >= 24) out += `<path class="r-restp" d="M${x - 2} ${y + 3} l4 5 l-4 4 l4 5"/>`;
        else out += `<path class="r-restp" d="M${x + 3} ${y + 5} l-5 13 M${x + 3} ${y + 5} q-3 3 -6 1"/>`;
        return;
      }
      if (ev.dur >= 96) return; // ronde : pas de hampe
      out += `<line class="r-stem" x1="${x}" y1="${ev.dur >= 48 ? y + 12 : y}" x2="${x}" y2="${stemY}"/>`;
      if (isDotted(ev)) out += `<circle class="r-dot" cx="${x + 5}" cy="${stemY - 3}" r="1.5"/>`;
      if (ev.dur < 24) {
        const g = Math.floor(ev.t / beat);
        (groups[g] = groups[g] || []).push(i);
      }
    });
    Object.values(groups).forEach((idx) => {
      let prev = null;
      idx.forEach((i) => {
        const ev = bar.events[i];
        if (prev !== null && i === prev + 1) {
          const n = Math.min(beams(ev), beams(bar.events[prev]));
          for (let k = 0; k < n; k++) out += `<rect class="r-beam" x="${xs[prev]}" y="${stemY - 2 - k * 4}" width="${xs[i] - xs[prev] + 1}" height="2.4"/>`;
        }
        // croche isolée : petit drapeau
        if (idx.length === 1) {
          for (let k = 0; k < beams(ev); k++) out += `<rect class="r-beam" x="${xs[i]}" y="${stemY - 2 - k * 4}" width="7" height="2.4"/>`;
        }
        prev = i;
      });
      if (isTriplet(bar.events[idx[0]]) && idx.length >= 2) {
        const mid = (xs[idx[0]] + xs[idx[idx.length - 1]]) / 2;
        out += `<text class="r-trip" x="${mid}" y="${stemY + 10}" text-anchor="middle">3</text>`;
      }
    });
    return out;
  }

  function renderBar(bar, x, w, c, opts, isFirstOfLine) {
    const { lineGap, top, rhythm } = NS;
    const staffH = lineGap * 5, bottom = top + staffH;
    const total = bar.events.reduce((s, e) => s + gapFor(e.dur), 0) || 1;
    const inner = w - 22;
    let cursor = x + 12;
    const xs = bar.events.map((e) => { const here = cursor; cursor += gapFor(e.dur) / total * inner; return here; });

    let out = `<g class="bar" data-b="${bar.index}">`;
    out += `<rect class="bar-sel" x="${x}" y="${top - 6}" width="${w}" height="${staffH + 12}"/>`;
    out += `<rect class="bar-hit" data-bar="${bar.index}" x="${x}" y="0" width="${w}" height="${bottom + rhythm + 30}"/>`;
    out += `<text class="bar-num" x="${x + 3}" y="${top - 9}">${bar.index + 1}</text>`;

    const lastOnString = {};
    bar.events.forEach((ev, i) => {
      const ex = xs[i];
      out += `<g class="ev" data-b="${bar.index}" data-e="${i}">`;
      out += `<rect class="ev-glow" x="${ex - 11}" y="${top - 8}" width="22" height="${staffH + 16}" rx="5"/>`;
      if (ev.chord) out += `<text class="t-chord" x="${ex - 6}" y="${top - 20}">${esc(ev.chord)}</text>`;
      if (ev.ann) out += `<text class="t-ann" x="${ex - 6}" y="${top - (ev.chord ? 8 : 20)}">${esc(ev.ann)}</text>`;
      ev.notes.forEach((n) => {
        const y = top + (n.s - 1) * lineGap;
        const label = n.dead ? '×' : n.harm ? `‹${n.f}›` : String(n.f);
        const tw = label.length * 7.4 + 3;
        // liaisons hammer/pull/glissé
        if (n.tech && lastOnString[n.s]) {
          const px = lastOnString[n.s];
          const mid = (px + ex) / 2;
          if (n.tech === 's') out += `<line class="t-slide" x1="${px + 6}" y1="${y + 3}" x2="${ex - 6}" y2="${y - 3}"/>`;
          else {
            out += `<path class="t-arc" d="M${px + 2} ${y - 7} Q${mid} ${y - 16} ${ex - 2} ${y - 7}"/>`;
            out += `<text class="t-techl" x="${mid}" y="${y - 13}" text-anchor="middle">${n.tech}</text>`;
          }
        }
        out += `<rect class="t-bg" x="${ex - tw / 2}" y="${y - 7}" width="${tw}" height="14"/>`;
        out += `<text class="t-fret" data-midi="${n.midi}" x="${ex}" y="${y + 4.5}" text-anchor="middle"><title>${M.midiFull(n.midi)} — corde ${n.s}, case ${n.f}</title>${label}</text>`;
        if (n.lh && opts.showLH !== false) out += `<text class="t-lh" x="${ex + tw / 2 + 1}" y="${y - 2}">${n.lh}</text>`;
        if (n.vib) out += `<text class="t-techl" x="${ex}" y="${y - 8}" text-anchor="middle">~</text>`;
        lastOnString[n.s] = ex;
      });
      if (ev.strum) {
        const dy = ev.strum === 'D' ? `M${ex + 11} ${top - 4} v${staffH + 6} m-3 -5 l3 5 l3 -5` : `M${ex + 11} ${bottom + 2} v-${staffH + 6} m-3 5 l3 -5 l3 5`;
        out += `<path class="t-strum" d="${dy}"/>`;
      }
      let extraY = bottom + rhythm + 5;
      if (opts.pima && ev.notes.length && !ev.strum) {
        const label = ev.notes.slice().sort((a, b) => b.s - a.s).map((n) => M.rhFinger(n)).join('');
        out += `<text class="t-pima" x="${ex}" y="${extraY}" text-anchor="middle">${label.length > 3 ? '' : label}</text>`;
        extraY += 13;
      }
      if (opts.noteNames && ev.notes.length && !ev.strum) {
        const top1 = ev.notes.slice().sort((a, b) => a.s - b.s)[0];
        out += `<text class="t-name" x="${ex}" y="${extraY}" text-anchor="middle">${M.midiName(top1.midi)}</text>`;
      }
      out += `</g>`;
    });
    out += `<g class="rhythm">${renderRhythm(bar, xs, bottom + 4, c)}</g>`;
    out += `</g>`;
    bar._xs = xs;
    return out;
  }

  function mount(el, compiled, opts) {
    opts = Object.assign({ pima: false, noteNames: false, scale: 1 }, opts || {});
    const c = compiled;
    const sectionOf = {};
    c.sections.forEach((s) => { sectionOf[s.first] = s; });
    let lastWidth = 0, activeG = null, activeLine = null, selection = null;

    function draw() {
      const width = Math.max(280, el.clientWidth || 700);
      lastWidth = width;
      const narrow = width < 560;
      const scale = (narrow ? 0.82 : 1) * opts.scale;
      const lines = layout(c, width, scale, opts);
      const { lineGap, top, left, rhythm } = NS;
      const staffH = lineGap * 5;
      let extra = 0;
      if (opts.pima) extra += 13;
      if (opts.noteNames) extra += 13;
      const height = top + staffH + rhythm + extra + 4;

      let html = '';
      lines.forEach((line, li) => {
        const fill = line.natural > 0 ? (width - left - 4) / line.natural : 1;
        // On étire jusqu'à remplir la ligne, sauf une dernière ligne très courte
        const isShort = li === lines.length - 1 && line.natural < (width - left) * 0.55;
        const factor = isShort ? Math.min(fill, 1.25) : fill;
        const firstBar = line.bars[0].bar;
        const sec = sectionOf[firstBar.index];
        if (sec && !opts.hideSections) {
          html += `<div class="tab-section"><span>${esc(sec.name)}</span>${sec.repeat > 1 ? `<em>×${sec.repeat}</em>` : ''}${sec.note ? `<small>${esc(sec.note)}</small>` : ''}</div>`;
        }
        const usedW = left + line.natural * factor;
        let body = '', x = left;
        for (let s = 0; s < 6; s++) {
          const y = top + s * lineGap;
          body += `<line class="t-string t-s${s + 1}" x1="${left - 6}" y1="${y}" x2="${usedW}" y2="${y}"/>`;
        }
        body += `<text class="t-clef" x="${left - 26}" y="${top + 20}">T</text><text class="t-clef" x="${left - 26}" y="${top + 35}">A</text><text class="t-clef" x="${left - 26}" y="${top + 50}">B</text>`;
        line.bars.forEach(({ bar, w }, bi) => {
          const bw = w * factor;
          body += renderBar(bar, x, bw, c, opts, bi === 0);
          x += bw;
          const barEnd = x;
          const isSectionEnd = c.sections.some((s) => s.last === bar.index);
          body += `<line class="t-barline${isSectionEnd ? ' strong' : ''}" x1="${barEnd}" y1="${top}" x2="${barEnd}" y2="${top + staffH}"/>`;
          const secEnd = c.sections.find((s) => s.last === bar.index && s.repeat > 1);
          if (secEnd) body += `<circle class="t-rep" cx="${barEnd - 5}" cy="${top + lineGap * 2 - 6}" r="2"/><circle class="t-rep" cx="${barEnd - 5}" cy="${top + lineGap * 3 + 6}" r="2"/>`;
        });
        body += `<line class="t-barline" x1="${left - 6}" y1="${top}" x2="${left - 6}" y2="${top + staffH}"/>`;
        html += `<svg class="tab-line" data-line="${li}" width="100%" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">${body}<rect class="t-cursor" x="-10" y="${top - 8}" width="2.5" height="${staffH + 16}" rx="1"/></svg>`;
      });
      el.innerHTML = `<div class="tabsheet${opts.small ? ' small' : ''}">${html}</div>`;
      applySelection();
    }

    function applySelection() {
      el.querySelectorAll('.bar.is-sel').forEach((b) => b.classList.remove('is-sel'));
      if (!selection) return;
      for (let b = selection.from; b <= selection.to; b++) {
        const g = el.querySelector(`.bar[data-b="${b}"]`);
        if (g) g.classList.add('is-sel');
      }
    }

    function highlight(bar, evi) {
      if (activeG) activeG.classList.remove('on');
      const g = el.querySelector(`.ev[data-b="${bar}"][data-e="${evi}"]`);
      activeG = g;
      if (!g) return;
      g.classList.add('on');
      const svg = g.closest('svg');
      if (svg !== activeLine) {
        if (activeLine) activeLine.querySelector('.t-cursor').setAttribute('x', -10);
        activeLine = svg;
        if (opts.autoScroll !== false) {
          const r = svg.getBoundingClientRect();
          if (r.bottom > window.innerHeight - 110 || r.top < 70) {
            const scroller = document.scrollingElement;
            scroller.scrollTo({ top: scroller.scrollTop + r.top - 130, behavior: 'smooth' });
          }
        }
      }
      const glow = g.querySelector('.ev-glow');
      if (glow) svg.querySelector('.t-cursor').setAttribute('x', +glow.getAttribute('x') + 10);
    }

    function clear() {
      if (activeG) activeG.classList.remove('on');
      if (activeLine) activeLine.querySelector('.t-cursor').setAttribute('x', -10);
      activeG = null; activeLine = null;
    }

    function onClick(e) {
      const fret = e.target.closest('.t-fret');
      if (fret) { GS.audio.pluck(+fret.dataset.midi); return; }
      const hit = e.target.closest('.bar-hit');
      if (hit && opts.onBarClick) opts.onBarClick(+hit.dataset.bar, e);
    }
    el.addEventListener('click', onClick);

    draw();
    let ro = null;
    if (window.ResizeObserver) {
      ro = new ResizeObserver(() => { if (Math.abs(el.clientWidth - lastWidth) > 8) draw(); });
      ro.observe(el);
    }

    return {
      highlight, clear, redraw: draw,
      setOptions(o) { Object.assign(opts, o); draw(); },
      setSelection(sel) { selection = sel; applySelection(); },
      destroy() { ro && ro.disconnect(); el.removeEventListener('click', onClick); },
    };
  }

  /* Diagramme d'accord. shape : "x32010", fingers : "x32010" (0 = à vide), barre : {f, from, to} */
  function chordDiagram(shape, fingers, o) {
    o = o || {};
    const parts = shape.includes('-') ? shape.split('-') : shape.split('');
    const frets = parts.map((c) => (c === 'x' || c === 'X') ? null : parseInt(c, 36));
    const fing = fingers ? (fingers.includes('-') ? fingers.split('-') : fingers.split('')) : [];
    const pos = frets.filter((f) => f && f > 0);
    const max = pos.length ? Math.max(...pos) : 3, min = pos.length ? Math.min(...pos) : 1;
    const base = max <= 4 ? 1 : min;
    const rows = Math.max(4, max - base + 1);
    const W = o.size || 112, sx = (W - 30) / 5, sy = sx * 1.22, x0 = 19, y0 = 22;
    const H = y0 + sy * rows + 12;
    let s = `<svg class="chord-svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img">`;
    for (let i = 0; i <= rows; i++) {
      const y = y0 + i * sy;
      s += `<line class="cd-fret${i === 0 && base === 1 ? ' nut' : ''}" x1="${x0}" y1="${y}" x2="${x0 + 5 * sx}" y2="${y}"/>`;
    }
    for (let i = 0; i < 6; i++) {
      const x = x0 + i * sx;
      s += `<line class="cd-str" x1="${x}" y1="${y0}" x2="${x}" y2="${y0 + rows * sy}"/>`;
    }
    if (base > 1) s += `<text class="cd-base" x="${x0 + 5 * sx + 5}" y="${y0 + sy * 0.68}">${base}</text>`;
    // barré : même doigt, même case, sur plusieurs cordes
    const byFinger = {};
    frets.forEach((f, i) => { if (f && fing[i] && fing[i] !== '0' && fing[i] !== 'x') (byFinger[fing[i] + '-' + f] = byFinger[fing[i] + '-' + f] || []).push(i); });
    Object.entries(byFinger).forEach(([k, arr]) => {
      if (arr.length > 1) {
        const f = +k.split('-')[1], y = y0 + (f - base + 0.5) * sy;
        s += `<rect class="cd-barre" x="${x0 + arr[0] * sx - 6}" y="${y - 6}" width="${(arr[arr.length - 1] - arr[0]) * sx + 12}" height="12" rx="6"/>`;
      }
    });
    frets.forEach((f, i) => {
      const x = x0 + i * sx;
      if (f === null) s += `<text class="cd-mute" x="${x}" y="${y0 - 7}" text-anchor="middle">×</text>`;
      else if (f === 0) s += `<circle class="cd-open" cx="${x}" cy="${y0 - 10}" r="3.6"/>`;
      else {
        const y = y0 + (f - base + 0.5) * sy;
        s += `<circle class="cd-dot" cx="${x}" cy="${y}" r="${sx * 0.42}"/>`;
        if (fing[i] && fing[i] !== '0') s += `<text class="cd-fing" x="${x}" y="${y + 3.6}" text-anchor="middle">${fing[i]}</text>`;
      }
    });
    return s + '</svg>';
  }

  /* Manche horizontal. marks : [{s,f,label,cls}] */
  function fretboard(o) {
    o = Object.assign({ frets: 12, marks: [], start: 0 }, o);
    const count = o.frets, sh = 20, fw0 = 34, left = 26, top = 16;
    // cases de plus en plus étroites, comme un vrai manche
    const xs = [left];
    for (let i = 1; i <= count; i++) xs.push(xs[i - 1] + Math.max(30, 64 * Math.pow(0.968, i)));
    const W = xs[count] + 14, H = top + sh * 5 + 26;
    let s = `<svg class="fb-svg" viewBox="0 0 ${W} ${H}" width="100%" style="max-width:${Math.round(W * 1.5)}px;margin:0 auto" xmlns="http://www.w3.org/2000/svg">`;
    s += `<rect class="fb-wood" x="${left}" y="${top - 6}" width="${xs[count] - left}" height="${sh * 5 + 12}" rx="3"/>`;
    [3, 5, 7, 9, 15, 17, 19, 21].forEach((f) => {
      if (f <= count) s += `<circle class="fb-inlay" cx="${(xs[f - 1] + xs[f]) / 2}" cy="${top + sh * 2.5}" r="5"/>`;
    });
    if (count >= 12) {
      const x12 = (xs[11] + xs[12]) / 2;
      s += `<circle class="fb-inlay" cx="${x12}" cy="${top + sh * 1.5}" r="5"/><circle class="fb-inlay" cx="${x12}" cy="${top + sh * 3.5}" r="5"/>`;
    }
    for (let i = 0; i <= count; i++) {
      s += `<line class="fb-fret${i === 0 ? ' nut' : ''}" x1="${xs[i]}" y1="${top - 6}" x2="${xs[i]}" y2="${top + sh * 5 + 6}"/>`;
      if (i > 0 && (i % 2 === 1 || i === 12)) s += `<text class="fb-num" x="${(xs[i - 1] + xs[i]) / 2}" y="${H - 4}" text-anchor="middle">${i}</text>`;
    }
    for (let i = 0; i < 6; i++) {
      s += `<line class="fb-string" style="stroke-width:${0.8 + i * 0.32}" x1="${left - 6}" y1="${top + i * sh}" x2="${xs[count]}" y2="${top + i * sh}"/>`;
      s += `<text class="fb-open" x="${left - 11}" y="${top + i * sh + 4}" text-anchor="end">${['e', 'B', 'G', 'D', 'A', 'E'][i]}</text>`;
    }
    const pos = (st, f) => [f === 0 ? left - 1 : (xs[f - 1] + xs[f]) / 2, top + (st - 1) * sh];
    if (o.clickable) {
      for (let st = 1; st <= 6; st++) for (let f = 0; f <= count; f++) {
        const [x, y] = pos(st, f);
        s += `<rect class="fb-hit" data-s="${st}" data-f="${f}" x="${f === 0 ? 0 : xs[f - 1]}" y="${y - sh / 2}" width="${f === 0 ? left : xs[f] - xs[f - 1]}" height="${sh}"/>`;
      }
    }
    o.marks.forEach((m) => {
      const [x, y] = pos(m.s, m.f);
      s += `<g class="fb-mark ${m.cls || ''}" data-s="${m.s}" data-f="${m.f}"><circle cx="${x}" cy="${y}" r="9.2"/><text x="${x}" y="${y + 3.4}" text-anchor="middle">${esc(m.label || '')}</text></g>`;
    });
    return s + '</svg>';
  }

  GS.tab = { mount, chordDiagram, fretboard };
})();
