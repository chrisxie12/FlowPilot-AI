import { Bot, FilePlus2, FolderPlus, Receipt, UserPlus, Users } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardSummary } from "@/lib/data";

export default async function DashboardPage() {
  const summary = await getDashboardSummary();

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of your freelance business pipeline and cash flow."
        action={<Badge className="border-emerald-200 bg-emerald-50 text-emerald-700">MVP</Badge>}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[
          ["Expected revenue", `$${summary.expectedRevenueUsd.toLocaleString()}`],
          ["Active leads", summary.activeLeads],
          ["Active clients", summary.activeClients],
          ["Active projects", summary.activeProjects],
          ["Outstanding invoices", `$${summary.outstandingInvoicesUsd.toLocaleString()}`],
          ["Follow-ups due", summary.followUpsDue],
        ].map(([label, value]) => (
          <Card key={label}>
            <CardHeader>
              <CardTitle className="text-sm text-slate-500">{label}</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-semibold">{value}</CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>AI Business Insight</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-slate-600">{summary.insight}</CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Quick actions</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Button href="/leads" variant="outline"><UserPlus className="mr-2 h-4 w-4" />Add Lead</Button>
          <Button href="/clients" variant="outline"><Users className="mr-2 h-4 w-4" />Add Client</Button>
          <Button href="/proposals/new" variant="outline"><FilePlus2 className="mr-2 h-4 w-4" />Create Proposal</Button>
          <Button href="/projects" variant="outline"><FolderPlus className="mr-2 h-4 w-4" />Create Project</Button>
          <Button href="/invoices" variant="outline"><Receipt className="mr-2 h-4 w-4" />Create Invoice</Button>
          <Button href="/ai-assistant"><Bot className="mr-2 h-4 w-4" />Ask AI</Button>
        </CardContent>
      </Card>
    </div>
  );
}
