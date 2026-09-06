"use client";

import { useMemo } from "react";
import { notFound, useParams } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { demoProposals } from "@/lib/data";

export default function ProposalDetailPage() {
  const params = useParams<{ id: string }>();
  const proposal = useMemo(() => demoProposals.find((item) => item.id === params.id), [params.id]);

  if (!proposal) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        title={proposal.projectTitle}
        description="Professional proposal preview"
        action={<Button variant="outline" onClick={() => window.print()}>Export / Print PDF</Button>}
      />
      <Card>
        <CardContent className="space-y-3 pt-6 text-sm text-slate-700">
          <p><Badge>{proposal.status}</Badge></p>
          <p><strong>Project description:</strong> {proposal.projectDescription}</p>
          <p><strong>Services:</strong> {proposal.services.join(", ")}</p>
          <p><strong>Timeline:</strong> {proposal.timeline}</p>
          <p><strong>Investment:</strong> ${proposal.priceUsd.toLocaleString()}</p>
          <p><strong>Terms:</strong> 50% upfront, 50% on delivery.</p>
          <p><strong>Next steps:</strong> Review, confirm scope, approve, and schedule kickoff.</p>
          <div className="flex gap-2">
            <Button variant="outline">Edit</Button>
            <Button variant="outline">Save</Button>
            <Button variant="outline">Change Status</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
