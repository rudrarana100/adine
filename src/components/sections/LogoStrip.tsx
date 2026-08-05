import { useMarquee } from "@/hooks/useMarquee";

const LOGOS = [
  "Meridian",
  "Coralth",
  "Paravox",
  "Tenloft",
  "Brightledge",
  "Vortex",
  "Fenwick",
  "Opacus",
  "Cerida",
  "Runewell",
];

export default function LogoStrip() {
  const trackRef = useMarquee<HTMLDivElement>(28);

  return (
    <section aria-label="Customer logos" className="border-y border-mist bg-canvas-white py-8">
      <p className="font-display text-center text-[13px] tracking-[-0.02em] text-brass">
        Trusted by 10,000+ B2B teams across 60 countries
      </p>
      <div className="mt-6 overflow-hidden">
        <div ref={trackRef} className="flex w-max gap-[60px] pr-[60px]">
          {[...LOGOS, ...LOGOS].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-display text-[16px] font-medium tracking-[-0.02em] whitespace-nowrap text-graphite"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
