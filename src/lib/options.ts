export type OptionKey = "a" | "b" | "c";

export interface Option {
  key: OptionKey;
  letter: string;
  name: string;
  tagline: string;
  problem: string;
  description: string;
  benefits: string[];
  color: string;
  bgColor: string;
  borderColor: string;
  situations: string[];
  outcomes: string[];
}

export const OPTIONS: Record<OptionKey, Option> = {
  a: {
    key: "a",
    letter: "A",
    name: "GrowLocal",
    tagline: "Stop depending on referrals",
    problem: "Lead Generation & Customer Acquisition",
    description:
      "Automated customer acquisition system for local businesses. Get a steady pipeline of new clients without relying on word-of-mouth or expensive ad agencies.",
    benefits: [
      "Automated follow-up on every missed call",
      "SEO & Google presence setup done-for-you",
      "Weekly leads report so you always know what's coming",
    ],
    color: "#3B82F6",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    situations: [
      "I rely mostly on word-of-mouth and referrals",
      "I've tried ads but didn't see enough return",
      "I have capacity for more clients but can't find them",
      "I recently started and need my first customers",
      "My lead flow is inconsistent — feast or famine",
    ],
    outcomes: [
      "Get 5–10 new qualified leads per month consistently",
      "Reduce dependency on referrals to under 50% of revenue",
      "Have a predictable monthly revenue I can plan around",
      "Fill my calendar without spending hours on marketing",
    ],
  },
  b: {
    key: "b",
    letter: "B",
    name: "FinanceClear",
    tagline: "Know your numbers without an accountant",
    problem: "Financial Management & Cash Flow",
    description:
      "Financial clarity dashboard built for small business owners. Understand your cash flow, prepare for taxes, and make confident money decisions — no accounting degree needed.",
    benefits: [
      "Real-time cash flow dashboard",
      "Automated tax prep & quarterly estimates",
      "Plain-English profit & loss so you actually understand it",
    ],
    color: "#10B981",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    situations: [
      "I don't track business finances regularly",
      "Tax season stresses me out every year",
      "I'm not sure if my business is actually profitable",
      "I mix personal and business finances",
      "I have a bookkeeper but don't understand the reports",
    ],
    outcomes: [
      "Know exactly how much profit I made each month",
      "Never be surprised by a tax bill again",
      "Make pricing and hiring decisions with confidence",
      "Spend less than 1 hour per week on financial admin",
    ],
  },
  c: {
    key: "c",
    letter: "C",
    name: "OpsFlow",
    tagline: "Replace 5 tools with one",
    problem: "Operations & Admin Overload",
    description:
      "All-in-one operations platform for service businesses. Scheduling, billing, follow-ups, and client communication in one place — so you can focus on the work instead of the admin.",
    benefits: [
      "Scheduling, billing & follow-ups in one dashboard",
      "Automated reminders so clients never no-show",
      "Client communication history in one thread",
    ],
    color: "#8B5CF6",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-200",
    situations: [
      "I use 4+ different tools that don't talk to each other",
      "Admin work takes more time than serving clients",
      "I miss follow-ups because there's no system",
      "I spend hours each week on scheduling and invoicing",
      "I'm the only one who knows how anything works",
    ],
    outcomes: [
      "Cut admin time by at least half",
      "Never miss a follow-up or drop a client again",
      "Have a system someone else could run if I'm away",
      "Close jobs faster with automated billing",
    ],
  },
};

export const BUDGET_OPTIONS = [
  "$0 – $49 / month",
  "$50 – $99 / month",
  "$100 – $199 / month",
  "$200 – $499 / month",
  "$500+ / month",
];
