import React from "react";

import { cn } from "@/lib/cn";

type ButtonVariant = "gradient" | "outline" | "ghost" | "white";
type ButtonShape = "pill" | "rounded";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

const shapes: Record<ButtonShape, string> = {
  pill: "rounded-full",
  rounded: "rounded-lg",
};

const variants: Record<ButtonVariant, string> = {
  gradient:
    "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white hover:shadow-2xl hover:shadow-pink-500/25 hover:scale-105",
  outline:
    "border border-white/20 text-white hover:bg-white/5",
  ghost:
    "text-white/70 hover:text-white hover:bg-white/5",
  white:
    "bg-white text-black hover:shadow-2xl hover:shadow-white/25 hover:scale-105",
};

export function Button({
  asChild,
  variant = "gradient",
  shape = "pill",
  className,
  children,
  ...props
}: {
  asChild?: boolean;
  variant?: ButtonVariant;
  shape?: ButtonShape;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const size =
    shape === "pill"
      ? "px-8 py-4 text-lg"
      : "px-4 py-2 text-sm font-semibold";
  const classes = cn(base, shapes[shape], size, variants[variant], className);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(children.props as any),
      className: cn(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (children.props as any)?.className,
        classes,
      ),
    });
  }

  // eslint-disable-next-line react/button-has-type
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

