"use client";

import { useEffect, useRef, useState } from "react";

// Chill Lo-Fi chord progression (frequencies in Hz)
// Fmaj9 -> Em7 -> Dm9 -> Cmaj9
const CHORDS = [
  // Fmaj9: F3, A3, C4, E4, G4
  [174.61, 220.0, 261.63, 329.63, 392.0],
  // Em7: E3, G3, B3, D4, G4
  [164.81, 196.0, 246.94, 293.66, 392.0],
  // Dm9: D3, F3, A3, C4, E4
  [146.83, 174.61, 220.0, 261.63, 329.63],
  // Cmaj9: C3, E3, G3, B3, D4
  [130.81, 164.81, 196.0, 246.94, 293.66],
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(65); // 0 - 100
  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const filterNodeRef = useRef(null);
  const intervalRef = useRef(null);
  const chordIdxRef = useRef(0);
  const activeNodesRef = useRef([]);

  // Create warm vinyl/tape hiss buffer
  const createTapeNoise = (ctx) => {
    try {
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99765 * b0 + white * 0.0555179;
        b1 = 0.96300 * b1 + white * 0.0750759;
        b2 = 0.57000 * b2 + white * 0.1538520;
        data[i] = (b0 + b1 + b2) * 0.007; // Very subtle, cozy warmth
      }
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;
      noiseSource.loop = true;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.015, ctx.currentTime);
      noiseSource.connect(noiseGain);
      return { noiseSource, noiseGain };
    } catch {
      return null;
    }
  };

  // Play a single lush lo-fi chord with warm envelope
  const playChord = (chordFrequencies) => {
    const ctx = audioCtxRef.current;
    if (!ctx || ctx.state !== "running" || !filterNodeRef.current) return;

    const now = ctx.currentTime;
    const chordDuration = 5.2; // 5.2s per chord
    const attack = 1.3;
    const release = 1.6;

    const chordGain = ctx.createGain();
    chordGain.gain.setValueAtTime(0.0001, now);
    chordGain.gain.exponentialRampToValueAtTime(0.11, now + attack);
    chordGain.gain.setValueAtTime(0.11, now + chordDuration - release);
    chordGain.gain.exponentialRampToValueAtTime(0.0001, now + chordDuration);

    chordGain.connect(filterNodeRef.current);

    const oscs = [];
    chordFrequencies.forEach((freq, idx) => {
      // Primary soft sine
      const osc1 = ctx.createOscillator();
      osc1.type = idx === 0 ? "sine" : "triangle";
      osc1.frequency.setValueAtTime(freq, now);

      // Subtle detuned twin for rich analog chorus
      const osc2 = ctx.createOscillator();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(freq * (1 + (idx % 2 === 0 ? 0.0018 : -0.0018)), now);

      const voiceGain = ctx.createGain();
      voiceGain.gain.setValueAtTime(idx === 0 ? 0.9 : 0.45, now);

      osc1.connect(voiceGain);
      osc2.connect(voiceGain);
      voiceGain.connect(chordGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + chordDuration + 0.1);
      osc2.stop(now + chordDuration + 0.1);

      oscs.push(osc1, osc2);
    });

    // Melodic chime note on top (pentatonic accent)
    if (Math.random() > 0.3) {
      const chimeTime = now + 1.2 + Math.random() * 1.5;
      const chimeFreq = chordFrequencies[Math.floor(Math.random() * chordFrequencies.length)] * 2;
      const chimeOsc = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chimeOsc.type = "sine";
      chimeOsc.frequency.setValueAtTime(chimeFreq, chimeTime);

      chimeGain.gain.setValueAtTime(0.0001, chimeTime);
      chimeGain.gain.exponentialRampToValueAtTime(0.025, chimeTime + 0.05);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, chimeTime + 1.8);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(filterNodeRef.current);

      chimeOsc.start(chimeTime);
      chimeOsc.stop(chimeTime + 1.9);
      oscs.push(chimeOsc);
    }

    activeNodesRef.current.push({ chordGain, oscs });

    // Cleanup finished nodes
    setTimeout(() => {
      try {
        chordGain.disconnect();
      } catch {}
    }, (chordDuration + 0.5) * 1000);
  };

  const startSynth = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    if (!audioCtxRef.current) {
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      // Master output filter: warm Lo-Fi lowpass ~520Hz cuts harsh highs
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(520, ctx.currentTime);
      filter.Q.setValueAtTime(1.2, ctx.currentTime);
      filterNodeRef.current = filter;

      // Master Gain
      const master = ctx.createGain();
      const initialGain = (volume / 100) * 0.18;
      master.gain.setValueAtTime(initialGain, ctx.currentTime);
      masterGainRef.current = master;

      filter.connect(master);
      master.connect(ctx.destination);

      // Add gentle tape warmth
      const tape = createTapeNoise(ctx);
      if (tape) {
        tape.noiseGain.connect(master);
        tape.noiseSource.start();
      }
    }

    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    // Play first chord immediately
    chordIdxRef.current = 0;
    playChord(CHORDS[chordIdxRef.current]);

    // Schedule subsequent chords every 4.8 seconds (gentle overlap)
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      chordIdxRef.current = (chordIdxRef.current + 1) % CHORDS.length;
      playChord(CHORDS[chordIdxRef.current]);
    }, 4800);
  };

  const stopSynth = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    if (audioCtxRef.current && masterGainRef.current) {
      masterGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.25);
      setTimeout(() => {
        if (audioCtxRef.current && audioCtxRef.current.state === "running") {
          audioCtxRef.current.suspend();
        }
      }, 300);
    }
  };

  const toggleSound = () => {
    if (!isPlaying) {
      startSynth();
      if (masterGainRef.current && audioCtxRef.current) {
        const targetVol = (volume / 100) * 0.18;
        masterGainRef.current.gain.setTargetAtTime(targetVol, audioCtxRef.current.currentTime, 0.2);
      }
      setIsPlaying(true);
    } else {
      stopSynth();
      setIsPlaying(false);
    }
  };

  // Adjust volume dynamically
  const handleVolumeChange = (e) => {
    const newVol = Number(e.target.value);
    setVolume(newVol);
    if (masterGainRef.current && audioCtxRef.current && isPlaying) {
      const targetVol = (newVol / 100) * 0.18;
      masterGainRef.current.gain.setTargetAtTime(targetVol, audioCtxRef.current.currentTime, 0.05);
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <aside className={`music-player ${isPlaying ? "is-playing" : ""} ${mobileOpen ? "mobile-expanded" : ""}`}>
      <button
        className="music-button"
        onClick={toggleSound}
        aria-label={isPlaying ? "Jeda Ambient Chill Lo-Fi" : "Putar Ambient Chill Lo-Fi"}
        title={isPlaying ? "Jeda Ambient Lo-Fi" : "Dengarkan Musik Lo-Fi Santai (Synthesized Audio)"}
      >
        <span className="music-bars" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className="music-icon">{isPlaying ? "Ⅱ" : "▶"}</span>
      </button>

      {/* Mobile volume expand toggle button */}
      {isPlaying && (
        <button
          className="music-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Tutup kontrol volume" : "Buka kontrol volume"}
          title="Pengaturan Volume"
        >
          {mobileOpen ? "✕" : "⚙"}
        </button>
      )}

      <div className="music-meta">
        <div className="music-head-row">
          <span className="music-kicker">
            {isPlaying ? "SEDANG DIPUTAR · CHILL" : "AMBIENT LO-FI NOC"}
          </span>
          {isPlaying && (
            <span className="music-vol-badge">{volume}%</span>
          )}
        </div>
        <strong>Cyber Chill & Lo-Fi Lounge</strong>
        <span className="music-subtext">Akord Fmaj9 / Em7 / Dm9 · Web Audio Synth</span>

        {/* Volume Slider */}
        <div className="music-volume-row" onClick={(e) => e.stopPropagation()}>
          <span className="vol-icon" aria-hidden="true">🔈</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="music-vol-slider"
            aria-label="Volume Ambient Lo-Fi"
            title={`Volume: ${volume}%`}
          />
          <span className="vol-icon" aria-hidden="true">🔊</span>
        </div>
      </div>
    </aside>
  );
}
