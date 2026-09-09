import { motion, useReducedMotion } from "framer-motion";
import type { TargetAndTransition } from "framer-motion";
import type { ReactElement } from "react";
import { FEATURE_ICONS, type FeatureIconName } from "@/components/icons/FeatureIcons";

/* Per-icon hover micro-animations (transform/opacity only, reduced-motion aware) */
const HOVER_ANIM: Partial<Record<FeatureIconName, TargetAndTransition>> = {
  phone: { rotate: [-6, 6, 0], y: [0, -2, 0] }, // ringing
  chat: { scale: [1, 1.18, 1] }, // bubble pop
  check: { scale: [1, 1.15, 1] }, // ticks in
  flame: { scale: [1, 1.18, 1] }, // flicker
  bell: { rotate: [-8, 8, 0] }, // shakes
  map: { y: [0, -3, 0], scale: [1, 1.06, 1] },
  meet: { rotate: [-4, 4, 0], scale: [1, 1.08, 1] },
  kanban: { y: [0, -2, 0] },
  chart: { scale: [1, 1.1, 1] },
  command: { rotate: [0, 8, 0] },
  sheet: { y: [0, -2, 0] },
};

export function AnimatedFeatureIcon({
  name,
  size = 28,
  className,
}: {
  name: FeatureIconName;
  size?: number;
  className?: string;
}): ReactElement {
  const reduce = useReducedMotion() ?? false;
  const Icon = FEATURE_ICONS[name];
  const anim = HOVER_ANIM[name];

  return (
    <motion.span
      className="inline-flex items-center justify-center"
      {...(reduce ? {} : { whileHover: anim })}
      transition={{ duration: 0.45, ease: "easeInOut" }}
    >
      <Icon size={size} className={className} />
    </motion.span>
  );
}
