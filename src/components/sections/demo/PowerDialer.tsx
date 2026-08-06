import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  PhoneCall,
  PhoneOutgoing,
  PhoneDisconnect,
  UserPlus,
  VideoCamera,
  Clock,
  X,
  ArrowRight,
  ChatCircleText,
} from "@phosphor-icons/react";
import { DIAL_LEADS, type DialLead } from "./data";

type Phase = "idle" | "dialing" | "connected" | "ended";

function formatTime(total: number) {
  const m = String(Math.floor(total / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function LeadCard({ lead, index, total }: { lead: DialLead; index: number; total: number }) {
  return (
    <div className="w-full rounded-data bg-canvas-white p-5 text-left ring-1 ring-mist">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-graphite text-[13px] font-medium text-canvas-white">
            {lead.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </span>
          <div>
            <p className="font-display text-[16px] leading-tight tracking-[-0.02em] text-graphite">
              {lead.name}
            </p>
            <p className="text-[13px] text-slate">{lead.company}</p>
          </div>
        </div>
        <span className="rounded-2xl bg-ivory px-2.5 py-1 text-[11px] text-brass">
          {index + 1} / {total}
        </span>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-[13px]">
        <div className="flex items-center gap-2">
          <PhoneOutgoing size={14} className="text-slate" aria-hidden="true" />
          <dd className="truncate text-graphite">{lead.phone}</dd>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate">•</span>
          <dd className="text-steel">{lead.category}</dd>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate">•</span>
          <dd className="text-steel">{lead.location}</dd>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate">•</span>
          <dd className="text-steel">Est. value {lead.value}</dd>
        </div>
      </dl>
    </div>
  );
}

export default function PowerDialer({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  const [leads, setLeads] = useState<DialLead[]>(DIAL_LEADS);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [connected, setConnected] = useState(false);
  const timerRef = useRef<number | null>(null);

  const lead = leads[index] ?? DIAL_LEADS[0]!;
  const remaining = leads.length - index - 1;

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
    };
  }, []);

  const startTimer = () => {
    stopTimer();
    timerRef.current = window.setInterval(() => {
      setElapsed((e) => e + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const callLead = () => {
    setPhase("dialing");
    setElapsed(0);
    setConnected(false);
    window.setTimeout(() => {
      setPhase("connected");
      setConnected(true);
      startTimer();
      toast("Call connected", { description: `You're live with ${lead.name} at ${lead.company}.` });
    }, 1400);
  };

  const advance = (message: string, description: string) => {
    stopTimer();
    setPhase("idle");
    setConnected(false);
    toast(message, { description });
    if (index + 1 < leads.length) {
      setIndex((i) => i + 1);
    } else {
      setIndex(0);
      setLeads(DIAL_LEADS);
      toast("Queue complete", { description: "All leads in this session have been worked." });
    }
  };

  const skipLead = () => {
    if (phase === "dialing") return;
    stopTimer();
    setPhase("idle");
    setConnected(false);
    if (index + 1 < leads.length) {
      setIndex((i) => i + 1);
    } else {
      setIndex(0);
      setLeads(DIAL_LEADS);
    }
  };

  if (!lead) return null;

  return (
    <div className={`w-full rounded-data bg-ash p-5 ring-1 ring-mist ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span
            className={`relative flex h-2.5 w-2.5 rounded-full ${
              phase === "connected" ? "bg-ember" : "bg-slate"
            }`}
            aria-hidden="true"
          >
            {phase === "connected" && (
              <span className="absolute inset-0 rounded-full bg-ember opacity-60 [animation:ember-pulse_1.8s_ease-in-out_infinite]" />
            )}
          </span>
          <p className="font-display text-[15px] tracking-[-0.02em] text-graphite">
            Sequential dialing session
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-display text-[20px] tabular-nums tracking-[-0.02em] text-graphite">
            {formatTime(elapsed)}
          </span>
          {phase === "connected" && (
            <span className="rounded-2xl bg-ember px-2.5 py-1 text-[11px] text-canvas-white">
              LIVE
            </span>
          )}
        </div>
      </div>

      <div className="mt-4">
        <LeadCard lead={lead} index={index} total={leads.length} />
      </div>

      {phase === "dialing" && (
        <p className="mt-4 flex items-center gap-2 text-[13px] text-steel">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ember" aria-hidden="true" />
          Dialing {lead.phone}…
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {phase !== "connected" ? (
          <button
            type="button"
            onClick={callLead}
            disabled={phase === "dialing"}
            className="btn-solid !min-h-0 !px-4 !py-2.5 !text-[14px] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <PhoneCall size={16} weight="fill" aria-hidden="true" />
            Call lead
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() =>
                advance(
                  "Marked interested",
                  `${lead.name} is now a Warm prospect — follow-up created.`,
                )
              }
              className="inline-flex items-center gap-1.5 rounded-sm bg-graphite px-3 py-2.5 text-[13px] text-canvas-white transition-opacity hover:opacity-85"
            >
              <UserPlus size={15} aria-hidden="true" />
              Interested
            </button>
            <button
              type="button"
              onClick={() =>
                advance("Google Meet booked", `Link sent to ${lead.name}: meet.google.com/abc-wxyz`)
              }
              className="inline-flex items-center gap-1.5 rounded-sm bg-ember px-3 py-2.5 text-[13px] text-canvas-white transition-opacity hover:opacity-85"
            >
              <VideoCamera size={15} aria-hidden="true" />
              Book Meet
            </button>
            <button
              type="button"
              onClick={() =>
                advance("Callback scheduled", `Reminder set for ${lead.name} tomorrow at 10:00 AM.`)
              }
              className="inline-flex items-center gap-1.5 rounded-sm border border-graphite px-3 py-2.5 text-[13px] text-graphite transition-colors hover:bg-mist"
            >
              <Clock size={15} aria-hidden="true" />
              Callback
            </button>
            <button
              type="button"
              onClick={() =>
                advance("Marked not interested", `${lead.name} was moved to Closed Lost.`)
              }
              className="inline-flex items-center gap-1.5 rounded-sm border border-mist px-3 py-2.5 text-[13px] text-steel transition-colors hover:bg-canvas-white"
            >
              <X size={15} aria-hidden="true" />
              No
            </button>
            <button
              type="button"
              onClick={skipLead}
              className="inline-flex items-center gap-1.5 rounded-sm px-3 py-2.5 text-[13px] text-slate transition-colors hover:text-graphite"
            >
              <ArrowRight size={15} aria-hidden="true" />
              Skip
            </button>
          </>
        )}

        {!compact && phase === "connected" && (
          <button
            type="button"
            onClick={() => {
              window.open(
                `https://wa.me/?text=${encodeURIComponent(
                  `Hi ${lead.name}, great connecting today. Here's a recap of our call…`,
                )}`,
                "_blank",
                "noopener,noreferrer",
              );
            }}
            className="inline-flex items-center gap-1.5 rounded-sm bg-ivory px-3 py-2.5 text-[13px] text-brass transition-opacity hover:opacity-80"
          >
            <ChatCircleText size={15} aria-hidden="true" />
            WhatsApp
          </button>
        )}
      </div>

      {!compact && remaining > 0 && (
        <p className="mt-4 text-[12px] text-slate">
          {remaining} lead{remaining === 1 ? "" : "s"} in the queue · notes auto-saved after every
          action
        </p>
      )}

      <div className="mt-4 flex gap-1.5" aria-hidden="true">
        {leads.map((l, i) => (
          <span
            key={l.id}
            className={`h-1.5 flex-1 rounded-sm ${
              i === index ? "bg-ember" : i < index ? "bg-graphite/50" : "bg-mist"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
