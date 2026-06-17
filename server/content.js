// Canonical structured content served by the Node API (/api/projects, etc.).
// The front-end ships its own richer copy in src/data/content.js; these are the
// machine-readable records a CMS or external integration would consume.

export const projects = [
  { id: "outside", client: "Outside", year: "2025", scope: "Brand · Site · Motion", category: "Editorial" },
  { id: "juvede", client: "Juvédé", year: "2025", scope: "E-commerce · 3D", category: "Commerce" },
  { id: "zaine", client: "Zaine", year: "2024", scope: "Product · Design System", category: "Platform" },
  { id: "wallout", client: "Wall Out", year: "2024", scope: "Campaign · WebGL", category: "Experience" },
  { id: "geaton", client: "Geaton", year: "2024", scope: "Identity · Site", category: "Editorial" },
  { id: "skate", client: "Skate Dept.", year: "2023", scope: "Brand · Commerce", category: "Commerce" },
];

export const services = [
  { id: "01", title: "Strategy", blurb: "Positioning, narrative, and the hard decisions made before a single pixel." },
  { id: "02", title: "Design", blurb: "Art direction and interface design with an obsessive eye for type and motion." },
  { id: "03", title: "Engineering", blurb: "React, Three.js and WebGL builds that stay fast under real-world load." },
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

export const stats = [
  { value: 2.06, suffix: "M", label: "Users reached across launches" },
  { value: 160, suffix: "K", label: "Avg. monthly sessions delivered" },
  { value: 98, suffix: "", label: "Lighthouse performance median" },
  { value: 47, suffix: "+", label: "Brands shipped since 2018" },
];
