import { about } from "../data/content";

export default function About() {
  return (
    <section id="tentang">
      <div className="wrap">
        <p className="eyebrow">01 · Ringkasan</p>
        <h2 className="sectitle">Tentang</h2>
        <div className="panel about-panel">
          {about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="about-stats">
          <div className="about-stat">
            <strong>1+</strong>
            <span>Tahun Pengalaman</span>
          </div>
          <div className="about-stat">
            <strong>3</strong>
            <span>Perusahaan</span>
          </div>
          <div className="about-stat">
            <strong>4</strong>
            <span>Proyek Lapangan</span>
          </div>
          <div className="about-stat">
            <strong>37</strong>
            <span>Keahlian Teknis</span>
          </div>
        </div>
      </div>
    </section>
  );
}
