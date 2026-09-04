"use client";

import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function OtdrWaveform({ distance = 5, splices = 2, connectors = 2, wavelength = "1310", totalLoss = 2.75 }) {
  const { lang } = useLanguage();
  const isId = lang === "id";
  const [activeEvent, setActiveEvent] = useState(null);

  // SVG dimensions
  const width = 640;
  const height = 220;
  const padding = { top: 28, right: 30, bottom: 38, left: 55 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  // X scale: 0 to distance (km) + 10% buffer
  const maxKm = Math.max(distance * 1.15, 1);
  const scaleX = (km) => padding.left + (km / maxKm) * plotWidth;

  // Y scale: Attenuation dB (0 dB down to totalLoss * 1.4 or max 10 dB)
  const maxLoss = Math.max(parseFloat(totalLoss) * 1.35, 6);
  const scaleY = (loss) => padding.top + (loss / maxLoss) * plotHeight;

  // Calculate events
  const distNum = parseFloat(distance) || 5;
  const spliceCount = parseInt(splices) || 0;
  const attenuationRate = wavelength === "1310" ? 0.35 : 0.22;

  const events = [];

  // Event 0: Launch connector (0 km)
  events.push({
    id: 0,
    km: 0,
    type: isId ? "Launch Connector (Konektor Awal)" : "Launch Connector",
    loss: 0.35,
    reflectance: "-48.2 dB",
    desc: isId ? "Titik awal ODF / Launch cable patchcord" : "ODF Launch Cable interface",
    isReflective: true,
  });

  // Intermediate Splice Events
  for (let i = 1; i <= spliceCount; i++) {
    const kmPos = parseFloat(((distNum / (spliceCount + 1)) * i).toFixed(2));
    events.push({
      id: i,
      km: kmPos,
      type: isId ? `Fusion Splice #${i}` : `Fusion Splice #${i}`,
      loss: 0.08,
      reflectance: isId ? "Non-Reflektif" : "Non-Reflective",
      desc: isId ? "Titik sambungan core kaca (Splicer)" : "Fusion splice joint core",
      isReflective: false,
    });
  }

  // End of fiber event
  events.push({
    id: spliceCount + 1,
    km: distNum,
    type: isId ? "Ujung Kabel (Fiber End / Termination)" : "Fiber End / Termination",
    loss: parseFloat(totalLoss),
    reflectance: "-14.5 dB",
    desc: isId ? "Fresnel reflection di ujung ODF / Break point" : "Fresnel reflection at far-end ODF termination",
    isReflective: true,
  });

  // Generate SVG path for Rayleigh backscatter slope
  let pathD = `M ${scaleX(0)} ${scaleY(0)}`;

  // Launch spike (reflective pulse)
  const peakY = scaleY(-1.2);
  pathD += ` L ${scaleX(0.04)} ${peakY}`;
  pathD += ` L ${scaleX(0.1)} ${scaleY(0.4)}`;

  let currentLoss = 0.4;
  let currentKm = 0.1;

  // Trace between events
  events.slice(1, -1).forEach((evt) => {
    // Backscatter slope to splice point
    const fiberLossDelta = (evt.km - currentKm) * attenuationRate;
    currentLoss += fiberLossDelta;
    pathD += ` L ${scaleX(evt.km)} ${scaleY(currentLoss)}`;

    // Splice step drop (non-reflective loss)
    currentLoss += evt.loss;
    pathD += ` L ${scaleX(evt.km + 0.03)} ${scaleY(currentLoss)}`;
    currentKm = evt.km + 0.03;
  });

  // Slope to end event
  const finalFiberDelta = (distNum - currentKm) * attenuationRate;
  currentLoss += finalFiberDelta;
  pathD += ` L ${scaleX(distNum)} ${scaleY(currentLoss)}`;

  // Far-end Fresnel reflection peak
  pathD += ` L ${scaleX(distNum)} ${scaleY(currentLoss - 2.5)}`;
  // Rapid drop into noise floor
  pathD += ` L ${scaleX(distNum + 0.05)} ${scaleY(maxLoss)}`;
  // Noise floor line
  pathD += ` L ${scaleX(maxKm)} ${scaleY(maxLoss)}`;

  return (
    <div className="otdr-trace-container">
      <div className="otdr-trace-header">
        <div className="otdr-title-row">
          <span className="otdr-badge">OTDR TRACE VISUALIZER</span>
          <span className="otdr-param-badge">λ: {wavelength}nm · G.652</span>
        </div>
        <div className="otdr-legend">
          <span className="legend-chip"><span className="dot-teal" /> {isId ? "Kurva Backscatter" : "Backscatter Slope"}</span>
          <span className="legend-chip"><span className="dot-copper" /> {isId ? "Event Sambungan" : "Splice / Refl Event"}</span>
        </div>
      </div>

      <div className="otdr-svg-wrapper">
        <svg viewBox={`0 0 ${width} ${height}`} className="otdr-svg" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="otdrGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4fd1c5" />
              <stop offset="60%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#c97c4b" />
            </linearGradient>
            <linearGradient id="otdrFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4fd1c5" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#4fd1c5" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = padding.top + ratio * plotHeight;
            const lossVal = (ratio * maxLoss).toFixed(1);
            return (
              <g key={`y-${ratio}`}>
                <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                <text x={padding.left - 8} y={y + 3} textAnchor="end" fill="#64748b" fontSize="9" fontFamily="var(--mono)">
                  -{lossVal}dB
                </text>
              </g>
            );
          })}

          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const kmVal = (ratio * distNum).toFixed(1);
            const x = scaleX(parseFloat(kmVal));
            return (
              <g key={`x-${ratio}`}>
                <line x1={x} y1={padding.top} x2={x} y2={height - padding.bottom} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                <text x={x} y={height - padding.bottom + 16} textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="var(--mono)">
                  {kmVal}km
                </text>
              </g>
            );
          })}

          {/* Trace Path Area */}
          <path
            d={`${pathD} L ${scaleX(maxKm)} ${height - padding.bottom} L ${scaleX(0)} ${height - padding.bottom} Z`}
            fill="url(#otdrFill)"
          />

          {/* Main Trace Waveform */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#otdrGlow)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 0 6px rgba(79, 209, 197, 0.4))" }}
          />

          {/* Event Markers */}
          {events.map((evt) => {
            const x = scaleX(evt.km);
            const y = scaleY(evt.km === 0 ? 0.35 : evt.km === distNum ? currentLoss : evt.km * attenuationRate + 0.4);
            const isHovered = activeEvent?.id === evt.id;

            return (
              <g
                key={evt.id}
                className="otdr-marker"
                onClick={() => setActiveEvent(evt)}
                onMouseEnter={() => setActiveEvent(evt)}
                style={{ cursor: "pointer" }}
              >
                {/* Event Marker Pin */}
                <line
                  x1={x}
                  y1={padding.top}
                  x2={x}
                  y2={height - padding.bottom}
                  stroke={evt.isReflective ? "#c97c4b" : "#4fd1c5"}
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  opacity={isHovered ? "0.9" : "0.35"}
                />
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 6 : 4}
                  fill={evt.isReflective ? "#c97c4b" : "#4fd1c5"}
                  stroke="#0a0d10"
                  strokeWidth="2"
                  style={{ transition: "all 0.2s" }}
                />
                <text
                  x={x}
                  y={padding.top - 8}
                  textAnchor="middle"
                  fill={isHovered ? "#fff" : evt.isReflective ? "#c97c4b" : "#4fd1c5"}
                  fontSize="8.5"
                  fontWeight="bold"
                  fontFamily="var(--mono)"
                >
                  E{evt.id} ({evt.km}km)
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Interactive Event Detail Box */}
      <div className="otdr-event-detail">
        {activeEvent ? (
          <div className="otdr-event-card">
            <div className="otdr-event-row">
              <span className="otdr-event-tag">EVENT #{activeEvent.id}</span>
              <strong className="otdr-event-name">{activeEvent.type}</strong>
              <span className="otdr-event-dist">Lokasi: {activeEvent.km} KM</span>
            </div>
            <p className="otdr-event-desc">{activeEvent.desc}</p>
            <div className="otdr-event-meta">
              <span>Redaman Event: <strong>{activeEvent.loss} dB</strong></span>
              <span>Reflektansi: <strong>{activeEvent.reflectance}</strong></span>
            </div>
          </div>
        ) : (
          <div className="otdr-event-placeholder">
            <span>💡 {isId ? "Sentuh / arahkan kursor ke titik event (E0, E1, E2) pada grafik untuk melihat rincian sambungan fusion dan reflektansi." : "Hover or tap on event markers (E0, E1, E2) on the trace to inspect splice loss and reflectance."}</span>
          </div>
        )}
      </div>
    </div>
  );
}
