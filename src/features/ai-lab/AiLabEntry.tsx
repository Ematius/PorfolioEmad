import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { Link, useLocation } from "react-router";
import { translations } from "../../i18n/translations";
import type { Lang } from "../../i18n/translations";
import styles from "./AiLabEntry.module.scss";

type AiLabEntryProps = {
  translation: (typeof translations)[Lang];
};

type EntryState = {
  entry?: "cinematic" | "skip";
};

type ParticleStyle = CSSProperties & {
  "--particle-x": string;
  "--particle-y": string;
  "--particle-size": string;
  "--particle-delay": string;
  "--particle-duration": string;
  "--particle-drift": string;
};

const PARTICLE_COUNT = 46;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function AiLabEntry({ translation }: AiLabEntryProps) {
  const location = useLocation();
  const navigationState = location.state as EntryState | null;
  const isCinematicEntry = navigationState?.entry === "cinematic";
  const isSkipEntry = navigationState?.entry === "skip";
  const reducedMotion = prefersReducedMotion();
  const [isAwake, setIsAwake] = useState(reducedMotion || isSkipEntry);
  const copy = translation.aiLab.awakening;

  const particles = useMemo<ParticleStyle[]>(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, index) => ({
        "--particle-x": `${(index * 37 + 11) % 100}%`,
        "--particle-y": `${(index * 61 + 7) % 96}%`,
        "--particle-size": `${1 + (index % 3) * 0.55}px`,
        "--particle-delay": `${((index * 43) % 240) / 100}s`,
        "--particle-duration": `${6.5 + (index % 7) * 0.8}s`,
        "--particle-drift": `${-16 + (index % 9) * 4}px`,
      })),
    [],
  );

  useEffect(() => {
    if (reducedMotion || isAwake) return;

    const duration = isCinematicEntry ? 5600 : 2800;
    const timer = window.setTimeout(() => setIsAwake(true), duration);

    return () => window.clearTimeout(timer);
  }, [isAwake, isCinematicEntry, reducedMotion]);

  const sceneClassName = [
    styles.AiLabEntry,
    isCinematicEntry ? styles.cinematicEntry : styles.directEntry,
    isAwake ? styles.isAwake : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={sceneClassName} aria-label="AI Lab">
      <div className={styles.void} aria-hidden="true" />
      <div className={styles.distantLight} aria-hidden="true" />

      <div className={styles.particles} aria-hidden="true">
        {particles.map((particleStyle, index) => (
          <span
            key={index}
            className={styles.particle}
            style={particleStyle}
          />
        ))}
      </div>

      <div className={styles.horizon} aria-hidden="true" />

      <div className={styles.monolithField} aria-hidden={!isAwake}>
        <article className={`${styles.monolith} ${styles.monolithLeft}`}>
          <span className={styles.monolithIndex}>01</span>
          <h2>{copy.projects}</h2>
        </article>
        <article className={`${styles.monolith} ${styles.monolithCenter}`}>
          <span className={styles.monolithIndex}>02</span>
          <h2>{copy.journey}</h2>
        </article>
        <article className={`${styles.monolith} ${styles.monolithRight}`}>
          <span className={styles.monolithIndex}>03</span>
          <h2>{copy.contact}</h2>
        </article>
      </div>

      {!isAwake && (
        <button
          type="button"
          className={styles.skipIntro}
          onClick={() => setIsAwake(true)}
        >
          {copy.skip}
        </button>
      )}

      <header className={styles.interfaceHeader}>
        <p>{translation.aiLab.attribution}</p>
        <span aria-hidden="true">AI / 001</span>
      </header>

      <div className={styles.interfaceFooter}>
        <div>
          <p className={styles.systemLabel}>{translation.aiLab.title}</p>
          <p className={styles.systemStatus} role="status" aria-live="polite">
            {isAwake ? copy.ready : copy.awakening}
          </p>
        </div>
        <Link to="/" className={styles.returnButton}>
          {translation.aiLab.returnButton}
        </Link>
      </div>
    </section>
  );
}
