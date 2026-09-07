"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/layout/page-header";
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  Calendar,
  DollarSign,
  FolderOpen,
  FileText,
  Receipt,
  StickyNote,
  Edit,
  Trash2,
  ExternalLink,
  TrendingUp,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  status: "active" | "inactive";
  createdAt: string;
  notes: string;
  totalRevenue: number;
}

interface Project {
  id: string;
  name: string;
  status: "in-progress" | "completed" | "on-hold";
  budget: number;
  startDate: string;
  endDate: string;
  progress: number;
}

interface Proposal {
  id: string;
  title: string;
  amount: number;
  status: "sent" | "accepted" | "declined" | "draft";
  date: string;
}

interface Invoice {
  id: string;
  number: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  date: string;
  dueDate: string;
}

const mockClient: Client = {
  id: "1",
  name: "Sarah Mitchell",
  company: "TechNova Solutions",
  email: "sarah@technova.com",
  phone: "+1 (555) 123-4567",
  address: "123 Innovation Drive, Suite 400, San Francisco, CA 94105",
  status: "active",
  createdAt: "2025-03-15",
  notes: "Prefers weekly status meetings on Tuesdays. Key contact for all project communications. Budget approved for Q4 expansion.",
  totalRevenue: 45200,
};

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    status: "completed",
    budget: 15000,
    startDate: "2025-04-01",
    endDate: "2025-06-30",
    progress: 100,
  },
  {
    id: "2",
    name: "Mobile App MVP",
    status: "in-progress",
    budget: 25000,
    startDate: "2025-07-15",
    endDate: "2025-11-30",
    progress: 45,
  },
  {
    id: "3",
    name: "API Integration",
    status: "on-hold",
    budget: 8000,
    startDate: "2025-09-01",
    endDate: "2025-10-15",
    progress: 10,
  },
];

const mockProposals: Proposal[] = [
  {
    id: "1",
    title: "E-Commerce Platform Development",
    amount: 35000,
    status: "accepted",
    date: "2025-08-20",
  },
  {
    id: "2",
    title: "Analytics Dashboard",
    amount: 12000,
    status: "sent",
    date: "2025-09-02",
  },
  {
    id: "3",
    title: "SEO Optimization Package",
    amount: 5000,
    status: "declined",
    date: "2025-07-10",
  },
];

