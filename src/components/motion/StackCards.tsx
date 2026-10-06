import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRichMotion } from "@/lib/motion";

/**
 * Cards that stack as you scroll: each sticks near the top, and as the next
 * one slides over it the one beneath shrinks and dims so the depth is
 * legible.
 *
 * Desktop only. On phones a card can be taller than the room its wrapper
 * reserves (short viewports, long copy), and the next card then slides over
 * text that has not been read yet. There the cards simply flow in sequence.
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
  /** Vertical room each card owns on desktop; more height = slower stack. */
  height?: string;
}) {
  const rich = useRichMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const remaining = total - 1 - index;
  const isLast = remaining === 0;
  const scale = useTransform(scrollYProgress, [0, 1], [1, !rich || isLast ? 1 : 1 - Math.min(remaining, 3) * 0.04]);
  const dim = useTransform(scrollYProgress, [0, 1], [1, !rich || isLast ? 1 : 0.6]);
  const filter = useTransform(dim, (b) => `brightness(${b})`);

  if (!rich) {
    return <div className={`mb-6 md:mb-8 ${className}`}>{children}</div>;
  }

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
