// Full case-study data — the single source of truth for the Work section, the
// /work index, and each /work/:slug page. Plain data so the Node API can serve
// it too (see server/catalog.js).

export const projects = [
  {
    slug: "outside",
    client: "Outside",
    title: "An editorial flagship for the outdoor set",
    subtitle:
      "We rebuilt Outside's digital home as a fast, editorial-first platform that makes long-form adventure journalism feel cinematic again.",
    year: "2025",
    category: "Editorial",
    accent: "#ff3d00",
    role: ["Strategy", "Art Direction", "Design", "Engineering"],
    duration: "9 weeks",
    liveUrl: "outsidemag.example.com",
    scene: { variant: "knot", color: "#ff3d00" },
    cover:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1600&q=80",
    intro:
      "Outside had the best outdoor writing on the internet trapped inside a slow, ad-choked template. Readers bounced before the first scroll. We were brought in to make the journalism the product again.",
    challenge:
      "Twelve years of legacy CMS cruft had buried the stories. Pages took 6+ seconds to load, the type system was inconsistent across 40,000 articles, and mobile readers — 70% of traffic — got the worst of it.",
    approach:
      "We started with a content audit, not a moodboard. Once we understood how people actually read, we designed a single, ruthless editorial grid and a type scale that holds from a 320px phone to a 4K display. Then we rebuilt the front-end in React with streaming and aggressive image optimisation.",
    solution:
      "A new article template with a reading-progress spine, inline immersive media, and a 3D cover treatment for flagship features. Everything is server-rendered for speed and indexability, then hydrated for interaction.",
    metrics: [
      { value: 2.1, suffix: "M", label: "Monthly readers at launch" },
      { value: 61, suffix: "%", label: "Drop in bounce rate" },
      { value: 99, suffix: "", label: "Lighthouse performance" },
      { value: 1.2, suffix: "s", label: "Median load time" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1465311440653-ba9b1d9b0f5b?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1400&q=80",
    ],
    stack: ["React", "Three.js", "Headless CMS", "Edge rendering"],
    testimonial: {
      quote:
        "They treated our archive like it mattered. The new site is the first time the reading experience has matched the writing.",
      name: "Dana Whitlock",
      role: "Editor-in-Chief, Outside",
    },
  },
  {
    slug: "juvede",
    client: "Juvédé",
    title: "A 3D-led storefront with a 41% lift in AOV",
    subtitle:
      "A skincare house wanted their products to feel as considered online as they do in hand. We gave every SKU a real-time 3D presence.",
    year: "2025",
    category: "Commerce",
    accent: "#d9c7a3",
    role: ["Art Direction", "3D", "Design", "Engineering"],
    duration: "11 weeks",
    liveUrl: "juvede.example.com",
    scene: { variant: "crystal", color: "#d9c7a3" },
    cover:
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1600&q=80",
    intro:
      "Juvédé's products sell on texture and ritual — neither of which survive a flat product photo. We set out to make the storefront feel like the unboxing.",
    challenge:
      "Premium skincare lives or dies on perceived quality. Their old Shopify theme flattened a $90 serum into the same grey card as a $9 one. Conversion was fine; average order value was stuck.",
    approach:
      "We modelled the hero products in 3D and built a configurator that lets shoppers rotate, light, and explore each bottle. The whole system is performance-budgeted: models stream progressively and fall back to crisp stills on slow connections.",
    solution:
      "A storefront where the product is the hero — literally spinning in WebGL — paired with a calm, editorial commerce flow. Bundles and routines are surfaced contextually, lifting basket size without a hard sell.",
    metrics: [
      { value: 41, suffix: "%", label: "Increase in average order value" },
      { value: 2.4, suffix: "x", label: "Time on product pages" },
      { value: 28, suffix: "%", label: "Lift in conversion rate" },
      { value: 0, suffix: "", label: "Compromise on load speed" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=1400&q=80",
    ],
    stack: ["React", "Three.js / R3F", "Shopify Hydrogen", "Node"],
    testimonial: {
      quote:
        "We launched in two weeks and had paying customers by week three. The 3D didn't just look good — it moved the number that matters.",
      name: "Sarah Levin",
      role: "Founder, Juvédé",
    },
  },
  {
    slug: "zaine",
    client: "Zaine",
    title: "A product platform that scaled to 160k MAU",
    subtitle:
      "We designed and built the marketing site and design system for a fast-growing scheduling platform — then helped it stay coherent as it grew.",
    year: "2024",
    category: "Platform",
    accent: "#7c8cff",
    role: ["Strategy", "Design Systems", "Engineering"],
    duration: "14 weeks",
    liveUrl: "zaine.example.com",
    scene: { variant: "particles", color: "#7c8cff" },
    cover:
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=1600&q=80",
    intro:
      "Zaine had product-market fit and a marketing site that couldn't keep up. Every new feature meant a bespoke page and a fresh inconsistency.",
    challenge:
      "Growth was outpacing the brand. Six people were shipping pages with no shared system, so the site fractured — three button styles, four greys, zero confidence.",
    approach:
      "We built a tokenised design system and a library of composable sections, documented so any engineer could assemble an on-brand page in an afternoon. The marketing site became the reference implementation.",
    solution:
      "A crisp, motion-considered platform site backed by a system that scaled with the team. New pages now ship in hours, not weeks, and they all look like Zaine.",
    metrics: [
      { value: 160, suffix: "K", label: "Monthly active users" },
      { value: 5, suffix: "x", label: "Faster page production" },
      { value: 43, suffix: "%", label: "More demo signups" },
      { value: 100, suffix: "%", label: "Design-system adoption" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
    ],
    stack: ["React", "Design Tokens", "Storybook", "TypeScript"],
    testimonial: {
      quote:
        "The hardest part of building a website isn't the code — it's knowing what to leave out. Hadron solved the problem our visitors actually had.",
      name: "Marcus Webb",
      role: "VP Product, Zaine",
    },
  },
  {
    slug: "wallout",
    client: "Wall Out",
    title: "A WebGL campaign that broke launch records",
    subtitle:
      "A climbing brand's product drop, reimagined as an interactive WebGL experience that turned a launch day into a launch week.",
    year: "2024",
    category: "Experience",
    accent: "#ff5a1f",
    role: ["Concept", "Art Direction", "WebGL", "Engineering"],
    duration: "7 weeks",
    liveUrl: "wallout.example.com",
    scene: { variant: "prism", color: "#ff5a1f" },
    cover:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80",
    intro:
      "Wall Out didn't want another product page. They wanted the drop to feel like an event — something people would screenshot and send.",
    challenge:
      "Hype is hard to manufacture. A static landing page wasn't going to generate the social energy a limited drop needed, and the window was tight: seven weeks to launch.",
    approach:
      "We built a scroll-driven WebGL journey that reveals the product through a tactile, physics-flavoured sequence. Every interaction is shareable, and the whole thing is tuned to hold 60fps on a mid-range phone.",
    solution:
      "An experience site that doubled as the campaign. The drop sold out in under an hour, and the experience kept driving traffic for a week as it spread.",
    metrics: [
      { value: 100, suffix: "%", label: "Sold out in under an hour" },
      { value: 3.8, suffix: "x", label: "Launch-week traffic vs. forecast" },
      { value: 240, suffix: "K", label: "Organic social impressions" },
      { value: 62, suffix: "fps", label: "Median on mobile" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1516592673884-4a382d1124c2?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1400&q=80",
    ],
    stack: ["Three.js", "GLSL shaders", "Framer Motion", "Node"],
    testimonial: {
      quote:
        "Structured workflow, fast turnaround, and a finish that made our launch seamless. They've become our partner for every major push.",
      name: "Adrian Cole",
      role: "CMO, Wall Out",
    },
  },
  {
    slug: "geaton",
    client: "Geaton",
    title: "An identity and site for a quiet luxury house",
    subtitle:
      "A restrained, type-led identity and website for a furniture maker who believes the work should speak louder than the marketing.",
    year: "2024",
    category: "Editorial",
    accent: "#9fb2a1",
    role: ["Identity", "Art Direction", "Design", "Engineering"],
    duration: "8 weeks",
    liveUrl: "geaton.example.com",
    scene: { variant: "sphere", color: "#9fb2a1" },
    cover:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80",
    intro:
      "Geaton makes furniture meant to last decades. Their brand needed the same sense of permanence — calm, confident, and free of trend.",
    challenge:
      "Luxury restraint is easy to get wrong. Too sparse reads as unfinished; too rich reads as loud. The site had to feel expensive without ever shouting about it.",
    approach:
      "We built the identity around a single, beautifully set typeface and a generous grid. Motion is minimal and intentional — slow fades, considered reveals — so attention stays on the craft.",
    solution:
      "A website that feels like a well-made object: quiet, precise, tactile. Each piece gets room to breathe, photographed and presented like the heirloom it is.",
    metrics: [
      { value: 3.1, suffix: "x", label: "Increase in enquiry quality" },
      { value: 54, suffix: "%", label: "Longer average session" },
      { value: 18, suffix: "", label: "Press features post-launch" },
      { value: 100, suffix: "", label: "Lighthouse accessibility" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1400&q=80",
    ],
    stack: ["React", "Three.js", "Sanity CMS", "Node"],
    testimonial: {
      quote:
        "They understood that for us, less really is more. The restraint in the final design is exactly what our clients respond to.",
      name: "Tomas Geaton",
      role: "Founder, Geaton",
    },
  },
  {
    slug: "skate-dept",
    client: "Skate Dept.",
    title: "A commerce brand built to be screenshotted",
    subtitle:
      "A loud, kinetic identity and storefront for a skate label that lives on social — designed so every frame is a potential post.",
    year: "2023",
    category: "Commerce",
    accent: "#ff7a00",
    role: ["Brand", "Design", "Engineering"],
    duration: "6 weeks",
    liveUrl: "skatedept.example.com",
    scene: { variant: "rings", color: "#ff7a00" },
    cover:
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1600&q=80",
    intro:
      "Skate Dept. sells to a crowd that decides in a thumb-scroll. The brand needed to be instantly legible and endlessly shareable.",
    challenge:
      "Their audience never visits a homepage — they arrive from a story or a reel. Every page had to work as a standalone, screenshot-ready moment while still selling.",
    approach:
      "We leaned into kinetic type, bold colour, and motion that feels like the culture. The storefront is built mobile-first, with social-native aspect ratios baked into the layout system.",
    solution:
      "A storefront that looks like the feed it lives in. Product pages double as content, and the whole thing loads instantly on the cheapest phone in the room.",
    metrics: [
      { value: 3.6, suffix: "x", label: "Social-referred revenue" },
      { value: 49, suffix: "%", label: "Repeat-customer rate" },
      { value: 220, suffix: "K", label: "First-month visitors" },
      { value: 1.4, suffix: "s", label: "Median mobile load" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1547447134-cd3f5c716030?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1572776685600-aca8c3456337?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1564982752979-3f7bc974d29a?auto=format&fit=crop&w=1400&q=80",
    ],
    stack: ["React", "Three.js", "Framer Motion", "Shopify"],
    testimonial: {
      quote:
        "Every page looks like something you'd want to repost. That was the whole brief, and they nailed it.",
      name: "Remy Ortiz",
      role: "Creative Lead, Skate Dept.",
    },
  },
];

// Short pull-quotes for the in-page "signature" 3D band on each case study.
export const signatures = {
  outside: "Journalism, finally faster than the scroll.",
  juvede: "When the product is the hero, the page sells itself.",
  zaine: "One system. Every page on-brand, in hours.",
  wallout: "A launch that felt like an event.",
  geaton: "Quiet, precise, and built to last.",
  "skate-dept": "Every frame, a reason to repost.",
};

// Each case study gets a second, complementary 3D variant mid-page for variety.
export const secondaryScene = {
  knot: "rings",
  crystal: "prism",
  particles: "sphere",
  prism: "crystal",
  sphere: "particles",
  rings: "knot",
};

/** Lookup helpers used by pages. */
export const projectBySlug = (slug) => projects.find((p) => p.slug === slug);
export const nextProject = (slug) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};
