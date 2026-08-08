import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import socialHeroBg from "@assets/image_1777389825856.png?w=1400&format=webp&quality=85";
import weddingImg from "@assets/image_1777390241396.png?w=800&format=webp&quality=82";
import birthdayImg from "@assets/image_1777390421362.png?w=800&format=webp&quality=82";
import milestoneImg from "@assets/image_1777391108226.png?w=800&format=webp&quality=82";
import momentsOfLoveImg from "@assets/image_1777391572230.png?w=800&format=webp&quality=82";
import socialGatheringsImg from "@assets/image_1777391787231.png?w=800&format=webp&quality=82";
import culturalImg from "@assets/image_1777391963107.png?w=800&format=webp&quality=82";
import marquee1 from "@assets/image_1777392744826.png?w=420&format=webp&quality=75";
import marquee2 from "@assets/image_1777392758958.png?w=420&format=webp&quality=75";
import marquee3 from "@assets/image_1777392785468.png?w=420&format=webp&quality=75";
import marquee4 from "@assets/image_1777392802663.png?w=420&format=webp&quality=75";
import marquee5 from "@assets/image_1777393037099.png?w=420&format=webp&quality=75";
import marquee6 from "@assets/image_1777393050730.png?w=420&format=webp&quality=75";
import marquee7 from "@assets/image_1777393072749.png?w=420&format=webp&quality=75";
import marquee8 from "@assets/image_1777393084831.png?w=420&format=webp&quality=75";
import marquee9 from "@assets/image_1777393093328.png?w=420&format=webp&quality=75";
import marquee10 from "@assets/image_1777393102884.png?w=420&format=webp&quality=75";
import marquee11 from "@assets/image_1777393111080.png?w=420&format=webp&quality=75";
import marquee12 from "@assets/image_1777393134517.png?w=420&format=webp&quality=75";
import marquee13 from "@assets/image_1777393147118.png?w=420&format=webp&quality=75";

const HERO_IMG = socialHeroBg;

const categories = [
  {
    title: "Weddings & Functions", desc: "Engagement Ceremony | Haldi | Mehendi | Sangeet | Wedding Ceremony | Reception",
    img: weddingImg,
    size: "tall",
  },
  {
    title: "Birthday Celebrations", desc: "Kids Birthdays | Adult Birthdays | Milestone Birthdays | Surprise Parties",
    img: birthdayImg,
    size: "short",
  },
  {
    title: "Moments of Love", desc: "Proposal Events | Anniversary | Vow Renewals | Family Reunions",
    img: momentsOfLoveImg,
    size: "short",
  },
  {
    title: "Social Gatherings", desc: "House Warming | Farewell Parties | Festive Celebrations | Get Togethers",
    img: socialGatheringsImg,
    size: "tall",
  },
  {
    title: "Milestone Moments", desc: "Baby Shower | Naamkaran | First Birthday | Cradle Ceremony | Retirement",
    img: milestoneImg,
    size: "short",
  },
  {
    title: "Cultural & Religious", desc: "Griha Pravesh | Puja Ceremonies | Thread Ceremony | Naming Ceremonies",
    img: culturalImg,
    size: "short",
  },
];

