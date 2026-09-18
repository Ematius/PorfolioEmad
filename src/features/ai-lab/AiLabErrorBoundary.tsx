import { Component } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router";
import { translations } from "../../i18n/translations";
import type { Lang } from "../../i18n/translations";
import styles from "./AiLabEntry.module.scss";

type AiLabErrorBoundaryProps = {
  translation: (typeof translations)[Lang];
  children: ReactNode;
};

type AiLabErrorBoundaryState = {
  hasError: boolean;
};

export class AiLabErrorBoundary extends Component<
  AiLabErrorBoundaryProps,
  AiLabErrorBoundaryState
> {
  state: AiLabErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AiLabErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      const { translation } = this.props;
      return (
        <section className={styles.AiLabEntry} aria-label="AI Lab">
          <div className={styles.content}>
            <h1>{translation.aiLab.errorTitle}</h1>
            <p>{translation.aiLab.errorDescription}</p>
            <Link to="/" className={styles.returnButton}>
              {translation.aiLab.errorReturnButton}
            </Link>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
