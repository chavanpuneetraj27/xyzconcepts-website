import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";

import heroImg from "@assets/DSC_0891.JPG_1777461996111.jpeg?w=1600&format=webp&quality=86";
import shreyaImg from "@assets/WhatsApp_Image_2026-04-28_at_22.00.28_1777396607970.jpeg?w=900&format=webp&quality=84";
import vaishaliImg from "@assets/WhatsApp_Image_2026-04-28_at_22.00.29_1777396645919.jpeg?w=900&format=webp&quality=84";

import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { RevealLines, RevealWords, FadeUp, DrawLine } from "@/components/motion/Reveal";
import { useRichMotion } from "@/lib/motion";

const STORY = [
  "Some callings don't knock; they pull. We began with engineering textbooks in hand, but our minds were always somewhere else, on stages, in crowds, in the chaos that makes an event come alive. From different cities and different colleges, we were unknowingly shaped by the same instinct to run toward every fest, every setup, every moment that needed someone to take charge. We didn't choose events; events chose us.",
  "One of us had already stepped into the world of events, while the other was quietly learning, observing, and mastering every detail, on different paths but in the same direction. Then came Mira IMS, the right place at the right time, where those paths finally crossed. And when we started working together, it didn't feel like work; it felt like everything had aligned.",
  "What people don't see are the 3AM setups, the last-minute changes, the endless coordination that tests every limit you have, but that's where we were built. Chaos taught us composure, and pressure gave us clarity. Somewhere in between all of it, XYZconcepts was born, not just as a company, but as a reflection of everything we believe events should be, intentional, immersive, and flawlessly executed. For us, it's about turning ideas into experiences and making every event feel personal, seamless, and unforgettable.",
  "Because for us, this was never just a career, and it never will be.",
];

const FOUNDERS = [
  { name: "Shreya", role: "Co-founder & Experience Designer", img: shreyaImg, pos: "center top" },
  { name: "Vaishali", role: "Co-founder & Creative Director", img: vaishaliImg, pos: "center 20%" },
];

const BELIEFS = [
  "Every detail. Every moment. Every guest. Considered.",
  "Seamless experiences don't just happen. They're planned.",
  "Size of event changes. Our standards don't.",
  "Every problem has a solution before it becomes one.",
  "Client satisfaction is the only standing ovation we need.",
];

/** Origin story: sticky chapter marker on the left, paragraphs unfolding on the right. */
function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.7"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative bg-paper text-ink">
      <div className="container-x section-y grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <FadeUp><p className="eyebrow text-sun-deep mb-6">The Origin</p></FadeUp>
            {/* Sized to the 4-column sticky rail, not the viewport — display-lg overflows it on desktop. */}
            <RevealLines as="h2" text={["Not just", "another", "beginning."]} className="display-lg text-ink" style={{ fontSize: "clamp(2.5rem, 5.5vw, 6.5rem)" }} />
            <div className="hidden lg:block mt-12 w-px h-40 bg-ink/10 relative">
              <motion.div className="absolute inset-x-0 top-0 h-full bg-ink origin-top" style={{ scaleY }} />
            </div>
          </div>
        </div>

        <div ref={ref} className="lg:col-span-7 lg:col-start-6 flex flex-col gap-10 md:gap-12">
          {STORY.map((p, i) => (
            <FadeUp key={i} delay={0.05} amount={0.2}>
              <p className={`font-body leading-relaxed text-ink/80 ${i === 0 ? "text-xl md:text-2xl first-letter:display-lg first-letter:float-left first-letter:mr-3 first-letter:leading-[0.8] first-letter:text-sun-deep" : "text-lg md:text-xl"} ${i === STORY.length - 1 ? "italic text-ink" : ""}`}>
                {p}
              </p>
            </FadeUp>
          ))}

          <FadeUp className="border-l-2 border-sun pl-6 md:pl-8 py-2">
            <p className="font-body text-ink/60 text-base md:text-lg leading-relaxed">
              And to the one who believed in us before we believed in ourselves —
              <span className="block mt-2 text-ink font-semibold">Captain Anand Dandapani</span>
              <span className="eyebrow text-[0.58rem] text-ink/45">Founder &amp; CEO, Mira IMS Pvt Ltd</span>
            </p>
          </FadeUp>

          <div className="pt-8 md:pt-12 border-t border-ink/10">
            <RevealWords text="Born backstage. Built for the spotlight." className="display-md text-ink" />
            <FadeUp delay={0.3}><p className="eyebrow text-ink/50 mt-5">XYZconcepts — Your search ends WITH US, literally!</p></FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Portrait that tilts toward the cursor on desktop; plain on touch. */
