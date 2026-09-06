import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateProjectTasks } from "@/lib/ai";
import { getProjectById, getProjectTasks } from "@/lib/data";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  const tasks = getProjectTasks(project.id);
  const generatedTasks = await generateProjectTasks(project);

  return (
    <div>
      <PageHeader title={project.name} description={project.description} action={<Badge>{project.status}</Badge>} />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Project details</CardTitle></CardHeader>
          <CardContent className="space-y-1 text-sm text-slate-600">
            <p>Start date: {project.startDate}</p>
            <p>Due date: {project.dueDate}</p>
            <p>Budget: ${project.budgetUsd.toLocaleString()}</p>
            <p>Progress: {project.progress}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Tasks</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {tasks.map((task) => (
              <div key={task.id} className="rounded-md border p-2 text-sm">
                <p className="font-medium">{task.title}</p>
                <p className="text-slate-600">{task.description}</p>
                <p className="text-xs text-slate-500">{task.priority} · {task.status}</p>
              </div>
            ))}
            <Button variant="outline">Create Task</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader><CardTitle>AI Generate Tasks</CardTitle></CardHeader>
        <CardContent className="grid gap-2 text-sm text-slate-700 md:grid-cols-2">
          {generatedTasks.map((task) => (
            <div key={task.title} className="rounded-md border bg-slate-50 p-2">{task.title}</div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
