import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

export default function MakerStoryAdine() {
  return (
    <section className="bg-surface-white py-[24px]">
      <div className="shell">
        <div className="mx-auto max-w-[720px]">
          <p className="eyebrow !text-text-secondary text-center">Maker Story</p>
          <h2 className="mt-4 text-[clamp(28px,3.5vw,36px)] leading-[1.1] tracking-[-0.02em] text-text-primary text-center">
            Built from 150+ real cold calls
          </h2>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          className="mx-auto max-w-[720px] mt-12 text-text-secondary leading-relaxed text-center"
        >
          <p>
            Adine was born out of a simple problem: cold calling is broken. After making 150+ cold
            calls myself, I realized the tools we use are designed for compliance, not for
            connection. There's no joy in a dashboard that only tracks failure.
          </p>
          <p>
            So I built Adine to be different. A CRM that actually works for the person holding the
            phone. Auto-logging means you never miss a detail. Cold call sessions mean you can start
            dialing in seconds, not minutes. And because it's built for high-volume founders and
            solo salespeople, it stays out of your way so you can focus on what matters — actually
            picking up the phone.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
