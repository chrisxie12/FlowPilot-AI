import { AssistantPanel } from "@/components/forms/assistant-panel";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AiAssistantPage() {
  return (
    <div>
      <PageHeader title="AI Assistant" description="Ask business-aware questions across leads, projects, and invoices." />
      <AssistantPanel />
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Suggested prompts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-600">
          <p>Which leads should I follow up with today?</p>
          <p>How much revenue do I have in outstanding invoices?</p>
          <p>Which projects are overdue?</p>
          <p>Write a follow-up message for Sarah.</p>
          <p>What should I prioritize today?</p>
        </CardContent>
      </Card>
    </div>
  );
}
