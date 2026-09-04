"use client";

import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const INCIDENTS = [
  {
    id: "fiber-loss",
    badge: "INCIDENT #01 · PHYSICAL LAYER",
    titleId: "Redaman Drop Kritis di ODF Mangkuluhur (-32.4 dBm)",
    titleEn: "Critical Fiber Attenuation Drop at ODF Mangkuluhur (-32.4 dBm)",
    severity: "CRITICAL (P1)",
    severityColor: "#ff4d4f",
    category: "Fiber Optic & ODF",
    sla: "14 Menit / Min",
    alertId: "OPM RX Power: -32.4 dBm (Batas Maksimal: -26 dBm). Link SFP+ Flapping, Packet Loss 28%.",
    alertEn: "OPM RX Power: -32.4 dBm (Threshold: -26 dBm). SFP+ link flapping, 28% packet loss.",
    steps: [
      {
        stepNum: "01",
        labelId: "Deteksi Alarm NOC",
        labelEn: "NOC Alarm Detection",
        descId: "Sistem monitoring Cacti & MRTG memicu alert merah untuk uplink MetroLink UOB ➔ Mangkuluhur. Konfirmasi via OPM menunjukkan daya terima optical drop drastis ke -32.4 dBm.",
        descEn: "Cacti & MRTG monitoring trigger critical red alerts on MetroLink UOB ➔ Mangkuluhur uplink. OPM inspection confirms optical RX power has plummeted to -32.4 dBm.",
        cli: `[NOC-ALERT] 10G-SFP-02 link state: FLAPPING (RX: -32.4 dBm)\n[ACTION] Dispatching field engineer with OTDR & Fujikura Fusion Splicer.`,
      },
      {
        stepNum: "02",
        labelId: "Inspeksi Laser VFL & OTDR",
        labelEn: "VFL Laser & OTDR Inspection",
        descId: "Tembak laser VFL 650nm dari ODF UOB. Lakukan pengetesan OTDR trace pada panjang gelombang 1310nm. Ditemukan micro-bending dan sambungan patah pada Core 4 di splice tray rack #2 Hotel Mangkuluhur.",
        descEn: "Injected 650nm VFL red laser from ODF UOB. Ran OTDR trace at 1310nm. Pinpointed micro-bending and damaged fusion joint on Core 4 in Hotel Mangkuluhur rack #2 splice tray.",
        cli: `otdr-test --port=core-04 --wavelength=1310nm\nEvent #1: Distance 3.42 KM | Loss: 14.2 dB [CRITICAL FAULT DETECTED]\nLocation: Mangkuluhur ODF OSP Splice Tray #2`,
      },
      {
        stepNum: "03",
        labelId: "Perbaikan Re-Splicing Presisi",
        labelEn: "Precision Re-Splicing",
        descId: "Kupas ulang jaket kabel loose tube, bersihkan core kaca menggunakan alkohol isopropil 99%, cleaving dengan presisi 90°, dan sambung ulang menggunakan Fusion Splicer.",
        descEn: "Stripped cable loose tube buffer, cleaned glass core with 99% isopropyl alcohol, executed 90° precision cleave, and performed re-splicing using core-alignment fusion splicer.",
        cli: `fujikura-splicer --run\n[ALIGNMENT] Core-to-Core: 100% OK\n[ARC DISCHARGE] Fusion complete. Estimated Splice Loss: 0.02 dB.`,
      },
      {
        stepNum: "04",
        labelId: "Verifikasi & Pemulihan SLA",
        labelEn: "Verification & SLA Restored",
        descId: "Uji ulang OPM menunjukkan redaman pulih normal ke -18.2 dBm (Pristine). Port SFP+ stabil 10 Gbps, 0 packet loss, SLA tercapai dalam 14 menit.",
        descEn: "Re-measured with OPM: optical power pristine at -18.2 dBm. 10 Gbps SFP+ link fully stable with 0 drops. SLA target fulfilled in 14 minutes.",
        cli: `[VERIFY] RX Power: -18.2 dBm | SFP+ Link: 10000 Mbps Full Duplex\n[STATUS] Incident CLOSED. Resolution Time: 14m (SLA Target: <30m).`,
      },
    ],
  },
  {
    id: "switch-loop",
    badge: "INCIDENT #02 · SWITCHING & LOOP",
    titleId: "CPU Router Spike 95% Akibat Looping Switch Klien",
    titleEn: "Router CPU Spiking to 95% Caused by Client Switch Loop",
    severity: "HIGH (P2)",
    severityColor: "#ffa940",
    category: "Switching & Loop Protection",
    sla: "8 Menit / Min",
    alertId: "MikroTik CCR2004 CPU Load 95%. Winbox Interface Ether3 Traffic: 98 Mbps Broadcast Flood.",
    alertEn: "MikroTik CCR2004 CPU Load 95%. Winbox Interface Ether3 Traffic: 98 Mbps Broadcast Storm.",
    steps: [
      {
        stepNum: "01",
        labelId: "Deteksi Broadcast Storm",
        labelEn: "Broadcast Storm Detection",
        descId: "Monitoring Grafana & Winbox mendeteksi lonjakan CPU router mendadak hingga 95%. Latensi jaringan melonjak ke 320ms, ribuan paket broadcast ARP per detik terdeteksi di Ether3.",
        descEn: "Grafana & Winbox dashboard trigger alarm as router CPU spikes to 95%. Subnet latency jumps to 320ms with thousands of broadcast ARP packets flooding Ether3.",
        cli: `/system resource monitor\ncpu-load: 95% | free-memory: 12% | packets-per-second: 84,200 (BROADCAST)`,
      },
      {
        stepNum: "02",
        labelId: "Investigasi MAC Flapping",
        labelEn: "MAC Flapping Investigation",
        descId: "Buka menu Bridge Hosts di Winbox. Terlihat puluhan MAC address berganti port (flapping) dalam hitungan milidetik, mengindikasikan adanya kabel loopback di switch unmanaged klien lantai 3.",
        descEn: "Inspected Bridge Hosts table in Winbox. Detected rapid MAC address flapping between ports within milliseconds, proving an unmanaged loopback cable on floor 3 client switch.",
        cli: `/interface bridge host print where flapping=yes\nMAC: 00:E0:4C:68:01:FE hopping between ether3 and ether4 every 0.05s`,
      },
      {
        stepNum: "03",
        labelId: "Isolasi & Konfigurasi RSTP",
        labelEn: "Isolation & RSTP Configuration",
        descId: "Segera isolasi port terdampak. Aktifkan fitur Loop Protect di MikroTik serta atur RSTP (Rapid Spanning Tree Protocol) dengan BPDU Guard di switch distribusi.",
        descEn: "Isolated affected downlink port. Activated MikroTik Loop Protect feature and configured RSTP with BPDU Guard on distribution switch to drop looped packets.",
        cli: `/interface ethernet set [find name=ether3] loop-protect=on loop-protect-send-interval=5s\n/interface bridge port set [find interface=ether3] bpdu-guard=yes`,
      },
      {
        stepNum: "04",
        labelId: "Stabilisasi & Hasil",
        labelEn: "Stabilization & Resolution",
        descId: "Port yang mengalami loop otomatis di-block secara aman oleh switch tanpa mematikan perangkat lain. CPU router kembali normal ke 12%, latensi pulih ke 1.8ms.",
        descEn: "The looped port is automatically blocked in hardware without disrupting neighboring VLANs. Router CPU returns to 12% baseline, latency restored to 1.8ms.",
        cli: `[LOOP-PROTECT] Looped port ether3 blocked automatically.\n[SYSTEM] CPU Load: 12% | Latency: 1.8ms | Status: RESOLVED in 8m.`,
      },
    ],
  },
  {
    id: "rogue-dhcp",
    badge: "INCIDENT #03 · SUBNET & SECURITY",
    titleId: "IP Conflict & Rogue DHCP di Segmen VLAN 204 Sunvone",
    titleEn: "IP Conflict & Rogue DHCP Hijacking in Sunvone VLAN 204",
    severity: "MEDIUM (P3)",
    severityColor: "#36cfc9",
    category: "Network Security & DHCP",
    sla: "11 Menit / Min",
    alertId: "Laporan klien: Sejumlah workstation gagal koneksi ke gateway resmi dan mendapat IP 192.168.1.x.",
    alertEn: "User report: Multiple workstations failed internet access, receiving unknown 192.168.1.x gateway.",
    steps: [
      {
        stepNum: "01",
        labelId: "Laporan Gangguan Klien",
        labelEn: "Client Incident Report",
        descId: "Beberapa staf kantor lapor tidak bisa membuka server internal dan internet. Pemeriksaan `ipconfig` mendapati gateway komputer berubah dari 10.240.0.1 menjadi 192.168.1.1 asing.",
        descEn: "Multiple workstations reported total loss of gateway connectivity. Running `ipconfig` revealed client default gateway had been hijacked from 10.240.0.1 to foreign 192.168.1.1.",
        cli: `C:\\> ipconfig\nIPv4 Address: 192.168.1.45 (WRONG SUBNET)\nDefault Gateway: 192.168.1.1 (UNAUTHORIZED ROGUE DHCP)`,
      },
      {
        stepNum: "02",
        labelId: "Pelacakan Paket Rogue DHCP",
        labelEn: "Rogue DHCP Packet Sniffing",
        descId: "Jalankan packet capture via MikroTik Torch & filter UDP port 67/68. Teridentifikasi perangkat router Wi-Fi baru milik user dicolok ke port LAN alih-alih port WAN.",
        descEn: "Ran packet capture via MikroTik Torch filtering UDP ports 67/68. Identified an unauthorized consumer Wi-Fi router plugged into a wall LAN jack instead of its WAN port.",
        cli: `/tool torch interface=ether5 port=bootps,bootpc\nSRC-MAC: B4:FB:E4:12:89:AA offering DHCP Lease from 192.168.1.1 on VLAN 204`,
      },
      {
        stepNum: "03",
        labelId: "Penerapan DHCP Snooping",
        labelEn: "DHCP Snooping Enforcement",
        descId: "Aktifkan DHCP Snooping pada switch distribusi. Set port uplink server resmi MikroTik sebagai `Trusted`, dan seluruh port access pengguna sebagai `Untrusted`.",
        descEn: "Configured DHCP Snooping on distribution switch. Flagged core MikroTik uplink as 'Trusted', and locked all user access wall-jacks to 'Untrusted' mode.",
        cli: `/interface bridge filter add chain=forward mac-protocol=ip ip-protocol=udp dst-port=67,68 in-interface=ether5 action=drop\n[SECURITY] Rogue DHCP Offer packets DROPPED.`,
      },
      {
        stepNum: "04",
        labelId: "Re-Lease IP Resmi & Normal",
        labelEn: "Official Lease Restored",
        descId: "Broadcast DHCP renew dikirim ke segmen VLAN 204. Seluruh komputer kembali mendapatkan IP resmi 10.240.0.x dari server MikroTik resmi, koneksi 100% normal.",
        descEn: "Forced DHCP release/renew cycle across VLAN 204. All endpoints re-acquired official 10.240.0.x leases from authorized MikroTik server. 100% operational.",
        cli: `[DHCP-SERVER] Leased 10.240.0.45 to client workstation.\n[STATUS] Subnet 10.240.0.0/24 secured. Incident RESOLVED in 11m.`,
      },
    ],
  },
];

