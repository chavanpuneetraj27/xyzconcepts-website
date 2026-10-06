import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";
import { lenisRef } from "@/lib/motion";

/**
 * Inertial smooth scrolling for the whole document.
 *
 * Lenis moves the real window scroll position each frame, so Framer Motion's
 * useScroll keeps reading accurate values — no bridging needed. Touch devices
 * keep native scrolling (syncTouch: false): emulating momentum on a phone
 * feels laggy and breaks pull-to-refresh. Reduced-motion users get the
 * browser's own scrolling.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.95,
    });
    lenisRef.current = lenis;
    if (import.meta.env.DEV) (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  return <>{children}</>;
}
