import { cn } from "@/lib/utils/cn";

const tones = {
  default: "bg-muted text-foreground",
  breaking: "bg-breaking text-white",
  accent: "bg-accent text-accent-foreground",
  primary: "bg-primary text-primary-foreground",
} as const;

export type BadgeTone = keyof typeof tones;

export function Badge({
  className,
  tone = "default",
  children,
}: {
  className?: string;
  tone?: BadgeTone;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold uppercase tracking-wide",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
