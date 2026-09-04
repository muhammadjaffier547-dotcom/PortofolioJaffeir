"use client";

import { useState } from "react";

const NODES = [
  {
    id: "core",
    name: "RING FIBER METROLINK",
    icon: "◉",
    category: "Infrastruktur Backbone",
    status: "Normal & Terjaga",
    scope: "Jalur Utama Distribusi ISP & IPTV",
    tools: "Metro Ethernet / DWDM / Ring Fiber",
    desc: "Menjaga stabilitas transmisi data kapasitas tinggi agar koneksi internet pelanggan dan siaran IPTV tetap online tanpa interupsi.",
    feedback: "Jalur backbone beroperasi normal · Kapasitas trafik lancar tanpa hambatan.",
    x: 50,
    y: 46,
    isCore: true,
  },
  {
    id: "rtr",
    name: "ROUTING & GATEWAY",
    icon: "⌁",
    category: "Manajemen Jaringan",
    status: "Terkonfigurasi Stabil",
    scope: "Segmentasi VLAN, NAT, & Firewall",
    tools: "MikroTik RouterOS / Routing Dinamis / QoS",
    desc: "Mengatur rute lalu lintas data, menyaring keamanan akses jaringan, dan memisahkan segmen IP antar divisi maupun klien.",
    feedback: "Tabel routing sinkron · Aturan firewall aktif menjaga keamanan sistem.",
    x: 18,
    y: 22,
  },
  {
    id: "apjii",
    name: "INTERKONEKSI APJII",
    icon: "⌘",
    category: "Peering & Data Center",
    status: "Terhubung Langsung",
    scope: "IP Transit & Interkoneksi Peering",
    tools: "Data Center APJII / Cross Connect / Peering",
    desc: "Koordinasi setup perangkat dan interkoneksi langsung di Data Center APJII guna memastikan jalur akses berlatensi rendah.",
    feedback: "Koneksi ke pertukaran internet nasional stabil dengan latensi prima.",
    x: 82,
    y: 22,
  },
  {
    id: "fiber",
    name: "JARINGAN FIBER LAPANGAN",
    icon: "◇",
    category: "Pemeliharaan Jalur Fisik",
    status: "Kualitas Optik Baik",
    scope: "Splicing, ODF, & Jalur Kabel",
    tools: "OTDR / Power Meter (OPM) / Fusion Splicer",
    desc: "Troubleshooting kabel optik putus, pengukuran redaman dBm, dan penyambungan core fiber optic langsung di lokasi instalasi.",
    feedback: "Nilai redaman optik berada pada standar normal · Sambungan kokoh.",
    x: 16,
    y: 76,
  },
  {
    id: "iptv",
    name: "LAYANAN SIARAN IPTV",
    icon: "▣",
    category: "Distribusi TV Digital",
    status: "Siaran Aktif Lancar",
    scope: "Headend & Multicast Streaming",
    tools: "Multicast UDP / IGMP Snooping / TV Headend",
    desc: "Memastikan paket channel siaran televisi digital terdistribusi secara mulus ke seluruh perangkat pelanggan tanpa jeda.",
    feedback: "Distribusi stream televisi digital berjalan mulus tanpa kendala buffer.",
    x: 84,
    y: 76,
  },
  {
    id: "noc",
    name: "MONITORING NOC 24/7",
    icon: "⚡",
    category: "Pusat Kendali Operasi",
    status: "Pengawasan Real-Time",
    scope: "Deteksi Dini Insiden & Log Sistem",
    tools: "SolarWinds Orion / Cacti / MRTG / The Dude",
    desc: "Memantau grafik bandwidth, membaca anomali trafik jaringan, serta melakukan tindakan cepat sebelum terjadi gangguan meluas.",
    feedback: "Seluruh sensor telemetri hijau · Nol insiden kritis terdeteksi saat ini.",
    x: 50,
    y: 84,
  },
];

const LINKS = [
  { from: "core", to: "rtr" },
  { from: "core", to: "apjii" },
  { from: "core", to: "fiber" },
  { from: "core", to: "iptv" },
  { from: "core", to: "noc" },
  { from: "rtr", to: "fiber" },
  { from: "apjii", to: "iptv" },
];

