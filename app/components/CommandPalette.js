"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { contact } from "../data/content";

const COMMANDS = [
  { id: "terminal", icon: "⚡", title: "Terminal Interaktif", category: "Eksplorasi", action: "#terminal" },
  { id: "tentang", icon: "👤", title: "Tentang Jaffier", category: "Profil", action: "#tentang" },
  { id: "pengalaman", icon: "💼", title: "Pengalaman Kerja & NOC", category: "Karir", action: "#pengalaman" },
  { id: "proyek", icon: "🚀", title: "Studi Kasus Proyek", category: "Proyek", action: "#projects" },
  { id: "dokumentasi", icon: "📸", title: "Galeri Foto Lapangan (Data Center & OTDR)", category: "Bukti Kerja", action: "#dokumentasi" },
  { id: "keahlian", icon: "🛠️", title: "Daftar Keahlian & Tools", category: "Skillset", action: "#keahlian" },
  { id: "kalkulator", icon: "📊", title: "Kalkulator Redaman Fiber Optik", category: "Tool Interaktif", action: "#keahlian" },
  { id: "sertifikasi", icon: "🏅", title: "Sertifikat MikroTik MTCNA", category: "Kredensial", action: "#sertifikasi" },
  { id: "pendidikan", icon: "🎓", title: "Riwayat Pendidikan", category: "Pendidikan", action: "#pendidikan" },
  { id: "kontak", icon: "💬", title: "Hubungi via WhatsApp", category: "Kontak", action: "#kontak" },
  { id: "cv", icon: "📄", title: "Unduh Berkas CV (PDF)", category: "Dokumen", url: "/cv-jaffier.pdf" },
  { id: "email", icon: "✉️", title: `Salin Email (${contact.email})`, category: "Kontak", copy: contact.email },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  // Toggle on Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };

    const handleCustomOpen = () => setOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-cmd-palette", handleCustomOpen);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-cmd-palette", handleCustomOpen);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setActiveIdx(0);
      setQuery("");
    }
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMMANDS;
    return COMMANDS.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    );
  }, [query]);

  const execute = (item) => {
    if (!item) return;
    if (item.copy) {
      navigator.clipboard?.writeText(item.copy);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setOpen(false);
      }, 700);
      return;
    }
    if (item.url) {
      window.open(item.url, "_blank");
      setOpen(false);
      return;
    }
    if (item.action) {
      const el = document.querySelector(item.action);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      setOpen(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[activeIdx]) {
        execute(filtered[activeIdx]);
      }
    }
  };

  if (!open) return null;

  return (
    <div
      className="cmd-palette-backdrop"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="cmd-palette-modal panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cmd-search-wrap">
          <span className="cmd-search-icon">⌘</span>
          <input
            ref={inputRef}
            type="text"
            className="cmd-search-input"
            placeholder="Cari bagian, buka proyek, unduh CV, atau salin kontak..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIdx(0);
            }}
            onKeyDown={onKeyDown}
            aria-label="Cari perintah"
          />
          <span className="cmd-esc-tag">ESC</span>
        </div>

        {copied && (
          <div className="cmd-copied-banner">
            ✔ Email berhasil disalin ke clipboard!
          </div>
        )}

        <div className="cmd-list" role="listbox">
          {filtered.length === 0 ? (
            <div className="cmd-empty">Tidak ada perintah yang cocok.</div>
          ) : (
            filtered.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                className={`cmd-item ${activeIdx === idx ? "is-active" : ""}`}
                onClick={() => execute(item)}
                onMouseEnter={() => setActiveIdx(idx)}
                role="option"
                aria-selected={activeIdx === idx}
              >
                <span className="cmd-item-icon">{item.icon}</span>
                <div className="cmd-item-text">
                  <span className="cmd-item-title">{item.title}</span>
                  <span className="cmd-item-cat">{item.category}</span>
                </div>
                <span className="cmd-item-arrow">↵</span>
              </button>
            ))
          )}
        </div>

        <div className="cmd-footer">
          <span>Gunakan <strong>↑</strong> <strong>↓</strong> untuk memilih</span>
          <span><strong>ENTER</strong> untuk buka</span>
          <span><strong>ESC</strong> untuk tutup</span>
        </div>
      </div>
    </div>
  );
}

