/** @format */

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { translations } from "../../../i18n/translations";
import type { Lang } from "../../../i18n/translations";
import styles from "./AiLabTransitionOverlay.module.scss";

const DESKTOP_VIDEO = "/videos/ai-lab-transition.mp4";
const TABLET_VIDEO = "/videos/ai-lab-transition-tablet.mp4";
const MOBILE_VIDEO = "/videos/ai-lab-transition-mobile.mp4";

function getTransitionVideoSource(): string {
  if (typeof window === "undefined") return DESKTOP_VIDEO;

  if (window.matchMedia("(max-width: 640px)").matches) {
    return MOBILE_VIDEO;
  }

  if (
    window.matchMedia(
      "(min-width: 641px) and (max-width: 1100px) and (orientation: portrait)",
    ).matches
  ) {
    return TABLET_VIDEO;
  }

  return DESKTOP_VIDEO;
}

type AiLabTransitionOverlayProps = {
  translation: (typeof translations)[Lang];
  onComplete: () => void;
  onSkip: () => void;
  onError: () => void;
};

export function AiLabTransitionOverlay({
  translation,
  onComplete,
  onSkip,
  onError,
}: AiLabTransitionOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const soundButtonRef = useRef<HTMLButtonElement>(null);
  const skipButtonRef = useRef<HTMLButtonElement>(null);
  const onErrorRef = useRef(onError);
  const completionHandledRef = useRef(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [videoSource] = useState(getTransitionVideoSource);
  const labels = translation.aiLab.transition;

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    skipButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onSkip();
      }

      if (event.key === "Tab") {
        const soundButton = soundButtonRef.current;
        const skipButton = skipButtonRef.current;
        if (!soundButton || !skipButton) return;

        if (event.shiftKey && document.activeElement === soundButton) {
          event.preventDefault();
          skipButton.focus();
        } else if (!event.shiftKey && document.activeElement === skipButton) {
          event.preventDefault();
          soundButton.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onSkip]);

  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startPlayback = async () => {
      try {
        await video.play();
      } catch {
        video.muted = true;
        setIsMuted(true);

        try {
          await video.play();
        } catch {
          onErrorRef.current();
        }
      }
    };

    void startPlayback();
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMutedState = !video.muted;
    video.muted = nextMutedState;
    setIsMuted(nextMutedState);
  };

  const handleEnded = () => {
    if (completionHandledRef.current) return;
    completionHandledRef.current = true;

    videoRef.current?.pause();
    setHasEnded(true);
    onComplete();
  };

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={labels.ariaLabel}>
      {!hasStarted && (
        <p className={styles.loading} role="status" aria-live="polite">
          {labels.loading}
        </p>
      )}

      <video
        ref={videoRef}
        className={`${styles.video} ${hasStarted ? styles.videoVisible : ""} ${
          hasEnded ? styles.videoHandoff : ""
        }`}
        src={videoSource}
        preload="auto"
        playsInline
        onPlaying={() => setHasStarted(true)}
        onEnded={handleEnded}
        onError={() => onErrorRef.current()}
      />

      {!hasEnded && (
        <div className={styles.controls}>
          <button
            ref={soundButtonRef}
            type="button"
            className={styles.controlButton}
            onClick={toggleSound}
            aria-pressed={isMuted}>
            {isMuted ? labels.unmute : labels.mute}
          </button>
          <button
            ref={skipButtonRef}
            type="button"
            className={styles.controlButton}
            onClick={onSkip}>
            {labels.skip}
          </button>
        </div>
      )}

      {!hasEnded && <div className={styles.progress} aria-hidden="true" />}
    </div>
  );
}
