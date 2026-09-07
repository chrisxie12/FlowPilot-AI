"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/layout/page-header";
import { Plus, Search, MoreHorizontal, Eye, Send, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Proposal {
  id: string;
  title: string;
  client: string;
  amount: number;
  status: "Draft" | "Sent" | "Viewed" | "Accepted" | "Rejected";
  createdAt: string;
}

const statusColors: Record<Proposal["status"], string> = {
  Draft: "bg-slate-100 text-slate-700 border-slate-200",
  Sent: "bg-blue-100 text-blue-700 border-blue-200",
  Viewed: "bg-amber-100 text-amber-700 border-amber-200",
  Accepted: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Rejected: "bg-red-100 text-red-700 border-red-200",
};

const mockProposals: Proposal[] = [
  {
    id: "prop-1",
    title: "E-commerce Platform Redesign",
    client: "Acme Corp",
    amount: 24500,
    status: "Accepted",
    createdAt: "2026-08-15",
  },
  {
    id: "prop-2",
    title: "Mobile App Development",
    client: "TechStart Inc",
    amount: 42000,
    status: "Sent",
    createdAt: "2026-08-28",
  },
  {
    id: "prop-3",
    title: "Brand Identity & Website",
    client: "GreenLeaf Studios",
    amount: 18750,
    status: "Viewed",
    createdAt: "2026-09-01",
  },
  {
    id: "prop-4",
    title: "AI Chatbot Integration",
    client: "Nexus Solutions",
    amount: 31200,
    status: "Draft",
    createdAt: "2026-09-05",
  },
];

export default function ProposalsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredProposals = mockProposals.filter((proposal) => {
    const matchesSearch =
      proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || proposal.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Proposals"
        description="Manage and track your project proposals"
      >
        <Link href="/proposals/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Proposal
          </Button>
        </Link>
      </PageHeader>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search proposals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Sent">Sent</SelectItem>
            <SelectItem value="Viewed">Viewed</SelectItem>
            <SelectItem value="Accepted">Accepted</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Client</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProposals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No proposals found matching your criteria.
                </TableCell>
              </TableRow>
            ) : (
              filteredProposals.map((proposal) => (
                <TableRow key={proposal.id}>
                  <TableCell>
                    <Link
                      href={`/proposals/${proposal.id}`}
                      className="font-medium hover:underline"
                    >
                      {proposal.title}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {proposal.client}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${proposal.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={statusColors[proposal.status]}
                    >
                      {proposal.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(proposal.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/proposals/${proposal.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Send className="mr-2 h-4 w-4" />
                          Send
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
