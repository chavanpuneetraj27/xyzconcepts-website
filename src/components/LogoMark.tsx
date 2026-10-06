type LogoMarkProps = {
  /** The PNG has a white wordmark; the site is dark-first so that is the default. */
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
};

// The source PNG carries generous transparent padding, so the rendered
// heights are larger than the visible mark. Negative margins at call sites
// pull the visible mark back onto the grid.
const heights: Record<string, string> = {
  sm: "h-10",
  md: "h-[64px] md:h-[72px]",
  lg: "h-20",
};

export default function LogoMark({ variant = "light", size = "md", className = "" }: LogoMarkProps) {
  return (
    <img
      src={variant === "light" ? "/logo-white.png" : "/logo-black.png"}
      alt="XYZconcepts"
      className={`${heights[size]} w-auto select-none ${className}`}
      draggable={false}
    />
  );
}
