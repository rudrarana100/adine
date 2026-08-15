import { motion } from "framer-motion";
import { PhoneCall, MapPin, ChatCircleText, VideoCamera } from "@phosphor-icons/react";
import { fadeUp, staggerContainer, useVariants } from "@/lib/motion";

const HIGHLIGHTS = [
  {
    Icon: MapPin,
    title: "Leads from Google Maps",
    body: "Pull real business data with name, phone, and the maps link.",
  },
  {
    Icon: PhoneCall,
    title: "Sequential dialing",
    body: "One lead at a time, every call auto-logged as you go.",
  },
  {
    Icon: ChatCircleText,
    title: "WhatsApp follow-ups",
    body: "Confirmations and touches sent the moment you hang up.",
  },
  {
    Icon: VideoCamera,
    title: "Google Meet booking",
    body: "Meeting links generated and added to the calendar.",
  },
];

export default function ProblemStatement() {
  const v = useVariants();
  return (
    <section id="why" className="bg-ash py-[96px]">
      <div className="shell">
        <div className="mx-auto max-w-[640px] text-center">
          <p className="eyebrow !text-ember">Why SalesTracker</p>
          <h2 className="mt-4 text-[clamp(32px,4.2vw,44px)] leading-[1.1] tracking-[-0.02em]">
            Built for the work that actually books meetings.
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-steel">
            The tools outbound reps already use — wired into one clean workflow, so the pipeline
            reads itself and follow-ups never slip.
          </p>
        </div>

        <motion.div
          variants={v(staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {HIGHLIGHTS.map(({ Icon, title, body }) => (
            <motion.article key={title} variants={v(fadeUp)} className="card-premium p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ivory">
                <Icon size={20} className="text-graphite" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-[16px] font-bold tracking-tight text-graphite">{title}</h3>
              <p className="mt-2 text-[14px] leading-[1.6] text-steel">{body}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
