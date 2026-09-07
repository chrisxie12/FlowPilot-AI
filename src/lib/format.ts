import type { LeadStatus, ClientStatus, ProposalStatus, ProjectStatus, TaskStatus, TaskPriority, InvoiceStatus } from "@/types/database";

export function formatCurrency(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(d);
}

export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(d);
}

type StatusType = LeadStatus | ClientStatus | ProposalStatus | ProjectStatus | TaskStatus | TaskPriority | InvoiceStatus;

const statusColors: Record<string, string> = {
  // Lead
  New: "bg-blue-100 text-blue-800",
  Contacted: "bg-yellow-100 text-yellow-800",
  Qualified: "bg-purple-100 text-purple-800",
  "Proposal Sent": "bg-indigo-100 text-indigo-800",
  Negotiating: "bg-orange-100 text-orange-800",
  Won: "bg-green-100 text-green-800",
  Lost: "bg-red-100 text-red-800",
  // Client
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
  // Proposal
  Draft: "bg-gray-100 text-gray-800",
  Sent: "bg-blue-100 text-blue-800",
  Viewed: "bg-yellow-100 text-yellow-800",
  Accepted: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
  // Project
  "In Progress": "bg-blue-100 text-blue-800",
  Review: "bg-yellow-100 text-yellow-800",
  Completed: "bg-green-100 text-green-800",
  "On Hold": "bg-orange-100 text-orange-800",
  // Task
  "To Do": "bg-gray-100 text-gray-800",
  Done: "bg-green-100 text-green-800",
  // Priority
  Low: "bg-gray-100 text-gray-800",
  Medium: "bg-yellow-100 text-yellow-800",
  High: "bg-red-100 text-red-800",
  // Invoice
  Paid: "bg-green-100 text-green-800",
  Overdue: "bg-red-100 text-red-800",
  Cancelled: "bg-gray-100 text-gray-800",
};

export function getStatusColor(status: StatusType): string {
  return statusColors[status] ?? "bg-gray-100 text-gray-800";
}
