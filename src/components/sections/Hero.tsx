import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, Tooltip } from "recharts";
import { PhoneCall, ChartLineUp } from "@phosphor-icons/react";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/motion";
import { useCountUp } from "@/hooks/useCountUp";

const REVENUE = [
  { month: "Jan", value: 120 },
  { month: "Feb", value: 190 },
  { month: "Mar", value: 150 },
  { month: "Apr", value: 260 },
  { month: "May", value: 320 },
  { month: "Jun", value: 410 },
];

const TOOLTIP_STYLE = {
  borderRadius: 8,
  border: "1px solid var(--color-mist)",
  fontSize: 12,
  fontFamily: "Inter, sans-serif",
} as const;

function KPI({
  target,
  format,
  label,
  delta,
}: {
  target: number;
  format: (v: number) => string;
  label: string;
  delta?: string;
}) {
  const ref = useCountUp(target, format);
  return (
    <div className="rounded-sm bg-fog px-4 py-3">
      <span
        ref={ref}
        className="font-display block text-[22px] leading-none tracking-[-0.02em] text-graphite"
      >
        {format(target)}
      </span>
      <p className="mt-1 text-[12px] text-slate">{label}</p>
      {delta && <p className="mt-0.5 text-[12px] text-brass">{delta}</p>}
    </div>
  );
}

function CommandCenter() {
  return (
    <div className="relative lg:pr-6">
      <div
        className="absolute top-8 -right-0 hidden h-full w-full rounded-data bg-ivory lg:block"
        aria-hidden="true"
      />
      <div className="absolute -bottom-6 left-8 hidden lg:block" aria-hidden="true">
        <div className="rounded-card bg-graphite px-5 py-4 text-canvas-white ring-1 ring-mist">
          <p className="flex items-center gap-2 text-[12px] text-canvas-white">
            <PhoneCall size={14} weight="fill" className="text-ember" aria-hidden="true" />
            Cold calls remaining
          </p>
          <p className="font-display mt-1 text-[24px] leading-none tracking-[-0.02em] text-canvas-white">
            342
          </p>
          <p className="mt-1 text-[11px] text-mist">in today&apos;s dialing queue</p>
        </div>
      </div>

      <div className="relative rounded-data bg-canvas-white p-6 ring-1 ring-mist lg:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="eyebrow">Outbound command center</p>
            <p className="font-display mt-1.5 text-[20px] tracking-[-0.02em] text-graphite">
              Today&apos;s exec metrics
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-2xl bg-ivory px-2.5 py-1 text-[12px] text-brass">
            <span className="ember-dot" aria-hidden="true" /> LIVE
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <KPI
            target={12480}
            format={(v) => Math.round(v).toLocaleString()}
            label="Total leads"
            delta="+9.4% MoM"
          />
          <KPI
            target={168}
            format={(v) => String(Math.round(v))}
            label="Calls today"
            delta="on track"
          />
          <KPI
            target={9}
            format={(v) => String(Math.round(v))}
            label="Meetings booked"
            delta="+3 today"
          />
          <KPI
            target={14.2}
            format={(v) => `${v.toFixed(1)}%`}
            label="Conversion rate"
            delta="+1.8 pts"
          />
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="font-display flex items-center gap-2 text-[14px] tracking-[-0.02em] text-graphite">
            <ChartLineUp size={16} aria-hidden="true" /> Pipeline value
          </p>
          <p className="text-[13px] text-slate">$2.4M open · last 6 months</p>
        </div>

        <div className="mt-3 h-[180px] w-full lg:h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={REVENUE} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-ember)" stopOpacity={0.32} />
                  <stop offset="100%" stopColor="var(--color-ember)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 6" stroke="var(--color-mist)" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "var(--color-slate)" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ stroke: "var(--color-mist)" }}
                contentStyle={TOOLTIP_STYLE}
                formatter={(value) => [`$${value}K`, "Pipeline value"]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--color-ember)"
                strokeWidth={2.5}
                fill="url(#revGradient)"
                animationDuration={1400}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const v = (variants: Variants): Variants => (reduce ? {} : variants);

  return (
    <section id="top" className="shell pt-[70px] pb-[80px] lg:pt-[90px]">
      <motion.div
        variants={v(staggerContainer)}
        initial="hidden"
        animate="visible"
        className="grid items-center gap-14 lg:grid-cols-[48%_52%]"
      >
        <div>
          <motion.span
            variants={v(fadeUp)}
            className="inline-flex items-center gap-2 rounded-2xl bg-ivory px-3 py-1.5 text-[13px] text-brass"
          >
            <span className="ember-dot" aria-hidden="true" />
            Outbound sales execution platform
          </motion.span>

          <motion.h1
            variants={v(fadeUp)}
            className="mt-5 text-[clamp(38px,5.4vw,68px)] leading-[0.95] tracking-[-0.02em] text-graphite"
          >
            Turn cold calls into <span className="ember-underline">booked meetings.</span>
          </motion.h1>

          <motion.p
            variants={v(fadeUp)}
            className="mt-6 max-w-[540px] text-[18px] leading-[1.5] text-steel"
          >
            SalesTracker is an outbound B2B sales platform for high-velocity teams and SDRs. It
            scrapes leads from Google Maps, power-dials them one at a time, sends WhatsApp
            follow-ups, books Google Meets, and tracks the whole funnel in one clean pipeline.
          </motion.p>

          <motion.div variants={v(fadeUp)} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#demo" className="btn-solid w-full sm:w-auto">
              Start dialing free
            </a>
            <a href="#tour" className="btn-ghost w-full sm:w-auto">
              See it in action →
            </a>
          </motion.div>

          <motion.ul
            variants={v(fadeUp)}
            className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-slate"
          >
            {[
              "Google Maps lead scraping",
              "Sequential power dialing",
              "WhatsApp + Google Meet built-in",
            ].map((t) => (
              <li key={t}>✓ {t}</li>
            ))}
          </motion.ul>
        </div>

        <motion.div variants={v(staggerContainer)}>
          <motion.div variants={v(scaleIn)}>
            <CommandCenter />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
