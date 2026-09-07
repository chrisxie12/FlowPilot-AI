"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeft,
  Pencil,
  Send,
  CheckCircle,
  XCircle,
  Printer,
  Download,
  ChevronDown,
  FileText,
} from "lucide-react";

const statusColors: Record<string, string> = {
  Draft: "bg-slate-100 text-slate-700 border-slate-200",
  Sent: "bg-blue-100 text-blue-700 border-blue-200",
  Viewed: "bg-amber-100 text-amber-700 border-amber-200",
  Accepted: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Rejected: "bg-red-100 text-red-700 border-red-200",
};

const mockProposalDetails: Record<string, {
  title: string;
  client: string;
  status: string;
  createdAt: string;
  sections: {
    title: string;
    content: string;
  }[];
  deliverables: string[];
  timeline: { phase: string; duration: string; milestone: string }[];
}> = {
  "prop-1": {
    title: "E-commerce Platform Redesign",
    client: "Acme Corp",
    status: "Accepted",
    createdAt: "2026-08-15",
    sections: [
      {
        title: "Executive Summary",
        content:
          "This proposal outlines a comprehensive redesign of Acme Corp's e-commerce platform to enhance user experience, improve conversion rates, and establish a scalable foundation for future growth. Our approach combines modern design principles with robust technical architecture to deliver measurable business results.",
      },
      {
        title: "Client Problem",
        content:
          "Acme Corp's current e-commerce platform suffers from outdated UI/UX design, poor mobile responsiveness, slow page load times, and a cumbersome checkout process. These issues contribute to a 68% cart abandonment rate and declining customer satisfaction scores.",
      },
      {
        title: "Proposed Solution",
        content:
          "We propose a ground-up redesign utilizing headless commerce architecture with Next.js for the storefront, integrated with your existing Shopify backend. This approach delivers lightning-fast page loads, seamless mobile experiences, and a streamlined checkout flow optimized for conversion.",
      },
      {
        title: "Scope of Work",
        content:
          "The project encompasses a full discovery phase, UX research and wireframing, visual design, frontend development, backend integration, performance optimization, and QA testing. We will also provide comprehensive documentation and knowledge transfer to your internal team.",
      },
      {
        title: "Investment",
        content: "$24,500 total investment, broken down as:\n- Discovery & Research: $3,200\n- UX Design & Prototyping: $5,800\n- Visual Design: $4,500\n- Frontend Development: $7,000\n- Backend Integration & Testing: $4,000\n\nPayment schedule: 30% upon signing, 40% at design approval, 30% upon launch.",
      },
      {
        title: "Terms",
        content:
          "This proposal is valid for 30 days from the date of issue. The estimated timeline is 10 weeks from project kickoff. All intellectual property developed during this engagement will transfer to Acme Corp upon final payment. We provide a 90-day post-launch warranty covering any bugs or issues.",
      },
    ],
    deliverables: [
      "Complete UX research report and personas",
      "Wireframes for all key pages (desktop & mobile)",
      "High-fidelity UI designs in Figma",
      "Fully responsive Next.js frontend",
      "Integration with existing Shopify backend",
      "Performance optimization (target: <2s LCP)",
      "Comprehensive technical documentation",
      "90-day post-launch support",
    ],
    timeline: [
      { phase: "Discovery & Research", duration: "Week 1-2", milestone: "Research Report" },
      { phase: "UX Design & Wireframing", duration: "Week 3-4", milestone: "Wireframe Approval" },
      { phase: "Visual Design", duration: "Week 5-6", milestone: "Design Approval" },
      { phase: "Frontend Development", duration: "Week 7-9", milestone: "Dev Complete" },
      { phase: "QA & Launch", duration: "Week 10", milestone: "Go Live" },
    ],
  },
};

function getDefaultProposal(id: string) {
  return {
    title: "Project Proposal",
    client: "Client",
    status: "Draft",
    createdAt: new Date().toISOString().split("T")[0],
    sections: [
      {
        title: "Executive Summary",
        content:
          "We are pleased to present this proposal for your consideration. Our team has extensive experience in delivering high-quality solutions that drive business growth and operational efficiency.",
      },
      {
        title: "Proposed Solution",
        content:
          "Our approach leverages modern technologies and proven methodologies to deliver a solution that meets your specific requirements while ensuring scalability and maintainability.",
      },
      {
        title: "Investment",
        content:
          "The total investment for this project will be discussed based on the final scope of work. We offer flexible payment terms to accommodate your budget.",
      },
    ],
    deliverables: [
      "Project requirements document",
      "Solution architecture",
      "Development and implementation",
      "Testing and quality assurance",
      "Deployment and launch",
    ],
    timeline: [
      { phase: "Planning", duration: "Week 1-2", milestone: "Approve plan" },
      { phase: "Development", duration: "Week 3-8", milestone: "Feature complete" },
      { phase: "Testing & Launch", duration: "Week 9-10", milestone: "Go live" },
    ],
  };
}

export default function ProposalDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const proposal = mockProposalDetails[id] || getDefaultProposal(id);
  const [status, setStatus] = useState(proposal.status);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/proposals">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{proposal.title}</h1>
            <p className="text-muted-foreground">{proposal.client}</p>
          </div>
        </div>
        <Badge variant="outline" className={statusColors[status]}>
          {status}
        </Badge>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Sent">Sent</SelectItem>
            <SelectItem value="Viewed">Viewed</SelectItem>
            <SelectItem value="Accepted">Accepted</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline">
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>
        <Button>
          <Send className="mr-2 h-4 w-4" />
          Send
        </Button>
        <Button variant="outline" className="text-emerald-600">
          <CheckCircle className="mr-2 h-4 w-4" />
          Accept
        </Button>
        <Button variant="outline" className="text-destructive">
          <XCircle className="mr-2 h-4 w-4" />
          Reject
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Export
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" />
              Export as PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <FileText className="h-4 w-4" />
        Created{" "}
        {new Date(proposal.createdAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {proposal.sections.map((section) => (
            <Card key={section.title}>
              <CardHeader>
                <CardTitle className="text-lg">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {section.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Deliverables</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {proposal.deliverables.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-0">
              {proposal.timeline.map((phase, index) => (
                <div key={index}>
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                      {index < proposal.timeline.length - 1 && (
                        <div className="h-12 w-px bg-border" />
                      )}
                    </div>
                    <div className="pb-4">
                      <p className="font-medium text-sm">{phase.phase}</p>
                      <p className="text-xs text-muted-foreground">{phase.duration}</p>
                      <p className="text-xs text-muted-foreground">
                        Milestone: {phase.milestone}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                <li>Review this proposal carefully</li>
                <li>Discuss any questions or adjustments</li>
                <li>Approve and sign the agreement</li>
                <li>Submit initial payment to begin</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
