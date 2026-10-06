import { useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * ParallaxImage — the image moves slower than the page while it crosses the
 * viewport. The image is oversized (scale) so the shift never exposes an edge.
 *
 * `speed` is the fraction of viewport travel the image moves: 0.15 is subtle,
 * 0.35 is cinematic. Reduced-motion users get a static image.
 */
export function ParallaxImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  speed = 0.2,
  scale,
  priority = false,
  position,
  children,
  fill = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  speed?: number;
  scale?: number;
  priority?: boolean;
  position?: string;
  children?: ReactNode;
  /** Stretch to fill a positioned parent instead of sizing itself. */
  fill?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const pct = speed * 50;
  const y = useTransform(scrollYProgress, [0, 1], [`-${pct}%`, `${pct}%`]);
  const s = scale ?? 1 + speed * 1.1;

  return (
    <div ref={ref} className={`${fill ? "absolute inset-0" : "relative"} overflow-hidden ${className}`}>
      <motion.img
        data-motion
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover ${imgClassName}`}
        style={{ y: reduced ? 0 : y, scale: reduced ? 1 : s, objectPosition: position }}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        draggable={false}
      />
      {children}
    </div>
  );
}

/**
 * ParallaxLayer — move any child at a different rate than the page. Positive
 * speed lags behind (background feel), negative leads (foreground feel).
 */
export function ParallaxLayer({
  children,
  speed = 0.2,
  className = "",
  style,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed * -120, speed * 120]);

  return (
    <motion.div ref={ref} data-motion className={className} style={{ ...style, y: reduced ? 0 : y }}>
      {children}
    </motion.div>
  );
}

/**
 * HeroParallax — for full-bleed heroes pinned to the top of the page. The
 * background drifts down and fades as the user leaves it; the foreground copy
 * drifts at a different rate so the layers visibly separate.
 */
export function useHeroParallax() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "28%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.12]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "-18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  return { ref, bgY, bgScale, fgY, fade, progress: scrollYProgress };
}
