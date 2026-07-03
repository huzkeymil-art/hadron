import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { studio } from "../data/content.js";
import { RevealText } from "../components/Reveal.jsx";
import { Magnetic } from "../components/Magnetic.jsx";
import { Chapter } from "../components/Chapter.jsx";
import { cn } from "../lib/utils.js";

const BUDGETS = ["< $10k", "$10k–$25k", "$25k–$50k", "$50k+", "Not sure yet"];
const EMPTY = { name: "", email: "", company: "", budget: "", message: "", _hp: "" };

export function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [serverMsg, setServerMsg] = useState("");

  const update = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrors({});
    setServerMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        setServerMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setServerMsg(data.message || "Thanks — we'll be in touch shortly.");
      setStatus("success");
      setForm(EMPTY);
    } catch {
      setServerMsg("Network error — please email us directly.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative bg-ink">
      <div className="shell pt-32 md:pt-44">
        <Chapter index={11} label="Contact" />
      </div>
      <div className="shell grid gap-14 pb-32 md:pb-44 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left — pitch */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="display text-display-sm md:text-display">
              <span className="mask-line block">
                <RevealText text="Start a" />
              </span>
              <span className="mask-line block text-ember">
                <span className="accent-serif">
                  <RevealText text="project." delay={0.08} />
                </span>
              </span>
            </h2>
            <p className="mt-8 max-w-md text-pretty text-lg leading-relaxed text-bone/60">
              Tell us where you want to be in twelve months. We'll tell you, honestly, whether we're the studio to get you there — usually within 24 hours.
            </p>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-8">
            <div>
              <dt className="eyebrow mb-2">Email</dt>
              <dd>
                <a href={`mailto:${studio.email}`} className="link-underline">
                  {studio.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow mb-2">Phone</dt>
              <dd className="text-bone/80">{studio.phone}</dd>
            </div>
            <div>
              <dt className="eyebrow mb-2">Studio</dt>
              <dd className="text-bone/80">{studio.location}</dd>
            </div>
            <div>
              <dt className="eyebrow mb-2">Follow</dt>
              <dd className="flex flex-wrap gap-3">
                {studio.socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="link-underline text-bone/80">
                    {s.label}
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </div>

        {/* Right — form */}
        <div className="rounded-2xl border border-bone/12 bg-ink-800 p-6 md:p-9">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex min-h-[26rem] flex-col items-center justify-center text-center"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-ember text-2xl text-white">
                  ✓
                </div>
                <h3 className="text-2xl font-bold">Message received</h3>
                <p className="mt-3 max-w-xs text-bone/60">{serverMsg}</p>
                <button
                  onClick={() => setStatus("idle")}
                  data-cursor
                  className="link-underline mt-8 font-mono text-xs uppercase tracking-[0.16em] text-bone/70"
                >
                  Send another →
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={submit}
                noValidate
                className="flex flex-col gap-6"
              >
                <Field label="Name *" error={errors.name}>
                  <input
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Jane Appleseed"
                    className={inputCls(errors.name)}
                  />
                </Field>

                <Field label="Email *" error={errors.email}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="jane@company.com"
                    className={inputCls(errors.email)}
                  />
                </Field>

                <Field label="Company">
                  <input
                    value={form.company}
                    onChange={update("company")}
                    placeholder="Company / brand"
                    className={inputCls()}
                  />
                </Field>

                <Field label="Budget">
                  <div className="flex flex-wrap gap-2">
                    {BUDGETS.map((b) => (
                      <button
                        type="button"
                        key={b}
                        data-cursor
                        onClick={() => setForm((f) => ({ ...f, budget: b }))}
                        className={cn(
                          "rounded-full border px-3.5 py-1.5 text-xs transition-colors duration-300",
                          form.budget === b
                            ? "border-bone bg-bone text-ink"
                            : "border-bone/20 text-bone/70 hover:border-bone/50"
                        )}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Project details *" error={errors.message}>
                  <textarea
                    value={form.message}
                    onChange={update("message")}
                    rows={4}
                    placeholder="What are you building, and what does success look like?"
                    className={cn(inputCls(errors.message), "resize-none")}
                  />
                </Field>

                {/* Honeypot — hidden from humans */}
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  value={form._hp}
                  onChange={update("_hp")}
                  className="hidden"
                  aria-hidden
                />

                {status === "error" && serverMsg && (
                  <p className="text-sm text-ember">{serverMsg}</p>
                )}

                <Magnetic>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    data-cursor
                    className="flex w-full items-center justify-between rounded-full bg-ember px-7 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-white transition-opacity disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : "Send enquiry"}
                    <span>→</span>
                  </button>
                </Magnetic>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="eyebrow mb-2 block">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-ember">{error}</span>}
    </label>
  );
}

const inputCls = (error) =>
  cn(
    "w-full border-b bg-transparent py-2.5 text-bone placeholder:text-bone/30 outline-none transition-colors",
    error ? "border-ember" : "border-bone/20 focus:border-bone"
  );
