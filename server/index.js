import express from "express";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { projects, services, pricing, stats } from "./content.js";
import { projects as catalogProjects, projectBySlug, journal, articleBySlug } from "./catalog.js";
import { validateContact, deliver } from "./contact-handler.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 8080;

const app = express();

app.disable("x-powered-by");
app.use(
  helmet({
    // Allow the inline styles / cross-origin assets a marketing site needs.
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);
app.use(compression());
app.use(cors());
app.use(express.json({ limit: "32kb" }));
app.use(morgan(isProd ? "tiny" : "dev"));

/* -------------------------------------------------------------------------- */
/*  Lightweight in-memory rate limiter (per-IP) for the contact endpoint.     */
/* -------------------------------------------------------------------------- */
const HITS = new Map();
const WINDOW_MS = 60_000;
const MAX_HITS = 5;

function rateLimit(req, res, next) {
  const ip = req.ip || req.headers["x-forwarded-for"] || "unknown";
  const now = Date.now();
  const entry = HITS.get(ip) ?? { count: 0, start: now };
  if (now - entry.start > WINDOW_MS) {
    entry.count = 0;
    entry.start = now;
  }
  entry.count += 1;
  HITS.set(ip, entry);
  if (entry.count > MAX_HITS) {
    return res.status(429).json({ ok: false, error: "Too many requests. Try again shortly." });
  }
  next();
}

/* --------------------------------- API ------------------------------------ */
const api = express.Router();

api.get("/health", (_req, res) => {
  res.json({ ok: true, service: "hadron-studio", uptime: process.uptime(), ts: Date.now() });
});

// Content endpoints — the front-end can hydrate from these (Node as a real backend).
api.get("/projects", (_req, res) => res.json({ ok: true, data: projects }));
api.get("/services", (_req, res) => res.json({ ok: true, data: services }));
api.get("/pricing", (_req, res) => res.json({ ok: true, data: pricing }));
api.get("/stats", (_req, res) => res.json({ ok: true, data: stats }));

// Full case studies and articles (mirror the /work and /journal pages).
api.get("/work", (_req, res) =>
  res.json({ ok: true, data: catalogProjects.map(({ body, ...summary }) => summary) })
);
api.get("/work/:slug", (req, res) => {
  const project = projectBySlug(req.params.slug);
  if (!project) return res.status(404).json({ ok: false, error: "Project not found" });
  res.json({ ok: true, data: project });
});
api.get("/journal", (_req, res) =>
  res.json({ ok: true, data: journal.map(({ body, ...summary }) => summary) })
);
api.get("/journal/:slug", (req, res) => {
  const article = articleBySlug(req.params.slug);
  if (!article) return res.status(404).json({ ok: false, error: "Article not found" });
  res.json({ ok: true, data: article });
});

api.post("/contact", rateLimit, async (req, res) => {
  const result = validateContact(req.body ?? {});
  if (result.honeypot) return res.json({ ok: true, queued: true });
  if (result.errors) return res.status(422).json({ ok: false, errors: result.errors });

  await deliver({ ...result.submission, ip: req.ip });
  res.json({
    ok: true,
    id: result.submission.id,
    message: "Thanks — we'll be in touch within 24 hours.",
  });
});

app.use("/api", api);

/* ----------------------- Static (production build) ------------------------ */
if (isProd) {
  const dist = path.resolve(__dirname, "../dist");
  app.use(
    express.static(dist, {
      maxAge: "1y",
      setHeaders: (res, filePath) => {
        if (filePath.endsWith("index.html")) res.setHeader("Cache-Control", "no-cache");
      },
    })
  );
  // SPA fallback.
  app.get("*", (_req, res) => res.sendFile(path.join(dist, "index.html")));
}

app.listen(PORT, () => {
  console.log(`\n  ◆ Hadron Studio API listening on http://localhost:${PORT}`);
  console.log(`  ◆ Mode: ${isProd ? "production (serving /dist)" : "development (API only)"}\n`);
});
