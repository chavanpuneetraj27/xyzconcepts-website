import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_STAGE } from "@/lib/motion";

/**
 * Route transition. Two yellow panels close over the outgoing page and part
 * to reveal the incoming one, with the wordmark held at the seam while they
 * meet. Reads as a stage curtain, which is the whole brand.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
    >
      <motion.div
        className="fixed top-0 left-0 right-0 z-[9990] bg-sun pointer-events-none"
        style={{ height: "51vh" }}
        initial={{ y: 0 }}
        animate={{ y: "-101%" }}
        exit={{ y: 0 }}
        transition={{ duration: 0.65, ease: EASE_STAGE }}
      />
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-[9990] bg-sun pointer-events-none"
        style={{ height: "51vh" }}
        initial={{ y: 0 }}
        animate={{ y: "101%" }}
        exit={{ y: 0 }}
        transition={{ duration: 0.65, ease: EASE_STAGE }}
      />
      <motion.div
        className="fixed inset-0 z-[9991] flex items-center justify-center pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <img src="/logo-black.png" alt="" className="h-16 md:h-24 w-auto select-none" draggable={false} />
      </motion.div>
      {children}
    </motion.div>
  );
}
