import { motion } from "framer-motion";
import type { SVGProps } from "react";
import { fadeUp, staggerContainer, useVariants } from "@/lib/motion";
import { SheetIcon, ChatIcon } from "@/components/icons/FeatureIcons";

/* Sticky-note icon — the "written on paper, lost by Friday" beat */
function NoteIcon({ size = 26, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" {...props}>
      <path
        d="M5 3.5h12l6 6V24.5H5z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M17 3.5v6h6M9.5 13h9M9.5 17h9M9.5 21h5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const TOOLS: { Icon: typeof SheetIcon; label: string; role: string }[] = [
  { Icon: SheetIcon, label: "Spreadsheet", role: "for your leads" },
  { Icon: NoteIcon, label: "Sticky notes", role: "for your reminders" },
  { Icon: ChatIcon, label: "WhatsApp", role: "for your follow-ups" },
];

export default function ProblemStatementAdine() {
  const v = useVariants();

  return (
    <section className="bg-canvas py-16 sm:py-[80px]">
      <div className="shell">
        <motion.div
          variants={v(staggerContainer)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto max-w-[720px] text-center"
        >
          <motion.span variants={v(fadeUp)} className="section-eyebrow block">
            The Problem
          </motion.span>

          <motion.h2
            variants={v(fadeUp)}
            className="mt-4 text-[clamp(24px,3vw,34px)] font-light leading-[1.25] tracking-[-0.02em] text-ink"
          >
            Your leads live in a spreadsheet. Your follow-ups live in your memory. Neither is
            working.
          </motion.h2>

          <motion.p
            variants={v(fadeUp)}
            className="mx-auto mt-5 max-w-[560px] text-[17px] font-light leading-[1.6] text-slate"
          >
            Missed callbacks. Leads that go cold because nobody remembers to text back. Hours lost
            between an imported list and an actual dial.
          </motion.p>

          <motion.p
            variants={v(fadeUp)}
            className="mt-8 text-[13px] font-medium uppercase tracking-[0.12em] text-iron/50"
          >
            Right now that means juggling three disconnected tools
          </motion.p>

          <motion.ul
            variants={v(fadeUp)}
            className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-12"
          >
            {TOOLS.map(({ Icon, label, role }) => (
              <li key={label} className="flex flex-col items-center gap-2 text-iron/45">
                <Icon size={26} aria-hidden={true} />
                <span className="text-[12px] font-medium text-ink/70">{label}</span>
                <span className="text-[11px] font-light text-iron/60">{role}</span>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
