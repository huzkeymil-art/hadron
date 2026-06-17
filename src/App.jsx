import { useState } from "react";
import { useLenis } from "./hooks/useLenis.js";

import { Preloader } from "./components/Preloader.jsx";
import { Cursor } from "./components/Cursor.jsx";
import { Grain } from "./components/Grain.jsx";
import { ScrollProgress } from "./components/ScrollProgress.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { Footer } from "./components/Footer.jsx";

import { Hero } from "./sections/Hero.jsx";
import { Manifesto } from "./sections/Manifesto.jsx";
import { Services } from "./sections/Services.jsx";
import { Work } from "./sections/Work.jsx";
import { Process } from "./sections/Process.jsx";
import { Stats } from "./sections/Stats.jsx";
import { Pricing } from "./sections/Pricing.jsx";
import { Testimonials } from "./sections/Testimonials.jsx";
import { Clients } from "./sections/Clients.jsx";
import { FAQ } from "./sections/FAQ.jsx";
import { Journal } from "./sections/Journal.jsx";
import { Contact } from "./sections/Contact.jsx";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  return (
    <>
      <Preloader onDone={() => setLoaded(true)} />
      <Cursor />
      <Grain />
      <ScrollProgress />
      <Navbar />

      <main className={loaded ? "opacity-100" : "opacity-0"}>
        <Hero />
        <Manifesto />
        <Services />
        <Work />
        <Process />
        <Stats />
        <Clients />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Journal />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
