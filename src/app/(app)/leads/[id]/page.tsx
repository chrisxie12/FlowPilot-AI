import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateFollowUp, generateLeadScore } from "@/lib/ai";
import { getLeadById } from "@/lib/data";

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = getLeadById(id);

  if (!lead) {
    notFound();
  }

  const score = await generateLeadScore(lead);
  const followUp = await generateFollowUp(lead);

  return (
    <div>
      <PageHeader
        title={lead.name}
        description={`${lead.company} · ${lead.email}`}
        action={<Button href="/clients" variant="outline">Convert to Client</Button>}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Lead details</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-600">
            <p>Status: <Badge>{lead.status}</Badge></p>
            <p>Service: {lead.service}</p>
            <p>Estimated budget: ${lead.estimatedBudgetUsd.toLocaleString()}</p>
            <p>Source: {lead.source}</p>
            <p>Last contacted: {lead.lastContactedDate}</p>
            <p>Next follow-up: {lead.nextFollowUpDate}</p>
            <p>Notes: {lead.notes}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>AI lead scoring</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600">
            <p className="text-xl font-semibold text-slate-900">Lead Score: {score.score}/100</p>
            <p>{score.explanation}</p>
            <div className="rounded-lg border bg-slate-50 p-3">
              <p className="font-medium text-slate-900">Suggested follow-up</p>
              <p className="mt-1">{followUp}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
