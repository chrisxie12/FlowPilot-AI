"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Pencil,
  Calendar,
  DollarSign,
  Users,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
} from "lucide-react";

type ProjectStatus = "Planning" | "In Progress" | "Review";
type TaskStatus = "To Do" | "In Progress" | "Done";
type TaskPriority = "Low" | "Medium" | "High";

interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}

interface Milestone {
  title: string;
  date: string;
  completed: boolean;
}

interface ProjectDetail {
  id: string;
  name: string;
  client: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  startDate: string;
  dueDate: string;
  budget: number;
  milestones: Milestone[];
  tasks: Task[];
}

const statusColors: Record<ProjectStatus, string> = {
  Planning: "bg-slate-100 text-slate-700 border-slate-200",
  "In Progress": "bg-blue-100 text-blue-700 border-blue-200",
  Review: "bg-amber-100 text-amber-700 border-amber-200",
};

const taskStatusColors: Record<TaskStatus, string> = {
  "To Do": "bg-slate-100 text-slate-700 border-slate-200",
  "In Progress": "bg-blue-100 text-blue-700 border-blue-200",
  Done: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const priorityColors: Record<TaskPriority, string> = {
  Low: "bg-slate-100 text-slate-600 border-slate-200",
  Medium: "bg-amber-100 text-amber-700 border-amber-200",
  High: "bg-red-100 text-red-700 border-red-200",
};

const mockProjects: Record<string, ProjectDetail> = {
  "proj-1": {
    id: "proj-1",
    name: "E-commerce Platform Redesign",
    client: "Acme Corp",
    description:
      "A comprehensive redesign of Acme Corp's e-commerce platform to enhance user experience, improve conversion rates, and establish a scalable foundation for future growth. The project includes UX research, visual design, frontend development, and backend integration.",
    status: "In Progress",
    progress: 65,
    startDate: "2026-08-20",
    dueDate: "2026-11-15",
    budget: 24500,
    milestones: [
      { title: "Discovery & Research", date: "2026-09-03", completed: true },
      { title: "UX Design Approval", date: "2026-09-17", completed: true },
      { title: "Visual Design Handoff", date: "2026-10-01", completed: false },
      { title: "Frontend Development Complete", date: "2026-10-22", completed: false },
      { title: "QA & Launch", date: "2026-11-15", completed: false },
    ],
    tasks: [
      { id: "t-1", title: "Complete user research interviews", status: "Done", priority: "High", dueDate: "2026-09-01" },
      { id: "t-2", title: "Create wireframes for product pages", status: "Done", priority: "High", dueDate: "2026-09-10" },
      { id: "t-3", title: "Design high-fidelity mockups", status: "In Progress", priority: "High", dueDate: "2026-09-25" },
      { id: "t-4", title: "Set up Next.js project structure", status: "Done", priority: "Medium", dueDate: "2026-09-15" },
      { id: "t-5", title: "Implement product listing component", status: "In Progress", priority: "Medium", dueDate: "2026-10-05" },
      { id: "t-6", title: "Build shopping cart functionality", status: "To Do", priority: "High", dueDate: "2026-10-15" },
      { id: "t-7", title: "Integrate Shopify API", status: "To Do", priority: "Medium", dueDate: "2026-10-25" },
      { id: "t-8", title: "Performance optimization & testing", status: "To Do", priority: "Low", dueDate: "2026-11-05" },
    ],
  },
};

const defaultProject: ProjectDetail = {
  id: "proj-default",
  name: "Project",
  client: "Client",
  description: "Project details will appear here.",
  status: "Planning",
  progress: 0,
  startDate: new Date().toISOString().split("T")[0],
  dueDate: new Date().toISOString().split("T")[0],
  budget: 0,
  milestones: [],
  tasks: [],
};

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const project = mockProjects[id] || { ...defaultProject, id, name: `Project ${id}` };
  const [activeTab, setActiveTab] = useState<"overview" | "tasks" | "timeline">("overview");
  const [tasks, setTasks] = useState<Task[]>(project.tasks);
  const [showAiTasks, setShowAiTasks] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleTaskStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;
        const nextStatus: Record<TaskStatus, TaskStatus> = {
          "To Do": "In Progress",
          "In Progress": "Done",
          Done: "To Do",
        };
        return { ...task, status: nextStatus[task.status] };
      })
    );
  };

  const handleGenerateTasks = async () => {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setShowAiTasks(true);
    setIsGenerating(false);
  };

  const completedTasks = tasks.filter((t) => t.status === "Done").length;
  const taskProgress = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const tabs = [
    { label: "Overview", value: "overview" },
    { label: "Tasks", value: "tasks" },
    { label: "Timeline", value: "timeline" },
  ] as const;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/projects">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{project.name}</h1>
            <p className="text-muted-foreground">{project.client}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className={statusColors[project.status]}>
            {project.status}
          </Badge>
          <Button variant="outline">
            <Pencil className="mr-2 h-4 w-4" />
            Edit Project
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-1 rounded-lg border bg-muted p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab.value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>
              <Separator />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Client</p>
                    <p className="font-medium">{project.client}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Budget</p>
                    <p className="font-medium">${project.budget.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Start Date</p>
                    <p className="font-medium">
                      {new Date(project.startDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Due Date</p>
                    <p className="font-medium">
                      {new Date(project.dueDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Overall</span>
                    <span className="font-semibold">{project.progress}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                <Separator />
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Tasks</span>
                    <span className="font-semibold">{taskProgress}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all"
                      style={{ width: `${taskProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    {completedTasks} of {tasks.length} tasks completed
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant="outline" className={statusColors[project.status]}>
                    {project.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Tasks</span>
                  <span className="font-medium">{tasks.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Completed</span>
                  <span className="font-medium text-emerald-600">{completedTasks}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Remaining</span>
                  <span className="font-medium">{tasks.length - completedTasks}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "tasks" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Task List</h2>
            <Button
              variant="outline"
              onClick={handleGenerateTasks}
              disabled={isGenerating || showAiTasks}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {isGenerating ? "Generating..." : showAiTasks ? "Tasks Generated" : "Generate Tasks with AI"}
            </Button>
          </div>

          {tasks.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No tasks yet</h3>
                <p className="text-muted-foreground max-w-sm mb-4">
                  Generate tasks with AI or add them manually to get started.
                </p>
                <Button onClick={handleGenerateTasks} disabled={isGenerating}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  {isGenerating ? "Generating..." : "Generate Tasks with AI"}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {tasks.map((task) => (
                <Card key={task.id}>
                  <CardContent className="flex items-center gap-4 py-4">
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className="shrink-0"
                    >
                      {task.status === "Done" ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      ) : task.status === "In Progress" ? (
                        <Clock className="h-5 w-5 text-blue-500" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-medium ${
                          task.status === "Done" ? "line-through text-muted-foreground" : ""
                        }`}
                      >
                        {task.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Due{" "}
                        {new Date(task.dueDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <Badge variant="outline" className={taskStatusColors[task.status]}>
                      {task.status}
                    </Badge>
                    <Badge variant="outline" className={priorityColors[task.priority]}>
                      {task.priority}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "timeline" && (
        <Card>
          <CardHeader>
            <CardTitle>Project Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-0">
            {project.milestones.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No milestones defined for this project.
              </p>
            ) : (
              project.milestones.map((milestone, index) => (
                <div key={index}>
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-3 w-3 rounded-full ${
                          milestone.completed ? "bg-emerald-500" : "bg-primary"
                        }`}
                      />
                      {index < project.milestones.length - 1 && (
                        <div className="h-12 w-px bg-border" />
                      )}
                    </div>
                    <div className="pb-4">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{milestone.title}</p>
                        {milestone.completed && (
                          <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">
                            Completed
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(milestone.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
