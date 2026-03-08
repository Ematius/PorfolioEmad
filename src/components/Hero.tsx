/** @format */

import { translations } from "../i18n/translations";
import type { Lang } from "../i18n/translations";
import styles from "./Hero.module.scss";

const stackCards = [
  {
    id: "frontend",
    title: "Frontend",
    tech: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "Angular",
      "React",
      "WordPress",
      "Vitest",
      "Jest",
      "Postman",
    ],
    img: "/public/icons/code.svg",
  },
  {
    id: "backend",
    title: "BackEnd",
    tech: [
      "Java",
      "Python",
      "JavaScript",
      "TypeScript",
      "Node.js",
      "Express",
      "Prisma",
      "NestJS",
      "MySQL",
      "MongoDB",
    ],
    img: "/public/icons/database.svg",
  },
  {
    id: "devops",
    title: "DevOps",
    tech: ["Vercel","Netlify", "Railway", "CI/CD", "GitHub"],
    img: "/public/icons/world-upload.svg",
  },
];

type HeroProps = {
  translation: (typeof translations)[Lang];
};
export function Hero({ translation }: HeroProps) {
  return (
    <section id="hero" className={styles.Hero}>
      <div className={styles.topHero}>
        <article className={styles.description} aria-label="description">
          <div className={styles.decoration}>
            <div className={styles.line}></div>
            <p className={styles.available}>{translation.hero.available}</p>
          </div>

          <h1>
            {translation.hero.h1} <span> Emad</span>
          </h1>

          <p className={styles.presentation}>{translation.hero.presentation}</p>

          <div className={styles.contentButtons}>
            <button
              type="button"
              className={styles.projects}
              onClick={() =>
                document.getElementById("projects")?.scrollIntoView()
              }>
              {translation.hero.Projects}
            </button>
            <button
              type="button"
              className={styles.contact}
              onClick={() =>
                document.getElementById("experience")?.scrollIntoView()
              }>
              {translation.hero.Contact}
            </button>
          </div>

          <div className={styles.stack}>
            <p>{translation.hero.Stack} </p>
            <div className={styles.logos}>
              <img src="/icons/react.svg" alt="" />
              <img src="/icons/nest.svg" alt="" />
              <img src="/icons/mysql.svg" alt="" />
            </div>
          </div>
        </article>

        <div className={styles.photo} aria-label="Foto de Emad">
          <img src="/FotoEmad.png" alt="Foto de Emad" />
        </div>
      </div>

      <article className={styles.downHero}>
        <div className={styles.downTitle}>
          <h2> {translation.hero.title}</h2>
          <p>{translation.hero.downDescription}</p>
        </div>

        <div className={styles.container}>
          {stackCards.map((stack) => (
            <div key={stack.id} className={styles.card}>
              <div className={styles.cardImg}>
                <img src={stack.img} alt="logo skills" />
              </div>

              <h4>{stack.title}</h4>
              <p>{stack.tech.join(", ")}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
