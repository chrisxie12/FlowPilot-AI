import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: [
      "5 leads",
      "3 clients",
      "2 projects",
      "Limited AI generations",
      "Basic proposals",
    ],
    cta: "Start Free",
    href: "/signup",
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For growing freelance businesses",
    features: [
      "Unlimited leads",
      "Unlimited clients",
      "Unlimited projects",
      "AI assistant",
      "AI proposals",
      "AI follow-ups",
      "Invoices",
      "Analytics",
      "PDF exports",
    ],
    cta: "Get Pro",
    href: "/signup",
    popular: true,
  },
];

export default function PricingPage() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Simple, transparent pricing</h1>
        <p className="mt-4 text-muted-foreground">Start free. Upgrade when you&apos;re ready.</p>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2 max-w-3xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.popular ? "border-primary shadow-lg relative" : ""}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
              </div>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href={plan.href} className="mt-6 block">
                <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                  {plan.cta}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
