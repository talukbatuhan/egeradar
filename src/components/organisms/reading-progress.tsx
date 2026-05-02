"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      const progress = height > 0 ? scrollTop / height : 0;
      setP(Math.min(1, Math.max(0, progress)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 top-0 z-[55] h-[3px] bg-muted"
      aria-hidden
    >
      <div
        className="h-full origin-left bg-accent transition-[transform] duration-150 ease-out motion-reduce:transition-none"
        style={{ transform: `scaleX(${p})` }}
      />
    </div>
  );
}
