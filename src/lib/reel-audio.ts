// Original, procedurally generated cinematic soundscape (no audio files, no samples).
// Layers: sub drone, evolving pad, filtered wind, slow swells, and sparse impacts.

export type ReelAudio = { stop: () => void };

function noiseBuffer(ctx: AudioContext, seconds: number) {
  const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
}

export function startReelAudio(): ReelAudio {
  const ctx = new AudioContext();
  const master = ctx.createGain();
  master.gain.setValueAtTime(0, ctx.currentTime);
  master.gain.linearRampToValueAtTime(0.7, ctx.currentTime + 2.5);

  const reverb = ctx.createConvolver();
  const impulse = ctx.createBuffer(2, ctx.sampleRate * 3.5, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = impulse.getChannelData(c);
    for (let i = 0; i < d.length; i++)
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2.6);
  }
  reverb.buffer = impulse;
  const wet = ctx.createGain();
  wet.gain.value = 0.55;
  reverb.connect(wet).connect(master);
  master.connect(ctx.destination);

  const stoppers: Array<() => void> = [];
  const timers: number[] = [];

  // Sub drone + detuned pad
  const droneFilter = ctx.createBiquadFilter();
  droneFilter.type = "lowpass";
  droneFilter.frequency.value = 220;
  const droneGain = ctx.createGain();
  droneGain.gain.value = 0.32;
  droneFilter.connect(droneGain);
  droneGain.connect(master);
  droneGain.connect(reverb);
  [
    [55, "sine"],
    [55.4, "sawtooth"],
    [82.4, "triangle"],
    [110.3, "sawtooth"],
  ].forEach(([freq, type]) => {
    const osc = ctx.createOscillator();
    osc.type = type as OscillatorType;
    osc.frequency.value = freq as number;
    const g = ctx.createGain();
    g.gain.value = type === "sawtooth" ? 0.12 : 0.4;
    osc.connect(g).connect(droneFilter);
    osc.start();
    stoppers.push(() => osc.stop());
  });
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.07;
  const lfoDepth = ctx.createGain();
  lfoDepth.gain.value = 140;
  lfo.connect(lfoDepth).connect(droneFilter.frequency);
  lfo.start();
  stoppers.push(() => lfo.stop());

  // Wind
  const wind = ctx.createBufferSource();
  wind.buffer = noiseBuffer(ctx, 6);
  wind.loop = true;
  const windFilter = ctx.createBiquadFilter();
  windFilter.type = "bandpass";
  windFilter.frequency.value = 500;
  windFilter.Q.value = 0.9;
  const windGain = ctx.createGain();
  windGain.gain.value = 0.16;
  const windLfo = ctx.createOscillator();
  windLfo.frequency.value = 0.11;
  const windLfoDepth = ctx.createGain();
  windLfoDepth.gain.value = 320;
  windLfo.connect(windLfoDepth).connect(windFilter.frequency);
  wind.connect(windFilter).connect(windGain);
  windGain.connect(master);
  windGain.connect(reverb);
  wind.start();
  windLfo.start();
  stoppers.push(
    () => wind.stop(),
    () => windLfo.stop(),
  );

  // Cinematic impact: sub thump + filtered noise burst into the reverb
  const impact = () => {
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(90, t);
    osc.frequency.exponentialRampToValueAtTime(32, t + 0.9);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.9, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 1.6);
    osc.connect(g);
    g.connect(master);
    g.connect(reverb);
    osc.start(t);
    osc.stop(t + 1.7);

    const src = ctx.createBufferSource();
    src.buffer = noiseBuffer(ctx, 1);
    const f = ctx.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.setValueAtTime(3200, t);
    f.frequency.exponentialRampToValueAtTime(140, t + 0.8);
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.5, t);
    ng.gain.exponentialRampToValueAtTime(0.001, t + 1);
    src.connect(f).connect(ng);
    ng.connect(master);
    ng.connect(reverb);
    src.start(t);
  };

  // Riser: filtered noise sweeping upward, then an impact
  const riser = () => {
    const t = ctx.currentTime;
    const src = ctx.createBufferSource();
    src.buffer = noiseBuffer(ctx, 5);
    const f = ctx.createBiquadFilter();
    f.type = "bandpass";
    f.Q.value = 2;
    f.frequency.setValueAtTime(200, t);
    f.frequency.exponentialRampToValueAtTime(5000, t + 4);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.001, t);
    g.gain.exponentialRampToValueAtTime(0.35, t + 4);
    g.gain.linearRampToValueAtTime(0, t + 4.2);
    src.connect(f).connect(g);
    g.connect(master);
    g.connect(reverb);
    src.start(t);
    src.stop(t + 4.5);
    timers.push(window.setTimeout(impact, 4000));
  };

  // Sparse metallic tones (pentatonic-ish, low register)
  const tone = () => {
    const notes = [110, 130.8, 146.8, 164.8, 196, 220];
    const freq = notes[Math.floor(Math.random() * notes.length)] ?? 110;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.001, t);
    g.gain.linearRampToValueAtTime(0.12, t + 0.05);
    g.gain.exponentialRampToValueAtTime(0.001, t + 4);
    osc.connect(g);
    g.connect(master);
    g.connect(reverb);
    osc.start(t);
    osc.stop(t + 4.2);
  };

  const schedule = (fn: () => void, min: number, max: number) => {
    const next = () => {
      timers.push(
        window.setTimeout(
          () => {
            fn();
            next();
          },
          (min + Math.random() * (max - min)) * 1000,
        ),
      );
    };
    next();
  };
  timers.push(window.setTimeout(impact, 1200));
  schedule(tone, 2.5, 6);
  schedule(impact, 9, 16);
  schedule(riser, 22, 34);

  return {
    stop: () => {
      timers.forEach((id) => window.clearTimeout(id));
      const t = ctx.currentTime;
      master.gain.cancelScheduledValues(t);
      master.gain.setValueAtTime(master.gain.value, t);
      master.gain.linearRampToValueAtTime(0, t + 0.8);
      window.setTimeout(() => {
        stoppers.forEach((s) => {
          try {
            s();
          } catch {
            /* already stopped */
          }
        });
        void ctx.close();
      }, 900);
    },
  };
}
