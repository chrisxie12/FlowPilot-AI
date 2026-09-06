import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { demoClients, demoProposals } from "@/lib/data";

export default function ProposalsPage() {
  return (
    <div>
      <PageHeader title="Proposals" description="Generate and manage client proposals with AI support." action={<Button href="/proposals/new">Create Proposal</Button>} />
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Timeline</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoProposals.map((proposal) => (
                <TableRow key={proposal.id}>
                  <TableCell><Link href={`/proposals/${proposal.id}`} className="font-medium underline-offset-2 hover:underline">{proposal.projectTitle}</Link></TableCell>
                  <TableCell>{demoClients.find((client) => client.id === proposal.clientId)?.name ?? "Unknown"}</TableCell>
                  <TableCell><Badge>{proposal.status}</Badge></TableCell>
                  <TableCell>${proposal.priceUsd.toLocaleString()}</TableCell>
                  <TableCell>{proposal.timeline}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
