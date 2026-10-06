import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

/** Counts from 0 to target the first time it scrolls into view, with an expo ease. */
export default function Counter({
  target,
  suffix = "",
  duration = 1.8,
  className,
}: {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
