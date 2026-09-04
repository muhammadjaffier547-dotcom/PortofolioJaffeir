"use client";

import { useLanguage } from "../context/LanguageContext";

const EDUCATION_DATA = {
  id: {
    school: "SMK Letris Indonesia 1",
    date: "JUL 2022 — MEI 2025",
    major: "Teknik Komputer & Jaringan (Computer & Network Engineering)",
    bullets: [
      "Arsitektur MikroTik RouterOS, Routing Dinamis (OSPF, RIP, EIGRP), Wireless, Firewall Filter & NAT.",
      "Administrasi Linux: Web Server (Apache, Nginx), Mail Server, Samba, DNS Server BIND9, OpenVPN, FTP, dan DHCP Server.",
      "Konfigurasi dasar Cisco: Routing, DHCP, 802.1Q VLAN, Spanning-Tree (STP/RSTP), Etherchannel (LACP), dan NAT.",
    ],
  },
  en: {
    school: "SMK Letris Indonesia 1",
    date: "JUL 2022 — MAY 2025",
    major: "Computer & Network Engineering (TKJ)",
    bullets: [
      "MikroTik RouterOS architecture, Dynamic Routing (OSPF, RIP, EIGRP), Wireless Infrastructure, Stateful Firewall Filter & NAT.",
      "Linux Server Administration: Web Servers (Apache, Nginx), Mail Flow, Samba Storage, BIND9 DNS, OpenVPN, FTP, and DHCP Daemons.",
      "Cisco Networking Fundamentals: Routing, DHCP, 802.1Q VLANs, Spanning-Tree (STP/RSTP), Etherchannel (LACP), and NAT Overload.",
    ],
  },
};

export default function Education() {
  const { lang, t } = useLanguage();
  const edu = EDUCATION_DATA[lang] || EDUCATION_DATA.id;

  return (
    <section id="pendidikan">
      <div className="wrap">
        <p className="eyebrow">{t("edu_eyebrow")}</p>
        <h2 className="sectitle">{t("edu_title")}</h2>
        <div className="panel edu-card">
          <div className="edu-head">
            <h3>{edu.school}</h3>
            <span className="edu-date">{edu.date}</span>
          </div>
          <p className="edu-major">{edu.major}</p>
          <ul>
            {edu.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
