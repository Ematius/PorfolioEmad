/** @format */

import styles from "./Footer.module.scss";
import { translations } from "../../i18n/translations";
import type { Lang } from "../../i18n/translations";

type FooterProps = {
  translation: (typeof translations)[Lang];
};

export function Footer({ translation }: FooterProps) {
  return (
    <footer className={styles.Footer} aria-label="footer">
      <div className={styles.container}>
        <div className={styles.top}>
          <p className={styles.brand}>
            <span className={styles.dot}>
              <img src="/favicon.svg" alt="DevPortfolio logo" />
            </span>
            {translation.footer.brand}
          </p>



          <div className={styles.social} aria-label="social-links">
            <a
              className={styles.iconBtn}
              href={translation.footer.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn">
              <img src="/icons/linkedin.svg" alt="" />
            </a>

            <a
              className={styles.iconBtn}
              href={translation.footer.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub">
              <img src="/icons/github.svg" alt="" />
            </a>
          </div>
        </div>

        <div className={styles.divider}></div>

        <p className={styles.copy}>{translation.footer.copy}</p>
      </div>
    </footer>
  );
}
