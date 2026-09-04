"use client";

import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const TOPOLOGY_NODES = [
  {
    id: "upstream",
    name: "APJII OpenIXP / Telko Peering",
    roleId: "Upstream Internet Backbone & Peering",
    roleEn: "Upstream Internet Backbone & Peering",
    layer: "L3 / WAN Backbone",
    ip: "202.152.0.1 / AS-Number BGP",
    interface: "10G SFP+ MetroLink",
    status: "ONLINE · 0% LOSS",
    color: "#00ff9d",
    x: 160,
    y: 70,
    icon: "🌐",
    specsId: "Interkoneksi jalur transit internet dan peering OpenIXP di Data Center APJII Jakarta. Redundansi link Telkom & Indosat.",
    specsEn: "Transit IP interconnection and OpenIXP peering at APJII Data Center Jakarta. Multi-homed Telkom & Indosat redundancy.",
    protocols: ["BGP", "BGP Peering", "10G SFP+ LR", "OpenIXP"],
  },
  {
    id: "core",
    name: "MikroTik CCR2004 Core Router",
    roleId: "Core Routing & Gateway Utama",
    roleEn: "Core Routing & Main Gateway",
    layer: "L3 Network Layer",
    ip: "10.240.0.1 /24 (Gateway)",
    interface: "sfp-sfpplus1 to 4",
    status: "ACTIVE · 24/7 UPTIME",
    color: "var(--teal)",
    x: 450,
    y: 70,
    icon: "⚙️",
    specsId: "Pusat routing dinamis/statis, Firewall Filter, NAT Mangle, manajemen bandwidth QoS, dan tunnel WireGuard VPN.",
    specsEn: "Central dynamic/static routing, Firewall Filter, NAT Mangle, QoS bandwidth traffic queues, and WireGuard VPN tunnels.",
    protocols: ["OSPF", "BGP", "NAT / Mangle", "WireGuard", "Simple Queue"],
  },
  {
    id: "odf",
    name: "High-Density ODF UOB & Mangkuluhur",
    roleId: "Distribusi Kabel Fiber Optik",
    roleEn: "High-Density Fiber Distribution",
    layer: "L1 Physical Layer",
    ip: "Optical Patch Panel / Passive",
    interface: "SM SC/UPC - LC Duplex",
    status: "NORMAL LOSS · -18.4 dBm",
    color: "var(--copper)",
    x: 740,
    y: 70,
    icon: "⚡",
    specsId: "Terminasi kabel fiber optik Single-Mode di Gedung UOB Plaza dan Hotel Mangkuluhur. Diuji menggunakan Yokogawa AQ1000 & Fusion Splicer.",
    specsEn: "Single-Mode fiber termination at UOB Plaza and Hotel Mangkuluhur Jakarta. Tested via Yokogawa AQ1000 & Fusion Splicing.",
    protocols: ["Single-Mode 1310/1550nm", "Fusion Splicing", "OTDR Testing", "LC/SC Patchcord"],
  },
  {
    id: "switch",
    name: "Cisco Catalyst Distribution Switch",
    roleId: "Enterprise Switching & Trunking",
    roleEn: "Enterprise Switching & Trunking",
    layer: "L2 Data Link Layer",
    ip: "10.240.0.10 (Management)",
    interface: "Gi1/0/1 - Gi1/0/24 (Trunk)",
    status: "LINK 1Gbps FULL DUPLEX",
    color: "#60a5fa",
    x: 300,
    y: 270,
    icon: "🔀",
    specsId: "Pemisahan traffic antar departemen melalui 802.1Q VLAN Trunking, Spanning Tree Protocol (RSTP), dan LACP EtherChannel di rack server hotel.",
    specsEn: "Departmental traffic isolation via 802.1Q VLAN Trunking, Rapid Spanning Tree (RSTP), and LACP EtherChannel at hotel rack.",
    protocols: ["802.1Q VLAN", "RSTP", "LACP", "Port Security"],
  },
  {
    id: "vlan204",
    name: "VLAN 204 Sunvone Corporate",
    roleId: "Subnet Klien & Monitoring NOC",
    roleEn: "Corporate Subnet & NOC Telemetry",
    layer: "L3 / L2 Segment",
    ip: "10.240.0.0/24 (VLAN ID 204)",
    interface: "vlan204-sunvone",
    status: "10.2 Mbps RATE · 0 DROPS",
    color: "var(--teal)",
    x: 600,
    y: 270,
    icon: "📊",
    specsId: "Jalur data korporat terpantau aktif di MikroTik Winbox. Akumulasi transfer 1097 GiB dengan rasio zero packet drop.",
    specsEn: "Corporate data lane actively monitored on MikroTik Winbox. Total transfer 1097 GiB with zero packet drop ratio.",
    protocols: ["VLAN 204", "MRTG", "Cacti", "SNMP v2c", "SolarWinds"],
  },
  {
    id: "iptv",
    name: "IPTV Headend & Server Cluster",
    roleId: "Layanan Multicast TV & Web Host",
    roleEn: "Multicast IPTV Headend & Web Host",
    layer: "L7 Application & Multicast",
    ip: "239.255.0.0/16 (Multicast Pool)",
    interface: "eth0 / igmp-proxy",
    status: "STREAMING · PIM-SM OK",
    color: "#f59e0b",
    x: 450,
    y: 430,
    icon: "📺",
    specsId: "Headend streaming siaran TV digital berbasis multicast IP dan Linux Server (Apache/Nginx) untuk hosting website perusahaan.",
    specsEn: "Digital TV streaming headend powered by IP multicast and Linux Server (Apache/Nginx) for corporate web platforms.",
    protocols: ["IGMP Snooping", "PIM-SM", "Linux Apache", "DNS / SSL", "cPanel"],
  },
];

