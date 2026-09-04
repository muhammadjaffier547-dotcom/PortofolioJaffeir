import { skillGroups } from "../data/content";

const icons = ["⌁", "◉", "⌘", "◇"];

export default function Skills() {
  return (
    <section id="keahlian">
      <div className="wrap">
        <p className="eyebrow">05 · Toolset</p>
        <div className="skills-heading">
          <div>
            <h2 className="sectitle">Keahlian</h2>
            <p className="section-note">Perangkat praktis meliputi routing, monitoring NOC, layanan Linux, infrastruktur fiber, dan keamanan.</p>
          </div>
          <div className="skills-stat">
            <span>TOOLS</span>
            <strong>{skillGroups.reduce((n,g)=>n+g.chips.length,0)}</strong>
            <small>keahlian tercatat</small>
          </div>
        </div>
        <div className="skill-grid bento">
          {skillGroups.map((group, index) => (
            <div className={`panel skill-card ${index === 0 ? 'skill-card-featured' : ''}`} key={group.title}>
              <div className="skill-card-head">
                <div className="skill-icon">{icons[index]}</div>
                <div>
                  <span className="skill-number">0{index+1}</span>
                  <h3>{group.title}</h3>
                </div>
                <span className="skill-count">{String(group.chips.length).padStart(2,"0")}</span>
              </div>
              <div className="skill-chips">
                {group.chips.map((chip) => <span className="chip" key={chip}>{chip}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
