import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { motion, useInView, useScroll, useTransform, type MotionValue } from "framer-motion";
import { DUR, EASE_OUT, EASE_STAGE, LINE_OFFSET, toLines } from "@/lib/motion";

/* ──────────────────────────────────────────────────────────────────────────
   Text reveal primitives.

   RevealLines  — each line slides up from behind a hard mask. The hero move.
   RevealWords  — words fade/rise with a short stagger. For body-size copy.
   ScrubText    — words brighten as the user scrolls through them. Pinned
                  manifesto sections.
   FadeUp       — generic in-view fade for anything that isn't text.
   ────────────────────────────────────────────────────────────────────────── */

type Common = {
  className?: string;
  style?: CSSProperties;
  delay?: number;
  /** Fire once on first entry (default) or every time it scrolls into view. */
  once?: boolean;
  /** How much of the element must be visible before it fires. */
  amount?: number;
};

export function RevealLines({
  text,
  as: Tag = "p",
  className,
  style,
  delay = 0,
  stagger = 0.09,
  once = true,
  amount = 0.3,
  lineClassName,
  /** Return a per-line class, e.g. to colour one line yellow. */
  lineClass,
}: Common & {
  text: string | string[];
  as?: ElementType;
  stagger?: number;
  lineClassName?: string;
  lineClass?: (line: string, i: number) => string | undefined;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, amount });
  const lines = Array.isArray(text) ? text : toLines(text);

  return (
    <Tag ref={ref} className={className} style={style}>
      {lines.map((line, i) => (
        <span key={i} className="clip block">
          <motion.span
            data-motion
            className={["block", lineClassName, lineClass?.(line, i)].filter(Boolean).join(" ")}
            initial={{ y: LINE_OFFSET }}
            animate={inView ? { y: "0%" } : { y: LINE_OFFSET }}
            transition={{ duration: DUR.slow, delay: delay + i * stagger, ease: EASE_STAGE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function RevealWords({
  text,
  as: Tag = "p",
  className,
  style,
  delay = 0,
  stagger = 0.018,
  once = true,
  amount = 0.4,
}: Common & { text: string; as?: ElementType; stagger?: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, amount });
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className} style={style} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden>
          <motion.span
            data-motion
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{ duration: DUR.base, delay: delay + i * stagger, ease: EASE_OUT }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

function ScrubWord({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <span className="relative inline-block mr-[0.28em]">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

/**
 * Words brighten one by one as the section scrolls through the viewport.
 * Wrap it in a tall container (e.g. min-h-[180vh]) with a sticky child so the
 * reader has room to scrub.
 */
export function ScrubText({ text, className, style, as: Tag = "p" }: { text: string; className?: string; style?: CSSProperties; as?: ElementType }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className} style={style}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <ScrubWord key={i} progress={scrollYProgress} range={[start, end]}>
            {w}
          </ScrubWord>
        );
      })}
    </Tag>
  );
}

export function FadeUp({
  children,
  className,
  style,
  delay = 0,
  y = 40,
  once = true,
  amount = 0.25,
  duration = DUR.base,
}: Common & { children: ReactNode; y?: number; duration?: number }) {
  return (
    <motion.div
      data-motion
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

/** A thin rule that draws itself left-to-right when it scrolls into view. */
export function DrawLine({ className = "", delay = 0, color = "bg-sun" }: { className?: string; delay?: number; color?: string }) {
  return (
    <motion.div
      data-motion
      className={`h-px origin-left ${color} ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: DUR.stage, delay, ease: EASE_IN_OUT }}
    />
  );
}

const EASE_IN_OUT = [0.87, 0, 0.13, 1] as const;