export default function NetworkHUD() {
  const [activeNode, setActiveNode] = useState(NODES[0]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [logText, setLogText] = useState(NODES[0].feedback);

  const handleSelectNode = (node) => {
    setActiveNode(node);
    setIsVerifying(true);
    setLogText("Memeriksa status sambungan...");
    setTimeout(() => {
      setLogText(node.feedback);
      setIsVerifying(false);
    }, 380);
  };

  return (
    <div className="network-hud panel">
      {/* Telemetry Header */}
      <div className="hud-header">
        <div className="hud-header-left">
          <span className="hud-status-led" />
          <span className="hud-title">PETA OPERASIONAL INFRASTRUKTUR // NOC RADAR</span>
        </div>
        <div className="hud-header-right">
          <span className="hud-badge hud-badge-teal">
            STATUS: <strong>SISTEM NORMAL</strong>
          </span>
          <span className="hud-badge hud-badge-hide-sm">
            FOKUS: <strong>KEANDALAN TINGGI</strong>
          </span>
        </div>
      </div>

      {/* SVG Canvas Topology Graph */}
      <div className="hud-canvas-wrap">
        <svg className="hud-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Connection Lines */}
          {LINKS.map((link) => {
            const n1 = NODES.find((n) => n.id === link.from);
            const n2 = NODES.find((n) => n.id === link.to);
            const isHighlight =
              activeNode.id === link.from || activeNode.id === link.to;

            return (
              <line
                key={`${link.from}-${link.to}`}
                x1={n1.x}
                y1={n1.y}
                x2={n2.x}
                y2={n2.y}
                stroke={isHighlight ? "var(--teal)" : "rgba(79, 209, 197, 0.16)"}
                strokeWidth={isHighlight ? "0.75" : "0.35"}
                strokeDasharray="1.5 2"
                className={isHighlight ? "hud-line-active" : "hud-line-idle"}
              />
            );
          })}
        </svg>

        {/* Nodes positioned over the canvas */}
        {NODES.map((node) => {
          const isSelected = activeNode.id === node.id;
          return (
            <button
              key={node.id}
              className={`hud-node-btn ${isSelected ? "is-selected" : ""} ${
                node.isCore ? "is-core" : ""
              }`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onClick={() => handleSelectNode(node)}
              aria-label={`Pilih pilar ${node.name}`}
            >
              <span className="hud-node-ring">
                <span className="hud-node-glyph">{node.icon}</span>
              </span>
              <span className="hud-node-tag">{node.name}</span>
            </button>
          );
        })}
      </div>

      {/* Mobile/Quick Switcher Tabs (2026 accessible UX) */}
      <div className="hud-quick-tabs">
        {NODES.map((node) => (
          <button
            key={node.id}
            className={`hud-tab-btn ${activeNode.id === node.id ? "is-active" : ""}`}
            onClick={() => handleSelectNode(node)}
          >
            <span>{node.icon}</span> {node.name}
          </button>
        ))}
      </div>

      {/* Node Detail Drawer / Action Bar */}
      <div className="hud-footer">
        <div className="hud-detail-left">
          <div className="hud-detail-title-row">
            <span className="hud-detail-icon">{activeNode.icon}</span>
            <span className="hud-detail-name">{activeNode.name}</span>
            <span className="hud-detail-role">// {activeNode.category}</span>
          </div>
          <p className="hud-detail-desc">{activeNode.desc}</p>
          <div className="hud-detail-specs">
            <span><strong>CAKUPAN:</strong> {activeNode.scope}</span>
            <span><strong>PERANGKAT:</strong> {activeNode.tools}</span>
            <span><strong>KONDISI:</strong> <i className="hud-spec-highlight">{activeNode.status}</i></span>
          </div>
        </div>
        <div className="hud-detail-right">
          <button
            className={`btn btn-ghost hud-ping-btn ${isVerifying ? "is-active" : ""}`}
            onClick={() => handleSelectNode(activeNode)}
          >
            {isVerifying ? "MEMERIKSA..." : "⚡ CEK STATUS JALUR"}
          </button>
          <div className="hud-ping-log" aria-live="polite">
            <code>✔ {logText}</code>
          </div>
        </div>
      </div>
    </div>
  );
}
