/* Moteur audio : échantillons de guitare nylon, repli synthèse, lecture de tablature, métronome. */
(function () {
  const GS = window.GS = window.GS || {};
  const M = GS.music;

  let ctx = null, master = null, wet = null;
  const buffers = {};
  let loadPromise = null;

  function context() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -14; comp.ratio.value = 3;
      comp.connect(ctx.destination);
      master = ctx.createGain();
      master.gain.value = (GS.store && GS.store.get().settings.volume) ?? 0.9;
      master.connect(comp);
      // Petite réverbe de pièce pour réchauffer les notes
      const conv = ctx.createConvolver();
      const len = Math.floor(ctx.sampleRate * 0.7);
      const imp = ctx.createBuffer(2, len, ctx.sampleRate);
      for (let c = 0; c < 2; c++) {
        const d = imp.getChannelData(c);
        for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2);
      }
      conv.buffer = imp;
      wet = ctx.createGain();
      wet.gain.value = 0.14;
      wet.connect(conv); conv.connect(comp);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function setVolume(v) { if (master) master.gain.value = v; }

  function b64ToBuffer(b64) {
    const bin = atob(b64), n = bin.length, out = new Uint8Array(n);
    for (let i = 0; i < n; i++) out[i] = bin.charCodeAt(i);
    return out.buffer;
  }

  /* Charge les échantillons (fichier local, donc hors-ligne) au premier son demandé */
  function load() {
    if (loadPromise) return loadPromise;
    context();
    loadPromise = new Promise((resolve) => {
      const s = document.createElement('script');
      s.src = 'assets/audio/nylon-samples.js';
      s.onload = () => {
        const all = window.GS_SAMPLES || {};
        Promise.all(Object.keys(all).map((k) =>
          ctx.decodeAudioData(b64ToBuffer(all[k])).then((b) => { buffers[k] = b; }).catch(() => {})
        )).then(() => { window.GS_SAMPLES = null; resolve(true); });
      };
      s.onerror = () => resolve(false);
      document.head.appendChild(s);
    });
    return loadPromise;
  }

  /* Repli Karplus-Strong si les échantillons sont indisponibles */
  function ksBuffer(midi, dur) {
    const c = context(), freq = M.midiToFreq(midi), period = Math.max(2, Math.round(c.sampleRate / freq));
    const buf = c.createBuffer(1, Math.floor(c.sampleRate * dur), c.sampleRate), d = buf.getChannelData(0);
    const line = new Float32Array(period);
    for (let i = 0; i < period; i++) line[i] = Math.random() * 2 - 1;
    let p = 0, prev = 0;
    for (let i = 0; i < d.length; i++) { const v = line[p]; line[p] = (v + prev) * 0.4965; prev = v; d[i] = v; p = (p + 1) % period; }
    return buf;
  }

  const active = new Set();
  const LOOKAHEAD = 2.5; // secondes programmées à l'avance

  /* Joue une note à l'instant `when`, pendant `dur` secondes */
  function playNote(midi, when, dur, opts) {
    const c = context();
    opts = opts || {};
    const t = when || c.currentTime;
    const src = c.createBufferSource();
    let rate = 1, buffer = buffers[midi];
    if (!buffer) {
      // Note hors plage : on transpose l'échantillon le plus proche
      const keys = Object.keys(buffers).map(Number);
      if (keys.length) {
        const near = keys.reduce((a, b) => Math.abs(b - midi) < Math.abs(a - midi) ? b : a);
        buffer = buffers[near]; rate = Math.pow(2, (midi - near) / 12);
      } else buffer = ksBuffer(midi, Math.min(dur + 0.4, 3));
    }
    src.buffer = buffer;
    src.playbackRate.value = rate;
    const g = c.createGain();
    const level = opts.gain ?? 0.8;
    g.gain.setValueAtTime(level, t);
    g.gain.setValueAtTime(level, t + Math.max(0.01, dur));
    g.gain.exponentialRampToValueAtTime(0.0008, t + Math.max(0.01, dur) + 0.12);
    let out = g;
    if (opts.harm) {
      const f = c.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = M.midiToFreq(midi) * 0.8;
      g.connect(f); out = f;
    }
    out.connect(master);
    out.connect(wet);
    src.connect(g);
    src.start(t);
    src.stop(t + Math.max(0.01, dur) + 0.15);
    active.add(src);
    src.onended = () => active.delete(src);
    return src;
  }

  function deadNote(when) {
    const c = context(), len = Math.floor(c.sampleRate * 0.04);
    const buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = c.createBufferSource(); src.buffer = buf;
    const f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 900;
    const g = c.createGain(); g.gain.value = 0.5;
    src.connect(f); f.connect(g); g.connect(master);
    src.start(when || c.currentTime);
    return src;
  }

  function click(when, strong, vol) {
    const c = context(), t = when || c.currentTime;
    const o = c.createOscillator(), g = c.createGain();
    o.type = 'square';
    o.frequency.value = strong ? 1760 : 1175;
    g.gain.setValueAtTime((vol ?? 0.5) * (strong ? 0.5 : 0.28), t);
    g.gain.exponentialRampToValueAtTime(0.0008, t + 0.05);
    o.connect(g); g.connect(master);
    o.start(t); o.stop(t + 0.06);
    active.add(o);
    o.onended = () => active.delete(o);
    return o;
  }

  /* Son immédiat : une note, un accord (gratté) */
  function pluck(midi, dur) { load().then(() => playNote(midi, 0, dur || 1.8)); }
  function strum(midis, spread, dur) {
    load().then(() => {
      const t = context().currentTime + 0.02;
      midis.forEach((m, i) => playNote(m, t + i * (spread ?? 0.035), dur || 2.2, { gain: 0.65 }));
    });
  }
  function playShape(shape, spread) {
    strum(M.shapeToNotes(shape).sort((a, b) => b.s - a.s).map((n) => M.noteMidi(n.s, n.f)), spread);
  }

  /* Petits sons d'interface générés (pas de fichier à charger) */
  function chime(kind) {
    if (GS.store && GS.store.get().settings.sfx === false) return;
    const c = context(), t = c.currentTime + 0.01;
    const seq = { xp: [76, 83], ok: [72, 76, 79], bad: [52, 48], quest: [72, 76, 79, 84], badge: [79, 84, 88, 91], tick: [88] }[kind] || [76];
    seq.forEach((m, i) => {
      const o = c.createOscillator(), g = c.createGain();
      o.type = kind === 'bad' ? 'triangle' : 'sine';
      o.frequency.value = M.midiToFreq(m);
      const at = t + i * 0.085;
      g.gain.setValueAtTime(0.0001, at);
      g.gain.exponentialRampToValueAtTime(0.17, at + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0005, at + 0.42);
      o.connect(g); g.connect(master); o.start(at); o.stop(at + 0.45);
    });
  }

  /* ------------------------- Lecteur de tablature ------------------------- */
  function Player(compiled, hooks) {
    this.c = compiled;
    this.hooks = hooks || {};
    this.playing = false;
    this.speed = 1;
    this.metro = false;
    this.loop = false;
    this.range = null; // {from, to} en index de mesure
    this.mutedThumb = false;
    this.mutedMelody = false;
    this.cue = [];
    this.pending = [];
    this.next = 0;
    this.pos = 0;
  }

  Player.prototype.secPerTick = function () { return 60 / (this.c.tempo * this.speed) / M.PPQ; };

  /* Construit la liste à jouer selon la plage éventuelle */
  Player.prototype.sequence = function () {
    const { timeline, bars } = this.c;
    if (!this.range) return timeline;
    const out = [];
    for (let b = this.range.from; b <= this.range.to; b++) if (bars[b]) out.push(b);
    return out;
  };

  /* Calcule, pour chaque note, jusqu'à quand elle sonne : une corde sonne tant qu'on ne la rejoue pas */
  Player.prototype.schedulePass = function (seq, start) {
    const spt = this.secPerTick(), { bars, den, num } = this.c;
    const open = {}; // corde → dernière note
    const cue = [], notes = [], clicks = [];
    let t = start;
    seq.forEach((b, seqIdx) => {
      const bar = bars[b];
      bar.events.forEach((ev, ei) => {
        const at = t + ev.t * spt;
        cue.push({ at, bar: b, ev: ei, seqIdx });
        if (ev.rest) return;
        const spread = ev.strum ? 0.022 : 0;
        const ordered = ev.strum === 'U' ? ev.notes.slice().sort((x, y) => x.s - y.s) : ev.notes.slice().sort((x, y) => y.s - x.s);
        ordered.forEach((n, i) => {
          if (open[n.s]) open[n.s].end = at;
          const item = { n, at: at + i * spread, end: at + 3.2 };
          open[n.s] = item;
          notes.push(item);
        });
      });
      // Clics de métronome
      if (this.metro) {
        const compound = den === 8 && num % 3 === 0;
        const beat = compound ? 36 : 96 / den;
        for (let k = 0, i = 0; k < bar.ticks; k += beat, i++) clicks.push({ at: t + k * spt, click: true, strong: i === 0 });
      }
      t += bar.ticks * spt;
    });
    this.pending = this.pending.slice(this.next).concat(notes, clicks).sort((x, y) => x.at - y.at);
    this.next = 0;
    this.cue = this.cue.concat(cue);
    return t;
  };

  /* Ne confie au moteur audio que les prochaines secondes : une longue pièce compte des milliers de notes */
  Player.prototype.pump = function () {
    const c = context(), horizon = c.currentTime + LOOKAHEAD;
    // En boucle, le passage suivant est programmé avant la fin pour rester sans couture
    while (this.loop && this.endAt <= horizon) this.endAt = this.schedulePass(this.seq, this.endAt);
    while (this.next < this.pending.length && this.pending[this.next].at <= horizon) {
      const item = this.pending[this.next++];
      if (item.click) { this.nodes.push(click(item.at, item.strong, 0.6)); continue; }
      if (item.n.dead) { this.nodes.push(deadNote(item.at)); continue; }
      const legato = item.n.tech === 'h' || item.n.tech === 'p' || item.n.tech === 's';
      const low = item.n.s >= 4;
      if ((this.mutedThumb && low) || (this.mutedMelody && !low)) continue;
      this.nodes.push(playNote(item.n.midi, item.at, Math.max(0.05, Math.min(item.end - item.at, 3.2)), { gain: legato ? 0.5 : 0.8, harm: item.n.harm }));
    }
    if (this.nodes.length > 600) this.nodes = this.nodes.slice(-300);
    if (!this.loop && c.currentTime >= this.endAt) this.finish();
  };

  /* Durée d'un passage complet, en secondes */
  Player.prototype.duration = function () {
    const spt = this.playing ? this.spt : this.secPerTick();
    return this.sequence().reduce((n, b) => n + this.c.bars[b].ticks, 0) * spt;
  };

  /* Position dans le passage en cours, en secondes */
  Player.prototype.position = function () {
    const total = this.duration();
    if (!this.playing) return { elapsed: 0, total };
    const elapsed = Math.max(0, context().currentTime - this.startedAt) + this.offset;
    return { elapsed: this.loop && total ? elapsed % total : Math.min(elapsed, total), total };
  };

  /* Mesure de la séquence située à une fraction donnée du morceau */
  Player.prototype.indexAt = function (frac) {
    const seq = this.sequence(), { bars } = this.c;
    let left = seq.reduce((n, b) => n + bars[b].ticks, 0) * Math.max(0, Math.min(frac, 0.9999));
    for (let i = 0; i < seq.length; i++) {
      left -= bars[seq[i]].ticks;
      if (left < 0) return i;
    }
    return 0;
  };

  /* Mesure en cours, pour repartir au même endroit */
  Player.prototype.index = function () {
    if (!this.playing) return 0;
    const pos = this.position();
    return pos.total ? this.indexAt(pos.elapsed / pos.total) : 0;
  };

  Player.prototype.play = async function (opts) {
    opts = opts || {};
    this.stop(true);
    const run = this.run;
    this.hooks.onLoading && this.hooks.onLoading(true);
    await load();
    this.hooks.onLoading && this.hooks.onLoading(false);
    if (run !== this.run) return; // arrêté, ou page quittée, pendant le chargement
    const c = context();
    this.playing = true;
    this.nodes = [];
    this.cue = [];
    this.pending = [];
    this.next = 0;
    this.pos = 0;
    this.spt = this.secPerTick();
    const spt = this.spt;
    this.seq = this.sequence();
    const from = Math.max(0, Math.min(opts.fromIndex || 0, this.seq.length - 1));
    this.offset = this.seq.slice(0, from).reduce((n, b) => n + this.c.bars[b].ticks, 0) * spt;
    let start = c.currentTime + 0.15;
    // Décompte d'une mesure
    if (opts.countIn) {
      const { den, num } = this.c;
      const compound = den === 8 && num % 3 === 0;
      const beat = (compound ? 36 : 96 / den) * spt;
      const n = compound ? num / 3 : num;
      for (let i = 0; i < n; i++) this.nodes.push(click(start + i * beat, i === 0, 0.7));
      this.hooks.onCount && this.hooks.onCount(n, beat, start);
      start += n * beat;
    }
    this.startedAt = start;
    this.endAt = this.schedulePass(this.seq.slice(from), start);
    this.pump();
    // Minuterie plutôt qu'animation : le son continue quand l'onglet passe en arrière-plan
    this.timer = setInterval(() => this.pump(), 200);
    const self = this;
    this.raf = requestAnimationFrame(function step() {
      if (!self.playing) return;
      const now = c.currentTime;
      while (self.pos < self.cue.length && self.cue[self.pos].at <= now + 0.02) {
        const q = self.cue[self.pos++];
        self.hooks.onEvent && self.hooks.onEvent(q.bar, q.ev);
      }
      self.hooks.onTick && self.hooks.onTick(self.position());
      self.raf = requestAnimationFrame(step);
    });
    this.hooks.onState && this.hooks.onState(true);
  };

  Player.prototype.halt = function () {
    this.playing = false;
    this.run = (this.run || 0) + 1;
    if (this.raf) cancelAnimationFrame(this.raf);
    clearInterval(this.timer);
  };

  /* Fin naturelle : on ne coupe pas les notes, le dernier accord sonne jusqu'au bout */
  Player.prototype.finish = function () {
    this.halt();
    this.hooks.onState && this.hooks.onState(false);
    this.hooks.onEnd && this.hooks.onEnd();
  };

  Player.prototype.stop = function (silent) {
    this.halt();
    (this.nodes || []).forEach((n) => { try { n.stop(); } catch (e) {} });
    this.nodes = [];
    if (!silent) this.hooks.onState && this.hooks.onState(false);
  };

  /* ------------------------- Métronome autonome ------------------------- */
  const metro = {
    bpm: 72, num: 4, sub: 1, running: false, timer: null, next: 0, beat: 0, subIdx: 0, onBeat: null,
    start(opts) {
      Object.assign(this, opts || {});
      context();
      this.stop();
      this.running = true;
      this.next = ctx.currentTime + 0.08;
      this.beat = 0; this.subIdx = 0;
      this.timer = setInterval(() => this.tick(), 25);
    },
    tick() {
      while (this.next < ctx.currentTime + 0.12) {
        const strong = this.subIdx === 0 && this.beat === 0;
        const isBeat = this.subIdx === 0;
        click(this.next, strong, isBeat ? 0.7 : 0.25);
        if (isBeat && this.onBeat) {
          const b = this.beat, delay = Math.max(0, (this.next - ctx.currentTime) * 1000);
          setTimeout(() => this.running && this.onBeat && this.onBeat(b), delay);
        }
        this.next += 60 / this.bpm / this.sub;
        this.subIdx++;
        if (this.subIdx >= this.sub) { this.subIdx = 0; this.beat = (this.beat + 1) % this.num; }
      }
    },
    setBpm(b) { this.bpm = b; },
    stop() { this.running = false; clearInterval(this.timer); this.timer = null; },
  };

  /* Arrête tout ce qui joue (changement de page) */
  function stopAll() {
    GS.audio.current && GS.audio.current.stop();
    metro.stop();
    active.forEach((n) => { try { n.stop(); } catch (e) {} });
    active.clear();
  }

  GS.audio = { context, load, playNote, pluck, strum, playShape, chime, click, Player, metro, stopAll, setVolume, current: null };
})();
