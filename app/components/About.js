"use client";

import { useLanguage } from "../context/LanguageContext";

const ABOUT_TEXTS = {
  id: [
    "Siswa/lulusan jurusan Teknik Komputer dan Jaringan (TKJ) dengan pengalaman nyata di lapangan: konfigurasi jaringan menggunakan MikroTik, manajemen server Linux, dan troubleshooting perangkat keras PC. Terbiasa menjaga stabilitas jaringan, memperkuat keamanan sistem, dan mengimplementasikan virtual host berbasis Apache.",
    "Kuat dalam analisis masalah dan pemecahan masalah yang efisien — siap berkontribusi di lingkungan teknologi yang dinamis dan terus berkembang, baik dari sisi infrastruktur fisik (fiber, perangkat jaringan) maupun sisi digital (server, monitoring, keamanan).",
  ],
  en: [
    "Computer and Network Engineering (TKJ) graduate with field-proven experience: MikroTik RouterOS configuration (MTCNA), Linux server administration, and PC hardware troubleshooting. Proven track record in maintaining network stability, hardening network perimeter security, and managing Apache virtual hosts.",
    "Strong analytical and root-cause troubleshooting capabilities — prepared to drive high-availability operations across both physical fiber infrastructure and digital NOC monitoring environments.",
  ],
};

export default function About() {
  const { lang, t } = useLanguage();
  const paragraphs = ABOUT_TEXTS[lang] || ABOUT_TEXTS.id;
  const isId = lang === "id";

  return (
    <section id="tentang">
      <div className="wrap">
        <p className="eyebrow">{t("about_eyebrow")}</p>
        <h2 className="sectitle">{t("about_title")}</h2>
        <div className="panel about-panel">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="about-stats">
          <div className="about-stat">
            <strong>1+</strong>
            <span>{isId ? "Tahun Pengalaman" : "Years Experience"}</span>
          </div>
          <div className="about-stat">
            <strong>3</strong>
            <span>{isId ? "Perusahaan / Instansi" : "Organizations"}</span>
          </div>
          <div className="about-stat">
            <strong>4</strong>
            <span>{isId ? "Proyek Lapangan" : "Field Projects"}</span>
          </div>
          <div className="about-stat">
            <strong>37+</strong>
            <span>{isId ? "Keahlian Teknis" : "Technical Skills"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
