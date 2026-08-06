import { useState } from "react";
import { toast } from "sonner";
import { Check, ClockCounterClockwise, ArrowClockwise } from "@phosphor-icons/react";
import { FOLLOW_UPS, type FollowUp } from "./data";

const TABS = ["All", "Overdue", "Today", "Upcoming"] as const;
type Tab = (typeof TABS)[number];

const DUE_STYLES: Record<FollowUp["due"], string> = {
  Overdue: "bg-ember text-canvas-white",
  Today: "bg-ivory text-brass",
  Upcoming: "bg-mist text-steel",
};

const nextDue: Record<FollowUp["due"], FollowUp["due"]> = {
  Overdue: "Today",
  Today: "Upcoming",
  Upcoming: "Upcoming",
};

export default function FollowUpQueue({ className = "" }: { className?: string }) {
  const [items, setItems] = useState<FollowUp[]>(FOLLOW_UPS);
  const [tab, setTab] = useState<Tab>("All");

  const visible = tab === "All" ? items : items.filter((f) => f.due === tab);
  const done = FOLLOW_UPS.length - items.length;

  const complete = (id: string) => {
    setItems((prev) => prev.filter((f) => f.id !== id));
    toast("Follow-up completed", { description: "Activity logged to the lead timeline." });
  };

  const reschedule = (id: string) => {
    setItems((prev) => prev.map((f) => (f.id === id ? { ...f, due: nextDue[f.due] } : f)));
    toast("Follow-up rescheduled", { description: "Moved to a later slot in your queue." });
  };

  return (
    <div className={className}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="eyebrow">Follow-up execution queue</p>
        <p className="text-[13px] text-slate">
          <span className="font-display text-[20px] tracking-[-0.02em] text-graphite">{done}</span>{" "}
          completed today
        </p>
      </div>

      <div role="tablist" aria-label="Follow-up filters" className="mt-4 flex flex-wrap gap-1.5">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`rounded-pill px-3.5 py-1.5 text-[13px] transition-colors ${
              tab === t
                ? "bg-graphite text-canvas-white"
                : "bg-canvas-white text-steel ring-1 ring-mist hover:text-graphite"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <ul className="mt-4 space-y-2">
        {visible.map((f) => (
          <li
            key={f.id}
            className="flex items-center gap-3 rounded-sm bg-canvas-white p-3 ring-1 ring-mist"
          >
            <div className="min-w-0 flex-1">
              <p className="font-display truncate text-[14px] tracking-[-0.02em] text-graphite">
                {f.lead} · {f.company}
              </p>
              <p className="truncate text-[13px] text-slate">{f.task}</p>
            </div>
            <span className={`shrink-0 rounded-2xl px-2.5 py-1 text-[11px] ${DUE_STYLES[f.due]}`}>
              {f.due}
            </span>
            <button
              type="button"
              onClick={() => reschedule(f.id)}
              aria-label={`Reschedule ${f.lead}`}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm text-slate transition-colors hover:bg-ash hover:text-graphite"
            >
              <ArrowClockwise size={15} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => complete(f.id)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-sm bg-graphite px-3 py-2 text-[13px] text-canvas-white transition-opacity hover:opacity-85"
            >
              <Check size={14} weight="bold" aria-hidden="true" />
              Complete
            </button>
          </li>
        ))}
        {visible.length === 0 && (
          <li className="flex items-center gap-3 rounded-sm bg-canvas-white p-6 text-[13px] text-slate ring-1 ring-mist">
            <ClockCounterClockwise size={18} aria-hidden="true" />
            Nothing in this view — queue is clear.
          </li>
        )}
      </ul>
    </div>
  );
}
