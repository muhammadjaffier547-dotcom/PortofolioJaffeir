"use client";

import { useState } from "react";
import { contact } from "../data/content";
import { useLanguage } from "../context/LanguageContext";

const WA_TEMPLATES = {
  id: [
    {
      icon: "💼",
      label: "Tawaran Kerja Full-Time",
      text: "Halo Jaffier, saya melihat portofolio Anda dan tertarik untuk mendiskusikan peluang kerja posisi Network Engineer / NOC Operator.",
    },
    {
      icon: "🛠️",
      label: "Proyek MikroTik / Server",
      text: "Halo Jaffier, saya membutuhkan jasa konfigurasi jaringan MikroTik / administrasi server Linux untuk kebutuhan infrastruktur.",
    },
    {
      icon: "⚡",
      label: "Splicing / Fiber Optic",
      text: "Halo Jaffier, apakah Anda tersedia untuk penanganan fiber optic (splicing / troubleshooting redaman OTDR) di lapangan?",
    },
    {
      icon: "☕",
      label: "Diskusi & Networking",
      text: "Halo Jaffier, salam kenal! Saya terkesan dengan portofolio Anda dan ingin terhubung untuk diskusi seputar dunia jaringan.",
    },
  ],
  en: [
    {
      icon: "💼",
      label: "Full-Time Opportunity",
      text: "Hello Jaffier, I came across your portfolio and would like to discuss a Network Engineer / NOC Operator opportunity.",
    },
    {
      icon: "🛠️",
      label: "MikroTik / Server Project",
      text: "Hello Jaffier, I need assistance with MikroTik network deployment / Linux server infrastructure setup.",
    },
    {
      icon: "⚡",
      label: "Fiber Optic Field Splicing",
      text: "Hello Jaffier, are you available for on-site fiber optic cable recovery or OTDR loss diagnostic work?",
    },
    {
      icon: "☕",
      label: "Tech Chat & Networking",
      text: "Hello Jaffier, pleasure connecting! I was impressed by your portfolio and would love to exchange insights on networking.",
    },
  ],
};

export default function Contact() {
  const { lang, t } = useLanguage();
  const templates = WA_TEMPLATES[lang] || WA_TEMPLATES.id;
  const [selectedIdx, setSelectedIdx] = useState(0);

  const selectedTemplate = templates[selectedIdx] || templates[0];
  const isId = lang === "id";

  const waUrl = `https://wa.me/6285893271662?text=${encodeURIComponent(
    selectedTemplate.text
  )}`;

  return (
    <section id="kontak">
      <div className="wrap">
        <p className="eyebrow">{t("contact_eyebrow")}</p>
        <h2 className="sectitle">{t("contact_title")}</h2>
        <div className="panel contact-panel">
          <p className="prompt">
            <span className="p1">operator@noc</span>:<span className="p2">~$</span>{" "}
            {isId ? "siap menerima pesan & kolaborasi_" : "ready for inquiries & dispatch_"}
          </p>

          <div className="contact-rows">
            <div className="crow">
              <span className="k">EMAIL</span>
              <a className="v" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </div>
            <div className="crow">
              <span className="k">{isId ? "TELEPON / WHATSAPP" : "PHONE / WHATSAPP"}</span>
              <a className="v" href={`tel:${contact.phoneHref}`}>
                {contact.phone}
              </a>
            </div>
            <div className="crow">
              <span className="k">{isId ? "LOKASI" : "LOCATION"}</span>
              <span className="v">{contact.location}</span>
            </div>
            <div className="crow">
              <span className="k">STATUS</span>
              <span className="v" style={{ color: "var(--teal)" }}>
                {isId
                  ? "Terbuka untuk peluang baru (Full-Time / Kontrak Proyek)"
                  : "Open to new opportunities (Full-Time / Contract Projects)"}
              </span>
            </div>
          </div>

          {/* Quick WhatsApp Template Selector */}
          <div className="contact-wa-builder">
            <div className="wa-builder-head">
              <span className="wa-builder-badge">
                {isId ? "PILIH TEMPLATE PESAN WHATSAPP" : "SELECT WHATSAPP MESSAGE PRESET"}
              </span>
              <p>
                {isId
                  ? "Pilih topik di bawah agar pesan WhatsApp terisi otomatis:"
                  : "Pick a topic below to auto-format your direct WhatsApp message:"}
              </p>
            </div>
            <div className="wa-template-grid">
              {templates.map((tmpl, idx) => (
                <button
                  key={tmpl.label}
                  type="button"
                  className={`wa-tmpl-btn ${
                    selectedIdx === idx ? "is-active" : ""
                  }`}
                  onClick={() => setSelectedIdx(idx)}
                >
                  <span className="wa-tmpl-icon">{tmpl.icon}</span>
                  <span className="wa-tmpl-label">{tmpl.label}</span>
                </button>
              ))}
            </div>
            <div className="wa-preview-box">
              <span className="wa-preview-tag">
                {isId ? "Pratinjau Pesan:" : "Message Preview:"}
              </span>
              <p>"{selectedTemplate.text}"</p>
            </div>
          </div>

          <div className="contact-cta">
            <a
              className="btn btn-primary"
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 {isId ? "Kirim via WhatsApp Langsung →" : "Send via WhatsApp Direct →"}
            </a>
            <a className="btn btn-ghost" href={`mailto:${contact.email}`}>
              ✉️ {isId ? "Kirim Email Biasa" : "Send Standard Email"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
