import { createFileRoute } from "@tanstack/react-router";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import LogoStrip from "@/components/sections/LogoStrip";
import ProblemStatement from "@/components/sections/ProblemStatement";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import { faqSchema, howToSchema, orgSchema, softwareSchema } from "@/lib/schema";

const TITLE = "SalesTracker — Outbound B2B Sales Execution & CRM Platform";
const DESCRIPTION =
  "SalesTracker is an outbound B2B sales execution and CRM platform for SDRs, business development managers, and high-velocity sales teams. Scrape leads from Google Maps, power-dial them sequentially, send WhatsApp follow-ups, book Google Meets, and track your pipeline — all in one dashboard.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "outbound sales CRM, power dialer software, Google Maps lead scraper, lead generation software, WhatsApp sales messaging, Google Meet booking, appointment setting software, B2B sales pipeline, sales analytics, SDR outreach tool, sales automation platform, outbound sales execution",
      },
      { property: "og:title", content: "SalesTracker — Outbound B2B Sales Execution Platform" },
      {
        property: "og:description",
        content:
          "Scrape leads from Google Maps, power-dial them sequentially, dispatch WhatsApp follow-ups, and book Google Meets — all in one platform.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "SalesTracker" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "SalesTracker — Outbound B2B Sales Execution Platform" },
      {
        name: "twitter:description",
        content:
          "Google Maps lead scraping, power dialing, WhatsApp dispatch, and Google Meet booking in one platform.",
      },
      { name: "robots", content: "index, follow, max-image-preview:large, max-video-preview:-1" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(softwareSchema) },
      { type: "application/ld+json", children: JSON.stringify(orgSchema) },
      { type: "application/ld+json", children: JSON.stringify(faqSchema) },
      { type: "application/ld+json", children: JSON.stringify(howToSchema) },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-canvas-white">
      <a
        href="#main"
        className="btn-solid sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60]"
      >
        Skip to main content
      </a>
      <NavBar />
      <main id="main">
        <Hero />
        <LogoStrip />
        <ProblemStatement />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
