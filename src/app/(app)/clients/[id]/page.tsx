import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateInvoiceTotal, getClientById, getClientInvoices, getClientProjects, getClientProposals } from "@/lib/data";

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = getClientById(id);

  if (!client) {
    notFound();
  }

  const projects = getClientProjects(client.id);
  const proposals = getClientProposals(client.id);
  const invoices = getClientInvoices(client.id);

  return (
    <div>
      <PageHeader title={client.name} description={`${client.company} · ${client.email}`} />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Client information</CardTitle></CardHeader>
          <CardContent className="space-y-1 text-sm text-slate-600">
            <p>Phone: {client.phone}</p>
            <p>Website: {client.website}</p>
            <p>Status: {client.status}</p>
            <p>Notes: {client.notes}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Activity</CardTitle></CardHeader>
          <CardContent className="space-y-1 text-sm text-slate-600">
            <p>Projects: {projects.length}</p>
            <p>Proposals: {proposals.length}</p>
            <p>Invoices: {invoices.length}</p>
            <p>Total invoiced: ${invoices.reduce((sum, invoice) => sum + calculateInvoiceTotal(invoice), 0).toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
