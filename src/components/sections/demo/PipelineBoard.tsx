import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, DotsSixVertical } from "@phosphor-icons/react";
import { PIPELINE_DEALS, PIPELINE_STAGES, type Deal, type Stage } from "./data";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function PipelineBoard({ className = "" }: { className?: string }) {
  const [board, setBoard] = useState<Record<Stage, Deal[]>>(PIPELINE_DEALS);
  const [dragging, setDragging] = useState<{ id: string; from: Stage } | null>(null);

  const moveDeal = (dealId: string, from: Stage, to: Stage) => {
    if (from === to) return;
    setBoard((prev) => {
      const source = prev[from];
      const deal = source.find((d) => d.id === dealId);
      if (!deal) return prev;
      return {
        ...prev,
        [from]: source.filter((d) => d.id !== dealId),
        [to]: [...prev[to], deal],
      };
    });
    toast("Deal moved", { description: `${dealId.toUpperCase()} moved from ${from} to ${to}.` });
  };

  const onDrop = (e: React.DragEvent, to: Stage) => {
    e.preventDefault();
    if (!dragging) return;
    moveDeal(dragging.id, dragging.from, to);
    setDragging(null);
  };

  const totalValue = (deals: Deal[]) => deals.reduce((sum, d) => sum + d.value, 0);
  const grandTotal = PIPELINE_STAGES.reduce((sum, s) => sum + totalValue(board[s]), 0);

  return (
    <div className={className}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="eyebrow">Drag deals between stages</p>
        <p className="font-display text-[24px] tracking-[-0.02em] text-graphite">
          {currency.format(grandTotal)}{" "}
          <span className="text-[14px] text-slate">open pipeline</span>
        </p>
      </div>

      <div className="mt-5 flex gap-3 overflow-x-auto pb-2">
        {PIPELINE_STAGES.map((stage) => (
          <div
            key={stage}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop(e, stage)}
            className={`min-w-[168px] flex-1 rounded-data border border-mist bg-fog p-3 transition-colors ${
              dragging ? "border-dashed" : ""
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="font-display text-[12px] tracking-[-0.02em] text-graphite">{stage}</p>
              <span className="rounded-2xl bg-canvas-white px-2 py-0.5 text-[11px] text-steel">
                {board[stage].length}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-slate">
              {currency.format(totalValue(board[stage]))}
            </p>

            <div className="mt-3 space-y-2">
              {board[stage].map((deal) => (
                <div
                  key={deal.id}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.effectAllowed = "move";
                    setDragging({ id: deal.id, from: stage });
                  }}
                  onDragEnd={() => setDragging(null)}
                  className="group cursor-grab rounded-sm bg-canvas-white p-3 active:cursor-grabbing"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-display text-[13px] tracking-[-0.02em] text-graphite">
                      {deal.name}
                    </p>
                    <DotsSixVertical
                      size={13}
                      className="text-mist transition-colors group-hover:text-slate"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-0.5 truncate text-[12px] text-slate">{deal.company}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[13px] font-medium text-brass">
                      {currency.format(deal.value)}
                    </span>
                    {stage !== "Closed Won" && stage !== "Closed Lost" && (
                      <button
                        type="button"
                        onClick={() => {
                          const idx = PIPELINE_STAGES.indexOf(stage);
                          const next = PIPELINE_STAGES[Math.min(idx + 1, 2)];
                          if (next) moveDeal(deal.id, stage, next);
                        }}
                        aria-label={`Advance ${deal.name}`}
                        className="flex h-6 w-6 items-center justify-center rounded-sm text-slate transition-colors hover:bg-ash hover:text-graphite"
                      >
                        <ArrowRight size={13} aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {board[stage].length === 0 && (
                <p className="rounded-sm border border-dashed border-mist p-3 text-center text-[12px] text-slate">
                  Drop deals here
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
