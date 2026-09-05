"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

const STATIONS = [
  {
    id: "jkt",
    code: "JKT-ID",
    name: "Jakarta Core PoP",
    fullLabel: "APJII Cyber 1 / IDC 3D (AS23700)",
    country: "Indonesia 🇮🇩",
    x: 375,
    y: 350,
    rtt: "0.8 ms",
    baseRtt: 0.8,
    status: "OPERATIONAL",
    role: "Core Peering & NOC Datacenter",
    capacity: "400 Gbps Fabric",
    equipment: "MikroTik CCR2004 · Cisco Nexus · ODF 96-Core",
    cables: ["B2JS", "JASUKA", "Indigo-Central"],
  },
  {
    id: "btm",
    code: "BTM-ID",
    name: "Batam Landing Station",
    fullLabel: "Nongsa Digital Park / Barelang CLS",
    country: "Indonesia 🇮🇩",
    x: 355,
    y: 285,
    rtt: "5.4 ms",
    baseRtt: 5.4,
    status: "OPERATIONAL",
    role: "Submarine Fiber Landing Gateway",
    capacity: "100 Gbps DWDM",
    equipment: "DWDM Transponder · EDFA Optical Amplifiers",
    cables: ["B2JS", "PGAS-COM", "Matrix Cable"],
  },
  {
    id: "sin",
    code: "SIN-SG",
    name: "Singapore Super-Hub",
    fullLabel: "Equinix SG1 / SingTel Tuas Landing Stn",
    country: "Singapore 🇸🇬",
    x: 340,
    y: 255,
    rtt: "8.2 ms",
    baseRtt: 8.2,
    status: "OPERATIONAL",
    role: "Tier-1 Peering & IX Hub",
    capacity: "1.2 Tbps Backbone",
    equipment: "Juniper PTX10008 · Equinix IX Fabric",
    cables: ["B2JS", "SEA-ME-WE 5", "SJC2", "Indigo-West"],
  },
  {
    id: "hkg",
    code: "HKG-HK",
    name: "Hong Kong Gateway",
    fullLabel: "Mega-i Datacenter / HKIX",
    country: "Hong Kong 🇭🇰",
    x: 520,
    y: 165,
    rtt: "32.6 ms",
    baseRtt: 32.6,
    status: "OPERATIONAL",
    role: "East Asia Transit Junction",
    capacity: "800 Gbps DWDM",
    equipment: "Cisco 8000 Series · HKIX Optical Switch",
    cables: ["APG", "SJC", "SEA-ME-WE 3"],
  },
  {
    id: "tyo",
    code: "TYO-JP",
    name: "Tokyo Trans-Pacific",
    fullLabel: "Equinix TY2 / JPIX Peering",
    country: "Japan 🇯🇵",
    x: 695,
    y: 125,
    rtt: "67.4 ms",
    baseRtt: 67.4,
    status: "OPERATIONAL",
    role: "Pacific Fiber Gateway to Americas",
    capacity: "1.6 Tbps Subsea Trunk",
    equipment: "Infinera GX Series · Optical Cross-Connect",
    cables: ["FASTER", "JUPITER", "PC-1"],
  },
  {
    id: "per",
    code: "PER-AU",
    name: "Perth Oceanic Link",
    fullLabel: "Shenton Park Landing Station",
    country: "Australia 🇦🇺",
    x: 435,
    y: 470,
    rtt: "48.1 ms",
    baseRtt: 48.1,
    status: "OPERATIONAL",
    role: "Southern Hemisphere Backbone",
    capacity: "36 Tbps Design",
    equipment: "Subsea Repeater Power Feed · Ciena WaveLogic 5",
    cables: ["Indigo-West", "Indigo-Central", "ASC"],
  },
  {
    id: "usa",
    code: "SJC-US",
    name: "US West Coast (Silicon Valley)",
    fullLabel: "Equinix SV1 / Coresite One Wilshire (LA)",
    country: "United States 🇺🇸",
    x: 915,
    y: 175,
    rtt: "166.8 ms",
    baseRtt: 166.8,
    status: "OPERATIONAL",
    role: "Global Tier-1 IP Transit (HE, Telia, Lumen)",
    capacity: "4.8 Tbps Trans-Pacific Link",
    equipment: "Arista 7800R3 · Core Routing Engine",
    cables: ["FASTER", "JUPITER", "Pacific Light Data Ring"],
  },
];

