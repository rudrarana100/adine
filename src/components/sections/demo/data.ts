export type DialLead = {
  id: string;
  name: string;
  company: string;
  phone: string;
  category: string;
  location: string;
  value: string;
};

export const DIAL_LEADS: DialLead[] = [
  {
    id: "dl-1",
    name: "Rahul Mehta",
    company: "Meridian Technologies",
    phone: "+91 98204 55123",
    category: "Software",
    location: "Mumbai",
    value: "$84K",
  },
  {
    id: "dl-2",
    name: "Sarah Chen",
    company: "Coralth Systems",
    phone: "+91 99012 33210",
    category: "IT Services",
    location: "Bangalore",
    value: "$62K",
  },
  {
    id: "dl-3",
    name: "Marcus Webb",
    company: "Paravox Labs",
    phone: "+91 99880 12345",
    category: "Manufacturing",
    location: "Delhi",
    value: "$220K",
  },
  {
    id: "dl-4",
    name: "Priya Nair",
    company: "Opacus Group",
    phone: "+91 97654 00012",
    category: "Logistics",
    location: "Chennai",
    value: "$41K",
  },
];

export type Deal = {
  id: string;
  name: string;
  company: string;
  value: number;
};

export const PIPELINE_STAGES = [
  "Cold Lead",
  "Warm Prospect",
  "Meeting Booked",
  "Closed Won",
  "Closed Lost",
] as const;

export type Stage = (typeof PIPELINE_STAGES)[number];

export const PIPELINE_DEALS: Record<Stage, Deal[]> = {
  "Cold Lead": [
    { id: "p1", name: "Fenwick Co", company: "Fenwick Logistics", value: 48000 },
    { id: "p2", name: "Cerida", company: "Cerida Retail", value: 32000 },
    { id: "p3", name: "Runewell", company: "Runewell Labs", value: 96000 },
  ],
  "Warm Prospect": [
    { id: "p4", name: "Paravox", company: "Paravox Labs", value: 220000 },
    { id: "p5", name: "Tenloft", company: "Tenloft Group", value: 310000 },
  ],
  "Meeting Booked": [
    { id: "p6", name: "Vortex", company: "Vortex Media", value: 155000 },
    { id: "p7", name: "Brightledge", company: "Brightledge Ltd", value: 500000 },
  ],
  "Closed Won": [{ id: "p8", name: "Meridian", company: "Meridian Tech", value: 430000 }],
  "Closed Lost": [],
};

export type FollowUp = {
  id: string;
  lead: string;
  company: string;
  task: string;
  due: "Overdue" | "Today" | "Upcoming";
};

export const FOLLOW_UPS: FollowUp[] = [
  {
    id: "f1",
    lead: "Rahul Mehta",
    company: "Meridian Tech",
    task: "Call back — gatekeeper",
    due: "Overdue",
  },
  {
    id: "f2",
    lead: "Sarah Chen",
    company: "Coralth Systems",
    task: "Send proposal deck",
    due: "Overdue",
  },
  {
    id: "f3",
    lead: "Marcus Webb",
    company: "Paravox Labs",
    task: "Confirm Google Meet",
    due: "Today",
  },
  {
    id: "f4",
    lead: "Priya Nair",
    company: "Opacus Group",
    task: "WhatsApp follow-up",
    due: "Today",
  },
  { id: "f5", lead: "James Okafor", company: "Tenloft", task: "Proposal call", due: "Upcoming" },
  { id: "f6", lead: "Ana Rossi", company: "Vortex Media", task: "Intro call", due: "Upcoming" },
];

export const CALL_OUTCOMES = [
  { name: "Connected", value: 42, color: "var(--color-graphite)" },
  { name: "Interested", value: 18, color: "var(--color-ember)" },
  { name: "Callback", value: 24, color: "#9a8b5a" },
  { name: "Not interested", value: 31, color: "#c9c9c9" },
  { name: "Voicemail", value: 55, color: "#e4e4e4" },
];

export const WEEKLY_CALLS = [
  { day: "Mon", calls: 118 },
  { day: "Tue", calls: 141 },
  { day: "Wed", calls: 129 },
  { day: "Thu", calls: 168 },
  { day: "Fri", calls: 152 },
  { day: "Sat", calls: 86 },
  { day: "Sun", calls: 54 },
];
