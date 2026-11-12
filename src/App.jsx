import { createContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useLenis } from "./hooks/useLenis.js";
import { EASE } from "./lib/motion.js";

import { ScrollManager } from "./components/ScrollManager.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { Footer } from "./components/Footer.jsx";

import { Home } from "./pages/Home.jsx";
import { WorkIndex } from "./pages/WorkIndex.jsx";
import { ProjectPage } from "./pages/ProjectPage.jsx";
import { AboutPage } from "./pages/AboutPage.jsx";
import { NotFound } from "./pages/NotFound.jsx";

/** True once the preloader starts lifting — entrance choreography keys off
 *  this so the hero reveals AS the curtain rises, not invisibly beneath it. */
export const RevealContext = createContext(true);

export default function App() {
  // Fresh look: no preloader curtain, the page is ready the moment it loads.
  const revealed = true;
  const location = useLocation();
  useLenis();

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
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
                <Route path="/about" element={<AboutPage />} />
                {/* Old URLs from the previous version of the site */}
                <Route path="/studio" element={<Navigate to="/about" replace />} />
                <Route path="/journal/*" element={<Navigate to="/" replace />} />
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
