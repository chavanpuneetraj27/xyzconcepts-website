import { motion } from "framer-motion";
import { Link } from "wouter";

import heroBg from "@assets/image_1777380738256.png?w=1600&format=webp&quality=82";
import corpImg from "@assets/image_1777381416896.png?w=1200&format=webp&quality=80";
import socialImg from "@assets/image_1777381534927.png?w=1200&format=webp&quality=80";
import brandImg from "@assets/image_1777381619319.png?w=1200&format=webp&quality=80";
import foundersImg from "@assets/DSC_0882_1784537425282.jpg?w=1000&format=webp&quality=85";
import leadershipImg from "@assets/image_1777396872183.png?w=1000&format=webp&quality=80";
import weddingImg from "@assets/image_1777396919904.png?w=1000&format=webp&quality=80";
import socialShowcaseImg from "@assets/image_1777396963944.png?w=1000&format=webp&quality=80";
import brandShowcaseImg from "@assets/image_1777397240987.png?w=1000&format=webp&quality=80";

import Button from "@/components/Button";
import Marquee from "@/components/motion/Marquee";
import Counter from "@/components/motion/Counter";
import HorizontalScroll from "@/components/motion/HorizontalScroll";
import { StackCard } from "@/components/motion/StackCards";
import { ParallaxImage, useHeroParallax } from "@/components/motion/Parallax";
import { RevealLines, RevealWords, ScrubText, FadeUp, DrawLine } from "@/components/motion/Reveal";
import { EASE_STAGE } from "@/lib/motion";

/* ──────────────────────────────────────────────────────────────────────────
   Content — every string below is the site's existing copy.
   ────────────────────────────────────────────────────────────────────────── */

const SERVICES = [
  {
    num: "01",
    title: "Corporate Events",
    desc: "Conferences, summits, annual days, and brand activations that your audience won't stop talking about.",
    img: corpImg,
    href: "/corporate-events",
    cta: "Explore Corporate",
  },
  {
    num: "02",
    title: "Social Events",
    desc: "Weddings, birthdays, and every occasion between, designed around your story, not a template.",
    img: socialImg,
    href: "/social-events",
    cta: "Explore Social",
  },
  {
    num: "03",
    title: "Brand Experiences",
    desc: "Activations, exhibitions, and launches built to outlive the day and live in your audience's memory.",
    img: brandImg,
    href: "/contact",
    cta: "Start a Brief",
  },
];

const STATS = [
  { target: 6, suffix: "+", label: "Years Experience" },
  { target: 300, suffix: "+", label: "Events Delivered" },
  { target: 30, suffix: "+", label: "Happy Clients" },
  { target: 10, suffix: "+", label: "Cities Reached" },
];

const SHOWCASE = [
  { img: leadershipImg, label: "Leadership Summits", num: "01" },
  { img: weddingImg, label: "Grand Weddings", num: "02" },
  { img: brandShowcaseImg, label: "Brand Experiences", num: "03" },
  { img: socialShowcaseImg, label: "Social Events", num: "04" },
];

const TESTIMONIALS = [
  {
    quote: "Honestly didn't expect this level of execution. Vaishali and the team just got what we wanted without us having to explain twice. The event felt exactly like we imagined it.",
    name: "Rahul Mehta",
  },
  {
    quote: "What impressed me most was how calm Shreya & Vaishali were on the day of the event. Nothing felt rushed. Everything just happened perfectly. That's rare to find.",
    name: "Arjun Sharma",
  },
  {
    quote: "Shreya just knows how to run a show. From planning to execution, not a single thing went wrong. Our event had never looked this good before.",
    name: "Kabir Malhotra",
  },
];

const MARQUEE_ITEMS = ["Corporate Events", "Weddings", "Brand Activations", "Exhibitions", "Gifting", "Product Launches", "Social Events"];

/* ──────────────────────────────────────────────────────────────────────────
   Sections
   ────────────────────────────────────────────────────────────────────────── */

