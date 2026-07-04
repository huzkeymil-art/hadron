import { createContext, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useLenis } from "./hooks/useLenis.js";
import { EASE } from "./lib/motion.js";

import { Preloader } from "./components/Preloader.jsx";
import { Cursor } from "./components/Cursor.jsx";
import { Grain } from "./components/Grain.jsx";
import { ScrollManager } from "./components/ScrollManager.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { Footer } from "./components/Footer.jsx";

import { Home } from "./pages/Home.jsx";
import { WorkIndex } from "./pages/WorkIndex.jsx";
import { ProjectPage } from "./pages/ProjectPage.jsx";
import { JournalIndex } from "./pages/JournalIndex.jsx";
import { ArticlePage } from "./pages/ArticlePage.jsx";
import { StudioPage } from "./pages/StudioPage.jsx";
import { NotFound } from "./pages/NotFound.jsx";

/** True once the preloader starts lifting — entrance choreography keys off
 *  this so the hero reveals AS the curtain rises, not invisibly beneath it. */
export const RevealContext = createContext(true);

export default function App() {
  // revealed: the preloader has started its lift — begin the choreography.
  // gone: the lift finished — unmount the preloader.
  const [revealed, setRevealed] = useState(false);
  const [gone, setGone] = useState(false);
  const location = useLocation();
  useLenis();

  // The covered page shouldn't be reachable by keyboard or AT while the
  // preloader is up.
  useEffect(() => {
    const els = document.querySelectorAll("header, main, footer");
    els.forEach((el) => {
      el.inert = !revealed;
    });
  }, [revealed]);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      {!gone && <Preloader onReveal={() => setRevealed(true)} onDone={() => setGone(true)} />}
      <Cursor />
      <Grain />
      <ScrollManager />
      <Navbar />

      <main
        id="main-content"
        tabIndex={-1}
        className={`relative z-[2] outline-none transition-opacity duration-500 ${revealed ? "opacity-100" : "opacity-0"}`}
      >
        <RevealContext.Provider value={revealed}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE.out } }}
              exit={{ opacity: 0, transition: { duration: 0.25, ease: EASE.out } }}
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/work" element={<WorkIndex />} />
                <Route path="/work/:slug" element={<ProjectPage />} />
                <Route path="/studio" element={<StudioPage />} />
                <Route path="/journal" element={<JournalIndex />} />
                <Route path="/journal/:slug" element={<ArticlePage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </RevealContext.Provider>
      </main>

      <Footer />
    </MotionConfig>
  );
}
