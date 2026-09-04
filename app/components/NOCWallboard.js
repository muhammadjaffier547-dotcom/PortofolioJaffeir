"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function NOCWallboard() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang } = useLanguage();
  const isId = lang === "id";
  const canvasRef = useRef(null);

  // Live telemetry state
  const [rxRate, setRxRate] = useState(842);
  const [txRate, setTxRate] = useState(318);
  const [cpuLoad, setCpuLoad] = useState(12);
  const [logs, setLogs] = useState([
    { id: 1, time: "11:14:02", tag: "BGP", msg: "Peer AS23700 (APJII OpenIXP) session ESTABLISHED, 94,210 prefixes synced.", status: "ok" },
    { id: 2, time: "11:14:15", tag: "SFP+", msg: "10G SFP+ MetroLink UOB: RX -18.2 dBm, TX -2.1 dBm. Optical link optimal.", status: "ok" },
    { id: 3, time: "11:14:28", tag: "IPTV", msg: "Multicast IGMP group 239.255.1.1 stream bitrate 8.4 Mbps, 0 drops.", status: "ok" },
    { id: 4, time: "11:14:41", tag: "SWITCH", msg: "Distribution Switch RSTP topology stable. Root Bridge: 00:0C:42:XX:XX:01.", status: "ok" },
    { id: 5, time: "11:14:55", tag: "NMS", msg: "SolarWinds Orion telemetry poll completed: 6/6 core nodes responding <10ms.", status: "ok" },
  ]);

  // Handle open event
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };

    window.addEventListener("open-noc-wallboard", handleOpen);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("open-noc-wallboard", handleOpen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Traffic waveform canvas animation
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationId;
    let step = 0;
    const historyRx = new Array(60).fill(60);
    const historyTx = new Array(60).fill(30);

    const render = () => {
      step++;
      const width = canvas.width;
      const height = canvas.height;

      // Update simulated data
      if (step % 5 === 0) {
        const nextRx = 65 + Math.sin(step * 0.05) * 25 + (Math.random() - 0.5) * 12;
        const nextTx = 35 + Math.cos(step * 0.04) * 15 + (Math.random() - 0.5) * 8;
        historyRx.shift();
        historyRx.push(nextRx);
        historyTx.shift();
        historyTx.push(nextTx);

        setRxRate(Math.floor(nextRx * 10 + 200));
        setTxRate(Math.floor(nextTx * 10 + 100));
        setCpuLoad(Math.floor(10 + Math.random() * 5));
      }

      ctx.clearRect(0, 0, width, height);

      // Draw horizontal grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
      ctx.lineWidth = 1;
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const dx = width / (historyRx.length - 1);

      // Draw Rx Curve (Teal)
      ctx.beginPath();
      ctx.strokeStyle = "#4fd1c5";
      ctx.lineWidth = 2.5;
      ctx.shadowColor = "#4fd1c5";
      ctx.shadowBlur = 8;
      historyRx.forEach((val, i) => {
        const x = i * dx;
        const y = height - (val / 110) * height;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Draw Tx Curve (Copper)
      ctx.beginPath();
      ctx.strokeStyle = "#c97c4b";
      ctx.lineWidth = 2;
      ctx.shadowColor = "#c97c4b";
      ctx.shadowBlur = 6;
      historyTx.forEach((val, i) => {
        const x = i * dx;
        const y = height - (val / 110) * height;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationId);
  }, [isOpen]);

  // Periodic syslog updates
  useEffect(() => {
    if (!isOpen) return;

    const samplePool = [
      { tag: "BGP", msg: "APJII OpenIXP keepalive received. BGP neighbor 217.15.2.254 hold time 90s.", status: "ok" },
      { tag: "FIREWALL", msg: "MikroTik filter: 14 unauthorized port scans dropped at WAN interface.", status: "warn" },
      { tag: "ODF", msg: "Mangkuluhur ODF core 4 optical power stable: -18.2 dBm.", status: "ok" },
      { tag: "VLAN-204", msg: "DHCP Snooping: Lease renewed for host 10.240.0.108 (SLA valid).", status: "ok" },
      { tag: "IPTV", msg: "HLS Headend transcode latency 1.1s, healthy bandwidth buffer.", status: "ok" },
    ];

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
      const pick = samplePool[Math.floor(Math.random() * samplePool.length)];

      setLogs((prev) => [
        { id: Date.now(), time: timeStr, tag: pick.tag, msg: pick.msg, status: pick.status },
        ...prev.slice(0, 7),
      ]);
    }, 4000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="wallboard-overlay">
      <div className="wallboard-container">
        {/* Wallboard Top Bar */}
        <header className="wallboard-header">
          <div className="wb-head-left">
            <span className="wb-live-pulse" />
            <div>
              <span className="wb-kicker">SUNVONE SOLUSINDO · NETWORK OPERATIONS CENTER</span>
              <h2 className="wb-title">REAL-TIME NOC MONITORING WALLBOARD</h2>
            </div>
          </div>

          <div className="wb-head-center">
            <span className="wb-status-pill">
              <span className="dot-green" /> 0 ALERTS · SEMUA LINK NORMAL
            </span>
          </div>

          <div className="wb-head-right">
            <button
              type="button"
              className="wb-close-btn"
              onClick={() => setIsOpen(false)}
              title="Keluar dari Wallboard (ESC)"
            >
              ✕ {isId ? "TUTUP (ESC)" : "EXIT (ESC)"}
            </button>
          </div>
        </header>

        {/* 4 Quadrants Dashboard Grid */}
        <div className="wallboard-grid">
          {/* Quadrant 1: Live Bandwidth Throughput Waveform */}
          <div className="wb-card">
            <div className="wb-card-head">
              <div className="wb-card-title">
                <span className="wb-icon">📊</span>
                <strong>LIVE AGGREGATE TRAFFIC THROUGHPUT</strong>
              </div>
              <div className="wb-traffic-legend">
                <span className="leg-rx">● RX: {rxRate} Mbps</span>
                <span className="leg-tx">● TX: {txRate} Mbps</span>
              </div>
            </div>

            <div className="wb-canvas-wrap">
              <canvas ref={canvasRef} width={560} height={190} className="wb-canvas" />
            </div>

            <div className="wb-metrics-row">
              <div className="wb-metric-box">
                <span>PEAK RATE (24H)</span>
                <strong>1.24 Gbps</strong>
              </div>
              <div className="wb-metric-box">
                <span>PACKETS / SEC</span>
                <strong className="text-teal">94,280 pps</strong>
              </div>
              <div className="wb-metric-box">
                <span>PACKET DROPS</span>
                <strong className="text-green">0.00% (PERFECT)</strong>
              </div>
            </div>
          </div>

          {/* Quadrant 2: Infrastructure 6-Node Health Matrix */}
          <div className="wb-card">
            <div className="wb-card-head">
              <div className="wb-card-title">
                <span className="wb-icon">🌐</span>
                <strong>INFRASTRUCTURE LINK &amp; NODE MATRIX</strong>
              </div>
              <span className="wb-tag-all-up">6/6 ONLINE</span>
            </div>

            <div className="wb-nodes-list">
              <div className="wb-node-row">
                <div className="wb-node-info">
                  <span className="wb-node-dot" />
                  <strong>Data Center APJII Cyber (Jakarta)</strong>
                </div>
                <span className="wb-node-val text-teal">8.4ms · BGP UP</span>
              </div>

              <div className="wb-node-row">
                <div className="wb-node-info">
                  <span className="wb-node-dot" />
                  <strong>Core Router MikroTik CCR2004</strong>
                </div>
                <span className="wb-node-val text-teal">1.8ms · CPU {cpuLoad}%</span>
              </div>

              <div className="wb-node-row">
                <div className="wb-node-info">
                  <span className="wb-node-dot" />
                  <strong>ODF Fiber UOB Plaza (10G SFP+)</strong>
                </div>
                <span className="wb-node-val text-copper">-18.2 dBm · LINK OK</span>
              </div>

              <div className="wb-node-row">
                <div className="wb-node-info">
                  <span className="wb-node-dot" />
                  <strong>ODF Fiber Hotel Mangkuluhur</strong>
                </div>
                <span className="wb-node-val text-copper">-18.4 dBm · LINK OK</span>
              </div>

              <div className="wb-node-row">
                <div className="wb-node-info">
                  <span className="wb-node-dot" />
                  <strong>Switch Distribusi &amp; VLAN 204 Sunvone</strong>
                </div>
                <span className="wb-node-val text-teal">0.9ms · 0 DROPS</span>
              </div>

              <div className="wb-node-row">
                <div className="wb-node-info">
                  <span className="wb-node-dot" />
                  <strong>Server Layanan IPTV &amp; Web Nginx</strong>
                </div>
                <span className="wb-node-val text-teal">HTTP 200 · STREAM OK</span>
              </div>
            </div>
          </div>

          {/* Quadrant 3: Live NOC Syslog Stream */}
          <div className="wb-card wb-card-log">
            <div className="wb-card-head">
              <div className="wb-card-title">
                <span className="wb-icon">📟</span>
                <strong>LIVE NOC EVENT &amp; SYSLOG AUDIT STREAM</strong>
              </div>
              <span className="wb-tag-stream">REAL-TIME</span>
            </div>

            <div className="wb-log-stream">
              {logs.map((log) => (
                <div key={log.id} className={`wb-log-entry ${log.status}`}>
                  <span className="log-time">[{log.time}]</span>
                  <span className="log-tag">[{log.tag}]</span>
                  <span className="log-msg">{log.msg}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quadrant 4: System Telemetry Gauges */}
          <div className="wb-card">
            <div className="wb-card-head">
              <div className="wb-card-title">
                <span className="wb-icon">⚡</span>
                <strong>SYSTEM HEALTH &amp; HARDWARE TELEMETRY</strong>
              </div>
              <span className="wb-tag-up">UPTIME: 99.8% SLA</span>
            </div>

            <div className="wb-gauges-grid">
              <div className="wb-gauge-item">
                <span className="gauge-lbl">ROUTER CPU LOAD</span>
                <strong className="gauge-val text-teal">{cpuLoad}%</strong>
                <div className="gauge-bar-track">
                  <div className="gauge-bar-fill" style={{ width: `${cpuLoad * 2}%` }} />
                </div>
              </div>

              <div className="wb-gauge-item">
                <span className="gauge-lbl">RAM USAGE</span>
                <strong className="gauge-val text-teal">24%</strong>
                <div className="gauge-bar-track">
                  <div className="gauge-bar-fill" style={{ width: "24%" }} />
                </div>
              </div>

              <div className="wb-gauge-item">
                <span className="gauge-lbl">TEMP HARDWARE</span>
                <strong className="gauge-val text-copper">38°C</strong>
                <div className="gauge-bar-track">
                  <div className="gauge-bar-fill fill-copper" style={{ width: "38%" }} />
                </div>
              </div>

              <div className="wb-gauge-item">
                <span className="gauge-lbl">ACTIVE SESSIONS</span>
                <strong className="gauge-val text-teal">482 Conns</strong>
                <div className="gauge-bar-track">
                  <div className="gauge-bar-fill" style={{ width: "48%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

