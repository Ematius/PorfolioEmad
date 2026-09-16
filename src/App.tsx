import { useState, useEffect } from "react";
import { Header } from "./components/core/Header";
import { translations } from "./i18n/translations";
import type { Lang } from "./i18n/translations";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Footer } from "./components/core/Footer";
import { AiLabActivationButton } from "./features/ai-lab/activation/AiLabActivationButton";

type Theme = "dark" | "light";

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function App() {

  const [lang, setLang] = useState<Lang>("es");
  const toggleLang = () => {
    setLang((prev) => (prev === "es" ? "en" : "es"));
  };

  const [theme, setTheme] = useState<Theme>("dark");
  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const handleActivateAiLab = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <>
      <Header
        translation={translations[lang]}
        onToggleLang={toggleLang}
        onToggleTheme={toggleTheme}
      />
      <Hero translation={translations[lang]}></Hero>
      <Projects translation={translations[lang]}></Projects>
      <Experience translation={translations[lang]}></Experience>
      <Footer translation={translations[lang]}></Footer>
      <AiLabActivationButton
        translation={translations[lang]}
        onActivate={handleActivateAiLab}
      />
    </>
  );

}

export default App;
