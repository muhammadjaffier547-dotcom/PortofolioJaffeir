"use client";

import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav>
      <div className="wrap">
        <a href="#top" className="brand">
          <span className="b1">jaffier</span>
          <span className="b2">@network-engineer</span>
        </a>
        <div className={`navlinks ${open ? 'navlinks-open' : ''}`}>
          <a href="#tentang" onClick={() => setOpen(false)}>Tentang</a>
          <a href="#pengalaman" onClick={() => setOpen(false)}>Pengalaman</a>
          <a href="#projects" onClick={() => setOpen(false)}>Proyek</a>
          <a href="#dokumentasi" onClick={() => setOpen(false)}>Dokumentasi</a>
          <a href="#keahlian" onClick={() => setOpen(false)}>Keahlian</a>
          <a href="#pendidikan" onClick={() => setOpen(false)}>Pendidikan</a>
          <a href="#kontak" onClick={() => setOpen(false)}>Kontak</a>
        </div>
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
        <button 
          className={`hamburger ${open ? 'is-open' : ''}`} 
          onClick={() => setOpen(!open)} 
          aria-expanded={open} 
          aria-label="Toggle menu"
        >
          <span/><span/><span/>
        </button>
      </div>
    </nav>
  );
}
