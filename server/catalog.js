// Server-side access to the rich case-study and article data. We import the
// same plain-data modules the front-end uses, so the Node API and the UI can
// never disagree about content.

export { projects, projectBySlug } from "../src/data/projects.js";
export { journal, articleBySlug } from "../src/data/journal.js";
