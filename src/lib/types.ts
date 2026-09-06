export const leadStatuses = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Negotiating",
  "Won",
  "Lost",
] as const;

export const proposalStatuses = ["Draft", "Sent", "Viewed", "Accepted", "Rejected"] as const;
export const projectStatuses = ["Planning", "In Progress", "Review", "Completed", "On Hold"] as const;
export const invoiceStatuses = ["Draft", "Sent", "Paid", "Overdue", "Cancelled"] as const;
export const taskStatuses = ["To Do", "In Progress", "Done"] as const;
export const taskPriorities = ["Low", "Medium", "High"] as const;

export type LeadStatus = (typeof leadStatuses)[number];
export type ProposalStatus = (typeof proposalStatuses)[number];
export type ProjectStatus = (typeof projectStatuses)[number];
export type InvoiceStatus = (typeof invoiceStatuses)[number];
export type TaskStatus = (typeof taskStatuses)[number];
export type TaskPriority = (typeof taskPriorities)[number];

export type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  service: string;
  estimatedBudgetUsd: number;
  source: string;
  notes: string;
  status: LeadStatus;
  createdDate: string;
  lastContactedDate: string;
  nextFollowUpDate: string;
  score: number;
};

export type Client = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  notes: string;
  status: "Active" | "Inactive";
  convertedFromLeadId?: string;
};

export type Proposal = {
  id: string;
  clientId: string;
  projectTitle: string;
  projectDescription: string;
  services: string[];
  priceUsd: number;
  timeline: string;
  additionalRequirements?: string;
  status: ProposalStatus;
  createdAt: string;
  content: string;
};

export type Project = {
  id: string;
  clientId: string;
  name: string;
  description: string;
  startDate: string;
  dueDate: string;
  budgetUsd: number;
  status: ProjectStatus;
  progress: number;
};

export type Task = {
  id: string;
  projectId: string;
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
};

export type InvoiceLineItem = {
  description: string;
  quantity: number;
  unitPriceUsd: number;
};

export type Invoice = {
  id: string;
  invoiceNumber: string;
  clientId: string;
  projectId: string;
  issueDate: string;
  dueDate: string;
  lineItems: InvoiceLineItem[];
  taxPercent: number;
  discountPercent: number;
  status: InvoiceStatus;
};