export default function IncidentSimulator() {
  const { lang } = useLanguage();
  const isId = lang === "id";
  const [selectedIncident, setSelectedIncident] = useState(INCIDENTS[0]);
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const handleSelectIncident = (inc) => {
    setSelectedIncident(inc);
    setActiveStepIdx(0);
  };

  const currentStep = selectedIncident.steps[activeStepIdx];

  return (
    <section id="insiden" className="incident-section">
      <div className="wrap">
        <p className="eyebrow">{isId ? "06 · Investigasi & Penanganan" : "06 · Troubleshooting Cases"}</p>
        <div className="incident-heading">
          <div>
            <h2 className="sectitle">
              {isId ? "Skenario Pemecahan Masalah NOC" : "Interactive NOC Incident Simulator"}
            </h2>
            <p className="section-note">
              {isId
                ? "Simulasi alur berpikir sistematis dan investigasi teknis saat menghadapi insiden kritis jaringan lapangan: dari alarm sistem, diagnosa alat ukur, hingga pemulihan layanan (SLA terpenuhi)."
                : "Real-world field incident resolution workflows: from NOC alert trigger, instrument diagnostics, config mitigation, to verified service restoration under strict SLA."}
            </p>
          </div>
        </div>

        {/* Incident Case Selector Pills */}
        <div className="incident-selector-bar">
          {INCIDENTS.map((inc) => {
            const isSelected = selectedIncident.id === inc.id;
            return (
              <button
                key={inc.id}
                type="button"
                className={`incident-tab-btn ${isSelected ? "is-active" : ""}`}
                onClick={() => handleSelectIncident(inc)}
              >
                <span className="inc-badge-dot" style={{ background: inc.severityColor }} />
                <span className="inc-title-text">{isId ? inc.titleId : inc.titleEn}</span>
              </button>
            );
          })}
        </div>

        {/* Main Incident Card */}
        <div className="incident-card panel">
          {/* Top Banner */}
          <div className="incident-card-top">
            <div className="incident-meta-left">
              <span className="incident-tag" style={{ borderColor: selectedIncident.severityColor, color: selectedIncident.severityColor }}>
                {selectedIncident.badge}
              </span>
              <h3 className="incident-main-title">
                {isId ? selectedIncident.titleId : selectedIncident.titleEn}
              </h3>
            </div>
            <div className="incident-meta-right">
              <div className="incident-metric-pill">
                <span className="inc-lbl">{isId ? "SEVERITY" : "SEVERITY"}</span>
                <strong style={{ color: selectedIncident.severityColor }}>{selectedIncident.severity}</strong>
              </div>
              <div className="incident-metric-pill">
                <span className="inc-lbl">{isId ? "WAKTU PENYELESAIAN" : "SLA RESOLUTION"}</span>
                <strong className="text-teal">{selectedIncident.sla}</strong>
              </div>
            </div>
          </div>

          {/* Alarm Banner */}
          <div className="incident-alert-box">
            <span className="alert-icon">⚠️</span>
            <div>
              <span className="alert-title">{isId ? "TRIGGER ALARM NOC SISTEM:" : "NOC SYSTEM ALARM TRIGGER:"}</span>
              <p className="alert-msg">{isId ? selectedIncident.alertId : selectedIncident.alertEn}</p>
            </div>
          </div>

          {/* Interactive Steps Tracker */}
          <div className="incident-steps-nav">
            {selectedIncident.steps.map((step, idx) => {
              const isCurrent = idx === activeStepIdx;
              const isDone = idx < activeStepIdx;

              return (
                <button
                  key={step.stepNum}
                  type="button"
                  className={`step-nav-btn ${isCurrent ? "is-current" : ""} ${isDone ? "is-done" : ""}`}
                  onClick={() => setActiveStepIdx(idx)}
                >
                  <span className="step-num">{step.stepNum}</span>
                  <span className="step-label">{isId ? step.labelId : step.labelEn}</span>
                </button>
              );
            })}
          </div>

          {/* Active Step Content Body */}
          <div className="incident-step-body">
            <div className="step-body-left">
              <div className="step-badge-row">
                <span className="step-badge-tag">
                  {isId ? `LANGKAH ${currentStep.stepNum} DARI 04` : `STEP ${currentStep.stepNum} OF 04`}
                </span>
                <h4>{isId ? currentStep.labelId : currentStep.labelEn}</h4>
              </div>
              <p className="step-desc-text">{isId ? currentStep.descId : currentStep.descEn}</p>

              {/* Navigation Actions */}
              <div className="step-actions-row">
                <button
                  type="button"
                  className="step-nav-arrow"
                  disabled={activeStepIdx === 0}
                  onClick={() => setActiveStepIdx((prev) => Math.max(prev - 1, 0))}
                >
                  ← {isId ? "Langkah Sebelumnya" : "Previous Step"}
                </button>
                {activeStepIdx < selectedIncident.steps.length - 1 ? (
                  <button
                    type="button"
                    className="step-nav-arrow is-primary"
                    onClick={() => setActiveStepIdx((prev) => Math.min(prev + 1, selectedIncident.steps.length - 1))}
                  >
                    {isId ? "Langkah Selanjutnya" : "Next Step"} →
                  </button>
                ) : (
                  <span className="incident-resolved-badge">
                    ✓ {isId ? "KASUS SELESAI (RESOLVED)" : "INCIDENT RESOLVED"}
                  </span>
                )}
              </div>
            </div>

            {/* Diagnostic Terminal Output */}
            <div className="step-body-right">
              <div className="step-cli-box">
                <div className="cli-bar">
                  <span className="term-dot red" />
                  <span className="term-dot yellow" />
                  <span className="term-dot green" />
                  <span className="cli-title">NOC Field Console [Diagnostic Output]</span>
                </div>
                <pre className="cli-code">
                  <code>{currentStep.cli}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

