import { Seo } from "../components/Seo.jsx";
import { Hero } from "../sections/Hero.jsx";
import { Manifesto } from "../sections/Manifesto.jsx";
import { Services } from "../sections/Services.jsx";
import { Work } from "../sections/Work.jsx";
import { Process } from "../sections/Process.jsx";
import { Stats } from "../sections/Stats.jsx";
import { Awards } from "../sections/Awards.jsx";
import { Pricing } from "../sections/Pricing.jsx";
import { Testimonials } from "../sections/Testimonials.jsx";
import { Clients } from "../sections/Clients.jsx";
import { FAQ } from "../sections/FAQ.jsx";
import { Journal } from "../sections/Journal.jsx";
import { Contact } from "../sections/Contact.jsx";

export function Home() {
  return (
    <>
      <Seo description="Hadron is a small, senior design & engineering studio building high-impact, performance-obsessed websites for ambitious brands." />
      <Hero />
      <Manifesto />
      <Services />
      <Work />
      <Process />
      <Stats />
      <Awards />
      <Clients />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Journal />
      <Contact />
    </>
  );
}
