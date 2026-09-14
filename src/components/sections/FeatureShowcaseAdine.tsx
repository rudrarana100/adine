import { Fragment } from "react";
import type { ComponentType } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MagnifyingGlass } from "@phosphor-icons/react";
import { fadeUp, staggerContainer, useVariants } from "@/lib/motion";
import { AnimatedFeatureIcon } from "@/components/icons/AnimatedFeatureIcon";
import { CheckIcon } from "@/components/icons/FeatureIcons";
import type { FeatureIconName } from "@/components/icons/FeatureIcons";
import { DotGrid } from "@/components/backgrounds/AnimatedBackgrounds";
import { Ambient } from "@/components/backgrounds/Ambient";
import SectionHeading from "@/components/sections/SectionHeading";

/* The real pipeline stages from the product — used as the pillar-section rail */
const PIPELINE_STAGES = ["Contacted", "Warm", "Meeting Booked", "Proposal Sent", "Won", "Lost"];

const GROUND_IMG = "linear-gradient(90deg, var(--color-violet), var(--color-apricot))";

/* Follow-up outcome branches — folded in from the removed standalone section */
const OUTCOME_TAGS = [
  { label: "No Answer", tone: "bg-fog text-iron" },
  { label: "Callback", tone: "bg-sky text-sky-900" },
  { label: "Interested", tone: "bg-mint text-green-800" },
  { label: "Meeting Booked", tone: "bg-apricot/20 text-apricot" },
];

const CALL_OUTCOMES = [
  "1 · No Answer",
  "2 · Callback",
  "3 · Gatekeeper",
  "4 · Not Interested",
  "5 · Interested",
];

/* ── Mini visuals (one per pillar) ───────────────────────────── */

