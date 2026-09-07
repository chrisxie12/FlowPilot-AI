"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/layout/empty-state";
import { getStatusColor } from "@/lib/format";
import { Search, Plus, UserPlus } from "lucide-react";
import type { LeadStatus } from "@/types/database";

interface Lead {
  id: string;
  name: string;
  company: string;
  service: string;
  status: LeadStatus;
  lead_score: number;
  next_followup_at: string | null;
}

const leads: Lead[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    company: "TechStart Inc",
    service: "Website Redesign",
    status: "Proposal Sent",
    lead_score: 87,
    next_followup_at: "2026-09-10",
  },
  {
    id: "2",
    name: "Michael Chen",
    company: "GreenLeaf Solutions",
    service: "SEO Campaign",
    status: "Qualified",
    lead_score: 72,
    next_followup_at: "2026-09-09",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    company: "BrightPath Marketing",
    service: "Brand Identity",
    status: "New",
    lead_score: 45,
    next_followup_at: null,
  },
  {
    id: "4",
    name: "James Wilson",
    company: "Apex Digital",
    service: "Social Media Management",
    status: "Won",
    lead_score: 92,
    next_followup_at: null,
  },
  {
    id: "5",
    name: "Priya Patel",
    company: "Nexus Tech",
    service: "Custom Web Application",
    status: "Lost",
    lead_score: 30,
    next_followup_at: null,
  },
];

function getLeadScoreColor(score: number): string {
  if (score >= 80) return "bg-green-100 text-green-800 border-green-200";
  if (score >= 50) return "bg-yellow-100 text-yellow-800 border-yellow-200";
  return "bg-red-100 text-red-800 border-red-200";
}

export default function LeadsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leads"
        description="Manage your sales pipeline"
        action={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Lead
          </Button>
        }
      />

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {filteredLeads.length === 0 ? (
        <EmptyState
          icon={UserPlus}
          title="No leads found"
          description={
            searchQuery
              ? "No leads match your search. Try a different query."
              : "Get started by adding your first lead to the pipeline."
          }
          action={
            !searchQuery ? (
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Lead
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Lead Score</TableHead>
                <TableHead>Next Follow-up</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <Link
                      href={`/leads/${lead.id}`}
                      className="font-medium text-foreground hover:underline"
                    >
                      {lead.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {lead.company}
                  </TableCell>
                  <TableCell>{lead.service}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={getStatusColor(lead.status)}
                    >
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getLeadScoreColor(lead.lead_score)}
                    >
                      {lead.lead_score}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {lead.next_followup_at
                      ? new Date(lead.next_followup_at).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )
                      : "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    {lead.status === "Won" ? (
                      <Button size="sm" variant="default">
                        Convert to Client
                      </Button>
                    ) : (
                      <Button size="sm" variant="ghost" asChild>
                        <Link href={`/leads/${lead.id}`}>View</Link>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
