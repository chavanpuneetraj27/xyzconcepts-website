import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import heroImg from "@assets/image_1777389825856.png?w=1600&format=webp&quality=82";
import weddingImg from "@assets/image_1777390241396.png?w=1000&format=webp&quality=80";
import birthdayImg from "@assets/image_1777390421362.png?w=1000&format=webp&quality=80";
import milestoneImg from "@assets/image_1777391108226.png?w=1000&format=webp&quality=80";
import momentsOfLoveImg from "@assets/image_1777391572230.png?w=1000&format=webp&quality=80";
import socialGatheringsImg from "@assets/image_1777391787231.png?w=1000&format=webp&quality=80";
import culturalImg from "@assets/image_1777391963107.png?w=1000&format=webp&quality=80";
import m1 from "@assets/image_1777392744826.png?w=520&format=webp&quality=74";
import m2 from "@assets/image_1777392758958.png?w=520&format=webp&quality=74";
import m3 from "@assets/image_1777392785468.png?w=520&format=webp&quality=74";
import m4 from "@assets/image_1777392802663.png?w=520&format=webp&quality=74";
import m5 from "@assets/image_1777393037099.png?w=520&format=webp&quality=74";
import m6 from "@assets/image_1777393050730.png?w=520&format=webp&quality=74";
import m7 from "@assets/image_1777393072749.png?w=520&format=webp&quality=74";
import m8 from "@assets/image_1777393084831.png?w=520&format=webp&quality=74";
import m9 from "@assets/image_1777393093328.png?w=520&format=webp&quality=74";
import m10 from "@assets/image_1777393102884.png?w=520&format=webp&quality=74";
import m11 from "@assets/image_1777393111080.png?w=520&format=webp&quality=74";
import m12 from "@assets/image_1777393134517.png?w=520&format=webp&quality=74";
import m13 from "@assets/image_1777393147118.png?w=520&format=webp&quality=74";

import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import Marquee from "@/components/motion/Marquee";
import { ParallaxImage } from "@/components/motion/Parallax";
import { RevealLines, FadeUp } from "@/components/motion/Reveal";
import { EASE_OUT } from "@/lib/motion";

const CATEGORIES = [
  { title: "Weddings & Functions", desc: "Engagement Ceremony · Haldi · Mehendi · Sangeet · Wedding Ceremony · Reception", img: weddingImg, tall: true },
  { title: "Birthday Celebrations", desc: "Kids Birthdays · Adult Birthdays · Milestone Birthdays · Surprise Parties", img: birthdayImg, tall: false },
  { title: "Moments of Love", desc: "Proposal Events · Anniversary · Vow Renewals · Family Reunions", img: momentsOfLoveImg, tall: false },
  { title: "Social Gatherings", desc: "House Warming · Farewell Parties · Festive Celebrations · Get Togethers", img: socialGatheringsImg, tall: true },
  { title: "Milestone Moments", desc: "Baby Shower · Naamkaran · First Birthday · Cradle Ceremony · Retirement", img: milestoneImg, tall: false },
  { title: "Cultural & Religious", desc: "Griha Pravesh · Puja Ceremonies · Thread Ceremony · Naming Ceremonies", img: culturalImg, tall: false },
];

const STEPS = [
  { num: "01", title: "Dream It", desc: "Share your vision with us, no detail is too big or too small. This is where it all begins." },
  { num: "02", title: "Design It", desc: "We turn your dream into a concrete, beautiful, detailed plan. Every element considered." },
  { num: "03", title: "Build It", desc: "Vendors, logistics, timelines: we coordinate every moving piece with precision." },
  { num: "04", title: "Live It", desc: "Your only job on the day is to be present. Leave everything else to us." },
  { num: "05", title: "Remember It", desc: "We make sure every moment is captured, documented and felt long after it's over." },
];

const GALLERY_A = [heroImg, weddingImg, m1, birthdayImg, m2, momentsOfLoveImg, m3, socialGatheringsImg, m4, milestoneImg];
const GALLERY_B = [culturalImg, m5, m6, m7, m8, m9, m10, m11, m12, m13];

/** Two-column masonry where each column drifts at its own speed. */
function Categories() {
  const left = CATEGORIES.filter((_, i) => i % 2 === 0);
  const right = CATEGORIES.filter((_, i) => i % 2 === 1);
  const Card = ({ c, i }: { c: (typeof CATEGORIES)[number]; i: number }) => (
    <FadeUp delay={(i % 3) * 0.08} className="group relative overflow-hidden">
      <ParallaxImage
        src={c.img}
        alt={`${c.title} — social event planning by XYZconcepts, Hyderabad`}
        speed={0.1}
        className={c.tall ? "aspect-[4/5]" : "aspect-[4/3]"}
        imgClassName="transition-transform duration-[1.4s] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          <h3 className="display-sm text-paper">{c.title}</h3>
          <p className="font-body text-white/65 text-sm mt-2 leading-relaxed max-w-md translate-y-2 opacity-80 lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-600">
            {c.desc}
          </p>
        </div>
        <span className="absolute left-0 bottom-0 h-[3px] w-full bg-sun origin-left scale-x-0 transition-transform duration-700 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
      </ParallaxImage>
    </FadeUp>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
      <div className="flex flex-col gap-5 md:gap-6">{left.map((c, i) => <Card key={c.title} c={c} i={i} />)}</div>
      <div className="flex flex-col gap-5 md:gap-6 md:mt-24">{right.map((c, i) => <Card key={c.title} c={c} i={i} />)}</div>
    </div>
  );
}

