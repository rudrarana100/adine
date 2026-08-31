import { motion } from "framer-motion";
import { fadeUp, staggerContainer, useVariants } from "@/lib/motion";
import { ArrowRight } from "@phosphor-icons/react";

const NEXT_STEPS = ["Sign up free", "Connect Google", "Import your first list"];

export default function FinalCTAAdine() {
  const v = useVariants();

  return (
    <section className="bg-canvas py-[96px]">
      <div className="shell">
        <motion.div
          variants={v(staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative overflow-hidden rounded-[40px] bg-violet px-8 py-[80px] text-center md:px-16"
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -top-20 -right-20 h-[300px] w-[300px] rounded-full bg-white/[0.06] blur-[80px]" />
            <div className="absolute -bottom-16 -left-16 h-[250px] w-[250px] rounded-full bg-cotton-candy/[0.12] blur-[80px]" />
          </div>

          <motion.span
            variants={v(fadeUp)}
            className="relative z-10 mb-6 inline-block rounded-full bg-white/15 px-5 py-2 text-[13px] font-medium text-white/80"
          >
            Start free — no credit card
          </motion.span>

          <motion.h2
            variants={v(fadeUp)}
            className="relative z-10 mx-auto max-w-[560px] text-[clamp(30px,4vw,48px)] font-light leading-[1.15] tracking-[-0.02em] text-white"
          >
            Start your first call session today
          </motion.h2>

          <motion.p
            variants={v(fadeUp)}
            className="relative z-10 mx-auto mt-5 max-w-[480px] text-[17px] font-light leading-[1.6] text-white/70"
          >
            Scrape a list, connect your Google account, and dial your first lead within minutes —
            not setup spreadsheets.
          </motion.p>

          <motion.div
            variants={v(fadeUp)}
            className="relative z-10 mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href="https://adine-crm.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-[15px] font-semibold text-violet shadow-elevated transition-transform duration-200 hover:scale-[1.03]"
            >
              Open the app
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </motion.div>

          {/* What happens next */}
          <motion.div
            variants={v(fadeUp)}
            className="relative z-10 mx-auto mt-8 flex max-w-[520px] flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3"
          >
            {NEXT_STEPS.map((step, i) => (
              <div key={step} className="flex items-center gap-2 sm:gap-3">
                <span className="text-[13px] font-light text-white/60">{step}</span>
                {i < NEXT_STEPS.length - 1 && (
                  <span className="text-white/40" aria-hidden="true">
                    →
                  </span>
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
