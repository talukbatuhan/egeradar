import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

const variants = {
  primary: "bg-accent text-accent-foreground hover:opacity-90 active:opacity-80",
  secondary:
    "bg-primary text-primary-foreground hover:opacity-90 active:opacity-80",
  outline:
    "border-2 border-border bg-background text-foreground hover:bg-muted active:opacity-90",
  ghost: "text-foreground hover:bg-muted active:opacity-90",
  link: "text-primary underline-offset-4 hover:underline p-0 h-auto",
} as const;

type Variant = keyof typeof variants;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-opacity duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
