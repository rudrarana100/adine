export const SITE_URL = "https://adine-crm.vercel.app";

export const FAQ_ITEMS = [
  {
    q: "What is Adine?",
    a: "Adine is an outbound CRM built for agency founders and solo salespeople doing high-volume cold calling. It combines cold call sessions, automatic status logging, one-click WhatsApp follow-ups, and a follow-up center in a single clean interface.",
  },
  {
    q: "How do cold call sessions work?",
    a: "Import leads from any source and start a dialing session immediately. Calls are presented one at a time in a distraction-free interface. Every action — call, interested, callback, not interested — auto-advances the queue and logs the activity.",
  },
  {
    q: "How does auto status logging work?",
    a: "Every call outcome is automatically logged with duration, disposition, and timestamp. No manual data entry is required — your CRM stays current in real time as you work through your session.",
  },
  {
    q: "How does the WhatsApp follow-up work?",
    a: "After a call, send a follow-up message or appointment confirmation to your lead with a single click. Phone numbers are auto-formatted and messages are pre-built, so you stay in touch instantly without copy-pasting.",
  },
  {
    q: "Is my data secure in Adine?",
    a: "Yes. Your data is encrypted at rest and in transit. We never share prospect data with third parties, and all session data is stored securely with industry-standard practices.",
  },
  {
    q: "Who is Adine built for?",
    a: "Adine is designed for agency founders, solo salespeople, and small outbound teams doing high-volume cold calling. If you make 50+ calls a week and need a CRM that stays out of your way, Adine is for you.",
  },
];

export const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Adine",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    description: "Outbound CRM for agency founders and solo salespeople.",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "2347",
    bestRating: "5",
  },
  featureList: [
    "Cold Call Sessions",
    "Auto Status Logging",
    "WhatsApp One-Click Follow-ups",
    "Follow-up Center",
    "Lead Import and Management",
    "Call Disposition Tracking",
    "Real-time Pipeline Updates",
  ],
  url: SITE_URL,
};

export const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Adine",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "support",
    email: "support@adine-crm.vercel.app",
    areaServed: "Worldwide",
    availableLanguage: "English",
  },
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to run a cold call session with Adine",
  totalTime: "PT1H",
  step: [
    {
      "@type": "HowToStep",
      name: "Import your leads",
      text: "Upload a CSV or import leads from your existing source. Adine auto-detects duplicates and organizes them into batches.",
    },
    {
      "@type": "HowToStep",
      name: "Start a cold call session",
      text: "Select a batch and start dialing. Leads are presented one at a time in a clean, distraction-free interface.",
    },
    {
      "@type": "HowToStep",
      name: "Work the call",
      text: "Call the lead, mark them interested, schedule a callback, or skip. Every action auto-advances the queue and logs the outcome.",
    },
    {
      "@type": "HowToStep",
      name: "Send WhatsApp follow-ups",
      text: "After the call, send a one-click WhatsApp follow-up or appointment confirmation. Phone numbers are auto-formatted.",
    },
    {
      "@type": "HowToStep",
      name: "Track and repeat",
      text: "Your pipeline and follow-up center update in real time. Come back the next day and start a new session with fresh leads.",
    },
  ],
};
