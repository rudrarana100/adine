# Deal Closer Pro

# SalesTracker CRM — Launch Website Master Prompt

> **Product:** SalesTracker CRM — `salestrackercrm.vercel.app`
> **Design System:** Ventriloc (editorial data observatory — warm paper, monochrome precision, single Ember Orange ember)
> **Stack:** Next.js 15 App Router · TypeScript · Tailwind v4 · TanStack Query v5 · Framer Motion v11 · GSAP 3 + ScrollTrigger
> **SEO Focus:** Full semantic HTML · JSON-LD schema · AEO (AI Engine Optimization) · GEO (Generative Engine Optimization) · Core Web Vitals

---

## 0. Mission Statement (read before writing a single line)

Build the launch website for **SalesTracker CRM** — a B2B sales intelligence platform that helps revenue teams track pipelines, score leads with AI, and close deals 2.4× faster. The site's single job is to convert a VP of Sales or a founder into a demo request within 90 seconds of landing.

The design voice is **editorial data observatory**: warm paper-white canvas, monospaced precision in data cards, and a single Ember Orange ember that punctuates the page like a highlighter on a printed report. Pages read 95% achromatic; colour appears only as functional punctuation. No gradients. No shadows. No stock photography. The analytics charts ARE the imagery.

---

## 1. Design Tokens (Ventriloc System — Tailwind v4)

Paste this at the top of your global CSS, BEFORE any Tailwind imports:

```css
@import "tailwindcss";

@theme {
  /* ── Colors ─────────────────────────────────────────── */
  --color-graphite:      #202020; /* primary text, headings, icon strokes          */
  --color-canvas-white:  #ffffff; /* page background, card elevation               */
  --color-ash:           #efefef; /* primary card + section background             */
  --color-fog:           #f5f5f5; /* nested surfaces, secondary containers         */
  --color-ivory:         #ebe6dd; /* warm accent wash for featured/editorial blocks*/
  --color-steel:         #4d4d4d; /* secondary body text, long-form paragraphs     */
  --color-slate:         #828282; /* muted helper text, inactive controls          */
  --color-mist:          #e8e8e8; /* hairline dividers, nav fills                  */
  --color-ember-orange:  #ff682c; /* accent: links, chart highlights, tags only    */
  --color-brass:         #816729; /* secondary accent: chart strokes, tag text     */

  /* ── Typography ─────────────────────────────────────── */
  --font-polysans: 'Inter Tight', ui-sans-serif, system-ui, sans-serif;
  --font-inter:    'Inter',       ui-sans-serif, system-ui, sans-serif;

  /* ── Type Scale ─────────────────────────────────────── */
  --text-caption:     14px;
  --leading-caption:  1.43;
  --text-subheading:  18px;
  --leading-subheading: 1.25;
  --text-heading:     32px;
  --leading-heading:  1.19;
  --tracking-heading: -0.64px;
  --text-heading-lg:  40px;
  --leading-heading-lg: 1.2;
  --tracking-heading-lg: -0.8px;
  --text-display:     66px;
  --leading-display:  0.91;
  --tracking-display: -1.32px;

  /* ── Spacing ─────────────────────────────────────────── */
  --spacing-8:   8px;
  --spacing-12:  12px;
  --spacing-16:  16px;
  --spacing-20:  20px;
  --spacing-36:  36px;
  --spacing-40:  40px;
  --spacing-60:  60px;
  --spacing-140: 140px;

  /* ── Border Radius ───────────────────────────────────── */
  --radius-sm:   3px;
  --radius-lg:   8px;
  --radius-xl:   12px;
  --radius-2xl:  20px;
  --radius-full: 200px;

  /* Named semantic radii */
  --radius-tags:            20px;
  --radius-cards:            8px;
  --radius-buttons:          0px;   /* deliberate — sharp edge is the brand signature */
  --radius-nav-pills:      200px;
  --radius-asymmetric-card: 6px 0px 0px;  /* top-left soft, everywhere else sharp */
  --radius-data-card:       20px;          /* chart widgets only */
}

/* CSS custom properties for runtime JS access (GSAP, counters) */
:root {
  --color-graphite:      #202020;
  --color-ember-orange:  #ff682c;
  --color-brass:         #816729;
  --color-ash:           #efefef;
  --section-gap:         80px;
  --page-max-width:      1200px;
}
```

**Font loading (in `<head>`):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style"
  href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400&family=Inter:wght@400;500;600&display=swap">
