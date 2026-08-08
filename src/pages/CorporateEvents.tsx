import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import corpHeroBg from "@assets/image_1777382274483.png?w=1400&format=webp&quality=85";
import corporateMeetsImg from "@assets/image_1777393271562.png?w=800&format=webp&quality=82";
import employeeEngagementImg from "@assets/image_1777393311084.png?w=800&format=webp&quality=82";
import inaugurationImg from "@assets/image_1777393388320.png?w=800&format=webp&quality=82";
import corporateGiftingImg from "@assets/image_1777393460619.png?w=800&format=webp&quality=82";
import sportsEventsImg from "@assets/image_1777393612337.png?w=800&format=webp&quality=82";
import brandEventsImg from "@assets/image_1777393650444.png?w=800&format=webp&quality=82";

const HERO_IMG = corpHeroBg;

const services = [
  {
    num: "01", title: "Employee Engagement",
    desc: "Celebrating the people who make it all happen.",
    img: employeeEngagementImg,
    bullets: ["Annual Day", "R&R Events", "Festive Celebrations (Diwali, Christmas, New Year)", "Guest Speaker Sessions", "Team Building Activities", "Offsites"],
  },
  {
    num: "02", title: "Corporate Meets",
    desc: "Where ideas meet impact.",
    img: corporateMeetsImg,
    bullets: ["Conferences", "Townhall", "Summits", "Leadership Visits", "Panel Discussions"],
  },
  {
    num: "03", title: "Inauguration Events",
    desc: "Making your first impression unforgettable.",
    img: inaugurationImg,
    bullets: ["Office Inauguration", "Franchise Launch Events", "Experience Centre Launches"],
  },
  {
    num: "04", title: "Brand Events",
    desc: "Making your brand impossible to ignore.",
    img: brandEventsImg,
    bullets: ["Product Launches", "Brand Activations", "Dealer Meets", "Investor Meets", "Media Events"],
  },
  {
    num: "05", title: "Sports Events",
    desc: "Energy, adrenaline, and team spirit, all in one arena.",
    img: sportsEventsImg,
    bullets: ["Corporate Sports Day", "Marathons & Walkathons", "Cyclathons"],
  },
  {
    num: "06", title: "Corporate Gifting",
    desc: "Because the right gift says more than words ever can.",
    img: corporateGiftingImg,
    bullets: ["Festive Gift Hampers", "Personalised Employee Gifts", "Client & Partner Gifting", "Onboarding & Welcome Kits", "Awards & Trophy Gifting", "Branded Merchandise", "Luxury & Premium Gifting"],
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      className="group overflow-hidden bg-white border border-[#111]/6 hover:shadow-xl transition-shadow duration-500"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: (index % 3) * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div className="relative h-52 overflow-hidden">
        <img src={service.img} alt={`${service.title} — corporate event service by XYZconcepts, Hyderabad`} className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" loading="lazy" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-5 left-5 bg-[#FFC107] text-black px-2 py-0.5" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.1rem", letterSpacing: "0.08em" }}>
          {service.num}
        </div>
      </div>
      <div className="p-9">
        <h3 className="text-[#111] text-3xl mb-4 leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}>{service.title}</h3>
        <p className="text-[#111]/55 text-sm leading-relaxed mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>{service.desc}</p>
        <ul className="space-y-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 max-h-48 md:max-h-0 md:group-hover:max-h-48 overflow-hidden">
          {service.bullets.map((b, i) => (
            <li key={i} className="flex items-center gap-2.5 text-[#111]/50 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <span className="text-[#FFC107] text-[10px]">◆</span>{b}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const steps = [
    { num: "01", title: "Brief & Discovery", subtitle: "We Listen Before We Lead", desc: "We deep dive into your goals, audience, budget and expectations, because great events start with the right questions." },
    { num: "02", title: "Creative Concept", subtitle: "Where Ideas Come Alive", desc: "We craft the event's complete creative direction: theme, design language, mood and experience flow. All uniquely yours." },
    { num: "03", title: "Design & Curation", subtitle: "Every Detail, Deliberately Designed", desc: "From décor to stage design, guest journey to experience touchpoints, nothing is left to chance." },
    { num: "04", title: "Execution", subtitle: "Flawless. Every Single Time.", desc: "Our on-ground team takes full ownership, so you show up as a guest at your own event." },
    { num: "05", title: "Post Event Review", subtitle: "We Don't Just Deliver, We Reflect", desc: "Full documentation, learnings, feedback and relationship continuity, because the next event starts here." },
  ];

  return (
    <section ref={ref} className="py-36 px-6 lg:px-10 bg-[#F8F8F8]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <p className="text-[#FFC107] text-xs tracking-[0.4em] uppercase mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>How We Work</p>
          <h2 className="text-[#111] text-6xl md:text-8xl leading-none mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>The XYZ<br />Way</h2>
          <p className="text-[#111]/55 text-base max-w-xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>From your first call to the final applause, here's how we make it happen.</p>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute top-8 left-0 right-0 h-[1px] bg-[#111]/8">
            <motion.div className="h-full bg-[#FFC107] origin-left" initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 relative">
            {steps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.3 + i * 0.2 }}>
                <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-[#FFC107] relative z-10 mb-8">
                  <span className="text-black text-xl font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{step.num}</span>
                </div>
                <div className="md:hidden flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-full bg-[#FFC107] flex items-center justify-center flex-none">
                    <span className="text-black text-sm font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{step.num}</span>
                  </div>
                </div>
                <h4 className="text-[#111] text-2xl mb-1" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}>{step.title}</h4>
                <p className="text-[#FFC107] text-xs font-semibold mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>{step.subtitle}</p>
                <p className="text-[#111]/50 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CorporateEvents() {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 700], [0, 180]);

  return (
    <div className="overflow-x-hidden bg-white">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-end overflow-hidden pb-28">
        <motion.div className="absolute inset-0 w-full h-[118%] -top-[9%]" style={{ y: parallaxY }}>
          <img src={HERO_IMG} alt="Corporate conference staged by XYZconcepts in Hyderabad" className="w-full h-full object-cover" fetchPriority="high" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />
        </motion.div>
        <div className="relative z-10 text-center px-6 lg:px-10 max-w-5xl mx-auto pt-32">
          <motion.p
            className="text-[#FFC107] text-xs tracking-[0.45em] uppercase mb-10"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Beyond The Brief.
          </motion.p>
          {["TURNING YOUR VISION", "INTO SEAMLESS", "EXPERIENCES."].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h1
                className="text-white block"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem, 9vw, 9rem)", lineHeight: 0.93 }}
                initial={{ y: 110, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.13, ease: [0.76, 0, 0.24, 1] }}
              >
                {line}
              </motion.h1>
            </div>
          ))}
          <motion.div className="mt-14" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}>
            <Link href="/contact">
              <span className="inline-block bg-[#FFC107] text-black px-12 py-4 text-sm tracking-[0.2em] uppercase font-bold cursor-pointer hover:bg-yellow-400 transition-colors duration-200" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Plan Your Event →
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-32 px-6 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto mb-20">
          <p className="text-[#FFC107] text-xs tracking-[0.4em] uppercase mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Our Services</p>
          <h2 className="text-[#111] text-6xl md:text-8xl leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>What We<br />Deliver</h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {services.map((s, i) => <ServiceCard key={i} service={s} index={i} />)}
        </div>
      </section>

      <ProcessSection />

      {/* CTA Strip */}
      <section className="py-36 px-6 lg:px-10 bg-[#111] text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-white mb-10" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 7.5vw, 7rem)", lineHeight: 0.95 }}>
            At XYZconcepts, Every Step Is Intentional. Every Event, Unforgettable.
          </h2>
          <Link href="/contact">
            <span className="inline-block bg-[#FFC107] text-black px-14 py-5 text-sm tracking-[0.2em] uppercase font-bold cursor-pointer hover:bg-yellow-400 transition-colors duration-200" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Let's Start →
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