function FounderCard({ f, i }: { f: (typeof FOUNDERS)[number]; i: number }) {
  const rich = useRichMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 140, damping: 18 });
  const sry = useSpring(ry, { stiffness: 140, damping: 18 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!rich || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 10);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <FadeUp delay={i * 0.15} className="[perspective:1200px]">
      <motion.div
        ref={ref}
        className="group relative overflow-hidden bg-ink-3 duotone-wrap"
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        onMouseMove={onMove}
        onMouseLeave={reset}
      >
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={f.img}
            alt={`${f.name}, ${f.role} at XYZconcepts`}
            className="duotone w-full h-full object-cover transition-transform duration-[1.4s] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            style={{ objectPosition: f.pos }}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-7 md:p-9 flex items-end justify-between" style={{ transform: "translateZ(40px)" }}>
          <div>
            <h3 className="display-md text-sun">{f.name}</h3>
            <p className="eyebrow text-white/60 text-[0.6rem] mt-2">{f.role}</p>
          </div>
          <span className="eyebrow text-white/30 text-[0.58rem]">0{i + 1}</span>
        </div>
        <span className="absolute left-0 bottom-0 h-[3px] w-full bg-sun origin-left scale-x-0 transition-transform duration-700 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
      </motion.div>
    </FadeUp>
  );
}

function Founders() {
  return (
    <section className="relative bg-ink text-paper">
      <div className="container-x section-y">
        <SectionHeading eyebrow="The Founding Duo" title={["Meet the", "makers."]} className="mb-16 md:mb-24" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 max-w-5xl">
          {FOUNDERS.map((f, i) => <FounderCard key={f.name} f={f} i={i} />)}
        </div>
      </div>
    </section>
  );
}

function Beliefs() {
  return (
    <section className="relative bg-ink-2 text-paper border-t border-white/10">
      <div className="container-x section-y">
        <SectionHeading eyebrow="What We Stand For" title={["Five things", "we believe."]} className="mb-16 md:mb-20" />
        <ol className="border-t border-white/10">
          {BELIEFS.map((b, i) => (
            <li key={i} className="group border-b border-white/10">
              <div className="grid grid-cols-[3rem_1fr] md:grid-cols-[6rem_1fr] gap-6 py-8 md:py-12 items-start">
                <span className="display-sm text-sun mt-1">0{i + 1}</span>
                <RevealLines
                  as="h3"
                  text={[b]}
                  className="display-md text-paper transition-colors duration-500 group-hover:text-sun"
                  style={{ fontSize: "clamp(1.6rem, 4vw, 3.6rem)" }}
                  amount={0.5}
                />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="relative bg-sun text-ink overflow-hidden">
      <div className="container-x section-y">
        <RevealLines as="h2" text={["We don't just get it done.", "We get it right."]} className="display-lg text-ink max-w-[18ch]" lineClass={(_, i) => (i === 1 ? "text-outline text-outline-ink" : undefined)} />
        <div className="mt-8 flex items-center gap-6">
          <DrawLine className="w-16 md:w-24" color="bg-ink" />
          <RevealWords text="Every client. Every event. Every time." className="font-body text-ink/70 text-lg md:text-2xl italic" delay={0.3} />
        </div>
        <FadeUp delay={0.5} className="mt-12">
          <Button href="/contact" variant="ink" size="lg">Work With Us</Button>
        </FadeUp>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <div className="bg-ink">
      <PageHero
        image={heroImg}
        alt="The XYZconcepts team on site at an event in Hyderabad"
        eyebrow="The Story"
        title={["Built by two women", "who refuse to", "do ordinary."]}
        accentLine={2}
        position="center 25%"
        sub={
          <span className="not-italic">
            Shreya &amp; Vaishali, Co-founders
            <span className="block eyebrow text-[0.6rem] text-white/50 mt-2">— XYZconcepts</span>
          </span>
        }
      />
      <Story />
      <Founders />
      <Beliefs />
      <Closing />
    </div>
  );
}
