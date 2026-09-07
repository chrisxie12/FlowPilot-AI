"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/layout/page-header";
import { Search, Plus, MoreHorizontal, Mail, Phone, Building2, Users, FolderOpen, SearchX } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  projectCount: number;
  lastContact: string;
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    company: "TechNova Solutions",
    email: "sarah@technova.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    projectCount: 3,
    lastContact: "2025-09-01",
  },
  {
    id: "2",
    name: "James Rodriguez",
    company: "CreativeMinds Agency",
    email: "james@creativeminds.io",
    phone: "+1 (555) 234-5678",
    status: "active",
    projectCount: 2,
    lastContact: "2025-08-28",
  },
  {
    id: "3",
    name: "Emily Chen",
    company: "GreenLeaf Organics",
    email: "emily@greenleaf.co",
    phone: "+1 (555) 345-6789",
    status: "inactive",
    projectCount: 1,
    lastContact: "2025-06-15",
  },
  {
    id: "4",
    name: "Michael Thompson",
    company: "Apex Financial Group",
    email: "michael@apexfinancial.com",
    phone: "+1 (555) 456-7890",
    status: "active",
    projectCount: 4,
    lastContact: "2025-09-05",
  },
  {
    id: "5",
    name: "Lisa Patel",
    company: "BrightPath Education",
    email: "lisa@brightpath.edu",
    phone: "+1 (555) 567-8901",
    status: "inactive",
    projectCount: 1,
    lastContact: "2025-04-20",
  },
];

export default function ClientsPage() {
  const [search, setSearch] = useState("");

  const filteredClients = mockClients.filter(
    (client) =>
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.company.toLowerCase().includes(search.toLowerCase()) ||
      client.email.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = mockClients.filter((c) => c.status === "active").length;
  const inactiveCount = mockClients.filter((c) => c.status === "inactive").length;
  const totalProjects = mockClients.reduce((sum, c) => sum + c.projectCount, 0);

  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader title="Clients" description="Manage your client relationships">
        <Button asChild>
          <Link href="/clients/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Client
          </Link>
        </Button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockClients.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeCount} active, {inactiveCount} inactive
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeCount}</div>
            <p className="text-xs text-muted-foreground">Currently engaged</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjects}</div>
            <p className="text-xs text-muted-foreground">Across all clients</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {filteredClients.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="rounded-full bg-muted p-4 mb-4">
                <SearchX className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No clients found</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                {search ? "Try adjusting your search terms." : "Get started by adding your first client."}
              </p>
              {!search && (
                <Button asChild className="mt-4">
                  <Link href="/clients/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Client
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Projects</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <Link
                        href={`/clients/${client.id}`}
                        className="font-medium hover:underline"
                      >
                        {client.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {client.company}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm">{client.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm">{client.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={client.status === "active" ? "default" : "secondary"}
                        className={
                          client.status === "active"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-100"
                        }
                      >
                        {client.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">{client.projectCount}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/clients/${client.id}`}>View Details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/clients/${client.id}?tab=projects`}>View Projects</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/clients/${client.id}?tab=invoices`}>View Invoices</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete Client</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