```

> `Inter Tight` at weight 400 substitutes for PolySans. It has near-identical narrow neo-grotesque proportions and -0.02em tracking. Apply `tracking-[-0.02em]` to every heading.

---

## 2. Tech Stack & Project Structure

### Stack
```
next@15                    # App Router, Server Components, PPR
typescript@5               # strict mode
tailwindcss@4              # @theme config above, no tailwind.config.js
@tanstack/react-query@5    # server-prefetch pattern for CMS/pricing data
framer-motion@11           # component-level transitions, micro-interactions
gsap@3 + ScrollTrigger     # scroll-triggered counters, reveal timelines
@phosphor-icons/react      # thin-stroke monoline icon set (no emoji icons)
next-seo                   # meta tags helper
next-sitemap               # sitemap.xml + robots.txt generation
schema-dts                 # TypeScript types for JSON-LD structured data
```

### Directory
```
src/
├── app/
│   ├── layout.tsx          # root layout — metadata, JSON-LD, fonts
│   ├── page.tsx            # landing page (all sections assembled)
│   ├── sitemap.ts          # dynamic sitemap
│   └── robots.ts           # robots.txt
├── components/
│   ├── layout/
│   │   ├── NavBar.tsx      # floating pill nav
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── LogoStrip.tsx
│   │   ├── ProblemStatement.tsx
│   │   ├── FeaturesGrid.tsx
│   │   ├── AnalyticsProof.tsx
│   │   ├── DashboardPreview.tsx
│   │   ├── IntegrationEcosystem.tsx
│   │   ├── Pricing.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQ.tsx
│   │   └── FinalCTA.tsx
│   └── ui/
│       ├── DataCard.tsx
│       ├── AsymmetricCard.tsx
│       ├── CounterStat.tsx   # GSAP animated number
│       ├── MiniChart.tsx     # SVG sparkline with ember + brass strokes
│       ├── PipelineBar.tsx   # animated horizontal progress bar
│       └── Tag.tsx
├── hooks/
│   ├── useCountUp.ts       # GSAP counter hook
│   └── useScrollReveal.ts  # reusable ScrollTrigger hook
├── lib/
│   ├── seo.ts              # centralized metadata factory
│   ├── schema.ts           # JSON-LD objects
│   └── queryClient.ts      # TanStack Query setup
└── styles/
    └── globals.css         # @import tailwindcss + @theme block above
```

---

## 3. SEO / AEO / GEO Configuration (Non-negotiable)

### 3.1 — Root Layout Metadata (`app/layout.tsx`)

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://salestrackercrm.vercel.app'),
  title: {
    default: 'SalesTracker CRM — Close Deals 2.4× Faster | B2B Sales Intelligence',
    template: '%s | SalesTracker CRM',
  },
  description:
    'SalesTracker CRM gives B2B revenue teams AI-powered pipeline visibility, lead scoring, and forecasting. Used by 10,000+ teams. Close deals 2.4× faster. Start free.',
  keywords: [
    'B2B CRM software', 'sales pipeline management', 'lead scoring AI',
    'revenue forecasting tool', 'sales intelligence platform',
    'deal tracking software', 'CRM for startups', 'enterprise CRM',
  ],
  openGraph: {
    type: 'website',
    url: 'https://salestrackercrm.vercel.app',
    title: 'SalesTracker CRM — Close Deals 2.4× Faster',
    description: 'AI-powered B2B sales intelligence. Pipeline visibility, lead scoring, and revenue forecasting in one platform.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'SalesTracker CRM Dashboard Preview' }],
    siteName: 'SalesTracker CRM',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SalesTracker CRM — Close Deals 2.4× Faster',
    description: 'AI-powered pipeline visibility and lead scoring for B2B revenue teams.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: 'https://salestrackercrm.vercel.app',
    // Add hreflang when multi-region: languages: { 'en-US': '/en', 'en-IN': '/in' }
  },
  authors: [{ name: 'SalesTracker', url: 'https://salestrackercrm.vercel.app' }],
  category: 'technology',
  verification: {
    google: 'YOUR_GSC_VERIFICATION_TOKEN',
  },
};
```

### 3.2 — JSON-LD Structured Data (`lib/schema.ts`)

Include ALL of these schemas on the root page via `<script type="application/ld+json">`:

