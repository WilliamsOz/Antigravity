/* Détection de hauteur au micro (algorithme YIN), partagée par l'accordeur et le jeu « Joue la note ». */
(function () {
  const GS = window.GS = window.GS || {};
  let stream = null, analyser = null, ctx = null, raf = null, cb = null, buf = null;

  function yin(data, sampleRate) {
    const minTau = Math.floor(sampleRate / 1100), maxTau = Math.floor(sampleRate / 70);
    const n = Math.min(data.length - maxTau, 2048);
    let rms = 0;
    for (let i = 0; i < n; i++) rms += data[i] * data[i];
    rms = Math.sqrt(rms / n);
    if (rms < 0.006) return { freq: 0, rms };
    const d = new Float32Array(maxTau + 1);
    for (let tau = 1; tau <= maxTau; tau++) {
      let sum = 0;
      for (let i = 0; i < n; i++) { const x = data[i] - data[i + tau]; sum += x * x; }
      d[tau] = sum;
    }
    let running = 0;
    const cmnd = new Float32Array(maxTau + 1);
    cmnd[0] = 1;
    for (let tau = 1; tau <= maxTau; tau++) { running += d[tau]; cmnd[tau] = running ? d[tau] * tau / running : 1; }
    let tau = -1;
    for (let t = minTau; t < maxTau; t++) {
      if (cmnd[t] < 0.13) { while (t + 1 < maxTau && cmnd[t + 1] < cmnd[t]) t++; tau = t; break; }
    }
    if (tau < 0) return { freq: 0, rms };
    // Interpolation parabolique pour gagner en précision
    const a = cmnd[tau - 1], b = cmnd[tau], c = cmnd[tau + 1] || b;
    const shift = (a + c - 2 * b) ? (a - c) / (2 * (a + c - 2 * b)) : 0;
    return { freq: sampleRate / (tau + shift), rms, clarity: 1 - b };
  }

  async function start(onPitch) {
    stop();
    cb = onPitch;
    stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') await ctx.resume();
    const src = ctx.createMediaStreamSource(stream);
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 1400;
    analyser = ctx.createAnalyser();
    analyser.fftSize = 4096;
    src.connect(lp); lp.connect(analyser);
    buf = new Float32Array(analyser.fftSize);
    let lastRun = 0;
    (function loop(now) {
      raf = requestAnimationFrame(loop);
      if (now - lastRun < 55) return;
      lastRun = now;
      analyser.getFloatTimeDomainData(buf);
      const r = yin(buf, ctx.sampleRate);
      if (r.freq > 60 && r.freq < 1200) {
        const midiExact = 69 + 12 * Math.log2(r.freq / 440), midi = Math.round(midiExact);
        cb && cb({ freq: r.freq, midi, cents: (midiExact - midi) * 100, rms: r.rms });
      } else cb && cb(null);
    })(0);
  }

  function stop() {
    if (raf) cancelAnimationFrame(raf);
    raf = null; cb = null;
    if (stream) stream.getTracks().forEach((t) => t.stop());
    stream = null;
    if (ctx) ctx.close().catch(() => {});
    ctx = null;
  }

  GS.pitch = { start, stop, active: () => !!stream };
})();
