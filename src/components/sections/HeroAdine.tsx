import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { fadeUp, staggerContainer } from "@/lib/motion";
import Magnetic from "@/components/Magnetic";

export default function HeroAdine() {
  const reduce = useReducedMotion();
  const v = (variants: Variants): Variants => (reduce ? {} : variants);

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="shell pt-[80px] pb-[64px] lg:pt-[100px] lg:pb-[80px]">
        <motion.div
          variants={v(staggerContainer)}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-[800px] text-center"
        >
          <motion.p variants={v(fadeUp)} className="eyebrow !text-text-secondary">
            Outbound sales, in one place
          </motion.p>

          <motion.h1
            variants={v(fadeUp)}
            className="mt-6 text-[clamp(36px,5vw,44px)] leading-[1.15] tracking-[-0.03em] text-text-primary"
          >
            Adine
            <span className="mt-2 block font-caveat text-text-secondary">
              actually pick up the phone
            </span>
          </motion.h1>

          <motion.p
            variants={v(fadeUp)}
            className="mx-auto mt-7 max-w-[520px] text-[16px] leading-[1.5] text-text-secondary"
          >
            The outbound CRM built for high-volume cold calling. Manage sessions, auto-log calls,
            and follow up instantly — without the busywork.
          </motion.p>

          <motion.div
            variants={v(fadeUp)}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Magnetic>
              <a
                href="https://adine-crm.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-solid !px-8 !py-3.5"
              >
                Open the app
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </Magnetic>
            <a href="#cta" className="btn-ghost !px-8 !py-3.5">
              Get started
            </a>
          </motion.div>

          <motion.p variants={v(fadeUp)} className="mt-8 text-[13px] text-text-tertiary">
            Trusted by founders closing 150+ cold calls a week
          </motion.p>
        </motion.div>
      </div>

      {/* Framed Cold Call Session placeholder */}
      <motion.div
        whileHover={{ y: -4 }}
        className="absolute bottom-[24px] left-[50%] -translate-x-[50%]"
      >
        <div className="relative group">
          <div
            className="absolute inset-0 bg-border-subtle rounded-12 flex items-center justify-center"
            style={{ height: "200px" }}
            aria-hidden="true"
          >
            <span className="text-text-tertiary text-sm uppercase">Cold Call Session</span>
          </div>
          <div
            className="absolute -inset-1 bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity 200ms ease-out"
            aria-hidden="true"
          />
        </div>
      </motion.div>
    </section>
  );
}
