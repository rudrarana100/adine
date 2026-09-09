import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer, useVariants } from "@/lib/motion";
import { CalendarMeetIcon, ChatIcon, BellIcon, CheckIcon } from "@/components/icons/FeatureIcons";
import SectionHeading from "@/components/sections/SectionHeading";

const OUTCOMES = [
  { key: "1", label: "No Answer", tone: "bg-carbon/5 text-iron" },
  { key: "2", label: "Invalid Number", tone: "bg-fog/30 text-iron" },
  { key: "3", label: "Gatekeeper / Callback", tone: "bg-peony/30 text-pink-700" },
  { key: "4", label: "Not Interested", tone: "bg-canvas text-slate" },
  { key: "5", label: "Interested", tone: "bg-mint/30 text-green-700" },
  { key: "6", label: "Schedule / Re-engage", tone: "bg-sky/30 text-sky-700" },
];

export default function CallSessionDeepDiveAdine() {
  const v = useVariants();
  const reduce = useReducedMotion() ?? false;
  const hover = !reduce ? { whileHover: { y: -4, transition: { duration: 0.2 } } } : {};

  return (
    <section id="calls" className="bg-canvas py-[96px]">
      <div className="shell">
        <SectionHeading
          eyebrow="The Call Session"
          title="Built for high-volume calling, not admin"
          subtitle="Every call is logged by a keyboard shortcut. Your hands never leave the keys to find a form field."
        />

        {/* Outcome chips with shortcuts */}
        <motion.div
          variants={v(staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mt-14 flex max-w-[820px] flex-wrap items-center justify-center gap-3"
        >
          {OUTCOMES.map((o) => (
            <motion.div
              key={o.key}
              variants={v(fadeUp)}
              {...hover}
              className={`inline-flex items-center gap-2.5 rounded-full border border-pebble bg-card px-4 py-2.5 shadow-card ${o.tone}`}
            >
              <span className="key-chip">{o.key}</span>
              <span className="text-[14px] font-medium">{o.label}</span>
            </motion.div>
          ))}
          <motion.div
            variants={v(fadeUp)}
            {...hover}
            className="inline-flex items-center gap-2.5 rounded-full border border-pebble bg-card px-4 py-2.5 shadow-card text-slate"
          >
            <span className="key-chip">S</span>
            <span className="text-[14px] font-medium">Skip lead</span>
          </motion.div>
        </motion.div>

        {/* "Interested" branch callout */}
        <motion.div
          variants={v(fadeUp)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mt-10 max-w-[820px] text-center"
        >
          <p className="text-[14px] font-medium uppercase tracking-[0.08em] text-iron">
            Pressing 5 — "Interested" — opens the follow-up branches
          </p>
        </motion.div>

        {/* Decision tree: Interested -> WhatsApp / Book Meet / Schedule */}
        <motion.div
          variants={v(staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mt-6 grid max-w-[860px] grid-cols-1 gap-4 md:grid-cols-3"
        >
          {[
            {
              Icon: ChatIcon,
              color: "text-green-700",
              bg: "bg-mint/30",
              title: "WhatsApp",
              text: "Send a one-tap follow-up or appointment confirmation with auto-formatted number.",
            },
            {
              Icon: CalendarMeetIcon,
              color: "text-violet",
              bg: "bg-violet/10",
              title: "Book Google Meet",
              text: "Create a real Google Calendar event with an official meet link and auto-confirm by WhatsApp.",
            },
            {
              Icon: BellIcon,
              color: "text-sky-700",
              bg: "bg-sky/30",
              title: "Schedule follow-up",
              text: "Queue a callback for tomorrow. No-answers auto-schedule a next-day retry too.",
            },
          ].map(({ Icon, color, bg, title, text }) => (
            <motion.div
              key={title}
              variants={v(fadeUp)}
              {...hover}
              className="card-surface flex flex-col items-center p-6 text-center"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-[16px] ${bg} ${color}`}
              >
                <Icon size={24} />
              </div>
              <h3 className="mt-3 text-[15px] font-medium text-ink">{title}</h3>
              <p className="mt-1.5 text-[13.5px] font-light leading-[1.6] text-slate">{text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* No-answer auto-retry note */}
        <motion.div
          variants={v(fadeUp)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          className="mx-auto mt-10 max-w-[720px] rounded-[24px] border border-pebble bg-card px-6 py-6 text-center"
        >
          <p className="flex items-center justify-center gap-2 text-[15px] font-light text-slate">
            <CheckIcon size={18} className="text-green-600" />
            No-answers and gatekeepers are auto-scheduled for a next-day retry — nothing slips.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
