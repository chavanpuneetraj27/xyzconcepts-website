import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import heroBg from "@assets/image_1777380738256.png?w=1400&format=webp&quality=85";
import corpImg from "@assets/image_1777381416896.png?w=800&format=webp&quality=82";
import socialImg from "@assets/image_1777381534927.png?w=800&format=webp&quality=82";
import brandImg from "@assets/image_1777381619319.png?w=800&format=webp&quality=82";
import founderImg from "@assets/DSC_0882_1784537425282.jpg?w=600&format=webp&quality=85";
import leadershipImg from "@assets/image_1777396872183.png?w=800&format=webp&quality=82";
import weddingImg from "@assets/image_1777396919904.png?w=800&format=webp&quality=82";
import socialShowcaseImg from "@assets/image_1777396963944.png?w=800&format=webp&quality=82";
import brandShowcaseImg from "@assets/image_1777397240987.png?w=800&format=webp&quality=82";

// Indian event images
const HERO_IMG = heroBg;
const CORP_IMG = corpImg;
const SOCIAL_IMG = socialImg;
const BRAND_IMG = brandImg;
const FOUNDER_IMG = founderImg;

// Showcase panels — mix of Indian & relevant event imagery
const SHOWCASE = [
  { img: leadershipImg, label: "Leadership Summits" },
  { img: weddingImg, label: "Grand Weddings" },
  { img: brandShowcaseImg, label: "Brand Experiences" },
  { img: socialShowcaseImg, label: "Social Events" },
];

