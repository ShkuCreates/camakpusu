export type DeliveryType = "Digital" | "Physical" | "Both";

export type Task = {
  id: string;
  title: string;
  category: string;
  description: string;
  requirements: string[];
  requester: string;
  locality: string;
  deadline: string;
  budget: number;
  posted: string;
  status: "Open" | "Offer received" | "Payment pending" | "Active" | "Awaiting confirmation";
  format: DeliveryType;
  attachments: string[];
  college: string;
  urgency: "Urgent" | "This week" | "Flexible";
};

export type Offer = {
  provider: string;
  rating: number;
  completed: number;
  amount: number;
  eta: string;
  message: string;
};

export const tasks: Task[] = [
  {
    id: "task-10492",
    title: "Business Law Research",
    category: "Research",
    description:
      "Need help organizing research material and preparing a structured summary on contract law cases and key principles for a seminar deck.",
    requirements: [
      "Use recent case law where relevant",
      "Summarise 8–10 sources in a clear structure",
      "Deliver a clean document with headings and citations",
    ],
    requester: "@Rahul",
    locality: "Noida",
    deadline: "Due in 2 days",
    budget: 500,
    posted: "2h ago",
    status: "Open",
    format: "Digital",
    attachments: ["Course brief.pdf", "Reading list.docx"],
    college: "Symbiosis Law School",
    urgency: "Urgent",
  },
  {
    id: "task-10493",
    title: "Poster design for startup expo",
    category: "Design",
    description:
      "Need a polished one-page poster with a clean academic vibe for a student startup expo and presentation board.",
    requirements: [
      "A4 and social-size variants",
      "Use brand colors and minimal typography",
      "Editable source file preferred",
    ],
    requester: "@Ananya",
    locality: "South Delhi",
    deadline: "Due in 5 days",
    budget: 1200,
    posted: "5h ago",
    status: "Offer received",
    format: "Digital",
    attachments: ["theme.pdf"],
    college: "Delhi University",
    urgency: "This week",
  },
  {
    id: "task-10494",
    title: "Proofread dissertation chapter",
    category: "Proofreading",
    description:
      "Need a careful proofread and formatting pass for a 3,000-word economics dissertation chapter before submission.",
    requirements: [
      "Correct grammar and academic tone",
      "Check headings and citations",
      "Return editable .docx file",
    ],
    requester: "@Ishita",
    locality: "Gurugram",
    deadline: "Due tomorrow",
    budget: 850,
    posted: "1d ago",
    status: "Payment pending",
    format: "Digital",
    attachments: ["chapter_2.docx"],
    college: "BITS Pilani",
    urgency: "Urgent",
  },
  {
    id: "task-10495",
    title: "Handwritten notes for chemistry labs",
    category: "Notes",
    description:
      "Looking for a neat set of handwritten practical notes and short revision summaries for organic chemistry labs.",
    requirements: [
      "Clean handwritten pages",
      "Cover key experiments and formulas",
      "Keep pages legible and organized",
    ],
    requester: "@Navin",
    locality: "Central Delhi",
    deadline: "Due in 3 days",
    budget: 650,
    posted: "3d ago",
    status: "Open",
    format: "Physical",
    attachments: [],
    college: "IIT Delhi",
    urgency: "Flexible",
  },
];

export const offers: Offer[] = [
  {
    provider: "@Blackbeast",
    rating: 4.8,
    completed: 32,
    amount: 480,
    eta: "1 day",
    message: "I can structure the research into a clear summary and add citation notes before the final deadline.",
  },
  {
    provider: "@StudyNinja",
    rating: 4.9,
    completed: 18,
    amount: 520,
    eta: "18 hours",
    message: "I have worked on similar law research writing and can format it cleanly for a presentation-ready output.",
  },
];

export const walletTransactions = [
  { id: "TX-10291", date: "09 Sep", description: "Task completed: Business Law Research", amount: 500, status: "Credited" },
  { id: "TX-10274", date: "03 Sep", description: "Withdrawal request approved", amount: -500, status: "Paid" },
  { id: "TX-10251", date: "29 Aug", description: "Task completed: Poster design", amount: 350, status: "Credited" },
];

