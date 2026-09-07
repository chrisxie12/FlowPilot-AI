export interface Profile {
  id: string;
  created_at: string;
  updated_at: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
}

export type LeadStatus = "New" | "Contacted" | "Qualified" | "Proposal Sent" | "Negotiating" | "Won" | "Lost";

export interface Lead {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  service: string;
  estimated_budget: number;
  lead_source: string;
  notes: string;
  status: LeadStatus;
  lead_score: number;
  last_contacted_at: string | null;
  next_followup_at: string | null;
  user_id: string;
}

export type ClientStatus = "active" | "inactive";

export interface Client {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  notes: string;
  status: ClientStatus;
  user_id: string;
}

export type ProposalStatus = "Draft" | "Sent" | "Viewed" | "Accepted" | "Rejected";

export interface Proposal {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  client_id: string;
  project_title: string;
  project_description: string;
  services: string;
  price: number;
  timeline: string;
  additional_requirements: string;
  executive_summary: string;
  client_problem: string;
  proposed_solution: string;
  scope_of_work: string;
  deliverables: string;
  investment: number;
  terms: string;
  next_steps: string;
  status: ProposalStatus;
  user_id: string;
}

export interface ProposalItem {
  id: string;
  created_at: string;
  updated_at: string;
  proposal_id: string;
  description: string;
  quantity: number;
  unit_price: number;
}

export type ProjectStatus = "Planning" | "In Progress" | "Review" | "Completed" | "On Hold";

export interface Project {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  client_id: string;
  description: string;
  start_date: string;
  due_date: string;
  budget: number;
  status: ProjectStatus;
  progress: number;
  user_id: string;
}

export type TaskPriority = "Low" | "Medium" | "High";
export type TaskStatus = "To Do" | "In Progress" | "Done";

export interface Task {
  id: string;
  created_at: string;
  updated_at: string;
  project_id: string;
  title: string;
  description: string;
  due_date: string;
  priority: TaskPriority;
  status: TaskStatus;
  user_id: string;
}

export type InvoiceStatus = "Draft" | "Sent" | "Paid" | "Overdue" | "Cancelled";

export interface Invoice {
  id: string;
  created_at: string;
  updated_at: string;
  invoice_number: string;
  client_id: string;
  project_id: string;
  issue_date: string;
  due_date: string;
  tax: number;
  discount: number;
  total: number;
  status: InvoiceStatus;
  notes: string;
  user_id: string;
}

export interface InvoiceItem {
  id: string;
  created_at: string;
  updated_at: string;
  invoice_id: string;
  description: string;
  quantity: number;
  unit_price: number;
}

export interface AiGeneration {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  type: string;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  model: string;
}
