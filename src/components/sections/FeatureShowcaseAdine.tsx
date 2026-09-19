import { Fragment, useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { DotGrid } from "@/components/backgrounds/AnimatedBackgrounds";
import { Ambient } from "@/components/backgrounds/Ambient";
import { fadeUp, useVariants } from "@/lib/motion";
import SectionHeading from "@/components/sections/SectionHeading";

const PIPELINE_STAGES = ["Contacted", "Warm", "Meeting Booked", "Proposal Sent", "Won", "Lost"];
const DESKTOP_MQ = "(min-width: 1024px)";

type WorkflowItem = {
  title: string;
  eyebrow: string;
  caption: string;
  image: string;
  alt: string;
  accent: string;
  inset?: string;
};

const WORKFLOW_ITEMS: WorkflowItem[] = [
  {
    title: "Leads Directory",
    eyebrow: "01 — LEADS DIRECTORY",
    caption: "Every prospect, searchable and ready.",
    image: "/screenshots/workflow/lead-directory.png",
    inset: "/screenshots/workflow/lead-scraper.png",
    alt: "Adine Leads Directory with searchable lead records",
    accent: "#6161ff",
  },
  {
    title: "Call Session",
    eyebrow: "02 — CALL SESSION",
    caption: "One lead. One decision. Then the next.",
    image: "/screenshots/workflow/call-session.png",
    alt: "Adine Call Session with lead details and outcome controls",
    accent: "#9450fd",
  },
  {
    title: "Follow-ups",
    eyebrow: "03 — FOLLOW-UPS",
    caption: "Turn every conversation into the next action.",
    image: "/screenshots/workflow/follow-ups.png",
    alt: "Adine Follow-ups view with scheduled actions",
    accent: "#7c6cff",
  },
  {
    title: "Sales Pipeline",
    eyebrow: "04 — SALES PIPELINE",
    caption: "Move deals from contact to closed won.",
    image: "/screenshots/workflow/sales-pipeline.png",
    alt: "Adine Sales Pipeline Kanban board",
    accent: "#5f7eff",
  },
  {
    title: "Tasks",
    eyebrow: "05 — TASKS",
    caption: "Keep the day ordered around what matters.",
    image: "/screenshots/workflow/tasks.png",
    alt: "Adine Tasks view with priorities and due dates",
    accent: "#7767ff",
  },
  {
    title: "Calendar",
    eyebrow: "06 — CALENDAR",
    caption: "Calls, meetings, and follow-ups in one view.",
    image: "/screenshots/workflow/calendar.png",
    alt: "Adine Calendar with scheduled calls and meetings",
    accent: "#668dff",
  },
  {
    title: "Analytics",
    eyebrow: "07 — ANALYTICS",
    caption: "See the activity that turns into revenue.",
    image: "/screenshots/workflow/analytics.png",
    alt: "Adine Sales Analytics and Performance Dashboard",
    accent: "#6161ff",
  },
];

function useIsDesktop() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(DESKTOP_MQ);
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia(DESKTOP_MQ).matches,
    () => false,
  );
}

function WorkflowCard({
  item,
  index,
  cardRef,
  reduce,
  progress,
  widthClass = "w-[min(760px,calc(100vw-72px))]",
}: {
  item: WorkflowItem;
  index: number;
  cardRef?: (node: HTMLDivElement | null) => void;
  reduce: boolean;
  progress?: number;
  widthClass?: string;
}) {
  const focused = progress === undefined || Math.abs(index - progress) < 0.4;
  return (
    <article className={`relative flex ${widthClass} shrink-0 snap-center flex-col items-center`}>
      <div
        ref={cardRef}
        className={`relative w-full will-change-transform ${focused && !reduce ? "workflow-card-float" : ""}`}
        style={{ transformOrigin: "center center" }}
      >
        <img
          src={item.image}
          alt={item.alt}
          className="block h-auto w-full select-none"
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          draggable="false"
        />
        {item.inset && (
          <div className="absolute bottom-4 right-4 w-[25%] overflow-hidden rounded-[8px] shadow-elevated">
            <img
              src={item.inset}
              alt="Lead Scraper opened from the Leads Directory"
              className="block h-auto w-full"
              loading="lazy"
              decoding="async"
              draggable="false"
            />
          </div>
        )}
      </div>

      <div className="mt-3 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-violet">
          {item.eyebrow}
        </p>
        <p className="mt-1 text-[14px] font-light text-slate">{item.caption}</p>
      </div>
    </article>
  );
}