const CABLES = [
  {
    id: "b2js-1",
    name: "B2JS Segment 1 (Jakarta ➔ Batam)",
    category: "direct",
    from: "jkt",
    to: "btm",
    d: "M 375 350 Q 360 318 355 285",
    length: "980 km",
    capacity: "100G DWDM (80 Channels)",
    depth: "Avg 45m (Java Sea / Bangka Strait)",
    osnr: "28.4 dB",
    rtt: "5.4 ms",
    operator: "Mora Telematika / PT B2JS",
  },
  {
    id: "b2js-2",
    name: "B2JS Segment 2 (Batam ➔ Singapore)",
    category: "direct",
    from: "btm",
    to: "sin",
    d: "M 355 285 Q 348 270 340 255",
    length: "90 km",
    capacity: "100G Coherent Optical",
    depth: "Avg 32m (Singapore Strait)",
    osnr: "31.2 dB",
    rtt: "2.8 ms",
    operator: "SingTel / Indonesian Consortium",
  },
  {
    id: "sin-hkg",
    name: "SJC / APG (Singapore ➔ Hong Kong)",
    category: "global",
    from: "sin",
    to: "hkg",
    d: "M 340 255 Q 420 230 520 165",
    length: "2,850 km",
    capacity: "54 Tbps Subsea Trunk",
    depth: "Avg 1,200m (South China Sea)",
    osnr: "24.8 dB",
    rtt: "24.2 ms",
    operator: "Asia Submarine-cable Express (ASE)",
  },
  {
    id: "hkg-tyo",
    name: "NCP / APG (Hong Kong ➔ Tokyo)",
    category: "global",
    from: "hkg",
    to: "tyo",
    d: "M 520 165 Q 610 160 695 125",
    length: "2,980 km",
    capacity: "80 Tbps Coherent System",
    depth: "Avg 2,100m (Philippine Sea Basin)",
    osnr: "22.9 dB",
    rtt: "34.8 ms",
    operator: "New Cross Pacific Consortium",
  },
  {
    id: "tyo-usa",
    name: "Trans-Pacific FASTER (Tokyo ➔ Silicon Valley)",
    category: "global",
    from: "tyo",
    to: "usa",
    d: "M 695 125 Q 810 110 915 175",
    length: "9,000 km",
    capacity: "60 Tbps (6 Fiber Pairs)",
    depth: "Max 6,400m (Pacific Abyssal Plain)",
    osnr: "19.8 dB",
    rtt: "99.4 ms",
    operator: "Google / Global Transit Consortium",
  },
  {
    id: "jkt-per",
    name: "Indigo-Central (Jakarta ➔ Perth)",
    category: "oceanic",
    from: "jkt",
    to: "per",
    d: "M 375 350 Q 395 420 435 470",
    length: "3,200 km",
    capacity: "36 Tbps (Two Fiber Pairs)",
    depth: "Avg 4,500m (Wharton Basin Indian Ocean)",
    osnr: "23.5 dB",
    rtt: "47.3 ms",
    operator: "AARNet / Google / Telstra / Singtel",
  },
  {
    id: "sin-per",
    name: "Indigo-West (Singapore ➔ Perth)",
    category: "oceanic",
    from: "sin",
    to: "per",
    d: "M 340 255 Q 330 380 435 470",
    length: "4,600 km",
    capacity: "36 Tbps Subsea Trunk",
    depth: "Avg 5,200m (Eastern Indian Ocean)",
    osnr: "22.1 dB",
    rtt: "42.5 ms",
    operator: "Indigo Consortium",
  },
];