function Hero() {
  const { ref, bgY, bgScale, fgY, fade } = useHeroParallax();

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden flex items-end">
      {/* Stage backdrop: image sinks and zooms as you leave, so the copy appears to lift off it. */}
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <img
          src={heroBg}
          alt="Large-scale corporate event produced by XYZconcepts in Hyderabad"
          className="w-full h-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />
      <div className="absolute inset-0 bloom" />

      <motion.div className="relative z-10 w-full container-x pb-14 md:pb-20" style={{ y: fgY, opacity: fade }}>
        <motion.p
          className="eyebrow text-sun mb-7 md:mb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE_STAGE }}
        >
          Event Design &amp; Management · Hyderabad
        </motion.p>

        {/* One <h1>, three visual lines. */}
        <RevealLines
          as="h1"
          text={["Big Ideas.", "Bigger", "Experiences."]}
          className="display-xl text-paper max-w-[12ch]"
          stagger={0.12}
          delay={0.2}
          lineClass={(_, i) => (i === 1 ? "text-sun" : undefined)}
        />

        <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end">
          <motion.p
            className="md:col-span-6 font-body text-white/80 text-lg md:text-xl italic max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease: EASE_STAGE }}
          >
            Your search ends <strong className="not-italic text-paper">with us</strong>, literally!
          </motion.p>
          <motion.div
            className="md:col-span-6 md:justify-self-end"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: EASE_STAGE }}
          >
            <Button href="/contact" variant="sun" size="lg">Plan Your Event</Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-6 right-[var(--gutter)] hidden md:flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        aria-hidden
      >
        <span className="eyebrow text-[0.55rem] text-white/40">Scroll</span>
        <div className="w-px h-14 bg-white/15 relative overflow-hidden">
          <motion.div className="absolute top-0 left-0 w-full h-1/3 bg-sun" animate={{ y: ["-100%", "300%"] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} />
        </div>
      </motion.div>
    </section>
  );
}

function Ticker() {
  return (
    <div className="relative bg-ink border-y border-white/10">
      <Marquee baseVelocity={1.6} className="py-5 md:py-7">
        {MARQUEE_ITEMS.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className={`display-md ${i % 2 ? "text-outline" : "text-paper"}`} style={{ fontSize: "clamp(1.9rem, 4.5vw, 4rem)" }}>
              {item}
            </span>
            <span className="text-sun mx-6 md:mx-10 text-xl">◆</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}

function Services() {
  return (
    <section className="relative bg-ink">
      <div className="container-x pt-[var(--section-y)] pb-10 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <FadeUp><p className="eyebrow text-sun mb-6">What We Do</p></FadeUp>
            <RevealLines as="h2" text={["One Brief.", "Infinite Possibilities."]} className="display-lg text-paper" />
          </div>
          <FadeUp className="md:col-span-4 md:justify-self-end md:text-right" delay={0.2}>
            <p className="font-body text-white/55 max-w-xs leading-relaxed">Three disciplines. One standard. Every event gets the same obsession with detail.</p>
          </FadeUp>
        </div>
      </div>

      {/* Stacking service panels */}
      <div className="relative pb-[10vh]">
        {SERVICES.map((s, i) => (
          <StackCard key={s.num} index={i} total={SERVICES.length} height="92vh" top="9vh">
            <div className="container-x">
              <Link
                href={s.href}
                className="group relative grid grid-cols-1 lg:grid-cols-12 bg-ink-3 border border-white/10 overflow-hidden min-h-[70vh] lg:min-h-[78vh]"
              >
                <ParallaxImage
                  src={s.img}
                  alt={`${s.title} organised by XYZconcepts, Hyderabad`}
                  speed={0.12}
                  className="lg:col-span-7 min-h-[42vh] lg:min-h-full"
                  imgClassName="transition-transform duration-[1.4s] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ink-3" />
                </ParallaxImage>

                <div className="lg:col-span-5 relative flex flex-col justify-between p-7 md:p-12 lg:p-14">
                  <div className="flex items-start justify-between">
                    <span className="display-sm text-sun">{s.num}</span>
                    <span className="eyebrow text-white/30 text-[0.58rem]">0{SERVICES.length}</span>
                  </div>
                  <div className="mt-10 lg:mt-0">
                    <h3 className="display-md text-paper">{s.title}</h3>
                    <p className="font-body text-white/60 leading-relaxed mt-5 max-w-md">{s.desc}</p>
                    <span className="mt-9 inline-flex items-center gap-3 eyebrow text-sun">
                      {s.cta}
                      <span className="inline-block transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">→</span>
                    </span>
                  </div>
                </div>

                {/* Yellow sweep on hover along the bottom edge */}
                <span className="absolute left-0 bottom-0 h-[3px] w-full bg-sun origin-left scale-x-0 transition-transform duration-700 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
              </Link>
            </div>
          </StackCard>
        ))}
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="relative bg-ink-2 noise">
      <div className="min-h-[200vh]">
        <div className="sticky top-0 h-screen flex items-center">
          <div className="container-x w-full">
            <FadeUp><p className="eyebrow text-sun mb-10">Our Belief</p></FadeUp>
            <ScrubText
              as="h2"
              text="An event no one remembers never happened."
              className="display-lg text-paper max-w-[16ch]"
            />
            <div className="mt-10 md:mt-14 flex items-center gap-6">
              <DrawLine className="w-16 md:w-24" delay={0.2} />
              <RevealWords text="We design for the memory. Not the moment." className="font-body text-white/60 text-lg md:text-2xl italic" delay={0.4} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="relative bg-sun text-ink overflow-hidden">
      <div className="container-x section-y">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14">
          {STATS.map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.08} className="border-t border-ink/15 pt-6">
              <div className="display-xl leading-none tabular-nums" style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)" }}>
                <Counter target={s.target} suffix={s.suffix} />
              </div>
              <p className="eyebrow text-ink/60 mt-4">{s.label}</p>
            </FadeUp>
          ))}
        </div>
      </div>
      {/* Big ghost word drifting behind */}
      <div className="pointer-events-none absolute -bottom-[0.25em] left-0 right-0 overflow-hidden" aria-hidden>
        <Marquee baseVelocity={0.5} reactive={false}>
          <span className="display-xl text-outline opacity-[0.08] mx-8" style={{ fontSize: "clamp(8rem, 22vw, 22rem)", WebkitTextStrokeColor: "#0a0a0a" }}>XYZCONCEPTS&nbsp;XYZCONCEPTS&nbsp;</span>
        </Marquee>
      </div>
    </section>
  );
}

