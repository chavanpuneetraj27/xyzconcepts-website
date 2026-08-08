import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";

import shreyaImg from "@assets/WhatsApp_Image_2026-04-28_at_22.00.28_1777396607970.jpeg?w=600&format=webp&quality=85";
import vaishaliImg from "@assets/WhatsApp_Image_2026-04-28_at_22.00.29_1777396645919.jpeg?w=600&format=webp&quality=85";
import aboutHeroImg from "@assets/DSC_0891.JPG_1777461996111.jpeg?w=1400&format=webp&quality=90";

const HERO_IMG = aboutHeroImg;
const FOUNDER_1_IMG = shreyaImg;
const FOUNDER_2_IMG = vaishaliImg;


const beliefs = [
  { num: "01", text: "EVERY DETAIL. EVERY MOMENT. EVERY GUEST. CONSIDERED." },
  { num: "02", text: "SEAMLESS EXPERIENCES DON'T JUST HAPPEN. THEY'RE PLANNED." },
  { num: "03", text: "SIZE OF EVENT CHANGES. OUR STANDARDS DON'T." },
  { num: "04", text: "EVERY PROBLEM HAS A SOLUTION BEFORE IT BECOMES ONE." },
  { num: "05", text: "CLIENT SATISFACTION IS THE ONLY STANDING OVATION WE NEED." },
];


function BeliefsSection() {
  return (
    <section className="py-32 px-6 lg:px-10 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="mb-20">
          <p className="text-[#FFC107] text-xs tracking-[0.4em] uppercase mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>What We Stand For</p>
          <h2 className="text-[#111] text-6xl md:text-8xl leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Five Things<br />We Believe</h2>
        </div>
        <div className="space-y-0">
          {beliefs.map((b, i) => (
            <motion.div
              key={i}
              className="border-t border-[#111]/8 py-8 flex items-start gap-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <span className="text-[#FFC107] text-sm flex-none mt-1.5 font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.1em" }}>{b.num}</span>
              <div className="w-[2px] self-stretch bg-[#FFC107]/25 flex-none" />
              <h3 className="text-[#111] flex-1 leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.4rem, 3.8vw, 3rem)", letterSpacing: "0.04em" }}>
                {b.text}
              </h3>
            </motion.div>
          ))}
          <div className="border-t border-[#111]/8" />
        </div>
      </div>
    </section>
  );
}

