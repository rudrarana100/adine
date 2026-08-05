import { createFileRoute } from "@tanstack/react-router";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import LogoStrip from "@/components/sections/LogoStrip";
import ProblemStatement from "@/components/sections/ProblemStatement";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import AnalyticsProof from "@/components/sections/AnalyticsProof";
import DashboardPreview from "@/components/sections/DashboardPreview";
import IntegrationEcosystem from "@/components/sections/IntegrationEcosystem";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import { faqSchema, howToSchema, orgSchema, softwareSchema } from "@/lib/schema";

const TITLE = "SalesTracker CRM — Close Deals 2.4× Faster | B2B Sales Intelligence";
const DESCRIPTION =
  "SalesTracker CRM gives B2B revenue teams AI-powered pipeline visibility, lead scoring, and forecasting. Used by 10,000+ teams. Close deals 2.4× faster. Start free.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "B2B CRM software, sales pipeline management, lead scoring AI, revenue forecasting tool, sales intelligence platform, deal tracking software, CRM for startups, enterprise CRM",
      },
      { property: "og:title", content: "SalesTracker CRM — Close Deals 2.4× Faster" },
      {
        property: "og:description",
        content:
          "AI-powered B2B sales intelligence. Pipeline visibility, lead scoring, and revenue forecasting in one platform.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "SalesTracker CRM" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "SalesTracker CRM — Close Deals 2.4× Faster" },
      {
        name: "twitter:description",
        content: "AI-powered pipeline visibility and lead scoring for B2B revenue teams.",
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
        <FeaturesGrid />
        <AnalyticsProof />
        <DashboardPreview />
        <IntegrationEcosystem />
        <Pricing />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