function Showcase() {
  return (
    <HorizontalScroll
      className="bg-ink text-paper py-[var(--section-y)] lg:py-0"
      header={
        <div className="mb-10 lg:mb-14 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-8">
            <FadeUp><p className="eyebrow text-sun mb-5">Every Occasion</p></FadeUp>
            <RevealLines as="h2" text={["Designed", "to be felt."]} className="display-lg text-paper" />
          </div>
          <FadeUp className="md:col-span-4 md:justify-self-end eyebrow text-white/35 text-[0.6rem]" delay={0.2}>
            <span className="hidden lg:inline">Scroll to explore</span>
            <span className="lg:hidden">Swipe to explore</span>
          </FadeUp>
        </div>
      }
    >
      {SHOWCASE.map((p) => (
        <figure
          key={p.num}
          className="group relative flex-none snap-start w-[78vw] sm:w-[60vw] lg:w-[34vw] aspect-[3/4] overflow-hidden"
        >
          <img
            src={p.img}
            alt={`${p.label} by XYZconcepts, Hyderabad`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
          <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex items-end justify-between">
            <span className="display-sm text-paper">{p.label}</span>
            <span className="eyebrow text-sun text-[0.6rem]">{p.num}</span>
          </figcaption>
        </figure>
      ))}
      <div className="flex-none snap-start w-[60vw] sm:w-[40vw] lg:w-[24vw] aspect-[3/4] flex flex-col justify-end p-6 md:p-8 border border-white/10">
        <p className="font-body text-white/50 leading-relaxed mb-7">Every event here was designed to be remembered, not just attended.</p>
        <Button href="/portfolio" variant="ghost-light">See the Work</Button>
      </div>
    </HorizontalScroll>
  );
}

function Testimonials() {
  return (
    <section className="relative bg-paper text-ink">
      <div className="container-x section-y">
        <div className="mb-16 md:mb-24 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-8">
            <FadeUp><p className="eyebrow text-sun-deep mb-5">What Clients Say</p></FadeUp>
            <RevealLines as="h2" text={["Words that", "matter."]} className="display-lg text-ink" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={t.name} delay={i * 0.12} className="bg-paper p-8 md:p-10 flex flex-col justify-between min-h-[22rem] border-t border-ink/10 lg:border-t-0 lg:border-l first:border-l-0 lg:[&:not(:first-child)]:border-l">
              <div>
                <span className="display-md text-sun leading-none">“</span>
                <p className="font-body text-ink/80 text-lg leading-relaxed -mt-4">{t.quote}</p>
              </div>
              <div className="mt-10 flex items-center gap-4">
                <span className="w-8 h-px bg-sun" />
                <span className="eyebrow text-ink/70">{t.name}</span>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function Founders() {
  return (
    <section className="relative bg-ink text-paper overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-6 relative min-h-[70vh] lg:min-h-[100vh] duotone-wrap">
          <ParallaxImage
            fill
            src={foundersImg}
            alt="Shreya and Vaishali, co-founders of XYZconcepts event management, Hyderabad"
            speed={0.18}
            imgClassName="duotone"
            position="center 20%"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ink" />
          </ParallaxImage>
        </div>
        <div className="lg:col-span-6 flex flex-col justify-center container-x py-[var(--section-y)] lg:pl-16">
          <FadeUp><p className="eyebrow text-sun mb-8">The Founders</p></FadeUp>
          <RevealLines as="h2" text={["Built by two women", "who refuse to", "do ordinary."]} className="display-md text-paper" />
          <FadeUp delay={0.3}>
            <p className="font-body text-white/60 text-lg leading-relaxed mt-8 max-w-md">
              Two engineers who fell in love with stages, sounds and the magic of a perfectly executed event.
            </p>
          </FadeUp>
          <FadeUp delay={0.45} className="mt-10">
            <Button href="/about" variant="ghost-light">Our Story</Button>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="bg-ink">
      <Hero />
      <Ticker />
      <Services />
      <Manifesto />
      <Stats />
      <Showcase />
      <Testimonials />
      <Founders />
    </div>
  );
}
