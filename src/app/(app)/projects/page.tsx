import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { demoClients, demoProjects } from "@/lib/data";

export default function ProjectsPage() {
  return (
    <div>
      <PageHeader title="Projects" description="Manage delivery progress and related tasks." action={<Button>Create Project</Button>} />
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Due date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell><Link href={`/projects/${project.id}`} className="font-medium underline-offset-2 hover:underline">{project.name}</Link></TableCell>
                  <TableCell>{demoClients.find((client) => client.id === project.clientId)?.name ?? "Unknown"}</TableCell>
                  <TableCell><Badge>{project.status}</Badge></TableCell>
                  <TableCell>{project.progress}%</TableCell>
                  <TableCell>{project.dueDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
