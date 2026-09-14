import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { fadeUp, useVariants } from "@/lib/motion";

const APP_URL = "https://adine-crm.vercel.app/";

/* Small centered "Start Free" pill band — the one label every conversion
   point on the page uses, never varied across instances. */
export default function StartFreeCta() {
  const v = useVariants();

  return (
    <div className="bg-canvas pb-[80px]">
      <div className="shell">
        <motion.div
          variants={v(fadeUp)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="flex justify-center"
        >
          <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="btn-pill">
            Start Free
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