function ProgressDots({ progress }: { progress: number }) {
  const activeIndex = Math.round(progress * (WORKFLOW_ITEMS.length - 1));
  return (
    <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/80 bg-white/80 px-3 py-2 shadow-card backdrop-blur-md">
      {WORKFLOW_ITEMS.map((item, index) => (
        <span
          key={item.title}
          className="block h-1.5 rounded-full bg-violet"
          style={{
            width: index === activeIndex ? 22 : 6,
            opacity: index === activeIndex ? 1 : 0.32,
          }}
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">
        Step {activeIndex + 1} of {WORKFLOW_ITEMS.length}: {WORKFLOW_ITEMS[activeIndex]?.title}
      </span>
    </div>
  );
}

function DesktopWorkflowShowcase() {
  const reduce = useReducedMotion() ?? false;
  const isDesktop = useIsDesktop();
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isDesktop) return;
    const section = sectionRef.current;
    const stage = stageRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !stage || !viewport || !track) return;

    const context = gsap.context(() => {
      const updateCardDepth = (scrollProgress: number) => {
        const focusIndex = scrollProgress * (WORKFLOW_ITEMS.length - 1);
        cardRefs.current.forEach((card, index) => {
          if (!card) return;
          const distance = Math.abs(index - focusIndex);
          const focus = clamp(1 - distance);
          gsap.set(card, {
            scale: 0.85 + focus * 0.15,
            opacity: 0.5 + focus * 0.5,
            filter: reduce ? "blur(0px)" : `blur(${Math.min(1.5, distance * 1.5)}px)`,
          });
        });
      };

      const horizontalTween = gsap.to(track, {
        x: () => -(track.scrollWidth - viewport.clientWidth),
        ease: "none",
scrollTrigger: {
            trigger: section,
            start: "top 92px",
            end: "bottom bottom",
            scrub: 1,
            pin: stage,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setProgress(self.progress);
              updateCardDepth(self.progress);
              if (!reduce) {
                const wash = stage.querySelector("[data-workflow-wash]");
                if (wash) gsap.set(wash, { xPercent: (self.progress - 0.5) * 16 });
              }
            },
            onRefresh: (self) => updateCardDepth(self.progress),
          },
        });

        updateCardDepth(0);

        const refreshOnLoad = () => ScrollTrigger.refresh();
        window.addEventListener("load", refreshOnLoad);
        const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
        ScrollTrigger.refresh();
        return () => {
          cancelAnimationFrame(raf);
          window.removeEventListener("load", refreshOnLoad);
          horizontalTween.kill();
        };
    }, section);

    return () => context.revert();
  }, [isDesktop, reduce]);

  if (!isDesktop) return null;

  return (
    <div
      ref={sectionRef}
      className="relative hidden lg:block"
      style={{ height: `${WORKFLOW_ITEMS.length * 100}svh` }}
    >
      <div
        ref={stageRef}
        className="relative flex h-[calc(100svh-92px)] w-full flex-col items-center overflow-hidden"
      >
        <div
          data-workflow-wash
          className="pointer-events-none absolute inset-[-18%] opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 25% 50%, rgba(97,97,255,.14), transparent 30%), radial-gradient(circle at 78% 42%, rgba(189,254,144,.11), transparent 27%), radial-gradient(circle at 52% 80%, rgba(147,190,255,.12), transparent 32%)",
          }}
          aria-hidden="true"
        />

        <div
          ref={viewportRef}
          className="relative z-10 mt-10 w-full flex-1 min-h-0 overflow-hidden px-6 pb-4"
        >
          <div
            ref={trackRef}
            className="flex w-max items-start gap-8 px-[max(24px,calc((100vw-min(760px,calc(100vw-72px)))/2))]"
          >
            {WORKFLOW_ITEMS.map((item, index) => (
              <WorkflowCard
                key={item.title}
                item={item}
                index={index}
                reduce={reduce}
                progress={progress * (WORKFLOW_ITEMS.length - 1)}
                widthClass="w-[min(860px,calc((100svh-200px)*1.5),calc(100vw-72px))]"
                cardRef={(node) => {
                  cardRefs.current[index] = node;
                }}
              />
            ))}
          </div>
        </div>

        <ProgressDots progress={progress} />
      </div>
    </div>
  );
}

function MobileWorkflowCarousel() {
  const reduce = useReducedMotion() ?? false;
  return (
    <div className="-mx-6 overflow-x-auto overscroll-x-contain px-6 pb-4 [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max items-start gap-6">
        {WORKFLOW_ITEMS.map((item, index) => (
          <WorkflowCard key={item.title} item={item} index={index} reduce={reduce} />
        ))}
      </div>
    </div>
  );
}

export default function FeatureShowcaseAdine() {
  const v = useVariants();

  return (
    <section id="features" className="relative bg-card py-[96px]">
      <Ambient className="absolute inset-0 overflow-hidden">
        <DotGrid className="opacity-50" />
      </Ambient>

      <div className="shell relative z-10">
        <SectionHeading
          eyebrow="The Workflow"
          title="From first lead to booked meeting — one continuous line."
          subtitle="Eight pillars that cover the whole outbound arc — and the workday that keeps it moving."
        />

        <motion.div
          variants={v(fadeUp)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          className="mx-auto mt-10 flex max-w-[780px] flex-wrap items-center justify-center gap-2 lg:hidden"
        >
          {PIPELINE_STAGES.map((stage, i) => (
            <Fragment key={stage}>
              {i > 0 && <ArrowRight size={14} className="text-iron/50" aria-hidden="true" />}
              <span
                className={`rounded-full px-4 py-1.5 text-[13px] font-medium ${
                  i === 0 ? "bg-violet/10 text-violet" : "border border-pebble bg-white text-iron"
                }`}
              >
                {stage}
              </span>
            </Fragment>
          ))}
        </motion.div>

        <div className="mx-auto mt-20 lg:hidden">
          <MobileWorkflowCarousel />
        </div>
      </div>

      <DesktopWorkflowShowcase />
    </section>
  );
}
