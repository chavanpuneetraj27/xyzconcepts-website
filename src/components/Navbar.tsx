import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import LogoMark from "@/components/LogoMark";
import { EASE_STAGE } from "@/lib/motion";
import { lenisRef } from "@/lib/motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/corporate-events", label: "Corporate" },
  { href: "/social-events", label: "Social" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/**
 * Transparent over heroes. Once the page scrolls it gains a frosted dark bar,
 * hides while scrolling down and returns the moment the user scrolls up — so
 * it is never in the way of the content but always one gesture away.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 160 && y > prev && !menuOpen);
  });

  useEffect(() => setMenuOpen(false), [location]);

  // Freeze the page behind the full-screen menu.
  useEffect(() => {
    const l = lenisRef.current;
    if (menuOpen) l?.stop();
    else l?.start();
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* Above the full-screen menu (z-300) so the logo and close button stay reachable while it is open. */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-[320]"
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE_STAGE }}
      >
        <div
          className={`transition-[background-color,backdrop-filter,border-color] duration-500 border-b ${
            scrolled && !menuOpen ? "bg-ink/75 backdrop-blur-xl border-white/8" : "bg-transparent border-transparent"
          }`}
        >
          <div className="container-x h-[76px] md:h-[88px] flex items-center justify-between">
            <Link href="/" aria-label="XYZconcepts — home" className="relative z-[310] -ml-3 md:-ml-4">
              <LogoMark size="md" />
            </Link>

            <nav className="hidden lg:flex items-center gap-9" aria-label="Primary">
              {navLinks.map((link) => {
                const active = location === link.href;
                return (
                  <Link key={link.href} href={link.href} className="group relative py-2 eyebrow text-[0.66rem] text-white/80 hover:text-white transition-colors">
                    {link.label}
                    <span
                      className={`absolute left-0 -bottom-0.5 h-px bg-sun transition-all duration-500 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className="group relative overflow-hidden ml-2 px-6 py-3 eyebrow text-[0.66rem] text-ink bg-sun isolate before:absolute before:inset-0 before:-z-10 before:bg-paper before:origin-bottom before:scale-y-0 before:transition-transform before:duration-500 before:[transition-timing-function:cubic-bezier(0.76,0,0.24,1)] hover:before:scale-y-100"
              >
                Let's Talk
              </Link>
            </nav>

            <button
              className="lg:hidden relative z-[310] w-12 h-12 -mr-3 flex flex-col items-center justify-center gap-[7px]"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <motion.span className="block w-7 h-[2px] bg-white origin-center" animate={menuOpen ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.4, ease: EASE_STAGE }} />
              <motion.span className="block w-7 h-[2px] bg-white origin-center" animate={menuOpen ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.4, ease: EASE_STAGE }} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[300] bg-ink flex flex-col justify-between noise"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE_STAGE }}
          >
            <div className="h-[76px]" />
            <nav className="container-x flex flex-col gap-1" aria-label="Mobile">
              {navLinks.map((link, i) => (
                <div key={link.href} className="clip">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.8, delay: 0.15 + i * 0.06, ease: EASE_STAGE }}
                  >
                    <Link href={link.href} className="group flex items-baseline gap-5 py-1">
                      <span className="eyebrow text-sun text-[0.6rem]">0{i + 1}</span>
                      <span className={`display-lg text-white transition-colors ${location === link.href ? "text-sun" : "group-hover:text-sun"}`} style={{ fontSize: "clamp(2.75rem, 11vw, 6rem)" }}>
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>
            <motion.div
              className="container-x pb-10 flex flex-col gap-3 text-white/50 text-sm font-body"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <a href="https://wa.me/919063377915" className="hover:text-sun transition-colors">+91 90633 77915</a>
              <a href="mailto:connect@xyzconcepts.com" className="hover:text-sun transition-colors">connect@xyzconcepts.com</a>
              <span className="eyebrow text-[0.6rem] text-white/30 mt-2">Hyderabad, India</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