export default function About() {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 700], [0, 180]);
  const founderRef = useRef(null);
  const founderInView = useInView(founderRef, { once: true, amount: 0.15 });

  return (
    <div className="overflow-x-hidden bg-white">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden pb-24">
        <motion.div className="absolute inset-0 w-full h-[118%] -top-[9%]" style={{ y: parallaxY }}>
          <img src={HERO_IMG} alt="The XYZconcepts team on site at an event in Hyderabad" className="w-full h-full object-cover" style={{ objectPosition: "center 20%" }} fetchPriority="high" decoding="async" />
          {/* bottom fade for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/5" />
          {/* right-side fade so text is readable without covering the people */}
          <div className="absolute inset-0 hidden lg:block bg-gradient-to-l from-black/85 via-black/40 to-transparent" style={{ left: "40%" }} />
        </motion.div>

        {/* Text: full-width on mobile, right 48% on desktop */}
        <div className="relative z-10 w-full px-6 lg:px-10 pt-32 flex flex-col items-center text-center lg:items-end lg:text-right lg:ml-auto lg:w-[52%] lg:self-end">
          <motion.p className="text-[#FFC107] text-xs tracking-[0.4em] uppercase mb-8" style={{ fontFamily: "'DM Sans', sans-serif" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>The Story</motion.p>
          <div className="overflow-hidden w-full">
            <motion.h1
              className="text-white leading-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 5.5vw, 6rem)" }}
              initial={{ y: 110, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.12, ease: [0.76, 0, 0.24, 1] }}
            >
              Built By Two Women Who Refuse To Do Ordinary.
            </motion.h1>
          </div>
          <motion.p className="text-white/55 text-lg italic mt-8 leading-snug" style={{ fontFamily: "'DM Sans', sans-serif" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}>
            Shreya & Vaishali, Co-founders<br />
            <span className="not-italic font-semibold text-white/70">—XYZconcepts</span>
          </motion.p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-32 px-6 lg:px-10 bg-[#FFC107]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-black leading-tight mb-10" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}>
            Not Just Another Beginning
          </h2>
          <div className="w-16 h-[3px] bg-black mb-12" />
          <div className="space-y-7 max-w-3xl">
            <p className="text-black/75 text-lg leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Some callings don't knock; they pull. We began with engineering textbooks in hand, but our minds were always somewhere else, on stages, in crowds, in the chaos that makes an event come alive. From different cities and different colleges, we were unknowingly shaped by the same instinct to run toward every fest, every setup, every moment that needed someone to take charge. We didn't choose events; events chose us.
            </p>
            <p className="text-black/75 text-lg leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              One of us had already stepped into the world of events, while the other was quietly learning, observing, and mastering every detail, on different paths but in the same direction. Then came Mira IMS, the right place at the right time, where those paths finally crossed. And when we started working together, it didn't feel like work; it felt like everything had aligned.
            </p>
            <p className="text-black/75 text-lg leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              What people don't see are the 3AM setups, the last-minute changes, the endless coordination that tests every limit you have, but that's where we were built. Chaos taught us composure, and pressure gave us clarity. Somewhere in between all of it, XYZconcepts was born, not just as a company, but as a reflection of everything we believe events should be, intentional, immersive, and flawlessly executed. For us, it's about turning ideas into experiences and making every event feel personal, seamless, and unforgettable.
            </p>
            <p className="text-black/75 text-lg leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Because for us, this was never just a career, and it never will be. And to the one who believed in us before we believed in ourselves, Captain Anand Dandapani (Founder & CEO, Mira IMS Pvt Ltd)
            </p>
          </div>
          <div className="mt-14 pt-10 border-t-2 border-black/20">
            <p className="text-black text-xl font-bold tracking-wide mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Born backstage. Built for the spotlight.</p>
            <p className="text-black/60 text-sm tracking-[0.2em] uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>XYZconcepts &mdash; Your search ends WITH US, literally!</p>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section ref={founderRef} className="py-32 px-6 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <p className="text-[#FFC107] text-xs tracking-[0.4em] uppercase mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>The Founding Duo</p>
            <h2 className="text-[#111] text-6xl md:text-8xl leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Meet the<br />Makers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: "Shreya", role: "Co-founder & Experience Designer", img: FOUNDER_1_IMG, objPos: "center top" },
              { name: "Vaishali", role: "Co-founder & Creative Director", img: FOUNDER_2_IMG, objPos: "center 20%" },
            ].map((founder, i) => (
              <motion.div
                key={i}
                className="group overflow-hidden bg-[#F8F8F8]"
                initial={{ opacity: 0, y: 40 }}
                animate={founderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.18 }}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={founder.img} alt={`${founder.name}, ${founder.role} at XYZconcepts`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: founder.objPos }} loading="lazy" decoding="async" />
                </div>
                <div className="p-10">
                  <h3 className="text-[#FFC107] text-4xl md:text-5xl mb-2 leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}>{founder.name}</h3>
                  <p className="text-[#111]/40 text-xs tracking-[0.2em] uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>{founder.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <BeliefsSection />

      {/* Hyderabad CTA */}
      <section className="py-32 px-6 lg:px-10 text-center bg-[#111]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-white mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 6vw, 6rem)", lineHeight: 1 }}>
            We don't just get it done. We get it right.
          </h2>
          <p className="text-white/40 text-lg leading-relaxed mb-12" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Every client. Every event. Every time.
          </p>
          <Link href="/contact">
            <span className="inline-block bg-[#FFC107] text-black px-12 py-5 text-sm tracking-[0.2em] uppercase font-bold cursor-pointer hover:bg-yellow-400 transition-colors duration-200" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Work With Us →
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
