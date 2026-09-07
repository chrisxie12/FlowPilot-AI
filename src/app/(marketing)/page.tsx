"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
/*                           Chat Transcript (one real thing)                 */
/* -------------------------------------------------------------------------- */

function ChatTranscript() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] sm:p-6">
      <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-4">
        <Sparkles className="h-4 w-4 text-indigo-500" />
        <span className="text-xs font-semibold text-slate-500">AI Assistant</span>
        <span className="ml-auto rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
          Example conversation
        </span>
      </div>

      <div className="space-y-4">
        {/* User */}
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-2xl rounded-br-md bg-indigo-500 px-4 py-3 text-sm text-white">
            Which leads need follow-up this week?
          </div>
        </div>

        {/* AI */}
        <div className="flex justify-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100">
            <Sparkles className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-700">
            <p className="mb-2 font-medium text-slate-900">3 leads need follow-up:</p>
            <ul className="mb-3 space-y-1">
              <li>• <strong>Northwave Creative</strong> — you emailed 5 days ago, no reply</li>
              <li>• <strong>Redpixel Studio</strong> — they viewed your proposal twice on Tuesday</li>
              <li>• <strong>Jakes & Co</strong> — initial contact 3 days ago, went quiet</li>
            </ul>
            <p className="text-slate-500">Want me to draft follow-up emails for each?</p>
          </div>
        </div>

        {/* User */}
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-2xl rounded-br-md bg-indigo-500 px-4 py-3 text-sm text-white">
            Yes — start with Northwave. They want a 2-week landing page, budget around $3k.
          </div>
        </div>

        {/* AI draft */}
        <div className="flex justify-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100">
            <Sparkles className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="max-w-[85%] overflow-hidden rounded-2xl rounded-bl-md border border-slate-200 bg-white">
            <div className="border-b border-slate-100 px-4 py-2.5">
              <span className="text-[11px] text-slate-400">To:</span>{" "}
              <span className="text-sm text-slate-700">hello@northwavecreative.com</span>
            </div>
            <div className="border-b border-slate-100 px-4 py-2">
              <span className="text-[11px] text-slate-400">Subject:</span>{" "}
              <span className="text-sm font-medium text-slate-900">Re: Landing page project</span>
            </div>
            <div className="px-4 py-3 text-sm leading-relaxed text-slate-600">
              Hey, just checking in on the landing page project. I know things get busy — wanted to
              make sure I didn&apos;t miss anything on my end. Still happy to get started whenever
              you&apos;re ready. I can have a first draft within a week of kickoff.
            </div>
            <div className="flex gap-2 border-t border-slate-100 px-4 py-2.5">
              <button className="flex items-center gap-1.5 rounded-lg bg-indigo-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-600">
                <Send className="h-3 w-3" /> Send
              </button>
              <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
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
    q: "Is my data secure?",
    a: "256-bit encryption, same standard banks use. Your data is never used to train AI models. You own it.",
  },
  {
    q: "Can I import from a spreadsheet?",
    a: "Yes — CSV upload for leads and clients. Gmail integration for auto-importing contacts.",
  },
  {
    q: "Does it work with Stripe?",
    a: "Pro plans include Stripe and PayPal. Invoices sync automatically, payment status updates in real time.",
  },
  {
    q: "What happens when I hit the free plan limits?",
    a: "You get a heads-up. Upgrade anytime or archive old clients. We never delete your data.",
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
  const chatObs = useInView();
  const featuresObs = useInView();
  const pricingObs = useInView();
  const faqObs = useInView();
  const ctaObs = useInView();

  return (
    <>
      {/* ================================================================== */}
      {/*                              HERO                                  */}
      {/* ================================================================== */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
            {/* Left */}
            <div
              ref={heroObs.ref}
              className={cn(
                "flex-1 text-center lg:text-left",
                heroObs.inView && "animate-fade-up"
              )}
            >
              <span className="mb-4 inline-block rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-600">
                Early access — building in public
              </span>
              <h1 className="text-[36px] font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-[56px]">
                Stop losing leads because you forgot to follow up.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-500">
                FlowPilot is one place for your leads, proposals, projects, and
                invoices — with an AI assistant that actually knows your pipeline.
              </p>

              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="gap-2 bg-indigo-500 text-white hover:bg-indigo-600"
                  >
                    Start for Free <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <p className="mt-4 text-sm text-slate-400">
                Free while in beta. No credit card required.
              </p>
            </div>

            {/* Right — Dashboard mockup */}
            <div
              ref={heroObs.ref}
              className={cn(
                "flex-1",
                heroObs.inView && "animate-fade-up-delay-2"
              )}
            >
              <div className="animate-float">
                {/* Simple dashboard preview */}
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)]">
                  <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-400" />
                      <div className="h-3 w-3 rounded-full bg-amber-400" />
                      <div className="h-3 w-3 rounded-full bg-green-400" />
                    </div>
                    <span className="ml-2 text-xs text-slate-400">FlowPilot</span>
                  </div>
                  <div className="flex min-h-[260px]">
                    <div className="hidden w-40 border-r border-slate-100 bg-slate-50/50 p-3 sm:block">
                      <div className="space-y-1">
                        {["Leads", "Projects", "Invoices", "AI Assistant"].map((item, i) => (
                          <div
                            key={item}
                            className={cn(
                              "rounded-lg px-3 py-2 text-xs font-medium",
                              i === 0
                                ? "bg-indigo-500/10 text-indigo-600"
                                : "text-slate-500"
                            )}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 p-4">
                      <div className="mb-3 text-xs font-semibold text-slate-700">
                        Lead Pipeline
                      </div>
                      <div className="flex gap-2">
                        {[
                          { stage: "New", names: ["Northwave Creative", "Redpixel Studio"] },
                          { stage: "Contacted", names: ["Jakes & Co", "BrightLabs"] },
                          { stage: "Proposal Sent", names: ["Stark Design"] },
                          { stage: "Won", names: ["NovaTech"] },
                        ].map((col) => (
                          <div key={col.stage} className="min-w-[110px] flex-1">
                            <div className="mb-1.5 text-[10px] font-medium text-slate-400">
                              {col.stage}
                            </div>
                            <div className="space-y-1.5">
                              {col.names.map((name) => (
                                <div
                                  key={name}
                                  className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 shadow-sm"
                                >
                                  <div className="text-[10px] font-medium text-slate-700">
                                    {name}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*                        FOUNDER NOTE                               */}
      {/* ================================================================== */}
      <section className="border-y border-slate-100 bg-slate-50 py-12 sm:py-16">
        <div className="mx-auto max-w-[640px] px-4 sm:px-6 lg:px-8">
          {/* TODO: replace with Chris's real founder story — one specific moment, not a generic pain point */}
          <p className="text-center text-[15px] leading-relaxed text-slate-500 italic">
            {/* TODO: replace with Chris's real founder story — one specific moment, not a generic pain point. */}
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/*                     ONE REAL THING — AI CHAT                      */}
      {/* ================================================================== */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div
            ref={chatObs.ref}
            className={cn(
              "mx-auto max-w-2xl transition-all duration-700",
              chatObs.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wider text-indigo-500">
              Here&apos;s what it actually does
            </p>
            <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Ask your pipeline a question. Get a draft.
            </h2>
            <ChatTranscript />
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*                            FEATURES                                */}
      {/* ================================================================== */}
      <section id="features" className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div
            ref={featuresObs.ref}
            className={cn(
              "transition-all duration-700",
              featuresObs.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              What FlowPilot does
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* AI Proposals — the hero feature, gets more space */}
            <div
              className={cn(
                "group relative rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] sm:col-span-2 lg:col-span-1",
                featuresObs.inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: "80ms" }}
            >
              <span className="absolute right-4 top-4 rounded-full bg-indigo-500 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                Core feature
              </span>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 transition-colors duration-300 group-hover:bg-indigo-500">
                <Sparkles className="h-6 w-6 text-indigo-500 transition-colors duration-300 group-hover:text-white" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                AI Proposals
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Type &ldquo;2-week landing page, $3,000&rdquo; and get a formatted proposal with
                your rate card and terms already filled in. Edit the details, send it from the
                same screen. Most people go from brief to sent proposal in under a minute.
              </p>
            </div>

            <div
              className={cn(
                "group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]",
                featuresObs.inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: "160ms" }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 transition-colors duration-300 group-hover:bg-indigo-500">
                <Users className="h-6 w-6 text-indigo-500 transition-colors duration-300 group-hover:text-white" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                Lead tracking
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Kanban board for your pipeline: New → Contacted → Proposal Sent → Won. Every
                lead has a status, a last-contact date, and a next-follow-up reminder. You see
                the whole picture without opening a spreadsheet.
              </p>
            </div>

            <div
              className={cn(
                "group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]",
                featuresObs.inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: "240ms" }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 transition-colors duration-300 group-hover:bg-indigo-500">
                <FolderKanban className="h-6 w-6 text-indigo-500 transition-colors duration-300 group-hover:text-white" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                Project boards
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Drag tasks between columns. Set deadlines. Attach files. When a project
                finishes, generate the invoice from the same board — no re-entering details.
              </p>
            </div>

            <div
              className={cn(
                "group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]",
                featuresObs.inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: "320ms" }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 transition-colors duration-300 group-hover:bg-indigo-500">
                <Receipt className="h-6 w-6 text-indigo-500 transition-colors duration-300 group-hover:text-white" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                Invoicing
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                One-click invoice from a completed project. Stripe and PayPal on Pro.
                Automatic reminders when an invoice goes past due.
              </p>
            </div>

            <div
              className={cn(
                "group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]",
                featuresObs.inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 transition-colors duration-300 group-hover:bg-indigo-500">
                <Bot className="h-6 w-6 text-indigo-500 transition-colors duration-300 group-hover:text-white" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                AI assistant
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                It reads your actual data. Ask &ldquo;who haven&rsquo;t I followed up with?&rdquo;
                and get a list with names and dates — not a chatbot pretending to help.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*                            PRICING                                 */}
      {/* ================================================================== */}
      <section id="pricing" className="py-20 sm:py-28">
        <div className="mx-auto max-w-[700px] px-4 sm:px-6 lg:px-8">
          <div
            ref={pricingObs.ref}
            className={cn(
              "transition-all duration-700",
              pricingObs.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Pricing
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Free */}
            <div
              className={cn(
                "rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-500",
                pricingObs.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              <h3 className="text-base font-semibold text-slate-900">Free</h3>
              <div className="mt-3">
                <span className="text-3xl font-bold text-slate-900">$0</span>
                <span className="text-sm text-slate-400"> / month</span>
              </div>
              <ul className="mt-5 space-y-2.5">
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
              <Link href="/signup" className="mt-6 block">
                <Button variant="outline" className="w-full">
                  Start for Free
                </Button>
              </Link>
            </div>

            {/* Pro */}
            <div
              className={cn(
                "relative rounded-2xl border-2 border-indigo-500 bg-white p-6 shadow-[0_0_40px_rgba(99,102,241,0.08)] transition-all duration-500",
                pricingObs.inView ? "opacity-100 translate-y-0 delay-100" : "opacity-0 translate-y-8"
              )}
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-500 px-3 py-0.5 text-[11px] font-semibold text-white">
                Most used
              </span>
              <h3 className="text-base font-semibold text-slate-900">Pro</h3>
              <div className="mt-3">
                <span className="text-3xl font-bold text-slate-900">$19</span>
                <span className="text-sm text-slate-400"> / month</span>
              </div>
              <ul className="mt-5 space-y-2.5">
                {[
                  "Unlimited clients",
                  "Unlimited AI proposals",
                  "Workflow automation",
                  "Stripe & PayPal",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="h-4 w-4 text-emerald-500" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="mt-6 block">
                <Button className="w-full bg-indigo-500 text-white hover:bg-indigo-600">
                  Start Pro Trial
                </Button>
              </Link>
              <p className="mt-2.5 text-center text-xs text-slate-400">
                14-day trial. No card needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*                               FAQ                                  */}
      {/* ================================================================== */}
      <section className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-[560px] px-4 sm:px-6 lg:px-8">
          <div
            ref={faqObs.ref}
            className={cn(
              "transition-all duration-700",
              faqObs.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-slate-900">
              Common questions
            </h2>
          </div>

          <div>
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
      <section className="py-20 sm:py-28">
        <div
          ref={ctaObs.ref}
          className={cn(
            "mx-auto max-w-[640px] px-4 text-center transition-all duration-700",
            ctaObs.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Try it — takes two minutes to add your first lead.
          </h2>
          <p className="mt-4 text-base text-slate-500">
            Free while in beta. No credit card, no sales call.
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              className="mt-8 gap-2 bg-indigo-500 text-white hover:bg-indigo-600"
            >
              Start for Free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
