"use client";

import { useMemo } from "react";
import { notFound, useParams } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { calculateInvoiceTotal, demoClients, demoInvoices, demoProjects } from "@/lib/data";

export default function InvoiceDetailPage() {
  const params = useParams<{ id: string }>();
  const invoice = useMemo(() => demoInvoices.find((item) => item.id === params.id), [params.id]);

  if (!invoice) {
    notFound();
  }

  const client = demoClients.find((item) => item.id === invoice.clientId);
  const project = demoProjects.find((item) => item.id === invoice.projectId);

  return (
    <div>
      <PageHeader title={`Invoice ${invoice.invoiceNumber}`} description="Professional invoice preview" action={<Button variant="outline" onClick={() => window.print()}>Print / Download</Button>} />
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <div>
              <p className="font-semibold">{client?.company ?? "Client"}</p>
              <p className="text-slate-500">{client?.email}</p>
            </div>
            <Badge>{invoice.status}</Badge>
          </div>
          <div className="text-sm text-slate-600">
            <p>Project: {project?.name}</p>
            <p>Issue date: {invoice.issueDate}</p>
            <p>Due date: {invoice.dueDate}</p>
          </div>
          <div className="rounded-lg border">
            {invoice.lineItems.map((item) => (
              <div key={item.description} className="flex justify-between border-b p-3 text-sm last:border-b-0">
                <p>{item.description} × {item.quantity}</p>
                <p>${(item.quantity * item.unitPriceUsd).toLocaleString()}</p>
              </div>
            ))}
          </div>
          <div className="space-y-1 text-right text-sm text-slate-600">
            <p>Total: <span className="text-lg font-semibold text-slate-900">${calculateInvoiceTotal(invoice).toLocaleString()}</span></p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
