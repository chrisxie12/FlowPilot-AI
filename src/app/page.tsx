import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-16 flex items-center justify-between">
        <h1 className="text-xl font-semibold">FlowPilot AI</h1>
        <div className="flex gap-3">
          <Button variant="ghost" href="/pricing">
            Pricing
          </Button>
          <Button variant="outline" href="/login">
            Login
          </Button>
          <Button href="/signup">Start for Free</Button>
        </div>
      </header>

      <section className="mb-14 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-wide text-slate-500">Run your freelance business with AI.</p>
        <h2 className="mx-auto max-w-3xl text-4xl font-semibold leading-tight">
          Manage leads, proposals, clients, projects, invoices, and follow-ups from one intelligent workspace.
        </h2>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/signup">Start for Free</Button>
          <Button variant="outline" href="/dashboard">
            See How It Works
          </Button>
        </div>
      </section>

      <section className="mb-10 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Problem</CardTitle>
            <CardDescription>Freelancers juggle tools and lose momentum.</CardDescription>
          </CardHeader>
          <CardContent>FlowPilot unifies the full lifecycle from lead to invoice in one workspace.</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>How FlowPilot Works</CardTitle>
            <CardDescription>Lead → Client → Proposal → Project → Tasks → Invoice → Follow-up</CardDescription>
          </CardHeader>
          <CardContent>One connected pipeline with contextual AI at each stage.</CardContent>
        </Card>
      </section>

      <section className="mb-10 grid gap-4 md:grid-cols-3">
        {[
          "Leads + Clients",
          "AI Proposals",
          "Project + Task Tracking",
          "Invoices + Follow-up",
          "Business Insights",
          "Unified Assistant",
        ].map((feature) => (
          <Card key={feature}>
            <CardHeader>
              <CardTitle className="text-base">{feature}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="mb-10 rounded-xl border bg-slate-50 p-8">
        <h3 className="text-2xl font-semibold">AI Capabilities</h3>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-600">
          <li>Generate proposals</li>
          <li>Score leads</li>
          <li>Generate project tasks</li>
          <li>Draft follow-up messages</li>
          <li>Business operating insights</li>
        </ul>
      </section>

      <section className="mb-10 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Workflow</CardTitle>
          </CardHeader>
          <CardContent>Pipeline-first design with no dead ends and fast handoff between stages.</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
          </CardHeader>
          <CardContent>
            Free for getting started. Upgrade to Pro at <strong>$19/month</strong>.
          </CardContent>
        </Card>
      </section>

      <section className="mb-10 space-y-2">
        <h3 className="text-2xl font-semibold">FAQ</h3>
        <p className="text-sm text-slate-600">Can I export invoices and proposals? Yes, each page includes print-ready views.</p>
        <p className="text-sm text-slate-600">Does FlowPilot support global users? Yes, USD is default with currency-ready structure.</p>
      </section>

      <section className="rounded-xl border bg-slate-900 p-8 text-center text-white">
        <h3 className="text-3xl font-semibold">Ready to simplify your freelance operations?</h3>
        <Button href="/signup" className="mt-4 bg-white text-slate-900 hover:bg-slate-200">
          Start for Free
        </Button>
      </section>

      <footer className="mt-10 border-t pt-6 text-sm text-slate-500">© {new Date().getFullYear()} FlowPilot AI</footer>
    </div>
  );
}
