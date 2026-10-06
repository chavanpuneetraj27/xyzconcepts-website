import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Cards that stack as you scroll: each sticks near the top, and as the next
 * one slides over it the one beneath shrinks and dims so the depth is
 * legible.
 *
 * The outer wrapper (not the sticky element) is the scroll target: once the
 * card is pinned, the wrapper keeps travelling upward, and that travel is
 * what drives the recede.
 */
export function StackCard({
  children,
  index,
  total,
  className = "",
  top = "10vh",
  height = "100vh",
}: {
  children: ReactNode;
  index: number;
  total: number;
  className?: string;
  top?: string;
  /** Vertical room each card owns; more height = slower stack. */
  height?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const remaining = total - 1 - index;
  const isLast = remaining === 0;
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduced || isLast ? 1 : 1 - Math.min(remaining, 3) * 0.04]);
  const dim = useTransform(scrollYProgress, [0, 1], [1, reduced || isLast ? 1 : 0.6]);
  const filter = useTransform(dim, (b) => `brightness(${b})`);

  return (
    <div ref={ref} style={{ height }}>
      <div className="sticky" style={{ top }}>
        <motion.div data-motion className={`origin-top ${className}`} style={{ scale, filter }}>
          {children}
        </motion.div>
      </div>
    </div>
  );
}
