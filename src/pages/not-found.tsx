import { Link } from "wouter";

/**
 * The scaffold shipped a developer placeholder here ("Did you forget to add the
 * page to the router?"). That text must never reach a live site, so this is an
 * on-brand 404 that also keeps crawlers moving via links to the real pages.
 */
export default function NotFound() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/corporate-events", label: "Corporate Events" },
    { href: "/social-events", label: "Social Events" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-[100dvh] bg-[#FFC107] flex flex-col items-center justify-center px-6 py-32 text-center">
      <p
        className="text-black/50 text-xs tracking-[0.4em] uppercase mb-6"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Error 404
      </p>
      <h1
        className="text-black"
        style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3.5rem, 14vw, 12rem)", lineHeight: 0.88 }}
      >
        This Page Doesn't Exist.
      </h1>
      <p
        className="text-black/75 text-lg md:text-xl mt-8 mb-12 italic max-w-xl"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        But your event still can. Let's get you back on track.
      </p>

      <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-12">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            <span
              className="text-black/60 text-xs tracking-[0.2em] uppercase cursor-pointer hover:text-black transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {link.label}
            </span>
          </Link>
        ))}
      </nav>

      <Link href="/contact">
        <span
          className="inline-block bg-black text-white px-12 py-5 text-sm tracking-[0.25em] uppercase font-bold cursor-pointer hover:bg-[#111]/85 transition-colors duration-200"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Plan Your Event →
        </span>
      </Link>
    </div>
  );
}
