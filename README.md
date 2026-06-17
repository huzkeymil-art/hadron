# Hadron Studio

**A design & engineering studio website that looks like it costs a million bucks.**

A complete, production-grade revamp of `hadronstudio.com` — a bold, Swiss-inspired
agency site with a real-time 3D hero, buttery scroll choreography, and a Node
backend. Built to convert ambitious brands into clients.

![Hadron Studio preview](docs/preview.png)

---

## ✦ Highlights

- **Real-time 3D hero** — a distorted "hadron" core with orbital rings (an echo of
  the atom logo), drifting shards, mouse parallax and ember lighting, rendered with
  **Three.js / React Three Fiber** and lazy-loaded so it never blocks first paint.
- **Cinematic motion** — preloader counter, masked text reveals, magnetic buttons,
  a custom morphing cursor, infinite marquees and scroll-driven animation via
  **Framer Motion** + **Lenis** smooth scroll.
- **Twelve crafted sections** — hero, manifesto, services, selected work (with a
  cursor-following preview), process, animated stats, pricing, testimonials,
  client marquee, FAQ, journal and a working contact flow.
- **A real Node backend** — an **Express** API that serves the built site, exposes
  content endpoints, and validates contact submissions with rate-limiting and a
  honeypot.
- **Accessible & fast** — respects `prefers-reduced-motion`, semantic markup,
  fluid Swiss type, code-split bundles, and a ~98 Lighthouse target.

## ✦ Tech stack

| Layer        | Tools                                                            |
| ------------ | --------------------------------------------------------------- |
| Front-end    | React 18, Vite 5                                                 |
| 3D / WebGL   | Three.js, @react-three/fiber, @react-three/drei                 |
| Motion       | Framer Motion, Lenis (smooth scroll)                            |
| Styling      | Tailwind CSS (custom Swiss design tokens)                       |
| Back-end     | Node.js, Express, Helmet, Compression, CORS, Morgan            |
| Tooling      | ESLint 9 (flat config)                                          |

## ✦ Getting started

```bash
# 1. install
npm install

# 2. develop (Vite on :5173 + API on :8080, run together)
npm run dev

# 3. production build + serve from Node
npm run serve         # = npm run build && npm start
# open http://localhost:8080
```

> `npm run dev` runs the Vite dev server and the Express API side-by-side.
> Vite proxies `/api/*` to the Node server, so the contact form works locally.

### Useful scripts

| Script            | Does                                                      |
| ----------------- | -------------------------------------------------------- |
| `npm run dev`     | Vite + API together (hot reload)                         |
| `npm run build`   | Production build to `dist/`                              |
| `npm start`       | Serve `dist/` + API from Node (production)               |
| `npm run serve`   | Build, then start                                        |
| `npm run lint`    | ESLint, zero-warnings                                    |

## ✦ Project structure

```
hadron-studio/
├── server/
│   ├── index.js        # Express app — serves dist + /api + contact handling
│   └── content.js      # structured content served by the API
├── src/
│   ├── three/          # React Three Fiber hero scene
│   ├── components/     # cursor, grain, preloader, navbar, marquee, reveal…
│   ├── sections/       # the 12 page sections
│   ├── hooks/          # Lenis smooth scroll, media queries
│   ├── data/content.js # single source of truth for all copy
│   ├── App.jsx
│   └── index.css       # Tailwind layers + design tokens
└── vite.config.js
```

## ✦ The Node API

| Method | Route            | Purpose                                              |
| ------ | ---------------- | --------------------------------------------------- |
| GET    | `/api/health`    | Liveness / uptime                                   |
| GET    | `/api/projects`  | Portfolio records                                   |
| GET    | `/api/services`  | Service offerings                                   |
| GET    | `/api/pricing`   | Pricing tiers                                        |
| GET    | `/api/stats`     | Headline numbers                                     |
| POST   | `/api/contact`   | Validated enquiries (rate-limited + honeypot)        |

Set `CONTACT_WEBHOOK_URL` (see `.env.example`) to forward submissions to Slack,
a CRM, or an email service; otherwise they're logged server-side.

## ✦ Make it yours

Almost everything is data-driven. Edit **`src/data/content.js`** to change copy,
projects, pricing, testimonials and FAQs — no component edits required. Brand
colours and the type scale live in **`tailwind.config.js`**.

## ✦ Deploy

Any Node host works (Render, Railway, Fly, a VPS):

```bash
npm ci && npm run build && npm start   # binds $PORT, defaults to 8080
```

For a static/edge host, deploy `dist/` and run the Express API separately (or
swap the contact handler for a serverless function).

---

Designed & engineered as a portfolio-grade revamp. Inspired by the bold,
type-led aesthetic of modern Swiss agency sites.
