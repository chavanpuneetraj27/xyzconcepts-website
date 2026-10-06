import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import heroImg from "@assets/image_1777382274483.png?w=1600&format=webp&quality=82";
import corporateMeetsImg from "@assets/image_1777393271562.png?w=1000&format=webp&quality=80";
import employeeEngagementImg from "@assets/image_1777393311084.png?w=1000&format=webp&quality=80";
import inaugurationImg from "@assets/image_1777393388320.png?w=1000&format=webp&quality=80";
import corporateGiftingImg from "@assets/image_1777393460619.png?w=1000&format=webp&quality=80";
import sportsEventsImg from "@assets/image_1777393612337.png?w=1000&format=webp&quality=80";
import brandEventsImg from "@assets/image_1777393650444.png?w=1000&format=webp&quality=80";

import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import HorizontalScroll from "@/components/motion/HorizontalScroll";
import { RevealLines, FadeUp } from "@/components/motion/Reveal";
import { EASE_STAGE, EASE_OUT } from "@/lib/motion";

const SERVICES = [
  { num: "01", title: "Employee Engagement", desc: "Celebrating the people who make it all happen.", img: employeeEngagementImg,
    bullets: ["Annual Day", "R&R Events", "Festive Celebrations (Diwali, Christmas, New Year)", "Guest Speaker Sessions", "Team Building Activities", "Offsites"] },
  { num: "02", title: "Corporate Meets", desc: "Where ideas meet impact.", img: corporateMeetsImg,
    bullets: ["Conferences", "Townhall", "Summits", "Leadership Visits", "Panel Discussions"] },
  { num: "03", title: "Inauguration Events", desc: "Making your first impression unforgettable.", img: inaugurationImg,
    bullets: ["Office Inauguration", "Franchise Launch Events", "Experience Centre Launches"] },
  { num: "04", title: "Brand Events", desc: "Making your brand impossible to ignore.", img: brandEventsImg,
    bullets: ["Product Launches", "Brand Activations", "Dealer Meets", "Investor Meets", "Media Events"] },
  { num: "05", title: "Sports Events", desc: "Energy, adrenaline, and team spirit, all in one arena.", img: sportsEventsImg,
    bullets: ["Corporate Sports Day", "Marathons & Walkathons", "Cyclathons"] },
  { num: "06", title: "Corporate Gifting", desc: "Because the right gift says more than words ever can.", img: corporateGiftingImg,
    bullets: ["Festive Gift Hampers", "Personalised Employee Gifts", "Client & Partner Gifting", "Onboarding & Welcome Kits", "Awards & Trophy Gifting", "Branded Merchandise", "Luxury & Premium Gifting"] },
];

const STEPS = [
  { num: "01", title: "Brief & Discovery", subtitle: "We Listen Before We Lead", desc: "We deep dive into your goals, audience, budget and expectations, because great events start with the right questions." },
  { num: "02", title: "Creative Concept", subtitle: "Where Ideas Come Alive", desc: "We craft the event's complete creative direction: theme, design language, mood and experience flow. All uniquely yours." },
  { num: "03", title: "Design & Curation", subtitle: "Every Detail, Deliberately Designed", desc: "From décor to stage design, guest journey to experience touchpoints, nothing is left to chance." },
  { num: "04", title: "Execution", subtitle: "Flawless. Every Single Time.", desc: "Our on-ground team takes full ownership, so you show up as a guest at your own event." },
  { num: "05", title: "Post Event Review", subtitle: "We Don't Just Deliver, We Reflect", desc: "Full documentation, learnings, feedback and relationship continuity, because the next event starts here." },
];

/**
 * Editorial index. Desktop: hovering a row swaps the image in the sticky
 * panel; clicking expands the row's detail. Mobile: a single column where the
 * expanded row carries its own image.
 */
