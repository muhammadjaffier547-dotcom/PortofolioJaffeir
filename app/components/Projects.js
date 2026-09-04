"use client";

import { useLanguage } from "../context/LanguageContext";

const PROJECTS_DATA = {
  id: [
    {
      id: "001",
      type: "NOC / MONITORING",
      icon: "◉",
      title: "Monitoring NOC MetroLink & SLA 99.9%",
      role: "Network Engineer & NOC Operator",
      summary: "Monitoring ketersediaan, traffic bandwidth, dan kesehatan link di seluruh infrastruktur fiber optik, internet, dan IPTV.",
      problem: "Menjaga visibilitas gangguan backbone dan fluktuasi traffic agar insiden dapat diisolasi dalam hitungan menit.",
      approach: "Menggunakan MRTG, Cacti, SolarWinds, dan MikroTik Winbox untuk membaca traffic rate, status SFP, dan indikasi loop/drop.",
      result: "Monitoring terintegrasi mempercepat response time penanganan insiden dan menjaga ketersediaan layanan pelanggan.",
      tools: ["MRTG", "Cacti", "SolarWinds", "Winbox", "SNMP"],
    },
    {
      id: "002",
      type: "FIBER / FIELD",
      icon: "◇",
      title: "Troubleshooting & Splicing Fiber Optik",
      role: "Infrastruktur Fiber Lapangan",
      summary: "Troubleshooting lapangan mulai dari indikasi redaman loss tinggi sampai penyambungan core kaca di optical joint closure.",
      problem: "Gangguan link putus atau redaman kritis (-25.9 dBm) membutuhkan isolasi titik patah/bending sebelum link bisa dipulihkan.",
      approach: "Menggunakan Yokogawa AQ1000 OTDR, Optical Power Meter, fiber cleaver presisi, dan fusion splicer di lapangan.",
      result: "Pemulihan link berbasis pengukuran empiris, mengembalikan redaman ke batas optimal (< -18 dBm) dengan redaman sambungan < 0.05 dB.",
      tools: ["Yokogawa AQ1000", "Fusion Splicer", "OPM", "Joint Closure"],
    },
    {
      id: "003",
      type: "NETWORK / ROUTING",
      icon: "⌁",
      title: "Arsitektur Routing & Firewall MikroTik",
      role: "Routing, NAT & Keamanan",
      summary: "Konfigurasi komprehensif RouterOS berbasis standar MTCNA: VLAN Trunking, OSPF, NAT Mangle, QoS Queues, dan WireGuard VPN.",
      problem: "Kebutuhan segmentasi jaringan antar departemen dan enkripsi tunnel komunikasi data yang stabil dan aman.",
      approach: "Menerapkan 802.1Q VLAN, static/dynamic routing OSPF, firewall filter stateful, dan pemisahan gateway multi-subnet.",
      result: "Infrastruktur jaringan terstruktur rapi, throughput maksimal tanpa bottleneck, dan manajemen insiden terisolasi per VLAN.",
      tools: ["MikroTik CCR", "OSPF", "802.1Q VLAN", "WireGuard", "Firewall"],
    },
    {
      id: "004",
      type: "IPTV / MULTICAST",
      icon: "▣",
      title: "Operasional Headend & Layanan IPTV",
      role: "NOC / Layanan Multicast",
      summary: "Operasional, deployment, dan troubleshooting transmisi video multicast IPTV dan web platform ISP.",
      problem: "Distribusi stream video live membutuhkan bandwidth efisien tanpa membanjiri (flooding) port switch klien reguler.",
      approach: "Mengonfigurasi IGMP Snooping, routing multicast PIM-SM, dan monitoring throughput interface vlan204 secara berkala.",
      result: "Siaran IPTV digital berjalan stabil dan jernih, latency minimal, serta zero packet drop pada interface distribusi.",
      tools: ["IPTV", "IGMP Snooping", "PIM-SM", "Linux", "cPanel"],
    },
  ],
  en: [
    {
      id: "001",
      type: "NOC / MONITORING",
      icon: "◉",
      title: "MetroLink NOC Telemetry & 99.9% SLA",
      role: "Network Engineer & NOC Operator",
      summary: "Continuous monitoring of link availability, traffic throughput, and node health across fiber, IP transit, and IPTV backbones.",
      problem: "Maintaining high visibility into backbone link flaps and bandwidth spikes to isolate incidents within minutes.",
      approach: "Deployed MRTG, Cacti, SolarWinds, and MikroTik Winbox to monitor interface rates, SFP optical levels, and packet drops.",
      result: "Integrated telemetry accelerated mean time to detect (MTTD) and guaranteed uptime SLAs for enterprise clients.",
      tools: ["MRTG", "Cacti", "SolarWinds", "Winbox", "SNMP"],
    },
    {
      id: "002",
      type: "FIBER / FIELD",
      icon: "◇",
      title: "Fiber Optic Field Recovery & Splicing",
      role: "Field Fiber Infrastructure",
      summary: "On-site troubleshooting from severe optical loss indicators to core fusion splicing inside optical joint closures.",
      problem: "Fiber cuts and critical attenuation (-25.9 dBm) required pinpoint fault location along physical cable routes.",
      approach: "Operated Yokogawa AQ1000 OTDR, Optical Power Meter, precision cleaver, and core-alignment fusion splicer on site.",
      result: "Validated optical recovery with attenuation restored to optimal levels (< -18 dBm) and splice loss under 0.05 dB.",
      tools: ["Yokogawa AQ1000", "Fusion Splicer", "OPM", "Joint Closure"],
    },
    {
      id: "003",
      type: "NETWORK / ROUTING",
      icon: "⌁",
      title: "MikroTik Routing & Firewall Architecture",
      role: "Routing, NAT & Security",
      summary: "Production RouterOS deployments aligned with MTCNA standards: 802.1Q VLANs, OSPF, NAT Mangle, QoS queues, and WireGuard.",
      problem: "Enterprise demand for strict departmental traffic isolation, QoS bandwidth guarantees, and encrypted remote interconnects.",
      approach: "Engineered 802.1Q VLAN trunking, OSPF routing, stateful firewall filters, and WireGuard cryptographic tunnels.",
      result: "Robust network posture with deterministic routing paths, zero packet congestion, and clean fault domain isolation.",
      tools: ["MikroTik CCR", "OSPF", "802.1Q VLAN", "WireGuard", "Firewall"],
    },
    {
      id: "004",
      type: "IPTV / MULTICAST",
      icon: "▣",
      title: "IPTV Headend & Multicast Operations",
      role: "NOC / Multicast Services",
      summary: "Operations, deployment, and performance optimization for ISP multicast digital IPTV streams and Linux server clusters.",
      problem: "Delivering high-definition broadcast video streams without flooding downstream switch access ports.",
      approach: "Configured IGMP Snooping, PIM-SM multicast routing, and real-time bandwidth supervision on interface vlan204.",
      result: "Flawless broadcast delivery with minimal latency, zero packet drops, and balanced core bandwidth utilization.",
      tools: ["IPTV", "IGMP Snooping", "PIM-SM", "Linux", "cPanel"],
    },
  ],
};

