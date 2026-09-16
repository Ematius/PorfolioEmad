import { translations } from "../../../i18n/translations";
import type { Lang } from "../../../i18n/translations";
import styles from "./AiLabActivationButton.module.scss";

type AiLabActivationButtonProps = {
  translation: (typeof translations)[Lang];
  onActivate: () => void;
};

export function AiLabActivationButton({
  translation,
  onActivate,
}: AiLabActivationButtonProps) {
  const { label, labelShort, ariaLabel } = translation.aiLab.activation;

  return (
    <button
      type="button"
      className={styles.activationButton}
      onClick={onActivate}
      aria-label={ariaLabel}
    >
      <span className={styles.singularity} aria-hidden="true" />
      <span className={styles.label} aria-hidden="true">
        <span className={styles.labelFull}>{label}</span>
        <span className={styles.labelShort}>{labelShort}</span>
      </span>
    </button>
  );
}
