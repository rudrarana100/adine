import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { fadeUp, staggerContainer, useVariants } from "@/lib/motion";

const PROBLEMS = [
  {
    stat: "Hours wasted copy-pasting leads from Google Maps",
    body: "Reps hand-scrape business data into spreadsheets that go stale the moment they're saved — before a single dial is made.",
  },
  {
    stat: "Calls happen in chaos, not in sequence",
    body: "No one knows who was dialed, who needs a callback, or when. High-intent leads slip through the gaps between tabs and tools.",
  },
  {
    stat: "Follow-ups live in three different apps",
    body: "WhatsApp DMs, calendar invites, and sticky notes. Meetings get missed, warm leads go cold, and pipeline is guesswork.",
  },
];

export default function ProblemStatement() {
  const v = useVariants();

  return (
    <section className="bg-ash py-[80px]">
      <div className="shell grid gap-12 lg:grid-cols-2">
        <h2 className="text-[clamp(30px,4vw,40px)] leading-[1.2] tracking-[-0.02em] text-graphite">
          Your outbound motion
          <br />
          is leaking deals.
        </h2>

        <motion.div
          variants={v(staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col gap-4"
        >
          {PROBLEMS.map((p) => (
            <motion.article
              key={p.stat}
              variants={v(fadeUp)}
              className="rounded-card border-l-[3px] border-ember bg-canvas-white p-6"
            >
              <p className="text-[14px] text-graphite">{p.stat}</p>
              <p className="mt-2 text-[13px] leading-[1.6] text-steel">{p.body}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <p className="font-display mt-12 flex items-center justify-center gap-3 text-[clamp(24px,3vw,32px)] tracking-[-0.02em] text-graphite">
        SalesTracker runs the whole motion for you.
        <ArrowRight size={28} color="var(--color-ember)" aria-hidden="true" />
      </p>
    </section>
  );
}
