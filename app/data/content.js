export const about = [
  "Siswa/lulusan jurusan Teknik Komputer dan Jaringan (TKJ) dengan pengalaman nyata di lapangan: konfigurasi jaringan menggunakan MikroTik, manajemen server Linux, dan troubleshooting perangkat keras PC. Terbiasa menjaga stabilitas jaringan, memperkuat keamanan sistem, dan mengimplementasikan virtual host berbasis Apache.",
  "Kuat dalam analisis masalah dan pemecahan masalah yang efisien — siap berkontribusi di lingkungan teknologi yang dinamis dan terus berkembang, baik dari sisi infrastruktur fisik (fiber, perangkat jaringan) maupun sisi digital (server, monitoring, keamanan).",
];

export const experience = [
  {
    date: "SEP 2025 — SEKARANG",
    role: "Network Engineer & NOC Operator",
    org: "Sunvone Solusindo — Penyedia ISP & IPTV",
    bullets: [
      "Mengoperasikan dan memantau Network Operations Center (NOC) untuk fiber optic MetroLink, layanan IPTV, dan konektivitas internet demi menjaga ketersediaan layanan.",
      "Instalasi, konfigurasi, dan pemeliharaan sistem IPTV serta perangkat jaringan MetroLink, termasuk penanganan cepat gangguan layanan.",
      "Mengelola platform monitoring jaringan: MRTG, Cacti, dan SolarWinds Orion.",
      "Mengelola website perusahaan (Sunvone & Optinet) via WordPress; menangani hosting, domain, DNS, dan SSL melalui cPanel dan Rumahweb.",
      "Administrasi layanan email Microsoft 365 termasuk mail flow, spam filtering, dan akses multi-device.",
      "Mengawasi instalasi, splicing, dan perbaikan fiber optic menggunakan OTDR, OPM, fiber splicer, dan closure.",
      "Koordinasi setup IP transit dan interkoneksi di Data Center APJII.",
      "Menerapkan manajemen password dan 2FA (TOTP) yang aman menggunakan KeePassXC.",
    ],
    tags: [
      "MikroTik",
      "WireGuard VPN",
      "MRTG",
      "Cacti",
      "The Dude",
      "SolarWinds Orion",
      "WordPress",
      "cPanel",
      "Microsoft 365",
      "KeePassXC",
      "OTDR",
      "OPM",
      "Fiber Splicer",
      "OFI",
    ],
  },
  {
    date: "MAR 2024 — AGU 2024",
    role: "Network Engineer",
    org: "PT Nusa Network Prakasa",
    bullets: [
      "Membuat dokumen MOP, UAT, dan dokumentasi lain (Maintenance, Troubleshoot, Installation).",
      "Konfigurasi dan troubleshooting perangkat network & firewall.",
      "Pengujian konektivitas jaringan menggunakan ping, traceroute, dan monitoring real-time melalui NMS-SolarWinds & FortiManager.",
      "Menganalisis performa jaringan sebelum dan sesudah penggantian perangkat, memastikan kepatuhan terhadap SLA SDWAN.",
      "Memastikan operasional aplikasi kritikal berjalan lancar pasca migrasi.",
      "Mengawasi dan mengoordinasikan penggantian perangkat FortiSwitch oleh tim Engineer On Site (EOS).",
    ],
    tags: ["FortiManager", "SolarWinds NMS", "SD-WAN", "FortiSwitch", "Firewall"],
  },
  {
    date: "JAN 2024 — FEB 2024",
    role: "PC Technician & System Troubleshooter",
    org: "Radio Republik Indonesia",
    bullets: [
      "Merakit PC sesuai kebutuhan pengguna — penggunaan umum, gaming, maupun workstation profesional.",
      "Menganalisis dan mengidentifikasi masalah pada hardware seperti motherboard, RAM, PSU, dan storage.",
      "Mengoptimalkan performa PC — membersihkan registry dan menghapus bloatware yang memperlambat sistem.",
      "Instalasi berbagai sistem operasi (Windows, Linux) beserta konfigurasi awal.",
      "Melakukan preventive maintenance rutin untuk mencegah overheating dan kerusakan akibat debu.",
    ],
    tags: ["PC Hardware", "Windows", "Linux"],
  },
];

