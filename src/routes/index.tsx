import { createFileRoute } from "@tanstack/react-router";
import NavBar from "@/components/layout/NavBarAdine";
import FooterAdine from "@/components/layout/FooterAdine";
import HeroAdine from "@/components/sections/HeroAdine";
import ProblemStatementAdine from "@/components/sections/ProblemStatementAdine";
import HowItWorksAdine from "@/components/sections/HowItWorksAdine";
import ContrastAdine from "@/components/sections/ContrastAdine";
import FeatureShowcaseAdine from "@/components/sections/FeatureShowcaseAdine";
import AnalyticsAdine from "@/components/sections/AnalyticsAdine";
import PricingAdine from "@/components/sections/PricingAdine";
import FAQAdine from "@/components/sections/FAQAdine";
import FinalCTAAdine from "@/components/sections/FinalCTAAdine";
import {
  FAQ_ITEMS,
  faqSchema,
  howToSchema,
  orgSchema,
  softwareSchema,
  webSiteSchema,
  SITE_URL,
} from "@/lib/schema";

const TITLE = "Adine — Outbound CRM for high-volume cold calling";
const DESCRIPTION =
  "Adine is an outbound CRM for high-volume cold calling. Lead import and search, sequential call sessions, one-keypress outcome logging, and automatic WhatsApp and Google Meet follow-ups.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "outbound CRM, cold calling software, lead management, power dialer, WhatsApp follow-ups, Google Meet booking, sales CRM for founders",
      },
      { property: "og:title", content: "Adine — Outbound CRM for high-volume cold calling" },
      {
        property: "og:description",
        content: DESCRIPTION,
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:site_name", content: "Adine" },
      { property: "og:image", content: `${SITE_URL}/og.png` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Adine — outbound CRM for high-volume cold calling" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Adine — Outbound CRM for high-volume cold calling" },
      { name: "twitter:image", content: `${SITE_URL}/og.png` },
      {
        name: "twitter:description",
        content: DESCRIPTION,
      },
      { name: "robots", content: "index, follow, max-image-preview:large, max-video-preview:-1" },
      { name: "theme-color", content: "#6161ff" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(softwareSchema) },
      { type: "application/ld+json", children: JSON.stringify(orgSchema) },
      { type: "application/ld+json", children: JSON.stringify(webSiteSchema) },
      { type: "application/ld+json", children: JSON.stringify(faqSchema) },
      { type: "application/ld+json", children: JSON.stringify(howToSchema) },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-canvas">
      <NavBar />
      <main id="main">
        <HeroAdine />
        <ProblemStatementAdine />
        <HowItWorksAdine />
        <ContrastAdine />
        <FeatureShowcaseAdine />
        <AnalyticsAdine />
        <PricingAdine />
        <FAQAdine />
        <FinalCTAAdine />
      </main>
      <FooterAdine />
    </div>
  );
}