export default function Projects() {
  const { lang, t } = useLanguage();
  const projects = PROJECTS_DATA[lang] || PROJECTS_DATA.id;
  const isId = lang === "id";

  return (
    <section id="projects" className="projects-section">
      <div className="wrap">
        <p className="eyebrow">{t("proj_eyebrow")}</p>
        <div className="projects-heading">
          <div>
            <h2 className="sectitle">{t("proj_title")}</h2>
            <p className="section-note">{t("proj_note")}</p>
          </div>
          <div className="project-stat">
            <span>FIELD CASE</span>
            <strong>{String(projects.length).padStart(2, "0")}</strong>
            <small>{isId ? "proyek terdokumentasi" : "documented cases"}</small>
          </div>
        </div>
        <div className="projects-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.id}>
              <div className="project-card-top">
                <span className="project-id">CASE // {project.id}</span>
                <span className="project-type">{project.type}</span>
              </div>
              <div className="project-icon">{project.icon}</div>
              <h3>{project.title}</h3>
              <p className="project-role">{project.role}</p>
              <div className="project-line" />
              <p className="project-summary">{project.summary}</p>
              <div className="project-tags">
                {project.tools.map((tool) => (
                  <span className="tag" key={tool}>
                    {tool}
                  </span>
                ))}
              </div>
              <details className="project-details">
                <summary>
                  {isId ? "LIHAT DETAIL TEKNIS" : "VIEW TECHNICAL DETAILS"} <span>↗</span>
                </summary>
                <div className="case-body">
                  <div>
                    <b>{isId ? "TANTANGAN / MASALAH" : "CHALLENGE / PROBLEM"}</b>
                    <p>{project.problem}</p>
                  </div>
                  <div>
                    <b>{isId ? "METODOLOGI / PENDEKATAN" : "METHODOLOGY / APPROACH"}</b>
                    <p>{project.approach}</p>
                  </div>
                  <div>
                    <b>{isId ? "HASIL & DAMPAK OPERASIONAL" : "OUTCOME & IMPACT"}</b>
                    <p>{project.result}</p>
                  </div>
                </div>
              </details>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
