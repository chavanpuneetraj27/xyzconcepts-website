import { useRef, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useReducedMotion,
} from "framer-motion";

/**
 * Velocity-reactive marquee. It drifts on its own and surges when the user
 * scrolls — scrolling down speeds it forward, scrolling up reverses it. Reads
 * as the page reacting to the hand on the wheel.
 *
 * The track is rendered twice and wrapped at -50%, so content must be wide
 * enough to fill the viewport once (repeat it if it isn't).
 */
export default function Marquee({
  children,
  baseVelocity = 1.4,
  className = "",
  reactive = true,
}: {
  children: ReactNode;
  /** Percent of track width per second at rest. */
  baseVelocity?: number;
  className?: string;
  reactive?: boolean;
}) {
  const reduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const directionRef = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let moveBy = directionRef.current * baseVelocity * (delta / 1000);
    if (reactive) {
      const v = velocityFactor.get();
      if (v < 0) directionRef.current = -1;
      else if (v > 0) directionRef.current = 1;
      moveBy += directionRef.current * moveBy * Math.abs(v);
    }
    let next = baseX.get() + moveBy;
    // Wrap between -50 and 0 so the duplicated track is seamless.
    if (next <= -50) next += 50;
    if (next > 0) next -= 50;
    baseX.set(next);
  });

  const x = useTransform(baseX, (v) => `${v}%`);

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div data-motion className="flex w-max" style={{ x }}>
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>{children}</div>
      </motion.div>
    </div>
  );
}
