import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Bar,
  BarChart,
  XAxis,
  YAxis,
} from "recharts";
import { CALL_OUTCOMES, WEEKLY_CALLS } from "./data";

export default function AnalyticsPanel({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Calls today", value: "168", delta: "+12%" },
          { label: "Meetings booked", value: "9", delta: "+3" },
          { label: "Conversion rate", value: "14.2%", delta: "+1.8%" },
          { label: "Follow-ups due", value: "4", delta: "overdue 2" },
        ].map((s) => (
          <div key={s.label} className="rounded-card bg-canvas-white p-4 ring-1 ring-mist">
            <p className="text-[12px] text-slate">{s.label}</p>
            <p className="font-display mt-1 text-[24px] leading-none tracking-[-0.02em] text-graphite">
              {s.value}
            </p>
            <p className="mt-1 text-[12px] text-brass">{s.delta}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-data bg-canvas-white p-5 ring-1 ring-mist">
          <p className="font-display text-[14px] tracking-[-0.02em] text-graphite">Call outcomes</p>
          <div className="mt-3 flex h-[180px] items-center">
            <ResponsiveContainer width="55%" height="100%">
              <PieChart>
                <Pie
                  data={CALL_OUTCOMES}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={46}
                  outerRadius={70}
                  paddingAngle={3}
                  strokeWidth={0}
                >
                  {CALL_OUTCOMES.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid var(--color-mist)",
                    fontSize: 12,
                    fontFamily: "Inter, sans-serif",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <ul className="flex-1 space-y-1.5">
              {CALL_OUTCOMES.map((o) => (
                <li key={o.name} className="flex items-center gap-2 text-[12px] text-steel">
                  <span
                    className="h-2 w-2 rounded-sm"
                    style={{ backgroundColor: o.color }}
                    aria-hidden="true"
                  />
                  {o.name}
                  <span className="font-display ml-auto tracking-[-0.02em] text-graphite">
                    {o.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-data bg-canvas-white p-5 ring-1 ring-mist">
          <p className="font-display text-[14px] tracking-[-0.02em] text-graphite">
            Calls per day this week
          </p>
          <div className="mt-3 h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEKLY_CALLS} margin={{ top: 5, right: 0, left: -22, bottom: 0 }}>
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: "var(--color-slate)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "var(--color-slate)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "var(--color-fog)" }}
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid var(--color-mist)",
                    fontSize: 12,
                    fontFamily: "Inter, sans-serif",
                  }}
                />
                <Bar
                  dataKey="calls"
                  fill="var(--color-graphite)"
                  radius={[3, 3, 0, 0]}
                  maxBarSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
