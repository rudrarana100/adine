import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer, useVariants } from "@/lib/motion";
import {
  MapPinIcon,
  PhoneIcon,
  CalendarMeetIcon,
  ChatIcon,
  SheetIcon,
  BellIcon,
  KanbanIcon,
  ChartIcon,
  CommandIcon,
} from "@/components/icons/FeatureIcons";

const FEATURES = [
  {
    title: "Google Maps Lead Scraping",
    text: "Scrape verified business leads by category and city with a live progress bar, then import straight into a collection.",
    Icon: MapPinIcon,
    wash: "bg-mint/20",
    iconBg: "bg-mint/40",
    iconColor: "text-green-700",
  },
  {
    title: "Call Session Queue",
    text: "A single-lead-at-a-time dialing flow built for volume, with quick actions and keyboard-driven outcomes.",
    Icon: PhoneIcon,
    wash: "bg-sky/20",
    iconBg: "bg-sky/30",
    iconColor: "text-sky-700",
  },
  {
    title: "One-Click Google Meet",
    text: "Book a real Google Calendar meeting and auto-send the confirmation over WhatsApp — no copy-pasting.",
    Icon: CalendarMeetIcon,
    wash: "bg-lavender/30",
    iconBg: "bg-lavender/50",
    iconColor: "text-ultraviolet",
  },
  {
    title: "Smart CSV Import",
    text: "Column auto-mapping, phone de-duplication, and chunked import so messy spreadsheets become clean lead lists.",
    Icon: SheetIcon,
    wash: "bg-periwinkle/50",
    iconBg: "bg-violet/10",
    iconColor: "text-violet",
  },
  {
    title: "Follow-up Queue",
    text: "Overdue, today, tomorrow, upcoming — sorted automatically with one-click complete, reschedule, or skip.",
    Icon: BellIcon,
    wash: "bg-aqua/30",
    iconBg: "bg-aqua/40",
    iconColor: "text-cyan-700",
  },
  {
    title: "Pipeline Kanban",
    text: "Six drag-and-drop stages from Contacted to Won, with optimistic updates so the board never feels laggy.",
    Icon: KanbanIcon,
    wash: "bg-cornflower/20",
    iconBg: "bg-cornflower/30",
    iconColor: "text-blue-700",
  },
  {
    title: "Call Analytics",
    text: "Daily goal tracking, a 90-day call heatmap, peak-hour analysis, and a live conversion funnel.",
    Icon: ChartIcon,
    wash: "bg-peony/30",
    iconBg: "bg-peony/40",
    iconColor: "text-pink-700",
  },
  {
    title: "Command Palette (⌘K)",
    text: "Jump to any lead or page without touching the mouse — open a lead, start a session, or search in a keystroke.",
    Icon: CommandIcon,
    wash: "bg-periwinkle/40",
    iconBg: "bg-violet/10",
    iconColor: "text-violet",
  },
];

export default function FeatureShowcaseAdine() {
  const v = useVariants();
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="features" className="bg-card py-[96px]">
      <div className="shell">
        <div className="mx-auto max-w-[720px] text-center">
          <span className="section-eyebrow">Features</span>
          <h2 className="mt-4 text-[clamp(28px,3.5vw,44px)] font-light leading-[1.15] tracking-[-0.02em] text-ink">
            Everything the phone workday needs
          </h2>
          <p className="mt-4 text-[17px] font-light leading-[1.6] text-slate">
            Scrape, dial, log, book, and follow up — each step backed by a dedicated, fast-click
            feature.
          </p>
        </div>

        <motion.div
          variants={v(staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mx-auto mt-16 grid max-w-[1080px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {FEATURES.map(({ title, text, Icon, wash, iconBg, iconColor }) => (
            <motion.div
              key={title}
              variants={v(fadeUp)}
              {...(!reduce ? { whileHover: { y: -6, transition: { duration: 0.2 } } } : {})}
              className="card-surface group overflow-hidden"
            >
              <div className={`${wash} flex items-center justify-center py-8`}>
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-[20px] ${iconBg} transition-transform duration-200 group-hover:scale-110`}
                >
                  <Icon size={30} className={iconColor} />
                </div>
              </div>
              <div className="px-5 py-5">
                <h3 className="text-[16px] font-medium text-ink">{title}</h3>
                <p className="mt-2 text-[14px] font-light leading-[1.6] text-slate">{text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
