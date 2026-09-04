"use client";

import { useLanguage } from "../context/LanguageContext";

const EXPERIENCES = {
  id: [
    {
      date: "SEP 2025 — SEKARANG",
      role: "Network Engineer & NOC Operator",
      org: "Sunvone Solusindo — Penyedia ISP & IPTV",
      bullets: [
        "Mengoperasikan dan memantau Network Operations Center (NOC) untuk fiber optic MetroLink, layanan IPTV, dan konektivitas internet demi menjaga SLA 99.9%.",
        "Instalasi, konfigurasi, dan pemeliharaan sistem IPTV serta perangkat jaringan MetroLink, termasuk penanganan cepat gangguan link.",
        "Mengelola platform monitoring jaringan: MRTG, Cacti, dan SolarWinds Orion.",
        "Mengelola website perusahaan (Sunvone & Optinet) via WordPress; menangani hosting, domain, DNS, dan SSL melalui cPanel.",
        "Administrasi layanan email Microsoft 365 termasuk mail flow, spam filtering, dan akses multi-device.",
        "Mengawasi instalasi, splicing, dan recovery fiber optic menggunakan Yokogawa OTDR, OPM, dan fusion splicer.",
        "Koordinasi setup IP transit dan interkoneksi peering di Data Center APJII.",
        "Menerapkan manajemen password dan 2FA (TOTP) yang aman menggunakan KeePassXC.",
      ],
      tags: ["MikroTik CCR", "WireGuard VPN", "MRTG", "Cacti", "SolarWinds", "OTDR", "Fusion Splicing", "cPanel"],
    },
    {
      date: "MAR 2024 — AGU 2024",
      role: "Network Engineer",
      org: "PT Nusa Network Prakasa",
      bullets: [
        "Membuat dokumen MOP, UAT, dan dokumentasi teknis (Maintenance, Troubleshoot, Installation).",
        "Konfigurasi dan troubleshooting perangkat network & firewall enterprise.",
        "Pengujian konektivitas jaringan menggunakan ping, traceroute, dan monitoring real-time melalui NMS-SolarWinds & FortiManager.",
        "Menganalisis performa jaringan sebelum dan sesudah penggantian perangkat, memastikan kepatuhan terhadap SLA SDWAN.",
        "Memastikan operasional aplikasi kritikal berjalan lancar pasca migrasi switch core.",
        "Mengawasi dan mengoordinasikan penggantian perangkat FortiSwitch oleh tim Engineer On Site (EOS).",
      ],
      tags: ["FortiManager", "SolarWinds NMS", "SD-WAN", "FortiSwitch", "Firewall"],
    },
    {
      date: "JAN 2024 — FEB 2024",
      role: "PC Technician & System Troubleshooter",
      org: "Radio Republik Indonesia",
      bullets: [
        "Merakit PC sesuai kebutuhan pengguna — penggunaan umum, studio siaran, maupun workstation profesional.",
        "Menganalisis dan mengidentifikasi masalah pada hardware seperti motherboard, RAM, PSU, dan storage SSD/HDD.",
        "Mengoptimalkan performa PC — membersihkan registry, optimasi OS, dan menghapus bloatware sistem.",
        "Instalasi berbagai sistem operasi (Windows, Linux) beserta konfigurasi driver dan jaringan awal.",
        "Melakukan preventive maintenance rutin untuk mencegah overheating dan kerusakan perangkat siaran.",
      ],
      tags: ["PC Hardware", "Windows", "Linux", "Preventive Maintenance"],
    },
  ],
  en: [
    {
      date: "SEP 2025 — PRESENT",
      role: "Network Engineer & NOC Operator",
      org: "Sunvone Solusindo — ISP & IPTV Provider",
      bullets: [
        "Operate and supervise the 24/7 Network Operations Center (NOC) for MetroLink fiber optic backbone, IPTV broadcast delivery, and corporate internet links.",
        "Deploy, configure, and maintain IPTV streaming clusters and MetroLink edge routing equipment with rapid incident turnaround.",
        "Administer network monitoring telemetry systems: MRTG, Cacti, The Dude, and SolarWinds Orion.",
        "Manage corporate web platforms via WordPress; supervise hosting, domain DNS, and SSL certification through cPanel.",
        "Administer Microsoft 365 tenant services including hybrid mail flow, anti-spam policies, and identity access.",
        "Supervise fiber optic field deployments, splicing, and loss diagnostics using Yokogawa AQ1000 OTDR and fusion splicers.",
        "Coordinate IP transit BGP peering sessions and cross-connect patching at APJII Data Center Jakarta.",
        "Enforce enterprise credential security and 2FA (TOTP) architecture using KeePassXC vaults.",
      ],
      tags: ["MikroTik CCR", "WireGuard VPN", "MRTG", "Cacti", "SolarWinds", "OTDR", "Fusion Splicing", "cPanel"],
    },
    {
      date: "MAR 2024 — AUG 2024",
      role: "Network Engineer",
      org: "PT Nusa Network Prakasa",
      bullets: [
        "Authored Method of Procedure (MOP), User Acceptance Test (UAT), and technical handover documents.",
        "Configured and troubleshot enterprise routing switches and firewall security appliances.",
        "Conducted end-to-end packet path analysis using ICMP ping, traceroute, and live NMS-SolarWinds telemetry.",
        "Audited network throughput pre- and post-hardware migration to ensure strict SD-WAN SLA adherence.",
        "Verified seamless failover and verified mission-critical application continuity post migration.",
        "Supervised and directed on-site engineers (EOS) during FortiSwitch enterprise hardware replacements.",
      ],
      tags: ["FortiManager", "SolarWinds NMS", "SD-WAN", "FortiSwitch", "Firewall"],
    },
    {
      date: "JAN 2024 — FEB 2024",
      role: "PC Technician & System Troubleshooter",
      org: "Radio Republik Indonesia",
      bullets: [
        "Assembled custom PC workstations tailored for broadcast studios, administrative use, and production audio suites.",
        "Diagnosed and resolved hardware faults across motherboards, memory modules, power supplies, and storage subsystems.",
        "Optimized operating system responsiveness, cleared registry clutter, and removed background bottlenecks.",
        "Deployed multi-platform OS installations (Windows, Linux) alongside automated initial configuration scripts.",
        "Executed routine preventive maintenance cycles to eliminate thermal throttling and dust hazards.",
      ],
      tags: ["PC Hardware", "Windows", "Linux", "Preventive Maintenance"],
    },
  ],
};

