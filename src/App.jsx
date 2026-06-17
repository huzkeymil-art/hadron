import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useLenis } from "./hooks/useLenis.js";

import { Preloader } from "./components/Preloader.jsx";
import { Cursor } from "./components/Cursor.jsx";
import { Grain } from "./components/Grain.jsx";
import { ScrollProgress } from "./components/ScrollProgress.jsx";
import { ScrollManager } from "./components/ScrollManager.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { Footer } from "./components/Footer.jsx";

import { Home } from "./pages/Home.jsx";
import { WorkIndex } from "./pages/WorkIndex.jsx";
import { ProjectPage } from "./pages/ProjectPage.jsx";
import { JournalIndex } from "./pages/JournalIndex.jsx";
import { ArticlePage } from "./pages/ArticlePage.jsx";
import { NotFound } from "./pages/NotFound.jsx";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Preloader onDone={() => setLoaded(true)} />
      <Cursor />
      <Grain />
      <ScrollProgress />
      <ScrollManager />
      <Navbar />

      <main id="main-content" className={loaded ? "opacity-100" : "opacity-0"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<WorkIndex />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
          <Route path="/journal" element={<JournalIndex />} />
          <Route path="/journal/:slug" element={<ArticlePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
