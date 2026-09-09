import { useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

/* Ambient — mounts decorative animation layers only while they're close to
   the viewport (plus a margin), and unmounts them far off-screen. Framer
   Motion's infinite loops keep running and burning frames when they're not
   visible, so this pauses the work the browser never shows. Decorative only. */
export function Ambient({
  children,
  rootMargin = "700px 0px",
  className,
}: {
  children: ReactNode;
  rootMargin?: string;
  className?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: rootMargin });

  return (
    <div
      ref={ref}
      className={`pointer-events-none ${className ?? ""}`}
      aria-hidden="true"
    >
      {inView || reduce ? children : null}
    </div>
  );
}