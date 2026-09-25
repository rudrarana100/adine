export const SITE_URL = "https://adine-crm.vercel.app";

/* ── Shared content: single source of truth used by both the visible FAQ
   section and the FAQPage structured data, so engines and readers agree. ── */

export const FAQ_ITEMS = [
  {
    q: "What is Adine?",
    a: "Adine is an outbound CRM for high-volume cold calling. Import a lead list, dial it in distraction-free call sessions, log every outcome with one keypress, and let follow-ups, meetings, and WhatsApp messages fire automatically. Everything is free during early access.",
  },
  {
    q: "How do cold call sessions work?",
    a: "Leads appear one at a time in a clean queue that you can filter down to a specific collection. Each card gives you one-tap actions for calling, opening the website, pulling up their Google Maps listing, emailing, or messaging on WhatsApp, so you never hunt for another tab mid-call. Log the outcome and the next lead loads on its own.",
  },
  {
    q: "How does outcome logging work?",
    a: "Number keys 1 through 6 map to No Answer, Invalid Number, Gatekeeper, Callback Requested, Not Interested, and Interested, with a separate key for Skip. Every call is stamped with its outcome and a timestamp the moment you press the key. No Answers are automatically rescheduled as a retry for the next day, so callbacks find their way back to you.",
  },
  {
    q: "How does the WhatsApp follow-up work?",
    a: "Book a Google Meet straight from an Interested lead and Adine sends the WhatsApp confirmation for you, with the time and meeting link already filled in. When the meeting wraps, mark the outcome as Closed, Ghosted, Follow-up, or Rescheduled, and the matching re-engagement template goes out automatically. Phone numbers are formatted to international automatically, and the sent status shows on the lead.",
  },
  {
    q: "Can I import leads I already have?",
    a: "Yes. Upload a CSV and Adine matches your column headers against common synonyms, so headers like Phone, Mobile, and Cell all map to the right field for you. You get a preview of exactly what is about to import before anything is saved, and phone numbers are de-duplicated as they come in.",
  },
  {
    q: "Is Adine really free?",
    a: "Adine is free during early access, with the full feature set unlocked and no credit card required to get started. Paid plans are on the way, and early users keep the favorable side of the deal when they arrive.",
  },
  {
    q: "Who is Adine built for?",
    a: "Agency founders and solo salespeople running high-volume outbound and cold calling. The queue, one-keypress logging, and the follow-up hub are all built around one person working a list. It is not a team-based enterprise sales platform.",
  },
];

/* ── SoftwareApplication ── */

export const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Adine",
  alternateName: "Adine CRM",
  description:
    "Adine is an outbound CRM for high-volume cold calling. Lead import and search, sequential call sessions with one-keypress outcome logging, a follow-up hub, kanban pipeline, task management, and automatic WhatsApp and Google Meet follow-ups.",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "SalesManagementApplication",
  operatingSystem: "Web",
  url: SITE_URL,
  keywords:
    "outbound CRM, cold calling software, lead management, call tracking, WhatsApp follow-ups, Google Meet booking, sales pipeline for founders",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
    description: "Free for early users. No credit card required.",
    availability: "https://schema.org/InStock",
  },
  featureList: [
    "CSV lead import",
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
    "Adine is an outbound CRM for high-volume cold calling — lead import, call sessions, and automated follow-ups in one interface.",
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
    "Adine is an outbound CRM for high-volume cold calling. Import leads, run call sessions, log outcomes with one keypress, and automate follow-ups.",
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

/* ── HowTo — mirrors the four-step arc shown on the page ── */

export const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to run a cold call session with Adine",
  description:
    "From a raw list to a booked meeting: import leads, dial them in a call session, log outcomes with one keypress, and let follow-ups happen automatically.",
  totalTime: "PT1H",
  supply: ["Google account for calendar access", "A list of leads or a target area"],
  step: [
    {
      "@type": "HowToStep",
      name: "Build your list",
      text: "Imports lead lists with automatic column mapping and de-duplication, or search directly inside the lead directory.",
    },
    {
      "@type": "HowToStep",
      name: "Run a call session",
      text: "Leads appear one at a time in a clean queue. One tap dials the number, with website, Maps, email, and WhatsApp one click away.",
    },
    {
      "@type": "HowToStep",
      name: "Log outcomes with one keypress",
      text: "Press 1–6 to log No Answer, Invalid, Gatekeeper, Callback Requested, Not Interested, or Interested, or skip to the next lead. The queue advances and the activity is recorded automatically.",
    },
    {
      "@type": "HowToStep",
      name: "Follow up automatically",
      text: "Interested leads book a Google Meet meeting on the spot with a WhatsApp confirmation; no-answers get a scheduled retry. Templated WhatsApp messages fire for confirmations and reminders.",
    },
    {
      "@type": "HowToStep",
      name: "Track and repeat",
      text: "Drag deals across the kanban pipeline, work the follow-up hub, and watch the analytics fill in — then start the next session with fresh leads.",
    },
  ],
};
