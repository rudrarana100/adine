import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { fadeUp, staggerContainer, useVariants } from "@/lib/motion";

const PROBLEMS = [
  {
    stat: "62% of deals never enter your CRM",
    body: "Reps work from inboxes and notebooks, so your pipeline is a partial record from day one.",
  },
  {
    stat: "Sales reps spend 31% of their week on data entry",
    body: "That is a day and a half of selling time lost to logging calls, emails, and meetings.",
  },
  {
    stat: "Average CRM data accuracy: 47%",
    body: "Forecasts built on half-true data miss quarter targets they were never able to predict.",
  },
];

export default function ProblemStatement() {
  const v = useVariants();

  return (
    <section className="bg-ash py-[80px]">
      <div className="shell grid gap-12 lg:grid-cols-2">
        <h2 className="text-[clamp(30px,4vw,40px)] leading-[1.2] tracking-[-0.02em] text-graphite">
          Your pipeline is full.
          <br />
          Your forecast is fiction.
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
        SalesTracker fixes all three.
        <ArrowRight size={28} color="var(--color-ember)" aria-hidden="true" />
      </p>
    </section>
  );
}
