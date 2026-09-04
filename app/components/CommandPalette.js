"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { contact } from "../data/content";
import { useLanguage } from "../context/LanguageContext";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const { lang, toggleLang } = useLanguage();
  const isId = lang === "id";

  const commands = useMemo(() => [
    { id: "terminal", icon: "⚡", title: isId ? "Terminal Interaktif NOC" : "Interactive NOC Terminal", category: isId ? "Eksplorasi" : "Terminal", action: "#terminal" },
    { id: "tentang", icon: "👤", title: isId ? "Tentang Jaffier" : "About Jaffier", category: isId ? "Profil" : "Profile", action: "#tentang" },
    { id: "pengalaman", icon: "💼", title: isId ? "Pengalaman Kerja & NOC" : "Work Experience & NOC Roles", category: isId ? "Karir" : "Career", action: "#pengalaman" },
    { id: "proyek", icon: "🚀", title: isId ? "Studi Kasus Proyek Lapangan" : "Field Case Studies", category: isId ? "Proyek" : "Projects", action: "#projects" },
    { id: "topologi", icon: "🌐", title: isId ? "Topologi Jaringan NOC Interaktif" : "Interactive NOC Topology Map", category: isId ? "Arsitektur" : "Architecture", action: "#topologi" },
    { id: "subnet", icon: "🧮", title: isId ? "Kalkulator Subnet & CIDR Visual" : "Visual Subnet & CIDR Calculator", category: isId ? "Tools" : "Tools", action: "#tools" },
    { id: "fiber", icon: "⚡", title: isId ? "Kalkulator Redaman Fiber Optik" : "Fiber Optic Loss Budget Calc", category: isId ? "Tools" : "Tools", action: "#tools" },
    { id: "dokumentasi", icon: "📸", title: isId ? "Galeri Foto Lapangan (Data Center & OTDR)" : "Field Photo Gallery & OTDR", category: isId ? "Bukti Kerja" : "Field Logs", action: "#dokumentasi" },
    { id: "keahlian", icon: "🛠️", title: isId ? "Daftar Keahlian & Tools" : "Technical Skills & Toolset", category: isId ? "Skillset" : "Skills", action: "#keahlian" },
    { id: "sertifikasi", icon: "🏅", title: isId ? "Sertifikat MikroTik MTCNA" : "MikroTik MTCNA Credential", category: isId ? "Kredensial" : "Credentials", action: "#sertifikasi" },
    { id: "lang", icon: "🌐", title: isId ? "Ganti Bahasa ke English (Switch to EN)" : "Switch Language to Bahasa Indonesia (Ganti ke ID)", category: isId ? "Bahasa" : "Language", run: () => toggleLang() },
    { id: "kontak", icon: "💬", title: isId ? "Hubungi via WhatsApp Langsung" : "Direct Message via WhatsApp", category: isId ? "Kontak" : "Contact", action: "#kontak" },
    { id: "email", icon: "✉️", title: `${isId ? "Salin Email" : "Copy Email"} (${contact.email})`, category: isId ? "Kontak" : "Contact", copy: contact.email },
  ], [isId, toggleLang]);

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
    if (!q) return commands;
    return commands.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    );
  }, [commands, query]);

  const execute = (item) => {
    if (!item) return;

    if (item.run) {
      item.run();
      setOpen(false);
      return;
    }

    if (item.copy) {
      navigator.clipboard.writeText(item.copy);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setOpen(false);
      }, 1200);
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
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter" && filtered[activeIdx]) {
      e.preventDefault();
      execute(filtered[activeIdx]);
    }
  };

  if (!open) return null;

  return (
    <div
      className="cmd-backdrop"
      onClick={() => setOpen(false)}
      role="presentation"
    >
      <div
        className="cmd-modal panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="cmd-header">
          <span className="cmd-icon">🔍</span>
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIdx(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder={
              isId
                ? "Ketik perintah, bagian halaman, atau kalkulator..."
                : "Type a command, page section, or network tool..."
            }
          />
          <kbd className="cmd-esc">ESC</kbd>
        </div>

        {copied && (
          <div className="cmd-copied-banner">
            ✓ {isId ? "Email berhasil disalin ke clipboard!" : "Email copied to clipboard!"}
          </div>
        )}

        <div className="cmd-list">
          {filtered.length === 0 ? (
            <div className="cmd-empty">
              {isId
                ? "Tidak ada perintah yang cocok."
                : "No matching commands found."}
            </div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={item.id}
                className={`cmd-item ${idx === activeIdx ? "is-active" : ""}`}
                onMouseEnter={() => setActiveIdx(idx)}
                onClick={() => execute(item)}
              >
                <span className="cmd-item-icon">{item.icon}</span>
                <span className="cmd-item-title">{item.title}</span>
                <span className="cmd-item-cat">{item.category}</span>
              </div>
            ))
          )}
        </div>

        <div className="cmd-footer">
          <span>
            ↑↓ {isId ? "Navigasi" : "Navigate"} &middot; ↵{" "}
            {isId ? "Pilih" : "Select"} &middot; ESC{" "}
            {isId ? "Tutup" : "Close"}
          </span>
          <span className="cmd-hotkey-hint">Ctrl + K</span>
        </div>
      </div>
    </div>
  );
}
