import { useEffect, useRef } from "react";

export function useMarquee<T extends HTMLElement>(duration = 28) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const { gsap } = await import("gsap");
      if (cancelled) return;
      ctx = gsap.context(() => {
        gsap.to(el, { xPercent: -50, duration, ease: "none", repeat: -1 });
      });
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [duration]);

  return ref;
}
