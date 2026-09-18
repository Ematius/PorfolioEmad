import { translations } from "../../i18n/translations";
import type { Lang } from "../../i18n/translations";
import styles from "./AiLabEntry.module.scss";

type AiLabLoadingFallbackProps = {
  translation: (typeof translations)[Lang];
};

export function AiLabLoadingFallback({ translation }: AiLabLoadingFallbackProps) {
  return (
    <section className={styles.AiLabEntry} aria-label="AI Lab">
      <div className={styles.content} role="status" aria-live="polite">
        <p>{translation.aiLab.loading}</p>
      </div>
    </section>
  );
}
