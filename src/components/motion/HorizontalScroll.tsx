import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRichMotion } from "@/lib/motion";

/**
 * A row of panels that scrolls sideways while the page scrolls down.
 *
 * Desktop: the section is tall; a sticky viewport inside it translates the
 * track horizontally in step with vertical progress. The user never leaves
 * the normal scroll — there is nothing to learn.
 *
 * Mobile / reduced motion: a native horizontal snap scroller. Pinning on
 * touch fights the browser; a swipeable row is what people expect there.
 */
export default function HorizontalScroll({
  children,
  className = "",
  trackClassName = "",
  header,
}: {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
  /** Rendered above the track, inside the sticky viewport on desktop. */
  header?: ReactNode;
}) {
  const rich = useRichMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    if (!rich) return;
    const measure = () => {
      if (!trackRef.current) return;
      setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [rich, children]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(rawX, { stiffness: 120, damping: 28, mass: 0.6 });
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (!rich) {
    return (
      <section className={className}>
        {header && <div className="container-x">{header}</div>}
        <div
          className={`flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar px-[var(--gutter)] ${trackClassName}`}
          data-lenis-prevent
        >
          {children}
        </div>
      </section>
    );
  }

  // Height sets how much vertical scroll maps to the horizontal distance.
  const height = `calc(100vh + ${distance}px)`;

  return (
    <section ref={sectionRef} className={`relative ${className}`} style={{ height }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {header && <div className="container-x">{header}</div>}
        <motion.div
          ref={trackRef}
          data-motion
          className={`flex gap-6 w-max pl-[var(--gutter)] pr-[var(--gutter)] ${trackClassName}`}
          style={{ x }}
        >
          {children}
        </motion.div>
        <div className="container-x mt-10">
          <div className="h-px bg-white/10 relative overflow-hidden">
            <motion.div className="absolute inset-y-0 left-0 w-full bg-sun origin-left" style={{ scaleX: progressScale }} />
          </div>
        </div>
      </div>
    </section>
  );
}
