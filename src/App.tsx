import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import { Header } from "./components/core/Header";
import { translations } from "./i18n/translations";
import type { Lang } from "./i18n/translations";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Footer } from "./components/core/Footer";
import { AiLabActivationButton } from "./features/ai-lab/activation/AiLabActivationButton";
import { AiLabErrorBoundary } from "./features/ai-lab/AiLabErrorBoundary";
import { AiLabLoadingFallback } from "./features/ai-lab/AiLabLoadingFallback";
import { AiLabTransitionOverlay } from "./features/ai-lab/transition/AiLabTransitionOverlay";

const AiLabEntry = lazy(() => import("./features/ai-lab/AiLabEntry"));

type Theme = "dark" | "light";
type AiLabTransitionPhase = "idle" | "scrolling" | "playing";

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function App() {
  const [lang, setLang] = useState<Lang>("es");
  const [aiLabTransitionPhase, setAiLabTransitionPhase] =
    useState<AiLabTransitionPhase>("idle");
  const scrollAnimationFrameRef = useRef<number | null>(null);
  const previousScrollBehaviorRef = useRef<string | null>(null);
  const navigate = useNavigate();
  const toggleLang = () => {
    setLang((prev) => (prev === "es" ? "en" : "es"));
  };

  const [theme, setTheme] = useState<Theme>("dark");
  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    return () => {
      if (scrollAnimationFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollAnimationFrameRef.current);
      }
      if (previousScrollBehaviorRef.current !== null) {
        document.documentElement.style.scrollBehavior =
          previousScrollBehaviorRef.current;
      }
    };
  }, []);

  const handleActivateAiLab = () => {
    if (aiLabTransitionPhase !== "idle") return;

    if (prefersReducedMotion()) {
      const scrollingElement = document.scrollingElement;
      if (scrollingElement) scrollingElement.scrollTop = 0;
      navigate("/ai-lab", { state: { entry: "skip" } });
      return;
    }

    const scrollingElement =
      document.scrollingElement ?? document.documentElement;
    const hero = document.getElementById("hero");
    const currentScrollTop = scrollingElement.scrollTop;
    const heroOffset = hero?.getBoundingClientRect().top ?? -currentScrollTop;
    const targetScrollTop = Math.max(0, currentScrollTop + heroOffset);
    const scrollDistance = targetScrollTop - currentScrollTop;

    if (Math.abs(scrollDistance) <= 2) {
      scrollingElement.scrollTop = targetScrollTop;
      setAiLabTransitionPhase("playing");
      return;
    }

    setAiLabTransitionPhase("scrolling");
    previousScrollBehaviorRef.current =
      document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";

    const scrollStartedAt = performance.now();
    const scrollDuration = Math.min(
      1800,
      Math.max(700, Math.abs(scrollDistance) * 0.35),
    );

    const animateScroll = (now: number) => {
      const progress = Math.min((now - scrollStartedAt) / scrollDuration, 1);
      const easedProgress =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      scrollingElement.scrollTop =
        currentScrollTop + scrollDistance * easedProgress;

      if (progress >= 1) {
        scrollingElement.scrollTop = targetScrollTop;
        document.documentElement.style.scrollBehavior =
          previousScrollBehaviorRef.current ?? "";
        previousScrollBehaviorRef.current = null;
        scrollAnimationFrameRef.current = null;
        setAiLabTransitionPhase("playing");
        return;
      }

      scrollAnimationFrameRef.current = window.requestAnimationFrame(animateScroll);
    };

    scrollAnimationFrameRef.current = window.requestAnimationFrame(animateScroll);
  };

  const enterAiLab = (entry: "cinematic" | "skip") => {
    if (scrollAnimationFrameRef.current !== null) {
      window.cancelAnimationFrame(scrollAnimationFrameRef.current);
      scrollAnimationFrameRef.current = null;
    }
    if (previousScrollBehaviorRef.current !== null) {
      document.documentElement.style.scrollBehavior =
        previousScrollBehaviorRef.current;
      previousScrollBehaviorRef.current = null;
    }
    setAiLabTransitionPhase("idle");
    navigate("/ai-lab", { state: { entry } });
  };

  const handleCompleteAiLabTransition = () => enterAiLab("cinematic");
  const handleSkipAiLabTransition = () => enterAiLab("skip");

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header
              translation={translations[lang]}
              onToggleLang={toggleLang}
              onToggleTheme={toggleTheme}
            />
            <Hero
              translation={translations[lang]}
              isAiLabTransitioning={aiLabTransitionPhase === "playing"}
            />
            <Projects translation={translations[lang]} />
            <Experience translation={translations[lang]} />
            <Footer translation={translations[lang]} />
            <AiLabActivationButton
              translation={translations[lang]}
              onActivate={handleActivateAiLab}
              disabled={aiLabTransitionPhase !== "idle"}
            />
            {aiLabTransitionPhase === "playing" && (
              <AiLabTransitionOverlay
                translation={translations[lang]}
                onComplete={handleCompleteAiLabTransition}
                onSkip={handleSkipAiLabTransition}
                onError={handleSkipAiLabTransition}
              />
            )}
          </>
        }
      />
      <Route
        path="/ai-lab"
        element={
          <AiLabErrorBoundary translation={translations[lang]}>
            <Suspense
              fallback={
                <AiLabLoadingFallback translation={translations[lang]} />
              }
            >
              <AiLabEntry translation={translations[lang]} />
            </Suspense>
          </AiLabErrorBoundary>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
