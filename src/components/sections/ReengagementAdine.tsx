import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer, useVariants } from "@/lib/motion";
import { ChatIcon } from "@/components/icons/FeatureIcons";
import SectionHeading from "@/components/sections/SectionHeading";

const MEETING_OUTCOMES = [
  { label: "Closed", tone: "bg-mint/30 text-green-700" },
  { label: "Ghosted", tone: "bg-fog/30 text-iron" },
  { label: "Follow-up", tone: "bg-sky/30 text-sky-700" },
  { label: "Rescheduled", tone: "bg-apricot/15 text-apricot" },
];

export default function ReengagementAdine() {
  const v = useVariants();
  const reduce = useReducedMotion() ?? false;
  const hover = !reduce ? { whileHover: { y: -3, transition: { duration: 0.2 } } } : {};

  return (
    <section id="reengage" className="bg-card py-[96px]">
      <div className="shell">
        <SectionHeading
          eyebrow="Never Lost After the First Call"
          title="The follow-up that happens without you"
          subtitle="After a Google Meet, the conversation doesn't end. No matter how it went, the next step is queued and the message is pre-built."
        />

        <motion.div
          variants={v(staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mt-12 max-w-[880px] rounded-[28px] border border-pebble bg-canvas p-6 md:p-10"
        >
          <p className="mb-5 text-center text-[14px] font-semibold uppercase tracking-[0.08em] text-iron">
            Meeting outcome → automatic WhatsApp re-engagement
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MEETING_OUTCOMES.map((o) => (
              <motion.div
                key={o.label}
                variants={v(fadeUp)}
                {...hover}
                className="card-surface flex flex-col items-center p-5 text-center"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full ${o.tone}`}
                >
                  <ChatIcon size={22} />
                </div>
                <p className={`mt-3 text-[15px] font-semibold ${o.tone}`}>{o.label}</p>
                <p className="mt-1 text-[13px] font-light leading-[1.5] text-slate">
                  {o.label === "Closed"
                    ? "Move to Won and log it."
                    : o.label === "Ghosted"
                      ? "Auto-send a gentle re-engagement nudge."
                      : o.label === "Follow-up"
                        ? "Queue the next touch with a pre-built message."
                        : "Push the meet link to the new slot."}
                </p>
              </motion.div>
            ))}
          </div>

          <p className="mt-6 text-center text-[14px] font-light text-slate">
            Every branch sends the right message the moment you log the outcome — no copy-pasting,
            no dropped leads.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
