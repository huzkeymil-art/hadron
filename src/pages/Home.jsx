import { Seo } from "../components/Seo.jsx";
import { Hero } from "../sections/Hero.jsx";
import { Services } from "../sections/Services.jsx";
import { Work } from "../sections/Work.jsx";
import { Process } from "../sections/Process.jsx";
import { FAQ } from "../sections/FAQ.jsx";
import { Contact } from "../sections/Contact.jsx";

export function Home() {
  return (
    <>
      <Seo description="Hadron Studio designs and builds websites, apps and brand content. Design, code and launch, handled by one maker." />
      <Hero />
      <Services />
      <Work />
      <Process />
      <FAQ />
      <Contact />
    </>
  );
}
