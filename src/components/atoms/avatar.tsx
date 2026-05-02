import Image from "next/image";
import { cn } from "@/lib/utils/cn";

export function Avatar({
  src,
  alt,
  size = 40,
  className,
}: {
  src?: string | null;
  alt: string;
  size?: number;
  className?: string;
}) {
  const initials = alt
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full bg-muted ring-2 ring-border",
        className
      )}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image src={src} alt={alt} width={size} height={size} className="object-cover" />
      ) : (
        <span
          className="flex h-full w-full items-center justify-center text-xs font-bold text-foreground-muted"
          aria-hidden
        >
          {initials}
        </span>
      )}
    </div>
  );
}