export default function SubmarineCableMap() {
  const { lang } = useLanguage();
  const isId = lang === "id";

  const [activeStation, setActiveStation] = useState(STATIONS[0]);
  const [activeCable, setActiveCable] = useState(CABLES[0]);
  const [filterMode, setFilterMode] = useState("all"); // "all", "direct", "global"
  const [isPinging, setIsPinging] = useState(false);
  const [pingLog, setPingLog] = useState(null);
  const [jitter, setJitter] = useState(0);

  // Subtle telemetry jitter simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setJitter(Math.random() * 0.6 - 0.3);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const handleStationClick = (stn) => {
    setActiveStation(stn);
    const related = CABLES.find((c) => c.to === stn.id || c.from === stn.id);
    if (related) setActiveCable(related);
  };

  const handleCableClick = (cbl) => {
    setActiveCable(cbl);
    const dest = STATIONS.find((s) => s.id === cbl.to) || STATIONS[0];
    setActiveStation(dest);
  };

  const fireLaserPing = () => {
    if (isPinging) return;
    setIsPinging(true);
    setPingLog(null);

    const steps = [
      `[OPTICAL-TX] Injeksi pulsa laser DWDM (1550nm) dari JKT Core (Cyber 1)...`,
      `[AMP-REPEATER] EDFA Amplifier boost +18.5 dB melalui kabel ${activeCable.name}...`,
      `[RX-STATION] Deteksi foton di ${activeStation.fullLabel}. Optical RTT: ${(activeStation.baseRtt + jitter).toFixed(2)} ms (Loss 0.00%)`,
    ];

    setTimeout(() => {
      setPingLog(steps);
      setIsPinging(false);
    }, 1200);
  };

  const filteredCables = CABLES.filter((c) => {
    if (filterMode === "all") return true;
    if (filterMode === "direct") return c.category === "direct";
    if (filterMode === "global") return c.category === "global" || c.category === "oceanic";
    return true;
  });

  return (
    <section id="submarine-map" className="subsea-section">
      <div className="wrap">
        <div className="subsea-head">
          <div>
            <p className="eyebrow">05 · Global Transit & Peering</p>
            <h2 className="sectitle">
              {isId ? "Peta Jalur Fiber Optik Bawah Laut" : "Submarine Cable & Optical Peering Map"}
            </h2>
            <p className="section-note">
              {isId
                ? "Visualisasi topologi kabel laut internasional dan rute peering BGP APJII / Tier-1 dari Jakarta Cyber 1 menuju Batam, Singapore, hingga Amerika Serikat."
                : "International submarine fiber routes and Tier-1 IP transit topology from Jakarta Cyber 1 PoP to Batam, Singapore, and Global Transit hubs."}
            </p>
          </div>

          <div className="subsea-filters">
            <button
              className={`subsea-filter-btn ${filterMode === "all" ? "active" : ""}`}
              onClick={() => setFilterMode("all")}
            >
              {isId ? "Semua Rute (All)" : "All Cables"}
            </button>
            <button
              className={`subsea-filter-btn ${filterMode === "direct" ? "active" : ""}`}
              onClick={() => setFilterMode("direct")}
            >
              {isId ? "Kabel Batam - SG (Direct)" : "Batam - SG (Direct)"}
            </button>
            <button
              className={`subsea-filter-btn ${filterMode === "global" ? "active" : ""}`}
              onClick={() => setFilterMode("global")}
            >
              {isId ? "Tier-1 Global Transit" : "Global Transit"}
            </button>
          </div>
        </div>

        {/* Main Map Container */}
        <div className="subsea-viewport panel">
          {/* Top Status Banner */}
          <div className="subsea-hud-bar">
            <div className="subsea-hud-left">
              <span className="subsea-hud-dot" />
              <span className="subsea-hud-title">
                {isId ? "JALUR BACKBONE OPTIK AKTIF · 99.999% SLA" : "ACTIVE SUBSEA BACKBONE · 99.999% SLA"}
              </span>
            </div>
            <div className="subsea-hud-right">
              <span>LOCAL POP: <strong>JKT Cyber 1 (AS23700)</strong></span>
              <span>LAMBDA: <strong>1550nm C-Band DWDM</strong></span>
            </div>
          </div>

          {/* Interactive SVG World/Asia-Pacific Optical Topology Map */}
          <div className="subsea-svg-container">
            <svg
              viewBox="0 0 1000 520"
              className="subsea-svg"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Glow Filter for Fiber Laser Pulses */}
                <filter id="laserGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Linear Gradients for Optical Cables */}
                <linearGradient id="directGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4FD1C5" />
                  <stop offset="100%" stopColor="#38BDF8" />
                </linearGradient>

                <linearGradient id="globalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#C084FC" />
                </linearGradient>

                <linearGradient id="oceanicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4FD1C5" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
              </defs>

              {/* Background Cartography Grid (Lat/Long Lines) */}
              <g className="subsea-grid-lines" opacity="0.15">
                <line x1="0" y1="100" x2="1000" y2="100" stroke="var(--line)" strokeDasharray="4 6" />
                <line x1="0" y1="200" x2="1000" y2="200" stroke="var(--line)" strokeDasharray="4 6" />
                <line x1="0" y1="300" x2="1000" y2="300" stroke="var(--line)" strokeDasharray="4 6" />
                <line x1="0" y1="400" x2="1000" y2="400" stroke="var(--line)" strokeDasharray="4 6" />
                <line x1="200" y1="0" x2="200" y2="520" stroke="var(--line)" strokeDasharray="4 6" />
                <line x1="400" y1="0" x2="400" y2="520" stroke="var(--line)" strokeDasharray="4 6" />
                <line x1="600" y1="0" x2="600" y2="520" stroke="var(--line)" strokeDasharray="4 6" />
                <line x1="800" y1="0" x2="800" y2="520" stroke="var(--line)" strokeDasharray="4 6" />
              </g>

              {/* Stylized Landmass Silhouettes (Minimalist Geo Reference) */}
              <g className="subsea-landmass" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.06)">
                {/* Indochina & SE Asia Outline */}
                <path d="M 310 170 Q 350 150 420 180 Q 480 200 470 260 Q 400 250 360 270 Q 320 220 310 170 Z" />
                {/* Sumatra */}
                <path d="M 260 250 Q 320 290 350 360 Q 320 380 280 320 Z" />
                {/* Java */}
                <path d="M 340 370 Q 420 380 480 390 Q 470 405 380 395 Z" />
                {/* Borneo */}
                <path d="M 390 260 Q 450 250 470 310 Q 420 340 380 310 Z" />
                {/* Japan */}
                <path d="M 670 90 Q 720 110 705 160 Q 660 140 670 90 Z" />
                {/* Australia */}
                <path d="M 420 440 Q 560 410 590 490 Q 480 520 420 440 Z" />
                {/* US West Coast */}
                <path d="M 890 80 Q 950 140 930 260 L 1000 260 L 1000 80 Z" />
              </g>

              {/* Subsea Cable Conduits (Paths) */}
              <g className="subsea-cables-layer">
                {filteredCables.map((cable) => {
                  const isSelected = activeCable.id === cable.id;
                  let strokeGrad = "url(#directGradient)";
                  if (cable.category === "global") strokeGrad = "url(#globalGradient)";
                  if (cable.category === "oceanic") strokeGrad = "url(#oceanicGradient)";

                  return (
                    <g key={cable.id} className="subsea-cable-group" onClick={() => handleCableClick(cable)}>
                      {/* Wide invisible click target */}
                      <path
                        d={cable.d}
                        fill="none"
                        stroke="transparent"
                        strokeWidth="24"
                        className="subsea-hit-target"
                      />
                      {/* Outer Glow Halo */}
                      <path
                        d={cable.d}
                        fill="none"
                        stroke={strokeGrad}
                        strokeWidth={isSelected ? "5" : "2.5"}
                        opacity={isSelected ? "0.8" : "0.35"}
                        filter="url(#laserGlow)"
                        className="subsea-cable-halo"
                      />
                      {/* Crisp Fiber Core Path */}
                      <path
                        d={cable.d}
                        fill="none"
                        stroke={strokeGrad}
                        strokeWidth={isSelected ? "2.5" : "1.5"}
                        strokeDasharray={isSelected ? "none" : "6 3"}
                        className="subsea-cable-core"
                      />
                      {/* Flowing Laser Photon Packet Animation */}
                      <path
                        d={cable.d}
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="12 180"
                        className="subsea-photon-pulse"
                        filter="url(#laserGlow)"
                      />
                    </g>
                  );
                })}
              </g>

              {/* Landing Hub Nodes */}
              <g className="subsea-stations-layer">
                {STATIONS.map((station) => {
                  const isSelected = activeStation.id === station.id;
                  const isJkt = station.id === "jkt";

                  return (
                    <g
                      key={station.id}
                      transform={`translate(${station.x}, ${station.y})`}
                      className={`subsea-station-node ${isSelected ? "is-selected" : ""}`}
                      onClick={() => handleStationClick(station)}
                    >
                      {/* Ripple Radar Ring */}
                      <circle
                        r={isSelected ? "18" : isJkt ? "14" : "10"}
                        fill="none"
                        stroke={isJkt ? "#4FD1C5" : isSelected ? "#38BDF8" : "rgba(79,209,197,0.4)"}
                        strokeWidth="1.5"
                        className="subsea-radar-ring"
                      />

                      {/* Main Node Point */}
                      <circle
                        r={isJkt ? "7" : isSelected ? "6" : "4.5"}
                        fill={isJkt ? "#4FD1C5" : isSelected ? "#38BDF8" : "#12171C"}
                        stroke={isJkt ? "#FFFFFF" : "#4FD1C5"}
                        strokeWidth="2"
                        className="subsea-station-dot"
                      />

                      {/* Station Label & RTT Badge */}
                      <text
                        x="0"
                        y={station.y > 340 ? "22" : "-15"}
                        textAnchor="middle"
                        className="subsea-svg-label"
                      >
                        {station.code}
                      </text>
                      <text
                        x="0"
                        y={station.y > 340 ? "33" : "-26"}
                        textAnchor="middle"
                        className="subsea-svg-rtt"
                      >
                        {(station.baseRtt + jitter).toFixed(1)}ms
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          {/* Bottom Telemetry & Inspection Cockpit */}
          <div className="subsea-telemetry-cockpit">
            <div className="subsea-card-grid">
              {/* Selected Landing Station Card */}
              <div className="subsea-detail-card">
                <div className="subsea-card-top">
                  <span className="subsea-tag-pill">LANDING STATION</span>
                  <span className="subsea-status-online">● ONLINE</span>
                </div>
                <h3>{activeStation.name}</h3>
                <p className="subsea-station-desc">{activeStation.fullLabel}</p>
                <div className="subsea-metrics-row">
                  <div className="subsea-metric">
                    <span className="sm-label">LATENCY (RTT)</span>
                    <span className="sm-value highlight-cyan">
                      {(activeStation.baseRtt + jitter).toFixed(1)} ms
                    </span>
                  </div>
                  <div className="subsea-metric">
                    <span className="sm-label">EQUIPMENT</span>
                    <span className="sm-value">{activeStation.equipment.split("·")[0]}</span>
                  </div>
                  <div className="subsea-metric">
                    <span className="sm-label">CAPACITY</span>
                    <span className="sm-value">{activeStation.capacity}</span>
                  </div>
                </div>
              </div>

              {/* Selected Subsea Optical Cable Card */}
              <div className="subsea-detail-card">
                <div className="subsea-card-top">
                  <span className="subsea-tag-pill" style={{ color: "var(--copper)", borderColor: "var(--copper-dim)" }}>
                    OPTICAL CONDUIT
                  </span>
                  <span className="subsea-cable-len">{activeCable.length}</span>
                </div>
                <h3>{activeCable.name}</h3>
                <p className="subsea-station-desc">Operator: {activeCable.operator}</p>
                <div className="subsea-metrics-row">
                  <div className="subsea-metric">
                    <span className="sm-label">OPTICAL SNR</span>
                    <span className="sm-value highlight-amber">{activeCable.osnr}</span>
                  </div>
                  <div className="subsea-metric">
                    <span className="sm-label">SYSTEM DEPTH</span>
                    <span className="sm-value">{activeCable.depth.split("(")[0]}</span>
                  </div>
                  <div className="subsea-metric">
                    <span className="sm-label">DWDM SPEC</span>
                    <span className="sm-value">{activeCable.capacity}</span>
                  </div>
                </div>
              </div>

              {/* Live Laser Ping Console Trigger */}
              <div className="subsea-detail-card subsea-action-card">
                <div className="subsea-card-top">
                  <span className="subsea-tag-pill">OPTICAL DIAGNOSTIC</span>
                  <span className="subsea-proto">DWDM 100G</span>
                </div>
                <div className="subsea-ping-action">
                  <p className="subsea-ping-prompt">
                    {isId
                      ? `Kirim pulsa laser dari Jakarta Cyber 1 ke ${activeStation.name}`
                      : `Inject optical test photon from JKT Cyber 1 to ${activeStation.name}`}
                  </p>
                  <button
                    onClick={fireLaserPing}
                    disabled={isPinging}
                    className="btn btn-primary subsea-ping-btn"
                  >
                    {isPinging ? (isId ? "⚡ Mengukur..." : "⚡ Measuring...") : (isId ? "⚡ Kirim Laser Ping" : "⚡ Fire Laser Ping")}
                  </button>
                </div>

                {pingLog && (
                  <div className="subsea-ping-log">
                    {pingLog.map((log, idx) => (
                      <div key={idx} className="subsea-log-line">
                        {log}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
