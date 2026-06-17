import express from "express";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { projects, services, pricing, stats } from "./content.js";

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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

api.post("/contact", rateLimit, async (req, res) => {
  const { name, email, company, budget, message, _hp } = req.body ?? {};

  // Honeypot — bots fill hidden fields, humans don't.
  if (_hp) return res.json({ ok: true, queued: true });

  const errors = {};
  if (!name || String(name).trim().length < 2) errors.name = "Please tell us your name.";
  if (!email || !EMAIL_RE.test(String(email))) errors.email = "A valid email is required.";
  if (!message || String(message).trim().length < 10)
    errors.message = "A little more detail helps us scope your project.";

  if (Object.keys(errors).length) {
    return res.status(422).json({ ok: false, errors });
  }

  const submission = {
    id: `hs_${Date.now().toString(36)}`,
    name: String(name).trim(),
    email: String(email).trim(),
    company: company ? String(company).trim() : null,
    budget: budget ? String(budget).trim() : null,
    message: String(message).trim(),
    receivedAt: new Date().toISOString(),
    ip: req.ip,
  };

  // Forward to a webhook if configured, otherwise log it server-side.
  if (process.env.CONTACT_WEBHOOK_URL) {
    try {
      await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(submission),
      });
    } catch (err) {
      console.error("[contact] webhook delivery failed:", err.message);
    }
  } else {
    console.log("[contact] new enquiry:", JSON.stringify(submission, null, 2));
  }

  res.json({ ok: true, id: submission.id, message: "Thanks — we'll be in touch within 24 hours." });
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
