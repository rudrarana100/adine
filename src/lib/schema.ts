export const SITE_URL = "https://salestrackercrm.vercel.app";

export const FAQ_ITEMS = [
  {
    q: "What is SalesTracker CRM?",
    a: "SalesTracker CRM is an AI-powered B2B sales intelligence platform that helps revenue teams manage pipelines, score leads automatically, and forecast revenue with machine learning. It reduces manual CRM data entry by 62% and helps teams close deals 2.4× faster.",
  },
  {
    q: "How does SalesTracker CRM differ from Salesforce or HubSpot?",
    a: "SalesTracker CRM is purpose-built for B2B sales velocity rather than CRM breadth. It prioritises pipeline intelligence and AI lead scoring over feature sprawl, with a 4-hour onboarding vs. 4-week implementation timelines typical of enterprise CRMs.",
  },
  {
    q: "Does SalesTracker CRM integrate with existing tools?",
    a: "Yes. SalesTracker integrates natively with Gmail, Outlook, Slack, HubSpot, Salesforce, LinkedIn Sales Navigator, Zoom, Zapier, and 40+ more tools via REST API and webhooks.",
  },
  {
    q: "What is the pricing for SalesTracker CRM?",
    a: "SalesTracker offers a free Starter plan for up to 3 users, a Growth plan at $29/user/month, and a custom Enterprise plan. Annual billing saves 20%.",
  },
  {
    q: "Is my data secure in SalesTracker CRM?",
    a: "Yes. SalesTracker is SOC 2 Type II certified, GDPR compliant, and ISO 27001 aligned. Data is encrypted at rest (AES-256) and in transit (TLS 1.3). We maintain 99.9% uptime SLA with zero data sharing with third parties.",
  },
];

export const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SalesTracker CRM",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free tier available. Paid plans from $29/user/month.",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "2347",
    bestRating: "5",
  },
  featureList: [
    "AI Lead Scoring",
    "Pipeline Visualization",
    "Revenue Forecasting",
    "Contact Intelligence",
    "Team Collaboration",
    "Custom Reporting",
    "CRM Integrations",
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
  name: "How to close deals faster with SalesTracker CRM",
  totalTime: "PT4H",
  step: [
    {
      "@type": "HowToStep",
      name: "Import contacts",
      text: "Import your existing contacts from CSV or sync directly from Gmail/Outlook in under 5 minutes.",
    },
    {
      "@type": "HowToStep",
      name: "Build your pipeline",
      text: "Create custom deal stages that match your real sales process using drag-and-drop pipeline builder.",
    },
    {
      "@type": "HowToStep",
      name: "Activate AI scoring",
      text: "Turn on AI Lead Scoring and let the model rank your leads by conversion probability using 47 behavioural signals.",
    },
    {
      "@type": "HowToStep",
      name: "Track activities automatically",
      text: "Connect your email and calendar. SalesTracker logs calls, emails, and meetings automatically — no manual entry.",
    },
    {
      "@type": "HowToStep",
      name: "Forecast and close",
      text: "Review the AI-generated weekly revenue forecast and focus your team on the deals most likely to close this quarter.",
    },
  ],
};
