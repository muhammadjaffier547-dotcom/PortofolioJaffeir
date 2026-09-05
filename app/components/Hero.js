"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import NetworkHUD from "./NetworkHUD";
import { useLanguage } from "../context/LanguageContext";

const HEADLINES = {
  id: {
    text: "Menjaga jaringan tetap menyala — dari akar fiber sampai baris konfigurasi.",
    accentWord: "menyala",
  },
  en: {
    text: "Keeping networks alive — from core fiber glass to command line routing.",
    accentWord: "alive",
  },
};

function TypewriterHeadline() {
  const { lang } = useLanguage();
  const current = HEADLINES[lang] || HEADLINES.id;
  const HERO_TEXT = current.text;
  const chars = useMemo(() => Array.from(HERO_TEXT), [HERO_TEXT]);
  const [visible, setVisible] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Reset when language changes
  useEffect(() => {
    setVisible(0);
    setDeleting(false);
  }, [lang]);

  useEffect(() => {
    let timer;

    if (!deleting && visible < chars.length) {
      timer = setTimeout(() => setVisible((v) => v + 1), 50);
    } else if (!deleting && visible === chars.length) {
      timer = setTimeout(() => setDeleting(true), 2400);
    } else if (deleting && visible > 0) {
      timer = setTimeout(() => setVisible((v) => v - 1), 28);
    } else {
      timer = setTimeout(() => setDeleting(false), 600);
    }

    return () => clearTimeout(timer);
  }, [visible, deleting, chars.length]);

  const accentStart = HERO_TEXT.indexOf(current.accentWord);
  const accentEnd = accentStart + current.accentWord.length;

  return (
    <h1 aria-label={HERO_TEXT} className="typewriter-headline">
      {chars.map((char, index) => {
        if (index >= visible) return null;
        const content = char;
        const node =
          index >= accentStart && index < accentEnd ? (
            <span className="accent">{content}</span>
          ) : (
            content
          );
        return (
          <span key={`${index}-${char}`} className="typed-char">
            {node}
          </span>
        );
      })}
      <span className="typing-cursor" aria-hidden="true">
        ▌
      </span>
    </h1>
  );
}

export default function Hero() {
  const { lang, t } = useLanguage();
  const isId = lang === "id";

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
                sizes="(max-width: 820px) 320px, 280px"
                style={{ objectFit: "cover", objectPosition: "67% 28%" }}
                priority
              />
              <div className="scan" />
            </div>
            <p className="badge-name">Muhammad Jaffier Al Zufri</p>
            <p className="badge-role">{t("hero_role")}</p>
            <span className="pill">
              <span className="dot" /> {isId ? "AKTIF" : "ACTIVE"}
            </span>
            <div className="badge-row">
              <span>{isId ? "LOKASI" : "LOCATION"}</span>
              <span>Tangerang Selatan, ID</span>
            </div>
            <div className="badge-row">
              <span>{isId ? "FOKUS" : "FOCUS"}</span>
              <span>ISP &amp; IPTV Infra</span>
            </div>
            <div className="badge-row">
              <span>{isId ? "SEJAK" : "SINCE"}</span>
              <span>2024</span>
            </div>
          </div>

          <div className="hero-copy">
            <p className="eyebrow">Network Engineer // NOC Operator</p>
            <TypewriterHeadline />
            <p className="lead">{t("hero_desc")}</p>
            <div className="hero-cta">
              <a href="#pengalaman" className="btn btn-primary">
                {t("hero_cta_projects")} →
              </a>
              <a href="#topologi" className="btn btn-ghost">
                🌐 {isId ? "Topologi NOC" : "NOC Topology"}
              </a>
              <a href="#tools" className="btn btn-ghost">
                🧮 {t("hero_cta_tools")}
              </a>
              <button
                type="button"
                className="btn btn-ghost btn-cv-hero"
                onClick={() => window.dispatchEvent(new Event("open-resume-modal"))}
                title={isId ? "Buka & Cetak CV ATS" : "View & Print ATS Resume"}
              >
                📄 {isId ? "Preview / Cetak CV" : "ATS Resume (Print)"}
              </button>
              <a href="#kontak" className="btn btn-ghost">
                {t("hero_cta_contact")}
              </a>
            </div>

            <NetworkHUD />
          </div>
        </div>
      </header>
    </>
  );
}
