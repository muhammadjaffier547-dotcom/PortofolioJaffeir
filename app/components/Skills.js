"use client";

import { useLanguage } from "../context/LanguageContext";

const SKILL_GROUPS = {
  id: [
    {
      title: "Jaringan & Protokol Routing",
      chips: [
        "MikroTik (RouterOS)",
        "Cisco Basic Config",
        "Routing Static & Dynamic",
        "RIP",
        "EIGRP",
        "OSPF",
        "802.1Q VLAN",
        "Spanning-Tree (RSTP)",
        "Etherchannel (LACP)",
        "NAT & Mangle",
        "Firewall Filter",
        "Wireless Outdoor",
      ],
    },
    {
      title: "Monitoring & NOC Telemetry",
      chips: [
        "MRTG",
        "Cacti",
        "The Dude",
        "SolarWinds Orion",
        "NMS-SolarWinds",
        "FortiManager",
        "SNMP Telemetry",
        "Winbox Diagnostics",
      ],
    },
    {
      title: "Server & Sistem Administrasi",
      chips: [
        "Linux Fundamental",
        "Apache",
        "Nginx",
        "Samba File Server",
        "DNS BIND9",
        "DHCP Server",
        "FTP Server",
        "OpenVPN",
        "Windows Server",
      ],
    },
    {
      title: "Infrastruktur Fiber & Keamanan",
      chips: [
        "Fusion Splicing",
        "Yokogawa OTDR",
        "OPM (Power Meter)",
        "OFI (Fiber Identifier)",
        "WireGuard VPN",
        "2FA / TOTP",
        "KeePassXC",
        "cPanel & DNS",
        "WordPress Admin",
      ],
    },
  ],
  en: [
    {
      title: "Networks & Routing Protocols",
      chips: [
        "MikroTik (RouterOS)",
        "Cisco Basic Config",
        "Static & Dynamic Routing",
        "RIP",
        "EIGRP",
        "OSPF",
        "802.1Q VLAN",
        "Spanning-Tree (RSTP)",
        "Etherchannel (LACP)",
        "NAT & Mangle",
        "Firewall Filter",
        "Wireless Outdoor",
      ],
    },
    {
      title: "NOC Telemetry & Monitoring",
      chips: [
        "MRTG",
        "Cacti",
        "The Dude",
        "SolarWinds Orion",
        "NMS-SolarWinds",
        "FortiManager",
        "SNMP Telemetry",
        "Winbox Diagnostics",
      ],
    },
    {
      title: "Systems & Linux Administration",
      chips: [
        "Linux Fundamentals",
        "Apache Web Server",
        "Nginx Reverse Proxy",
        "Samba File Server",
        "DNS BIND9",
        "DHCP Server",
        "FTP Server",
        "OpenVPN",
        "Windows Server",
      ],
    },
    {
      title: "Fiber Infrastructure & Security",
      chips: [
        "Fusion Splicing",
        "Yokogawa AQ1000 OTDR",
        "Optical Power Meter (OPM)",
        "Optical Fiber Identifier",
        "WireGuard VPN",
        "2FA / TOTP Architecture",
        "KeePassXC Vaults",
        "cPanel Hosting",
        "WordPress Admin",
      ],
    },
  ],
};

const icons = ["⌁", "◉", "⌘", "◇"];

export default function Skills() {
  const { lang, t } = useLanguage();
  const groups = SKILL_GROUPS[lang] || SKILL_GROUPS.id;
  const isId = lang === "id";

  const totalSkills = groups.reduce((acc, g) => acc + g.chips.length, 0);

  return (
    <section id="keahlian">
      <div className="wrap">
        <p className="eyebrow">{t("skills_eyebrow")}</p>
        <div className="skills-heading">
          <div>
            <h2 className="sectitle">{t("skills_title")}</h2>
            <p className="section-note">{t("skills_note")}</p>
          </div>
          <div className="skills-stat">
            <span>TOOLS</span>
            <strong>{totalSkills}</strong>
            <small>{isId ? "keahlian tercatat" : "verified proficiencies"}</small>
          </div>
        </div>
        <div className="skill-grid bento">
          {groups.map((group, index) => (
            <div
              className={`panel skill-card ${
                index === 0 ? "skill-card-featured" : ""
              }`}
              key={group.title}
            >
              <div className="skill-card-head">
                <div className="skill-icon">{icons[index]}</div>
                <div>
                  <span className="skill-number">0{index + 1}</span>
                  <h3>{group.title}</h3>
                </div>
                <span className="skill-count">
                  {String(group.chips.length).padStart(2, "0")}
                </span>
              </div>
              <div className="skill-chips">
                {group.chips.map((chip) => (
                  <span className="chip" key={chip}>
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
