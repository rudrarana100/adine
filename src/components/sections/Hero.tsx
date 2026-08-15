import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { fadeUp, staggerContainer } from "@/lib/motion";
import Magnetic from "@/components/Magnetic";

export default function Hero() {
  const reduce = useReducedMotion();
  const v = (variants: Variants): Variants => (reduce ? {} : variants);

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="shell pt-[88px] pb-[72px] lg:pt-[120px] lg:pb-[96px]">
        <motion.div
          variants={v(staggerContainer)}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-[820px] text-center"
        >
          <motion.p variants={v(fadeUp)} className="eyebrow !text-ember">
            Outbound sales, in one place
          </motion.p>

          <motion.h1
            variants={v(fadeUp)}
            className="mt-6 text-[clamp(40px,6vw,76px)] leading-[0.98] tracking-[-0.03em] text-graphite"
          >
            SalesTracker
            <span className="mt-2 block text-slate">Cold calling, run like a pipeline.</span>
          </motion.h1>

          <motion.p
            variants={v(fadeUp)}
            className="mx-auto mt-7 max-w-[560px] text-[18px] leading-[1.6] text-steel"
          >
            The outbound platform built for high-velocity teams and SDRs. Scrape leads, dial them in
            sequence, follow up on WhatsApp, and book Google Meets — without the busywork.
          </motion.p>

          <motion.div
            variants={v(fadeUp)}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Magnetic>
              <a
                href="https://salestrackercrm.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-solid !px-8 !py-3.5"
              >
                Open the app
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a href="#cta" className="btn-ghost !px-8 !py-3.5">
                Book a demo
              </a>
            </Magnetic>
          </motion.div>

          <motion.p variants={v(fadeUp)} className="mt-8 text-[13px] text-slate">
            Trusted by outbound teams closing 500+ calls a week
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
