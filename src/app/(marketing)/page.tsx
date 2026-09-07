"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Zap,
  Users,
  Sparkles,
  FolderKanban,
  Receipt,
  Bot,
  ArrowRight,
  Check,
  ChevronDown,
  UserX,
  FileText,
  CreditCard,
  Star,
  Play,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                              Intersection Observer                          */
/* -------------------------------------------------------------------------- */

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* -------------------------------------------------------------------------- */
/*                                 Reusable                                   */
/* -------------------------------------------------------------------------- */

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-4 inline-block rounded-full bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-500">
      {children}
    </span>
  );
}

function SectionHeadline({
  eyebrow,
  title,
  subtitle,
  dark,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && <SectionBadge>{eyebrow}</SectionBadge>}
      <h2
        className={cn(
          "text-3xl font-bold tracking-tight sm:text-4xl lg:text-[40px]",
          dark ? "text-white" : "text-slate-900"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            dark ? "text-slate-400" : "text-slate-500"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               Dashboard Mockup                             */
/* -------------------------------------------------------------------------- */

function DashboardMockup() {
  return (
    <div className="relative">
      {/* Gradient blob */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-indigo-500/15 via-indigo-500/5 to-transparent blur-2xl" />

      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)]">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-amber-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <span className="ml-2 text-xs text-slate-400">FlowPilot Dashboard</span>
        </div>

        {/* Body */}
        <div className="flex min-h-[320px]">
          {/* Sidebar */}
          <div className="hidden w-48 border-r border-slate-100 bg-slate-50/50 p-4 sm:block">
            <div className="space-y-1">
              {["Leads", "Projects", "Invoices", "AI Assistant"].map((item, i) => (
                <div
                  key={item}
                  className={cn(
                    "rounded-lg px-3 py-2 text-xs font-medium",
                    i === 0
                      ? "bg-indigo-500/10 text-indigo-600"
                      : "text-slate-500 hover:bg-slate-100"
                  )}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 p-4">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Lead Pipeline</h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {["New", "Contacted", "Proposal Sent", "Won"].map((stage, si) => (
                <div key={stage} className="min-w-[130px] flex-1">
                  <div className="mb-2 text-[11px] font-medium text-slate-400">
                    {stage}
                  </div>
                  <div className="space-y-2">
                    {[1, 2].slice(0, si === 3 ? 1 : 2).map((c) => (
                      <div
                        key={c}
                        className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm"
                      >
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-indigo-100 text-[10px] font-bold text-indigo-600 flex items-center justify-center">
                            {["A", "B", "C", "D"][si * 2 + c - 1]}
                          </div>
                          <div className="text-[11px] font-medium text-slate-700">
                            {["Acme Corp", "BrightLabs", "Stark Design", "NovaTech"][
                              si * 2 + c - 1
                            ] || "Lead"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI sidebar */}
          <div className="hidden w-56 border-l border-slate-100 bg-slate-50/50 p-4 lg:block">
            <div className="mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-500" />
              <span className="text-xs font-semibold text-slate-700">AI Assistant</span>
            </div>
            <div className="rounded-xl bg-indigo-500/10 p-3 text-[11px] leading-relaxed text-slate-600">
              3 leads need follow-up this week. Want me to draft emails?
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               Chat Mockup                                  */
/* -------------------------------------------------------------------------- */

function ChatMockup() {
  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-4 shadow-[0_0_80px_rgba(99,102,241,0.2)] sm:p-6">
      <div className="space-y-4">
        {/* User bubble */}
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-2xl rounded-br-md bg-indigo-500 px-4 py-3 text-sm text-white">
            Which leads need follow-up?
          </div>
        </div>

        {/* AI bubble */}
        <div className="flex justify-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500/20">
            <Sparkles className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-slate-700/60 px-4 py-3 text-sm leading-relaxed text-slate-200">
            <p className="mb-2 font-medium text-white">You have 3 leads pending follow-up:</p>
            <ul className="mb-3 space-y-1 text-slate-300">
              <li>• Acme Corp — 5 days since last contact</li>
              <li>• BrightLabs — 3 days, proposal viewed twice</li>
              <li>• Stark Design — 1 day, no response to initial email</li>
            </ul>
            <p className="text-slate-400">Want me to draft personalized follow-up emails?</p>
          </div>
        </div>

        {/* User bubble */}
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-2xl rounded-br-md bg-indigo-500 px-4 py-3 text-sm text-white">
            Yes, draft for Acme Corp
          </div>
        </div>

        {/* AI draft response */}
        <div className="flex justify-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500/20">
            <Sparkles className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="max-w-[85%] overflow-hidden rounded-2xl rounded-bl-md border border-slate-600/50 bg-slate-700/40">
            <div className="border-b border-slate-600/50 px-4 py-2">
              <span className="text-[11px] text-slate-400">Subject:</span>
              <span className="ml-1 text-sm text-white">Following up — Acme Corp</span>
            </div>
            <div className="px-4 py-3 text-sm leading-relaxed text-slate-300">
              Hi there, I wanted to circle back on our conversation about the website redesign project. Our team is ready to get started, and I&apos;d love to discuss next steps when you have a moment...
            </div>
            <div className="flex gap-2 border-t border-slate-600/50 px-4 py-2.5">
              <button className="flex items-center gap-1.5 rounded-lg bg-indigo-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-600">
                <Send className="h-3 w-3" /> Send
              </button>
              <button className="flex items-center gap-1.5 rounded-lg border border-slate-500 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-600/50">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   FAQ                                      */
/* -------------------------------------------------------------------------- */

const faqItems = [
  {
    q: "Is my client data secure?",
    a: "Absolutely. We use bank-level 256-bit encryption, and your data is never used to train AI models. You own your data, period.",
  },
  {
    q: "Can I import from spreadsheets or other tools?",
    a: "Yes. Upload CSV files for leads and clients, or connect your Gmail to auto-import contacts. Notion and Airtable integrations are coming soon.",
  },
  {
    q: "Does it integrate with Stripe and PayPal?",
    a: "Pro plans include native Stripe and PayPal integration. Invoices sync automatically, and payment status updates in real-time.",
  },
  {
    q: "What happens when I hit the free plan limits?",
    a: "You'll get a friendly heads-up. You can upgrade to Pro anytime, or archive old clients to make room. We never delete your data.",
  },
  {
    q: "Can I cancel my Pro plan anytime?",
    a: "Yes. No contracts, no cancellation fees. If you cancel, you keep access until the end of your billing period, then downgrade to Free.",
  },
];

function FAQItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof faqItems)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-slate-200">
      <button
        className="flex w-full items-center justify-between py-5 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-slate-900">{item.q}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden text-sm leading-relaxed text-slate-500 transition-all duration-300",
          isOpen ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {item.a}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Page                                      */
/* -------------------------------------------------------------------------- */

export default function HomePage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const heroObs = useInView(0.15);
  const problemObs = useInView();
  const featuresObs = useInView();
  const howObs = useInView();
  const aiObs = useInView();
  const testimonialsObs = useInView();
  const pricingObs = useInView();
  const faqObs = useInView();
  const ctaObs = useInView();

  return (
    <>
      {/* ================================================================== */}
      {/*                              HERO                                  */}
      {/* ================================================================== */}
      <section className="relative min-h-[calc(100vh-72px)] overflow-hidden">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[calc(100vh-72px)] flex-col items-center gap-12 py-20 lg:flex-row lg:items-center lg:gap-16">
            {/* Left */}
            <div
              ref={heroObs.ref}
              className={cn(
                "flex-1 text-center lg:text-left",
                heroObs.inView && "animate-fade-up"
              )}
            >
              <span className="mb-4 inline-block rounded-full bg-indigo-500 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
                AI-Powered Freelance Workspace
              </span>
              <h1 className="text-[36px] font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-[56px]">
                Run your freelance business{" "}
                <span className="text-indigo-500">on autopilot.</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-500">
                Stop switching between spreadsheets, docs, and invoicing apps.
                FlowPilot brings your leads, projects, and payments into one
                intelligent workspace — so you can focus on billable work.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="gap-2 bg-indigo-500 text-white hover:bg-indigo-600"
                  >
                    Start for Free <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="gap-2">
                  <Play className="h-4 w-4" /> Watch Demo
                </Button>
              </div>

              {/* Social proof */}
              <div className="mt-10 flex items-center gap-4 lg:justify-start">
                <div className="flex -space-x-2">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-indigo-100 text-xs font-bold text-indigo-600"
                    >
                      {["S", "M", "E", "J", "A"][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Trusted by 2,000+ freelancers
                  </p>
                  <div className="flex items-center gap-1">
                    <div className="flex text-amber-400">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-slate-500">
                      4.9/5 from 300+ reviews
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Mockup */}
            <div
              ref={heroObs.ref}
              className={cn(
                "flex-1",
                heroObs.inView && "animate-fade-up-delay-2"
              )}
            >
              <div className="animate-float">
                <DashboardMockup />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*                            PROBLEM                                 */}
      {/* ================================================================== */}
      <section className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div
            ref={problemObs.ref}
            className={cn(
              "transition-all duration-700",
              problemObs.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <SectionHeadline
              title="Tired of juggling five different tools?"
              subtitle="You're not alone. Most freelancers waste 8+ hours a week on admin work."
            />
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: UserX,
                title: "Lost Leads",
                desc: "Leads slip through the cracks because there's no system. Spreadsheets don't remind you to follow up.",
              },
              {
                icon: FileText,
                title: "Proposal Hell",
                desc: "You spend 2+ hours formatting proposals in Word or Google Docs. Every. Single. Time.",
              },
              {
                icon: CreditCard,
                title: "Invoice Chaos",
                desc: "Invoices live in one app, payments in another, and tracking who paid what requires detective work.",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className={cn(
                  "rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500",
                  problemObs.inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${(i + 1) * 100}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10">
                  <item.icon className="h-6 w-6 text-indigo-500" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="#features"
              className="inline-flex items-center gap-1 text-sm font-medium text-indigo-500 hover:text-indigo-600"
            >
              There&apos;s a better way <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*                            FEATURES                                */}
      {/* ================================================================== */}
      <section id="features" className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div
            ref={featuresObs.ref}
            className={cn(
              "transition-all duration-700",
              featuresObs.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <SectionHeadline
              eyebrow="Everything you need"
              title="One platform. Your entire business."
              subtitle="From first contact to final payment — manage it all without switching apps."
            />
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Users,
                title: "Lead Management",
                desc: "Track and score every prospect. Automatic follow-up reminders so no opportunity goes cold.",
                badge: null,
              },
              {
                icon: Sparkles,
                title: "AI Proposals",
                desc: "Generate professional, branded proposals in seconds from a simple client brief. Edit and send in one click.",
                badge: "Popular",
              },
              {
                icon: FolderKanban,
                title: "Project Tracking",
                desc: "Kanban boards, task lists, and deadlines. See exactly what's on your plate at a glance.",
                badge: null,
              },
              {
                icon: Receipt,
                title: "Invoicing & Payments",
                desc: "Create invoices, track payments, and send automatic reminders. Integrates with Stripe and PayPal.",
                badge: null,
              },
              {
                icon: Bot,
                title: "AI Business Assistant",
                desc: "Ask anything: 'Which leads need follow-up?' or 'Draft a proposal for Acme Corp.' Your data, instantly understood.",
                badge: "New",
              },
              {
                icon: Zap,
                title: "Workflow Automation",
                desc: "Auto-move leads through stages, send scheduled emails, and trigger actions based on events.",
                badge: null,
              },
            ].map((feat, i) => (
              <div
                key={feat.title}
                className={cn(
                  "group relative rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]",
                  featuresObs.inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${(i + 1) * 80}ms` }}
              >
                {feat.badge && (
                  <span
                    className={cn(
                      "absolute right-4 top-4 rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white",
                      feat.badge === "New"
                        ? "bg-emerald-500"
                        : "bg-indigo-500"
                    )}
                  >
                    {feat.badge}
                  </span>
                )}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 transition-colors duration-300 group-hover:bg-indigo-500 group-hover:text-white">
                  <feat.icon className="h-6 w-6 text-indigo-500 transition-colors duration-300 group-hover:text-white" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {feat.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*                         HOW IT WORKS                               */}
      {/* ================================================================== */}
      <section id="how-it-works" className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div
            ref={howObs.ref}
            className={cn(
              "transition-all duration-700",
              howObs.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <SectionHeadline
              title="Get started in minutes, not days"
              subtitle="No complex setup. No migration headaches. Just connect and go."
            />
          </div>

          <div className="relative mt-16">
            {/* Timeline line (desktop) */}
            <div className="absolute left-0 right-0 top-5 hidden h-0.5 bg-indigo-200 lg:block" />

            {/* Mobile vertical line */}
            <div className="absolute bottom-0 left-5 top-0 w-0.5 bg-indigo-200 lg:hidden" />

            <div className="grid gap-8 lg:grid-cols-4">
              {[
                {
                  step: 1,
                  title: "Import or Add Leads",
                  desc: "Upload from CSV, connect your email, or add manually. AI enriches contact info automatically.",
                  time: "2 minutes",
                },
                {
                  step: 2,
                  title: "Create Proposals with AI",
                  desc: "Paste a client brief. FlowPilot generates a tailored, beautifully formatted proposal.",
                  time: "30 seconds",
                },
                {
                  step: 3,
                  title: "Track Projects & Tasks",
                  desc: "Organize work in Kanban boards. Set deadlines, attach files, and log time.",
                  time: null,
                },
                {
                  step: 4,
                  title: "Invoice & Get Paid",
                  desc: "One-click invoice generation from completed projects. Automatic payment reminders.",
                  time: null,
                },
              ].map((s, i) => (
                <div
                  key={s.step}
                  className={cn(
                    "relative pl-14 transition-all duration-500 lg:pl-0 lg:text-center",
                    howObs.inView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  )}
                  style={{ transitionDelay: `${(i + 1) * 100}ms` }}
                >
                  {/* Step circle */}
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white lg:left-1/2 lg:-translate-x-1/2">
                    {s.step}
                  </div>

                  <div className="pt-2 lg:pt-14">
                    <h3 className="text-base font-semibold text-slate-900">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {s.desc}
                    </p>
                    {s.time && (
                      <span className="mt-2 inline-block rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-600">
                        {s.time}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*                        AI ASSISTANT SHOWCASE                       */}
      {/* ================================================================== */}
      <section className="bg-slate-900 py-20 sm:py-28">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
            {/* Left */}
            <div
              ref={aiObs.ref}
              className={cn(
                "flex-1",
                aiObs.inView && "animate-fade-up"
              )}
            >
              <SectionBadge>Your AI Business Partner</SectionBadge>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ask your business anything. Get answers instantly.
              </h2>
              <ul className="mt-8 space-y-4">
                {[
                  "Which leads have I not followed up with this week?",
                  "Create a proposal for BrightLabs based on our last conversation.",
                  "How much revenue did I make last month vs. this month?",
                  "Draft a polite payment reminder for Invoice #1042.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-indigo-400" />
                    <span className="text-sm leading-relaxed text-slate-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <Button className="mt-8 bg-indigo-500 text-white hover:bg-indigo-600">
                See AI in Action
              </Button>
            </div>

            {/* Right — Chat mockup */}
            <div
              ref={aiObs.ref}
              className={cn(
                "flex-1",
                aiObs.inView && "animate-fade-up-delay-2"
              )}
            >
              <ChatMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*                          TESTIMONIALS                              */}
      {/* ================================================================== */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div
            ref={testimonialsObs.ref}
            className={cn(
              "transition-all duration-700",
              testimonialsObs.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <SectionHeadline title="Loved by freelancers everywhere" />
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote:
                  "FlowPilot cut my admin time by 60%. The AI proposals alone save me 3 hours every week. I actually enjoy sending proposals now.",
                name: "Sarah Chen",
                role: "Freelance UX Designer",
                initials: "SC",
              },
              {
                quote:
                  "I used to lose leads constantly because I had no system. Now FlowPilot tells me exactly who to follow up with and when. Game changer.",
                name: "Marcus Johnson",
                role: "Independent Developer",
                initials: "MJ",
              },
              {
                quote:
                  "The AI assistant feels like having a business partner. I ask it revenue questions, and it pulls real data instantly. No more spreadsheet gymnastics.",
                name: "Elena Rossi",
                role: "Marketing Consultant",
                initials: "ER",
              },
            ].map((t, i) => (
              <div
                key={t.name}
                className={cn(
                  "rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500",
                  testimonialsObs.inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${(i + 1) * 100}ms` }}
              >
                <div className="flex text-amber-400">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star key={s} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*                            PRICING                                 */}
      {/* ================================================================== */}
      <section id="pricing" className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8">
          <div
            ref={pricingObs.ref}
            className={cn(
              "transition-all duration-700",
              pricingObs.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <SectionHeadline
              title="Simple, transparent pricing"
              subtitle="Start free. Upgrade when you're ready."
            />
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {/* Starter */}
            <div
              className={cn(
                "rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-500",
                pricingObs.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              <h3 className="text-lg font-semibold text-slate-900">Starter</h3>
              <p className="mt-1 text-sm text-slate-500">Perfect for getting started</p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-slate-900">$0</span>
                <span className="text-sm text-slate-500"> / month</span>
              </div>
              <ul className="mt-6 space-y-3">
                {[
                  "Up to 10 clients",
                  "Basic lead tracking",
                  "3 AI proposals/month",
                  "Simple invoicing",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="h-4 w-4 text-emerald-500" /> {f}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="mt-8 w-full">
                Start for Free
              </Button>
            </div>

            {/* Pro */}
            <div
              className={cn(
                "relative rounded-2xl border-2 border-indigo-500 bg-white p-8 shadow-[0_0_40px_rgba(99,102,241,0.1)] transition-all duration-500",
                pricingObs.inView ? "opacity-100 translate-y-0 delay-100" : "opacity-0 translate-y-8"
              )}
            >
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-indigo-500 px-4 py-1 text-xs font-semibold text-white">
                Most Popular
              </span>
              <h3 className="text-lg font-semibold text-slate-900">Pro</h3>
              <p className="mt-1 text-sm text-slate-500">For growing freelance businesses</p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-slate-900">$19</span>
                <span className="text-sm text-slate-500"> / month</span>
              </div>
              <ul className="mt-6 space-y-3">
                {[
                  "Unlimited clients",
                  "Unlimited AI proposals",
                  "Advanced project tracking",
                  "Workflow automation",
                  "Priority AI assistant",
                  "Stripe & PayPal integration",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="h-4 w-4 text-emerald-500" /> {f}
                  </li>
                ))}
              </ul>
              <Button className="mt-8 w-full bg-indigo-500 text-white hover:bg-indigo-600">
                Start Pro Trial
              </Button>
              <p className="mt-3 text-center text-xs text-slate-400">
                14-day free trial. No credit card required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*                               FAQ                                  */}
      {/* ================================================================== */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[640px] px-4 sm:px-6 lg:px-8">
          <div
            ref={faqObs.ref}
            className={cn(
              "transition-all duration-700",
              faqObs.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <SectionHeadline title="Questions? Answered." />
          </div>

          <div className="mt-10">
            {faqItems.map((item, i) => (
              <FAQItem
                key={i}
                item={item}
                isOpen={faqOpen === i}
                onToggle={() => setFaqOpen(faqOpen === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*                          FINAL CTA                                 */}
      {/* ================================================================== */}
      <section className="bg-slate-900 py-20 sm:py-28">
        <div
          ref={ctaObs.ref}
          className={cn(
            "mx-auto max-w-[1200px] px-4 text-center transition-all duration-700",
            ctaObs.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to stop juggling tools?
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Join 2,000+ freelancers who&apos;ve streamlined their business with
            FlowPilot. Free forever to start.
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              className="mt-8 gap-2 bg-indigo-500 text-white hover:bg-indigo-600"
            >
              Start for Free — No Credit Card Required <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
            {["Free forever plan available", "Setup in under 5 minutes", "Cancel anytime"].map(
              (t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-500" /> {t}
                </span>
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
}
