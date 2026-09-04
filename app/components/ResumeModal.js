"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { contact } from "../data/content";

export default function ResumeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang } = useLanguage();
  const isId = lang === "id";

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };

    window.addEventListener("open-resume-modal", handleOpen);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("open-resume-modal", handleOpen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div className="resume-modal-overlay" onClick={() => setIsOpen(false)}>
      <div className="resume-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Floating Action Header */}
        <div className="resume-action-bar">
          <div className="resume-bar-info">
            <span className="resume-badge">ATS RESUME PREVIEW</span>
            <span>{isId ? "Format Standar Industri Siap Cetak (A4)" : "Industry Standard Print-Ready (A4)"}</span>
          </div>

          <div className="resume-bar-actions">
            <button
              type="button"
              className="btn-print-resume"
              onClick={handlePrint}
              title="Cetak atau Simpan sebagai PDF"
            >
              🖨️ {isId ? "Cetak / Simpan PDF" : "Print / Save as PDF"}
            </button>
            <button
              type="button"
              className="btn-close-resume"
              onClick={() => setIsOpen(false)}
              aria-label="Tutup"
            >
              ✕
            </button>
          </div>
        </div>

        {/* The Printable ATS Resume Document */}
        <div className="resume-paper resume-printable-area">
          {/* Header */}
          <header className="res-header">
            <h1 className="res-name">MUHAMMAD JAFFIER AL ZUFRI</h1>
            <p className="res-title">Network Engineer &amp; NOC Operator</p>
            <div className="res-contacts">
              <span>📍 Tangerang Selatan, Banten, Indonesia</span>
              <span>✉️ {contact.email}</span>
              <span>📱 +62 878-8316-0975</span>
              <span>🌐 jaffier-porto.vercel.app</span>
              <span>💼 linkedin.com/in/muhammad-jaffier</span>
            </div>
          </header>

          <hr className="res-hr" />

          {/* Professional Summary */}
          <section className="res-section">
            <h2 className="res-sectitle">{isId ? "RINGKASAN PROFESIONAL" : "PROFESSIONAL SUMMARY"}</h2>
            <p className="res-summary">
              {isId
                ? "Network Engineer dan Operator NOC bersertifikasi MTCNA dengan keahlian operasional infrastruktur Internet Service Provider (ISP), layanan IPTV, dan jaringan MetroLink. Berpengalaman dalam routing MikroTik, konfigurasi switching VLAN 802.1Q, penyambungan fusion splicing kabel serat optik berstandar ITU-T G.652, analisis pengukuran redaman OTDR/OPM, manajemen Linux server, serta pemantauan stabilitas SLA jaringan 24/7 di Data Center APJII Cyber dan POP gedung komersial."
                : "MTCNA-certified Network Engineer & NOC Operator with hands-on expertise in ISP infrastructure, IPTV delivery systems, and optical MetroLink links. Skilled in MikroTik routing, 802.1Q VLAN trunking, ITU-T G.652 fiber optic fusion splicing, OTDR/OPM attenuation trace analysis, Linux administration, and 24/7 SLA telemetry monitoring across APJII Cyber Data Center and commercial high-rise POPs."}
            </p>
          </section>

          {/* Work Experience */}
          <section className="res-section">
            <h2 className="res-sectitle">{isId ? "PENGALAMAN KERJA" : "WORK EXPERIENCE"}</h2>

            <div className="res-job">
              <div className="res-job-head">
                <div>
                  <strong className="res-job-role">Network Engineer &amp; NOC Operator</strong>
                  <span className="res-job-company"> · Sunvone Solusindo (ISP &amp; IPTV Provider)</span>
                </div>
                <span className="res-job-date">Sep 2025 — Sekarang / Present</span>
              </div>
              <ul className="res-bullets">
                <li>Mengoperasikan dan memantau Network Operations Center (NOC) untuk backbone fiber optic MetroLink, layanan video IPTV multicast, dan konektivitas internet pelanggan korporasi guna menjamin target SLA 99.8%.</li>
                <li>Melakukan supervisi instalasi, splicing, dan perbaikan link serat optik menggunakan Fusion Splicer, OPM, Visual Fault Locator, dan analisis reflektansi OTDR di lokasi ODF UOB Plaza dan Hotel Mangkuluhur.</li>
                <li>Mengelola routing MikroTik CCR2004, pembagian alokasi bandwidth queue, firewall filtering, dan koordinasi setup peering IP transit di Data Center APJII Cyber 1.</li>
                <li>Mengoperasikan sistem NMS monitoring terpusat menggunakan MRTG, Cacti, The Dude, dan SolarWinds Orion untuk deteksi dini anomali latency dan traffic spike.</li>
                <li>Administrasi server Linux, hosting cPanel, pengelolaan domain/DNS/SSL untuk portal web perusahaan serta administrasi Microsoft 365.</li>
              </ul>
            </div>

            <div className="res-job">
              <div className="res-job-head">
                <div>
                  <strong className="res-job-role">Network Engineer</strong>
                  <span className="res-job-company"> · PT Nusa Network Prakasa</span>
                </div>
                <span className="res-job-date">Mar 2024 — Agu 2024</span>
              </div>
              <ul className="res-bullets">
                <li>Menyusun dokumen teknis standar operasional: Method of Procedure (MOP), User Acceptance Test (UAT), dan panduan maintenance troubleshooting perangkat.</li>
                <li>Melakukan konfigurasi, deployment, dan pengujian konektivitas perangkat network switch serta firewall (FortiSwitch &amp; FortiManager).</li>
                <li>Menganalisis performa jaringan sebelum dan sesudah migrasi infrastruktur, memastikan kepatuhan penuh terhadap parameter SLA SD-WAN.</li>
              </ul>
            </div>

            <div className="res-job">
              <div className="res-job-head">
                <div>
                  <strong className="res-job-role">PC Technician &amp; System Troubleshooter</strong>
                  <span className="res-job-company"> · Radio Republik Indonesia (RRI)</span>
                </div>
                <span className="res-job-date">Jan 2024 — Feb 2024</span>
              </div>
              <ul className="res-bullets">
                <li>Troubleshooting hardware workstation dan server siaran: motherboard, RAM, catu daya (PSU), dan media penyimpanan data.</li>
                <li>Instalasi dan optimasi sistem operasi Windows &amp; Linux untuk kebutuhan penyiaran audio dan workstation kantor.</li>
              </ul>
            </div>
          </section>

          {/* Certifications */}
          <section className="res-section">
            <h2 className="res-sectitle">{isId ? "SERTIFIKASI PROFESIONAL" : "PROFESSIONAL CERTIFICATIONS"}</h2>
            <div className="res-cert-row">
              <strong>MikroTik Certified Network Associate (MTCNA)</strong>
              <span> · ID: 2409NA7842 (MikroTikls SIA)</span>
            </div>
            <p className="res-cert-detail">
              {isId
                ? "Kompetensi: Routing (Static, OSPF), Bridging, Firewall Filter/NAT/Mangle, Bandwidth Queue (Simple/Tree), Wireless, Tunnel (EoIP, PPTP, L2TP, WireGuard), Diagnostics."
                : "Competencies: Routing (Static, OSPF), 802.1Q Bridging, Stateful Firewall (Filter/NAT/Mangle), QoS Bandwidth Queuing, VPN Tunnels, Network Diagnostics."}
            </p>
          </section>

          {/* Education */}
          <section className="res-section">
            <h2 className="res-sectitle">{isId ? "PENDIDIKAN FORMAL" : "EDUCATION"}</h2>
            <div className="res-job-head">
              <div>
                <strong className="res-job-role">Teknik Komputer dan Jaringan (TKJ)</strong>
                <span className="res-job-company"> · SMK Telkom Jakarta / Tangerang</span>
              </div>
              <span className="res-job-date">Lulus / Graduate</span>
            </div>
          </section>

          {/* Technical Skills */}
          <section className="res-section">
            <h2 className="res-sectitle">{isId ? "KEAHLIAN TEKNIS & TOOLSET" : "TECHNICAL SKILLS & TOOLSET"}</h2>
            <div className="res-skills-grid">
              <div>
                <strong>Networking &amp; Routing:</strong>
                <p>MikroTik RouterOS, Winbox, Cisco IOS, FortiManager, BGP Peering, OSPF, VLAN 802.1Q Trunking, RSTP, Subnetting IPv4/CIDR, WireGuard VPN.</p>
              </div>
              <div>
                <strong>Fiber Optic Infrastructure:</strong>
                <p>Fusion Splicer, OTDR Trace Analysis, Optical Power Meter (OPM), Visual Fault Locator (VFL), ITU-T G.652 Standards, ODF Patching.</p>
              </div>
              <div>
                <strong>NMS &amp; Monitoring:</strong>
                <p>SolarWinds Orion, Cacti, MRTG, The Dude, Wireshark Packet Inspection, Syslog Server, Grafana.</p>
              </div>
              <div>
                <strong>Systems &amp; Services:</strong>
                <p>Linux (Ubuntu/Debian), Apache, Nginx, cPanel, DNS/SSL Management, WordPress, Microsoft 365, KeePassXC 2FA.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