const LINKS = [
  { from: "upstream", to: "core", label: "10G MetroLink Uplink" },
  { from: "core", to: "odf", label: "Fiber Backbone SFP" },
  { from: "core", to: "switch", label: "802.1Q Trunk (VLANs)" },
  { from: "odf", to: "switch", label: "ODF Patchcord Cross-connect" },
  { from: "switch", to: "vlan204", label: "Access Port Client Subnet" },
  { from: "core", to: "vlan204", label: "Router-on-a-Stick / SVI" },
  { from: "core", to: "iptv", label: "Multicast PIM-SM Stream" },
  { from: "switch", to: "iptv", label: "IPTV Headend LAN Port" },
];

export default function TopologyMap() {
  const [selectedNode, setSelectedNode] = useState(TOPOLOGY_NODES[1]); // Default MikroTik CCR
  const { lang, t } = useLanguage();
  const isId = lang === "id";

  return (
    <section id="topologi" className="topology-section">
      <div className="wrap">
        <p className="eyebrow">{t("topo_eyebrow")}</p>
        <div className="topology-heading">
          <div>
            <h2 className="sectitle">{t("topo_title")}</h2>
            <p className="section-note">{t("topo_note")}</p>
          </div>
          <div className="topology-hint-badge">
            <span className="pulse-circle" />
            <span>{t("topo_click_hint")}</span>
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

              {/* Connecting Fiber / LAN Lines */}
              {LINKS.map((link, idx) => {
                const nodeA = TOPOLOGY_NODES.find((n) => n.id === link.from);
                const nodeB = TOPOLOGY_NODES.find((n) => n.id === link.to);
                if (!nodeA || !nodeB) return null;

                const isLinkActive =
                  selectedNode?.id === link.from || selectedNode?.id === link.to;

                return (
                  <g key={idx} className="topology-link-group">
                    {/* Base Line */}
                    <line
                      x1={nodeA.x}
                      y1={nodeA.y}
                      x2={nodeB.x}
                      y2={nodeB.y}
                      className={`topo-line ${isLinkActive ? "is-active-link" : ""}`}
                    />
                    {/* Animated Pulsing Packet Circle */}
                    <circle r="3" className="topo-packet" fill="var(--teal)" filter="url(#glow)">
                      <animateMotion
                        path={`M ${nodeA.x} ${nodeA.y} L ${nodeB.x} ${nodeB.y}`}
                        dur={`${2.2 + (idx % 3) * 0.6}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                );
              })}

              {/* Node Circles */}
              {TOPOLOGY_NODES.map((node) => {
                const isSelected = selectedNode?.id === node.id;
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
                    {/* Outer Glow Halo when selected */}
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

                    {/* Node Background */}
                    <circle
                      r="26"
                      className="topo-node-bg"
                      stroke={isSelected ? "var(--teal)" : "rgba(255,255,255,0.18)"}
                      strokeWidth={isSelected ? "2.5" : "1.5"}
                    />

                    {/* Node Icon */}
                    <text
                      textAnchor="middle"
                      dy="7"
                      fontSize="17"
                      className="topo-node-icon"
                    >
                      {node.icon}
                    </text>

                    {/* Node Label Text */}
                    <text
                      textAnchor="middle"
                      dy="42"
                      className="topo-node-name"
                    >
                      {node.name.length > 22 ? node.name.slice(0, 20) + "…" : node.name}
                    </text>
                    <text
                      textAnchor="middle"
                      dy="54"
                      className="topo-node-layer"
                    >
                      {node.layer}
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
                    <span className="inspector-layer-tag">{selectedNode.layer}</span>
                    <h3 className="inspector-name">{selectedNode.name}</h3>
                    <p className="inspector-role">{isId ? selectedNode.roleId : selectedNode.roleEn}</p>
                  </div>
                </div>
                <div className="inspector-status-badge">
                  <span className="live-dot" />
                  <span>{selectedNode.status}</span>
                </div>
              </div>

              <div className="inspector-grid">
                <div className="inspector-field">
                  <span className="field-lbl">IP ADDRESS / POOL:</span>
                  <code className="field-val text-teal">{selectedNode.ip}</code>
                </div>
                <div className="inspector-field">
                  <span className="field-lbl">INTERFACE &amp; MEDIA:</span>
                  <code className="field-val">{selectedNode.interface}</code>
                </div>
              </div>

              <p className="inspector-desc">
                {isId ? selectedNode.specsId : selectedNode.specsEn}
              </p>

              <div className="inspector-protocols">
                <span className="proto-title">ACTIVE PROTOCOLS &amp; CONFIG:</span>
                <div className="proto-tags">
                  {selectedNode.protocols.map((proto) => (
                    <span key={proto} className="tag">
                      {proto}
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
