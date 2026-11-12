// Real Hadron projects only — the single source of truth for the Work section,
// the /work index, and each /work/:slug page.
//
// No made-up numbers, clients or quotes. Placeholders start with "[Add".
// To add a screenshot, put it in /public/work/ and set `cover: "/work/name.png"`.

export const projects = [
  {
    slug: "cardstok",
    name: "Cardstok",
    category: "iOS app",
    title: "A comic tracker for collectors",
    subtitle: "An iOS app for keeping track of a comic collection: what you own, what you're reading, and what's next.",
    accent: "#ff3d00",
    year: "[Add year]",
    role: ["Product design", "iOS development"],
    stack: ["iOS"],
    status: "In development",
    link: null,
    cover: null,
    intro:
      "Cardstok started as a personal itch: a better way to keep tabs on comics without a messy spreadsheet. [Add: one or two sentences on what makes it different]",
    did: ["Designed the app's screens and flow", "Built the iOS app", "[Add: anything else you did]"],
  },
  {
    slug: "supermob",
    name: "Supermob",
    category: "iOS app",
    title: "AI cleanup for photos, notes and inbox",
    subtitle: "An iOS app that uses AI to help clear out the clutter in your camera roll, notes and inbox.",
    accent: "#7c5cff",
    year: "[Add year]",
    role: ["Product design", "iOS development", "AI features"],
    stack: ["iOS", "AI"],
    status: "[Add status, e.g. on the App Store]",
    link: null,
    cover: null,
    intro:
      "Phones fill up fast. Supermob looks through photos, notes and email and helps decide what to keep. [Add: how it works in a sentence, and any real numbers you have]",
    did: ["Designed the app", "Built the iOS app", "Wired up the AI cleanup features"],
  },
  {
    slug: "myle",
    name: "Myle",
    category: "iOS app",
    title: "[Add: a one-line description of Myle]",
    subtitle: "[Add: what Myle does, in one sentence]",
    accent: "#00c2a8",
    year: "[Add year]",
    role: ["Product design", "iOS development"],
    stack: ["iOS"],
    status: "[Add status]",
    link: null,
    cover: null,
    intro: "[Add: the story behind Myle in two or three sentences]",
    did: ["[Add: what you did on Myle]"],
  },
  {
    slug: "hadron-app",
    name: "Hadron app",
    category: "Web app",
    title: "The studio's own web app, built on Base44",
    subtitle: "A web app for Hadron Studio, built and hosted on Base44.",
    accent: "#ffb020",
    year: "[Add year]",
    role: ["Design", "Development"],
    stack: ["Base44"],
    status: "Live",
    link: "https://hadron.base44.app",
    cover: null,
    intro: "[Add: what the Hadron app is for and who uses it]",
    did: ["Designed the app", "Built it on Base44"],
  },
];

export const projectBySlug = (slug) => projects.find((p) => p.slug === slug);

export const nextProject = (slug) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};

/** True when a value is still a placeholder Max needs to fill in. */
export const isPlaceholder = (v) => typeof v === "string" && v.trim().startsWith("[Add");
