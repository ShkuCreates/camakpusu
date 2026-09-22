export type DeliveryType = "Digital" | "Physical" | "Both";

export type MarketplaceTask = {
  id: string;
  title: string;
  category: string;
  description: string;
  requester: string;
  locality: string;
  deadline: string;
  budget: number;
  posted: string;
  status: string;
  format: DeliveryType | string;
  college?: string | null;
  urgency?: string;
};

export const recommendationFilters = [
  "Recommended",
  "Newest",
  "Nearby",
  "Urgent",
];