function ServiceIndex() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
      {/* Sticky image panel */}
      <div className="hidden lg:block lg:col-span-5">
        <div className="sticky top-28 aspect-[4/5] overflow-hidden bg-ink-3">
          {SERVICES.map((s, i) => (
            <motion.img
              key={s.num}
              src={s.img}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover"
              initial={false}
              animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.06 }}
              transition={{ duration: 0.9, ease: EASE_OUT }}
              loading="lazy"
              decoding="async"
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
          <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between">
            <span className="display-sm text-paper">{SERVICES[active].title}</span>
            <span className="eyebrow text-sun text-[0.6rem]">{SERVICES[active].num} / 06</span>
          </div>
        </div>
      </div>

      {/* Rows */}
      <ul className="lg:col-span-7 border-t border-white/10">
        {SERVICES.map((s, i) => {
          const isOpen = open === i;
          return (
            <li key={s.num} className="border-b border-white/10">
              <button
                type="button"
                className="group w-full text-left py-7 md:py-9 flex items-start gap-5 md:gap-8"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => {
                  setActive(i);
                  setOpen(isOpen ? null : i);
                }}
                aria-expanded={isOpen}
              >
                <span className="eyebrow text-sun mt-2 md:mt-3 w-8 shrink-0">{s.num}</span>
                <span className="flex-1 min-w-0">
                  <span className="flex items-baseline justify-between gap-6">
                    <span className={`display-md transition-colors duration-500 ${isOpen ? "text-sun" : "text-paper group-hover:text-sun"}`} style={{ fontSize: "clamp(1.9rem, 4.2vw, 3.6rem)" }}>
                      {s.title}
                    </span>
                    <motion.span
                      className="shrink-0 w-9 h-9 md:w-11 md:h-11 border border-white/20 flex items-center justify-center text-paper"
                      animate={{ rotate: isOpen ? 45 : 0, backgroundColor: isOpen ? "#ffc107" : "rgba(0,0,0,0)", color: isOpen ? "#0a0a0a" : "#ffffff" }}
                      transition={{ duration: 0.45, ease: EASE_STAGE }}
                      aria-hidden
                    >
                      +
                    </motion.span>
                  </span>
                  <span className="block font-body text-white/55 mt-2 md:mt-3">{s.desc}</span>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="detail"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE_STAGE }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 md:pb-10 pl-13 md:pl-16 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="lg:hidden aspect-[4/3] overflow-hidden">
                        <img src={s.img} alt={`${s.title} — corporate event service by XYZconcepts, Hyderabad`} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                      </div>
                      <ul className="grid grid-cols-1 gap-2.5 md:col-span-1">
                        {s.bullets.map((b, bi) => (
                          <motion.li
                            key={b}
                            className="flex items-start gap-3 font-body text-white/75 text-sm md:text-base"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 + bi * 0.04, duration: 0.5, ease: EASE_OUT }}
                          >
                            <span className="text-sun text-[0.6rem] mt-2">◆</span>
                            {b}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Process() {
  return (
    <HorizontalScroll
      className="bg-ink-2 text-paper py-[var(--section-y)] lg:py-0 border-t border-white/10"
      header={
        <SectionHeading
          eyebrow="How We Work"
          title={["The XYZ", "Way."]}
          aside={<p>From your first call to the final applause, here's how we make it happen.</p>}
          className="mb-12 lg:mb-10"
          size="md"
        />
      }
    >
      {STEPS.map((step, i) => (
        <article
          key={step.num}
          className="group relative flex-none snap-start w-[82vw] sm:w-[58vw] lg:w-[36vw] min-h-[52vh] lg:min-h-0 lg:h-[52svh] border border-white/10 p-7 md:p-10 flex flex-col justify-between bg-ink-2 hover:bg-ink-3 transition-colors duration-500"
        >
          <div className="flex items-start justify-between">
            <span className="display-xl text-outline leading-none" style={{ fontSize: "clamp(4rem, 9vw, 8rem)" }}>{step.num}</span>
            <span className="eyebrow text-white/30 text-[0.58rem] mt-3">{i + 1} / {STEPS.length}</span>
          </div>
          <div>
            <h3 className="display-md text-paper" style={{ fontSize: "clamp(1.9rem, 3.6vw, 3.2rem)" }}>{step.title}</h3>
            <p className="eyebrow text-sun text-[0.62rem] mt-3">{step.subtitle}</p>
            <p className="font-body text-white/60 leading-relaxed mt-5">{step.desc}</p>
          </div>
          <span className="absolute left-0 bottom-0 h-[3px] w-full bg-sun origin-left scale-x-0 transition-transform duration-700 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
        </article>
      ))}
    </HorizontalScroll>
  );
}

function Closing() {
  return (
    <section className="relative bg-sun text-ink overflow-hidden">
      <div className="container-x section-y">
        <RevealLines
          as="h2"
          text={["At XYZconcepts,", "every step is intentional.", "Every event, unforgettable."]}
          className="display-lg text-ink max-w-[18ch]"
          lineClass={(_, i) => (i === 2 ? "text-outline text-outline-ink" : undefined)}
        />
        <FadeUp delay={0.4} className="mt-12">
          <Button href="/contact" variant="ink" size="lg">Let's Start</Button>
        </FadeUp>
      </div>
    </section>
  );
}

export default function CorporateEvents() {
  return (
    <div className="bg-ink">
      <PageHero
        image={heroImg}
        alt="Corporate conference staged by XYZconcepts in Hyderabad"
        eyebrow="Beyond The Brief."
        title={["Turning your vision", "into seamless", "experiences."]}
        accentLine={2}
        cta={{ href: "/contact", label: "Plan Your Event" }}
      />

      <section className="container-x section-y">
        <SectionHeading
          eyebrow="Our Services"
          title={["What we", "deliver."]}
          aside={<p>Six disciplines, one on-ground team that takes full ownership. Hover to preview, tap to see what each includes.</p>}
          className="mb-16 md:mb-24"
        />
        <ServiceIndex />
      </section>

      <Process />
      <Closing />
    </div>
  );
}
