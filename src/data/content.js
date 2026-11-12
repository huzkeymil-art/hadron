// Single source of truth for all on-page copy.
//
// Anything in [square brackets] starting with "Add" is a placeholder Max still
// needs to fill in before this goes live. Search the repo for "[Add" to find
// every one.

export const SITE_URL = "https://www.hadronstudio.com";

export const studio = {
  name: "Hadron Studio",
  shortName: "Hadron",
  founder: "Max Miller",
  founderRole: "Founder & Creative Developer",
  // [Add: confirm this is the inbox you want on hadronstudio.com]
  email: "hello@hadronwebdesign.com",
  location: "Remote — working with clients anywhere",
  // Real profile links only. Leave empty to hide the socials row everywhere.
  socials: [],
};

export const nav = [
  { label: "Work", to: "/work" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/#services" },
  { label: "Contact", to: "/#contact" },
];

export const hero = {
  eyebrow: "Design & Development Studio",
  lead: "Hadron is an independent studio that designs and builds websites, apps, and the brand content around them. One person from first sketch to launch, so nothing gets lost in a handoff.",
};

export const services = [
  {
    id: "01",
    title: "Websites",
    blurb:
      "Custom websites that load fast, look sharp on every screen, and make it obvious what to do next.",
    points: ["Business & landing sites", "React builds", "3D & motion moments", "Speed & SEO basics"],
  },
  {
    id: "02",
    title: "Apps",
    blurb:
      "iOS and web apps taken from an idea to something people can actually tap through and use.",
    points: ["iOS apps", "Web apps on Base44", "AI-powered features", "Clickable prototypes"],
  },
  {
    id: "03",
    title: "Brand & content",
    blurb:
      "The visuals around the product: graphics, video, and social posts that match the site.",
    points: ["Adobe Creative Cloud", "Video editing & color", "Social media content", "Launch marketing"],
  },
];

export { projects } from "./projects.js";

export const process = [
  { k: "01", title: "Talk", body: "A quick chat about what you need, who it's for, and what a win looks like." },
  { k: "02", title: "Plan & design", body: "A clear plan and a design you sign off on before any code gets written." },
  { k: "03", title: "Build", body: "Built in the open, with preview links you can click through as it comes together." },
  { k: "04", title: "Launch", body: "Go live, then fixes and tweaks as real people start using it." },
];

export const faqs = [
  {
    q: "How much does a project cost?",
    a: "Every project is different, so you get a quote after a short chat about what you need. [Add: a starting price, if you want one shown]",
  },
  {
    q: "How long does it take?",
    a: "[Add: your usual timeline, e.g. how many weeks a simple site takes]",
  },
  {
    q: "Do you build apps as well as websites?",
    a: "Yes. Hadron builds iOS apps and web apps too. Check the Work page for a few of them.",
  },
  {
    q: "Can you make the graphics and video as well?",
    a: "Yes. Logos, social posts and video edits can be part of the same project, so everything matches.",
  },
  {
    q: "What do you need from me?",
    a: "Your goals, any logos, photos or text you already have, and quick feedback when a preview is ready.",
  },
];

export const values = [
  { k: "One maker, start to finish", body: "The person who designs it is the person who builds it. No telephone game." },
  { k: "Fast is part of the design", body: "Pages should load quickly on a phone, not just look good on a big monitor." },
  { k: "Show, don't tell", body: "You see working previews early, so feedback is about the real thing." },
  { k: "Keep learning", body: "New tools, new tricks, tried on side projects before they reach client work." },
];

export const toolkit = [
  "React", "Vite", "Three.js", "Tailwind", "Base44", "iOS", "Adobe Creative Cloud", "DaVinci Resolve",
];

export const studioStory = {
  lead: "Hadron is a small, independent studio for websites, apps and the content around them.",
  body: "It started with building things for fun: apps like Cardstok and Supermob, experiments with 3D on the web, and video work. Hadron turns that into client work, with the same person handling design, code and launch. [Add: a sentence or two in your own words about why you started Hadron]",
};
