// Shared contact logic used by BOTH the Express server (server/index.js) and the
// Vercel serverless function (../../api/[...slug].js). Keeping it here means the
// validation rules can never drift between the two runtimes.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validate a raw submission. Returns { honeypot } | { errors } | { submission }. */
export function validateContact(body = {}) {
  const { name, email, company, budget, message, _hp } = body;

  // Honeypot — bots fill hidden fields, humans don't.
  if (_hp) return { honeypot: true };

  const errors = {};
  if (!name || String(name).trim().length < 2) errors.name = "Please tell us your name.";
  if (!email || !EMAIL_RE.test(String(email))) errors.email = "A valid email is required.";
  if (!message || String(message).trim().length < 10)
    errors.message = "A little more detail helps us scope your project.";

  if (Object.keys(errors).length) return { errors };

  return {
    submission: {
      id: `hs_${Date.now().toString(36)}`,
      name: String(name).trim(),
      email: String(email).trim(),
      company: company ? String(company).trim() : null,
      budget: budget ? String(budget).trim() : null,
      message: String(message).trim(),
      receivedAt: new Date().toISOString(),
    },
  };
}

/** Forward a valid submission to a webhook if configured, else log it. */
export async function deliver(submission) {
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
    console.log("[contact] new enquiry:", JSON.stringify(submission));
  }
}

/** Validate + deliver in one step. Returns { status, body } for any runtime. */
export async function processContact(body = {}) {
  const result = validateContact(body);
  if (result.honeypot) return { status: 200, body: { ok: true, queued: true } };
  if (result.errors) return { status: 422, body: { ok: false, errors: result.errors } };
  await deliver(result.submission);
  return {
    status: 200,
    body: { ok: true, id: result.submission.id, message: "Thanks — we'll be in touch within 24 hours." },
  };
}
