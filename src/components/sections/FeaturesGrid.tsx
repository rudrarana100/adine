import { motion } from "framer-motion";
import {
  PhoneCall,
  MapPin,
  Database,
  ClockCounterClockwise,
  Kanban,
  CalendarCheck,
  ChatCircleText,
  ChartLineUp,
  CheckSquare,
  UserCircleGear,
  Moon,
} from "@phosphor-icons/react";
import { fadeUp, staggerContainer, useVariants } from "@/lib/motion";

const STATUS_BADGES = ["Warm", "Hot", "Qualified", "Meeting Booked"];

function DialingVisual() {
  const queue = [
    { name: "Rahul M.", state: "Connected", active: false },
    { name: "Sarah C.", state: "Next", active: true },
    { name: "Marcus W.", state: "Queued", active: false },
    { name: "Priya N.", state: "Queued", active: false },
  ];
  return (
    <div className="mt-6 space-y-2">
      {queue.map((q) => (
        <div
          key={q.name}
          className={`flex items-center justify-between rounded-sm px-3 py-2 text-[13px] ${
            q.active ? "bg-canvas-white ring-1 ring-ember" : "bg-canvas-white"
          }`}
        >
          <span className="text-graphite">{q.name}</span>
          <span
            className={`rounded-2xl px-2 py-[2px] text-[11px] ${
              q.state === "Connected"
                ? "bg-ember text-canvas-white"
                : q.state === "Next"
                  ? "bg-ivory text-brass"
                  : "bg-mist text-steel"
            }`}
          >
            {q.state}
          </span>
        </div>
      ))}
    </div>
  );
}

function ScraperVisual() {
  const fields = ["Business name", "Phone", "Email", "Website", "Category", "Maps link"];
  return (
    <div className="mt-6 flex flex-wrap gap-1.5">
      {fields.map((f) => (
        <span
          key={f}
          className="rounded-sm bg-canvas-white px-2.5 py-1.5 text-[12px] text-graphite"
        >
          {f}
        </span>
      ))}
      <span className="rounded-sm bg-ember px-2.5 py-1.5 text-[12px] text-canvas-white">
        1,240 leads
      </span>
    </div>
  );
}

function TimelineVisual() {
  return (
    <div className="mt-6 rounded-sm bg-canvas-white p-3">
      <p className="font-display text-[13px] tracking-[-0.02em] text-graphite">Activity log</p>
      <ul className="mt-2 space-y-1.5 text-[12px] text-steel">
        <li>10:42 · Call connected — 4m 12s</li>
        <li>10:47 · Status → Warm</li>
        <li>10:48 · WhatsApp follow-up sent</li>
      </ul>
    </div>
  );
}

function FollowUpVisual() {
  return (
    <div className="mt-6 flex gap-2">
      {[
        { label: "Overdue", n: 3, tone: "bg-ember text-canvas-white" },
        { label: "Today", n: 5, tone: "bg-ivory text-brass" },
        { label: "Upcoming", n: 12, tone: "bg-mist text-steel" },
      ].map((t) => (
        <div key={t.label} className="flex-1 rounded-sm bg-canvas-white p-3 text-center">
          <p className={`inline-block rounded-2xl px-2 py-[2px] text-[11px] ${t.tone}`}>{t.n}</p>
          <p className="mt-2 text-[11px] text-slate">{t.label}</p>
        </div>
      ))}
    </div>
  );
}

function MeetVisual() {
  return (
    <div className="mt-6 rounded-sm bg-canvas-white p-3">
      <p className="font-display text-[13px] tracking-[-0.02em] text-graphite">
        meet.google.com/abc-xyz
      </p>
      <p className="mt-1 text-[12px] text-slate">Thu 9:30 AM · 45 min · Google Calendar</p>
    </div>
  );
}

function WhatsAppVisual() {
  return (
    <div className="mt-6 rounded-sm bg-canvas-white p-3">
      <p className="font-display text-[13px] tracking-[-0.02em] text-graphite">Message preview</p>
      <p className="mt-1 rounded-sm bg-fog p-2 text-[12px] leading-[1.5] text-steel">
        Hi Rahul, here&apos;s your meeting link for Thursday 9:30 AM…
      </p>
      <p className="mt-2 text-[11px] text-slate">+91 98204 55123 → formatted automatically</p>
    </div>
  );
}

function TasksVisual() {
  return (
    <div className="mt-6 space-y-2">
      {[
        { label: "Call Meridian follow-up", tone: "bg-ember text-canvas-white" },
        { label: "Send deck to Coralth", tone: "bg-ivory text-brass" },
        { label: "Log Paravox meeting", tone: "bg-mist text-steel" },
      ].map((t) => (
        <div key={t.label} className="flex items-center gap-2 rounded-sm bg-canvas-white p-2.5">
          <span className={`h-2 w-2 rounded-full ${t.tone.split(" ")[0]}`} aria-hidden="true" />
          <span className="text-[12px] text-graphite">{t.label}</span>
        </div>
      ))}
    </div>
  );
}

