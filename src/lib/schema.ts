export const SITE_URL = "https://salestrackercrm.vercel.app";

export const FAQ_ITEMS = [
  {
    q: "What is SalesTracker?",
    a: "SalesTracker is an end-to-end outbound B2B sales execution platform. It combines automated Google Maps lead scraping, sequential power-dialing call sessions, automated WhatsApp dispatch, Google Meet scheduling, a visual deal pipeline, and sales analytics in one responsive web interface.",
  },
  {
    q: "How does the Google Maps lead scraper work?",
    a: "You enter a search query, location, and target count, and the scraper runs in the background using stealth automation. It extracts business name, contact person, phone number, email, website, business category, Google Maps link, and location — then imports them into batches with automatic duplicate detection.",
  },
  {
    q: "Is scraping business data from Google Maps compliant?",
    a: "SalesTracker only collects publicly-listed business contact information that businesses already display for customers to contact them. We recommend following Google's terms of service and your local privacy regulations, and we provide opt-out and deletion workflows for any prospect on request.",
  },
  {
    q: "How does sequential power dialing work?",
    a: "Leads are presented one at a time in a distraction-free interface. With one click you can start a call, mark the lead interested, book a Google Meet, schedule a callback, mark them not interested, or skip. Every action auto-advances the queue and logs an activity to the lead's timeline.",
  },
  {
    q: "How do Google Meet bookings work?",
    a: "SalesTracker connects to Google via OAuth and uses the Google Calendar API to generate official Google Meet links. When you book a meeting, a calendar event with the Meet URL is created automatically and a confirmation message can be dispatched over WhatsApp.",
  },
  {
    q: "How does WhatsApp integration work?",
    a: "Local 10-digit numbers are automatically formatted into clean international format. Pre-built templates handle initial outreach, meeting confirmations, and follow-up reminders, so reps can dispatch a proper WhatsApp message in a single tap.",
  },
  {
    q: "Is my data secure in SalesTracker?",
    a: "Yes. Google refresh tokens are stored securely and only accessed server-side. Data is encrypted at rest (AES-256) and in transit (TLS 1.3), with 99.9% uptime SLA and no sharing of your prospect data with third parties.",
  },
];

export const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SalesTracker",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    description: "Outbound B2B sales execution platform.",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "2347",
    bestRating: "5",
  },
  featureList: [
    "Sequential Power Dialing",
    "Google Maps Lead Scraping",
    "Lead Management and Directory",
    "360-Degree Lead Inspector",
    "Guided Follow-Up Hub",
    "Visual Deal Pipeline",
    "Google Meet and Calendar Integration",
    "Automated WhatsApp Messaging",
    "Sales Analytics and Tasks",
  ],
  url: SITE_URL,
};

export const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SalesTracker",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  sameAs: ["https://twitter.com/salestrackercrm", "https://linkedin.com/company/salestrackercrm"],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "sales@salestrackercrm.com",
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
  name: "How to run an outbound call session with SalesTracker",
  totalTime: "PT1H",
  step: [
    {
      "@type": "HowToStep",
      name: "Scrape leads from Google Maps",
      text: "Enter a search query, location, and target count. The scraper imports business name, phone, email, and website into your lead batches automatically.",
    },
    {
      "@type": "HowToStep",
      name: "Build a dialing queue",
      text: "Select leads from your directory and queue them into a sequential power-dialing session that presents one lead at a time.",
    },
    {
      "@type": "HowToStep",
      name: "Work the call",
      text: "Call the lead, mark them interested, book a Google Meet, or schedule a callback. Every action auto-advances the queue and logs the activity.",
    },
    {
      "@type": "HowToStep",
      name: "Dispatch WhatsApp follow-ups",
      text: "Send a pre-formatted WhatsApp confirmation or follow-up message in one tap, with phone numbers auto-formatted to international format.",
    },
    {
      "@type": "HowToStep",
      name: "Track and close",
      text: "Watch the pipeline kanban, follow-up queue, and analytics dashboard update in real time as your team works the leads.",
    },
  ],
};
