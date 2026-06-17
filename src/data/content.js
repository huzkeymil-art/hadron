// Single source of truth for all on-page copy. Keeping it here makes the
// sections declarative and trivial to wire to a CMS later.

export const studio = {
  name: "Hadron Studio",
  shortName: "Hadron",
  email: "studio@hadronstudio.com",
  phone: "+1 (555) 204-0192",
  location: "Brooklyn, NY — working worldwide",
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Dribbble", href: "https://dribbble.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "GitHub", href: "https://github.com" },
  ],
};

export const nav = [
  { label: "Work", to: "/work" },
  { label: "Studio", to: "/studio" },
  { label: "Services", to: "/#services" },
  { label: "Pricing", to: "/#pricing" },
  { label: "Journal", to: "/journal" },
  { label: "Contact", to: "/#contact" },
];

export const hero = {
  eyebrow: "Design & Engineering Studio",
  // Split into lines so we can stagger-reveal each one.
  headline: ["We engineer", "websites that", "move markets."],
  lead: "Hadron is a small, senior studio that turns ambitious brands into the fastest, sharpest version of themselves on the web — strategy, design, and code under one roof.",
  meta: [
    { k: "Est.", v: "2018" },
    { k: "Projects", v: "47+" },
    { k: "Avg. Lighthouse", v: "98" },
  ],
};

export const manifesto = {
  kicker: "Our belief",
  lines: ["Strategy", "before", "pixels."],
  body: "Anyone can push pixels. We start with the uncomfortable questions — who is this really for, what should it do to the bottom line, and what gets cut. Every result we ship started with a problem worth solving.",
};

export const services = [
  {
    id: "01",
    title: "Strategy",
    blurb:
      "Positioning, narrative and the hard decisions made before a single pixel. We pressure-test the idea so the build never wobbles.",
    points: ["Brand & narrative", "Information architecture", "Conversion strategy", "Competitive teardown"],
  },
  {
    id: "02",
    title: "Design",
    blurb:
      "Art direction and interface design with an obsessive eye for type, grid and motion. Distinctive, never decorative.",
    points: ["Art direction", "Design systems", "Motion design", "Prototyping"],
  },
  {
    id: "03",
    title: "Engineering",
    blurb:
      "React, Three.js and WebGL builds that stay fast under real-world load. Beautiful is the floor; performant is the standard.",
    points: ["React / Next", "Three.js & WebGL", "Headless CMS", "Performance & SEO"],
  },
];

// Project case studies live in ./projects.js; articles live in ./journal.js.
// Re-exported here so existing imports keep working.
export { projects } from "./projects.js";
export { journal } from "./journal.js";

export const process = [
  { k: "01", title: "Discover", body: "Workshops, audits and a sharp brief. We align on the single metric that matters." },
  { k: "02", title: "Design", body: "Art direction, systems and motion. We prototype in-browser, not just in Figma." },
  { k: "03", title: "Build", body: "Senior engineers ship production React. No handoff gap, no agency translation tax." },
  { k: "04", title: "Launch & grow", body: "We measure, iterate and stay on as a partner well past go-live." },
];

export const stats = [
  { value: 2.06, suffix: "M", label: "Users reached across launches" },
  { value: 160, suffix: "K", label: "Avg. monthly sessions delivered" },
  { value: 98, suffix: "", label: "Lighthouse performance median" },
  { value: 47, suffix: "+", label: "Brands shipped since 2018" },
];

export const pricing = [
  {
    id: "foundation",
    name: "Foundation",
    price: "$8,500",
    cadence: "fixed project",
    summary: "A sharp marketing site for teams that need to launch credibly, fast.",
    features: ["Up to 6 sections", "Custom design system", "Framer Motion interactions", "CMS-ready build", "2 revision rounds"],
  },
  {
    id: "growth",
    name: "Growth",
    price: "$24,000",
    cadence: "fixed project",
    featured: true,
    summary: "A flagship site with signature 3D moments and a measurable conversion focus.",
    features: ["Up to 14 sections", "Three.js / WebGL hero", "Advanced scroll choreography", "Analytics + A/B ready", "Headless CMS integration", "4 revision rounds"],
  },
  {
    id: "scale",
    name: "Scale",
    price: "$10k+",
    cadence: "per month",
    summary: "An embedded partner for brands shipping continuously across surfaces.",
    features: ["Dedicated design + eng pod", "Roadmap & experimentation", "Design system governance", "Priority turnaround", "Quarterly strategy reviews"],
  },
];

