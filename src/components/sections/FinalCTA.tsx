import { MapPin, PhoneCall, VideoCamera, ChatCircleText } from "@phosphor-icons/react";

const BADGES = [
  { icon: MapPin, label: "Google Maps scraping" },
  { icon: PhoneCall, label: "Power dialing" },
  { icon: VideoCamera, label: "Google Meet built-in" },
  { icon: ChatCircleText, label: "WhatsApp dispatch" },
];

export default function FinalCTA() {
  return (
    <section id="demo" className="bg-ivory py-[80px]">
      <div className="shell text-center">
        <h2 className="mx-auto max-w-[680px] text-[clamp(30px,4.4vw,48px)] leading-[1.15] tracking-[-0.02em] text-graphite">
          Stop losing deals to follow-up fatigue.
        </h2>
        <p className="mx-auto mt-4 max-w-[520px] text-[18px] leading-[1.5] text-steel">
          Scrape, dial, book, and follow up — run your entire outbound motion from one screen. Setup
          takes under an hour.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="#top" className="btn-solid !px-7 !py-3.5">
            Start dialing free
          </a>
          <a href="#tour" className="btn-ghost !px-7 !py-3.5">
            Try the live demo
          </a>
        </div>

        <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3">
          {BADGES.map((b) => (
            <li key={b.label} className="flex items-center gap-2 text-[12px] text-slate">
              <b.icon size={16} color="var(--color-graphite)" aria-hidden="true" />
              {b.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
