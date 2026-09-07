"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/page-header";
import { Plus, Calendar, DollarSign, FolderOpen } from "lucide-react";

type ProjectStatus = "Planning" | "In Progress" | "Review";

interface Project {
  id: string;
  name: string;
  client: string;
  status: ProjectStatus;
  progress: number;
  dueDate: string;
  budget: number;
}

const statusColors: Record<ProjectStatus, string> = {
  Planning: "bg-slate-100 text-slate-700 border-slate-200",
  "In Progress": "bg-blue-100 text-blue-700 border-blue-200",
  Review: "bg-amber-100 text-amber-700 border-amber-200",
};

const mockProjects: Project[] = [
  {
    id: "proj-1",
    name: "E-commerce Platform Redesign",
    client: "Acme Corp",
    status: "In Progress",
    progress: 65,
    dueDate: "2026-11-15",
    budget: 24500,
  },
  {
    id: "proj-2",
    name: "Mobile App Development",
    client: "TechStart Inc",
    status: "Planning",
    progress: 15,
    dueDate: "2027-01-30",
    budget: 42000,
  },
  {
    id: "proj-3",
    name: "Brand Identity & Website",
    client: "GreenLeaf Studios",
    status: "Review",
    progress: 90,
    dueDate: "2026-10-01",
    budget: 18750,
  },
];

const statusTabs: { label: string; value: string }[] = [
  { label: "All", value: "all" },
  { label: "Planning", value: "Planning" },
  { label: "In Progress", value: "In Progress" },
  { label: "Review", value: "Review" },
];

export default function ProjectsPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredProjects = mockProjects.filter((project) => {
    return statusFilter === "all" || project.status === statusFilter;
  });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Projects"
        description="Manage and track your active projects"
      >
        <Link href="/projects/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
      </PageHeader>

      <div className="flex items-center gap-1 rounded-lg border bg-muted p-1 w-fit">
        {statusTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setStatusFilter(tab.value)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              statusFilter === tab.value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filteredProjects.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-muted p-4 mb-4">
              <FolderOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground max-w-sm">
              {statusFilter === "all"
                ? "Get started by creating your first project."
                : `No projects with status "${statusFilter}". Try a different filter.`}
            </p>
            {statusFilter === "all" && (
              <Link href="/projects/new" className="mt-4">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <Card className="h-full transition-shadow hover:shadow-md cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base leading-tight">
                      {project.name}
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className={`shrink-0 ${statusColors[project.status]}`}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {project.client}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(project.dueDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                      ${project.budget.toLocaleString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