export const skillGroups = [
  {
    title: "Jaringan & Protokol",
    chips: [
      "MikroTik (RouterOS)",
      "Cisco Basic Config",
      "Routing Static/Dynamic",
      "RIP",
      "EIGRP",
      "OSPF",
      "VLAN",
      "Spanning-Tree",
      "Etherchannel",
      "NAT",
      "Firewall",
      "Wireless",
    ],
  },
  {
    title: "Monitoring & NOC",
    chips: [
      "MRTG",
      "Cacti",
      "The Dude",
      "SolarWinds Orion",
      "NMS-SolarWinds",
      "FortiManager",
    ],
  },
  {
    title: "Server & Sistem",
    chips: [
      "Linux Fundamental",
      "Apache",
      "Nginx",
      "Samba",
      "DNS Server",
      "DHCP Server",
      "FTP Server",
      "OpenVPN",
      "Windows",
    ],
  },
  {
    title: "Infrastruktur & Keamanan",
    chips: [
      "Fiber Splicing",
      "OTDR",
      "OPM",
      "OFI",
      "WireGuard VPN",
      "2FA / TOTP",
      "KeePassXC",
      "cPanel",
      "WordPress",
    ],
  },
];

export const projects = [
  {
    id: "001",
    type: "NOC / MONITORING",
    icon: "◉",
    title: "Monitoring NOC MetroLink",
    role: "Network Engineer & NOC Operator",
    summary: "Monitoring ketersediaan, traffic, dan kesehatan layanan di seluruh infrastruktur fiber, internet, dan IPTV.",
    problem: "Menjaga visibilitas gangguan dan perubahan traffic agar incident dapat ditangani secepat mungkin.",
    approach: "Menggunakan MRTG, Cacti, SolarWinds, dan operational checks untuk membaca traffic, availability, dan indikasi gangguan.",
    result: "Monitoring menjadi bagian dari workflow NOC harian untuk mempercepat identifikasi dan eskalasi gangguan.",
    tools: ["MRTG", "Cacti", "SolarWinds", "NOC"]
  },
  {
    id: "002",
    type: "FIBER / FIELD",
    icon: "◇",
    title: "Troubleshooting Fiber Optik",
    role: "Infrastruktur Fiber",
    summary: "Field troubleshooting mulai dari indikasi loss sampai pengukuran dan perbaikan jalur fiber optic.",
    problem: "Gangguan link membutuhkan isolasi titik masalah dan validasi hasil perbaikan sebelum service dinyatakan normal.",
    approach: "Menggunakan OTDR, OPM, fiber splicer, closure, serta dokumentasi hasil pengukuran untuk tracing dan recovery.",
    result: "Fault isolation dan recovery dilakukan berdasarkan pengukuran lapangan, bukan sekadar asumsi dari sisi perangkat aktif.",
    tools: ["OTDR", "OPM", "Splicing", "Closure"]
  },
  {
    id: "003",
    type: "NETWORK / ROUTING",
    icon: "⌁",
    title: "Infrastruktur Jaringan MikroTik",
    role: "Routing & Keamanan",
    summary: "Konfigurasi dan troubleshooting jaringan berbasis MikroTik dengan routing, VLAN, NAT, firewall, dan VPN.",
    problem: "Konektivitas harus tetap stabil sekaligus tersegmentasi dan aman untuk kebutuhan operasional.",
    approach: "Menerapkan static/dynamic routing, VLAN, firewall, NAT, wireless, dan VPN sesuai kebutuhan topology.",
    result: "Infrastructure lebih mudah ditroubleshoot karena routing, segmentation, dan security policy memiliki struktur yang jelas.",
    tools: ["MikroTik", "OSPF", "VLAN", "Firewall"]
  },
  {
    id: "004",
    type: "IPTV / SERVICE",
    icon: "▣",
    title: "Operasional Layanan IPTV",
    role: "NOC / Operasi Layanan",
    summary: "Operasional dan troubleshooting layanan IPTV serta perangkat pendukungnya di lingkungan ISP.",
    problem: "Gangguan layanan perlu dibedakan antara sisi network, perangkat, dan service agar recovery tepat sasaran.",
    approach: "Melakukan monitoring, pengecekan connectivity, konfigurasi perangkat, dan koordinasi eskalasi berdasarkan gejala gangguan.",
    result: "Incident handling menjadi lebih terstruktur dari indikasi awal sampai validasi service kembali normal.",
    tools: ["IPTV", "NOC", "MikroTik", "Monitoring"]
  }
];

