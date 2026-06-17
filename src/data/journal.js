// Full articles for the Journal. Content is block-based so ArticlePage can
// render real long-form layouts (headings, pull-quotes, lists, figures).

export const journal = [
  {
    slug: "90fps-webgl-hero",
    tag: "Engineering",
    title: "How we built a 90fps WebGL hero that still scores 98 on mobile",
    excerpt:
      "A fast 3D hero isn't a contradiction. Here's the performance budget, the tricks, and the cuts we made to keep a WebGL centrepiece from tanking our Lighthouse score.",
    date: "May 2026",
    readingTime: "7 min read",
    author: { name: "Eli Mercer", role: "Lead Engineer" },
    accent: "#ff3d00",
    cover:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    body: [
      { type: "p", text: "Every brief that mentions \"3D\" arrives with a quiet fear attached: that it'll make the site slow. It's a fair worry. A careless WebGL scene will happily eat a phone's battery and your Core Web Vitals in one sitting. But slow isn't inherent to 3D — it's a series of choices, and most of them happen before you write a shader." },
      { type: "h2", text: "Set the budget before the geometry" },
      { type: "p", text: "We start every 3D build with a number, not a model. For a marketing hero the rule is simple: the 3D must never delay the largest contentful paint, and it must hold 60fps on a three-year-old mid-range Android. Everything downstream is negotiated against those two constraints." },
      { type: "quote", text: "The 3D is a guest in the page, not the host. The headline still has to paint first.", cite: "Our one-line performance brief" },
      { type: "h2", text: "Lazy-load the heavy stuff" },
      { type: "p", text: "The single biggest win is also the most boring: the Three.js bundle is code-split and loaded after first paint. The hero text and layout render from a tiny initial bundle; the canvas mounts a beat later. Most visitors never notice the gap, and the ones on slow connections get a clean static fallback instead of a blank rectangle." },
      { type: "list", items: [
        "Dynamic-import the scene so Three.js never blocks the critical path.",
        "Cap the device pixel ratio — rendering at 3x on a retina phone is wasted work.",
        "Feature-detect WebGL and prefers-reduced-motion, and bail to a static SVG when either says no.",
      ] },
      { type: "h2", text: "Cheap tricks that look expensive" },
      { type: "p", text: "A distorted icosahedron with a good material reads as far more complex than it is. We lean on vertex displacement and clever lighting rather than dense meshes. Three thin torus rings and a couple of point lights do more for perceived richness than a million polygons ever would — and they cost almost nothing." },
      { type: "image", src: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1400&q=80", caption: "Perceived complexity beats actual complexity. Light it well and keep the mesh light." },
      { type: "p", text: "The result on our own site: a 3D hero that animates at well over 60fps on desktop, degrades gracefully everywhere else, and leaves the Lighthouse performance score sitting comfortably in the high 90s. Fast and 3D was never the contradiction — careless and 3D was." },
    ],
  },
  {
    slug: "type-at-scale",
    tag: "Craft",
    title: "Type at scale: the grid system behind every Hadron site",
    excerpt:
      "Big type is easy to admire and hard to control. A look at the fluid type scale and baseline grid we reuse on every project to keep headlines sharp from phone to 4K.",
    date: "April 2026",
    readingTime: "6 min read",
    author: { name: "Noa Brandt", role: "Design Director" },
    accent: "#d9c7a3",
    cover:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1600&q=80",
    body: [
      { type: "p", text: "The oversized headline is the defining move of the modern agency site, and it's also where most of them fall apart. A display size that sings at 1440px becomes an unreadable wall on a phone, or a timid whisper on a cinema display. Getting it right isn't taste — it's a system." },
      { type: "h2", text: "Fluid, but with guardrails" },
      { type: "p", text: "Every type size on a Hadron site is a clamp(): a minimum, a fluid middle that scales with the viewport, and a maximum. The headline can breathe across screen sizes without ever collapsing or ballooning past the point of legibility. We tune the middle term in the browser, never in a static comp." },
      { type: "quote", text: "Design the type in the medium it lives in. A headline is a responsive system, not a single rendered size.", cite: "Noa Brandt" },
      { type: "h2", text: "One grid, everywhere" },
      { type: "p", text: "Underneath the type is a single, shared grid — a max width, a fluid gutter, and a baseline rhythm that every section inherits. It's unglamorous infrastructure, but it's why a Hadron site feels coherent as you scroll: nothing is improvised, everything lines up." },
      { type: "list", items: [
        "A fluid gutter that grows with the viewport so margins never feel mean or cavernous.",
        "Tight negative tracking on display sizes; comfortable tracking on body copy.",
        "A baseline rhythm that section padding and line-heights both snap to.",
      ] },
      { type: "image", src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80", caption: "The grid you never see is the one doing the most work." },
      { type: "p", text: "When the system is right, individual pages get faster to design and harder to get wrong. That's the whole point: craft you can repeat is craft that scales." },
    ],
  },
  {
    slug: "fixed-price-honest",
    tag: "Studio",
    title: "Why we quote fixed-price, and how it keeps projects honest",
    excerpt:
      "Hourly billing rewards slowness and punishes clarity. Here's why we quote a number up front — and how that one decision changes the work for the better.",
    date: "March 2026",
    readingTime: "5 min read",
    author: { name: "Priya Raman", role: "Studio Principal" },
    accent: "#7c8cff",
    cover:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80",
    body: [
      { type: "p", text: "Most studios bill by the hour. We don't, and the reason is simpler than it sounds: hourly billing quietly rewards the wrong things. The slower you work and the more you revise, the more you earn. The incentives point away from the client." },
      { type: "h2", text: "A number is a forcing function" },
      { type: "p", text: "When we quote a fixed price, we're forced to understand the project before we start — to scope it honestly, to identify the real risks, and to say no to the parts that won't earn their keep. That conversation is uncomfortable, and it's exactly the one that makes projects succeed." },
      { type: "quote", text: "Fixed-price means we win when the project ships well, not when it drags on. Our incentives and yours finally point the same way.", cite: "Priya Raman" },
      { type: "h2", text: "What it asks of us" },
      { type: "p", text: "It puts the risk of inefficiency on us, where it belongs. If we underestimate, that's our problem to solve, not a surprise on your invoice. It keeps us senior and small — there's no room for a junior to learn on your budget — and it keeps scope conversations explicit instead of buried in a timesheet." },
      { type: "list", items: [
        "You know the cost before you commit. No open-ended meter running.",
        "Scope changes are a conversation, not a silent line-item.",
        "We're motivated to ship, not to linger.",
      ] },
      { type: "p", text: "It's not the right model for every kind of work — true open-ended R&D needs a different shape. But for the websites we build, a fixed number keeps everyone honest, and honesty is the cheapest performance optimisation there is." },
    ],
  },
  {
    slug: "motion-that-respects-the-reader",
    tag: "Motion",
    title: "Designing motion that respects the reader",
    excerpt:
      "Animation should guide attention, not hijack it. The principles we use to make a site feel alive without making it feel exhausting.",
    date: "February 2026",
    readingTime: "6 min read",
    author: { name: "Noa Brandt", role: "Design Director" },
    accent: "#9fb2a1",
    cover:
      "https://images.unsplash.com/photo-1492551557933-34265f7af79e?auto=format&fit=crop&w=1600&q=80",
    body: [
      { type: "p", text: "There's a version of the animated website that's genuinely hostile: elements flying in from every edge, scroll-jacking that fights your trackpad, a parallax layer for every noun. It photographs well and reads terribly. Good motion does the opposite — you feel it before you notice it." },
      { type: "h2", text: "Motion is a pointer, not a fireworks show" },
      { type: "p", text: "Every animation on a Hadron site has a job: to draw the eye to what matters next, to confirm an action, or to give a heavy element a moment to arrive. If a motion can't name its job, it gets cut. Decoration that doesn't direct attention is just noise with a frame rate." },
      { type: "quote", text: "If you remember the animation instead of the content, the animation failed.", cite: "Noa Brandt" },
      { type: "h2", text: "Honour the easing, honour the user" },
      { type: "p", text: "We lean on a small set of expressive easing curves and consistent durations so the whole site moves like one object. And we always — always — respect prefers-reduced-motion. A meaningful share of people get motion sick from the kind of scroll choreography our industry loves. Designing them a calm, complete experience isn't a compromise; it's the job." },
      { type: "list", items: [
        "Reveal content once, on enter — never re-trigger on every scroll pass.",
        "Keep durations short enough that nobody waits on an animation to read.",
        "Provide a full, static-friendly experience for reduced-motion visitors.",
      ] },
      { type: "image", src: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?auto=format&fit=crop&w=1400&q=80", caption: "Restraint is the hardest motion skill — and the most valuable." },
      { type: "p", text: "Done well, motion is invisible infrastructure for attention. The reader glides through the page feeling oriented and unhurried, and never once thinks about the dozens of tiny decisions making that feel effortless. That's the bar." },
    ],
  },
];

export const articleBySlug = (slug) => journal.find((a) => a.slug === slug);
export const relatedArticles = (slug, n = 2) =>
  journal.filter((a) => a.slug !== slug).slice(0, n);
