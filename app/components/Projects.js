import { projects } from "../data/content";

export default function Projects(){
  return <section id="projects" className="projects-section"><div className="wrap">
    <p className="eyebrow">03 · Proyek Lapangan</p>
    <div className="projects-heading">
      <div><h2 className="sectitle">Proyek &amp; Studi Kasus</h2><p className="section-note">Pekerjaan infrastruktur nyata, troubleshooting, monitoring, dan operasi jaringan yang didokumentasikan sebagai catatan lapangan.</p></div>
      <div className="project-stat"><span>CATATAN</span><strong>{String(projects.length).padStart(2,"0")}</strong><small>proyek terdokumentasi</small></div>
    </div>
    <div className="projects-grid">
      {projects.map((project,index)=><article className="project-card" key={project.id}>
        <div className="project-card-top"><span className="project-id">PROYEK // {project.id}</span><span className="project-type">{project.type}</span></div>
        <div className="project-icon">{project.icon}</div>
        <h3>{project.title}</h3>
        <p className="project-role">{project.role}</p>
        <div className="project-line" />
        <p className="project-summary">{project.summary}</p>
        <div className="project-tags">{project.tools.map(tool=><span className="tag" key={tool}>{tool}</span>)}</div>
        <details className="project-details">
          <summary>LIHAT DETAIL <span>↗</span></summary>
          <div className="case-body">
            <div><b>MASALAH</b><p>{project.problem}</p></div>
            <div><b>PENDEKATAN</b><p>{project.approach}</p></div>
            <div><b>HASIL</b><p>{project.result}</p></div>
          </div>
        </details>
      </article>)}
    </div>
  </div></section>;
}
