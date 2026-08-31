import { createFileRoute } from "@tanstack/react-router";
import NavBar from "@/components/layout/NavBarAdine";
import FooterAdine from "@/components/layout/FooterAdine";
import HeroAdine from "@/components/sections/HeroAdine";
import HowItWorksAdine from "@/components/sections/HowItWorksAdine";
import CallSessionDeepDiveAdine from "@/components/sections/CallSessionDeepDiveAdine";
import FeatureShowcaseAdine from "@/components/sections/FeatureShowcaseAdine";
import AnalyticsAdine from "@/components/sections/AnalyticsAdine";
import ReengagementAdine from "@/components/sections/ReengagementAdine";
import MakerStoryAdine from "@/components/sections/MakerStoryAdine";
import FinalCTAAdine from "@/components/sections/FinalCTAAdine";
import { howToSchema, orgSchema, softwareSchema } from "@/lib/schema";

const TITLE = "Adine — Outbound CRM for high-volume cold calling in India";
const DESCRIPTION =
  "Adine is an outbound CRM for high-volume cold calling in India. Google Maps lead scraping, sequential call sessions, one-keypress outcome logging, and automatic WhatsApp and Google Meet follow-ups.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "outbound CRM India, cold calling software, Google Maps lead scraper, power dialer, WhatsApp follow-ups, Google Meet booking, sales CRM for founders",
      },
      { property: "og:title", content: "Adine — Outbound CRM for high-volume cold calling" },
      {
        property: "og:description",
        content: DESCRIPTION,
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:site_name", content: "Adine" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Adine — Outbound CRM for high-volume cold calling" },
      {
        name: "twitter:description",
        content: DESCRIPTION,
      },
      { name: "robots", content: "index, follow, max-image-preview:large, max-video-preview:-1" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(softwareSchema) },
      { type: "application/ld+json", children: JSON.stringify(orgSchema) },
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
        <HowItWorksAdine />
        <CallSessionDeepDiveAdine />
        <FeatureShowcaseAdine />
        <AnalyticsAdine />
        <ReengagementAdine />
        <MakerStoryAdine />
        <FinalCTAAdine />
      </main>
      <FooterAdine />
    </div>
  );
}