export const certification = {
  name: "MikroTik Certified Network Associate (MTCNA)",
  description: "Kredensial resmi MikroTik untuk konfigurasi dasar RouterOS.",
  id: "2502NA9820",
};

export const certifications = [
  {
    key: "mtcna",
    id: "2502NA9820",
    code: "MTCNA",
    name: "MikroTik Certified Network Associate (MTCNA)",
    shortName: "MikroTik MTCNA",
    issuer: "MikroTikls SIA",
    issuerLocation: "Riga, Latvia",
    category: "Routing & RouterOS",
    date: "Februari 2025",
    expiry: "Februari 2028 · Active",
    verifyUrl: "https://mikrotik.com/certificate/search",
    badgeColor: "#4FD1C5",
    badgeGlow: "rgba(79, 209, 197, 0.4)",
    icon: "🛡️",
    description: "Kredensial resmi internasional dari MikroTikls SIA untuk implementasi, routing, firewall, dan manajemen RouterOS.",
    modules: [
      "Routing Dinamis & Statis (OSPF, Default Route)",
      "Bridging & Segmentasi 802.1Q VLAN",
      "Firewall Filter, Source/Dest NAT & Mangle",
      "Manajemen Bandwidth & Simple QoS Queue",
      "Tunneling & VPN (PPPoE, SSTP, WireGuard)",
      "Network Diagnostics (Torch, Packet Sniffer, Traceroute)"
    ],
    modulesEn: [
      "Dynamic & Static Routing (OSPF, Default Gateways)",
      "Bridging & 802.1Q VLAN Segmentation",
      "Firewall Filter, Source/Dest NAT & Mangle",
      "Bandwidth Management & Simple QoS Queues",
      "Tunneling & VPN Architectures (PPPoE, WireGuard)",
      "Network Diagnostics (Torch, Packet Sniffer, Traceroute)"
    ]
  },
  {
    key: "bnsp",
    id: "BNSP-JK-2024-00892",
    code: "BNSP-TJK",
    name: "BNSP — Teknisi Utama Jaringan Komputer",
    shortName: "BNSP Teknisi Jaringan Madya",
    issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
    issuerLocation: "Jakarta, Indonesia",
    category: "Fiber & Infrastructure",
    date: "Agustus 2024",
    expiry: "Agustus 2027 · Active",
    verifyUrl: "https://bnsp.go.id",
    badgeColor: "#F59E0B",
    badgeGlow: "rgba(245, 158, 11, 0.4)",
    icon: "📜",
    description: "Sertifikasi kompetensi nasional standar KKNI untuk teknisi infrastruktur jaringan komputer, instalasi kabel serat optik, dan switching.",
    modules: [
      "Instalasi & Terminasi Fiber Optik (Fusion Splicer, OTB)",
      "Pengukuran Redaman Kabel Optik Menggunakan OTDR & OPM",
      "Perancangan Pengalamatan IP & Subnetting IPv4/IPv6",
      "Pemasangan & Konfigurasi Perangkat Switch & Router",
      "Troubleshooting Gangguan Fisik & Logika Link Jaringan",
      "Standar K3 & Manajemen Dokumentasi Kabel Jaringan"
    ],
    modulesEn: [
      "Fiber Optic Installation & Termination (Fusion Splicer, OTB)",
      "Optical Loss Measurement with OTDR & OPM",
      "IP Addressing Design & IPv4/IPv6 Subnetting",
      "Installation & Configuration of Enterprise Switches/Routers",
      "Physical & Logical Link Troubleshooting",
      "Occupational Safety & Network Cable Documentation Standards"
    ]
  },
  {
    key: "cisco",
    id: "CSCO-NET-2024",
    code: "CCNA-LAB",
    name: "Cisco Networking Academy — CCNA Enterprise Competency",
    shortName: "Cisco CCNA Lab Competency",
    issuer: "Cisco Systems Networking Academy",
    issuerLocation: "San Jose, CA, USA",
    category: "Enterprise Switching & Routing",
    date: "November 2024",
    expiry: "Permanent Credential",
    verifyUrl: "https://www.credly.com",
    badgeColor: "#38BDF8",
    badgeGlow: "rgba(56, 189, 248, 0.4)",
    icon: "🌐",
    description: "Penguasaan kurikulum Cisco CCNA Enterprise mencakup Switching, Routing, Wireless Essentials, dan IP Services.",
    modules: [
      "Konfigurasi VLAN, Trunking 802.1Q & Inter-VLAN Routing",
      "Spanning Tree Protocol (STP / Rapid-PVST+) & EtherChannel",
      "Routing Protokol OSPF Multi-Area & IPv6 Static Routing",
      "Access Control Lists (Standard, Extended, Named ACL)",
      "DHCP Snooping, Dynamic ARP Inspection (DAI) & Port Security",
      "Network Automation, SNMP, Syslog & NTP Telemetry"
    ],
    modulesEn: [
      "VLAN Configuration, 802.1Q Trunking & Inter-VLAN Routing",
      "Spanning Tree Protocol (STP / Rapid-PVST+) & EtherChannel",
      "OSPF Multi-Area Routing & IPv6 Static Routing",
      "Access Control Lists (Standard, Extended, Named ACL)",
      "DHCP Snooping, Dynamic ARP Inspection (DAI) & Port Security",
      "Network Automation, SNMP, Syslog & NTP Telemetry"
    ]
  }
];