export default function Experience() {
  const { lang, t } = useLanguage();
  const list = EXPERIENCES[lang] || EXPERIENCES.id;
  const isId = lang === "id";

  return (
    <section id="pengalaman">
      <div className="wrap">
        <p className="eyebrow">{t("exp_eyebrow")}</p>
        <div className="experience-heading">
          <div>
            <h2 className="sectitle">{t("exp_title")}</h2>
            <p className="section-note">{t("exp_note")}</p>
          </div>
          <div className="experience-stat">
            <span>FIELD LOG</span>
            <strong>03</strong>
            <small>{isId ? "posisi tercatat" : "recorded roles"}</small>
          </div>
        </div>
        <div className="experience-grid">
          {list.map((item, index) => (
            <article
              className={`experience-card ${index === 0 ? "is-current" : ""}`}
              key={item.org + item.date}
            >
              <div className="experience-card-top">
                <span className="log-date">{item.date}</span>
                {index === 0 && (
                  <span className="current-badge">
                    <i /> {isId ? "SAAT INI" : "CURRENT"}
                  </span>
                )}
              </div>
              <div className="experience-number">0{index + 1}</div>
              <h3>{item.role}</h3>
              <p className="log-org">{item.org}</p>
              <div className="experience-line" />
              <ul>
                {item.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <div className="tags">
                {item.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
