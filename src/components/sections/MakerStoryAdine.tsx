import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

export default function MakerStoryAdine() {
  return (
    <section id="story" className="bg-canvas py-[96px]">
      <div className="shell">
        <div className="mx-auto max-w-[720px] text-center">
          <span className="section-eyebrow">Maker Story</span>
          <h2 className="mt-4 text-[clamp(28px,3.5vw,44px)] font-light leading-[1.15] tracking-[-0.02em] text-ink">
            Built from 150+ real cold calls
          </h2>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto mt-12 max-w-[680px]"
        >
          <div className="card-surface px-8 py-10 md:px-12">
            <div className="space-y-5">
              <p className="text-[17px] font-light leading-[1.7] text-slate">
                After making 150+ cold calls myself, the problem wasn't the dialing — it was
                everything around it. Picking up the phone is the easy part. Logging the call,
                updating the CRM, and remembering who to call back is what drains you.
              </p>
              <p className="text-[17px] font-light leading-[1.7] text-slate">
                That's why outcome logging lives on the number keys. When you're ten calls deep,
                reaching for a dropdown to record "No Answer" breaks your flow. A keypress doesn't.
                It's the single most opinionated decision in Adine, and it came straight from the
                calls.
              </p>
              <p className="text-[17px] font-light leading-[1.7] text-slate">
                Everything else — the single-lead queue, auto next-day retries, and one-tap WhatsApp
                follow-ups — exists for the same reason: to keep your hands close to the phone where
                they belong.
              </p>
              <p className="text-[17px] font-light italic leading-[1.7] text-violet">
                Actually picking up the phone.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
