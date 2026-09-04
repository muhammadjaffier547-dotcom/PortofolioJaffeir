"use client";

import { useState } from "react";
import { contact } from "../data/content";

const WA_TEMPLATES = [
  {
    icon: "💼",
    label: "Tawaran Kerja Full-Time",
    text: "Halo Jaffier, saya melihat portofolio Anda dan tertarik untuk mendiskusikan tawaran kerja posisi Network Engineer / NOC Operator.",
  },
  {
    icon: "🛠️",
    label: "Proyek Setup MikroTik / Server",
    text: "Halo Jaffier, saya membutuhkan bantuan untuk instalasi dan konfigurasi jaringan MikroTik / Server Linux.",
  },
  {
    icon: "⚡",
    label: "Pekerjaan Splicing / Fiber Optic",
    text: "Halo Jaffier, apakah Anda bersedia untuk pekerjaan troubleshooting / penanganan kabel fiber optic di lapangan?",
  },
  {
    icon: "☕",
    label: "Diskusi & Networking Santai",
    text: "Halo Jaffier, salam kenal! Saya terkesan dengan portofolio Anda dan ingin terhubung untuk berdiskusi seputar networking.",
  },
];

export default function Contact() {
  const [selectedTemplate, setSelectedTemplate] = useState(WA_TEMPLATES[0]);

  const waUrl = `https://wa.me/6285893271662?text=${encodeURIComponent(
    selectedTemplate.text
  )}`;

  return (
    <section id="kontak">
      <div className="wrap">
        <p className="eyebrow">08 · Buka Koneksi</p>
        <h2 className="sectitle">Kontak</h2>
        <div className="panel contact-panel">
          <p className="prompt">
            <span className="p1">operator@noc</span>:<span className="p2">~$</span>{" "}
            siap menerima pesan baru_
          </p>

          <div className="contact-rows">
            <div className="crow">
              <span className="k">EMAIL</span>
              <a className="v" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </div>
            <div className="crow">
              <span className="k">TELEPON / WHATSAPP</span>
              <a className="v" href={`tel:${contact.phoneHref}`}>
                {contact.phone}
              </a>
            </div>
            <div className="crow">
              <span className="k">LOKASI</span>
              <span className="v">{contact.location}</span>
            </div>
            <div className="crow">
              <span className="k">STATUS</span>
              <span className="v" style={{ color: "var(--teal)" }}>
                Terbuka untuk peluang baru (Full-Time / Proyek)
              </span>
            </div>
          </div>

          {/* Quick WhatsApp Template Selector */}
          <div className="contact-wa-builder">
            <div className="wa-builder-head">
              <span className="wa-builder-badge">PILIH TOPIK PESAN CEPAT</span>
              <p>Pilih template di bawah agar pesan WhatsApp otomatis terketik rapi:</p>
            </div>
            <div className="wa-template-grid">
              {WA_TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl.label}
                  type="button"
                  className={`wa-tmpl-btn ${
                    selectedTemplate.label === tmpl.label ? "is-active" : ""
                  }`}
                  onClick={() => setSelectedTemplate(tmpl)}
                >
                  <span className="wa-tmpl-icon">{tmpl.icon}</span>
                  <span className="wa-tmpl-label">{tmpl.label}</span>
                </button>
              ))}
            </div>
            <div className="wa-preview-box">
              <span className="wa-preview-tag">Pratinjau Pesan:</span>
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
              💬 Kirim via WhatsApp Langsung →
            </a>
            <a className="btn btn-ghost" href={`mailto:${contact.email}`}>
              ✉️ Kirim Email Biasa
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
