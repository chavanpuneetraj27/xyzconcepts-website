import { motion } from "framer-motion";
import type { ReactNode } from "react";
import Button from "@/components/Button";
import { RevealLines } from "@/components/motion/Reveal";
import { useHeroParallax } from "@/components/motion/Parallax";
import { EASE_STAGE } from "@/lib/motion";

/**
 * Full-bleed opening for the inner pages. The photo sinks and zooms as the
 * reader leaves; the copy lifts at a different rate so the layers separate.
 * Renders the page's single <h1>.
 */
export default function PageHero({
  image,
  alt,
  eyebrow,
  title,
  sub,
  cta,
  align = "left",
  accentLine,
  position,
  children,
}: {
  image: string;
  alt: string;
  eyebrow: string;
  title: string[];
  sub?: ReactNode;
  cta?: { href: string; label: string };
  align?: "left" | "center";
  /** Index of the title line to render in yellow. */
  accentLine?: number;
  position?: string;
  children?: ReactNode;
}) {
  const { ref, bgY, bgScale, fgY, fade } = useHeroParallax();
  const centered = align === "center";

  return (
    // min-h rather than h: if the copy is ever taller than the viewport the hero grows instead of the text climbing under the nav.
    <section ref={ref} className={`relative min-h-[100svh] overflow-hidden flex ${centered ? "items-center" : "items-end"}`}>
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <img src={image} alt={alt} className="w-full h-full object-cover" style={{ objectPosition: position }} fetchPriority="high" decoding="async" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/25" />
      <div className="absolute inset-0 bloom" />

      <motion.div
        className={`relative z-10 w-full container-x ${centered ? "text-center pt-32 pb-16" : "pt-32 pb-14 md:pb-20"}`}
        style={{ y: fgY, opacity: fade }}
      >
        <motion.p
          className={`eyebrow text-sun mb-7 md:mb-10 ${centered ? "" : ""}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE_STAGE }}
        >
          {eyebrow}
        </motion.p>

        <RevealLines
          as="h1"
          text={title}
          className={`display-xl text-paper ${centered ? "mx-auto max-w-[14ch]" : "max-w-[14ch]"}`}
          stagger={0.11}
          delay={0.2}
          lineClass={(_, i) => (i === accentLine ? "text-sun" : undefined)}
        />

        {(sub || cta) && (
          <div className={`mt-8 md:mt-12 flex flex-col md:flex-row gap-6 md:gap-10 ${centered ? "items-center justify-center" : "md:items-end md:justify-between"}`}>
            {sub && (
              <motion.div
                className={`font-body text-white/75 text-lg md:text-xl italic leading-relaxed max-w-xl ${centered ? "mx-auto" : ""}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.75, ease: EASE_STAGE }}
              >
                {sub}
              </motion.div>
            )}
            {cta && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.9, ease: EASE_STAGE }}>
                <Button href={cta.href} variant="sun" size="lg">{cta.label}</Button>
              </motion.div>
            )}
          </div>
        )}
        {children}
      </motion.div>
    </section>
  );
}
