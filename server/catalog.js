// Server-side access to the project data. We import the same plain-data module
// the front-end uses, so the API and the UI can never disagree about content.

export { projects, projectBySlug } from "../src/data/projects.js";
