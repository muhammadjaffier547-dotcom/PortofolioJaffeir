import { experience } from "../data/content";

export default function Experience(){
  return <section id="pengalaman"><div className="wrap">
    <p className="eyebrow">02 · Log Kronologis</p>
    <div className="experience-heading"><div><h2 className="sectitle">Pengalaman Kerja</h2>
      <p className="section-note">Timeline sistem, insiden, dan infrastruktur yang pernah saya tangani.</p></div>
      <div className="experience-stat"><span>FIELD LOG</span><strong>03</strong><small>posisi tercatat</small></div>
    </div>
    <div className="experience-grid">
      {experience.map((item,index)=><article className={`experience-card ${index===0?"is-current":""}`} key={item.org+item.date}>
        <div className="experience-card-top"><span className="log-date">{item.date}</span>{index===0&&<span className="current-badge"><i/> SAAT INI</span>}</div>
        <div className="experience-number">0{index+1}</div><h3>{item.role}</h3><p className="log-org">{item.org}</p>
        <div className="experience-line"/><ul>{item.bullets.map((b,i)=><li key={i}>{b}</li>)}</ul>
        <div className="tags">{item.tags.map(t=><span className="tag" key={t}>{t}</span>)}</div>
      </article>)}
    </div>
  </div></section>;
}
