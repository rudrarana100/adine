import { motion, useReducedMotion } from "framer-motion";
import { CheckIcon } from "@/components/icons/FeatureIcons";
import { ArrowRight } from "@phosphor-icons/react";
import { fadeUp, useVariants } from "@/lib/motion";
import SectionHeading from "@/components/sections/SectionHeading";

const APP_URL = "https://salestrackercrm.vercel.app/";

const FREE_FEATURES = [
  "Full feature access — every tool unlocked",
  "CSV lead import",
  "Sequential call sessions with one-keypress logging",
  "WhatsApp + Google Meet automation",
  "Complete pipeline, tasks, and analytics",
  "No credit card required",
];

export default function PricingAdine() {
  const v = useVariants();
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="pricing" className="bg-card py-16 sm:py-[96px]">
      <div className="shell">
        <SectionHeading
          eyebrow="Pricing"
          title="Free for early users."
          subtitle="Adine is free right now, completely. Paid plans come later — early users keep the free side of the deal."
        />

        <motion.div
          variants={v(fadeUp)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          {...(!reduce ? { whileHover: { y: -6, transition: { duration: 0.2 } } } : {})}
          className="relative mx-auto mt-12 max-w-[560px] rounded-[24px] border-2 border-violet bg-white p-5 shadow-elevated sm:mt-16 sm:p-8"
        >
          <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-periwinkle-wash px-3.5 py-1 text-[12px] font-semibold text-violet">
            Early access
          </span>

          <h3 className="text-[18px] font-medium text-ink">Adine</h3>
          <p className="mt-1 text-[14px] font-light text-slate">Everything, while we're early.</p>

          <p className="mt-6 flex items-baseline gap-2">
            <span className="text-[40px] font-light tracking-[-0.02em] text-ink">₹0</span>
            <span className="text-[14px] font-light text-slate">free right now</span>
          </p>

          <ul className="mt-7 flex flex-col gap-3">
            {FREE_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-[15px] font-light text-slate">
                <CheckIcon size={17} className="mt-0.5 shrink-0 text-violet" />
                {f}
              </li>
            ))}
          </ul>

          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill mt-8 w-full"
          >
            Start Free
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
