import Link from "next/link";
import { EmptyState } from "@/components/layout/empty-state";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { demoLeads } from "@/lib/data";

export default function LeadsPage() {
  return (
    <div>
      <PageHeader
        title="Leads"
        description="Track opportunities and move qualified prospects through your sales pipeline."
        action={<Button>Add Lead</Button>}
      />

      {demoLeads.length === 0 ? (
        <EmptyState
          title="No leads yet"
          description="Add your first lead to start your conversion pipeline."
          actionLabel="Add Lead"
          actionHref="#"
        />
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Lead Score</TableHead>
                  <TableHead>Follow-up</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {demoLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <Link href={`/leads/${lead.id}`} className="font-medium underline-offset-2 hover:underline">
                        {lead.name}
                      </Link>
                    </TableCell>
                    <TableCell>{lead.service}</TableCell>
                    <TableCell><Badge>{lead.status}</Badge></TableCell>
                    <TableCell>${lead.estimatedBudgetUsd.toLocaleString()}</TableCell>
                    <TableCell>{lead.score}/100</TableCell>
                    <TableCell>{lead.nextFollowUpDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
