import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type Lenis from "lenis";

/**
 * Shared motion vocabulary. Every component pulls timing from here so the
 * whole site moves with one accent rather than six.
 */

/** Stage curtain — fast start, long settle. Used for reveals and transitions. */
export const EASE_STAGE = [0.76, 0, 0.24, 1] as const;
/** Expo out — for things entering the viewport. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
/** Expo in-out — for things that both leave and arrive. */
export const EASE_IN_OUT = [0.87, 0, 0.13, 1] as const;

export const DUR = {
  fast: 0.45,
  base: 0.8,
  slow: 1.2,
  stage: 1.5,
} as const;

/** Reveal distance for masked line reveals, as a percentage of line height. */
export const LINE_OFFSET = "110%";

/**
 * Lenis instance, shared so route changes can jump to top through Lenis
 * instead of fighting it with window.scrollTo.
 */
export const lenisRef: { current: Lenis | null } = { current: null };

/**
 * True on devices where heavy scroll choreography is worth running: a real
 * pointer and a desktop-class viewport. Mobile gets honest, native fallbacks —
 * pinned sections and magnetic buttons are actively worse on touch.
 */
export function useIsDesktop(): boolean {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}

/** Combined gate: run rich motion only on desktop and only if the user allows it. */
export function useRichMotion(): boolean {
  const reduced = useReducedMotion();
  const desktop = useIsDesktop();
  return desktop && !reduced;
}

/** Split copy into lines on "\n" so masked reveals can animate line by line. */
export function toLines(text: string): string[] {
  return text.split("\n").map((l) => l.trim()).filter(Boolean);
}
