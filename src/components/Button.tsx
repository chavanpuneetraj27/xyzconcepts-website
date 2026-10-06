import { Link } from "wouter";
import Magnetic from "@/components/motion/Magnetic";

type Variant = "sun" | "ink" | "paper" | "ghost-light" | "ghost-dark";

const variants: Record<Variant, string> = {
  sun: "bg-sun text-ink before:bg-ink hover:text-paper",
  ink: "bg-ink text-paper before:bg-sun hover:text-ink",
  paper: "bg-paper text-ink before:bg-sun hover:text-ink",
  "ghost-light": "border border-white/30 text-paper before:bg-paper hover:text-ink",
  "ghost-dark": "border border-ink/30 text-ink before:bg-ink hover:text-paper",
};

/**
 * Primary CTA. A colour sweeps up from the bottom on hover, the arrow slides
 * right, and on desktop the whole button is magnetic. Renders a real <a> via
 * wouter's Link so it stays crawlable.
 */
export default function Button({
  href,
  children,
  variant = "sun",
  className = "",
  external = false,
  size = "md",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  size?: "md" | "lg";
}) {
  const pad = size === "lg" ? "px-10 py-5 text-[0.8rem]" : "px-8 py-4 text-[0.72rem]";
  const cls = [
    "group relative inline-flex items-center gap-3 overflow-hidden font-body font-bold uppercase tracking-[0.22em]",
    "transition-colors duration-500 isolate",
    "before:absolute before:inset-0 before:-z-10 before:origin-bottom before:scale-y-0 before:transition-transform before:duration-500 before:[transition-timing-function:cubic-bezier(0.76,0,0.24,1)] hover:before:scale-y-100",
    pad,
    variants[variant],
    className,
  ].join(" ");

  const inner = (
    <>
      <span className="relative">{children}</span>
      <span className="relative inline-flex w-4 h-4 overflow-hidden">
        <span className="absolute inset-0 flex items-center justify-center transition-transform duration-500 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-5">→</span>
        <span className="absolute inset-0 flex items-center justify-center -translate-x-5 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0">→</span>
      </span>
    </>
  );

  return (
    <Magnetic>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {inner}
        </a>
      ) : (
        <Link href={href} className={cls}>
          {inner}
        </Link>
      )}
    </Magnetic>
  );
}
