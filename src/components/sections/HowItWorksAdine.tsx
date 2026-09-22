import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { ComponentType, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import type { FeatureIconName } from "@/components/icons/FeatureIcons";
import {
  MapPinIcon,
  PhoneIcon,
  ChatIcon,
  CheckIcon,
  CalendarMeetIcon,
  KanbanIcon,
} from "@/components/icons/FeatureIcons";
import { AnimatedFeatureIcon } from "@/components/icons/AnimatedFeatureIcon";
import { AuroraField } from "@/components/backgrounds/AnimatedBackgrounds";
import { InteractiveMesh } from "@/components/backgrounds/InteractiveMesh";
import { Ambient } from "@/components/backgrounds/Ambient";
import SectionHeading from "@/components/sections/SectionHeading";

const DESKTOP_MQ = "(min-width: 1024px)";

/* Sticky scrollytelling is desktop-only (≥1024px). Tracked via matchMedia so
   no scroll listeners drive layout; SSR defaults to the stacked mobile view. */
function useIsDesktop() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(DESKTOP_MQ);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(DESKTOP_MQ).matches,
    () => false,
  );
}

/* ── Small shared pieces ─────────────────────────────────────────────── */

/* Pulsing "live" dot (respects reduced motion). */
function LiveDot({ reduce, className = "bg-violet" }: { reduce: boolean; className?: string }) {
  return (
    <span className="relative flex h-2 w-2">
      {!reduce && (
        <span
          className={`absolute inset-0 rounded-full ${className} opacity-60 [animation:outcome-pulse_1.8s_ease-in-out_infinite]`}
          aria-hidden="true"
        />
      )}
      <span className={`relative inline-flex h-2 w-2 rounded-full ${className}`} />
    </span>
  );
}

/* Mini window-chrome header used across the step visuals. */
function MockHeader({
  icon,
  label,
  dot,
  reduce,
}: {
  icon: ReactNode;
  label: string;
  dot: string;
  reduce: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-pebble bg-canvas/70 px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="text-slate">{icon}</span>
        <p className="text-[13px] font-medium text-ink">{label}</p>
      </div>
      <LiveDot reduce={reduce} className={dot} />
    </div>
  );
}

/* ── Step visuals (one per stage) ────────────────────────────────────── */