export const disputeReasons = [
  "Incomplete work",
  "Poor quality",
  "Late delivery",
  "Mismatch with requirements",
  "Other",
];

export const conversations = [
  {
    id: "chat-1",
    name: "@Rahul",
    preview: "Thanks, I’ve attached the brief and reference list.",
    time: "2m ago",
    unread: 2,
  },
  {
    id: "chat-2",
    name: "@Ananya",
    preview: "The poster draft looks good. Can we make one more revision?",
    time: "1h ago",
    unread: 0,
  },
  {
    id: "chat-3",
    name: "@Navin",
    preview: "I’ve scheduled the handover for the notes next week.",
    time: "Yesterday",
    unread: 0,
  },
];

export const transactionStates = [
  "DRAFT",
  "POSTED",
  "OFFER_RECEIVED",
  "PROVIDER_SELECTED",
  "PAYMENT_PENDING",
  "PAYMENT_CONFIRMED",
  "ACTIVE",
  "IN_PROGRESS",
  "SUBMITTED",
  "AWAITING_CONFIRMATION",
  "COMPLETED",
  "DISPUTED",
  "CANCELLED",
  "REFUNDED",
  "WITHDRAWAL_PENDING",
  "WITHDRAWAL_PROCESSING",
  "PAID",
];

export const paymentTimeline = [
  { label: "Payment requested", time: "09:42 AM" },
  { label: "Business account received", time: "09:46 AM" },
  { label: "Verification in progress", time: "10:05 AM" },
  { label: "Payment confirmed", time: "10:19 AM" },
];

export const adminMetrics = {
  activeTasks: 128,
  completedTasks: 642,
  pendingPayments: 38,
  pendingWithdrawals: 11,
  openDisputes: 7,
  platformRevenue: "₹84,500",
  registeredUsers: 2486,
};

export const profile = {
  username: "@Blackbeast",
  college: "B.Com Student",
  locality: "Noida",
  rating: 4.8,
  completedTasks: 32,
  completionRate: 96,
  memberSince: "Jan 2024",
  bio: "I help with research summaries, formatting, presentations, and clean design work for student projects.",
  skills: ["Research", "Design", "Formatting", "Presentation decks"],
};

export const recommendationFilters = [
  "Recommended",
  "Newest",
  "Nearby",
  "High budget",
  "Urgent",
];

export const notifications = [
  {
    id: "n-102",
    title: "New offer received",
    body: "@StudyNinja offered ₹520 for Research & Summary on Business Law Research.",
    time: "2 minutes ago",
    category: "Offer",
    unread: true,
  },
  {
    id: "n-101",
    title: "Payment confirmed",
    body: "Your wallet was credited ₹500 for the completed task: Poster design for startup expo.",
    time: "1 hour ago",
    category: "Wallet",
    unread: true,
  },
  {
    id: "n-100",
    title: "Task deadline reminder",
    body: "Your dissertation chapter proofread is due tomorrow. Send a final update to the requester.",
    time: "Today, 09:30 AM",
    category: "Reminder",
    unread: false,
  },
  {
    id: "n-099",
    title: "Withdrawal approved",
    body: "Your withdrawal request for ₹500 has moved to the payout processor queue.",
    time: "Yesterday",
    category: "Finance",
    unread: false,
  },
];

export const platformSettings = [
  {
    label: "Email alerts",
    description: "Receive important updates and deadline alerts in your inbox.",
    enabled: true,
  },
  {
    label: "Push notifications",
    description: "Get instant alerts for new offers, payment confirmations, and chats.",
    enabled: true,
  },
  {
    label: "Offer requests",
    description: "Allow students to send you direct service offers when your profile is active.",
    enabled: true,
  },
  {
    label: "Wallet notifications",
    description: "Receive payouts, verification, and withdrawal status updates.",
    enabled: true,
  },
  {
    label: "Admin review notices",
    description: "See escalation alerts and dispute updates from CampusAid review staff.",
    enabled: false,
  },
];