```ts
// 1. SoftwareApplication schema — GEO critical (surfaces in AI overviews)
export const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'SalesTracker CRM',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free tier available. Paid plans from $29/user/month.',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '2347',
    bestRating: '5',
  },
  featureList: [
    'AI Lead Scoring',
    'Pipeline Visualization',
    'Revenue Forecasting',
    'Contact Intelligence',
    'Team Collaboration',
    'Custom Reporting',
    'CRM Integrations',
  ],
  url: 'https://salestrackercrm.vercel.app',
};

// 2. Organization schema
export const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SalesTracker',
  url: 'https://salestrackercrm.vercel.app',
  logo: 'https://salestrackercrm.vercel.app/logo.png',
  sameAs: ['https://twitter.com/salestrackercrm', 'https://linkedin.com/company/salestrackercrm'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'sales@salestrackercrm.com',
    areaServed: 'Worldwide',
    availableLanguage: 'English',
  },
};

// 3. FAQPage schema — AEO critical (surfaces in "People also ask")
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is SalesTracker CRM?',
      acceptedAnswer: { '@type': 'Answer', text: 'SalesTracker CRM is an AI-powered B2B sales intelligence platform that helps revenue teams manage pipelines, score leads automatically, and forecast revenue with machine learning. It reduces manual CRM data entry by 62% and helps teams close deals 2.4× faster.' },
    },
    {
      '@type': 'Question',
      name: 'How does SalesTracker CRM differ from Salesforce or HubSpot?',
      acceptedAnswer: { '@type': 'Answer', text: 'SalesTracker CRM is purpose-built for B2B sales velocity rather than CRM breadth. It prioritises pipeline intelligence and AI lead scoring over feature sprawl, with a 4-hour onboarding vs. 4-week implementation timelines typical of enterprise CRMs.' },
    },
    {
      '@type': 'Question',
      name: 'Does SalesTracker CRM integrate with existing tools?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. SalesTracker integrates natively with Gmail, Outlook, Slack, HubSpot, Salesforce, LinkedIn Sales Navigator, Zoom, Zapier, and 40+ more tools via REST API and webhooks.' },
    },
    {
      '@type': 'Question',
      name: 'What is the pricing for SalesTracker CRM?',
      acceptedAnswer: { '@type': 'Answer', text: 'SalesTracker offers a free Starter plan for up to 3 users, a Growth plan at $29/user/month, and a custom Enterprise plan. Annual billing saves 20%.' },
    },
    {
      '@type': 'Question',
      name: 'Is my data secure in SalesTracker CRM?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. SalesTracker is SOC 2 Type II certified, GDPR compliant, and ISO 27001 aligned. Data is encrypted at rest (AES-256) and in transit (TLS 1.3). We maintain 99.9% uptime SLA with zero data sharing with third parties.' },
    },
  ],
};

// 4. HowTo schema — AEO: surfaces in how-to AI answers
export const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to close deals faster with SalesTracker CRM',
  totalTime: 'PT4H',
  step: [
    { '@type': 'HowToStep', name: 'Import contacts', text: 'Import your existing contacts from CSV or sync directly from Gmail/Outlook in under 5 minutes.' },
    { '@type': 'HowToStep', name: 'Build your pipeline', text: 'Create custom deal stages that match your real sales process using drag-and-drop pipeline builder.' },
    { '@type': 'HowToStep', name: 'Activate AI scoring', text: 'Turn on AI Lead Scoring and let the model rank your leads by conversion probability using 47 behavioural signals.' },
    { '@type': 'HowToStep', name: 'Track activities automatically', text: 'Connect your email and calendar. SalesTracker logs calls, emails, and meetings automatically — no manual entry.' },
    { '@type': 'HowToStep', name: 'Forecast and close', text: 'Review the AI-generated weekly revenue forecast and focus your team on the deals most likely to close this quarter.' },
  ],
};
```

### 3.3 — Speakable Content (AEO / Voice Search)

On the hero `

`, add:
```html



```
On the FAQ `

` elements, add `itemprop="speakable"`.

### 3.4 — Sitemap (`app/sitemap.ts`)

```ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://salestrackercrm.vercel.app', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://salestrackercrm.vercel.app/pricing', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://salestrackercrm.vercel.app/features', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://salestrackercrm.vercel.app/integrations', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://salestrackercrm.vercel.app/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
  ];
}
```

### 3.5 — GEO (Generative Engine Optimisation) Copy Rules

Every section must follow these rules so AI overviews (Perplexity, ChatGPT Search, Google SGE) cite the site:

1. **Definition-first sentences**: Each section opens with a factual, scannable definition. "SalesTracker CRM is a [category] that [primary benefit] for [audience]."
2. **Quantified claims**: Every claim pairs a number with a time boundary: "2.4× faster deal closure *within 90 days*", not vague "much faster".
3. **Competitive anchoring**: At least one FAQ answer explicitly names Salesforce/HubSpot and explains the differentiation.
4. **Entity-rich copy**: Mention the brand name naturally 3–5 times per page section. AI engines use named entity frequency as a citation signal.
5. **No marketing euphemisms** in H1–H3 tags. Headlines must be factually answerable queries.

---

## 4. Animation System

### 4.1 — GSAP Setup (client components only)

```tsx
// hooks/useCountUp.ts
'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useCountUp(target: number, suffix = '', decimals = 0) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { val: 0 };

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: target,
        duration: 2.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        },
        onUpdate: () => {
          el.textContent = obj.val.toFixed(decimals) + suffix;
        },
      });
    });

    return () => ctx.revert();
  }, [target, suffix, decimals]);

  return ref;
}
```

```tsx
// hooks/useScrollReveal.ts
'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type RevealConfig = {
  from?: 'bottom' | 'left' | 'right' | 'fade';
  stagger?: number;
  delay?: number;
};

export function useScrollReveal({ from = 'bottom', stagger = 0.1, delay = 0 }: RevealConfig = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll('[data-reveal]');
    const fromVars = {
      bottom: { y: 40, opacity: 0 },
      left:   { x: -40, opacity: 0 },
      right:  { x: 40, opacity: 0 },
      fade:   { opacity: 0 },
    }[from];

    const ctx = gsap.context(() => {
      gsap.from(targets.length ? targets : el, {
        ...fromVars,
        duration: 0.8,
        ease: 'power3.out',
        stagger,
        delay,
        scrollTrigger: { trigger: el, start: 'top 78%', once: true },
      });
    });

    return () => ctx.revert();
  }, [from, stagger, delay]);

  return ref;
}
```

### 4.2 — Framer Motion Variants

```tsx
// All component-level animations use Framer Motion variants:

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// Reduced motion: always wrap with useReducedMotion() check
// import { useReducedMotion } from 'framer-motion';
// const shouldReduce = useReducedMotion();
// Pass: variants={shouldReduce ? {} : fadeUp}
```

