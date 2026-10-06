import { useEffect, useState } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import { EASE_STAGE, lenisRef } from "@/lib/motion";

const KEY = "xyz_intro_seen";

/**
 * The curtain-up moment. A counter runs 0→100 beside the logo, then the
 * yellow panel lifts to reveal the page.
 *
 * It plays once per browser session. Replaying a 1.6s intro on every page
 * view would push Largest Contentful Paint past the "good" threshold on every
 * route, which is a direct ranking cost; the first impression is where it
 * earns its keep.
 */
export default function LoadingScreen() {
  const [visible, setVisible] = useState(() => {
    try {
      return !sessionStorage.getItem(KEY);
    } catch {
      return true;
    }
  });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const l = lenisRef.current;
    l?.stop();
    document.documentElement.style.overflow = "hidden";

    const controls = animate(0, 100, {
      duration: 1.25,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
    });
    const t = setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* private mode — fine, it just replays */
      }
    }, 1500);

    return () => {
      controls.stop();
      clearTimeout(t);
      document.documentElement.style.overflow = "";
      l?.start();
    };
  }, [visible]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.documentElement.style.overflow = "";
        lenisRef.current?.start();
      }}
    >
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-sun flex items-center justify-center overflow-hidden"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE_STAGE }}
          aria-hidden
        >
          <div className="container-x w-full flex items-end justify-between">
            <motion.img
              src="/logo-black.png"
              alt=""
              className="h-20 md:h-28 w-auto -ml-4 select-none"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE_STAGE }}
              draggable={false}
            />
            <motion.span
              className="display-xl text-ink tabular-nums leading-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              {count}
            </motion.span>
          </div>
          <motion.div
            className="absolute bottom-0 left-0 h-[3px] bg-ink origin-left w-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.25, ease: [0.65, 0, 0.35, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
