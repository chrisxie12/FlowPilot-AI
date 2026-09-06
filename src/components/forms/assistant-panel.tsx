"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { askBusinessAssistant } from "@/lib/ai";

export function AssistantPanel() {
  const [question, setQuestion] = useState("Which leads should I follow up with today?");
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-3 rounded-xl border bg-white p-4">
      <label className="text-sm font-medium">Ask FlowPilot Assistant</label>
      <div className="flex gap-2">
        <Input value={question} onChange={(event) => setQuestion(event.target.value)} />
        <Button
          onClick={async () => {
            setLoading(true);
            const response = await askBusinessAssistant(question);
            setAnswer(response);
            setLoading(false);
          }}
          disabled={loading}
        >
          {loading ? "Thinking..." : "Ask AI"}
        </Button>
      </div>
      <div className="rounded-lg border bg-slate-50 p-3 text-sm text-slate-700">
        {answer || "Answers will appear here with business-context suggestions."}
      </div>
    </div>
  );
}