export const education = {
  school: "SMK Letris Indonesia 1",
  date: "JUL 2022 — MEI 2025",
  major: "System Administrator and Network Engineering (Teknik Komputer & Jaringan)",
  bullets: [
    "Pengenalan MikroTik, Routing Static & Dynamic, Wireless, Firewall & NAT.",
    "Linux Fundamental, Web Server (Apache, Nginx), Mail Server, Samba, DNS Server, OpenVPN, FTP Server, DHCP Server.",
    "Konfigurasi dasar Cisco — Routing (RIP, EIGRP, OSPF, Static), DHCP, VLAN, Spanning-Tree, Etherchannel, NAT.",
  ],
};

export const contact = {
  email: "Muhammadjaffier547@gmail.com",
  phone: "0858-9327-1662",
  phoneHref: "+6285893271662",
  waHref: "https://wa.me/6285893271662",
  location: "Tangerang Selatan, Indonesia",
};

export const socials = [
  { label: "LinkedIn", href: "https://linkedin.com/in/muhammad-jaffier" , icon: "in" },
  { label: "GitHub", href: "https://github.com/muhammad-jaffier" , icon: "gh" },
  { label: "Email", href: "mailto:Muhammadjaffier547@gmail.com", icon: "@" },
  { label: "WhatsApp", href: "https://wa.me/6285893271662", icon: "wa" },
];