const mockInvoices: Invoice[] = [
  {
    id: "1",
    number: "INV-001",
    amount: 15000,
    status: "paid",
    date: "2025-06-30",
    dueDate: "2025-07-15",
  },
  {
    id: "2",
    number: "INV-002",
    amount: 12500,
    status: "paid",
    date: "2025-08-15",
    dueDate: "2025-08-30",
  },
  {
    id: "3",
    number: "INV-003",
    amount: 17700,
    status: "pending",
    date: "2025-09-01",
    dueDate: "2025-09-15",
  },
];

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params.id as string;

  const [activeTab, setActiveTab] = useState("overview");
  const [notes, setNotes] = useState(mockClient.notes);
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  const client = mockClient;
  const activeProjects = mockProjects.filter((p) => p.status === "in-progress").length;
  const completedProjects = mockProjects.filter((p) => p.status === "completed").length;
  const totalRevenue = mockInvoices
    .filter((i) => i.status === "paid")
    .reduce((sum, i) => sum + i.amount, 0);
  const pendingAmount = mockInvoices
    .filter((i) => i.status === "pending")
    .reduce((sum, i) => sum + i.amount, 0);

  const projectStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "in-progress":
        return "bg-blue-100 text-blue-700";
      case "on-hold":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const proposalStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-700";
      case "sent":
        return "bg-blue-100 text-blue-700";
      case "declined":
        return "bg-red-100 text-red-700";
      case "draft":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const invoiceStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "overdue":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/clients">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to clients</span>
          </Link>
        </Button>
        <div className="flex-1">
          <PageHeader title={client.name} description={client.company}>
            <div className="flex gap-2">
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </PageHeader>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              ${pendingAmount.toLocaleString()} pending
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockProjects.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeProjects} active, {completedProjects} completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proposals</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockProposals.length}</div>
            <p className="text-xs text-muted-foreground">
              {mockProposals.filter((p) => p.status === "accepted").length} accepted
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Badge
              className={
                client.status === "active"
                  ? "bg-green-100 text-green-700 hover:bg-green-100"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-100"
              }
            >
              {client.status === "active" ? "Active Client" : "Inactive Client"}
            </Badge>
            <p className="text-xs text-muted-foreground mt-2">
              Client since {new Date(client.createdAt).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="proposals">Proposals</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-muted p-2">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{client.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-muted p-2">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{client.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-muted p-2">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Company</p>
                    <p className="text-sm text-muted-foreground">{client.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-muted p-2">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">{client.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activity Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-blue-50 p-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm">Revenue Generated</span>
                  </div>
                  <span className="font-semibold">${totalRevenue.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-green-50 p-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-sm">Completed Projects</span>
                  </div>
                  <span className="font-semibold">{completedProjects}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-orange-50 p-2">
                      <Clock className="h-4 w-4 text-orange-600" />
                    </div>
                    <span className="text-sm">Active Projects</span>
                  </div>
                  <span className="font-semibold">{activeProjects}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-purple-50 p-2">
                      <FileText className="h-4 w-4 text-purple-600" />
                    </div>
                    <span className="text-sm">Proposals Sent</span>
                  </div>
                  <span className="font-semibold">{mockProposals.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>All projects associated with this client</CardDescription>
            </CardHeader>
            <CardContent>
              {mockProjects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold">No projects yet</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Create a proposal to start a new project with this client.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {mockProjects.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-medium">{project.name}</h4>
                          <Badge className={projectStatusColor(project.status)}>
                            {project.status.replace("-", " ")}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(project.startDate).toLocaleDateString()} -{" "}
                          {new Date(project.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm font-medium">${project.budget.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Budget</p>
                        </div>
                        <div className="w-24">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="h-2 rounded-full bg-muted">
                            <div
                              className="h-2 rounded-full bg-primary"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="proposals" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Proposals</CardTitle>
              <CardDescription>Proposals sent to this client</CardDescription>
            </CardHeader>
            <CardContent>
              {mockProposals.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold">No proposals yet</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Create your first proposal for this client.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {mockProposals.map((proposal) => (
                    <div
                      key={proposal.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-medium">{proposal.title}</h4>
                          <Badge className={proposalStatusColor(proposal.status)}>
                            {proposal.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Sent on {new Date(proposal.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold">${proposal.amount.toLocaleString()}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">View proposal</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>Invoices for this client</CardDescription>
            </CardHeader>
            <CardContent>
              {mockInvoices.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Receipt className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold">No invoices yet</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Create an invoice for completed work.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {mockInvoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-medium">{invoice.number}</h4>
                          <Badge className={invoiceStatusColor(invoice.status)}>
                            {invoice.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Issued {new Date(invoice.date).toLocaleDateString()} · Due{" "}
                          {new Date(invoice.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold">${invoice.amount.toLocaleString()}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">View invoice</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Notes</CardTitle>
                <CardDescription>Internal notes about this client</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditingNotes(!isEditingNotes)}
              >
                <Edit className="mr-2 h-4 w-4" />
                {isEditingNotes ? "Save" : "Edit"}
              </Button>
            </CardHeader>
            <CardContent>
              {isEditingNotes ? (
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={8}
                  placeholder="Add notes about this client..."
                  className="resize-none"
                />
              ) : (
                <div className="rounded-lg bg-muted p-4 min-h-[200px]">
                  {notes ? (
                    <p className="text-sm whitespace-pre-wrap">{notes}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      No notes yet. Click Edit to add notes about this client.
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