function ScraperVisual() {
  return (
    <div aria-hidden="true">
      <div className="flex items-center justify-between text-[11px] text-slate">
        <span>Scraping — search query · target count</span>
        <span className="font-semibold text-violet">72%</span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-pebble/50">
        <div className="h-full w-[72%] rounded-full" style={{ background: GROUND_IMG }} />
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {["Business name", "Phone", "Email", "Website", "Category", "Map link"].map((f) => (
          <span
            key={f}
            className="rounded-full border border-pebble bg-white px-2.5 py-1 text-[11px] font-medium text-slate"
          >
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}

function CallSessionVisual() {
  return (
    <div aria-hidden="true" className="space-y-3">
      <div className="flex items-center justify-between rounded-[14px] border border-pebble bg-canvas px-4 py-3">
        <div>
          <p className="text-[13px] font-medium text-ink">Bright Smile Dental</p>
          <p className="text-[11px] font-light text-slate">Dentist · +91 98…</p>
        </div>
        <span className="rounded-full bg-violet/10 px-2.5 py-1 text-[11px] font-semibold text-violet">
          Hot
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {CALL_OUTCOMES.map((o) => (
          <span
            key={o}
            className="rounded-full border border-pebble bg-white px-2.5 py-1 text-[11px] font-medium text-slate"
          >
            {o}
          </span>
        ))}
      </div>
    </div>
  );
}

function DirectoryVisual() {
  return (
    <div aria-hidden="true">
      <div className="flex items-center gap-2 rounded-full border border-pebble bg-white px-3.5 py-2 text-[12px] text-iron">
        <MagnifyingGlass size={14} />
        <span>Search 1,240 leads…</span>
      </div>
      <div className="mt-3 space-y-1.5">
        {["Bright Smile Dental", "Vaishali Clinic", "Rapid Repair Works"].map((name, i) => (
          <div
            key={name}
            className={`flex items-center justify-between rounded-[10px] px-3 py-2 text-[12px] ${
              i === 0
                ? "bg-violet/8 font-medium text-ink"
                : "border border-pebble bg-white text-slate"
            }`}
          >
            <span>{name}</span>
            <span className="text-[11px] text-iron">Warm</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FollowUpVisual() {
  return (
    <div aria-hidden="true" className="space-y-3">
      <div className="space-y-1.5">
        {[
          "Call Sharma Dental — today",
          "Re-engage Vaishali Clinic — overdue",
          "Confirm Meet — tomorrow",
        ].map((t) => (
          <div
            key={t}
            className="flex items-center gap-2.5 rounded-[10px] border border-pebble bg-white px-3 py-2 text-[12px] text-slate"
          >
            <CheckIcon size={14} className="shrink-0 text-green-600" />
            {t}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {OUTCOME_TAGS.map((o) => (
          <span
            key={o.label}
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${o.tone}`}
          >
            {o.label}
          </span>
        ))}
        <span className="self-center text-[10px] font-light text-iron">
          → WhatsApp fires the branch
        </span>
      </div>
    </div>
  );
}

function KanbanVisual() {
  return (
    <div aria-hidden="true" className="grid grid-cols-3 gap-2">
      {[
        { label: "Cold", active: false },
        { label: "Warm", active: true },
        { label: "Booked", active: false },
      ].map((c) => (
        <div key={c.label} className="rounded-[14px] border border-pebble bg-canvas p-2.5">
          <p className="text-center text-[10px] font-semibold uppercase tracking-wider text-iron">
            {c.label}
          </p>
          <div
            className={`mt-2 flex h-10 items-center justify-between rounded-[8px] px-2 ${
              c.active ? "bg-violet" : "border border-pebble bg-white"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${c.active ? "bg-white" : "bg-pebble"}`} />
            <span
              className={`h-1.5 w-1.5 rounded-full ${c.active ? "bg-white/60" : "bg-pebble"}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function MeetVisual() {
  return (
    <div aria-hidden="true" className="space-y-3">
      <div className="grid grid-cols-7 gap-1">
        {["5", "6", "7", "8", "9", "10", "11"].map((day, i) => (
          <div
            key={day}
            className={`flex h-7 items-center justify-center rounded-[6px] text-[10px] ${
              i === 3
                ? "bg-violet font-semibold text-white"
                : "border border-pebble bg-white text-slate"
            }`}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between rounded-[10px] bg-mint px-3 py-2 text-[11px] font-medium text-green-800">
        Meet link created
        <CheckIcon size={14} />
      </div>
    </div>
  );
}

function WhatsAppVisual() {
  return (
    <div aria-hidden="true" className="flex justify-start rounded-[14px] bg-sky/20 p-3.5">
      <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-pebble bg-white p-3">
        <p className="text-[12px] leading-snug text-ink">
          Hi Rohit! Great talking today — here&apos;s where we can catch up:
        </p>
        <p className="mt-1 truncate text-[11px] font-semibold text-violet">
          meet.google.com/abc-defg-hij
        </p>
      </div>
    </div>
  );
}

function TasksVisual() {
  return (
    <div aria-hidden="true" className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {["All", "Pending", "Completed"].map((f) => (
          <span
            key={f}
            className="rounded-full border border-pebble bg-white px-2.5 py-1 text-[11px] font-medium text-slate"
          >
            {f}
          </span>
        ))}
        <span className="rounded-full bg-apricot/15 px-2.5 py-1 text-[11px] font-semibold text-apricot">
          High Priority
        </span>
      </div>
      <div className="space-y-1.5">
        {[
          {
            label: "High",
            t: "Follow up Sharma Dental",
            due: "Today",
            tone: "bg-apricot text-white",
          },
          {
            label: "Medium",
            t: "Prep pitch for Vaishali Clinic",
            due: "Tomorrow",
            tone: "bg-sky text-sky-900",
          },
          { label: "Low", t: "Refresh stale list", due: "Fri", tone: "bg-mint text-green-800" },
        ].map((r) => (
          <div
            key={r.label}
            className="flex items-center gap-2.5 rounded-[10px] border border-pebble bg-white px-3 py-2 text-[12px] text-slate"
          >
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${r.tone}`}>
              {r.label}
            </span>
            <span className="flex-1 truncate">{r.t}</span>
            <span className="text-[11px] text-iron">{r.due}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Pillar cards ────────────────────────────────────────────── */

type Pillar = {
  title: string;
  text: string;
  icon: FeatureIconName;
  iconBg: string;
  iconColor: string;
  card: string;
  anchorId?: string;
  Visual: ComponentType;
};

const CARD_BASE = "group relative overflow-hidden rounded-[24px] shadow-card";

const PILLARS: Pillar[] = [
  {
    title: "Lead Scraper Engine",
    text: "Find leads without opening ten browser tabs — pull real businesses from Google Maps by area, category, and target count. Name, contact person, phone, email, website, and map link, with duplicates skipped automatically, while a live progress bar fills in the background.",
    icon: "map",
    iconBg: "bg-mint/50",
    iconColor: "text-green-700",
    card: `${CARD_BASE} border border-pebble bg-mint/25`,
    Visual: ScraperVisual,
  },
  {
    title: "Sequential Call Session",
    text: "One lead. One decision. Then the next. A distraction-free queue shows only the lead in front of you, the context beside it, and one-click outcomes. Keys 1–6 log No Answer, Invalid, Gatekeeper, Not Interested, Interested, or Schedule — every call books a meeting, queues a callback, or moves on. Nothing sits in limbo.",
    icon: "phone",
    iconBg: "bg-violet/10",
    iconColor: "text-violet",
    card: `${CARD_BASE} border border-pebble bg-periwinkle/70`,
    anchorId: "calls",
    Visual: CallSessionVisual,
  },
  {
    title: "Lead Directory & 360° Inspector",
    text: "Every prospect, fully visible. Table or card views with instant full-text search, CSV bulk import with column mapping and a validation preview, and a complete notes timeline and activity log for every lead.",
    icon: "sheet",
    iconBg: "bg-sky/40",
    iconColor: "text-sky-700",
    card: `${CARD_BASE} border border-pebble bg-sky/30`,
    Visual: DirectoryVisual,
  },
  {
    title: "Follow-Up Hub",
    text: "Nothing falls through. Overdue, Today, and Upcoming tabs with a step-by-step execution queue, so follow-ups get worked without leaving the screen. Reschedule, escalate, or run the branch that matches how the meeting went — Closed, Ghosted, Follow-up, or Rescheduled.",
    icon: "bell",
    iconBg: "bg-lavender",
    iconColor: "text-ultraviolet",
    card: `${CARD_BASE} border border-pebble bg-lavender/60`,
    Visual: FollowUpVisual,
  },
  {
    title: "Visual Pipeline (Kanban)",
    text: "Watch the deal move. Drag-and-drop across Cold Lead, Warm Prospect, Meeting Booked, Closed Won, and Closed Lost — with live deal counts and total value per stage, so you always know which deals are actually moving.",
    icon: "kanban",
    iconBg: "bg-aqua/50",
    iconColor: "text-cyan-700",
    card: `${CARD_BASE} border border-pebble bg-aqua/35`,
    Visual: KanbanVisual,
  },
  {
    title: "Calendar & Google Meet",
    text: "The meeting books itself. One click creates a real Google Meet link through your calendar, and a full monthly view keeps every callback, meeting, and follow-up in one place.",
    icon: "meet",
    iconBg: "bg-cornflower/30",
    iconColor: "text-blue-700",
    card: `${CARD_BASE} border border-pebble bg-cornflower/25`,
    Visual: MeetVisual,
  },
  {
    title: "WhatsApp Automation",
    text: "Follow-up that sends itself. Phone numbers auto-format to international, and templated messages fire for meeting confirmations, first outreach, and reminders — no copy-pasting, ever.",
    icon: "chat",
    iconBg: "bg-peony/50",
    iconColor: "text-pink-700",
    card: `${CARD_BASE} border-2 border-cotton-candy bg-card`,
    Visual: WhatsAppVisual,
  },
  {
    title: "Task Management",
    text: "The day, ordered. Priority tags for High, Medium, and Low, with filtered views for All, Pending, Completed, and High Priority. Due dates live on specific leads, so nothing important slides.",
    icon: "check",
    iconBg: "bg-periwinkle-wash",
    iconColor: "text-violet",
    card: `${CARD_BASE} border border-pebble bg-peony/60`,
    Visual: TasksVisual,
  },
];

export default function FeatureShowcaseAdine() {
  const v = useVariants();
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="features" className="relative bg-card py-[96px]">
      {/* Soft animated accent background (paused off-screen) */}
      <Ambient className="absolute inset-0 overflow-hidden">
        <DotGrid className="opacity-50" />
      </Ambient>

      <div className="shell relative z-10">
        <SectionHeading
          eyebrow="The Workflow"
          title="From first scrape to booked meeting — one continuous line."
          subtitle="Eight pillars that cover the whole outbound arc — and the workday that keeps it moving."
        />

        {/* Real pipeline stages as a horizontal rail */}
        <motion.div
          variants={v(fadeUp)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          className="mx-auto mt-10 flex max-w-[780px] flex-wrap items-center justify-center gap-2"
        >
          {PIPELINE_STAGES.map((stage, i) => (
            <Fragment key={stage}>
              {i > 0 && <ArrowRight size={14} className="text-iron/50" aria-hidden="true" />}
              <span
                className={`rounded-full px-4 py-1.5 text-[13px] font-medium ${
                  i === 0 ? "bg-violet/10 text-violet" : "border border-pebble bg-white text-iron"
                }`}
              >
                {stage}
              </span>
            </Fragment>
          ))}
        </motion.div>

        <motion.div
          variants={v(staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="mx-auto mt-14 grid max-w-[1080px] grid-cols-1 gap-6 md:grid-cols-2"
        >
          {PILLARS.map(({ title, text, icon, iconBg, iconColor, card, anchorId, Visual }) => (
            <motion.div
              key={title}
              id={anchorId}
              className={`${card} scroll-mt-28`}
              variants={v(fadeUp)}
              {...(!reduce ? { whileHover: { y: -6, transition: { duration: 0.2 } } } : {})}
            >
              {/* hover spotlight */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(320px circle at 0% 0%, rgba(97,97,255,0.07), transparent 70%)",
                }}
                aria-hidden="true"
              />
              <div className="group relative flex items-start gap-4 px-6 pt-6">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] ${iconBg} transition-transform duration-200 group-hover:scale-110`}
                >
                  <AnimatedFeatureIcon name={icon} size={26} className={iconColor} />
                </div>
                <h3 className="mt-1 text-[18px] font-medium leading-snug text-ink">{title}</h3>
              </div>

              <div className="relative px-6 pt-3">
                <p className="text-[14px] font-light leading-[1.65] text-slate">{text}</p>
              </div>

              <div className="relative px-6 pt-5 pb-6">
                <div className="rounded-[16px] border border-pebble bg-white p-4">
                  <Visual />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
