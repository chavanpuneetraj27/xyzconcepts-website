import { motion } from "framer-motion";
import { ReactNode } from "react";

const EASE = [0.76, 0, 0.24, 1] as const;

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.12, ease: "easeInOut" }}
    >
      {/* ── Split curtain: top panel ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[9990] bg-[#FFC107]"
        style={{ height: "51vh" }}
        initial={{ y: 0 }}
        animate={{ y: "-101%" }}
        exit={{ y: 0 }}
        transition={{ duration: 0.58, ease: EASE }}
      />

      {/* ── Split curtain: bottom panel ── */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-[9990] bg-[#FFC107]"
        style={{ height: "51vh" }}
        initial={{ y: 0 }}
        animate={{ y: "101%" }}
        exit={{ y: 0 }}
        transition={{ duration: 0.58, ease: EASE }}
      />

      {/* ── Logo at the curtain seam — visible only while panels are closed ── */}
      <motion.div
        className="fixed inset-0 z-[9991] flex items-center justify-center pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {/* Logo recreated inline: black "xyz" + black badge (inverted, so it shows on yellow) */}
        <span
          className="inline-flex items-stretch gap-2 select-none"
          style={{ transform: "translateY(-2px)" }}
        >
          <span
            className="text-black leading-none"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(3.5rem, 8vw, 7rem)",
              letterSpacing: "-0.02em",
            }}
          >
            xyz
          </span>
          <span className="bg-black rounded-[6px] px-2 py-1.5 flex items-center justify-center flex-shrink-0 self-stretch">
            <span
              className="text-[#FFC107] font-bold leading-none"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(0.5rem, 1.4vw, 0.7rem)",
                writingMode: "vertical-lr",
                letterSpacing: "0.12em",
              }}
            >
              concepts
            </span>
          </span>
        </span>
      </motion.div>

      {children}
    </motion.div>
  );
}
