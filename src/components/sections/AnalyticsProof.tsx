import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import { scaleIn, staggerContainer, useVariants } from "@/lib/motion";

type Stat = {
  target: number;
  format: (v: number) => string;
  label: string;
  sub: string;
};

const STATS_DATA: Stat[] = [
  {
    target: 4.7,
    format: (v) => `${v.toFixed(1)}×`,
    label: "More calls per rep/day",
    sub: "sequential dialing vs. manual",
  },
  {
    target: 38,
    format: (v) => `${Math.round(v)}%`,
    label: "More meetings booked",
    sub: "within the first 30 days",
  },
  {
    target: 62,
    format: (v) => `${Math.round(v)}%`,
    label: "Less manual data entry",
    sub: "every call auto-logs",
  },
  {
    target: 96,
    format: (v) => `${Math.round(v)}%`,
    label: "Valid phone numbers",
    sub: "from Google Maps scraping",
  },
  {
    target: 2.5,
    format: (v) => `${v.toFixed(1)}h`,
    label: "Saved per rep per day",
    sub: "on follow-ups and logging",
  },
  {
    target: 99.9,
    format: (v) => `${v.toFixed(1)}%`,
    label: "Uptime SLA",
    sub: "with <200ms API response time",
  },
];

function StatCard({ stat }: { stat: Stat }) {
  const ref = useCountUp(stat.target, stat.format);
  return (
    <article className="rounded-card border-b border-mist bg-canvas-white px-6 py-8">
      <span
        ref={ref}
        className="font-display block text-[40px] leading-none tracking-[-0.02em] text-graphite"
      >
        {stat.format(stat.target)}
      </span>
      <p className="font-display mt-3 text-[16px] tracking-[-0.02em]">{stat.label}</p>
      <p className="mt-1 text-[13px] text-slate">{stat.sub}</p>
    </article>
  );
}

export default function AnalyticsProof() {
  const v = useVariants();

  return (
    <section id="analytics" className="bg-ash py-[80px]">
      <div className="shell">
        <h2 className="mx-auto max-w-[640px] text-center text-[clamp(30px,4vw,40px)] leading-[1.2] tracking-[-0.02em]">
          The numbers outbound teams see after 30 days on SalesTracker.
        </h2>

        <motion.div
          variants={v(staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-6"
        >
          {STATS_DATA.map((stat) => (
            <motion.div key={stat.label} variants={v(scaleIn)}>
              <StatCard stat={stat} />
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-8 text-center text-[12px] text-slate italic">
          Data from 847 SalesTracker outbound teams, Q1–Q3 2024. Individual results vary.
        </p>
      </div>
    </section>
  );
}
