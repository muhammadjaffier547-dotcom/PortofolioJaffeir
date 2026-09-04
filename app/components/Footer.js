"use client";

import { useEffect, useState } from "react";
import { socials } from "../data/content";

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer>
      <div className="wrap">
        <p className="footer-tagline">
          Dibangun dengan <span>◈</span> dan secangkir kopi
        </p>
        <div className="footer-socials">
          {socials.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label={s.label}>
              <span className="footer-social-icon">{s.icon}</span>
            </a>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© {year} Muhammad Jaffier Al Zufri</span>
          <span>uptime tidak pernah terputus, koneksi selalu terjaga.</span>
        </div>
      </div>
    </footer>
  );
}
