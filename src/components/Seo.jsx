import { useEffect } from "react";

const SITE = "Hadron Studio";
const DEFAULT_TITLE = "Hadron Studio — We engineer websites that move markets";

function upsert(selector, create) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
}

function setMeta(attr, key, content) {
  if (content == null) return;
  const el = upsert(`meta[${attr}="${key}"]`, () => {
    const m = document.createElement("meta");
    m.setAttribute(attr, key);
    return m;
  });
  el.setAttribute("content", content);
}

/**
 * Per-route document head management for an SPA. Updates the title, description,
 * Open Graph and Twitter tags (including a per-page share image) on navigation,
 * and restores sensible defaults on unmount.
 *
 * Note: for crawlers that don't execute JS, add SSR/prerendering — these tags
 * are set client-side. Browsers and JS-executing crawlers pick them up fine.
 */
export function Seo({ title, description, image, type = "website", jsonLd }) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE}` : DEFAULT_TITLE;
    const img = image || "/og.png";

    document.title = fullTitle;
    setMeta("name", "description", description);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", type);
    setMeta("property", "og:image", img);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", img);

    // Canonical
    const canonical = upsert('link[rel="canonical"]', () => {
      const l = document.createElement("link");
      l.setAttribute("rel", "canonical");
      return l;
    });
    canonical.setAttribute("href", window.location.origin + window.location.pathname);

    // Per-page structured data
    let ld;
    if (jsonLd) {
      ld = document.createElement("script");
      ld.type = "application/ld+json";
      ld.setAttribute("data-seo-jsonld", "");
      ld.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(ld);
    }

    return () => {
      document.title = DEFAULT_TITLE;
      if (ld) ld.remove();
    };
  }, [title, description, image, type, jsonLd]);

  return null;
}
