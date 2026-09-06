import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Simple pricing for solo operators</h1>
      <p className="mt-2 text-slate-500">USD is the default currency. Billing integrations are not enabled in this MVP.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Free</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-600">
            <p>5 leads</p>
            <p>3 clients</p>
            <p>2 projects</p>
            <p>Limited AI generations</p>
            <p>Basic proposals</p>
            <Button href="/signup" className="mt-2">
              Start for Free
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pro — $19/month</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-600">
            <p>Unlimited leads, clients, and projects</p>
            <p>AI assistant + AI proposals + AI follow-ups</p>
            <p>Invoices, analytics, PDF exports</p>
            <Button href="/signup" variant="outline" className="mt-2">
              Choose Pro
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
