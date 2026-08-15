import { useRef, type ReactNode } from "react";
import { motion, useSpring, useMotionValue, useReducedMotion } from "framer-motion";

/**
 * Magnetic wrapper: pulls a child element gently toward the cursor within a
 * ~24px radius and springs back on leave. Disabled for reduced-motion users.
 */
export default function Magnetic({
  children,
  strength = 0.35,
  radius = 28,
}: {
  children: ReactNode;
  strength?: number;
  radius?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 200, damping: 16, mass: 0.5 });
  const y = useSpring(my, { stiffness: 200, damping: 16, mass: 0.5 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const dist = Math.hypot(dx, dy);
    if (dist > radius) {
      mx.set(0);
      my.set(0);
      return;
    }
    mx.set(dx * strength);
    my.set(dy * strength);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...(reduce ? {} : { style: { x, y } })}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
