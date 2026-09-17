import { motion } from "framer-motion";
import { fadeUp, staggerContainer, useVariants } from "@/lib/motion";
import type { ReactNode } from "react";

/* Consistent animated section header — eyebrow + title + subtitle rise in on scroll. */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  viewportAmount = 0.3,
  maxWidthClass = "max-w-[720px]",
  titleClassName,
  subtitleClassName,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  viewportAmount?: number;
  maxWidthClass?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}) {
  const v = useVariants();
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <motion.div
      variants={v(staggerContainer)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount }}
      className={`${maxWidthClass} ${alignment}`}
    >
      <motion.span variants={v(fadeUp)} className="section-eyebrow block">
        {eyebrow}
      </motion.span>
      <motion.h2
        variants={v(fadeUp)}
        className={
          titleClassName ??
          "mt-4 text-[clamp(28px,3.5vw,44px)] font-light leading-[1.15] tracking-[-0.02em] text-ink"
        }
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={v(fadeUp)}
          className={subtitleClassName ?? "mt-4 text-[17px] font-light leading-[1.6] text-slate"}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
