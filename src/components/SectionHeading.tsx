import type { ReactNode } from "react";
import { RevealLines, FadeUp } from "@/components/motion/Reveal";

/**
 * Eyebrow + masked-reveal heading, with an optional aside on the right.
 * Every section opens with this so the page has one rhythm.
 */
export default function SectionHeading({
  eyebrow,
  title,
  aside,
  tone = "dark",
  className = "",
  size = "lg",
}: {
  eyebrow: string;
  title: string[];
  aside?: ReactNode;
  tone?: "dark" | "light" | "sun";
  className?: string;
  size?: "lg" | "md";
}) {
  const eyebrowColor = tone === "sun" ? "text-ink/55" : tone === "light" ? "text-sun-deep" : "text-sun";
  const titleColor = tone === "dark" ? "text-paper" : "text-ink";
  const asideColor = tone === "dark" ? "text-white/55" : "text-ink/60";

  return (
    <div className={`grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end ${className}`}>
      <div className={aside ? "md:col-span-8" : "md:col-span-12"}>
        <FadeUp><p className={`eyebrow mb-5 md:mb-6 ${eyebrowColor}`}>{eyebrow}</p></FadeUp>
        <RevealLines as="h2" text={title} className={`${size === "lg" ? "display-lg" : "display-md"} ${titleColor}`} />
      </div>
      {aside && (
        <FadeUp className={`md:col-span-4 md:justify-self-end md:text-right font-body leading-relaxed max-w-xs ${asideColor}`} delay={0.2}>
          {aside}
        </FadeUp>
      )}
    </div>
  );
}
