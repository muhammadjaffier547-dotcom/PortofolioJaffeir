"use client";

import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext({
  lang: "id",
  setLang: () => {},
  toggleLang: () => {},
  t: (key) => key,
});

export const TRANSLATIONS = {
  id: {
    // Nav
    nav_about: "Tentang",
    nav_experience: "Pengalaman",
    nav_projects: "Proyek",
    nav_field: "Dokumentasi",
    nav_topology: "Topologi",
    nav_tools: "Tools",
    nav_skills: "Keahlian",
    nav_cert: "Sertifikasi",
    nav_contact: "Kontak",

    // Hero
    hero_greeting: "Halo, saya",
    hero_role: "Network Engineer & NOC Operator",
    hero_desc:
      "Spesialisasi konfigurasi MikroTik RouterOS (MTCNA), troubleshooting fiber optic di lapangan (splicing & OTDR), manajemen server Linux, dan pengawasan operasional jaringan 24/7.",
    hero_cta_projects: "Jelajahi Proyek",
    hero_cta_contact: "Hubungi Saya",
    hero_cta_tools: "Tools Jaringan",
    hero_status: "TERSEDIA UNTUK PELUANG KERJA",
    hero_uptime_label: "UPTIME KARIR",
    hero_uptime_sub: "sejak mulai terjun ke dunia IT & Jaringan",

    // Terminal
    term_bar_title: "jaffier@noc-terminal: ~ (sh)",
    term_help_hint: "Ketik 'help' untuk melihat perintah jaringan (ping, traceroute, route, otdr)",

    // About
    about_eyebrow: "01 · Profil",
    about_title: "Tentang Saya",
    about_stats_role: "FOKUS SPESIALISASI",
    about_stats_role_val: "NOC & Infra Fiber",
    about_stats_certs: "SERTIFIKASI RESMI",
    about_stats_certs_val: "MikroTik MTCNA",
    about_stats_location: "DOMISILI",
    about_stats_location_val: "Tangerang Selatan, ID",

    // Experience
    exp_eyebrow: "02 · Rekam Jejak",
    exp_title: "Pengalaman Kerja",
    exp_note: "Pengalaman operasional nyata di bidang ISP, pemeliharaan NOC, dan infrastruktur enterprise.",

    // Projects
    proj_eyebrow: "03 · Portofolio Teknis",
    proj_title: "Studi Kasus & Proyek",
    proj_note: "Implementasi teknis mencakup arsitektur routing MikroTik, deployment IPTV, dan penanganan insiden link fiber optik.",
    proj_tab_problem: "Masalah",
    proj_tab_approach: "Pendekatan",
    proj_tab_result: "Hasil",

    // Gallery
    gallery_eyebrow: "04 · Bukti Lapangan",
    gallery_title: "Dokumentasi & Log Lapangan",
    gallery_note: "Rekam jejak fisik pekerjaan nyata: instalasi switch korporat hotel, rack data center, penyambungan fusion splicer, dan pengukuran OTDR.",

    // Topology
    topo_eyebrow: "05 · Arsitektur Jaringan",
    topo_title: "Topologi Jaringan NOC Interaktif",
    topo_note: "Diagram arsitektur interkoneksi MetroLink Sunvone: Peering APJII OpenIXP, Core Router MikroTik CCR2004, High-Density ODF, dan VLAN Distribusi.",
    topo_click_hint: "Klik salah satu perangkat / node untuk melihat konfigurasi IP, VLAN, dan protokol teknis.",
    topo_inspector_title: "Detail Perangkat & Status Link",

    // Tools
    tools_eyebrow: "06 · Toolset Lapangan",
    tools_title: "Kalkulator & Utilitas Jaringan",
    tools_note: "Alat bantu interaktif untuk perhitungan subnetting IPv4/CIDR dan estimasi redaman link kabel fiber optic.",
    tools_tab_subnet: "🧮 Kalkulator Subnet & CIDR",
    tools_tab_fiber: "⚡ Kalkulator Redaman Fiber Optik",

    // Skills
    skills_eyebrow: "07 · Toolset",
    skills_title: "Keahlian Teknis",
    skills_note: "Perangkat praktis meliputi routing, monitoring NOC, layanan Linux, infrastruktur fiber, dan keamanan.",

    // Certification
    cert_eyebrow: "08 · Validasi Resmi",
    cert_title: "Sertifikasi Profesional",
    cert_note: "Kredensial kompetensi jaringan berstandar internasional yang terverifikasi.",
    cert_btn_detail: "Lihat Detail Kredensial ↗",

    // Education
    edu_eyebrow: "09 · Pendidikan",
    edu_title: "Latar Belakang Pendidikan",

    // Contact
    contact_eyebrow: "10 · Terhubung",
    contact_title: "Hubungi Saya",
    contact_note: "Terbuka untuk posisi Network Engineer, NOC Operator, System Administrator, maupun proyek infrastruktur.",
    contact_wa_builder: "Kirim Pesan Cepat via WhatsApp",

    // Footer
    footer_built: "Dibuat dengan Next.js 16 & Turbopack. Dirancang untuk kinerja tinggi dan monitoring NOC.",
  },
  en: {
    // Nav
    nav_about: "About",
    nav_experience: "Experience",
    nav_projects: "Projects",
    nav_field: "Field Logs",
    nav_topology: "Topology",
    nav_tools: "Tools",
    nav_skills: "Skills",
    nav_cert: "Certification",
    nav_contact: "Contact",

    // Hero
    hero_greeting: "Hello, I am",
    hero_role: "Network Engineer & NOC Operator",
    hero_desc:
      "Specializing in MikroTik RouterOS configuration (MTCNA), on-site fiber optic troubleshooting (fusion splicing & OTDR), Linux server administration, and 24/7 high-availability infrastructure monitoring.",
    hero_cta_projects: "Explore Projects",
    hero_cta_contact: "Get in Touch",
    hero_cta_tools: "Network Tools",
    hero_status: "AVAILABLE FOR ROLES & CONTRACTS",
    hero_uptime_label: "CAREER UPTIME",
    hero_uptime_sub: "since starting journey in IT & Networking",

    // Terminal
    term_bar_title: "jaffier@noc-terminal: ~ (sh)",
    term_help_hint: "Type 'help' to inspect network commands (ping, traceroute, route, otdr)",

    // About
    about_eyebrow: "01 · Overview",
    about_title: "About Me",
    about_stats_role: "SPECIALIZATION",
    about_stats_role_val: "NOC & Fiber Infra",
    about_stats_certs: "VERIFIED CERT",
    about_stats_certs_val: "MikroTik MTCNA",
    about_stats_location: "LOCATION",
    about_stats_location_val: "South Tangerang, ID",

    // Experience
    exp_eyebrow: "02 · Track Record",
    exp_title: "Work Experience",
    exp_note: "Hands-on operational experience across ISP environments, NOC maintenance, and enterprise infrastructure.",

    // Projects
    proj_eyebrow: "03 · Technical Portfolio",
    proj_title: "Case Studies & Projects",
    proj_note: "Technical deployments covering MikroTik routing architectures, IPTV headends, and fiber optic link incident recovery.",
    proj_tab_problem: "Problem",
    proj_tab_approach: "Approach",
    proj_tab_result: "Result",

    // Gallery
    gallery_eyebrow: "04 · Field Proof",
    gallery_title: "Documentation & Field Logs",
    gallery_note: "Physical evidence of real work: corporate hotel switch installations, data center racks, fusion splicing, and OTDR testing.",

    // Topology
    topo_eyebrow: "05 · Architecture",
    topo_title: "Interactive NOC Network Topology",
    topo_note: "Architecture diagram of Sunvone MetroLink: APJII OpenIXP Peering, MikroTik CCR2004 Core Router, High-Density ODF, and VLAN Distribution.",
    topo_click_hint: "Click on any node to view configured IP subnets, VLAN IDs, and technical protocol details.",
    topo_inspector_title: "Node Specifications & Link Telemetry",

    // Tools
    tools_eyebrow: "06 · Engineering Tools",
    tools_title: "Network Utilities & Calculators",
    tools_note: "Interactive utilities for IPv4 CIDR subnetting and optical power loss budget estimations.",
    tools_tab_subnet: "🧮 Subnet & CIDR Calculator",
    tools_tab_fiber: "⚡ Fiber Optic Loss Budget Calc",

    // Skills
    skills_eyebrow: "07 · Toolset",
    skills_title: "Technical Stack",
    skills_note: "Practical toolset spanning dynamic routing, NOC monitoring platforms, Linux services, fiber optics, and cybersecurity.",

    // Certification
    cert_eyebrow: "08 · Credentials",
    cert_title: "Professional Certification",
    cert_note: "International industry-standard network competency credential, independently verifiable.",
    cert_btn_detail: "View Credential Details ↗",

    // Education
    edu_eyebrow: "09 · Education",
    edu_title: "Educational Background",

    // Contact
    contact_eyebrow: "10 · Connect",
    contact_title: "Get in Touch",
    contact_note: "Open to Network Engineer, NOC Operator, System Administrator opportunities and enterprise infrastructure projects.",
    contact_wa_builder: "Instant Message via WhatsApp",

    // Footer
    footer_built: "Crafted with Next.js 16 & Turbopack. Engineered for high performance and active NOC monitoring.",
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("id");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio_lang");
      if (saved === "id" || saved === "en") {
        setLangState(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const setLang = (nextLang) => {
    setLangState(nextLang);
    try {
      localStorage.setItem("portfolio_lang", nextLang);
    } catch {
      // ignore
    }
  };

  const toggleLang = () => {
    setLang(lang === "id" ? "en" : "id");
  };

  const t = (key) => {
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS.id?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
