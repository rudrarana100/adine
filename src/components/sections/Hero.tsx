import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/motion";

function PipelineCard() {
  const bars = [92, 74, 58, 44, 30];
  return (
    <div className="w-full rounded-data bg-canvas-white p-6 ring-1 ring-mist">
      <p className="font-display text-[16px] tracking-[-0.02em]">Q3 Pipeline</p>
      <div className="mt-4 space-y-2.5">
        {bars.map((w, i) => (
          <div key={w} className="h-2.5 w-full rounded-sm bg-fog">
            <div
              className={`h-full rounded-sm ${i === 1 ? "bg-ember" : "bg-graphite/80"}`}
              style={{ width: `${w}%` }}
            />
          </div>
        ))}
      </div>
      <p className="mt-4 text-[13px] text-steel">Total value: $2.4M</p>
    </div>
  );
}

function LeadScoreCard() {
  return (
    <div className="w-[210px] rounded-card bg-ash p-5">
      <p className="text-[13px] font-medium text-slate">AI Lead Score</p>
      <p className="font-display mt-1 text-[40px] leading-none tracking-[-0.02em]">87</p>
      <span className="mt-2 inline-block rounded-2xl bg-ember px-2 py-[3px] text-[11px] text-canvas-white">
        HIGH INTENT
      </span>
      <svg viewBox="0 0 120 32" className="mt-3 h-8 w-full" aria-hidden="true">
        <polyline
          points="4,26 40,16 78,20 116,5"
          fill="none"
          stroke="var(--color-ember)"
          strokeWidth="2"
        />
        {[
          [4, 26],
          [40, 16],
          [78, 20],
          [116, 5],
        ].map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="2.5" fill="var(--color-ember)" />
        ))}
      </svg>
    </div>
  );
}

function ForecastCard() {
  return (
    <div className="w-[200px] rounded-data bg-canvas-white p-5 ring-1 ring-mist">
      <p className="text-[13px] font-medium text-slate">Forecast</p>
      <p className="font-display mt-1 text-[32px] leading-none tracking-[-0.02em]">$847K</p>
      <p className="mt-1 text-[13px] text-brass">+12.4% vs last quarter</p>
      <svg viewBox="0 0 120 28" className="mt-3 h-7 w-full" aria-hidden="true">
        <polyline
          points="2,24 24,18 46,20 68,11 90,13 118,3"
          fill="none"
          stroke="var(--color-brass)"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const v = (variants: Variants): Variants => (reduce ? {} : variants);

  return (
    <section id="top" className="shell pt-[60px] pb-[80px] lg:pt-[90px]">
      <motion.div
        variants={v(staggerContainer)}
        initial="hidden"
        animate="visible"
        className="grid items-center gap-14 lg:grid-cols-[55%_45%]"
      >
        <div>
          <motion.span
            variants={v(fadeUp)}
            className="inline-flex items-center gap-2 rounded-2xl bg-ivory px-3 py-1.5 text-[13px] text-brass"
          >
            <span className="ember-dot" aria-hidden="true" />
            Launching publicly — Join 10,000+ B2B teams
          </motion.span>

          <motion.h1
            variants={v(fadeUp)}
            itemProp="speakable"
            className="mt-5 text-[clamp(36px,5.5vw,66px)] leading-[0.94] tracking-[-0.02em] text-graphite"
          >
            The CRM that <span className="ember-underline">closes deals.</span>
            <br />
            Not just tracks them.
          </motion.h1>

          <motion.p variants={v(fadeUp)} className="mt-6 max-w-[540px] text-[18px] leading-[1.5] text-steel">
            SalesTracker CRM gives revenue teams real-time pipeline visibility, AI lead scoring, and
            revenue forecasting — all in one platform. No implementation consultants. No 6-week
            setup.
          </motion.p>

          <motion.div variants={v(fadeUp)} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#demo" className="btn-solid w-full sm:w-auto">
              Start free — no card needed
            </a>
            <a href="#tour" className="btn-ghost w-full sm:w-auto">
              Watch 3-min demo →
            </a>
          </motion.div>

          <motion.ul
            variants={v(fadeUp)}
            className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-slate"
          >
            {["Free forever tier", "SOC 2 certified", "4-hr onboarding"].map((t) => (
              <li key={t}>✓ {t}</li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          variants={v(staggerContainer)}
          className="flex flex-col items-center gap-4 lg:relative lg:block lg:h-[420px]"
        >
          <motion.div variants={v(scaleIn)} className="w-full max-w-[360px] lg:absolute lg:top-6 lg:left-0 lg:w-[330px]">
            <PipelineCard />
          </motion.div>
          <motion.div
            variants={v(scaleIn)}
            whileHover={reduce ? {} : { y: -6, transition: { duration: 0.25 } }}
            className="lg:absolute lg:top-0 lg:right-0"
          >
            <LeadScoreCard />
          </motion.div>
          <motion.div variants={v(scaleIn)} className="lg:absolute lg:right-6 lg:bottom-0">
            <ForecastCard />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
