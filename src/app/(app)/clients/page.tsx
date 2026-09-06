import Link from "next/link";
import { EmptyState } from "@/components/layout/empty-state";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { demoClients } from "@/lib/data";

export default function ClientsPage() {
  return (
    <div>
      <PageHeader title="Clients" description="Manage active and historical client relationships." action={<Button>Add Client</Button>} />
      {demoClients.length === 0 ? (
        <EmptyState title="No clients yet" description="Convert a lead to create your first client record." actionLabel="Go to Leads" actionHref="/leads" />
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {demoClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell><Link className="font-medium underline-offset-2 hover:underline" href={`/clients/${client.id}`}>{client.name}</Link></TableCell>
                    <TableCell>{client.company}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell><Badge>{client.status}</Badge></TableCell>
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
