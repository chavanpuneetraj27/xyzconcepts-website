import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

import heroImg from "@assets/image_1777397240987.png?w=1600&format=webp&quality=82";
import portfolioCorporate1 from "@/assets/images/portfolio-corporate-1.png?w=1200&format=webp&quality=82";
import portfolioCorporate2 from "@/assets/images/portfolio-corporate-2.png?w=1000&format=webp&quality=82";
import portfolioWedding1 from "@/assets/images/portfolio-wedding-1.png?w=1000&format=webp&quality=82";
import portfolioWedding2 from "@/assets/images/portfolio-wedding-2.png?w=1000&format=webp&quality=82";
import portfolioBirthday1 from "@/assets/images/portfolio-birthday-1.png?w=1000&format=webp&quality=82";
import portfolioActivation1 from "@/assets/images/portfolio-activation-1.png?w=1000&format=webp&quality=82";
import portfolioActivation2 from "@/assets/images/portfolio-activation-2.png?w=1000&format=webp&quality=82";
import portfolioExhibition1 from "@/assets/images/portfolio-exhibition-1.png?w=1000&format=webp&quality=82";

import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { ParallaxImage } from "@/components/motion/Parallax";
import { RevealLines, FadeUp } from "@/components/motion/Reveal";
import { EASE_OUT, EASE_STAGE } from "@/lib/motion";

const FILTERS = ["All", "Corporate", "Social", "Brand", "Exhibition"] as const;
type Filter = (typeof FILTERS)[number];

const ITEMS = [
  { id: 1, src: portfolioCorporate1, title: "Lumina Annual Conclave", category: "Corporate", year: "2024", desc: "3-day leadership summit for 400 attendees in Hyderabad.", span: "md:col-span-7", ratio: "aspect-[4/3]" },
  { id: 2, src: portfolioWedding1, title: "Priya & Arjun's Wedding", category: "Social", year: "2024", desc: "A 3-day dream wedding in Hyderabad with 600 guests.", span: "md:col-span-5", ratio: "aspect-[4/5]" },
  { id: 3, src: portfolioActivation1, title: "Spark Brand Launch", category: "Brand", year: "2023", desc: "Product launch experience for a consumer tech brand.", span: "md:col-span-5", ratio: "aspect-[4/5]" },
  { id: 4, src: portfolioCorporate2, title: "TechCorp Annual Day", category: "Corporate", year: "2023", desc: "2000-person annual day with live performances and installations.", span: "md:col-span-7", ratio: "aspect-[4/3]" },
  { id: 5, src: portfolioBirthday1, title: "The Golden 50", category: "Social", year: "2024", desc: "A milestone 50th birthday designed around the guest's legacy.", span: "md:col-span-4", ratio: "aspect-[4/5]" },
  { id: 6, src: portfolioExhibition1, title: "NexGen Expo 2024", category: "Exhibition", year: "2024", desc: "360-degree exhibition presence across two pavilions.", span: "md:col-span-8", ratio: "aspect-[16/10]" },
  { id: 7, src: portfolioActivation2, title: "Glow Activations", category: "Brand", year: "2023", desc: "Multi-city brand experience tour for a beauty brand.", span: "md:col-span-6", ratio: "aspect-[4/3]" },
  { id: 8, src: portfolioWedding2, title: "Meghna & Rahul", category: "Social", year: "2023", desc: "Intimate 80-person wedding with handcrafted details.", span: "md:col-span-6", ratio: "aspect-[4/3]" },
];

