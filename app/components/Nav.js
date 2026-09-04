"use client";

import { useState } from "react";
import LatencyMeter from "./LatencyMeter";
import { useLanguage } from "../context/LanguageContext";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();

  return (
    <nav>
      <div className="wrap">
        <a href="#top" className="brand">
          <span className="b1">jaffier</span>
          <span className="b2">@network-engineer</span>
        </a>

        <div className={`navlinks ${open ? "navlinks-open" : ""}`}>
          <a href="#tentang" onClick={() => setOpen(false)}>{t("nav_about")}</a>
          <a href="#pengalaman" onClick={() => setOpen(false)}>{t("nav_experience")}</a>
          <a href="#projects" onClick={() => setOpen(false)}>{t("nav_projects")}</a>
          <a href="#dokumentasi" onClick={() => setOpen(false)}>{t("nav_field")}</a>
          <a href="#topologi" onClick={() => setOpen(false)}>{t("nav_topology")}</a>
          <a href="#tools" onClick={() => setOpen(false)}>{t("nav_tools")}</a>
          <a href="#keahlian" onClick={() => setOpen(false)}>{t("nav_skills")}</a>
          <a href="#kontak" onClick={() => setOpen(false)}>{t("nav_contact")}</a>
        </div>

        <div className="nav-actions">
          {/* Live Latency Telemetry */}
          <LatencyMeter />

          {/* Language Switcher */}
          <button
            type="button"
            className="nav-lang-btn"
            onClick={toggleLang}
            title={lang === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
            aria-label="Switch language"
          >
            <span className={`lang-choice ${lang === "id" ? "is-active" : ""}`}>ID</span>
            <span className="lang-sep">/</span>
            <span className={`lang-choice ${lang === "en" ? "is-active" : ""}`}>EN</span>
          </button>

          {/* Command Palette Button */}
          <button
            type="button"
            className="nav-cmd-btn"
            onClick={() => window.dispatchEvent(new Event("open-cmd-palette"))}
            aria-label="Buka Command Palette (Ctrl+K)"
            title="Buka Menu Cepat (Ctrl + K)"
          >
            <span className="nav-cmd-icon">🔍</span>
            <span className="nav-cmd-kbd">⌘K</span>
          </button>

          {/* Mobile Hamburger */}
          <button
            className={`hamburger ${open ? "is-open" : ""}`}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>
  );
}
