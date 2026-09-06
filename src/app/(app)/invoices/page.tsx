import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { calculateInvoiceTotal, demoClients, demoInvoices } from "@/lib/data";

export default function InvoicesPage() {
  return (
    <div>
      <PageHeader title="Invoices" description="Track draft, sent, paid, and overdue invoices." action={<Button>Create Invoice</Button>} />
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Total (USD)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell><Link href={`/invoices/${invoice.id}`} className="font-medium underline-offset-2 hover:underline">{invoice.invoiceNumber}</Link></TableCell>
                  <TableCell>{demoClients.find((client) => client.id === invoice.clientId)?.name ?? "Unknown"}</TableCell>
                  <TableCell><Badge>{invoice.status}</Badge></TableCell>
                  <TableCell>{invoice.issueDate}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>${calculateInvoiceTotal(invoice).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