function PipelineVisual() {
  const cols = [
    { name: "Cold", n: 4, active: false },
    { name: "Warm", n: 3, active: true },
    { name: "Meet", n: 2, active: false },
    { name: "Won", n: 1, active: false },
  ];
  return (
    <div className="mt-6 grid grid-cols-4 gap-2">
      {cols.map((c) => (
        <div
          key={c.name}
          className={`rounded-sm p-2.5 ${c.active ? "bg-canvas-white ring-1 ring-ember" : "bg-canvas-white"}`}
        >
          <p className="text-[11px] tracking-[0.04em] text-slate uppercase">{c.name}</p>
          <p className="font-display mt-1 text-[18px] leading-none tracking-[-0.02em]">{c.n}</p>
        </div>
      ))}
    </div>
  );
}

const FEATURES = [
  {
    icon: PhoneCall,
    title: "Sequential power dialing",
    body: "Cold leads present one at a time. Call, mark interested, book a Google Meet, or skip — every action advances the queue automatically.",
    visual: <DialingVisual />,
    wide: true,
  },
  {
    icon: MapPin,
    title: "Google Maps lead scraper",
    body: "Scrape real business data by query, location, and target count in the background — name, phone, email, website, category, and maps link.",
    visual: <ScraperVisual />,
    wide: true,
  },
  {
    icon: Database,
    title: "Lead directory & 360° inspector",
    body: "Search every prospect across name, phone, and email. Open any record to see notes, activity, and status at a glance.",
    visual: <TimelineVisual />,
    wide: false,
  },
  {
    icon: ClockCounterClockwise,
    title: "Guided follow-up hub",
    body: "Overdue, today, and upcoming touchpoints in one queue. Complete, reschedule, or escalate without leaving the screen.",
    visual: <FollowUpVisual />,
    wide: false,
  },
  {
    icon: Kanban,
    title: "Visual deal pipeline",
    body: "Drag deals across stages from Cold to Closed Won. See counts and value per column, plus conversion health.",
    visual: <PipelineVisual />,
    wide: false,
  },
  {
    icon: CalendarCheck,
    title: "Google Meet + Calendar",
    body: "Generate official Google Meet links via Google Calendar API. See every callback and meeting on a monthly calendar view.",
    visual: <MeetVisual />,
    wide: false,
  },
  {
    icon: ChatCircleText,
    title: "WhatsApp messaging",
    body: "Local numbers auto-format to international. Send pre-built meeting confirmations and follow-up templates with one tap.",
    visual: <WhatsAppVisual />,
    wide: false,
  },
  {
    icon: ChartLineUp,
    title: "Sales analytics",
    body: "Call outcomes, conversion trends, activity volume, and pipeline distribution — all rendered in real time.",
    visual: null,
    wide: false,
  },
  {
    icon: CheckSquare,
    title: "Task management",
    body: "Tag tasks high, medium, or low. Filter by pending, completed, or priority, and tie every task to a specific lead.",
    visual: <TasksVisual />,
    wide: false,
  },
];

export default function FeaturesGrid() {
  const v = useVariants();

  return (
    <section id="features" className="bg-canvas-white py-[80px]">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-end">
          <div>
            <p className="eyebrow">Platform capabilities</p>
            <h2 className="mt-3 text-[clamp(30px,4vw,40px)] leading-[1.2] tracking-[-0.02em]">
              Everything an outbound team needs.
              <br />
              Nothing it doesn&apos;t.
            </h2>
          </div>
          <p className="max-w-[440px] text-[15px] leading-[1.6] text-steel lg:justify-self-end">
            Ten tightly-integrated modules, one workflow: scrape, dial, book, follow up, and track —
            without switching apps.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-1.5">
          {STATUS_BADGES.map((s, i) => (
            <span
              key={s}
              className={`rounded-2xl px-3 py-1 text-[12px] ${
                i === 1
                  ? "bg-ember text-canvas-white"
                  : i === 3
                    ? "bg-graphite text-canvas-white"
                    : "bg-fog text-steel"
              }`}
            >
              {s}
            </span>
          ))}
          <span className="flex items-center gap-1.5 rounded-2xl bg-ivory px-3 py-1 text-[12px] text-brass">
            <UserCircleGear size={13} aria-hidden="true" /> 360° lead inspector
          </span>
          <span className="flex items-center gap-1.5 rounded-2xl bg-ivory px-3 py-1 text-[12px] text-brass">
            <Moon size={13} aria-hidden="true" /> Obsidian dark mode
          </span>
        </div>

        <motion.div
          variants={v(staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-8 grid gap-4 lg:grid-cols-3"
        >
          {FEATURES.map((f) => (
            <motion.article
              key={f.title}
              variants={v(fadeUp)}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className={`rounded-data bg-fog p-7 ${f.wide ? "lg:col-span-1" : ""}`}
            >
              <f.icon size={24} weight="thin" aria-hidden="true" />
              <h3 className="mt-4 text-[19px] tracking-[-0.02em]">{f.title}</h3>
              <p className="mt-2.5 text-[14px] leading-[1.6] text-steel">{f.body}</p>
              {f.visual && <div>{f.visual}</div>}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