export default function SocialEvents() {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 700], [0, 180]);
  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.1 });

  return (
    <div className="overflow-x-hidden bg-white">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-end overflow-hidden pb-28">
        <motion.div className="absolute inset-0 w-full h-[118%] -top-[9%]" style={{ y: parallaxY }}>
          <img src={HERO_IMG} alt="Indian wedding and social celebration designed by XYZconcepts, Hyderabad" className="w-full h-full object-cover" fetchPriority="high" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />
        </motion.div>
        <div className="relative z-10 text-center px-6 lg:px-10 max-w-5xl mx-auto pt-32">
          <motion.p
            className="text-[#FFC107] text-xs tracking-[0.45em] uppercase mb-10"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Every Occasion. Every Story. Every Emotion.
          </motion.p>
          {["CELEBRATIONS", "THAT FEEL LIKE", "MAGIC."].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h1
                className="text-white block"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.5rem, 12vw, 12rem)", lineHeight: 0.92 }}
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.18 + i * 0.15, ease: [0.76, 0, 0.24, 1] }}
              >
                {line}
              </motion.h1>
            </div>
          ))}
          <motion.p
            className="text-white/60 text-lg italic mt-10 mb-12 max-w-lg mx-auto leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
          >
            Weddings. Birthdays. Anniversaries. Baby Showers. Every occasion treated like it's the only one.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }}>
            <Link href="/contact">
              <span className="inline-block bg-[#FFC107] text-black px-12 py-4 text-sm tracking-[0.2em] uppercase font-bold cursor-pointer hover:bg-yellow-400 transition-colors duration-200" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Tell Us Your Story →
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section ref={cardsRef} className="py-32 px-6 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto mb-20">
          <p className="text-[#FFC107] text-xs tracking-[0.4em] uppercase mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>We Celebrate</p>
          <h2 className="text-[#111] text-6xl md:text-8xl leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Every Kind<br />of Joy</h2>
        </div>
        {/* 2×3 grid — 16:9 cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              className="relative aspect-video overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              animate={cardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <img
                src={cat.img}
                alt={`${cat.title} — social event planning by XYZconcepts, Hyderabad`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-7 z-10">
                <h3 className="text-white text-3xl" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}>{cat.title}</h3>
                <p className="text-white/65 text-sm mt-2 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{cat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* The XYZ Way */}
      <section className="py-36 px-6 lg:px-10 bg-[#FFC107]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <p className="text-black/40 text-xs tracking-[0.4em] uppercase mb-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>How We Work</p>
            <h2 className="text-black leading-none mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.5rem, 7vw, 7rem)" }}>The XYZ Way</h2>
            <p className="text-black/60 text-base italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>Where every celebration becomes a story worth telling.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            {[
              { num: "01", title: "Dream It", desc: "Share your vision with us, no detail is too big or too small. This is where it all begins." },
              { num: "02", title: "Design It", desc: "We turn your dream into a concrete, beautiful, detailed plan. Every element considered." },
              { num: "03", title: "Build It", desc: "Vendors, logistics, timelines: we coordinate every moving piece with precision." },
              { num: "04", title: "Live It", desc: "Your only job on the day is to be present. Leave everything else to us." },
              { num: "05", title: "Remember It", desc: "We make sure every moment is captured, documented and felt long after it's over." },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center mb-6">
                  <span className="text-[#FFC107] text-sm font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{step.num}</span>
                </div>
                <h3 className="text-black text-2xl mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}>{step.title}</h3>
                <p className="text-black/60 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scrolling Photo Marquee */}
      <section className="py-16 bg-white overflow-hidden">
        <style>{`
          @keyframes marquee-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-track { animation: marquee-scroll 60s linear infinite; }
          .marquee-track:hover { animation-play-state: paused; }
        `}</style>
        <div className="overflow-hidden">
          <div className="marquee-track flex gap-4 w-max">
            {[socialHeroBg, weddingImg, marquee1, birthdayImg, marquee2, momentsOfLoveImg, marquee3, socialGatheringsImg, marquee4, milestoneImg, culturalImg,
              marquee5, marquee6, marquee7, marquee8, marquee9, marquee10, marquee11, marquee12, marquee13,
              socialHeroBg, weddingImg, marquee1, birthdayImg, marquee2, momentsOfLoveImg, marquee3, socialGatheringsImg, marquee4, milestoneImg, culturalImg,
              marquee5, marquee6, marquee7, marquee8, marquee9, marquee10, marquee11, marquee12, marquee13].map((img, i) => (
              <div key={i} className="flex-none w-96 h-64 overflow-hidden rounded-sm">
                <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-36 px-6 lg:px-10 text-center bg-[#111]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-white mb-10" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 8vw, 8rem)", lineHeight: 0.95 }}>
            We Own the Details. You Enjoy the Moment.
          </h2>
          <Link href="/contact">
            <span className="inline-block bg-[#FFC107] text-black px-14 py-5 text-sm tracking-[0.2em] uppercase font-bold cursor-pointer hover:bg-yellow-400 transition-colors duration-200" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Tell Us Your Story →
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
