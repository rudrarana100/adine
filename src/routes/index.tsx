import { createFileRoute } from "@tanstack/react-router";
import NavBar from "@/components/layout/NavBarAdine";
import Footer from "@/components/layout/Footer";
import HeroAdine from "@/components/sections/HeroAdine";
import QuickActionCardsAdine from "@/components/sections/QuickActionCardsAdine";
import HowItWorksAdine from "@/components/sections/HowItWorksAdine";
import FeatureShowcaseAdine from "@/components/sections/FeatureShowcaseAdine";
import MakerStoryAdine from "@/components/sections/MakerStoryAdine";
import FinalCTAAdine from "@/components/sections/FinalCTAAdine";
import { howToSchema, orgSchema, softwareSchema } from "@/lib/schema";

const TITLE = "Adine — Outbound CRM for Agency Founders and Solo Salespeople";
const DESCRIPTION =
  "Adine is an outbound CRM built for agency founders and solo salespeople doing high-volume cold calling. Manage sessions, auto-log calls, and follow up instantly — without the busywork.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "outbound CRM, cold calling software, sales CRM for founders, power dialer, WhatsApp follow-ups, sales automation, outbound sales platform",
      },
      { property: "og:title", content: "Adine — Outbound CRM for Agency Founders" },
      {
        property: "og:description",
        content:
          "Adine is an outbound CRM built for agency founders and solo salespeople doing high-volume cold calling.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:site_name", content: "Adine" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Adine — Outbound CRM for Agency Founders" },
      {
        name: "twitter:description",
        content:
          "Adine outbound CRM for high-volume cold calling, agency founders, solo salespeople.",
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
        <QuickActionCardsAdine />
        <HowItWorksAdine />
        <FeatureShowcaseAdine />
        <MakerStoryAdine />
        <FinalCTAAdine />
      </main>
      <Footer />
    </div>
  );
}
