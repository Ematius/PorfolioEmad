import { translations } from "../../i18n/translations";
import type { Lang } from "../../i18n/translations";
import styles from "./Header.module.scss";
import { useState } from "react";



type HeaderProps = {
  translation: (typeof translations)[Lang];
  onToggleLang: () => void;
  onToggleTheme: () => void;
};

export function Header({
  translation,
  onToggleLang,
  onToggleTheme,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <a href="#hero" aria-label="Go to top">
          <img src="/favicon.svg" alt="DevPortfolio logo" />
        </a>
        <p>Emad.dev</p>
      </div>

      <nav className={styles.nav} aria-label="Primary">
        <button
          type="button"
          className={styles.burger}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prevState) => !prevState)}>
          <img src="/public/icons/menu.svg" alt="" />
        </button>

        <div className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ""}`}>
          <a href="#hero" onClick={() => setIsMenuOpen(false)}>
            {translation.nav.home}
          </a>
          <a href="#projects" onClick={() => setIsMenuOpen(false)}>
            {translation.nav.projects}
          </a>
          <a href="#experience" onClick={() => setIsMenuOpen(false)}>
            {translation.nav.experience}
          </a>
        </div>
      </nav>

      <div className={styles.inputs}>
        <label className={styles.langToggle} aria-label="Toggle language">
          <input
            className={styles.langToggle__input}
            type="checkbox"
            onChange={onToggleLang}
          />
          <span className={styles.langToggle__track}>
            <span className={styles.langToggle__text}>
              {translation.nav.toggle}
            </span>
          </span>
        </label>

        <label className={styles.themeToggle} aria-label="Toggle theme">
          <input
            type="checkbox"
            className={styles.themeToggle__input}
            onChange={onToggleTheme}
          />

          <span className={styles.themeToggle__track}>
            <span className={styles.themeToggle__icons}>
              <img
                className={styles.themeToggle__icon}
                src="/icons/sun.svg"
                alt=""
              />
              <img
                className={styles.themeToggle__icon}
                src="/icons/moon.svg"
                alt=""
              />
            </span>
          </span>
        </label>
      </div>
    </header>
  );
}