function Filters({ active, onChange }: { active: Filter; onChange: (f: Filter) => void }) {
  return (
    <LayoutGroup id="portfolio-filters">
      <div className="flex flex-wrap gap-2 md:gap-3" role="tablist" aria-label="Filter work by category">
        {FILTERS.map((f) => {
          const on = f === active;
          return (
            <button
              key={f}
              role="tab"
              aria-selected={on}
              onClick={() => onChange(f)}
              className={`relative px-5 md:px-6 py-2.5 eyebrow text-[0.62rem] transition-colors duration-400 ${on ? "text-ink" : "text-white/55 hover:text-paper"}`}
            >
              {on && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 bg-sun"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
              <span className="relative">{f}</span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}

function WorkGrid({ filter }: { filter: Filter }) {
  const items = filter === "All" ? ITEMS : ITEMS.filter((i) => i.category === filter);
  return (
    <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
      <AnimatePresence mode="popLayout">
        {items.map((item, i) => (
          <motion.figure
            key={item.id}
            layout
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6, delay: i * 0.04, ease: EASE_OUT }}
            className={`group relative overflow-hidden ${item.span} ${filter !== "All" ? "md:col-span-6" : ""}`}
          >
            <ParallaxImage
              src={item.src}
              alt={`${item.title} — ${item.category.toLowerCase()} event by XYZconcepts, ${item.year}`}
              speed={0.1}
              className={item.ratio}
              imgClassName="transition-transform duration-[1.4s] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/15 to-transparent opacity-80 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-600" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <div className="flex items-end justify-between gap-6">
                  <div className="translate-y-0 lg:translate-y-3 lg:group-hover:translate-y-0 transition-transform duration-600 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]">
                    <span className="eyebrow text-sun text-[0.58rem]">{item.category} · {item.year}</span>
                    <h3 className="display-sm text-paper mt-2">{item.title}</h3>
                    <p className="font-body text-white/65 text-sm mt-2 max-w-sm lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-600 delay-100">{item.desc}</p>
                  </div>
                </div>
              </figcaption>
              <span className="absolute top-5 left-5 bg-sun text-ink eyebrow text-[0.52rem] px-2.5 py-1">{item.category}</span>
            </ParallaxImage>
          </motion.figure>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

function Featured() {
  const facts = ["400 Attendees", "3-Day Event", "4 Venues", "Complete Creative Direction"];
  return (
    <section className="relative bg-ink-2 border-y border-white/10 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7 relative min-h-[60vh] lg:min-h-[90vh]">
          <ParallaxImage fill src={portfolioCorporate1} alt="Lumina Annual Conclave 2024 — three-day leadership summit produced by XYZconcepts" speed={0.2}>
            <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ink-2" />
          </ParallaxImage>
        </div>
        <div className="lg:col-span-5 container-x py-[var(--section-y)] lg:pl-16 flex flex-col justify-center">
          <FadeUp><p className="eyebrow text-sun mb-7">Featured Work</p></FadeUp>
          <RevealLines as="h2" text={["Lumina Annual", "Conclave 2024"]} className="display-md text-paper" />
          <FadeUp delay={0.25}>
            <p className="font-body text-white/60 leading-relaxed mt-7 max-w-md">
              A 3-day leadership summit for 400 senior executives. Complete event design, venue transformation, speaker experience, and after-party.
            </p>
          </FadeUp>
          <ul className="mt-10 border-t border-white/10">
            {facts.map((f, i) => (
              <FadeUp key={f} delay={0.3 + i * 0.08}>
                <li className="flex items-center justify-between py-4 border-b border-white/10 font-body text-white/75">
                  <span>{f}</span>
                  <span className="text-sun text-[0.6rem]">◆</span>
                </li>
              </FadeUp>
            ))}
          </ul>
          <FadeUp delay={0.7} className="mt-10">
            <Button href="/contact" variant="ghost-light">Plan Something Similar</Button>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const [filter, setFilter] = useState<Filter>("All");

  return (
    <div className="bg-ink">
      <PageHero
        image={heroImg}
        alt="Event portfolio of XYZconcepts — corporate, wedding and brand experiences"
        eyebrow="Our Work"
        title={["Events designed", "to be felt."]}
        accentLine={1}
        align="center"
      />

      <section className="container-x section-y">
        <SectionHeading
          eyebrow="Selected Work"
          title={["A sample of", "what we do."]}
          aside={<p>This is just a sample. Our real portfolio is even better — ask us for it.</p>}
          className="mb-12 md:mb-16"
        />
        <FadeUp className="mb-10 md:mb-14"><Filters active={filter} onChange={setFilter} /></FadeUp>
        <WorkGrid filter={filter} />
      </section>

      <Featured />

      <section className="relative bg-sun text-ink">
        <div className="container-x section-y text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE_STAGE }}>
            <RevealLines as="h2" text={["Your story.", "Our design."]} className="display-xl text-ink mx-auto" lineClass={(_, i) => (i === 1 ? "text-outline text-outline-ink" : undefined)} />
          </motion.div>
          <FadeUp delay={0.35} className="mt-12">
            <Button href="/contact" variant="ink" size="lg">Start Planning</Button>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
