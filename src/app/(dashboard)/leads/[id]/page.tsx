"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/layout/page-header";
import { getStatusColor, formatDate, formatCurrency } from "@/lib/format";
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Mail,
  Phone,
  Globe,
  FileText,
  Calendar,
  Clock,
  UserCheck,
  MessageSquare,
  CheckCircle2,
  Circle,
} from "lucide-react";
import type { LeadStatus } from "@/types/database";

interface Lead {
  id: string;
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
  created_at: string;
  last_contacted_at: string | null;
  next_followup_at: string | null;
}

const lead: Lead = {
  id: "1",
  name: "Sarah Johnson",
  company: "TechStart Inc",
  email: "sarah@techstartinc.com",
  phone: "+1 (555) 123-4567",
  website: "https://techstartinc.com",
  service: "Website Redesign",
  estimated_budget: 8500,
  lead_source: "Referral",
  notes:
    "Interested in a complete website overhaul. Currently using WordPress but wants to migrate to a modern stack. Decision maker is the CTO who prefers React-based solutions.",
  status: "Proposal Sent",
  lead_score: 87,
  created_at: "2026-08-15T10:00:00Z",
  last_contacted_at: "2026-09-05T14:30:00Z",
  next_followup_at: "2026-09-10T09:00:00Z",
};

const activityTimeline = [
  {
    id: 1,
    type: "proposal" as const,
    title: "Proposal sent",
    description: "Website Redesign Proposal - $8,500",
    date: "Sep 5, 2026",
    time: "2:30 PM",
  },
  {
    id: 2,
    type: "call" as const,
    title: "Discovery call completed",
    description: "Discussed requirements, timeline, and budget",
    date: "Sep 2, 2026",
    time: "11:00 AM",
  },
  {
    id: 3,
    type: "email" as const,
    title: "Follow-up email sent",
    description: "Shared case studies and portfolio",
    date: "Aug 28, 2026",
    time: "3:15 PM",
  },
  {
    id: 4,
    type: "note" as const,
    title: "Lead created",
    description: "Referred by Acme Corp",
    date: "Aug 15, 2026",
    time: "10:00 AM",
  },
];

function getTimelineIcon(type: string) {
  switch (type) {
    case "proposal":
      return <FileText className="h-4 w-4 text-indigo-500" />;
    case "call":
      return <Phone className="h-4 w-4 text-emerald-500" />;
    case "email":
      return <Mail className="h-4 w-4 text-blue-500" />;
    case "note":
      return <MessageSquare className="h-4 w-4 text-gray-500" />;
    default:
      return <Circle className="h-4 w-4 text-gray-400" />;
  }
}

function getLeadScoreColor(score: number): string {
  if (score >= 80) return "text-green-600";
  if (score >= 50) return "text-yellow-600";
  return "text-red-600";
}

function getLeadScoreBg(score: number): string {
  if (score >= 80) return "bg-green-500";
  if (score >= 50) return "bg-yellow-500";
  return "bg-red-500";
}

export default function LeadDetailPage() {
  const params = useParams();
  const leadId = params.id as string;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/leads">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <PageHeader
            title={lead.name}
            description={lead.company}
            action={
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <UserCheck className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Name</p>
                    <p className="text-sm font-medium">{lead.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Company</p>
                    <p className="text-sm font-medium">{lead.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">{lead.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium">{lead.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Website</p>
                    <p className="text-sm font-medium">{lead.website}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Service</p>
                  <p className="text-sm font-medium">{lead.service}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Estimated Budget
                  </p>
                  <p className="text-sm font-medium">
                    {formatCurrency(lead.estimated_budget)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Lead Source
                  </p>
                  <p className="text-sm font-medium">{lead.lead_source}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  <Badge
                    variant="secondary"
                    className={getStatusColor(lead.status)}
                  >
                    {lead.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Created Date
                  </p>
                  <p className="text-sm font-medium">
                    {formatDate(lead.created_at)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Last Contacted
                  </p>
                  <p className="text-sm font-medium">
                    {lead.last_contacted_at
                      ? formatDate(lead.last_contacted_at)
                      : "Never"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Next Follow-up
                  </p>
                  <p className="text-sm font-medium">
                    {lead.next_followup_at
                      ? formatDate(lead.next_followup_at)
                      : "Not scheduled"}
                  </p>
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground mb-1">Notes</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {lead.notes}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lead Score</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span
                  className={`text-4xl font-bold ${getLeadScoreColor(lead.lead_score)}`}
                >
                  {lead.lead_score}
                </span>
                <span className="text-sm text-muted-foreground">/100</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${getLeadScoreBg(lead.lead_score)}`}
                  style={{ width: `${lead.lead_score}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {lead.lead_score >= 80
                  ? "High potential lead. Prioritize follow-up."
                  : lead.lead_score >= 50
                    ? "Medium potential. Consider additional nurturing."
                    : "Low potential. May need re-qualification."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {lead.status === "Won" ? (
                <Button className="w-full" size="lg">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Convert to Client
                </Button>
              ) : (
                <Button className="w-full" variant="outline">
                  <Clock className="mr-2 h-4 w-4" />
                  Schedule Follow-up
                </Button>
              )}
              <Button className="w-full" variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </Button>
              <Button className="w-full" variant="outline">
                <Phone className="mr-2 h-4 w-4" />
                Log Call
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-4">
                <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border" />
                {activityTimeline.map((activity, index) => (
                  <div key={activity.id} className="relative flex gap-3">
                    <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-background">
                      {getTimelineIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {activity.date} at {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
