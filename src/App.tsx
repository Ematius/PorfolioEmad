import { useState, useEffect } from "react";
import { Header } from "./components/core/Header";
import { translations } from "./i18n/translations";
import type { Lang } from "./i18n/translations";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Footer } from "./components/core/Footer";


type Theme = "dark" | "light";

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
    </>
  );
 
}

export default App;
