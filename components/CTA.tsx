"use client";

import Link from "next/link";

function cx(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

type Variant = "gradient" | "outline" | "white" | "ghost";

const variants: Record<Variant, string> = {
  gradient:
    "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white hover:shadow-2xl hover:shadow-pink-500/25 hover:scale-105",
  outline: "border border-white/20 text-white hover:bg-white/5",
  white:
    "bg-white text-black hover:shadow-2xl hover:shadow-white/25 hover:scale-105",
  ghost: "text-white/70 hover:text-white hover:bg-white/5",
};

export function CTA({
  href,
  children,
  variant = "gradient",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cx(
        "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300",
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}

