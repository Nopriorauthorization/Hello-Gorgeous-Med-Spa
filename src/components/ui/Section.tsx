import { cn } from "@/lib/cn";

export function Section({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return <section className={cn("px-6 py-20", className)} {...props} />;
}

