import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer, useVariants } from "@/lib/motion";
import { AnimatedFeatureIcon } from "@/components/icons/AnimatedFeatureIcon";
import type { FeatureIconName } from "@/components/icons/FeatureIcons";
import { DotGrid } from "@/components/backgrounds/AnimatedBackgrounds";
import { Ambient } from "@/components/backgrounds/Ambient";
import SectionHeading from "@/components/sections/SectionHeading";

const FEATURES: {
  title: string;
  text: string;
  icon: FeatureIconName;
  wash: string;
  iconBg: string;
  iconColor: string;
}[] = [
  {
    title: "Google Maps Lead Scraping",
    text: "Scrape verified business leads by category and city with a live progress bar, then import straight into a collection.",
    icon: "map",
    wash: "bg-mint/20",
    iconBg: "bg-mint/40",
    iconColor: "text-green-700",
  },
  {
    title: "Call Session Queue",
    text: "A single-lead-at-a-time dialing flow built for volume, with quick actions and keyboard-driven outcomes.",
    icon: "phone",
    wash: "bg-sky/20",
    iconBg: "bg-sky/30",
    iconColor: "text-sky-700",
  },
  {
    title: "One-Click Google Meet",
    text: "Book a real Google Calendar meeting and auto-send the confirmation over WhatsApp — no copy-pasting.",
    icon: "meet",
    wash: "bg-lavender/30",
    iconBg: "bg-lavender/50",
    iconColor: "text-ultraviolet",
  },
  {
    title: "Smart CSV Import",
    text: "Column auto-mapping, phone de-duplication, and chunked import so messy spreadsheets become clean lead lists.",
    icon: "sheet",
    wash: "bg-periwinkle/50",
    iconBg: "bg-violet/10",
    iconColor: "text-violet",
  },
  {
    title: "Follow-up Queue",
    text: "Overdue, today, tomorrow, upcoming — sorted automatically with one-click complete, reschedule, or skip.",
    icon: "bell",
    wash: "bg-aqua/30",
    iconBg: "bg-aqua/40",
    iconColor: "text-cyan-700",
  },
  {
    title: "Pipeline Kanban",
    text: "Six drag-and-drop stages from Contacted to Won, with optimistic updates so the board never feels laggy.",
    icon: "kanban",
    wash: "bg-cornflower/20",
    iconBg: "bg-cornflower/30",
    iconColor: "text-blue-700",
  },
  {
    title: "Call Analytics",
    text: "Daily goal tracking, a 90-day call heatmap, peak-hour analysis, and a live conversion funnel.",
    icon: "chart",
    wash: "bg-peony/30",
    iconBg: "bg-peony/40",
    iconColor: "text-pink-700",
  },
  {
    title: "Command Palette (⌘K)",
    text: "Jump to any lead or page without touching the mouse — open a lead, start a session, or search in a keystroke.",
    icon: "command",
    wash: "bg-periwinkle/40",
    iconBg: "bg-violet/10",
    iconColor: "text-violet",
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
          eyebrow="Features"
          title="Everything the phone workday needs"
          subtitle="Scrape, dial, log, book, and follow up — each step backed by a dedicated, fast-click feature."
        />

        <motion.div
          variants={v(staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mx-auto mt-16 grid max-w-[1080px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {FEATURES.map(({ title, text, icon, wash, iconBg, iconColor }) => (
            <motion.div
              key={title}
              variants={v(fadeUp)}
              {...(!reduce ? { whileHover: { y: -6, transition: { duration: 0.2 } } } : {})}
              className="card-surface group relative overflow-hidden"
            >
              {/* hover spotlight */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(300px circle at 50% 0%, rgba(97,97,255,0.08), transparent 70%)",
                }}
                aria-hidden="true"
              />
              <div className={`${wash} relative flex items-center justify-center py-8`}>
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-[20px] ${iconBg} transition-transform duration-200 group-hover:scale-110`}
                >
                  <AnimatedFeatureIcon name={icon} size={30} className={iconColor} />
                </div>
              </div>
              <div className="relative px-5 py-5">
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
