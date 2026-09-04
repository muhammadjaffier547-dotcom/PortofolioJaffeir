"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const PRESET_TARGETS = [
  {
    id: "apjii",
    name: "APJII Cyber DC (Jakarta)",
    host: "openixp.apjii.or.id",
    ip: "217.15.2.1",
    as: "AS23700 APJII-IX",
    location: "Cyber Building 1, Jakarta",
    baseRtt: 8.4,
    hops: [
      { num: 1, name: "gw-noc.sunvone.net", ip: "192.168.1.1", rtt: 0.5, as: "RFC1918 (LAN Gateway)", loss: "0%", status: "OK" },
      { num: 2, name: "sw-dist-vl204.sunvone.net", ip: "10.240.0.1", rtt: 1.2, as: "VLAN 204 Distribution", loss: "0%", status: "OK" },
      { num: 3, name: "core-ccr2004.sunvone.id", ip: "172.16.10.1", rtt: 2.8, as: "MikroTik CCR2004", loss: "0%", status: "OK" },
      { num: 4, name: "odf-metrolink-uob.sunvone.id", ip: "103.147.20.1", rtt: 5.1, as: "10G SFP+ Dark Fiber UOB", loss: "0%", status: "OK" },
      { num: 5, name: "ixp-cyber1.apjii.or.id", ip: "217.15.2.1", rtt: 8.4, as: "AS23700 APJII OpenIXP", loss: "0%", status: "DESTINATION" },
    ],
  },
  {
    id: "google",
    name: "Google Public DNS",
    host: "dns.google",
    ip: "8.8.8.8",
    as: "AS15169 GOOGLE",
    location: "Jakarta Edge Pop (Anycast)",
    baseRtt: 12.2,
    hops: [
      { num: 1, name: "gw-noc.sunvone.net", ip: "192.168.1.1", rtt: 0.6, as: "RFC1918 (LAN Gateway)", loss: "0%", status: "OK" },
      { num: 2, name: "sw-dist-vl204.sunvone.net", ip: "10.240.0.1", rtt: 1.4, as: "VLAN 204 Distribution", loss: "0%", status: "OK" },
      { num: 3, name: "core-ccr2004.sunvone.id", ip: "172.16.10.1", rtt: 2.9, as: "MikroTik CCR2004", loss: "0%", status: "OK" },
      { num: 4, name: "odf-metrolink-mangkuluhur.sunvone.id", ip: "103.147.20.1", rtt: 5.3, as: "10G SFP+ Mangkuluhur", loss: "0%", status: "OK" },
      { num: 5, name: "jkt-ix-peer.apjii.or.id", ip: "217.15.2.254", rtt: 8.7, as: "AS23700 APJII BGP Peering", loss: "0%", status: "OK" },
      { num: 6, name: "google-jkt.google.com", ip: "142.250.160.10", rtt: 10.5, as: "AS15169 Google Edge", loss: "0%", status: "OK" },
      { num: 7, name: "dns.google", ip: "8.8.8.8", rtt: 12.2, as: "AS15169 GOOGLE Anycast", loss: "0%", status: "DESTINATION" },
    ],
  },
  {
    id: "cloudflare",
    name: "Cloudflare Anycast",
    host: "one.one.one.one",
    ip: "1.1.1.1",
    as: "AS13335 CLOUDFLARENET",
    location: "Jakarta (CGK Equinix Pop)",
    baseRtt: 10.8,
    hops: [
      { num: 1, name: "gw-noc.sunvone.net", ip: "192.168.1.1", rtt: 0.5, as: "RFC1918 (LAN Gateway)", loss: "0%", status: "OK" },
      { num: 2, name: "sw-dist-vl204.sunvone.net", ip: "10.240.0.1", rtt: 1.3, as: "VLAN 204 Distribution", loss: "0%", status: "OK" },
      { num: 3, name: "core-ccr2004.sunvone.id", ip: "172.16.10.1", rtt: 2.7, as: "MikroTik CCR2004", loss: "0%", status: "OK" },
      { num: 4, name: "odf-metrolink-uob.sunvone.id", ip: "103.147.20.1", rtt: 5.0, as: "10G SFP+ Dark Fiber UOB", loss: "0%", status: "OK" },
      { num: 5, name: "ixp-peering-c1.apjii.or.id", ip: "217.15.2.12", rtt: 8.1, as: "AS23700 OpenIXP Peering", loss: "0%", status: "OK" },
      { num: 6, name: "one.one.one.one", ip: "1.1.1.1", rtt: 10.8, as: "AS13335 CLOUDFLARENET", loss: "0%", status: "DESTINATION" },
    ],
  },
  {
    id: "singtel",
    name: "SingTel Equinix IX (Singapore)",
    host: "sg-ix.singtel.com",
    ip: "202.79.197.1",
    as: "AS4657 SINGTEL",
    location: "Equinix SG1, Ayer Rajah, Singapore",
    baseRtt: 24.5,
    hops: [
      { num: 1, name: "gw-noc.sunvone.net", ip: "192.168.1.1", rtt: 0.5, as: "RFC1918 (LAN Gateway)", loss: "0%", status: "OK" },
      { num: 2, name: "sw-dist-vl204.sunvone.net", ip: "10.240.0.1", rtt: 1.2, as: "VLAN 204 Distribution", loss: "0%", status: "OK" },
      { num: 3, name: "core-ccr2004.sunvone.id", ip: "172.16.10.1", rtt: 2.8, as: "MikroTik CCR2004", loss: "0%", status: "OK" },
      { num: 4, name: "odf-metrolink-uob.sunvone.id", ip: "103.147.20.1", rtt: 5.2, as: "10G SFP+ Dark Fiber UOB", loss: "0%", status: "OK" },
      { num: 5, name: "ixp-cyber1.apjii.or.id", ip: "217.15.2.1", rtt: 8.5, as: "AS23700 APJII OpenIXP", loss: "0%", status: "OK" },
      { num: 6, name: "subsea-cable-jkt-sin.telkom.net", ip: "118.98.60.2", rtt: 18.2, as: "Subsea SMW4 / Batam Cable", loss: "0%", status: "OK" },
      { num: 7, name: "sg-ix.singtel.com", ip: "202.79.197.1", rtt: 24.5, as: "AS4657 SINGTEL Singapore", loss: "0%", status: "DESTINATION" },
    ],
  },
];

