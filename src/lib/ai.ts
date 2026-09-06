import type { Lead, Project } from "@/lib/types";

export async function generateProposal(input: {
  clientName: string;
  projectTitle: string;
  projectDescription: string;
  services: string[];
  priceUsd: number;
  timeline: string;
  additionalRequirements?: string;
}) {
  return `Executive summary\nWe are excited to partner with ${input.clientName} on ${input.projectTitle}.\n\nClient problem\n${input.projectDescription}\n\nProposed solution\nWe will deliver ${input.services.join(", ")} with measurable business outcomes.\n\nScope of work\n- Discovery and planning\n- Design/development execution\n- QA and launch\n\nDeliverables\n- Production-ready implementation\n- Documentation and handoff\n\nTimeline\n${input.timeline}\n\nInvestment\nUSD $${input.priceUsd.toLocaleString()}\n\nTerms\n50% upfront, 50% on completion.\n\nNext steps\nApprove proposal and schedule kickoff.${input.additionalRequirements ? `\n\nAdditional requirements\n${input.additionalRequirements}` : ""}`;
}

export async function generateFollowUp(lead: Lead) {
  return `Hi ${lead.name}, just checking in on your ${lead.service} request for ${lead.company}. If timing is right this week, I can share next steps and a clear estimate.`;
}

export async function generateLeadScore(lead: Lead) {
  const score = Math.min(
    100,
    Math.max(0, Math.round((lead.estimatedBudgetUsd / 500) * 10 + (lead.status === "Qualified" ? 35 : 20))),
  );
  return {
    score,
    explanation:
      "Score considers stated budget, qualification status, and follow-up recency. Higher budget and qualified intent increase conversion likelihood.",
  };
}

export async function generateProjectTasks(project: Project) {
  return [
    "Discovery",
    "Sitemap",
    "Wireframes",
    "UI design",
    "Homepage development",
    "Services page",
    "Contact page",
    "Mobile optimization",
    "SEO setup",
    "Testing",
    "Client review",
    "Deployment",
  ].map((title) => ({
    title,
    description: `${title} for ${project.name}`,
  }));
}

export async function generateBusinessInsight(input: { staleLeads: number; outstandingInvoicesUsd: number }) {
  return `You have ${input.staleLeads} leads that haven't received a follow-up in the last 5 days and USD $${input.outstandingInvoicesUsd.toLocaleString()} in outstanding invoices.`;
}

export async function askBusinessAssistant(question: string) {
  return `FlowPilot Assistant: Based on your workspace, here's a recommended action for "${question}": prioritize overdue follow-ups first, then move accepted proposals into active projects.`;
}
