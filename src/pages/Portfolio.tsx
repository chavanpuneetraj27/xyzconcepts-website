import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";

// Served as WebP at ~2x the largest rendered size. The source PNGs are 1–2.4 MB
// each; unprocessed they made this the heaviest page on the site by an order of
// magnitude, which is a direct Core Web Vitals (and therefore ranking) cost.
import portfolioCorporate1 from "@/assets/images/portfolio-corporate-1.png?w=1000&format=webp&quality=82";
import portfolioCorporate2 from "@/assets/images/portfolio-corporate-2.png?w=1000&format=webp&quality=82";
import portfolioWedding1 from "@/assets/images/portfolio-wedding-1.png?w=1000&format=webp&quality=82";
import portfolioWedding2 from "@/assets/images/portfolio-wedding-2.png?w=1000&format=webp&quality=82";
import portfolioBirthday1 from "@/assets/images/portfolio-birthday-1.png?w=1000&format=webp&quality=82";
import portfolioActivation1 from "@/assets/images/portfolio-activation-1.png?w=1000&format=webp&quality=82";
import portfolioActivation2 from "@/assets/images/portfolio-activation-2.png?w=1000&format=webp&quality=82";
import portfolioExhibition1 from "@/assets/images/portfolio-exhibition-1.png?w=1000&format=webp&quality=82";

const HERO_IMG = "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1400&q=85&auto=format";

const filters = ["All", "Corporate", "Social", "Brand", "Exhibition"];

const items = [
  { id: 1, src: portfolioCorporate1, title: "Lumina Annual Conclave", category: "Corporate", year: "2024", desc: "3-day leadership summit for 400 attendees in Hyderabad." },
  { id: 2, src: portfolioWedding1, title: "Priya & Arjun's Wedding", category: "Social", year: "2024", desc: "A 3-day dream wedding in Hyderabad with 600 guests." },
  { id: 3, src: portfolioActivation1, title: "Spark Brand Launch", category: "Brand", year: "2023", desc: "Product launch experience for a consumer tech brand." },
  { id: 4, src: portfolioCorporate2, title: "TechCorp Annual Day", category: "Corporate", year: "2023", desc: "2000-person annual day with live performances and installations." },
  { id: 5, src: portfolioBirthday1, title: "The Golden 50", category: "Social", year: "2024", desc: "A milestone 50th birthday designed around the guest's legacy." },
  { id: 6, src: portfolioExhibition1, title: "NexGen Expo 2024", category: "Exhibition", year: "2024", desc: "360-degree exhibition presence across two pavilions." },
  { id: 7, src: portfolioActivation2, title: "Glow Activations", category: "Brand", year: "2023", desc: "Multi-city brand experience tour for a beauty brand." },
  { id: 8, src: portfolioWedding2, title: "Meghna & Rahul", category: "Social", year: "2023", desc: "Intimate 80-person wedding with handcrafted details." },
];

