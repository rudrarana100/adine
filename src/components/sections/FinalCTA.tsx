import Magnetic from "@/components/Magnetic";

export default function FinalCTA() {
  return (
    <section id="cta" className="bg-graphite py-[112px] text-canvas-white">
      <div className="shell">
        <div className="mx-auto max-w-[720px] text-center">
          <p className="eyebrow !text-canvas-white/60" style={{ color: "var(--color-brass)" }}>
            Get started
          </p>
          <h2 className="mt-5 text-[clamp(34px,4.6vw,52px)] leading-[1.08] tracking-[-0.03em] text-canvas-white">
            Ready to run cold calling like a pipeline?
          </h2>
          <p className="mx-auto mt-5 max-w-[500px] text-[17px] leading-[1.6] text-canvas-white/80">
            Jump into SalesTracker and start working your first dialing session today.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Magnetic>
              <a
                href="https://salestrackercrm.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-md bg-ember px-8 font-display text-[16px] tracking-[-0.02em] text-ember-foreground transition-opacity hover:opacity-90"
              >
                Open the app
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a
                href="#why"
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-md border border-canvas-white/30 px-8 font-display text-[15px] tracking-[-0.02em] text-canvas-white transition-colors hover:bg-canvas-white/10"
              >
                Learn more
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
