import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#FFC107] flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }}
        >
          <motion.img
            src="/logo-black.png"
            alt="XYZconcepts"
            className="h-24 w-auto select-none"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            draggable={false}
          />

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[3px] bg-black"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.15, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
