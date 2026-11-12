// Machine-readable summaries served by the API (/api/projects, /api/services).
// Derived from the front-end data so there is only one place to edit content.

import { projects as fullProjects } from "../src/data/projects.js";
import { services as fullServices } from "../src/data/content.js";

export const projects = fullProjects.map(({ slug, name, category, status, link }) => ({
  id: slug,
  name,
  category,
  status,
  link,
}));

export const services = fullServices.map(({ id, title, blurb }) => ({ id, title, blurb }));