function Marquee() {
  const text = "CORPORATE EVENTS · WEDDINGS · BRAND ACTIVATIONS · EXHIBITIONS · GIFTING · PRODUCT LAUNCHES · SOCIAL EVENTS · ";
  return (
    <div className="relative overflow-hidden bg-[#111] py-6">
      <div className="flex whitespace-nowrap">
        {[1, 2].map((n) => (
          <motion.div
            key={n}
            className="flex whitespace-nowrap"
            animate={{ x: [0, "-100%"] }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          >
            <span
              className="text-[#FFC107] text-2xl px-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.12em" }}
            >
              {text.repeat(3)}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CountUp({ target, suffix = "", duration = 1600 }: { target: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;
    let current = 0;
    const steps = 40;
    const stepMs = Math.ceil(duration / steps);
    const inc = Math.max(1, Math.floor(target / steps));
    const timer = setInterval(() => {
      current += inc;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(current);
    }, stepMs);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function ServiceCard({ img, number, title, desc, linkTo }: { img: string; number: string; title: string; desc: string; linkTo: string }) {
  return (
    <motion.div
      className="relative overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div className="relative overflow-hidden h-80 md:h-96">
        <img
          src={img}
          alt={`${title} organised by XYZconcepts, Hyderabad`}
          className="w-full h-full object-cover transition-all duration-600 group-hover:scale-105 group-hover:grayscale group-hover:brightness-75 group-hover:contrast-125"
          loading="lazy"
          decoding="async"
        />
        {/* Yellow duotone screen overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-35 transition-opacity duration-500 pointer-events-none"
          style={{ backgroundColor: "#FFC107", mixBlendMode: "screen" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <span className="text-[#FFC107] text-sm tracking-[0.2em] uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>{number}</span>
        <h3 className="text-white text-4xl mt-2 leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}>{title}</h3>
        <p className="text-white/70 text-sm mt-3 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{desc}</p>
        <Link href={linkTo}>
          <span className="inline-flex items-center gap-2 text-[#FFC107] text-sm mt-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Explore →
          </span>
        </Link>
      </div>
    </motion.div>
  );
}

function ParallaxShowcase() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section ref={ref} className="py-32 px-6 lg:px-10 bg-[#F8F8F8] overflow-hidden">
      <div className="max-w-7xl mx-auto mb-20">
        <p className="text-[#FFC107] text-xs tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Every Occasion</p>
        <h2 className="text-[#111] text-6xl md:text-8xl" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Designed to Be Felt</h2>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
        {SHOWCASE.map((panel, i) => (
          <motion.div
            key={i}
            className="relative overflow-hidden aspect-[3/4] group"
            style={{ y: i % 2 === 0 ? y1 : y2 }}
          >
            <img src={panel.img} alt={`${panel.label} by XYZconcepts, Hyderabad`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
            <div className="absolute bottom-5 left-5">
              <span className="text-white text-xl" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}>{panel.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 700], [0, 200]);
  const heroInView = useInView(heroRef, { once: true });

  const stats = [
    { target: 6, suffix: "+", label: "Years Experience" },
    { target: 300, suffix: "+", label: "Events Delivered" },
    { target: 30, suffix: "+", label: "Happy Clients" },
    { target: 10, suffix: "+", label: "Cities Reached" },
  ];

  const testimonials = [
    { quote: "Honestly didn't expect this level of execution. Vaishali and the team just got what we wanted without us having to explain twice. The event felt exactly like we imagined it.", name: "Rahul Mehta", company: "⭐⭐⭐⭐⭐" },
    { quote: "What impressed me most was how calm Shreya & Vaishali were on the day of the event. Nothing felt rushed. Everything just happened perfectly. That's rare to find.", name: "Arjun Sharma", company: "⭐⭐⭐⭐⭐" },
    { quote: "Shreya just knows how to run a show. From planning to execution, not a single thing went wrong. Our event had never looked this good before.", name: "Kabir Malhotra", company: "⭐⭐⭐⭐⭐" },
  ];

  return (
    <div className="overflow-x-hidden bg-white">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-end overflow-hidden">
        <motion.div className="absolute inset-0 w-full h-[118%] -top-[9%]" style={{ y: parallaxY }}>
          <img src={HERO_IMG} alt="Large-scale corporate event produced by XYZconcepts in Hyderabad" className="w-full h-full object-cover" fetchPriority="high" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-24">
          {/* One <h1> per page: the three visual lines are spans inside it, so the
              staggered animation and layout are unchanged but the page has a
              single top-level heading instead of three competing ones. */}
          <h1 className="mb-10" style={{ margin: "0 0 2.5rem" }}>
            {[
              { text: "BIG IDEAS.", size: "clamp(4.5rem, 11vw, 10rem)" },
              { text: "BIGGER", size: "clamp(5.5rem, 15vw, 15rem)" },
              { text: "EXPERIENCES.", size: "clamp(3.5rem, 11vw, 10rem)" },
            ].map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: line.size, lineHeight: 0.9, letterSpacing: "0.02em", color: i === 1 ? "#FFC107" : "#fff", display: "block" }}
                  initial={{ y: 140, opacity: 0 }}
                  animate={heroInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.14, ease: [0.76, 0, 0.24, 1] }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="text-white/85 text-lg md:text-xl italic mb-12 max-w-xl leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.65 }}
          >
            Your search ends <strong>with us</strong>, literally!
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-start gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.85 }}
          >
            <Link href="/contact">
              <span className="bg-[#FFC107] text-black px-10 py-4 text-sm tracking-[0.2em] uppercase font-bold cursor-pointer hover:bg-yellow-400 transition-colors duration-200 inline-block" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Plan Your Event
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 right-10 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.3 }}
        >
          <span className="text-white/40 text-[9px] tracking-[0.35em] uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>Scroll</span>
          <div className="w-[1px] h-16 bg-white/30 relative overflow-hidden">
            <motion.div className="absolute top-0 left-0 w-full bg-[#FFC107]" animate={{ y: ["0%", "100%"] }} transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }} style={{ height: "35%" }} />
          </div>
        </motion.div>
      </section>

      <Marquee />

      {/* ── SERVICES ── */}
      <section className="py-32 px-6 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto mb-20">
          <p className="text-[#FFC107] text-xs tracking-[0.4em] uppercase mb-5 font-bold" style={{ fontFamily: "'DM Sans', sans-serif" }}>What We Do</p>
          <h2 className="text-[#111] text-6xl md:text-8xl leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>One Brief<br />Infinite Possibilities</h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          <ServiceCard img={CORP_IMG} number="01" title="Corporate Events" desc="Conferences, summits, annual days, and brand activations that your audience won't stop talking about." linkTo="/corporate-events" />
          <ServiceCard img={SOCIAL_IMG} number="02" title="Social Events" desc="Weddings, birthdays, and every occasion between, designed around your story, not a template." linkTo="/social-events" />
          <ServiceCard img={BRAND_IMG} number="03" title="Brand Experiences" desc="Activations, exhibitions, and launches built to outlive the day and live in your audience's memory." linkTo="/contact" />
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section className="py-36 px-6 lg:px-10 bg-[#111] text-center overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.8rem, 8vw, 7.5rem)", lineHeight: 1 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            An event no one remembers never happened.
          </motion.h2>
          <motion.div
            className="w-20 h-[3px] bg-[#FFC107] mx-auto mt-10 mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />
          <motion.p
            className="text-white/70 text-xl italic"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            We design for the memory. Not the moment.
          </motion.p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-28 px-6 lg:px-10 bg-[#FFC107]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="text-black" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(4rem, 9vw, 8rem)", lineHeight: 1 }}>
                <CountUp target={stat.target} suffix={stat.suffix} />
              </div>
              <p className="text-black/70 text-xs mt-3 tracking-[0.15em] uppercase font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <ParallaxShowcase />

      {/* ── TESTIMONIALS ── */}
      <section className="py-32 px-6 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <p className="text-[#FFC107] text-xs tracking-[0.4em] uppercase mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>What Clients Say</p>
            <h2 className="text-[#111] text-6xl md:text-8xl leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Words That<br />Matter</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="bg-[#F8F8F8] p-10 border-l-4 border-[#FFC107]"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <p className="text-base mb-5 tracking-wide">{t.company}</p>
                <p className="text-[#111]/80 text-base leading-relaxed italic mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>{t.quote}</p>
                <p className="text-[#111] text-xs tracking-[0.2em] uppercase font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDERS TEASER ── */}
      <section className="bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="relative aspect-[4/5] overflow-hidden">
            <img src={FOUNDER_IMG} alt="Shreya and Vaishali, co-founders of XYZconcepts event management, Hyderabad" className="w-full h-full object-contain absolute inset-0" loading="lazy" decoding="async" />
          </div>
          <div className="bg-[#111] p-14 md:p-20 flex flex-col justify-center">
            <p className="text-[#FFC107] text-xs tracking-[0.4em] uppercase mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>The Founders</p>
            <h2 className="text-white mb-8 leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 4.5vw, 4rem)", lineHeight: 1 }}>
              Built By Two Women Who Refuse To Do Ordinary.
            </h2>
            <p className="text-white/75 text-base leading-relaxed mb-10" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Two engineers who fell in love with stages, sounds and the magic of a perfectly executed event.
            </p>
            <Link href="/about">
              <span className="inline-flex items-center gap-3 text-[#FFC107] text-sm tracking-[0.2em] uppercase cursor-pointer hover:gap-5 transition-all duration-300" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Our Story →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-40 px-6 lg:px-10 bg-[#FFC107] text-center">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-black"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.5rem, 14vw, 13rem)", lineHeight: 0.88 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Your Search Ends Here.
          </motion.h2>
          <p className="text-black/75 text-lg md:text-xl mt-10 mb-12 italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Let's build something unforgettable together.
          </p>
          <Link href="/contact">
            <span className="inline-block bg-black text-white px-14 py-5 text-sm tracking-[0.25em] uppercase font-bold cursor-pointer hover:bg-[#111]/85 transition-colors duration-200" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Start Planning →
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
