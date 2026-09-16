import { Link } from "react-router";
import { translations } from "../../i18n/translations";
import type { Lang } from "../../i18n/translations";
import styles from "./AiLabEntry.module.scss";

type AiLabEntryProps = {
  translation: (typeof translations)[Lang];
};

export default function AiLabEntry({ translation }: AiLabEntryProps) {
  return (
    <section className={styles.AiLabEntry} aria-label="AI Lab">
      <div className={styles.content}>
        <h1>{translation.aiLab.title}</h1>
        <p>{translation.aiLab.description}</p>
        <Link to="/" className={styles.returnButton}>
          {translation.aiLab.returnButton}
        </Link>
      </div>
    </section>
  );
}