export default function TracerouteSimulator() {
  const { lang } = useLanguage();
  const isId = lang === "id";
  const [targetId, setTargetId] = useState("apjii");
  const [isRunning, setIsRunning] = useState(false);
  const [currentHopIndex, setCurrentHopIndex] = useState(PRESET_TARGETS[0].hops.length);
  const [viewMode, setViewMode] = useState("visual"); // 'visual' or 'raw'

  const activeTarget = useMemo(
    () => PRESET_TARGETS.find((t) => t.id === targetId) || PRESET_TARGETS[0],
    [targetId]
  );

  const startTraceroute = () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentHopIndex(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setCurrentHopIndex(step);
      if (step >= activeTarget.hops.length) {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 450);
  };

  useEffect(() => {
    // Reset to complete view on target change
    setCurrentHopIndex(activeTarget.hops.length);
    setIsRunning(false);
  }, [targetId, activeTarget]);

  return (
    <div className="trace-sim panel">
      {/* Header */}
      <div className="trace-head">
        <div>
          <span className="trace-badge">MTR &amp; TRACEROUTE SIMULATOR</span>
          <h3 className="trace-title">
            {isId ? "Simulator Rute Paket Jaringan (Hop-by-Hop)" : "Hop-by-Hop Network Route & BGP Path Simulator"}
          </h3>
          <p className="trace-sub">
            {isId
              ? "Visualisasi penelusuran rute paket data dari jaringan lokal Sunvone Solusindo melintasi Core Router MikroTik, link Fiber ODF, hingga upstream IXP APJII dan tier-1 global."
              : "Live visual trace of packet routing from Sunvone LAN through MikroTik core router, MetroLink fiber ODF, to APJII OpenIXP and global transit tier-1."}
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="trace-mode-toggle">
          <button
            type="button"
            className={`trace-toggle-btn ${viewMode === "visual" ? "is-active" : ""}`}
            onClick={() => setViewMode("visual")}
          >
            📊 {isId ? "Grafis Interaktif" : "Visual Map"}
          </button>
          <button
            type="button"
            className={`trace-toggle-btn ${viewMode === "raw" ? "is-active" : ""}`}
            onClick={() => setViewMode("raw")}
          >
            💻 {isId ? "Terminal MTR" : "Raw CLI"}
          </button>
        </div>
      </div>

      {/* Target Selector & Trigger */}
      <div className="trace-control-bar">
        <div className="trace-presets">
          <span className="control-label">{isId ? "Pilih Destinasi:" : "Select Target:"}</span>
          <div className="preset-buttons">
            {PRESET_TARGETS.map((tgt) => (
              <button
                key={tgt.id}
                type="button"
                className={`preset-btn ${targetId === tgt.id ? "is-active" : ""}`}
                onClick={() => setTargetId(tgt.id)}
                disabled={isRunning}
              >
                {tgt.name}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          className={`trace-run-btn ${isRunning ? "is-running" : ""}`}
          onClick={startTraceroute}
          disabled={isRunning}
        >
          {isRunning ? (
            <>
              <span className="trace-spinner" />
              {isId ? "Melacak Paket..." : "Probing Hops..."}
            </>
          ) : (
            <>
              <span>▶</span> {isId ? "Luncurkan Traceroute" : "Run Traceroute Probe"}
            </>
          )}
        </button>
      </div>

      {/* Target Summary Telemetry */}
      <div className="trace-telemetry-row">
        <div className="tel-card">
          <span className="tel-lbl">{isId ? "TARGET HOST" : "TARGET HOST"}</span>
          <strong className="tel-val text-teal">{activeTarget.host}</strong>
          <small>{activeTarget.ip}</small>
        </div>
        <div className="tel-card">
          <span className="tel-lbl">{isId ? "AUTONOMOUS SYSTEM" : "AUTONOMOUS SYSTEM"}</span>
          <strong className="tel-val text-copper">{activeTarget.as}</strong>
          <small>{activeTarget.location}</small>
        </div>
        <div className="tel-card">
          <span className="tel-lbl">{isId ? "TOTAL HOPS" : "TOTAL HOPS"}</span>
          <strong className="tel-val">{activeTarget.hops.length} Hops</strong>
          <small>TTL: 64</small>
        </div>
        <div className="tel-card">
          <span className="tel-lbl">{isId ? "ESTIMASI RTT" : "ESTIMATED RTT"}</span>
          <strong className="tel-val text-teal">{activeTarget.baseRtt} ms</strong>
          <small>Jitter: ~0.4ms · Loss: 0%</small>
        </div>
      </div>

      {/* Main View: Visual Map or Raw CLI */}
      {viewMode === "visual" ? (
        <div className="trace-hops-visual">
          <div className="hops-timeline">
            {activeTarget.hops.map((hop, idx) => {
              const isDiscovered = idx < currentHopIndex;
              const isCurrent = idx === currentHopIndex - 1 && isRunning;
              const isDest = idx === activeTarget.hops.length - 1;

              return (
                <div
                  key={hop.num}
                  className={`hop-item ${isDiscovered ? "is-visible" : "is-pending"} ${
                    isCurrent ? "is-current" : ""
                  } ${isDest ? "is-dest" : ""}`}
                >
                  <div className="hop-indicator">
                    <span className="hop-num">#{hop.num}</span>
                    <span className={`hop-beacon ${isDiscovered ? "active" : ""}`} />
                  </div>

                  <div className="hop-content">
                    <div className="hop-head">
                      <strong className="hop-name">{hop.name}</strong>
                      <span className="hop-rtt">{hop.rtt} ms</span>
                    </div>

                    <div className="hop-details">
                      <span className="hop-ip">{hop.ip}</span>
                      <span className="hop-as">{hop.as}</span>
                      <span className="hop-status-tag">Loss: {hop.loss}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Raw Terminal Mode */
        <div className="trace-raw-terminal">
          <div className="terminal-bar">
            <span className="term-dot red" />
            <span className="term-dot yellow" />
            <span className="term-dot green" />
            <span className="term-title">traceroute -n -w 2 {activeTarget.ip} (NOC Console)</span>
          </div>
          <pre className="term-pre">
            <code>
{`traceroute to ${activeTarget.host} (${activeTarget.ip}), 30 hops max, 60 byte packets\n`}
{activeTarget.hops.slice(0, currentHopIndex).map((h) => 
  ` ${String(h.num).padStart(2, " ")}  ${h.ip.padEnd(16, " ")} (${h.name})  ${h.rtt} ms  ${(h.rtt + 0.2).toFixed(1)} ms  ${(h.rtt - 0.1).toFixed(1)} ms  [${h.as}]\n`
).join("")}
{currentHopIndex < activeTarget.hops.length && isRunning && (
  ` ${String(currentHopIndex + 1).padStart(2, " ")}  * * * Request timed out / probing...\n`
)}
{currentHopIndex === activeTarget.hops.length && (
  `\n[+] Trace complete. 0% packet loss, avg RTT: ${activeTarget.baseRtt}ms. Status: OPTIMAL.`
)}
            </code>
          </pre>
        </div>
      )}
    </div>
  );
}

