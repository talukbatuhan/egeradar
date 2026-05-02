"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/atoms/button";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  if (!mounted) {
    return (
      <span
        className={`inline-block h-9 w-9 rounded-lg bg-muted ${className ?? ""}`}
        aria-hidden
      />
    );
  }

  const next = resolvedTheme === "dark" ? "light" : "dark";

  return (
    <Button
      type="button"
      variant="ghost"
      className={`h-9 w-9 shrink-0 rounded-lg p-0 ${className ?? ""}`}
      onClick={() => setTheme(next)}
      aria-label={
        theme === "dark" || resolvedTheme === "dark"
          ? "Aydınlık temaya geç"
          : "Karanlık temaya geç"
      }
    >
      {resolvedTheme === "dark" ? "☀️" : "🌙"}
    </Button>
  );
}
