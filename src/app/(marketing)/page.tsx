import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Zap,
  Users,
  FileText,
  FolderKanban,
  Receipt,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const features = [
  { icon: Users, title: "Lead Management", desc: "Track and score leads, set follow-ups, and never miss an opportunity." },
  { icon: FileText, title: "AI Proposals", desc: "Generate professional proposals in seconds with AI assistance." },
  { icon: FolderKanban, title: "Project Tracking", desc: "Manage projects, tasks, and deadlines in one place." },
  { icon: Receipt, title: "Invoicing", desc: "Create and track invoices. Get paid faster." },
  { icon: Sparkles, title: "AI Assistant", desc: "Ask your business anything. Get instant insights." },
  { icon: Zap, title: "Workflow Automation", desc: "Automate repetitive tasks and focus on what matters." },
];

const steps = [
  "Add your leads and clients",
  "Create proposals with AI",
  "Track projects and tasks",
  "Send invoices and get paid",
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Run your freelance business <span className="text-primary">with AI.</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Manage leads, proposals, clients, projects, invoices, and follow-ups from one intelligent workspace.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href="/signup">
            <Button size="lg" className="gap-2">
              Start for Free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="#how-it-works">
            <Button size="lg" variant="outline">See How It Works</Button>
          </Link>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">Tired of juggling multiple tools?</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Spreadsheets for leads. Docs for proposals. Separate apps for invoices. 
            It&apos;s time to consolidate everything into one smart workspace.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center">Everything you need</h2>
        <p className="mt-2 text-center text-muted-foreground">One platform to manage your entire freelance business</p>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title}>
              <CardContent className="p-6">
                <f.icon className="h-10 w-10 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center">How FlowPilot works</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-4 max-w-3xl mx-auto">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  {i + 1}
                </div>
                <p className="mt-3 text-sm font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Capabilities */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <Sparkles className="h-12 w-12 text-primary mx-auto" />
          <h2 className="mt-4 text-2xl md:text-3xl font-bold">AI that understands your business</h2>
          <p className="mt-4 text-muted-foreground">
            Ask questions like &ldquo;Which leads need follow-up?&rdquo; or &ldquo;Create a proposal for this client.&rdquo;
            FlowPilot&apos;s AI assistant understands your data and helps you make better decisions.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">Ready to transform your freelance business?</h2>
          <p className="mt-4 opacity-90">Start for free. No credit card required.</p>
          <Link href="/signup">
            <Button size="lg" variant="secondary" className="mt-8 gap-2">
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
