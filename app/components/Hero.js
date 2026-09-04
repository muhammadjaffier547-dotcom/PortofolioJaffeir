"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import NetworkHUD from "./NetworkHUD";

const HERO_TEXT = "Menjaga jaringan tetap menyala — dari akar fiber sampai baris konfigurasi.";
const ACCENT_START = "Menjaga jaringan tetap ".length;
const ACCENT_END = ACCENT_START + "menyala".length;

function TypewriterHeadline() {
  const chars = useMemo(() => Array.from(HERO_TEXT), []);
  const [visible, setVisible] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let timer;

    if (!deleting && visible < chars.length) {
      timer = setTimeout(() => setVisible((v) => v + 1), 62);
    } else if (!deleting && visible === chars.length) {
      timer = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && visible > 0) {
      timer = setTimeout(() => setVisible((v) => v - 1), 34);
    } else {
      timer = setTimeout(() => setDeleting(false), 650);
    }

    return () => clearTimeout(timer);
  }, [visible, deleting, chars.length]);

  return (
    <h1 aria-label={HERO_TEXT} className="typewriter-headline">
      {chars.map((char, index) => {
        if (index >= visible) return null;
        const content = char;
        const node = index >= ACCENT_START && index < ACCENT_END
          ? <span className="accent">{content}</span>
          : content;
        return <span key={`${index}-${char}`} className="typed-char">{node}</span>;
      })}
      <span className="typing-cursor" aria-hidden="true">▌</span>
    </h1>
  );
}

export default function Hero() {
  // Ensure page always starts at top on initial load/refresh
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <div id="top" />
      <header className="hero">
        <div className="wrap hero-grid">
          <div className="panel badge">
            <div className="badge-photo">
              <Image
                src="/photo.jpg"
                alt="Foto Muhammad Jaffier Al Zufri"
                fill
                sizes="280px"
                style={{ objectFit: "cover", objectPosition: "center 22%" }}
                priority
              />
              <div className="scan" />
            </div>
            <p className="badge-name">Muhammad Jaffier Al Zufri</p>
            <p className="badge-role">Network Engineer &amp; NOC Operator</p>
            <span className="pill">
              <span className="dot" /> AKTIF
            </span>
            <div className="badge-row">
              <span>LOKASI</span>
              <span>Tangerang Selatan, ID</span>
            </div>
            <div className="badge-row">
              <span>FOKUS</span>
              <span>ISP &amp; IPTV Infra</span>
            </div>
            <div className="badge-row">
              <span>SEJAK</span>
              <span>2024</span>
            </div>
          </div>

          <div className="hero-copy">
            <p className="eyebrow">Network Engineer // NOC Operator</p>
            <TypewriterHeadline />
            <p className="lead">
              Lulusan Teknik Komputer &amp; Jaringan dengan pengalaman langsung
              mengoperasikan NOC untuk penyedia ISP &amp; IPTV. Terbiasa dengan
              konfigurasi MikroTik, administrasi server Linux, monitoring
              infrastruktur real-time, dan penanganan gangguan fiber optic di
              lapangan.
            </p>
            <div className="hero-cta">
              <a href="#pengalaman" className="btn btn-primary">
                Lihat Pengalaman →
              </a>
              <a href="#kontak" className="btn btn-ghost">
                Hubungi Saya
              </a>
              <a href="/cv-jaffier.pdf" className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
                📄 Unduh CV
              </a>
            </div>

            <NetworkHUD />
          </div>
        </div>
      </header>
    </>
  );
}
