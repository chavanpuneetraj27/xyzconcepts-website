import { Link, useLocation } from "wouter";
import LogoMark from "@/components/LogoMark";

export default function Footer() {
  const [location] = useLocation();
  const isSocialEvents = location === "/social-events";

  const instagram = isSocialEvents
    ? { handle: "@xyzconcepts.social", url: "https://instagram.com/xyzconcepts.social" }
    : { handle: "@xyz.concepts", url: "https://instagram.com/xyz.concepts" };

  return (
    <footer className="relative bg-[#111] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="mb-5">
              <LogoMark xyzColor="text-white" size="lg" />
            </div>
            <p className="text-white/50 text-sm leading-relaxed mt-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Your search ends <strong className="text-white/80">with us</strong>, literally!
            </p>
            <p className="text-white/30 text-xs mt-3 tracking-[0.15em] uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Hyderabad, India
            </p>
          </div>

          <div>
            <h4 className="text-[#FFC107] text-xs tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/corporate-events", label: "Corporate Events" },
                { href: "/social-events", label: "Social Events" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-white/40 text-sm hover:text-[#FFC107] transition-colors cursor-pointer" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#FFC107] text-xs tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>Connect</h4>
            <ul className="space-y-3">
              <li>
                <a href={instagram.url} target="_blank" rel="noopener noreferrer" className="text-white/40 text-sm hover:text-[#FFC107] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Instagram: {instagram.handle}
                </a>
              </li>
              <li>
                <a href="https://wa.me/919063377915" target="_blank" rel="noopener noreferrer" className="text-white/40 text-sm hover:text-[#FFC107] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Call & WhatsApp: +91 90633 77915
                </a>
              </li>
              <li>
                <a href="https://wa.me/917416377915" target="_blank" rel="noopener noreferrer" className="text-white/40 text-sm hover:text-[#FFC107] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Call & WhatsApp: +91 74163 77915
                </a>
              </li>
              <li>
                <a href="mailto:connect@xyzconcepts.com" className="text-white/40 text-sm hover:text-[#FFC107] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  connect@xyzconcepts.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs tracking-[0.2em] uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            © 2026 XYZconcepts. All Rights Reserved.
          </p>
          <p className="text-white/20 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Hyderabad, India · Events · Experiences · Excellence
          </p>
        </div>
      </div>
    </footer>
  );
}
