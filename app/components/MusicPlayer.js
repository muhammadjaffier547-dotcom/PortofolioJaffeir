"use client";

import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);

  const toggleSound = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        // Create low ambient data center drone (55Hz sine + gentle harmonic)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const biquad = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc1.type = "sine";
        osc1.frequency.setValueAtTime(55, ctx.currentTime); // Low A1

        osc2.type = "triangle";
        osc2.frequency.setValueAtTime(110, ctx.currentTime); // Harmonic A2

        biquad.type = "lowpass";
        biquad.frequency.setValueAtTime(220, ctx.currentTime);

        gain.gain.setValueAtTime(0.045, ctx.currentTime); // Soft background volume

        osc1.connect(biquad);
        osc2.connect(biquad);
        biquad.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();
        gainNodeRef.current = gain;
      }

      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
        setIsPlaying(true);
      } else if (audioCtxRef.current.state === "running") {
        if (isPlaying) {
          gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.2);
          setTimeout(() => {
            audioCtxRef.current.suspend();
            setIsPlaying(false);
          }, 250);
        } else {
          audioCtxRef.current.resume();
          gainNodeRef.current.gain.setTargetAtTime(0.045, audioCtxRef.current.currentTime, 0.2);
          setIsPlaying(true);
        }
      }
    } catch (e) {
      console.warn("Audio context error", e);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <aside className={`music-player ${isPlaying ? "is-playing" : ""}`}>
      <button
        className="music-button"
        onClick={toggleSound}
        aria-label={isPlaying ? "Matikan ambient suara NOC" : "Putar ambient suara NOC"}
        title={isPlaying ? "Matikan Ambient Suara NOC" : "Dengarkan Ambient Ruang Data Center"}
      >
        <span className="music-bars" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className="music-icon">{isPlaying ? "Ⅱ" : "▶"}</span>
      </button>
      <div className="music-meta">
        <span className="music-kicker">
          {isPlaying ? "SEDANG AKTIF" : "AMBIENT SUARA NOC"}
        </span>
        <strong>Data Center Server Drone</strong>
        <span>Suara atmosferik ruang server · Web Audio</span>
      </div>
    </aside>
  );
}
