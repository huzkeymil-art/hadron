import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
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

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();
  useLenis();

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      <Cursor />
      <Grain />
      <ScrollManager />
      <Navbar />

      <main id="main-content" className={`relative z-[2] ${loaded ? "opacity-100" : "opacity-0"}`}>
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
      </main>

      <Footer />
    </>
  );
}
