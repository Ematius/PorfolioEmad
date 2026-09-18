/** @format */

import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, FormEvent, MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router";
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

type ActiveSection = "projects" | "journey" | "contact" | null;
type FormStatus = "idle" | "sending" | "success" | "error";

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

function getStartYear(date: string): string {
  return date.match(/\d{4}/)?.[0] ?? "—";
}

export default function AiLabEntry({ translation }: AiLabEntryProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const projectButtonRef = useRef<HTMLButtonElement>(null);
  const journeyButtonRef = useRef<HTMLButtonElement>(null);
  const contactButtonRef = useRef<HTMLButtonElement>(null);
  const closePanelRef = useRef<HTMLButtonElement>(null);
  const returnTimeoutRef = useRef<number | null>(null);
  const navigationState = location.state as EntryState | null;
  const isCinematicEntry = navigationState?.entry === "cinematic";
  const isSkipEntry = navigationState?.entry === "skip";
  const reducedMotion = prefersReducedMotion();
  const [isAwake, setIsAwake] = useState(reducedMotion || isSkipEntry);
  const [isWebglReady, setIsWebglReady] = useState(false);
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [isReturning, setIsReturning] = useState(false);
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
    return () => {
      if (returnTimeoutRef.current !== null) {
        window.clearTimeout(returnTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (activeSection === null) return;
    const frame = window.requestAnimationFrame(() =>
      closePanelRef.current?.focus(),
    );
    return () => window.cancelAnimationFrame(frame);
  }, [activeSection]);

  useEffect(() => {
    if (formStatus !== "success" && formStatus !== "error") return;
    const timer = window.setTimeout(() => setFormStatus("idle"), 4000);
    return () => window.clearTimeout(timer);
  }, [formStatus]);

  const focusMonolith = (section: Exclude<ActiveSection, null>) => {
    const target = {
      projects: projectButtonRef,
      journey: journeyButtonRef,
      contact: contactButtonRef,
    }[section];
    window.requestAnimationFrame(() => target.current?.focus());
  };

  const closeSection = () => {
    if (activeSection === null) return;
    const sectionToFocus = activeSection;
    setActiveSection(null);
    focusMonolith(sectionToFocus);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (activeSection !== null) {
        const sectionToFocus = activeSection;
        setActiveSection(null);
        focusMonolith(sectionToFocus);
      } else if (!isAwake) {
        setIsAwake(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection, isAwake]);

  const openSection = (section: Exclude<ActiveSection, null>) => {
    if (!isAwake) return;
    setActiveSection(section);
  };

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setFormStatus("sending");

    try {
      const formData = new FormData(form);
      const encodedData = new URLSearchParams();
      for (const [key, value] of formData.entries()) {
        if (typeof value === "string") encodedData.append(key, value);
      }

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodedData.toString(),
      });

      if (!response.ok) throw new Error("Contact form request failed");
      form.reset();
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  };

  const handleReturnToPortfolio = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (isReturning) return;

    setIsReturning(true);

    returnTimeoutRef.current = window.setTimeout(
      () => {
        window.scrollTo(0, 0);
        navigate("/");
      },
      reducedMotion ? 0 : 650,
    );
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
    isWebglReady ? styles.webglLabels : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={sceneClassName} aria-label="AI Lab">
      <div className={styles.void} aria-hidden="true" />
      <div className={styles.distantLight} aria-hidden="true" />
      <div className={styles.particles} aria-hidden="true">
        {particles.map((particleStyle, index) => (
          <span key={index} className={styles.particle} style={particleStyle} />
        ))}
      </div>
      <div className={styles.horizon} aria-hidden="true" />

      <div
        className={`${styles.scene3d} ${
          isWebglReady ? styles.scene3dReady : ""
        }`}
        aria-hidden="true">
        <AiLabSceneBoundary>
          <Suspense fallback={null}>
            <AiLabScene3D
              activeSection={activeSection}
              onReady={() => setIsWebglReady(true)}
              onSelectProjects={() => openSection("projects")}
              onSelectJourney={() => openSection("journey")}
              onSelectContact={() => openSection("contact")}
            />
          </Suspense>
        </AiLabSceneBoundary>
      </div>

      <div className={monolithFieldClassName} aria-hidden={!isAwake}>
        <button
          ref={projectButtonRef}
          type="button"
          className={`${styles.monolith} ${styles.monolithLeft}`}
          onClick={() => openSection("projects")}
          disabled={!isAwake || activeSection !== null}>
          <span className={styles.monolithIndex}>01</span>
          <span className={styles.monolithTitle}>{copy.projects}</span>
        </button>
        <button
          ref={journeyButtonRef}
          type="button"
          className={`${styles.monolith} ${styles.monolithCenter}`}
          onClick={() => openSection("journey")}
          disabled={!isAwake || activeSection !== null}>
          <span className={styles.monolithIndex}>02</span>
          <span className={styles.monolithTitle}>{copy.journey}</span>
        </button>
        <button
          ref={contactButtonRef}
          type="button"
          className={`${styles.monolith} ${styles.monolithRight}`}
          onClick={() => openSection("contact")}
          disabled={!isAwake || activeSection !== null}>
          <span className={styles.monolithIndex}>03</span>
          <span className={styles.monolithTitle}>{copy.contact}</span>
        </button>
      </div>

      {!isAwake && (
        <button
          type="button"
          className={styles.skipIntro}
          onClick={() => setIsAwake(true)}>
          {copy.skip}
        </button>
      )}

      <header className={styles.interfaceHeader}>
        <p>{translation.aiLab.attribution}</p>
        <span aria-hidden="true">AI / 003</span>
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
          tabIndex={isAwake && !isReturning ? 0 : -1}
          aria-disabled={isReturning}
          onClick={handleReturnToPortfolio}>
          {translation.aiLab.returnButton}
        </Link>
      </div>

      {activeSection === "projects" && (
        <aside
          className={`${styles.dataPanel} ${styles.projectsPanel}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="projects-panel-title">
          <div className={styles.panelHeader}>
            <div>
              <p>{copy.projectsPanelEyebrow}</p>
              <h2 id="projects-panel-title">{copy.projectsPanelTitle}</h2>
            </div>
            <button
              ref={closePanelRef}
              type="button"
              className={styles.closePanel}
              onClick={closeSection}
              aria-label={copy.closeProjects}>
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
                rel="noopener noreferrer">
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

      {activeSection === "journey" && (
        <aside
          className={`${styles.dataPanel} ${styles.journeyPanel}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="journey-panel-title">
          <div className={styles.panelHeader}>
            <div>
              <p>{copy.journeyPanelEyebrow}</p>
              <h2 id="journey-panel-title">{copy.journeyPanelTitle}</h2>
            </div>
            <button
              ref={closePanelRef}
              type="button"
              className={styles.closePanel}
              onClick={closeSection}
              aria-label={copy.closeJourney}>
              ×
            </button>
          </div>

          <div className={styles.panelScroll}>
            <ol className={styles.timeline}>
              {translation.experience.jobs.map((job) => (
                <li key={job.id} className={styles.timelineEntry}>
                  <time>{getStartYear(job.date)}</time>
                  <span className={styles.timelineDot} aria-hidden="true" />
                  <article>
                    <p className={styles.timelineDate}>{job.date}</p>
                    <h3>{job.role}</h3>
                    {job.summary ?
                      <p>{job.summary}</p>
                    : null}
                    {job.bullets.length ?
                      <ul>
                        {job.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    : null}
                    {job.tags.length ?
                      <div className={styles.timelineTags}>
                        {job.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    : null}
                  </article>
                </li>
              ))}
            </ol>

            <section className={styles.cvArchive} aria-labelledby="cv-title">
              <div>
                <p>{copy.cvEyebrow} </p>
                <h3 id="cv-title">{translation.experience.cv.title}</h3>
                <span>{translation.experience.cv.description}</span>
              </div>
              <div className={styles.cvActions}>
                <a href={translation.experience.cv.fileEn} download>
                  <span>EN</span>
                  {translation.experience.cv.downloadEn}
                  <b aria-hidden="true">↓</b>
                </a>
                <a href={translation.experience.cv.fileEs} download>
                  <span>ES</span>
                  {translation.experience.cv.downloadEs}
                  <b aria-hidden="true">↓</b>
                </a>
              </div>
            </section>
          </div>
        </aside>
      )}

      {activeSection === "contact" && (
        <aside
          className={`${styles.dataPanel} ${styles.contactPanel}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-panel-title">
          <div className={styles.panelHeader}>
            <div>
              <p>{copy.contactPanelEyebrow}</p>
              <h2 id="contact-panel-title">{copy.contactPanelTitle}</h2>
            </div>
            <button
              ref={closePanelRef}
              type="button"
              className={styles.closePanel}
              onClick={closeSection}
              aria-label={copy.closeContact}>
              ×
            </button>
          </div>

          <div className={`${styles.panelScroll} ${styles.contactContent}`}>
            <div className={styles.availabilitySignal}>
              <span aria-hidden="true" />
              <p>{copy.availableForContact}</p>
            </div>
            <p className={styles.contactLead}>
              {translation.experience.cv.contactDescription}
            </p>

            <form
              className={styles.contactForm}
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleContactSubmit}>
              <input type="hidden" name="form-name" value="contact" />
              <p hidden>
                <label>
                  Don&apos;t fill this out if you&apos;re human:
                  <input name="bot-field" />
                </label>
              </p>

              <label>
                {translation.experience.cv.form.name}
                <input
                  type="text"
                  name="name"
                  placeholder={translation.experience.cv.form.namePlaceholder}
                  autoComplete="name"
                  required
                />
              </label>
              <label>
                {translation.experience.cv.form.email}
                <input
                  type="email"
                  name="email"
                  placeholder={translation.experience.cv.form.emailPlaceholder}
                  autoComplete="email"
                  required
                />
              </label>
              <label>
                {translation.experience.cv.form.message}
                <textarea
                  name="message"
                  placeholder={
                    translation.experience.cv.form.messagePlaceholder
                  }
                  rows={5}
                  required
                />
              </label>
              <button type="submit" disabled={formStatus === "sending"}>
                {formStatus === "sending" ?
                  translation.experience.cv.form.sending
                : translation.experience.cv.form.submit}
                <span aria-hidden="true">→</span>
              </button>
              <div className={styles.formStatus} aria-live="polite">
                {formStatus === "success" ?
                  translation.experience.cv.form.success
                : null}
                {formStatus === "error" ?
                  translation.experience.cv.form.error
                : null}
              </div>
            </form>

            <div className={styles.socialLinks}>
              <a
                href={translation.footer.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer">
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
              <a
                href={translation.footer.githubUrl}
                target="_blank"
                rel="noopener noreferrer">
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </aside>
      )}

      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "#000",
          opacity: isReturning ? 1 : 0,
          pointerEvents: isReturning ? "auto" : "none",
          transition:
            reducedMotion ? "none" : (
              "opacity 650ms cubic-bezier(0.4, 0, 0.2, 1)"
            ),
          willChange: "opacity",
        }}
      />
    </section>
  );
}
