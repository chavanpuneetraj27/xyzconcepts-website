import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import LogoMark from "@/components/LogoMark";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/corporate-events", label: "Corporate" },
  { href: "/social-events", label: "Social Events" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const linkBaseCls = scrolled ? "text-[#111]/80 hover:text-[#111] font-semibold" : "text-white/90 hover:text-white font-semibold";
  const linkActiveCls = scrolled ? "text-[#111] font-bold" : "text-white font-bold";
  const hamburgerCls = scrolled ? "bg-[#111]" : "bg-white";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ${
          scrolled
            ? "bg-white/96 backdrop-blur-md shadow-sm border-b border-[#111]/8"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:pl-4 lg:pr-10 h-18 flex items-center justify-between">
          <Link href="/">
            {/* Logo adapts: white "xyz" on dark hero, black "xyz" on white scrolled navbar */}
            <LogoMark
              xyzColor={scrolled ? "text-[#111]" : "text-white"}
              size="md"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`relative text-[11px] tracking-[0.22em] uppercase cursor-pointer transition-colors duration-300 group ${
                    location === link.href ? linkActiveCls : linkBaseCls
                  }`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-[2px] bg-[#FFC107] transition-all duration-300 ${
                      location === link.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </span>
              </Link>
            ))}
            <Link href="/contact">
              <span
                className={`px-5 py-2.5 text-[11px] tracking-[0.2em] uppercase font-semibold cursor-pointer transition-all duration-300 ${
                  scrolled
                    ? "bg-[#111] text-white hover:bg-[#FFC107] hover:text-black"
                    : "bg-white text-black hover:bg-[#FFC107]"
                }`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Let's Talk
              </span>
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden z-[300] w-8 h-8 flex flex-col justify-center gap-[6px] relative"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className={`block w-full h-[2px] origin-center transition-colors duration-300 ${hamburgerCls}`}
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className={`block w-full h-[2px] transition-colors duration-300 ${hamburgerCls}`}
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className={`block w-full h-[2px] origin-center transition-colors duration-300 ${hamburgerCls}`}
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[150] bg-[#111] flex flex-col items-center justify-center overflow-hidden"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="flex flex-col items-center gap-2 relative z-10">
              {navLinks.map((link, i) => (
                <Link key={link.href} href={link.href}>
                  <motion.span
                    className="block text-white cursor-pointer hover:text-[#FFC107] transition-colors duration-200"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "clamp(2.5rem, 10vw, 5rem)",
                      letterSpacing: "0.05em",
                    }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.07, duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  >
                    {link.label}
                  </motion.span>
                </Link>
              ))}
            </nav>

            {/* Logo at bottom of mobile menu */}
            <motion.div
              className="absolute bottom-8 flex flex-col items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
            >
              <LogoMark xyzColor="text-white" size="sm" />
              <p
                className="text-white/30 text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Hyderabad, India
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
