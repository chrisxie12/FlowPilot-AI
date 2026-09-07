"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const suggestedQuestions = [
  "Which leads need follow-up?",
  "How much revenue is outstanding?",
  "Which projects are overdue?",
  "What should I prioritize today?",
];

const quickActions = [
  {
    label: "Generate Proposal",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    label: "Score Lead",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    label: "Generate Tasks",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "Write Follow-up",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const mockResponses: Record<string, string> = {
  "Which leads need follow-up?":
    "Based on your pipeline, **3 leads** need immediate follow-up:\n\n- **Sarah Chen** (Acme Corp) — Last contact: 5 days ago, deal value $45,000\n- **Marcus Rivera** (Bright Labs) — Last contact: 3 days ago, deal value $12,000\n- **Aisha Patel** (GreenTech Solutions) — Last contact: 7 days ago, deal value $28,000\n\nI'd recommend reaching out to Sarah first — she's the highest value and hasn't been contacted the longest.",
  "How much revenue is outstanding?":
    "You currently have **$33,250** in outstanding revenue:\n\n- **INV-002** (TechStart Inc): $24,750 — Due Sep 15\n- **INV-003** (GreenLeaf Studios): $8,200 — **Overdue** since Aug 30\n- **INV-004** (Nova Solutions): $3,400 — Draft (not sent yet)\n\nThe overdue invoice from GreenLeaf should be your priority.",
  "Which projects are overdue?":
    "There is **1 project** currently overdue:\n\n- **Brand Identity Package** for GreenLeaf Studios — Was due Aug 30, now 8 days overdue. Invoice INV-003 ($8,200) is also unpaid.\n\nAll other projects are on track. Would you like me to draft a follow-up message for GreenLeaf?",
  "What should I prioritize today?":
    "Here are your top priorities for today:\n\n1. **Follow up on overdue invoice** — GreenLeaf Studios (INV-003, $8,200)\n2. **Send invoice INV-004** — Nova Solutions ($3,400) is still in draft\n3. **Respond to TechStart Inc** — They replied about the mobile app timeline yesterday\n4. **Review proposal** — UrbanEdge wants to revisit the property listing project\n\nWant me to help draft any of these communications?",
};

const initialMessages: Message[] = [
  {
    id: 0,
    role: "assistant",
    content:
      "Hello! I'm your FlowPilot AI assistant. I can help you analyze your business data, draft messages, and make recommendations. What would you like to know?",
  },
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const response =
        mockResponses[text] ||
        `I can help with that! Based on your current data, you have 5 clients in your pipeline, 2 active projects, and $33,250 in outstanding invoices. What specific aspect would you like to dive into?`;
      const assistantMsg: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: response,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    }, 600);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI Assistant</h1>
            <p className="text-sm text-gray-500 mt-1">
              Your intelligent business copilot
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-xs font-semibold rounded-full">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Powered by AI
          </span>
        </div>

        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="flex-shrink-0 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        <div className="flex-1 bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-md"
                      : "bg-gray-100 text-gray-900 rounded-bl-md"
                  }`}
                >
                  {msg.content.split("\n").map((line, i) => {
                    const parts = line.split(/(\*\*[^*]+\*\*)/g);
                    return (
                      <span key={i}>
                        {parts.map((part, j) =>
                          part.startsWith("**") && part.endsWith("**") ? (
                            <strong key={j}>{part.slice(2, -2)}</strong>
                          ) : (
                            <span key={j}>{part}</span>
                          )
                        )}
                        {i < msg.content.split("\n").length - 1 && <br />}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(input);
                  }
                }}
                placeholder="Ask about your business data..."
                className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={() => handleSend(input)}
                disabled={!input.trim()}
                className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-64 flex-shrink-0">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Quick Actions
          </h3>
          <div className="space-y-2">
            {quickActions.map((action) => (
              <button
                key={action.label}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-blue-600">{action.icon}</span>
                {action.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 mt-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Business Snapshot
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Active Leads</span>
              <span className="text-sm font-semibold text-gray-900">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Open Projects</span>
              <span className="text-sm font-semibold text-gray-900">2</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Revenue (MTD)</span>
              <span className="text-sm font-semibold text-green-600">
                $12,500
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Outstanding</span>
              <span className="text-sm font-semibold text-red-600">
                $33,250
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
