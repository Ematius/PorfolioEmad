/** @format */
import { useState, useEffect } from "react";


import { translations } from "../i18n/translations";
import type { Lang } from "../i18n/translations";
import styles from "./Experience.module.scss";


type ExperienceProps = {
  translation: (typeof translations)[Lang];
};

export function Experience({ translation }: ExperienceProps) {
  const [formStatus, setFormStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [isClosing, setIsClosing] = useState(false);

useEffect(() => {
  if (formStatus === "success" || formStatus === "error") {
    setIsClosing(false);

    const closeTimer = setTimeout(() => {
      setIsClosing(true);
    }, 3000);

    const removeTimer = setTimeout(() => {
      setFormStatus("idle");
      setIsClosing(false);
    }, 3400);

    return () => {
      clearTimeout(closeTimer);
      clearTimeout(removeTimer);
    };
  }
}, [formStatus]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);
      const encodedData = new URLSearchParams();

      for (const [key, value] of formData.entries()) {
        if (typeof value === "string") {
          encodedData.append(key, value);
        }
      }

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodedData.toString(),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el formulario");
      }

      setFormStatus("success");
      form.reset();
    } catch {
      setFormStatus("error");
    }
  };
  return (
    <section id="experience" className={styles.Experience}>
      <div className={styles.header}>
        <h2>{translation.experience.h2}</h2>
        <p className={styles.subtitle}>{translation.experience.subtitle}</p>
        <p className={styles.lead}>{translation.experience.lead}</p>
      </div>

      <div className={styles.grid}>
        <article className={styles.left} aria-label="work-experience">
          <div className={styles.decoration}>
            <div className={styles.line}></div>
            <p className={styles.kicker}>{translation.experience.kicker}</p>
          </div>

          <div className={styles.list}>
            {translation.experience.jobs.map((job) => (
              <section key={job.id} className={styles.jobCard}>
                <div className={styles.jobTop}>
                  <h3 className={styles.role}>{job.role}</h3>

                  <div className={styles.meta}>
                    <span className={styles.date}>{job.date}</span>
                    {job.location ?
                      <span className={styles.location}>{job.location}</span>
                    : null}
                  </div>
                </div>

                {job.summary ?
                  <p className={styles.summary}>{job.summary}</p>
                : null}

                {job.bullets?.length ?
                  <ul className={styles.bullets}>
                    {job.bullets.map((bulletText) => (
                      <li key={bulletText}>{bulletText}</li>
                    ))}
                  </ul>
                : null}

                {job.tags?.length ?
                  <div className={styles.tags}>
                    {job.tags.map((tagLabel) => (
                      <span key={tagLabel} className={styles.tag}>
                        {tagLabel}
                      </span>
                    ))}
                  </div>
                : null}
              </section>
            ))}
          </div>
        </article>

        <aside className={styles.right} aria-label="cv-download">
          <div className={styles.cvCard}>
            <div className={styles.cvTitle}>
              <div>
                <h3>{translation.experience.cv.title}</h3>
                <p>{translation.experience.cv.description}</p>
              </div>
            </div>

            <div className={styles.cvActions}>
              <a className={styles.primary} href="/EmadCVEN.pdf" download>
                {translation.experience.cv.downloadEn}
              </a>

              <a className={styles.secondary} href="/EmadCVES.pdf" download>
                {translation.experience.cv.downloadEs}
              </a>
            </div>

            <div className={styles.contactBox}>
              <h4 className={styles.contactTitle}>
                {translation.experience.cv.contactTitle}
              </h4>
              <p className={styles.contactDesc}>
                {translation.experience.cv.contactDescription}
              </p>

              <form
                className={styles.miniForm}
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}>
                <input type="hidden" name="form-name" value="contact" />

                <p hidden>
                  <label>
                    Don’t fill this out if you’re human:{" "}
                    <input name="bot-field" />
                  </label>
                </p>

                <label className={styles.label}>
                  {translation.experience.cv.form.name}
                  <input
                    className={styles.input}
                    type="text"
                    name="name"
                    placeholder={translation.experience.cv.form.namePlaceholder}
                    autoComplete="name"
                  />
                </label>

                <label className={styles.label}>
                  {translation.experience.cv.form.email}
                  <input
                    className={styles.input}
                    type="email"
                    name="email"
                    placeholder={
                      translation.experience.cv.form.emailPlaceholder
                    }
                    autoComplete="email"
                  />
                </label>

                <label className={styles.label}>
                  {translation.experience.cv.form.message}
                  <textarea
                    className={styles.textarea}
                    name="message"
                    placeholder={
                      translation.experience.cv.form.messagePlaceholder
                    }
                    rows={4}
                  />
                </label>

                <button className={styles.submit} type="submit">
                  {translation.experience.cv.form.submit} →
                </button>

                {formStatus === "success" && (
                  <p
                    className={`${styles.formMessageSuccess} ${
                      isClosing ? styles.closing : ""
                    }`}>
                    {translation.experience.cv.form.success}
                  </p>
                )}

                {formStatus === "error" && (
                  <p
                    className={`${styles.formMessageError} ${
                      isClosing ? styles.closing : ""
                    }`}>
                    {translation.experience.cv.form.error}
                  </p>
                )}
              </form>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
