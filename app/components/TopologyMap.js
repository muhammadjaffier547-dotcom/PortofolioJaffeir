"use client";

import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const TOPOLOGY_NODES = [
  {
    id: "upstream",
    name: "Pusat Internet Data Center APJII",
    nameEn: "APJII Data Center Internet Gateway",
    roleId: "Jalur Utama Internet & Peering",
    roleEn: "Main Internet Peering & Backbone",
    subId: "Interkoneksi Backbone",
    subEn: "Backbone Interconnection",
    status: "NORMAL · 0% LOSS",
    color: "#00ff9d",
    x: 160,
    y: 70,
    icon: "🌐",
    specsId: "Jalur transit internet utama di Gedung Data Center APJII Jakarta. Menghubungkan jaringan lokal dengan jalur penyedia internet Telkom dan Indosat.",
    specsEn: "Primary transit internet interconnection at APJII Data Center Jakarta, establishing upstream redundancy via Telkom and Indosat feeds.",
    featuresId: ["Pusat Data APJII", "Jalur Redundansi", "Interkoneksi Fiber 10G"],
    featuresEn: ["APJII Data Center", "Carrier Redundancy", "10G Fiber Interconnect"],
  },
  {
    id: "core",
    name: "Router Utama (MikroTik)",
    nameEn: "Core Router (MikroTik)",
    roleId: "Pengatur Lalu Lintas Data & Firewall",
    roleEn: "Traffic Controller & Network Firewall",
    subId: "Pusat Kendali Jaringan",
    subEn: "Network Control Hub",
    status: "AKTIF · 24/7 ONLINE",
    color: "var(--teal)",
    x: 450,
    y: 70,
    icon: "⚙️",
    specsId: "Mengatur pembagian koneksi internet, batas kecepatan bandwidth, keamanan firewall agar tidak bisa diretas, dan jalur VPN antar kantor.",
    specsEn: "Handles core traffic distribution, bandwidth queueing, stateful firewall protection, and secure VPN connections between remote sites.",
    featuresId: ["Firewall & Keamanan", "Bagi Bandwidth Klien", "Koneksi VPN Aman"],
    featuresEn: ["Firewall Security", "Bandwidth Management", "Secure VPN Tunneling"],
  },
  {
    id: "odf",
    name: "Rak Kabel Fiber ODF (UOB & Mangkuluhur)",
    nameEn: "High-Density Fiber ODF (UOB & Mangkuluhur)",
    roleId: "Pusat Terminasi Kabel Kaca",
    roleEn: "Optical Cable Termination & Grooming",
    subId: "Jalur Fisik Kabel Optik",
    subEn: "Physical Fiber Infrastructure",
    status: "REDAMAN NORMAL",
    color: "var(--copper)",
    x: 740,
    y: 70,
    icon: "⚡",
    specsId: "Panel khusus tempat menghubungkan kabel serat optik antar lantai dan antar gedung. Dipasang dan diuji langsung dengan fusion splicer dan alat ukur OTDR.",
    specsEn: "High-density distribution frame terminating fiber optic lines across floors and buildings. Validated with fusion splicing and OTDR testing.",
    featuresId: ["Kabel Fiber Kaca", "Penyambungan Splicer", "Uji Redaman OTDR"],
    featuresEn: ["Glass Core Fiber", "Fusion Splicing", "OTDR Quality Check"],
  },
  {
    id: "switch",
    name: "Switch Distribusi Kantor",
    nameEn: "Corporate Distribution Switch",
    roleId: "Penyalur Koneksi ke Perangkat",
    roleEn: "Floor & Device Distribution Switch",
    subId: "Penyalur Kabel LAN & Fiber",
    subEn: "LAN & Fiber Distribution",
    status: "LINK 1Gbps STABIL",
    color: "#60a5fa",
    x: 300,
    y: 270,
    icon: "🔀",
    specsId: "Membagi koneksi internet dari router ke masing-masing ruangan kantor, kamar hotel, dan server melalui kabel LAN serta kabel fiber.",
    specsEn: "Distributes bandwidth from the core router to office departments, hotel rooms, and local servers over gigabit LAN and optical links.",
    featuresId: ["Pemisahan Jalur Kantor", "Kecepatan 1Gbps", "Pencegah Loop Jaringan"],
    featuresEn: ["Department Isolation", "1Gbps Line Rate", "Loop Prevention"],
  },
  {
    id: "vlan204",
    name: "Jalur Klien & Monitoring (VLAN 204)",
    nameEn: "Client Traffic & Telemetry (VLAN 204)",
    roleId: "Trafik Klien yang Dipantau di Winbox",
    roleEn: "Client Traffic Monitored via Winbox",
    subId: "Jalur Terpantau Aktif",
    subEn: "Active Telemetry Stream",
    status: "10.2 Mbps · 0% DROP",
    color: "var(--teal)",
    x: 600,
    y: 270,
    icon: "📊",
    specsId: "Jalur trafik nyata yang dipantau setiap hari melalui layar Winbox. Menyalurkan data pelanggan korporat dengan rekam jejak koneksi stabil tanpa putus.",
    specsEn: "Real production client traffic lane monitored daily via MikroTik Winbox. Delivers corporate client data with zero packet loss.",
    featuresId: ["Pantauan Grafik Winbox", "Nol Paket Putus (0 Drops)", "Koneksi Terjaga 24/7"],
    featuresEn: ["Winbox Live Graphs", "Zero Packet Drops", "24/7 Monitored Link"],
  },
  {
    id: "iptv",
    name: "Server Layanan IPTV & Website",
    nameEn: "IPTV Streaming & Web Server Cluster",
    roleId: "Siaran TV Digital & Server Linux",
    roleEn: "Digital TV Streaming & Linux Server",
    subId: "Pusat Layanan Klien",
    subEn: "Services & Application Host",
    status: "SIARAN ONLINE",
    color: "#f59e0b",
    x: 450,
    y: 430,
    icon: "📺",
    specsId: "Komputer server Linux yang bertugas memancarkan siaran TV digital beresolusi tinggi ke layar pelanggan serta menjalankan website perusahaan.",
    specsEn: "Linux server environment streaming digital broadcast channels to subscribers while hosting corporate web platforms.",
    featuresId: ["Siaran TV Digital", "Server Web Linux", "Pemeliharaan Rutin"],
    featuresEn: ["Digital TV Broadcast", "Linux Web Server", "Routine Maintenance"],
  },
];