export const testimonials = [
  {
    quote:
      "We launched in two weeks and had paying customers by week three. Hadron worked with the focus of a team twice its size — and made our redesign feel inevitable.",
    name: "Sarah Levin",
    role: "Founder, Juvédé",
  },
  {
    quote:
      "The hardest part of building a website isn't the code — it's knowing what to leave out. Hadron is the rare studio that solves the problem the visitor actually has.",
    name: "Marcus Webb",
    role: "VP Product, Zaine",
  },
  {
    quote:
      "Structured workflow, fast turnaround, and a finish that made our launch seamless. They've become the trusted partner for every major creative push.",
    name: "Adrian Cole",
    role: "CMO, Wall Out",
  },
];

export const clients = [
  "Outside", "Juvédé", "Zaine", "Wall Out", "Geaton", "Skate Dept.", "Northbound", "Atelier 9", "Forma",
];

export const awards = [
  { name: "Awwwards", detail: "Site of the Day ×4", year: "2025" },
  { name: "CSS Design Awards", detail: "Best UI / UX", year: "2025" },
  { name: "FWA", detail: "Site of the Day", year: "2024" },
  { name: "Webby", detail: "Honoree", year: "2024" },
];

export const faqs = [
  {
    q: "How long does a typical project take?",
    a: "A Foundation site runs 3–4 weeks. Flagship Growth builds are typically 6–10 weeks depending on the depth of 3D and content. We'll give you a firm timeline in the proposal.",
  },
  {
    q: "Do you work with our existing team?",
    a: "Often. We slot in alongside in-house design and product teams, or run end-to-end. Either way you work directly with the people building the thing — no account-manager telephone game.",
  },
  {
    q: "What's included after launch?",
    a: "Every build ships with documentation and a 30-day warranty. Scale clients keep us on retainer for ongoing design and engineering. Project clients can book us back any time.",
  },
  {
    q: "Can you handle the 3D / WebGL ourselves?",
    a: "Yes — it's a core competency, not something we outsource. Three.js, React Three Fiber and custom shaders are written in-house by the same engineers building the rest of the site.",
  },
  {
    q: "What does a project need from us?",
    a: "A decision-maker who can give feedback in one voice, your brand assets, and content (we can help shape it). The tighter the feedback loop, the faster the ship date.",
  },
];

export const values = [
  { k: "Senior, always", body: "No juniors learning on your budget. The people who scope the work are the people who ship it." },
  { k: "Strategy before pixels", body: "We earn the right to design by understanding the business first. Pretty that doesn't perform is just expensive." },
  { k: "Performance is a feature", body: "Fast is part of the brief, not an afterthought. We budget for it from day one and defend it to launch." },
  { k: "Ship, then sharpen", body: "We get something real in front of people quickly, then refine against reality instead of opinion." },
];

export const team = [
  {
    name: "Priya Raman",
    role: "Studio Principal",
    bio: "Sets the strategy and keeps every engagement honest. Fifteen years turning fuzzy briefs into sharp products.",
    photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Noa Brandt",
    role: "Design Director",
    bio: "Owns the look and the feel — type, grid, motion. Believes restraint is the hardest design skill.",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Eli Mercer",
    role: "Lead Engineer",
    bio: "Writes the React, Three.js and shaders. Obsessed with shipping 3D that still scores 98 on a phone.",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Dana Okafor",
    role: "Producer",
    bio: "Keeps timelines tight and feedback flowing. The reason projects ship on the date we promised.",
    photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=800&q=80",
  },
];

export const studioStory = {
  lead: "Hadron is a small studio by design. We stay senior, take on a handful of projects at a time, and put the people who do the work in the room with you.",
  body: "We started in 2018, tired of agencies that sold strategy decks and outsourced the build. So we made the opposite: one team that owns the whole arc — positioning, art direction, and production engineering — and is measured on whether the thing actually performs. No translation tax, no telephone game, no hand-off cliff.",
};
