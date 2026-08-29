import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { ArrowRight } from "@phosphor-icons/react";

export default function FinalCTAAdine() {
  return (
    <section id="cta" className="bg-surface-white py-[40px] text-text-primary">
      <div className="shell">
        <div className="mx-auto text-center max-w-[600px]">
          <p className="eyebrow !text-text-secondary">Get started today</p>
          <h2 className="mt-4 text-[clamp(32px,4vw,40px)] leading-[1.15] tracking-[-0.02em] text-text-primary">
            Ready to run cold calling like a pipeline?
          </h2>
          <p className="mx-auto mt-5 max-w-[480px] text-[16px] leading-[1.5] text-text-secondary">
            Sign up for Adine and start your first cold call session in minutes.
          </p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <a
              href="https://adine-crm.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid px-8 py-3.5 font-display text-[16px] tracking-[-0.02em] text-surface-white"
            >
              Open the app
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
