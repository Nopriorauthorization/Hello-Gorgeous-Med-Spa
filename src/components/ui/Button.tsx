import React from "react";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "primaryDark";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-600 text-white shadow-glow hover:bg-brand-700 active:bg-brand-800",
  secondary:
    "border border-ink-200 bg-white text-ink-950 hover:bg-ink-50 active:bg-ink-100",
  primaryDark:
    "bg-brand-500 text-white hover:bg-brand-400 active:bg-brand-600 focus-visible:ring-offset-ink-950",
};

export function Button({
  asChild,
  variant = "primary",
  className,
  children,
  ...props
}: {
  asChild?: boolean;
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = cn(base, variants[variant], className);

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

