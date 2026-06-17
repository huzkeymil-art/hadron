import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names, resolving Tailwind conflicts. */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** Clamp a number between min and max. */
export const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

/** Linear interpolation. */
export const lerp = (a, b, t) => a + (b - a) * t;

/** Map a value from one range to another. */
export const mapRange = (v, inMin, inMax, outMin, outMax) =>
  outMin + ((v - inMin) * (outMax - outMin)) / (inMax - inMin);

/** Feature-detect WebGL so we can fall back gracefully when it's unavailable. */
export function isWebGLAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}