### 4.3 — Animation Budget Per Section

| Section           | GSAP                                | Framer Motion             |
|-------------------|-------------------------------------|---------------------------|
| Hero              | None (above fold — no scroll needed)| Entry sequence: headline → subtext → buttons → cards (stagger 80ms) |
| Logo Strip        | Infinite marquee scroll (x tween)  | None                      |
| Analytics Proof   | countUp on 6 stat numbers           | Stat card scale-in on scroll |
| Dashboard Preview | Horizontal parallax on card cluster | Tab-switch transition     |
| Features Grid     | None                                | Cards stagger in (fadeUp) |
| Pricing           | None                                | Card hover: y: -4px       |
| Testimonials      | None                                | Carousel swipe (drag)     |
| FAQ               | None                                | Accordion height tween    |

**Do not** animate headers or body text on every scroll — only data cards and stat numbers.

---

## 5. Page Sections — Full Specifications

### 5.1 — NavBar (`components/layout/NavBar.tsx`)

**Layout:** `position: sticky; top: 20px; z-index: 50`
Three zones: [Brand wordmark left] [Pill nav center] [CTA button right]

**Pill nav container:**
- Background: `--color-ash` (#efefef)
- Border-radius: `200px`
- Padding: `8px 18px`
- Items: `font-family: var(--font-polysans)` · `font-size: 16px` · `font-weight: 400` · `color: var(--color-graphite)` · `letter-spacing: -0.02em` · `gap: 20px`
- Dropdown items use the same PolySans style with a Phosphor chevron icon

**Nav links:** Features · Integrations · Pricing · Changelog · Blog

**Right CTA:**
- "Request demo" button: bg `#202020` · text `#ffffff` · `border-radius: 0px` · padding `10px 20px` · PolySans 16px · no shadow
- On scroll past hero: pill nav gains `backdrop-filter: blur(12px)` and `background: rgba(239,239,239,0.85)`

**Mobile (< 768px):** Pill nav collapses to a hamburger. Drawer slides from right. Full-width dark "Request demo" at drawer bottom.

---

### 5.2 — Hero Section (`components/sections/Hero.tsx`)

**Above the fold — this section must render in < 1.2s on 4G mobile.**

**Layout:** Two-column grid. Left 55% / Right 45%.

#### Left Column

**Eyebrow tag (above headline):**
```
[● Launching publicly — Join 10,000+ B2B teams]
```
- Pill tag: background `#ebe6dd` (ivory) · text `#816729` (brass) · border-radius `20px` · font Inter 13px · padding `6px 12px`
- Animated: pulsing orange dot before text using CSS animation

**H1 headline:**
```
The CRM that
closes deals.
Not just tracks them.
```
- Font: `Inter Tight` · weight `400` · size `clamp(40px, 5.5vw, 66px)` · line-height `0.91` · letter-spacing `-1.32px` · color `#202020`
- "closes deals." — the second line gets an `` with `text-decoration-color: #ff682c` · `text-decoration: underline` · `text-underline-offset: 6px` · this is the Ember Orange moment in the hero
- Framer Motion: lines enter with stagger, y: 32 → 0, 80ms apart

**Subheadline:**
```
SalesTracker CRM gives revenue teams real-time pipeline visibility,
AI lead scoring, and revenue forecasting — all in one platform.
No implementation consultants. No 6-week setup.
```
- Font: Inter · weight `400` · size `18px` · line-height `1.5` · color `#4d4d4d`

**CTA buttons (side by side, gap 12px):**
- Primary: "Start free — no card needed" · bg `#202020` · text `white` · `border-radius: 0px` · `padding: 12px 24px` · PolySans 16px
- Ghost: "Watch 3-min demo →" · transparent bg · `border: 1px solid #202020` · `border-radius: 0px` · PolySans 16px

**Below buttons — 3 trust microcopy items (inline row):**
```
✓ Free forever tier  ✓ SOC 2 certified  ✓ 4-hr onboarding
```
- Font: Inter 13px · color `#828282`

#### Right Column — Dashboard Card Cluster

Three overlapping data cards in a floating cluster. Cards use `position: absolute` with deliberate offsets.
No stock screenshots. Build pixel-accurate SVG/div mockups.

**Card 1 — Pipeline Summary (largest, behind):**
- White bg · `border-radius: 20px` · `padding: 24px` · no shadow
- Title: "Q3 Pipeline" · PolySans 16px · color `#202020`
- Mini bar chart: 5 horizontal bars in varying widths, filled `#202020` at 80% opacity, one bar accented `#ff682c`
- "Total value: $2.4M" stat line below · Inter 13px · color `#4d4d4d`

**Card 2 — Lead Score Card (front, offset top-right):**
- Ash bg `#efefef` · `border-radius: 8px` · `padding: 20px`
- "AI Lead Score" label · Inter 500 13px · `#828282`
- Large number: "87" · Inter Tight 40px · `#202020`
- Small tag below: `[HIGH INTENT]` · bg `#ff682c` · text white · `border-radius: 20px` · Inter 11px · padding `3px 8px`
- Sparkline SVG with `#ff682c` stroke · 3 data points

**Card 3 — Revenue Forecast Card (bottom-right, smallest):**
- White bg · `border-radius: 20px` · `padding: 20px`
- "Forecast" label · Inter 500 13px · `#828282`
- "$847K" stat · Inter Tight 32px · `#202020`
- "+12.4% vs last quarter" · Inter 13px · color `#816729`
- Thin line chart SVG · stroke `#816729` · width 2px

**Framer Motion on the cluster:** On page load, cards animate in sequence (scaleIn variant, stagger 150ms). On hover, Card 2 lifts `y: -6px` with `transition: { duration: 0.25 }`.

---

### 5.3 — Logo Strip (`components/sections/LogoStrip.tsx`)

**Full-width white band. Height: 120px.**

Caption above logos:
```
Trusted by 10,000+ B2B teams across 60 countries
```
- Font: Inter Tight 13px · weight 400 · color `#816729` · letter-spacing `-0.02em` · centered

**Logo marquee:**
- Use GSAP infinite scroll: `gsap.to('.logos-track', { x: '-50%', duration: 28, ease: 'none', repeat: -1 })`
- 10 fictional B2B company names in wordmark style: rendered as Inter Tight 500 16px in `#202020`, equally spaced, gap 60px
- Names: Meridian · Coralth · Paravox · Tenloft · Brightledge · Vortex · Fenwick · Opacus · Cerida · Runewell
- Duplicate the list in the DOM for seamless infinite scroll

---

### 5.4 — Problem Statement (`components/sections/ProblemStatement.tsx`)

**Ash band (`#efefef`) · Padding: 80px 0**

**H2 (left column, 50%):**
```
Your pipeline is full.
Your forecast is fiction.
```
- Inter Tight · 40px · weight 400 · line-height 1.2 · tracking -0.8px · color `#202020`

**Right column (50%) — 3 problem cards (stacked, gap 16px):**
Each card: white bg · `border-radius: 8px` · `padding: 24px` · no shadow · `border-left: 3px solid #ff682c`
- Card 1: "62% of deals never enter your CRM" — Inter 14px
- Card 2: "Sales reps spend 31% of their week on data entry" — Inter 14px
- Card 3: "Average CRM data accuracy: 47%" — Inter 14px

Each card has a short body line in `#4d4d4d` Inter 13px below the stat.

**Transition line (below both columns):**
```
SalesTracker fixes all three.
```
- Inter Tight 32px · `#202020` · centered · with an Ember Orange right-arrow icon after it

---

### 5.5 — Features Grid (`components/sections/FeaturesGrid.tsx`)

**White band · Padding: 80px 0**

**Section label (above H2):**
```
PLATFORM CAPABILITIES
```
- Inter 12px · weight 600 · letter-spacing 0.08em · color `#828282` · uppercase

**H2:**
```
Everything your revenue team needs.
Nothing they don't.
```
- Inter Tight · 40px · weight 400 · tracking -0.8px

**Grid layout:** Asymmetric bento. Row 1: 1 large card (60%) + 1 medium card (38%). Row 2: 3 equal cards.

**Feature 1 — Pipeline Intelligence (large card):**
- Background: `#ebebdd` (ivory)
- `border-radius: 6px 0px 0px` (ASYMMETRIC — signature shape)
- Padding: 48px
- H3: "Pipeline Intelligence" · Inter Tight 24px
- Body: "Drag-and-drop deal stages, weighted probability, and AI-suggested next actions. Your pipeline finally reflects reality."
- Visual: Animated SVG kanban — 4 columns (Qualify → Demo → Proposal → Closed), cards slide between columns on a timed GSAP tween (paused on hover, resuming on mouseout)

**Feature 2 — AI Lead Scoring (medium card):**
- Background: white `#ffffff`
- `border-radius: 20px`
- H3: "AI Lead Scoring"
- Body: "47 behavioural signals. Prioritise every lead in seconds."
- Visual: A vertical list of 4 leads with score bars: `[●●●●○ 87] [●●●○○ 71] [●●○○○ 55] [●○○○○ 23]` — scores in Inter Tight, bars in `#202020` filled, one bar accent `#ff682c`

**Feature 3–5 (equal cards, white, border-radius 8px):**
- F3: "Revenue Forecasting" — ML-based quarterly forecast. Visual: tiny line chart SVG
- F4: "Contact Intelligence" — Auto-enriched profiles. Visual: contact card UI mockup
- F5: "Team Collaboration" — Shared notes, @mentions, deal ownership. Visual: avatar stack + comment bubble

**All cards:** Phosphor icon at top (thin stroke, 24px, `#202020`) · no shadow · no border · gap 16px between cards

---

### 5.6 — Analytics Proof Section (`components/sections/AnalyticsProof.tsx`)

**Ash band (`#efefef`) · Padding: 80px 0**

**This is the "big numbers" moment. Use GSAP countUp on all 6 stats.**

**Layout:** Full-width. H2 centered. Then 6-column stat grid.

**H2 (centered):**
```
The numbers teams report
after 90 days on SalesTracker.
```
- Inter Tight 40px · weight 400 · tracking -0.8px

**6 stat cards (white bg · border-radius 8px · padding 32px 24px · no shadow):**

| Stat | Label | Sub-copy |
|------|-------|----------|
| **2.4×** | Faster deal closure | vs. industry average |
| **62%** | Less manual data entry | hours saved per rep per week |
| **$3.8M** | Added ARR per team/yr | median across Growth plan users |
| **47%** | Fewer dropped leads | with AI follow-up reminders |
| **340%** | Average 6-month ROI | includes implementation cost |
| **99.9%** | Uptime SLA | with <200ms API response time |

**Each stat card:**
- Stat number: Inter Tight · 48px · weight 400 · color `#202020` · GSAP countUp
- Label: Inter Tight · 16px · color `#202020`
- Sub-copy: Inter · 13px · color `#828282`
- A thin `1px #e8e8e8` bottom border acts as a subtle divider — no other decoration

**Below the 6 stats — data source note:**
```
Data from 847 SalesTracker teams, Q1–Q3 2024. Individual results vary.
```
- Inter 12px · `#828282` · centered · italic

---

### 5.7 — Dashboard Preview (`components/sections/DashboardPreview.tsx`)

**White band · Padding: 80px 0**

**Label:**
```
PRODUCT TOUR
```

**H2 (left, 45%):**
```
See exactly where every deal stands.
At a glance.
```

**Right (55%):** Tabbed preview UI. Tabs: "Pipeline" · "Forecasting" · "Reports" · "Contacts"
- Active tab: Inter Tight 14px · border-bottom `2px solid #ff682c` · color `#202020`
- Inactive: color `#828282`
- Tab content: pixel-accurate SVG mockup of the SalesTracker dashboard for each tab
- Framer Motion: `AnimatePresence` + `motion.div` fade-crossfade on tab switch, `duration: 0.3`
- Horizontal parallax on the card cluster: `useScroll()` + `useTransform()` from Framer Motion — cards shift 10px on scroll

**Pipeline tab UI mockup (buildable in HTML/CSS — no screenshots):**
- 4 column headers: "Qualify" · "Demo Scheduled" · "Proposal Sent" · "Negotiation"
- Under each: 2–3 mini deal cards (white · border-radius 4px · padding 12px · shadow-none)
- Each card: company name (Inter Tight 13px) + deal value (Inter 13px brass) + avatar dot
- Total pipeline value at top-right: "$4.2M" · Inter Tight 24px · `#202020`

---

### 5.8 — Integration Ecosystem (`components/sections/IntegrationEcosystem.tsx`)

**Ash band · Padding: 80px 0**

**H2:**
```
Works where your team already works.
```

**Grid:** 5 columns × 2 rows = 10 integration logos. Each: white card · border-radius 8px · 48px × 48px padding · centered icon

**Integrations (use SVG wordmarks or Phosphor icons, rendered in `#202020`):**
Row 1: Gmail · Outlook · Slack · HubSpot · Salesforce
Row 2: LinkedIn · Zoom · Zapier · Pipedrive · API (custom)

**Below grid:**
```
+ 40 more integrations  [View all integrations →]
```
- "View all integrations" is a text link with `text-decoration: underline` · `text-decoration-color: #ff682c` · Inter Tight 16px

---

### 5.9 — Pricing (`components/sections/Pricing.tsx`)

**White band · Padding: 80px 0**

**H2:**
```
Pricing that scales with your team.
```

**Toggle:** Monthly / Annual (save 20%) — small pill toggle, Inter 14px

**3 pricing cards (horizontal row):**

**Card 1 — Starter (Free):**
- Background: white · border-radius 8px · border `1px solid #e8e8e8`
- Tag: `[FREE FOREVER]` · ivory bg · brass text · border-radius 20px
- Price: "$0" · Inter Tight 40px
- For: "Up to 3 users, 500 contacts"
- 5 feature lines with checkmarks (Phosphor `Check` icon, 16px, `#202020`)
- CTA: Ghost button "Start free" (0px radius)

**Card 2 — Growth (Featured):**
- Background: `#202020` (graphite) — the dark card stands out WITHOUT using orange
- Text: white
- Tag: `[MOST POPULAR]` · ember orange bg · white text
- Price: "$29/user/mo" · Inter Tight 40px · white
- For: "Unlimited contacts, AI scoring, forecasting"
- 8 feature lines · checkmarks in `#ff682c`
- CTA: White filled button "Start Growth trial" (0px radius · bg white · text `#202020`)

**Card 3 — Enterprise (Custom):**
- Background: white · border `1px solid #e8e8e8`
- Price: "Custom" · Inter Tight 40px
- For: "SSO, SLAs, dedicated CSM, custom onboarding"
- 6 feature lines
- CTA: Ghost button "Talk to sales" (0px radius)

**Under pricing cards:**
```
All plans include: SOC 2 Type II · 99.9% uptime SLA · GDPR compliant · 24/7 support
```
- Inter 13px · `#828282` · centered

---

### 5.10 — Testimonials (`components/sections/Testimonials.tsx`)

**Ash band · Padding: 80px 0**

**H2:**
```
What B2B revenue leaders say.
```

**3 testimonial cards (horizontal, draggable on mobile):**
Each: white · border-radius 8px · padding 32px · no shadow

Structure per card:
- Quote: Inter · 18px · weight 400 · `#202020` · line-height 1.5 · NO quotation marks (editorial restraint) — instead, an Em dash before the attribution
- Attribution line: "— Sarah Chen, VP Sales, Meridian Technologies" · Inter 13px · `#828282`
- Stars: 5 × Phosphor `Star (fill)` icons · `#ff682c` · 14px

**3 quotes:**
1. "We closed our first $500K deal 3 weeks after onboarding. The AI scoring told us exactly which leads to call that Monday morning. — Marcus Webb, Head of Sales, Coralth"
2. "After 6 months, we retired both Salesforce and our spreadsheet system. SalesTracker replaced both. — Priya Nair, CRO, Paravox Labs"
3. "The forecasting accuracy alone justified the cost. We hit within 4% of Q2 forecast. First time ever. — James Okafor, VP Revenue, Tenloft"

**Framer Motion draggable carousel on mobile (`< 768px`):**
```tsx
<motion.div drag="x" dragConstraints={constraintsRef} className="flex gap-4">
```

---

### 5.11 — FAQ (`components/sections/FAQ.tsx`)

**White band · Padding: 80px 0**

`itemScope itemType="https://schema.org/FAQPage"` on the section element.

**H2 (left, 35%):**
```
Questions we get every day.
```

**Right (60%) — Accordion (5 questions):**
Use the 5 FAQs from the faqSchema above. Each item:
- `itemScope itemType="https://schema.org/Question"` + `itemprop="mainEntity"`
- Trigger row: Inter Tight 18px · `#202020` · Phosphor `Plus/Minus` icon right
- Answer: Inter 16px · `#4d4d4d` · line-height 1.6
- Framer Motion: `AnimatePresence` + `motion.div` height tween (`overflow: hidden` + `height: auto`)
- Border-bottom: `1px solid #e8e8e8` between each item

---

### 5.12 — Final CTA (`components/sections/FinalCTA.tsx`)

**Ivory band (`#ebe6dd`) · Padding: 80px 0 · Full bleed**

**Centered layout:**

**H2:**
```
Your pipeline has a leak.
Let's fix it today.
```
- Inter Tight · 48px · weight 400 · `#202020` · centered

**Subtext:**
```
Join 10,000+ B2B teams using SalesTracker CRM.
Setup takes 4 hours. ROI shows in 90 days.
```
- Inter · 18px · `#4d4d4d` · centered

**Two buttons (centered, gap 12px):**
- Primary: "Start free — no card needed" · `#202020` bg · white text · 0px radius · PolySans 16px · padding `14px 28px`
- Ghost: "Request a live demo" · transparent · `1px solid #202020` · `#202020` text · 0px radius

**Trust badges row (below buttons, centered):**
```
[SOC 2 Type II]  [GDPR Compliant]  [ISO 27001 Aligned]  [99.9% Uptime]
```
- Each: Inter 12px · `#828282` · with Phosphor `ShieldCheck` icon (16px · `#202020`) before text

---

### 5.13 — Footer (`components/layout/Footer.tsx`)

**Background: `#202020` (graphite) · Padding: 60px 0 40px 0**
**Text: `#efefef` and `#828282`**

**4-column layout:**

Col 1 (25%): Brand wordmark + tagline "Pipeline intelligence for B2B revenue teams." + social icons (Twitter, LinkedIn, GitHub) in `#828282`, hover `#ffffff`

Col 2 (25%): **Product** links — Features · Integrations · Pricing · Changelog · Security · API Docs

Col 3 (25%): **Company** links — About · Blog · Careers · Press · Contact

Col 4 (25%): **Resources** — Documentation · Help Center · Status Page · Affiliate Program

**Bottom bar (border-top `1px solid #4d4d4d`):**
- Left: "© 2025 SalesTracker. All rights reserved."
- Center: `[Privacy Policy]  [Terms of Service]  [Cookie Preferences]`
- Right: Language selector (Inter Tight 14px · `#828282`)
- All Inter 13px · `#828282`

---

## 6. Responsiveness Specifications

### Breakpoints (Tailwind v4)

```css
/* Mobile first — override at each breakpoint */
/* xs:  0–479px   → single column, nav collapses */
/* sm:  480–767px → single column, larger type   */
/* md:  768–1023px→ 2 columns debut              */
/* lg:  1024–1279px→ full desktop layout         */
/* xl:  1280px+   → max-width container centered */
```

### Critical Responsive Rules

| Component | Mobile (< 768px) | Desktop (≥ 1024px) |
|-----------|------------------|---------------------|
| Hero | Stack to single column. Headline 36px. Cards stack vertically (no overlay). | Two-column. 66px headline. Cards floating cluster. |
| Nav | Hamburger drawer | Floating pill |
| Features Grid | Single column (each card full-width) | Asymmetric bento |
| Stats Grid | 2×3 grid | 6-column single row |
| Pricing | Vertical stack | Horizontal 3 cards |
| Testimonials | Draggable carousel | Horizontal 3 cards |
| Footer | 2-column → 1-column | 4-column |

**Mobile-specific:**
- Touch targets: minimum 48×48px (all buttons, links, accordion triggers)
- `touch-action: manipulation` on all interactive elements
- Hero CTA buttons: full width on `< 480px`
- Reduced GSAP animations: on `prefers-reduced-motion: reduce`, disable all GSAP tweens (but keep Framer Motion with `duration: 0`)
- NavBar: `position: sticky` (not `fixed`) to avoid iOS 100vh issues

---

## 7. Performance Requirements

- **LCP < 2.5s** on mobile 4G: Hero image replaced with pure CSS/SVG cards — no external images above fold
- **CLS < 0.1**: Reserve explicit width/height for all font-loaded elements. Use `font-display: swap` on Inter Tight
- **FID/INP < 200ms**: Defer GSAP + ScrollTrigger registration with `next/dynamic` + `ssr: false`
- **Bundle**: GSAP ScrollTrigger tree-shaken — import only `ScrollTrigger`, not `gsap/all`
- **Images**: All below-fold images in `next/image` with `loading="lazy"` and explicit `width/height`
- **Fonts**: Only Inter 400/500/600 + Inter Tight 400 loaded — no other weights

### Dynamic imports for animation libraries:

```tsx
// In Hero.tsx — animations enhance, never block
import dynamic from 'next/dynamic';

const AnimatedCluster = dynamic(
  () => import('@/components/ui/AnimatedCluster'),
  { ssr: false, loading: () => <StaticClusterFallback /> }
);
```

---

## 8. TanStack Query Integration

Use TanStack Query v5 for:
1. **Pricing data** — fetched from `/api/pricing` with `staleTime: 1000 * 60 * 60` (1 hour)
2. **Testimonial data** — fetched from `/api/testimonials`
3. **Integration list** — fetched from `/api/integrations`

**Server prefetch pattern (App Router):**

```tsx
// app/page.tsx
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

export default async function Page() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({ queryKey: ['pricing'], queryFn: fetchPricing }),
    queryClient.prefetchQuery({ queryKey: ['testimonials'], queryFn: fetchTestimonials }),
  ]);

  return (
    
      
      
      
      {/* ... */}
    
  );
}
```

---

## 9. Accessibility Checklist

- `

` exists exactly once (in Hero)
- Heading hierarchy: h1 → h2 (section titles) → h3 (feature cards) — no skips
- All Phosphor icons: `aria-hidden="true"` when decorative; `aria-label` when standalone
- Color contrast: all body text on `#efefef` or `#ffffff` backgrounds exceeds 4.5:1
- Skip link: `Skip to main content`
- FAQ accordion: `aria-expanded` · `aria-controls` · `role="button"` on triggers
- `prefers-reduced-motion`: Disable GSAP countUp (show final values) and all Framer transforms when true
- Pricing cards: `aria-label="Growth plan, $29 per user per month, most popular"`
- Form inputs (demo request): visible `` elements, not placeholder-only
- Focus rings: `outline: 2px solid #ff682c; outline-offset: 2px` on all interactive elements

---

## 10. Copy Glossary (Use These Exact Terms)

| Use | Avoid |
|-----|-------|
| "revenue team" | "salespeople" |
| "pipeline visibility" | "pipeline management" |
| "deal closure" | "deal closing" |
| "AI lead scoring" | "machine learning prediction" |
| "revenue forecasting" | "sales projections" |
| "B2B teams" | "businesses", "companies" |
| "4-hour onboarding" | "quick setup" |
| "Request demo" | "Book a call", "Schedule a meeting" |
| "Start free" | "Sign up free", "Get started" |
| "Contact intelligence" | "contact enrichment" |

---

## 11. File Naming & Export Conventions

```
PascalCase for components:   NavBar.tsx, Hero.tsx, DataCard.tsx
camelCase for hooks/utils:   useCountUp.ts, useScrollReveal.ts, fetchPricing.ts
kebab-case for CSS/pages:    globals.css, not-found.tsx
SCREAMING_SNAKE for consts:  STATS_DATA, PRICING_TIERS, FAQ_ITEMS
```

All section components: default export + named `export const metadata` for AEO semantic data attributes.

---

## 12. Implementation Order

Build in this sequence to ship a working demo fast:

1. `globals.css` — full token system
2. `app/layout.tsx` — metadata + JSON-LD schemas + font loading
3. `NavBar.tsx` — floating pill nav
4. `Hero.tsx` — static layout first, animate second
5. `LogoStrip.tsx` — GSAP marquee
6. `AnalyticsProof.tsx` — GSAP countUp (biggest impact per dev hour)
7. `FeaturesGrid.tsx` — static, then Framer reveals
8. `Pricing.tsx` — TanStack Query fetch
9. `FAQ.tsx` — Framer accordion + JSON-LD
10. `FinalCTA.tsx` — static
11. `Footer.tsx` — static
12. SEO audit pass: verify all JSON-LD, meta, sitemap, robots
13. Responsiveness audit: test each breakpoint
14. Performance audit: Lighthouse ≥ 90 on all 4 metrics

---

*End of master prompt. Every design decision above derives from the Ventriloc design system. Every structural decision derives from B2B SaaS conversion best practices. Every SEO/AEO/GEO decision derives from 2026 AI search indexing requirements.*

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/18d83cab-7399-45a5-971e-574cf293d8ab).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
