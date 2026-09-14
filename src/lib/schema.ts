export const SITE_URL = "https://adine-crm.vercel.app";

/* ── Shared content: single source of truth used by both the visible FAQ
   section and the FAQPage structured data, so engines and readers agree. ── */

export const FAQ_ITEMS = [
  {
    q: "What is Adine?",
    a: "Adine is an outbound CRM for high-volume cold calling. Scrape a target list from Google Maps, dial it in distraction-free call sessions, log every outcome with one keypress, and let follow-ups, meetings, and WhatsApp messages fire automatically. Everything is free during early access.",
  },
  {
    q: "How do cold call sessions work?",
    a: "Leads play one at a time in a clean queue — one tap to dial, with website, Maps, and WhatsApp one click away. After each call you press a number key to log the outcome, and the queue auto-advances, so you never stop to type while a prospect waits.",
  },
  {
    q: "How does outcome logging work?",
    a: "Keys 1–6 log No Answer, Invalid, Gatekeeper, Not Interested, Interested, or Schedule. Each call is stamped with the outcome and timestamp automatically, so your CRM stays current without manual data entry.",
  },
  {
    q: "How does the WhatsApp follow-up work?",
    a: "After a call, send a templated WhatsApp message with one click — meeting confirmations, first outreach, or reminders. Phone numbers are auto-formatted to international, and the sent status is tracked on the lead.",
  },
  {
    q: "Can I import leads I already have?",
    a: "Yes. Upload a CSV with column mapping and automatic de-duplication, or scrape fresh, verified businesses from Google Maps by area and category — name, contact person, phone, email, website, and map link.",
  },
  {
    q: "Is Adine really free?",
    a: "Yes. Adine is free for early users today — every feature, no credit card required. When paid plans arrive, early users keep the favorable free side of the deal.",
  },
  {
    q: "Who is Adine built for?",
    a: "Agency founders, solo reps, and small outbound teams making 50+ calls a week. The queue, keypress logging, and follow-up hub are built around one person working a list, so the solo rep gets the full experience.",
  },
];

/* ── SoftwareApplication ── */

export const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Adine",
  alternateName: "Adine CRM",
  description:
    "Adine is an outbound CRM for high-volume cold calling. Google Maps lead scraping, sequential call sessions with one-keypress outcome logging, a follow-up hub, kanban pipeline, task management, and automatic WhatsApp and Google Meet follow-ups.",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "SalesManagementApplication",
  operatingSystem: "Web",
  url: SITE_URL,
  keywords:
    "outbound CRM, cold calling software, Google Maps lead scraper, call tracking, WhatsApp follow-ups, Google Meet booking, sales pipeline for founders",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
    description: "Free for early users. No credit card required.",
    availability: "https://schema.org/InStock",
  },
  featureList: [
    "Google Maps lead scraper",
    "Sequential call sessions",
    "One-keypress outcome logging",
    "Follow-up hub",
    "Kanban visual pipeline",
    "Task management",
    "WhatsApp automation",
    "Google Meet booking",
    "Analytics and streaks",
  ],
  publisher: { "@id": `${SITE_URL}/#organization` },
};

/* ── Organization ── */

export const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Adine",
  url: SITE_URL,
  logo: `${SITE_URL}/og.png`,
  image: `${SITE_URL}/og.png`,
  description:
    "Adine is an outbound CRM for high-volume cold calling — lead scraping, call sessions, and automated follow-ups in one interface.",
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "support",
    email: "support@adine-crm.vercel.app",
    areaServed: "Worldwide",
    availableLanguage: "English",
  },
};

/* ── FAQPage — built from the shared FAQ_ITEMS so visible content and
   structured data never drift apart ── */

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

/* ── WebSite ── */

export const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Adine",
  url: SITE_URL,
  description:
    "Adine is an outbound CRM for high-volume cold calling. Scrape leads, run call sessions, log outcomes with one keypress, and automate follow-ups.",
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

/* ── HowTo — mirrors the four-step arc shown on the page ── */

export const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to run a cold call session with Adine",
  description:
    "From a raw list to a booked meeting: scrape leads, dial them in a call session, log outcomes with one keypress, and let follow-ups happen automatically.",
  totalTime: "PT1H",
  supply: ["Google account for calendar access", "A list of leads or a target area"],
  step: [
    {
      "@type": "HowToStep",
      name: "Build your list",
      text: "Scrape verified leads from Google Maps by area and category, or import a CSV with automatic column mapping and de-duplication.",
    },
    {
      "@type": "HowToStep",
      name: "Run a call session",
      text: "Leads appear one at a time in a clean queue. One tap dials the number, with website, Maps, email, and WhatsApp one click away.",
    },
    {
      "@type": "HowToStep",
      name: "Log outcomes with one keypress",
      text: "Press 1–6 to log No Answer, Invalid, Gatekeeper, Not Interested, Interested, or Schedule. The queue advances and the activity is recorded automatically.",
    },
    {
      "@type": "HowToStep",
      name: "Follow up automatically",
      text: "Interested leads get a Google Meet booking on the spot; no-answers get a scheduled retry. Templated WhatsApp messages fire for confirmations and reminders.",
    },
    {
      "@type": "HowToStep",
      name: "Track and repeat",
      text: "Drag deals across the kanban pipeline, work the follow-up hub, and watch the analytics fill in — then start the next session with fresh leads.",
    },
  ],
};