const LINKS = [
  { from: "upstream", to: "core" },
  { from: "core", to: "odf" },
  { from: "core", to: "switch" },
  { from: "odf", to: "switch" },
  { from: "switch", to: "vlan204" },
  { from: "core", to: "vlan204" },
  { from: "core", to: "iptv" },
  { from: "switch", to: "iptv" },
];

export default function TopologyMap() {
  const [selectedNode, setSelectedNode] = useState(TOPOLOGY_NODES[1]); // Default Router Utama
  const { lang, t } = useLanguage();
  const isId = lang === "id";

  return (
    <section id="topologi" className="topology-section">
      <div className="wrap">
        <p className="eyebrow">{t("topo_eyebrow")}</p>
        <div className="topology-heading">
          <div>
            <h2 className="sectitle">
              {isId ? "Alur & Arsitektur Jaringan Nyata" : "Production Network Architecture"}
            </h2>
            <p className="section-note">
              {isId
                ? "Gambaran sederhana bagaimana alur internet dari Pusat Data APJII disalurkan lewat kabel fiber optik, router MikroTik, dan switch hingga dinikmati oleh klien."
                : "A visual overview showing how data flows from the APJII Data Center through fiber cables, MikroTik routing, and distribution switches to corporate clients."}
            </p>
          </div>
          <div className="topology-hint-badge">
            <span className="pulse-circle" />
            <span>
              {isId
                ? "Klik salah satu ikon perangkat untuk melihat fungsi kerjanya"
                : "Click any device icon to view its operational role"}
            </span>
          </div>
        </div>

        {/* Interactive Diagram Container */}
        <div className="topology-card panel">
          <div className="topology-canvas-wrap">
            <svg
              className="topology-svg"
              viewBox="0 0 900 520"
              preserveAspectRatio="xMidYMid meet"
              aria-label="Diagram Topologi Jaringan Interaktif"
            >
              <defs>
                <linearGradient id="linkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(79,209,197,0.7)" />
                  <stop offset="100%" stopColor="rgba(201,124,75,0.7)" />
                </linearGradient>

                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Connecting Lines */}
              {LINKS.map((link, idx) => {
                const nodeA = TOPOLOGY_NODES.find((n) => n.id === link.from);
                const nodeB = TOPOLOGY_NODES.find((n) => n.id === link.to);
                if (!nodeA || !nodeB) return null;

                const isLinkActive =
                  selectedNode?.id === link.from || selectedNode?.id === link.to;

                return (
                  <g key={idx} className="topology-link-group">
                    <line
                      x1={nodeA.x}
                      y1={nodeA.y}
                      x2={nodeB.x}
                      y2={nodeB.y}
                      className={`topo-line ${isLinkActive ? "is-active-link" : ""}`}
                    />
                    <circle r="3.2" className="topo-packet" fill="var(--teal)" filter="url(#glow)">
                      <animateMotion
                        path={`M ${nodeA.x} ${nodeA.y} L ${nodeB.x} ${nodeB.y}`}
                        dur={`${2.2 + (idx % 3) * 0.6}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                );
              })}

              {/* Device Nodes */}
              {TOPOLOGY_NODES.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                const nodeName = isId ? node.name : node.nameEn;
                const nodeSub = isId ? node.subId : node.subEn;

                return (
                  <g
                    key={node.id}
                    className={`topo-node ${isSelected ? "is-selected" : ""}`}
                    transform={`translate(${node.x}, ${node.y})`}
                    onClick={() => setSelectedNode(node)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setSelectedNode(node)}
                  >
                    {isSelected && (
                      <circle
                        r="36"
                        fill="none"
                        stroke={node.color}
                        strokeWidth="2"
                        strokeDasharray="4,4"
                        className="topo-halo"
                      />
                    )}

                    <circle
                      r="26"
                      className="topo-node-bg"
                      stroke={isSelected ? "var(--teal)" : "rgba(255,255,255,0.18)"}
                      strokeWidth={isSelected ? "2.5" : "1.5"}
                    />

                    <text
                      textAnchor="middle"
                      dy="7"
                      fontSize="17"
                      className="topo-node-icon"
                    >
                      {node.icon}
                    </text>

                    <text
                      textAnchor="middle"
                      dy="42"
                      className="topo-node-name"
                    >
                      {nodeName.length > 25 ? nodeName.slice(0, 23) + "…" : nodeName}
                    </text>
                    <text
                      textAnchor="middle"
                      dy="54"
                      className="topo-node-layer"
                    >
                      {nodeSub}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Node Inspector Panel */}
          {selectedNode && (
            <div className="topology-inspector">
              <div className="inspector-head">
                <div className="inspector-title-wrap">
                  <span className="inspector-icon">{selectedNode.icon}</span>
                  <div>
                    <span className="inspector-layer-tag">
                      {isId ? selectedNode.subId : selectedNode.subEn}
                    </span>
                    <h3 className="inspector-name">
                      {isId ? selectedNode.name : selectedNode.nameEn}
                    </h3>
                    <p className="inspector-role">
                      {isId ? selectedNode.roleId : selectedNode.roleEn}
                    </p>
                  </div>
                </div>
                <div className="inspector-status-badge">
                  <span className="live-dot" />
                  <span>{selectedNode.status}</span>
                </div>
              </div>

              <p className="inspector-desc">
                {isId ? selectedNode.specsId : selectedNode.specsEn}
              </p>

              <div className="inspector-protocols">
                <span className="proto-title">
                  {isId ? "TUGAS & PENANGANAN DI LAPANGAN:" : "KEY RESPONSIBILITIES & FIELD TASKS:"}
                </span>
                <div className="proto-tags">
                  {(isId ? selectedNode.featuresId : selectedNode.featuresEn).map((item) => (
                    <span key={item} className="tag">
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