/** Vertical timeline whose spine fills as you scroll past each step. */
function Way() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.6"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative bg-sun text-ink">
      <div className="container-x section-y">
        <SectionHeading
          eyebrow="How We Work"
          title={["The XYZ", "Way."]}
          tone="sun"
          aside={<p className="italic">Where every celebration becomes a story worth telling.</p>}
          className="mb-16 md:mb-24"
        />
        <div ref={ref} className="relative grid grid-cols-1 lg:grid-cols-12 gap-x-10">
          {/* spine */}
          <div className="absolute left-[1.15rem] md:left-[1.4rem] lg:left-1/2 top-0 bottom-0 w-px bg-ink/15" aria-hidden>
            <motion.div className="absolute inset-x-0 top-0 h-full bg-ink origin-top" style={{ scaleY }} />
          </div>
          <ol className="lg:col-span-12 flex flex-col gap-14 md:gap-20">
            {STEPS.map((s, i) => {
              const leftSide = i % 2 === 0;
              return (
                <li key={s.num} className={`relative grid grid-cols-[2.3rem_1fr] md:grid-cols-[2.8rem_1fr] lg:grid-cols-2 gap-x-6 lg:gap-x-0 items-start`}>
                  {/* node */}
                  <motion.span
                    className="absolute left-[0.65rem] md:left-[0.9rem] lg:left-1/2 lg:-translate-x-1/2 top-2 w-4 h-4 rounded-full bg-ink ring-4 ring-sun"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.5, ease: EASE_OUT }}
                    aria-hidden
                  />
                  <span className="hidden lg:block" />
                  <FadeUp className={`col-start-2 lg:col-start-auto ${leftSide ? "lg:col-start-1 lg:row-start-1 lg:pr-20 lg:text-right" : "lg:pl-20"}`}>
                    <span className="eyebrow text-ink/50">Step {s.num}</span>
                    <h3 className="display-md text-ink mt-2" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}>{s.title}</h3>
                    <p className={`font-body text-ink/70 leading-relaxed mt-4 max-w-md ${leftSide ? "lg:ml-auto" : ""}`}>{s.desc}</p>
                  </FadeUp>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const Row = ({ images, v }: { images: string[]; v: number }) => (
    <Marquee baseVelocity={v} className="py-2 md:py-3">
      {images.map((src, i) => (
        <div key={i} className="flex-none w-[62vw] sm:w-[40vw] lg:w-[24vw] aspect-[3/2] mx-1.5 md:mx-2 overflow-hidden">
          <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" draggable={false} />
        </div>
      ))}
    </Marquee>
  );
  return (
    <section className="bg-ink py-[var(--section-y)] overflow-hidden">
      <div className="container-x mb-10 md:mb-14">
        <SectionHeading eyebrow="Moments" title={["Felt, not", "just attended."]} size="md" />
      </div>
      <Row images={GALLERY_A} v={1.1} />
      <Row images={GALLERY_B} v={-1.1} />
    </section>
  );
}

function Closing() {
  return (
    <section className="relative bg-ink-2 text-paper border-t border-white/10">
      <div className="container-x section-y text-center">
        <RevealLines
          as="h2"
          text={["We own the details.", "You enjoy the moment."]}
          className="display-lg text-paper mx-auto max-w-[18ch]"
          lineClass={(_, i) => (i === 1 ? "text-sun" : undefined)}
        />
        <FadeUp delay={0.35} className="mt-12">
          <Button href="/contact" variant="sun" size="lg">Tell Us Your Story</Button>
        </FadeUp>
      </div>
    </section>
  );
}

export default function SocialEvents() {
  return (
    <div className="bg-ink">
      <PageHero
        image={heroImg}
        alt="Indian wedding and social celebration designed by XYZconcepts, Hyderabad"
        eyebrow="Every Occasion. Every Story. Every Emotion."
        title={["Celebrations", "that feel", "like magic."]}
        accentLine={2}
        sub={<>Weddings. Birthdays. Anniversaries. Baby Showers. Every occasion treated like it's the only one.</>}
        cta={{ href: "/contact", label: "Tell Us Your Story" }}
      />

      <section className="container-x section-y">
        <SectionHeading
          eyebrow="We Celebrate"
          title={["Every kind", "of joy."]}
          aside={<p>Designed around your story, not a template. Hover any celebration to see what it covers.</p>}
          className="mb-16 md:mb-24"
        />
        <Categories />
      </section>

      <Way />
      <Gallery />
      <Closing />
    </div>
  );
}