// ── Horizontal drag carousel ────────────────────────────────────────────────
function HorizontalCarousel({ filtered }: { filtered: typeof items }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [maxDrag, setMaxDrag] = useState(0);

  const calcConstraint = useCallback(() => {
    if (trackRef.current && containerRef.current) {
      const overflow = trackRef.current.scrollWidth - containerRef.current.clientWidth;
      setMaxDrag(Math.max(0, overflow));
    }
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(calcConstraint, [filtered.length]);
  useEffect(() => {
    window.addEventListener("resize", calcConstraint);
    return () => window.removeEventListener("resize", calcConstraint);
  }, [calcConstraint]);

  // Reset position when filter changes
  useEffect(() => { x.set(0); }, [filtered, x]);

  // Progress bar width (0% → 100% as user drags left)
  const barScaleX = useTransform(x, [-maxDrag, 0], [1, 0]);

  return (
    <div>
      {/* Drag hint */}
      <div className="flex items-center justify-between mb-8 px-6 lg:px-10">
        <span className="text-[#111]/30 text-xs tracking-[0.25em] uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {filtered.length} work{filtered.length !== 1 ? "s" : ""}
        </span>
        <span className="flex items-center gap-2 text-[#111]/30 text-xs tracking-[0.2em] uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          drag to explore
          <motion.span
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >→</motion.span>
        </span>
      </div>

      {/* Drag track */}
      <div ref={containerRef} className="overflow-hidden relative">
        <motion.div
          ref={trackRef}
          className="flex gap-4 pl-6 lg:pl-10 pr-6 lg:pr-10"
          style={{ x, width: "max-content", cursor: "grab" }}
          drag="x"
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={0.04}
          dragTransition={{ bounceStiffness: 400, bounceDamping: 30 }}
          whileTap={{ cursor: "grabbing" }}
        >
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              className="flex-none relative group overflow-hidden select-none"
              style={{ width: "clamp(280px, 36vw, 440px)", height: "clamp(380px, 55vh, 580px)" }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              {/* Image with duotone hover */}
              <img
                src={item.src}
                alt={`${item.title} — ${item.category.toLowerCase()} event by XYZconcepts, ${item.year}`}
                draggable="false"
                loading={i < 2 ? "eager" : "lazy"}
                decoding="async"
                className="w-full h-full object-cover pointer-events-none"
                style={{ transition: "filter 0.55s ease" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLImageElement).style.filter = "grayscale(100%) contrast(1.15) brightness(0.78)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLImageElement).style.filter = "none";
                }}
              />
              {/* Yellow duotone screen overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-35 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: "#FFC107", mixBlendMode: "screen" }}
              />
              {/* Info gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
              {/* Info text */}
              <div className="absolute bottom-0 left-0 right-0 p-7 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400 pointer-events-none">
                <span className="text-[#FFC107] text-[10px] tracking-[0.2em] uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {item.category} · {item.year}
                </span>
                <h3 className="text-white text-3xl mt-2 leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}>
                  {item.title}
                </h3>
                <p className="text-white/65 text-sm mt-3 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</p>
              </div>
              {/* Category tag */}
              <div className="absolute top-5 left-5">
                <span className="bg-[#FFC107] text-black text-[9px] tracking-[0.2em] uppercase px-2.5 py-1 font-bold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {item.category}
                </span>
              </div>
            </motion.div>
          ))}

          {/* End spacer card */}
          <div
            className="flex-none flex flex-col items-center justify-center gap-6 bg-[#111] px-12"
            style={{ width: "clamp(220px, 28vw, 320px)", height: "clamp(380px, 55vh, 580px)" }}
          >
            <div className="w-10 h-[1px] bg-[#FFC107]" />
            <p className="text-white/40 text-xs tracking-[0.25em] uppercase text-center leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              This is just a sample.<br />Our real portfolio<br />is even better.
            </p>
            <Link href="/contact">
              <span className="text-[#FFC107] text-xs tracking-[0.2em] uppercase cursor-pointer hover:opacity-60 transition-opacity" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Enquire →
              </span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Progress bar */}
      <div className="mt-6 px-6 lg:px-10">
        <div className="h-[1px] bg-[#111]/8 relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-[#FFC107] origin-left"
            style={{ scaleX: barScaleX, width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 600], [0, 160]);

  const filtered = activeFilter === "All" ? items : items.filter((item) => item.category === activeFilter);

  return (
    <div className="overflow-x-hidden bg-white">
      {/* ── Hero ── */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 w-full h-[115%] -top-[7.5%]" style={{ y: parallaxY }}>
          <img src={HERO_IMG} alt="Event portfolio of XYZconcepts — corporate, wedding and brand experiences" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/65" />
        </motion.div>
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24">
          <motion.p
            className="text-[#FFC107] text-xs tracking-[0.4em] uppercase mb-8"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Our Work
          </motion.p>
          {/* One <h1> per page: the two visual lines are spans inside it, so the
              animation and layout are unchanged but the document has a single
              top-level heading. */}
          <h1 style={{ margin: 0 }}>
            {["EVENTS DESIGNED", "TO BE FELT."].map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="text-white block"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.5rem, 12vw, 10rem)", lineHeight: 0.95 }}
                  initial={{ y: 110, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.15 + i * 0.15, ease: [0.76, 0, 0.24, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>
      </section>

      {/* ── Filter strip ── */}
      <section className="pt-20 pb-4 px-6 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 text-xs tracking-[0.2em] uppercase transition-all duration-200 cursor-pointer ${
                activeFilter === filter
                  ? "bg-[#111] text-white"
                  : "bg-[#F5F5F5] text-[#111]/50 hover:bg-[#FFC107] hover:text-black"
              }`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* ── Horizontal drag carousel ── */}
      <section className="py-10 pb-20 bg-white">
        <HorizontalCarousel filtered={filtered} />
      </section>

      {/* ── Featured Case Study ── */}
      <section className="py-0 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-24">
          <div className="bg-[#111] grid grid-cols-1 md:grid-cols-2 overflow-hidden">
            <div className="relative min-h-[440px] overflow-hidden group">
              <img
                src={portfolioCorporate1}
                alt="Lumina Annual Conclave 2024 — three-day leadership summit produced by XYZconcepts"
                className="w-full h-full object-cover absolute inset-0 transition-all duration-600 group-hover:grayscale group-hover:brightness-75 group-hover:contrast-125"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-35 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: "#FFC107", mixBlendMode: "screen" }}
              />
              <div className="absolute inset-0 bg-[#FFC107]/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            <div className="p-12 md:p-16 flex flex-col justify-center">
              <span className="text-[#FFC107] text-xs tracking-[0.3em] uppercase mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>Featured Work</span>
              <h3
                className="text-white mb-7"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1 }}
              >
                Lumina Annual Conclave 2024
              </h3>
              <p className="text-white/45 text-sm leading-relaxed mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                A 3-day leadership summit for 400 senior executives. Complete event design, venue transformation, speaker experience, and after-party.
              </p>
              <ul className="space-y-2 mb-10">
                {["400 Attendees", "3-Day Event", "4 Venues", "Complete Creative Direction"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-white/35 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <span className="text-[#FFC107] text-[10px]">◆</span> {item}
                  </li>
                ))}
              </ul>
              <Link href="/contact">
                <span className="inline-flex items-center gap-2 text-[#FFC107] text-sm tracking-[0.2em] uppercase cursor-pointer hover:gap-5 transition-all duration-300" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Plan Something Similar →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-36 px-6 lg:px-10 text-center bg-[#FFC107]">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-black mb-8"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem, 10vw, 9rem)", lineHeight: 0.9 }}
          >
            Your Story. Our Design.
          </h2>
          <Link href="/contact">
            <span className="inline-block bg-black text-white px-12 py-5 text-sm tracking-[0.2em] uppercase font-bold cursor-pointer hover:bg-[#111]/80 transition-colors duration-200" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Start Planning →
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
