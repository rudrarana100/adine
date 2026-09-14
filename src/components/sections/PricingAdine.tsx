import { motion, useReducedMotion } from "framer-motion";
import { CheckIcon } from "@/components/icons/FeatureIcons";
import { ArrowRight } from "@phosphor-icons/react";
import { fadeUp, staggerContainer, useVariants } from "@/lib/motion";
import SectionHeading from "@/components/sections/SectionHeading";

const APP_URL = "https://adine-crm.vercel.app/";

/* TODO: replace with the real Pro per-seat price before launch. Do not ship
   an invented figure — a wrong number is worse than an honest gap. */
const PRICE_PLACEHOLDER = "[PRICE]";

const TRIAL_FEATURES = [
  "Full feature access — every tool unlocked",
  "Google Maps lead scraping",
  "WhatsApp + Google Meet automation",
  "No credit card required",
];

const PRO_FEATURES = [
  "Everything in the trial, forever",
  "Unlimited leads",
  "Priority WhatsApp sending limits",
  "The complete pipeline and analytics",
];

export default function PricingAdine() {
  const v = useVariants();
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="pricing" className="bg-card py-[96px]">
      <div className="shell">
        <SectionHeading
          eyebrow="Pricing"
          title="Start free. Pay only when it's paying for itself."
          subtitle="No card required to start. Upgrade when Adine is earning its keep."
        />

        <motion.div
          variants={v(staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mx-auto mt-16 grid max-w-[880px] grid-cols-1 gap-8 md:grid-cols-2"
        >
          {/* Free Trial */}
          <motion.div variants={v(fadeUp)} className="card-surface flex flex-col p-8">
            <h3 className="text-[18px] font-medium text-ink">Free Trial</h3>
            <p className="mt-1 text-[14px] font-light text-slate">
              14 days of full feature access.
            </p>

            <p className="mt-6 flex items-baseline gap-2">
              <span className="text-[40px] font-light tracking-[-0.02em] text-ink">₹0</span>
              <span className="text-[14px] font-light text-slate">for 14 days</span>
            </p>

            <ul className="mt-7 flex flex-col gap-3">
              {TRIAL_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[15px] font-light text-slate">
                  <CheckIcon size={17} className="mt-0.5 shrink-0 text-green-700" />
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

          {/* Pro — suggested path, lifted + violet border */}
          <motion.div
            variants={v(fadeUp)}
            {...(!reduce ? { whileHover: { y: -6, transition: { duration: 0.2 } } } : {})}
            className="relative flex flex-col rounded-[24px] border-2 border-violet bg-white p-8 shadow-elevated"
          >
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-periwinkle-wash px-3.5 py-1 text-[12px] font-semibold text-violet">
              Recommended
            </span>

            <h3 className="text-[18px] font-medium text-ink">Pro</h3>
            <p className="mt-1 text-[14px] font-light text-slate">For a serious call volume.</p>

            <p className="mt-6 flex items-baseline gap-2">
              <span className="text-[40px] font-light tracking-[-0.02em] text-ink">
                ₹{PRICE_PLACEHOLDER}
              </span>
              <span className="text-[14px] font-light text-slate">/ seat / month</span>
            </p>

            <ul className="mt-7 flex flex-col gap-3">
              {PRO_FEATURES.map((f) => (
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
        </motion.div>
      </div>
    </section>
  );
}
