"use client";

import { useEffect, useState } from "react";
import { socials } from "../data/content";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());
  const { lang, t } = useLanguage();
  const isId = lang === "id";

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer>
      <div className="wrap">
        <p className="footer-tagline">
          {isId ? (
            <>
              Dibangun dengan <span>◈</span> dan secangkir kopi
            </>
          ) : (
            <>
              Engineered with <span>◈</span> and steady coffee
            </>
          )}
        </p>
        <div className="footer-socials">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label={s.label}
            >
              <span className="footer-social-icon">{s.icon}</span>
            </a>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© {year} Muhammad Jaffier Al Zufri &middot; NOC &amp; Network Engineer</span>
          <span>
            {isId
              ? "Uptime tidak pernah terputus, koneksi selalu terjaga."
              : "Uninterrupted uptime, packets delivered with zero loss."}
          </span>
        </div>
      </div>
    </footer>
  );
}
