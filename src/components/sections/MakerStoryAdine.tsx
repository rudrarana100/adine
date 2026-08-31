import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

export default function MakerStoryAdine() {
  return (
    <section id="why" className="bg-card py-[96px]">
      <div className="shell">
        <div className="mx-auto max-w-[720px] text-center">
          <span className="section-eyebrow">Why Adine</span>
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
          <div className="card-surface px-8 py-10 md:px-12 md:py-12">
            <div className="space-y-5 text-center">
              <p className="text-[17px] font-light leading-[1.7] text-slate">
                Adine was born out of a simple problem: cold calling tools are designed for
                compliance, not for connection. After making 150+ cold calls myself, I realized the
                tools we use actively make the job harder.
              </p>
              <p className="text-[17px] font-light leading-[1.7] text-slate">
                So I built Adine to be different. A CRM that actually works for the person holding
                the phone. Auto-logging means you never miss a detail. Cold call sessions mean you
                can start dialing in seconds, not minutes. And because it's built for high-volume
                founders and solo salespeople, it stays out of your way so you can focus on what
                matters.
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
