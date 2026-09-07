export interface AIResponse {
  content: string;
  confidence?: number;
}

export async function generateProposal(input: {
  clientName: string;
  projectTitle: string;
  projectDescription: string;
  services: string;
  price: number;
  timeline: string;
}): Promise<AIResponse> {
  // Mock AI response - replace with actual API call
  return {
    content: `Executive Summary\n\nWe are pleased to present this proposal for ${input.projectTitle} for ${input.clientName}. Our team will deliver a comprehensive solution that addresses your specific needs.\n\nClient Problem\n\n${input.clientName} needs a modern, responsive web presence that effectively communicates their brand value and drives conversions.\n\nProposed Solution\n\nWe will design and develop a custom solution using modern technologies, focusing on performance, accessibility, and user experience.\n\nScope of Work\n\n${input.services}\n\nTimeline\n\n${input.timeline}\n\nInvestment\n\n$${input.price.toLocaleString()}\n\nTerms\n\nPayment: 50% upfront, 50% upon completion.\nAll work remains property of the client upon full payment.\n\nNext Steps\n\n1. Review and approve this proposal\n2. Sign the service agreement\n3. Schedule project kickoff meeting`,
    confidence: 0.92,
  };
}

export async function generateFollowUp(leadName: string, context: string): Promise<AIResponse> {
  return {
    content: `Hi ${leadName},\n\nI wanted to follow up on our recent conversation. I understand you're looking for help with ${context}, and I'd love to discuss how we can move forward.\n\nDo you have time for a quick 15-minute call this week?\n\nBest regards`,
    confidence: 0.88,
  };
}

export async function generateLeadScore(leadData: {
  engagement: number;
  budgetFit: number;
  timelineAlignment: number;
  interestLevel: number;
}): Promise<AIResponse> {
  const score = Math.round(
    (leadData.engagement * 0.3 +
      leadData.budgetFit * 0.25 +
      leadData.timelineAlignment * 0.25 +
      leadData.interestLevel * 0.2)
  );
  return {
    content: `Lead Score: ${score}/100\n\nThis lead has ${score > 70 ? 'high' : score > 40 ? 'medium' : 'low'} potential based on:\n- Engagement level: ${leadData.engagement}%\n- Budget fit: ${leadData.budgetFit}%\n- Timeline alignment: ${leadData.timelineAlignment}%\n- Interest level: ${leadData.interestLevel}%`,
    confidence: 0.85,
  };
}

export async function generateProjectTasks(projectDescription: string): Promise<AIResponse> {
  return {
    content: JSON.stringify([
      { title: "Discovery & Research", priority: "High", description: "Understand requirements and gather information" },
      { title: "Sitemap & Information Architecture", priority: "High", description: "Plan site structure and navigation" },
      { title: "Wireframes", priority: "Medium", description: "Create low-fidelity wireframes for key pages" },
      { title: "UI Design", priority: "High", description: "Design high-fidelity mockups" },
      { title: "Homepage Development", priority: "High", description: "Build the homepage" },
      { title: "Inner Pages Development", priority: "Medium", description: "Build remaining pages" },
      { title: "Mobile Optimization", priority: "High", description: "Ensure responsive design across devices" },
      { title: "SEO Setup", priority: "Medium", description: "Implement on-page SEO best practices" },
      { title: "Testing & QA", priority: "High", description: "Cross-browser and device testing" },
      { title: "Client Review", priority: "Medium", description: "Gather feedback and make revisions" },
      { title: "Deployment", priority: "High", description: "Deploy to production environment" },
    ]),
    confidence: 0.9,
  };
}

export async function generateBusinessInsight(userData: {
  activeLeads: number;
  outstandingInvoices: number;
  overdueInvoices: number;
  activeProjects: number;
}): Promise<AIResponse> {
  const insights: string[] = [];
  if (userData.activeLeads > 3) {
    insights.push(`You have ${userData.activeLeads} active leads that need attention.`);
  }
  if (userData.overdueInvoices > 0) {
    insights.push(`${userData.overdueInvoices} invoice(s) are overdue. Consider sending a follow-up.`);
  }
  if (userData.outstandingInvoices > 5000) {
    insights.push(`You have $${userData.outstandingInvoices.toLocaleString()} in outstanding invoices.`);
  }
  if (insights.length === 0) {
    insights.push("Your business is looking healthy! Keep up the great work.");
  }
  return {
    content: insights.join("\n\n"),
    confidence: 0.87,
  };
}

export async function askBusinessAssistant(
  question: string,
  context?: string
): Promise<AIResponse> {
  // Mock responses based on common questions
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes("follow up") || lowerQuestion.includes("follow-up")) {
    return {
      content: "Based on your lead data, you have 3 leads that haven't been contacted in over 5 days:\n\n1. Sarah Johnson (Acme Corp) - Last contacted 7 days ago\n2. Mike Chen (TechStart) - Last contacted 6 days ago\n3. Emily Davis (Creative Co) - Last contacted 5 days ago\n\nI recommend reaching out to Sarah first as she has the highest lead score.",
      confidence: 0.91,
    };
  }
  
  if (lowerQuestion.includes("revenue") || lowerQuestion.includes("invoice")) {
    return {
      content: "Your current financial overview:\n\n• Outstanding invoices: $4,200\n• Overdue: $1,200 (2 invoices)\n• Paid this month: $3,800\n• Expected revenue: $12,450\n\nI suggest following up on the 2 overdue invoices to improve cash flow.",
      confidence: 0.94,
    };
  }
  
  if (lowerQuestion.includes("overdue") || lowerQuestion.includes("project")) {
    return {
      content: "You have 1 project that is past its due date:\n\n• E-commerce Redesign (Acme Corp) - Due 3 days ago, 78% complete\n\nThis project needs immediate attention. Consider allocating more time to complete it.",
      confidence: 0.89,
    };
  }
  
  if (lowerQuestion.includes("prioritize") || lowerQuestion.includes("today")) {
    return {
      content: "Here's what I recommend for today:\n\n1. Follow up with Sarah Johnson (highest priority lead)\n2. Complete the E-commerce Redesign project tasks\n3. Send the overdue invoice to Creative Co\n4. Review the new proposal from TechStart\n\nWould you like me to draft any follow-up messages?",
      confidence: 0.88,
    };
  }
  
  return {
    content: `I understand you're asking about: "${question}"\n\nBased on your business data, I can help you with:\n- Lead management and follow-ups\n- Project tracking and deadlines\n- Invoice and payment tracking\n- Business insights and recommendations\n\nCould you be more specific about what you'd like to know?`,
    confidence: 0.75,
  };
}
