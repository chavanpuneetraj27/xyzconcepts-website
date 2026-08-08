type LogoMarkProps = {
  xyzColor?: string;
  size?: "sm" | "md" | "lg";
};

const heights: Record<string, string> = {
  sm: "h-10",
  md: "h-[67px]",
  lg: "h-20",
};

export default function LogoMark({ xyzColor = "text-white", size = "md" }: LogoMarkProps) {
  const isDark = xyzColor.includes("white");

  return (
    <img
      src={isDark ? "/logo-white.png" : "/logo-black.png"}
      alt="XYZconcepts"
      className={`${heights[size]} w-auto select-none cursor-pointer`}
      draggable={false}
    />
  );
}
