// Vercel serverless function (catch-all) that mirrors the Express API in
// server/. It reuses the exact same content, catalog, and contact modules so
// the deployed site behaves identically to running `npm start`.
//
// Routing is configured in /vercel.json, which also builds the static
// front-end at the repository root.

import { projects, services, pricing, stats } from "../server/content.js";
import {
  projects as catalogProjects,
  projectBySlug,
  journal,
  articleBySlug,
} from "../server/catalog.js";
import { processContact } from "../server/contact-handler.js";

const COLLECTIONS = { projects, services, pricing, stats };
const stripBody = ({ body, ...rest }) => rest;

export default async function handler(req, res) {
  const slug = Array.isArray(req.query.slug)
    ? req.query.slug
    : [req.query.slug].filter(Boolean);
  const [route, id] = slug;

  if (route === "health") {
    return res.status(200).json({ ok: true, service: "hadron-studio", ts: Date.now() });
  }

  if (route in COLLECTIONS) {
    return res.status(200).json({ ok: true, data: COLLECTIONS[route] });
  }

  if (route === "work") {
    if (!id) return res.status(200).json({ ok: true, data: catalogProjects.map(stripBody) });
    const project = projectBySlug(id);
    if (!project) return res.status(404).json({ ok: false, error: "Project not found" });
    return res.status(200).json({ ok: true, data: project });
  }

  if (route === "journal") {
    if (!id) return res.status(200).json({ ok: true, data: journal.map(stripBody) });
    const article = articleBySlug(id);
    if (!article) return res.status(404).json({ ok: false, error: "Article not found" });
    return res.status(200).json({ ok: true, data: article });
  }

  if (route === "contact") {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ ok: false, error: "Method not allowed" });
    }
    const { status, body } = await processContact(req.body || {});
    return res.status(status).json(body);
  }

  return res.status(404).json({ ok: false, error: "Not found" });
}
