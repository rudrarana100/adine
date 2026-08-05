import { ShieldCheck } from "@phosphor-icons/react";

const BADGES = ["SOC 2 Type II", "GDPR Compliant", "ISO 27001 Aligned", "99.9% Uptime"];

export default function FinalCTA() {
  return (
    <section id="demo" className="bg-ivory py-[80px]">
      <div className="shell text-center">
        <h2 className="mx-auto max-w-[640px] text-[clamp(30px,4.4vw,48px)] leading-[1.15] tracking-[-0.02em] text-graphite">
          Your pipeline has a leak. Let&apos;s fix it today.
        </h2>
        <p className="mx-auto mt-4 max-w-[520px] text-[18px] leading-[1.5] text-steel">
          Join 10,000+ B2B teams using SalesTracker CRM. Setup takes 4 hours. ROI shows in 90 days.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="#demo" className="btn-solid !px-7 !py-3.5">
            Start free — no card needed
          </a>
          <a href="#demo" className="btn-ghost !px-7 !py-3.5">
            Request a live demo
          </a>
        </div>

        <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3">
          {BADGES.map((b) => (
            <li key={b} className="flex items-center gap-2 text-[12px] text-slate">
              <ShieldCheck size={16} color="var(--color-graphite)" aria-hidden="true" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
