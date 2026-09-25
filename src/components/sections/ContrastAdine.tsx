import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer, useVariants } from "@/lib/motion";
import { Ambient } from "@/components/backgrounds/Ambient";

const ROWS: { oldWay: string; adine: string }[] = [
  {
    oldWay: "Leads scattered across a spreadsheet, a notes app, and WhatsApp",
    adine: "Every lead, every note, every message: one screen",
  },
  {
    oldWay: "Manually dialing down a list, losing your place",
    adine: "A queue that hands you one lead at a time",
  },
  {
    oldWay: "Typing the same WhatsApp follow-up by hand, every time",
    adine: "Templated messages that fire themselves",
  },
  {
    oldWay: "Guessing which deals are actually moving",
    adine: "A live pipeline with real stage counts and value",
  },
  {
    oldWay: '"Did I already call this one?"',
    adine: "A full activity log, per lead, always",
  },
];

/* Animated checkmark that draws in with pathLength on first view */
function DrawCheck({ reduce }: { reduce: boolean }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 28 28"
      fill="none"
      className="mt-[3px] shrink-0 text-violet"
      aria-hidden="true"
    >
      <motion.circle
        cx="14"
        cy="14"
        r="10.5"
        stroke="currentColor"
        strokeWidth="1.8"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      <motion.path
        d="M8.5 14.5l3.4 3.4 7-7.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
      />
    </svg>
  );
}

export default function ContrastAdine() {
  const v = useVariants();
  const reduce = useReducedMotion() ?? false;

  return (
    <section className="relative overflow-hidden bg-violet py-16 sm:py-[96px] text-white">
      {/* Soft white glow auras — shared pattern with AnalyticsAdine */}
      <Ambient className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-[10%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(420px circle at 50% 50%, rgba(255,255,255,0.13), transparent 60%)",
          }}
          animate={reduce ? {} : { scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[5%] top-[30%] h-[520px] w-[520px] rounded-full"
          style={{
            background:
              "radial-gradient(520px circle at 50% 50%, rgba(255,255,255,0.09), transparent 60%)",
          }}
          animate={reduce ? {} : { scale: [1, 1.14, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
      </Ambient>

      <div className="shell relative z-10">
        {/* Header — mirrors AnalyticsAdine white-on-violet pattern */}
        <motion.div
          variants={v(staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mb-16 max-w-[640px] text-center"
        >
          <motion.span
            variants={v(fadeUp)}
            className="inline-block rounded-full bg-white/15 px-5 py-2 text-[13px] font-medium text-white/80"
          >
            Comparison
          </motion.span>

          <motion.h2
            variants={v(fadeUp)}
            className="mt-5 text-[clamp(28px,3.5vw,44px)] font-light leading-[1.15] tracking-[-0.02em]"
          >
            Adine vs the old way
          </motion.h2>

          <motion.p
            variants={v(fadeUp)}
            className="mx-auto mt-5 max-w-[480px] text-[17px] font-light leading-[1.6] text-white/75"
          >
            Same leads, same phone. One system instead of five.
          </motion.p>
        </motion.div>

        {/* Two floating comparison cards */}
        <motion.div
          variants={v(staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mx-auto grid max-w-[980px] grid-cols-1 gap-6 lg:grid-cols-2"
        >
          {/* Old Way */}
          <motion.div
            variants={v(fadeUp)}
            className="rounded-[24px] border border-white/15 bg-white p-5 shadow-[0px_5px_55px_rgba(0,0,0,0.35)] sm:p-8"
          >
            <h3 className="mb-6 text-[18px] font-medium text-iron">The Old Way</h3>
            <ul className="flex flex-col gap-4">
              {ROWS.map(({ oldWay }) => (
                <li
                  key={oldWay}
                  className="flex items-start gap-3 text-[15px] font-light leading-[1.55] text-slate"
                >
                  <span
                    className="mt-[3px] shrink-0 h-4 w-4 rounded-full bg-ink/8"
                    aria-hidden="true"
                  />
                  {oldWay}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Adine */}
          <motion.div
            variants={v(fadeUp)}
            {...(!reduce ? { whileHover: { y: -4, transition: { duration: 0.2 } } } : {})}
            className="rounded-[24px] border border-violet/20 bg-mint p-5 shadow-[0px_5px_55px_rgba(0,0,0,0.35)] sm:p-8"
          >
            <h3 className="mb-6 text-[18px] font-medium text-ink">Adine</h3>
            <ul className="flex flex-col gap-4">
              {ROWS.map(({ adine }, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-[15px] font-light leading-[1.55] text-ink"
                >
                  <DrawCheck reduce={reduce} />
                  {adine}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
