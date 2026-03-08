/** @format */
import { projects } from '../data/projects';
import { translations } from "../i18n/translations";
import type { Lang } from "../i18n/translations";
import styles from "./Projects.module.scss"

type ProjectsProps = {
  translation: (typeof translations)[Lang];
};

export function Projects({ translation }: ProjectsProps) {
  return (
    <section id="projects" className={styles.sectionProjects}>
      <h1>{translation.projects.h1}</h1>
      <p>{translation.projects.p}</p>
      <div className={styles.wrapTech}>
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            >
            <img src={project.image} alt={project.title} />
            <h3>{project.title}</h3>
            <div className={styles.line}></div>
            <div className={styles.cardTech}>
              {project.tech.map((tech) => (
                <p key={tech}>{tech}</p>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
