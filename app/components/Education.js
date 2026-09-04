import { education } from "../data/content";

export default function Education() {
  return (
    <section id="pendidikan">
      <div className="wrap">
        <p className="eyebrow">07 · Riwayat Belajar</p>
        <h2 className="sectitle">Pendidikan</h2>
        <div className="panel edu-card">
          <div className="edu-head">
            <h3>{education.school}</h3>
            <span className="edu-date">{education.date}</span>
          </div>
          <p className="edu-major">{education.major}</p>
          <ul>
            {education.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
