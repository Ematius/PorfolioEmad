import {
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { CSSProperties } from "react";
import { Link, useLocation } from "react-router";
import { projects } from "../../data/projects";
import { translations } from "../../i18n/translations";
import type { Lang } from "../../i18n/translations";
import { AiLabSceneBoundary } from "./scene/AiLabSceneBoundary";
import styles from "./AiLabEntry.module.scss";

const AiLabScene3D = lazy(() => import("./scene/AiLabScene3D"));

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
  const projectButtonRef = useRef<HTMLButtonElement>(null);
  const closePanelRef = useRef<HTMLButtonElement>(null);
  const navigationState = location.state as EntryState | null;
  const isCinematicEntry = navigationState?.entry === "cinematic";
  const isSkipEntry = navigationState?.entry === "skip";
  const reducedMotion = prefersReducedMotion();
  const [isAwake, setIsAwake] = useState(reducedMotion || isSkipEntry);
  const [isWebglReady, setIsWebglReady] = useState(false);
  const [isWebglPresented, setIsWebglPresented] = useState(false);
  const [activeSection, setActiveSection] = useState<"projects" | null>(null);
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      if (activeSection === "projects") {
        setActiveSection(null);
        window.requestAnimationFrame(() => projectButtonRef.current?.focus());
      } else if (!isAwake) {
        setIsAwake(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection, isAwake]);

  useEffect(() => {
    if (activeSection !== "projects") return;
    const frame = window.requestAnimationFrame(() => closePanelRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [activeSection]);

  useEffect(() => {
    if (!isAwake || !isWebglReady) return;
    const timer = window.setTimeout(
      () => setIsWebglPresented(true),
      reducedMotion ? 0 : 850,
    );
    return () => window.clearTimeout(timer);
  }, [isAwake, isWebglReady, reducedMotion]);

  const openProjects = () => {
    if (!isAwake) return;
    setActiveSection("projects");
  };

  const closeProjects = () => {
    setActiveSection(null);
    window.requestAnimationFrame(() => projectButtonRef.current?.focus());
  };

  const sceneClassName = [
    styles.AiLabEntry,
    isCinematicEntry ? styles.cinematicEntry : styles.directEntry,
    isAwake ? styles.isAwake : "",
    activeSection ? styles.hasActiveSection : "",
  ]
    .filter(Boolean)
    .join(" ");

  const monolithFieldClassName = [
    styles.monolithField,
    isWebglPresented ? styles.webglLabels : "",
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

      <div
        className={`${styles.scene3d} ${
          isWebglReady ? styles.scene3dReady : ""
        }`}
        aria-hidden="true"
      >
        <AiLabSceneBoundary>
          <Suspense fallback={null}>
            <AiLabScene3D
              activeSection={activeSection}
              onReady={() => setIsWebglReady(true)}
              onSelectProjects={openProjects}
            />
          </Suspense>
        </AiLabSceneBoundary>
      </div>

      <div className={monolithFieldClassName} aria-hidden={!isAwake}>
        <button
          ref={projectButtonRef}
          type="button"
          className={`${styles.monolith} ${styles.monolithLeft}`}
          onClick={openProjects}
          disabled={!isAwake || activeSection !== null}
        >
          <span className={styles.monolithIndex}>01</span>
          <span className={styles.monolithTitle}>{copy.projects}</span>
        </button>
        <button
          type="button"
          className={`${styles.monolith} ${styles.monolithCenter}`}
          disabled
          title={copy.comingSoon}
        >
          <span className={styles.monolithIndex}>02</span>
          <span className={styles.monolithTitle}>{copy.journey}</span>
        </button>
        <button
          type="button"
          className={`${styles.monolith} ${styles.monolithRight}`}
          disabled
          title={copy.comingSoon}
        >
          <span className={styles.monolithIndex}>03</span>
          <span className={styles.monolithTitle}>{copy.contact}</span>
        </button>
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
        <span aria-hidden="true">AI / 002</span>
      </header>

      <div className={styles.interfaceFooter}>
        <div>
          <p className={styles.systemLabel}>{translation.aiLab.title}</p>
          <p className={styles.systemStatus} role="status" aria-live="polite">
            {isAwake ? copy.ready : copy.awakening}
          </p>
        </div>
        <Link
          to="/"
          className={styles.returnButton}
          tabIndex={isAwake ? 0 : -1}
        >
          {translation.aiLab.returnButton}
        </Link>
      </div>

      {activeSection === "projects" && (
        <aside className={styles.projectsPanel} aria-label={copy.projectsPanelTitle}>
          <div className={styles.projectsPanelHeader}>
            <div>
              <p>{copy.projectsPanelEyebrow}</p>
              <h2>{copy.projectsPanelTitle}</h2>
            </div>
            <button
              ref={closePanelRef}
              type="button"
              className={styles.closePanel}
              onClick={closeProjects}
              aria-label={copy.closeProjects}
            >
              ×
            </button>
          </div>

          <div className={styles.projectList}>
            {projects.map((project) => (
              <a
                key={project.id}
                className={styles.projectCard}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={project.image} alt="" />
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.tech.join(" · ")}</p>
                </div>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </aside>
      )}
    </section>
  );
}
