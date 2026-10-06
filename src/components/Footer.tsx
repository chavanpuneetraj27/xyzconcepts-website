import { Link, useLocation } from "wouter";
import LogoMark from "@/components/LogoMark";
import Marquee from "@/components/motion/Marquee";
import { RevealLines, FadeUp } from "@/components/motion/Reveal";
import Button from "@/components/Button";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/corporate-events", label: "Corporate Events" },
  { href: "/social-events", label: "Social Events" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const [location] = useLocation();
  const isSocial = location === "/social-events";
  const instagram = isSocial
    ? { handle: "@xyzconcepts.social", url: "https://instagram.com/xyzconcepts.social" }
    : { handle: "@xyz.concepts", url: "https://instagram.com/xyz.concepts" };

  return (
    <footer className="relative bg-ink text-paper overflow-hidden">
      {/* Closing call */}
      <div className="container-x pt-[var(--section-y)] pb-16 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow text-sun mb-6">Next Step</p>
            <RevealLines
              as="p"
              text={"Your search\nends here."}
              className="display-xl text-paper"
              lineClass={(_, i) => (i === 1 ? "text-outline" : undefined)}
            />
          </div>
          <FadeUp className="lg:col-span-4 lg:justify-self-end" delay={0.3}>
            <Button href="/contact" variant="sun" size="lg">Start Planning</Button>
          </FadeUp>
        </div>
      </div>

      {/* Kinetic brand strip */}
      <Marquee baseVelocity={0.9} className="py-6 border-b border-white/10">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="display-md text-outline mx-6" style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}>
            XYZCONCEPTS <span className="text-sun text-[0.5em] align-middle mx-3">◆</span>
          </span>
        ))}
      </Marquee>

      {/* Columns */}
      <div className="container-x py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <div className="-ml-3 mb-6">
            <LogoMark size="lg" />
          </div>
          <p className="font-body text-white/55 max-w-sm leading-relaxed">
            Your search ends <strong className="text-white/90">with us</strong>, literally!
          </p>
          <p className="eyebrow text-white/30 text-[0.6rem] mt-6">Hyderabad, India</p>
        </div>

        <div className="md:col-span-3">
          <h4 className="eyebrow text-sun mb-7">Quick Links</h4>
          <ul className="space-y-3">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="group inline-flex items-center gap-2 font-body text-white/55 hover:text-paper transition-colors">
                  <span className="w-0 h-px bg-sun transition-all duration-500 group-hover:w-5" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="eyebrow text-sun mb-7">Connect</h4>
          <ul className="space-y-3 font-body text-white/55">
            <li><a href={instagram.url} target="_blank" rel="noopener noreferrer" className="hover:text-paper transition-colors">Instagram · {instagram.handle}</a></li>
            <li><a href="https://wa.me/919063377915" target="_blank" rel="noopener noreferrer" className="hover:text-paper transition-colors">Call &amp; WhatsApp · +91 90633 77915</a></li>
            <li><a href="https://wa.me/917416377915" target="_blank" rel="noopener noreferrer" className="hover:text-paper transition-colors">Call &amp; WhatsApp · +91 74163 77915</a></li>
            <li><a href="mailto:connect@xyzconcepts.com" className="hover:text-paper transition-colors">connect@xyzconcepts.com</a></li>
          </ul>
        </div>
      </div>

      <div className="container-x pb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-white/25 eyebrow text-[0.58rem]">
        <p>© 2026 XYZconcepts. All rights reserved.</p>
        <p>Hyderabad · Events · Experiences · Excellence</p>
      </div>
    </footer>
  );
}