/* 01 · Scrape — map with pins dropping in + live progress bar. */
function ScrapeVisual({ reduce }: { reduce: boolean }) {
  const pins = [
    { top: "20%", left: "20%" },
    { top: "30%", left: "58%" },
    { top: "52%", left: "28%" },
    { top: "44%", left: "78%" },
    { top: "70%", left: "52%" },
  ];
  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[460px]">
        <div className="overflow-hidden rounded-[20px] border border-pebble bg-card shadow-card">
          <MockHeader
            icon={<MapPinIcon size={16} />}
            label="Scraping Google Maps"
            dot="bg-violet"
            reduce={reduce}
          />
          <div className="p-5">
            {/* Simplified map area */}
            <div className="relative h-[184px] overflow-hidden rounded-xl bg-canvas">
              <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
                {Array.from({ length: 7 }).map((_, i) => (
                  <line
                    key={`v${i}`}
                    x1={`${(i / 6) * 100}%`}
                    y1="0"
                    x2={`${(i / 6) * 100}%`}
                    y2="100%"
                    stroke="rgba(97,97,255,0.08)"
                    strokeWidth="1"
                  />
                ))}
                {Array.from({ length: 5 }).map((_, i) => (
                  <line
                    key={`h${i}`}
                    x1="0"
                    y1={`${(i / 4) * 100}%`}
                    x2="100%"
                    y2={`${(i / 4) * 100}%`}
                    stroke="rgba(97,97,255,0.08)"
                    strokeWidth="1"
                  />
                ))}
              </svg>
              {pins.map((p, i) => (
                <motion.span
                  key={i}
                  className="absolute flex -translate-x-1/2 -translate-y-1/2"
                  style={{ left: p.left, top: p.top }}
                  animate={
                    reduce
                      ? { scale: 1.1, opacity: 1 }
                      : { scale: [0, 1.15, 0.9, 1.1], opacity: [0, 1, 1, 1] }
                  }
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: i * 0.6 }}
                  aria-hidden="true"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet text-[10px] font-bold text-white shadow-pill">
                    <MapPinIcon size={12} />
                  </span>
                </motion.span>
              ))}
            </div>
            {/* Live progress */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-medium text-iron">Dentists · Mumbai</span>
                <span className="tabular-nums font-semibold text-violet">
                  {reduce ? "236 leads" : "128 → 236"}
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-violet/10">
                <motion.div
                  className="h-full rounded-full bg-violet"
                  animate={reduce ? { width: "96%" } : { width: ["6%", "96%"] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["Category", "City", "1,200 count"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-pebble bg-card px-2.5 py-1 text-[10px] font-medium text-slate"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 02 · Build your list — CSV rows snap into a clean, de-duplicated list. */
function BuildVisual({ reduce }: { reduce: boolean }) {
  const raw = [
    "Sharma Dental · 98204 · Mumbai",
    "Sharma Dental · 98204 · Mumbai",
    "Vaishali Clinic · 77000 · Thane",
  ];
  const clean = ["Sharma Dental · Mumbai", "Vaishali Clinic · Thane"];
  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[460px]">
        <div className="overflow-hidden rounded-[20px] border border-pebble bg-card shadow-card">
          <MockHeader
            icon={<ChatIcon size={16} />}
            label="Import leads.csv"
            dot="bg-green-600"
            reduce={reduce}
          />
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 p-5">
            {/* Raw */}
            <div className="space-y-1.5">
              {raw.map((r, i) => (
                <div
                  key={i}
                  className={`rounded-[10px] border px-2.5 py-2 text-[10px] leading-tight text-slate ${
                    i === 1 ? "border-apricot/40 bg-apricot/10" : "border-pebble bg-white"
                  }`}
                >
                  {r}
                  {i === 1 && (
                    <span className="mt-0.5 block font-semibold text-apricot">duplicate</span>
                  )}
                </div>
              ))}
            </div>
            {/* Arrow */}
            <motion.div
              className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600/10 text-green-700"
              animate={reduce ? {} : { x: [0, 3, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            >
              <ArrowRight size={16} />
            </motion.div>
            {/* Clean */}
            <div className="space-y-1.5">
              {clean.map((c, i) => (
                <motion.div
                  key={c}
                  className="flex items-center justify-between rounded-[10px] bg-mint/30 px-2.5 py-2 text-[10px] font-medium text-ink"
                  animate={reduce ? {} : { y: [0, i === 0 ? -2 : 2, 0], opacity: [0.85, 1, 0.85] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
                >
                  <span>{c}</span>
                  <CheckIcon size={12} className="text-green-700" />
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 border-t border-pebble bg-canvas/60 px-4 py-3">
            <CheckIcon size={13} className="text-green-700" />
            <p className="text-[11px] font-medium text-slate">
              Columns auto-mapped · 3 of 4 rows kept
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 03 · Run a call session — dialing card with live waveform. */
function CallVisual({ reduce }: { reduce: boolean }) {
  const bars = [10, 18, 26, 14, 22, 30, 16, 24, 12, 20];
  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[460px]">
        <div className="overflow-hidden rounded-[20px] border border-pebble bg-card shadow-card">
          <MockHeader
            icon={<PhoneIcon size={16} />}
            label="Cold call session"
            dot="bg-green-500"
            reduce={reduce}
          />
          <div className="p-5">
            {/* Lead card */}
            <div className="rounded-[14px] border border-pebble/70 bg-canvas/70 p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet/15 text-[13px] font-semibold text-violet">
                  RM
                </span>
                <div className="min-w-0">
                  <p className="text-[14px] font-medium text-ink">Rahul Mehta</p>
                  <p className="text-[12px] text-slate">Meridian Technologies · Mumbai</p>
                </div>
                <span className="ml-auto whitespace-nowrap rounded-full bg-violet/10 px-2.5 py-1 text-[11px] font-semibold text-violet">
                  Lead 3 of 26
                </span>
              </div>
              {/* Live waveform */}
              <div className="mt-3 flex h-6 items-end gap-[3px]" aria-hidden="true">
                {bars.map((h, i) => (
                  <motion.span
                    key={i}
                    className="w-[3px] origin-bottom rounded-full bg-sky-600"
                    style={{ height: `${h}px` }}
                    animate={reduce ? { scaleY: 0.5 } : { scaleY: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 1.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.08,
                    }}
                  />
                ))}
              </div>
            </div>
            {/* Quick actions */}
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                { icon: <PhoneIcon size={14} />, label: "Call lead", tone: "bg-violet text-white" },
                {
                  icon: <ChatIcon size={14} />,
                  label: "WhatsApp",
                  tone: "bg-mint/40 text-green-700",
                },
                { icon: <MapPinIcon size={14} />, label: "Maps", tone: "bg-sky/40 text-sky-700" },
                {
                  icon: <ChatIcon size={14} />,
                  label: "Gmail",
                  tone: "bg-lavender/50 text-ultraviolet",
                },
              ].map((a) => (
                <span
                  key={a.label}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium ${a.tone}`}
                >
                  {a.icon} {a.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 04 · Log outcome — the six keys highlight one-by-one on a loop. */
const KEY_LABELS = [
  "No Answer",
  "Invalid",
  "Gatekeeper",
  "Callback Requested",
  "Not Interested",
  "Interested",
];

function KeyboardVisual({ reduce }: { reduce: boolean }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = window.setInterval(() => setIdx((i) => (i + 1) % KEY_LABELS.length), 1500);
    return () => window.clearInterval(t);
  }, [reduce]);

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[460px]">
        <div className="overflow-hidden rounded-[20px] border border-pebble bg-card shadow-card">
          <MockHeader
            icon={<ChatIcon size={16} />}
            label="Call outcome"
            dot="bg-ultraviolet"
            reduce={reduce}
          />
          <div className="grid grid-cols-1 gap-1.5 p-5 sm:grid-cols-2">
            {KEY_LABELS.map((label, i) => {
              const active = i === idx;
              return (
                <motion.span
                  key={label}
                  className={`inline-flex items-center gap-2.5 rounded-full border px-3 py-2 text-[12px] font-medium transition-colors duration-200 ${
                    active
                      ? "border-transparent bg-ultraviolet text-white shadow-pill"
                      : "border-pebble bg-card text-slate"
                  }`}
                  animate={reduce ? {} : active ? { scale: [1, 0.94, 1.05, 1] } : { scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  aria-hidden="true"
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded text-[10px] font-bold ${
                      active ? "bg-white/20 text-white" : "bg-canvas text-iron"
                    }`}
                  >
                    {i + 1}
                  </span>
                  {label}
                </motion.span>
              );
            })}
            <span className="inline-flex items-center gap-2.5 rounded-full border border-pebble bg-card px-3 py-2 text-[12px] font-medium text-slate">
              <span className="flex h-4 w-4 items-center justify-center rounded bg-canvas text-[10px] font-bold text-iron">
                S
              </span>
              Skip
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 05 · Book the meet — calendar + meet link + WhatsApp confirmation. */
function MeetVisual({ reduce }: { reduce: boolean }) {
  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[460px]">
        <div className="overflow-hidden rounded-[20px] border border-pebble bg-card shadow-card">
          <MockHeader
            icon={<CalendarMeetIcon size={16} />}
            label="Book the meet"
            dot="bg-apricot"
            reduce={reduce}
          />
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            {/* Calendar + meet link */}
            <div>
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-iron">
                  Sept 2026
                </p>
                <span className="rounded-full bg-apricot/15 px-2 py-0.5 text-[10px] font-semibold text-apricot">
                  Next
                </span>
              </div>
              <div className="mt-2 grid grid-cols-7 gap-1">
                {["16", "17", "18", "19", "20", "21", "22"].map((d, i) => (
                  <div
                    key={d}
                    className={`flex h-8 items-center justify-center rounded-[8px] text-[10px] ${
                      i === 3
                        ? "bg-apricot font-semibold text-white"
                        : "border border-pebble bg-white text-slate"
                    }`}
                  >
                    {d}
                  </div>
                ))}
              </div>
              <div className="mt-2 flex items-center justify-between rounded-[10px] bg-canvas px-3 py-2">
                <span className="flex items-center gap-1.5 text-[11px] text-slate">
                  <CalendarMeetIcon size={12} /> Google Meet
                </span>
                <span className="font-semibold text-[11px] text-apricot">11:30</span>
              </div>
            </div>
            {/* WhatsApp confirmation */}
            <div className="flex items-end">
              <div className="w-full rounded-2xl rounded-tl-sm border border-pebble bg-white p-3 shadow-card">
                <p className="text-[11px] font-medium text-ink">Confirmed for tomorrow 11:30 👋</p>
                <p className="mt-1 truncate text-[10px] font-semibold text-apricot">
                  meet.google.com/abc-defg-hij
                </p>
                <p className="mt-2 flex items-center gap-1 text-[10px] text-slate">
                  Sent via WhatsApp
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <motion.path
                      d="M3 7.5l2.6 2.6L11 5"
                      stroke="#16a34a"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
                      animate={
                        reduce
                          ? { pathLength: 1 }
                          : { pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0.25] }
                      }
                      transition={{
                        duration: 3.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 2.8,
                      }}
                    />
                  </svg>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 06 · Follow up & close — a deal card races across the pipeline to Won. */
function PipelineVisual({ reduce }: { reduce: boolean }) {
  const cols = ["Contacted", "Warm", "Meeting Booked", "Won"];
  const stops = [8, 114, 220, 326];
  const firstStop = stops[0]!;
  const lastStop = stops[stops.length - 1]!;
  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[460px]">
        <div className="overflow-hidden rounded-[20px] border border-pebble bg-card shadow-card">
          <MockHeader
            icon={<KanbanIcon size={16} />}
            label="Pipeline · Deals"
            dot="bg-cyan-600"
            reduce={reduce}
          />
          <div className="p-5">
            {/* Moving deal card */}
            <div className="relative h-[170px]">
              <div className="grid grid-cols-4 gap-1.5 absolute inset-0">
                {cols.map((c, i) => (
                  <div
                    key={c}
                    className={`rounded-[12px] border p-1.5 ${
                      i === 3 ? "border-mint/60 bg-mint/20" : "border-pebble bg-canvas"
                    }`}
                  >
                    <p className="text-center text-[8px] font-semibold uppercase tracking-wide text-iron">
                      {c}
                    </p>
                    {i === 3 && (
                      <div className="mt-1.5 flex items-center justify-center gap-1 rounded-[6px] bg-green-600 py-1 text-[9px] font-bold text-white">
                        <CheckIcon size={10} /> Won
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <motion.div
                className="absolute top-8 z-10 flex items-center gap-1.5 rounded-lg bg-cyan-600 px-2.5 py-1.5 text-[10px] font-semibold text-white shadow-card"
                style={{ left: firstStop }}
                animate={
                  reduce ? { x: lastStop - firstStop } : { x: stops.map((s) => s - firstStop) }
                }
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                aria-hidden="true"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                Sharma Dental
              </motion.div>
            </div>
            {/* Re-engagement bubble */}
            <div className="mt-2 flex justify-end">
              <motion.div
                className="flex items-center gap-2 rounded-2xl rounded-tr-sm bg-sky/20 px-3 py-2"
                animate={reduce ? {} : { x: [0, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChatIcon size={13} className="text-sky-700" />
                <p className="text-[10px] font-medium text-ink">
                  No answer? Callback scheduled for tomorrow
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step model ──────────────────────────────────────────────────────── */

type Step = {
  number: string;
  title: string;
  description: string;
  icon: FeatureIconName;
  iconBg: string;
  iconTxt: string;
  Visual: ComponentType<{ reduce: boolean }>;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "Scrape leads",
    description:
      "Pull verified business leads straight from Google Maps by category, city, and target count, with a live progress bar as results come in.",
    icon: "map",
    iconBg: "bg-violet/10",
    iconTxt: "text-violet",
    Visual: ScrapeVisual,
  },
  {
    number: "02",
    title: "Build your list",
    description:
      "Save into a named collection, or upload a CSV that auto-maps columns and de-duplicates phone numbers — clean and ready to dial, no manual staging.",
    icon: "sheet",
    iconBg: "bg-mint/40",
    iconTxt: "text-green-700",
    Visual: BuildVisual,
  },
  {
    number: "03",
    title: "Run a call session",
    description:
      "Work a single-lead-at-a-time queue with one-tap call, website, Maps, email, and WhatsApp actions — no tab-hopping while a prospect waits.",
    icon: "phone",
    iconBg: "bg-sky/40",
    iconTxt: "text-sky-700",
    Visual: CallVisual,
  },
  {
    number: "04",
    title: "Log with one keypress",
    description:
      "Every outcome lives on the number keys 1–6 (No Answer, Invalid, Gatekeeper, Callback Requested, Not Interested, Interested) plus Skip — hands never leave the keyboard.",
    icon: "command",
    iconBg: "bg-lavender/50",
    iconTxt: "text-ultraviolet",
    Visual: KeyboardVisual,
  },
  {
    number: "05",
    title: "Book the meet",
    description:
      "Interested leads branch straight into a real Google Calendar meeting, with the confirmation auto-sent over WhatsApp the moment it's booked.",
    icon: "meet",
    iconBg: "bg-apricot/20",
    iconTxt: "text-apricot",
    Visual: MeetVisual,
  },
  {
    number: "06",
    title: "Follow up and close",
    description:
      "No-answers auto-schedule a next-day retry, meeting outcomes trigger the right re-engagement message automatically, and the deal moves through the pipeline until it's won.",
    icon: "kanban",
    iconBg: "bg-aqua/50",
    iconTxt: "text-cyan-700",
    Visual: PipelineVisual,
  },
];

/* ── Left column step card ───────────────────────────────────────────── */

function StepCard({ step, active, reduce }: { step: Step; active: boolean; reduce: boolean }) {
  return (
    <motion.div
      className={`relative flex gap-6 overflow-hidden rounded-[26px] border p-7 transition-colors duration-300 ${
        active
          ? "border-violet/25 bg-card shadow-[0_26px_70px_rgba(48,45,111,0.18)]"
          : "border-pebble bg-card/70 shadow-none"
      }`}
      {...(!reduce ? { whileHover: { y: -3 } } : {})}
      transition={{ duration: 0.2 }}
    >
      {/* active glow accent */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
          active ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(340px circle at 0% 0%, rgba(97,97,255,0.07), transparent 65%)",
        }}
        aria-hidden="true"
      />
      <div className="relative">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] text-[16px] font-bold tracking-[-0.02em] transition-colors duration-300 ${
            active
              ? "bg-violet text-white shadow-pill"
              : "border border-pebble bg-canvas text-slate"
          }`}
        >
          {step.number}
        </div>
      </div>
      <div className="relative min-w-0">
        <div className="flex items-center gap-2">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] ${step.iconBg} ${step.iconTxt}`}
          >
            <AnimatedFeatureIcon name={step.icon} size={18} className={step.iconTxt} />
          </span>
          <h3 className="text-[19px] font-medium text-ink">{step.title}</h3>
        </div>
        <p className="mt-2.5 text-[15px] font-light leading-[1.65] text-slate">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Abstract pinned artwork ────────────────────────────────────────── */

const ART_PALETTES = [
  ["#6161ff", "#b9b8ff", "#d8f5ee"],
  ["#6d70ff", "#b9e8dc", "#ffd7b5"],
  ["#5259e8", "#b8ddff", "#e0d5ff"],
  ["#7564ff", "#f0c8e8", "#bdeee1"],
  ["#5b6cff", "#ffd1a8", "#c9d8ff"],
  ["#4f62df", "#b9e4f0", "#e7ceff"],
];

const FLOW_PATH =
  "M92 388 C54 350 74 286 128 300 C183 316 150 246 205 228 C256 212 220 154 276 148 C322 142 318 100 288 72";
const FLOW_FALLBACK_POINTS = [
  { x: 92, y: 388 },
  { x: 107, y: 298 },
  { x: 164, y: 278 },
  { x: 223, y: 212 },
  { x: 274, y: 148 },
  { x: 288, y: 72 },
];

function AbstractArtwork({
  active,
  reduce,
  compact = false,
  scrollProgress,
}: {
  active: number;
  reduce: boolean;
  compact?: boolean;
  scrollProgress?: number;
}) {
  const palette = ART_PALETTES[active % ART_PALETTES.length] ?? ART_PALETTES[0]!;
  const progress = reduce ? 1 : Math.min(1, Math.max(0.015, scrollProgress ?? active / 5));
  const pathRef = useRef<SVGPathElement>(null);
  const [nodes, setNodes] = useState(FLOW_FALLBACK_POINTS);
  const [routeLength, setRouteLength] = useState(1000);
  const iconNames: FeatureIconName[] = ["map", "sheet", "phone", "command", "meet", "kanban"];

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const total = path.getTotalLength();
    setRouteLength(total);
    const measured = Array.from({ length: 6 }, (_, i) => {
      const point = path.getPointAtLength(total * (i / 5));
      return { x: point.x, y: point.y };
    });
    setNodes(measured);
  }, []);

  return (
    <div
      className={`relative isolate overflow-hidden ${compact ? "h-[230px]" : "h-[min(650px,calc(100svh-132px))] min-h-[390px]"}`}
      aria-label="Progressive workflow route"
    >
      <div className="relative mx-auto h-full aspect-[4/5] max-w-full">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 400 500"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`flow-gradient-${active}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#6161ff" />
              <stop offset="0.7" stopColor={palette[0]} />
              <stop offset="1" stopColor={palette[1]} />
            </linearGradient>
          </defs>
          <path
            ref={pathRef}
            d={FLOW_PATH}
            stroke="#cfd4e7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="4 9"
            strokeOpacity=".7"
          />
          <motion.path
            d={FLOW_PATH}
            stroke={palette[0]}
            strokeOpacity=".13"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={`${routeLength * progress} ${routeLength}`}
            strokeDashoffset="0"
            initial={false}
            animate={{ strokeDasharray: `${routeLength * progress} ${routeLength}` }}
            transition={{ duration: reduce ? 0 : 0.08, ease: "linear" }}
          />
          <motion.path
            d={FLOW_PATH}
            stroke={`url(#flow-gradient-${active})`}
            strokeOpacity="1"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${routeLength * progress} ${routeLength}`}
            strokeDashoffset="0"
            initial={false}
            animate={{
              strokeDasharray: `${routeLength * progress} ${routeLength}`,
              opacity: reduce ? 0.9 : 1,
            }}
            transition={{ duration: reduce ? 0 : 0.08, ease: "linear" }}
          />
        </svg>
        {nodes.map((node, i) => {
          const isActive = i === active;
          const reached = i < active;
          return (
            <span key={`node-${i}`}>
              {isActive && (
                <motion.span
                  className="pointer-events-none absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet/35"
                  style={{ left: `${(node.x / 400) * 100}%`, top: `${(node.y / 500) * 100}%` }}
                  initial={reduce ? { scale: 1, opacity: 0.35 } : { scale: 0.8, opacity: 0 }}
                  animate={
                    reduce
                      ? { scale: 1, opacity: 0.35 }
                      : { scale: [0.9, 1.25, 0.9], opacity: [0.5, 0, 0.5] }
                  }
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <motion.span
                className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-sm ${
                  isActive
                    ? "h-8 w-8 border-violet bg-violet text-white shadow-[0_8px_24px_rgba(97,97,255,0.3)]"
                    : "h-6 w-6 border-pebble/80 bg-white/80 text-slate/60"
                }`}
                style={{ left: `${(node.x / 400) * 100}%`, top: `${(node.y / 500) * 100}%` }}
                animate={{
                  scale: isActive ? 1.16 : reached ? 1 : 0.96,
                  opacity: isActive ? 1 : reached ? 0.65 : 0.52,
                }}
                transition={{ duration: reduce ? 0 : 0.36, ease: [0.22, 1, 0.36, 1] }}
              >
                <AnimatedFeatureIcon
                  name={iconNames[i]!}
                  size={isActive ? 15 : 12}
                  className={isActive ? "text-white" : "text-slate/60"}
                />
              </motion.span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ── Desktop: pinned full-viewport stage, only cards/scenes advance ──── */

function DesktopWalkthrough({
  active,
  scrollProgress,
  setCardRef,
}: {
  active: number;
  scrollProgress: number;
  setCardRef: (el: HTMLDivElement | null, i: number) => void;
}) {
  const reduce = useReducedMotion() ?? false;
  return (
    <div className="relative">
      {/* The stage stays pinned below the fixed navigation while the native
          scroll track advances the card deck. */}
      <div className="sticky top-[92px] z-10 grid h-[calc(100svh-92px)] grid-cols-[48px_minmax(0,7fr)_minmax(0,8fr)] gap-8 overflow-hidden lg:gap-14">
        {/* Continuous progress rail beside the card deck. */}
        <div className="relative flex items-start justify-center pt-[20vh]">
          <div className="relative h-[300px] w-[3px] overflow-hidden rounded-full bg-pebble">
            <motion.div
              className="absolute inset-x-0 top-0 h-full origin-top rounded-full bg-gradient-to-b from-violet via-violet to-cornflower"
              animate={{ scaleY: (active + 1) / STEPS.length }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span
              className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-violet shadow-pill"
              animate={{ top: `${((active + 0.5) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
        {/* Left: the card "stack" — all six sit on top of each other and the
            active one rises forward as the scroll advances. */}
        <div className="mx-auto flex w-full max-w-[620px] flex-col justify-start pt-[10vh]">
          <div className="mb-7 flex items-center gap-2.5">
            <span className="text-[13px] font-bold tabular-nums text-violet">
              {STEPS[active]?.number ?? ""}
            </span>
            <span className="h-3 w-px bg-pebble" aria-hidden="true" />
            <span className="text-[13px] font-semibold text-slate">
              {STEPS[active]?.title ?? ""}
            </span>
          </div>

          <div className="relative h-[410px]" style={{ perspective: 1200 }}>
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                className="absolute inset-x-0 top-0"
                initial={false}
                animate={{
                  opacity: active === i ? 1 : 0,
                  y: active === i ? 0 : i < active ? -34 : 34,
                  scale: active === i ? 1 : 0.96,
                  rotateX: active === i ? 0 : 5,
                  filter: active === i ? "blur(0px)" : "blur(1px)",
                  zIndex: active === i ? 20 : 0,
                  visibility: active === i ? "visible" : "hidden",
                  pointerEvents: active === i ? "auto" : "none",
                }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden={active !== i}
              >
                <StepCard step={step} active={active === i} reduce={reduce} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: pinned abstract artwork that reacts to active step */}
        <div className="relative mx-auto w-full max-w-[520px]">
          <AbstractArtwork active={active} reduce={reduce} scrollProgress={scrollProgress} />
        </div>
      </div>

      {/* One full viewport marker per step. The markers scroll underneath the
          pinned stage, so the active card advances naturally as each card's
          viewport of scroll distance is completed. */}
      <div className="pointer-events-none" aria-hidden="true">
        {STEPS.map((step, i) => (
          <div
            key={step.number}
            data-index={i}
            ref={(el) => setCardRef(el, i)}
            className="h-svh w-px"
          />
        ))}
      </div>
    </div>
  );
}

/* ── Mobile/tablet: simple stacked cards, each followed by its visual ── */

function MobileWalkthrough() {
  const reduce = useReducedMotion() ?? false;
  return (
    <div className="relative mt-16">
      <div className="absolute bottom-0 left-[52px] top-0 w-[2px] -translate-x-1/2 rounded-full bg-pebble" />
      <div className="flex flex-col space-y-16">
        {STEPS.map((step, i) => (
          <div key={step.number} className="pl-6">
            <StepCard step={step} active={false} reduce={reduce} />
            <div className="relative mt-5 w-full max-w-[520px]">
              <div className="mx-auto px-4">
                <AbstractArtwork active={i} reduce={reduce} compact />
              </div>
              <span className="pointer-events-none absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[13px] font-bold tabular-nums text-violet">
                {step.number}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────────────── */

export default function HowItWorksAdine() {
  const reduce = useReducedMotion() ?? false;
  const isDesktop = useIsDesktop();

  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // The markers run behind the sticky stage. This keeps the page's native
  // scroll physics intact while the observer advances one card per viewport.
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    if (!isDesktop) return;
    const els = cardRefs.current.filter((el): el is HTMLDivElement => el !== null);
    if (els.length === 0) return;

    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const markerTops = els.map((el) => el.getBoundingClientRect().top + window.scrollY);
      const first = markerTops[0];
      const last = markerTops[markerTops.length - 1];
      if (first === undefined || last === undefined || last <= first) return;

      // Match the observer's visual midpoint: the route advances continuously
      // as the viewport center travels from the first marker to the last.
      const viewportCenter = window.scrollY + window.innerHeight / 2;
      const nextProgress = Math.min(1, Math.max(0, (viewportCenter - first) / (last - first)));
      setScrollProgress(nextProgress);
    };
    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const current = visible[0];
        if (!current) return;
        const idx = Number((current.target as HTMLDivElement).dataset["index"]);
        if (!Number.isNaN(idx)) setActive(idx);
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, [isDesktop]);

  return (
    <section
      ref={sectionRef}
      id="how"
      className="relative scroll-mt-[104px] bg-canvas py-16 sm:py-[96px]"
    >
      {/* Animated backdrop: aurora + the same interactive mesh as the hero */}
      <Ambient className="absolute inset-0 overflow-hidden">
        <AuroraField />
        <InteractiveMesh className="opacity-45" />
      </Ambient>

      <div className="shell relative z-10">
        <SectionHeading
          eyebrow="How It Works"
          title="From a lead on the map to a deal in the pipeline"
          subtitle="Six steps. One flow: scrape, build, call, log, book, close."
          maxWidthClass="max-w-[650px]"
          titleClassName="mt-3 text-[clamp(30px,3.3vw,42px)] font-light leading-[1.1] tracking-[-0.025em] text-ink"
          subtitleClassName="mt-3 text-[16px] font-light leading-[1.5] text-slate"
        />

        {isDesktop ? (
          <DesktopWalkthrough
            active={active}
            scrollProgress={scrollProgress}
            setCardRef={(el: HTMLDivElement | null, i: number) => {
              cardRefs.current[i] = el;
            }}
          />
        ) : (
          <MobileWalkthrough />
        )}
      </div>
    </section>
  );
}
