import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional().default(""),
  website: z.string().optional().default(""),
  service: z.string().min(1, "Service is required"),
  estimated_budget: z.coerce.number().min(0, "Budget must be positive"),
  lead_source: z.string().optional().default(""),
  notes: z.string().optional().default(""),
  status: z.enum(["New", "Contacted", "Qualified", "Proposal Sent", "Negotiating", "Won", "Lost"]).default("New"),
  lead_score: z.coerce.number().min(0).max(100).default(0),
  last_contacted_at: z.string().nullable().optional(),
  next_followup_at: z.string().nullable().optional(),
});

export type LeadFormData = z.infer<typeof leadSchema>;

export const clientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional().default(""),
  website: z.string().optional().default(""),
  notes: z.string().optional().default(""),
  status: z.enum(["active", "inactive"]).default("active"),
});

export type ClientFormData = z.infer<typeof clientSchema>;

export const proposalSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional().default(""),
  client_id: z.string().uuid("Invalid client"),
  project_title: z.string().min(1, "Project title is required"),
  project_description: z.string().optional().default(""),
  services: z.string().min(1, "Services are required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  timeline: z.string().optional().default(""),
  additional_requirements: z.string().optional().default(""),
  executive_summary: z.string().optional().default(""),
  client_problem: z.string().optional().default(""),
  proposed_solution: z.string().optional().default(""),
  scope_of_work: z.string().optional().default(""),
  deliverables: z.string().optional().default(""),
  investment: z.coerce.number().min(0, "Investment must be positive"),
  terms: z.string().optional().default(""),
  next_steps: z.string().optional().default(""),
  status: z.enum(["Draft", "Sent", "Viewed", "Accepted", "Rejected"]).default("Draft"),
});

export type ProposalFormData = z.infer<typeof proposalSchema>;

export const proposalItemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  unit_price: z.coerce.number().min(0, "Unit price must be positive"),
});

export type ProposalItemFormData = z.infer<typeof proposalItemSchema>;

export const projectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  client_id: z.string().uuid("Invalid client"),
  description: z.string().optional().default(""),
  start_date: z.string().min(1, "Start date is required"),
  due_date: z.string().min(1, "Due date is required"),
  budget: z.coerce.number().min(0, "Budget must be positive"),
  status: z.enum(["Planning", "In Progress", "Review", "Completed", "On Hold"]).default("Planning"),
  progress: z.coerce.number().min(0).max(100).default(0),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

export const taskSchema = z.object({
  project_id: z.string().uuid("Invalid project"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional().default(""),
  due_date: z.string().min(1, "Due date is required"),
  priority: z.enum(["Low", "Medium", "High"]).default("Medium"),
  status: z.enum(["To Do", "In Progress", "Done"]).default("To Do"),
});

export type TaskFormData = z.infer<typeof taskSchema>;

export const invoiceSchema = z.object({
  invoice_number: z.string().min(1, "Invoice number is required"),
  client_id: z.string().uuid("Invalid client"),
  project_id: z.string().uuid("Invalid project"),
  issue_date: z.string().min(1, "Issue date is required"),
  due_date: z.string().min(1, "Due date is required"),
  tax: z.coerce.number().min(0).default(0),
  discount: z.coerce.number().min(0).default(0),
  total: z.coerce.number().min(0, "Total must be positive"),
  status: z.enum(["Draft", "Sent", "Paid", "Overdue", "Cancelled"]).default("Draft"),
  notes: z.string().optional().default(""),
});

export type InvoiceFormData = z.infer<typeof invoiceSchema>;

export const invoiceItemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  unit_price: z.coerce.number().min(0, "Unit price must be positive"),
});

export type InvoiceItemFormData = z.infer<typeof invoiceItemSchema>;
