import { generateBusinessInsight } from "@/lib/ai";
import type { Client, Invoice, Lead, Project, Proposal, Task } from "@/lib/types";

export const demoLeads: Lead[] = [
  {
    id: "lead_1",
    name: "Sarah Chen",
    company: "Northlight Studio",
    email: "sarah@northlight.studio",
    phone: "+1 415 555 0111",
    website: "northlight.studio",
    service: "Marketing website redesign",
    estimatedBudgetUsd: 6500,
    source: "Referral",
    notes: "Needs launch by Q4 campaign.",
    status: "Qualified",
    createdDate: "2026-08-18",
    lastContactedDate: "2026-08-30",
    nextFollowUpDate: "2026-09-07",
    score: 87,
  },
  {
    id: "lead_2",
    name: "Daniel Ortiz",
    company: "TrailWorks",
    email: "daniel@trailworks.co",
    phone: "+1 303 555 0182",
    website: "trailworks.co",
    service: "E-commerce optimization",
    estimatedBudgetUsd: 4200,
    source: "LinkedIn",
    notes: "Wants faster checkout.",
    status: "Proposal Sent",
    createdDate: "2026-08-21",
    lastContactedDate: "2026-08-26",
    nextFollowUpDate: "2026-09-06",
    score: 79,
  },
  {
    id: "lead_3",
    name: "Priya Nair",
    company: "Atlas Ops",
    email: "priya@atlasops.io",
    phone: "+91 22 5550 9911",
    website: "atlasops.io",
    service: "SaaS landing page",
    estimatedBudgetUsd: 2800,
    source: "Website",
    notes: "Need fast turnaround.",
    status: "Contacted",
    createdDate: "2026-08-25",
    lastContactedDate: "2026-08-31",
    nextFollowUpDate: "2026-09-08",
    score: 68,
  },
];

export const demoClients: Client[] = [
  {
    id: "client_1",
    name: "Sarah Chen",
    company: "Northlight Studio",
    email: "sarah@northlight.studio",
    phone: "+1 415 555 0111",
    website: "northlight.studio",
    notes: "Primary stakeholder for design approvals.",
    status: "Active",
    convertedFromLeadId: "lead_1",
  },
  {
    id: "client_2",
    name: "Marco Bell",
    company: "Bell Fitness",
    email: "marco@bellfit.com",
    phone: "+1 212 555 0903",
    website: "bellfit.com",
    notes: "Monthly maintenance retainer.",
    status: "Active",
  },
];

export const demoProposals: Proposal[] = [
  {
    id: "proposal_1",
    clientId: "client_1",
    projectTitle: "Northlight Website Revamp",
    projectDescription: "Improve conversion and modernize brand experience.",
    services: ["UX audit", "Web design", "Next.js build"],
    priceUsd: 6500,
    timeline: "6 weeks",
    status: "Viewed",
    createdAt: "2026-08-30",
    content: "Professional proposal draft...",
  },
];

export const demoProjects: Project[] = [
  {
    id: "project_1",
    clientId: "client_1",
    name: "Northlight Website Revamp",
    description: "Full redesign and performance improvements.",
    startDate: "2026-09-01",
    dueDate: "2026-10-15",
    budgetUsd: 6500,
    status: "In Progress",
    progress: 45,
  },
  {
    id: "project_2",
    clientId: "client_2",
    name: "Bell Fitness Landing Pages",
    description: "Campaign pages for paid ads.",
    startDate: "2026-08-24",
    dueDate: "2026-09-18",
    budgetUsd: 3800,
    status: "Review",
    progress: 80,
  },
];

export const demoTasks: Task[] = [
  {
    id: "task_1",
    projectId: "project_1",
    title: "Wireframes",
    description: "Homepage and services pages",
    dueDate: "2026-09-08",
    priority: "High",
    status: "In Progress",
  },
  {
    id: "task_2",
    projectId: "project_1",
    title: "SEO setup",
    description: "Metadata and schema",
    dueDate: "2026-09-20",
    priority: "Medium",
    status: "To Do",
  },
];

export const demoInvoices: Invoice[] = [
  {
    id: "invoice_1",
    invoiceNumber: "FP-2026-001",
    clientId: "client_1",
    projectId: "project_1",
    issueDate: "2026-09-01",
    dueDate: "2026-09-15",
    lineItems: [
      { description: "Phase 1 Design + Dev", quantity: 1, unitPriceUsd: 3000 },
      { description: "Discovery workshop", quantity: 1, unitPriceUsd: 600 },
    ],
    taxPercent: 8,
    discountPercent: 0,
    status: "Sent",
  },
  {
    id: "invoice_2",
    invoiceNumber: "FP-2026-002",
    clientId: "client_2",
    projectId: "project_2",
    issueDate: "2026-08-20",
    dueDate: "2026-09-03",
    lineItems: [{ description: "Landing pages package", quantity: 1, unitPriceUsd: 3800 }],
    taxPercent: 8,
    discountPercent: 5,
    status: "Overdue",
  },
];

export function getLeadById(id: string) {
  return demoLeads.find((lead) => lead.id === id);
}

export function getClientById(id: string) {
  return demoClients.find((client) => client.id === id);
}

export function getProposalById(id: string) {
  return demoProposals.find((proposal) => proposal.id === id);
}

export function getProjectById(id: string) {
  return demoProjects.find((project) => project.id === id);
}

export function getInvoiceById(id: string) {
  return demoInvoices.find((invoice) => invoice.id === id);
}

export function getProjectTasks(projectId: string) {
  return demoTasks.filter((task) => task.projectId === projectId);
}

export function getClientProjects(clientId: string) {
  return demoProjects.filter((project) => project.clientId === clientId);
}

export function getClientProposals(clientId: string) {
  return demoProposals.filter((proposal) => proposal.clientId === clientId);
}

export function getClientInvoices(clientId: string) {
  return demoInvoices.filter((invoice) => invoice.clientId === clientId);
}

export function calculateInvoiceTotal(invoice: Invoice) {
  const subtotal = invoice.lineItems.reduce((sum, item) => sum + item.quantity * item.unitPriceUsd, 0);
  const tax = subtotal * (invoice.taxPercent / 100);
  const discount = subtotal * (invoice.discountPercent / 100);
  return subtotal + tax - discount;
}

export async function getDashboardSummary() {
  const expectedRevenueUsd = demoProjects.reduce((sum, project) => sum + project.budgetUsd, 0);
  const outstandingInvoicesUsd = demoInvoices
    .filter((invoice) => invoice.status === "Sent" || invoice.status === "Overdue")
    .reduce((sum, invoice) => sum + calculateInvoiceTotal(invoice), 0);
  const activeLeads = demoLeads.filter((lead) => lead.status !== "Won" && lead.status !== "Lost").length;
  const activeClients = demoClients.filter((client) => client.status === "Active").length;
  const activeProjects = demoProjects.filter((project) => project.status !== "Completed").length;
  const followUpsDue = demoLeads.filter((lead) => lead.nextFollowUpDate <= "2026-09-06").length;
  const insight = await generateBusinessInsight({ staleLeads: 3, outstandingInvoicesUsd });

  return {
    expectedRevenueUsd,
    outstandingInvoicesUsd,
    activeLeads,
    activeClients,
    activeProjects,
    followUpsDue,
    insight,
  };
}
