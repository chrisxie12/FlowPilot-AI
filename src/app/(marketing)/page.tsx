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

function useInView(threshold = 0.15) {
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
    <div className="glass rounded-2xl p-4 sm:p-6 shadow-[0_0_80px_rgba(124,58,237,0.08)]">
      <div className="mb-4 flex items-center gap-2 border-b border-white/[0.06] pb-4">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-blue-500">
          <Sparkles className="h-3 w-3 text-white" />
        </div>
        <span className="text-xs font-medium text-[#A1A1AA]">AI Assistant</span>
        <span className="ml-auto rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
          Example conversation
        </span>
      </div>

      <div className="space-y-4">
        {/* User */}
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-2xl rounded-br-md bg-gradient-to-r from-violet-500 to-blue-500 px-4 py-3 text-sm text-white">
            Which leads need follow-up this week?
          </div>
        </div>

        {/* AI */}
        <div className="flex justify-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06]">
            <Sparkles className="h-4 w-4 text-violet-400" />
          </div>
          <div className="max-w-[85%] rounded-2xl rounded-bl-md glass px-4 py-3 text-sm leading-relaxed text-[#D4D4D8]">
            <p className="mb-2 font-medium text-[#F5F5F7]">3 leads need follow-up:</p>
            <ul className="mb-3 space-y-1">
              <li>• <strong className="text-[#F5F5F7]">Northwave Creative</strong> — you emailed 5 days ago, no reply</li>
              <li>• <strong className="text-[#F5F5F7]">Redpixel Studio</strong> — they viewed your proposal twice on Tuesday</li>
              <li>• <strong className="text-[#F5F5F7]">Jakes & Co</strong> — initial contact 3 days ago, went quiet</li>
            </ul>
            <p className="text-[#71717A]">Want me to draft follow-up emails for each?</p>
          </div>
        </div>

        {/* User */}
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-2xl rounded-br-md bg-gradient-to-r from-violet-500 to-blue-500 px-4 py-3 text-sm text-white">
            Yes — start with Northwave. They want a 2-week landing page, budget around $3k.
          </div>
        </div>

        {/* AI draft */}
        <div className="flex justify-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06]">
            <Sparkles className="h-4 w-4 text-violet-400" />
          </div>
          <div className="max-w-[85%] overflow-hidden rounded-2xl rounded-bl-md border border-white/[0.08] bg-[#111118]">
            <div className="border-b border-white/[0.06] px-4 py-2.5">
              <span className="text-[11px] text-[#52525B]">To:</span>{" "}
              <span className="text-sm text-[#A1A1AA]">hello@northwavecreative.com</span>
            </div>
            <div className="border-b border-white/[0.06] px-4 py-2">
              <span className="text-[11px] text-[#52525B]">Subject:</span>{" "}
              <span className="text-sm font-medium text-[#F5F5F7]">Re: Landing page project</span>
            </div>
            <div className="px-4 py-3 text-sm leading-relaxed text-[#A1A1AA]">
              Hey, just checking in on the landing page project. I know things get busy — wanted to
              make sure I didn&apos;t miss anything on my end. Still happy to get started whenever
              you&apos;re ready. I can have a first draft within a week of kickoff.
            </div>
            <div className="flex gap-2 border-t border-white/[0.06] px-4 py-2.5">
              <button className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-500 to-blue-500 px-3 py-1.5 text-xs font-medium text-white hover:from-violet-600 hover:to-blue-600">
                <Send className="h-3 w-3" /> Send
              </button>
              <button className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] px-3 py-1.5 text-xs font-medium text-[#A1A1AA] hover:bg-white/5">
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
    <div className="border-b border-white/[0.06]">
      <button
        className="flex w-full items-center justify-between py-5 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-[#F5F5F7]">{item.q}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-[#52525B] transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden text-sm leading-relaxed text-[#A1A1AA] transition-all duration-300",
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
  const heroObs = useInView(0.1);
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
      <section className="relative min-h-[calc(100vh-72px)] overflow-hidden">
        {/* Background glow blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[120px] animate-drift" />
          <div className="absolute right-1/4 top-1/2 h-[400px] w-[400px] rounded-full bg-blue-500/15 blur-[100px] animate-drift" style={{ animationDelay: "-7s" }} />
        </div>

        <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[calc(100vh-72px)] flex-col items-center gap-12 py-20 lg:flex-row lg:items-center lg:gap-16">
            {/* Left */}
            <div
              ref={heroObs.ref}
              className={cn(
                "flex-1 text-center lg:text-left",
                heroObs.inView && "animate-fade-up"
              )}
            >
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-[#A1A1AA] backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-glow-pulse" />
                Early access — building in public
              </span>
              <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-[#F5F5F7]">
                Stop losing leads because you forgot to follow up.
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#A1A1AA]">
                FlowPilot is one place for your leads, proposals, projects, and
                invoices — with an AI assistant that actually knows your pipeline.
              </p>

              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="gap-2 bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] hover:from-violet-600 hover:to-blue-600"
                  >
                    Start for Free <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <p className="mt-5 text-sm text-[#52525B]">
                Free while in beta. No credit card required.
              </p>
            </div>

            {/* Right — Dashboard mockup */}
            <div
              ref={heroObs.ref}
              className={cn(
                "flex-1",
                heroObs.inView && "animate-fade-up"
              )}
              style={{ animationDelay: "150ms" }}
            >
              <div className="animate-float">
                <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0F0F17] shadow-[0_0_80px_rgba(124,58,237,0.1)]">
                  {/* Title bar */}
                  <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-[#FF5F56]" />
                      <div className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                      <div className="h-3 w-3 rounded-full bg-[#27C93F]" />
                    </div>
                    <span className="ml-2 text-xs text-[#52525B]">FlowPilot</span>
                  </div>
                  <div className="flex min-h-[260px]">
                    {/* Sidebar */}
                    <div className="hidden w-40 border-r border-white/[0.06] bg-white/[0.02] p-3 sm:block">
                      <div className="space-y-1">
                        {["Leads", "Projects", "Invoices", "AI Assistant"].map((item, i) => (
                          <div
                            key={item}
                            className={cn(
                              "rounded-lg px-3 py-2 text-xs font-medium",
                              i === 0
                                ? "bg-gradient-to-r from-violet-500/10 to-blue-500/10 text-violet-300"
                                : "text-[#52525B] hover:text-[#A1A1AA]"
                            )}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Main content */}
                    <div className="flex-1 p-4">
                      <div className="mb-3 text-xs font-semibold text-[#A1A1AA]">
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
                            <div className="mb-1.5 text-[10px] font-medium text-[#52525B]">
                              {col.stage}
                            </div>
                            <div className="space-y-1.5">
                              {col.names.map((name) => (
                                <div
                                  key={name}
                                  className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-2"
                                >
                                  <div className="text-[10px] font-medium text-[#D4D4D8]">
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
      <section className="relative border-y border-white/[0.06] py-12 sm:py-16">
        <div className="mx-auto max-w-[640px] px-4 sm:px-6 lg:px-8">
          {/* TODO: replace with Chris's real founder story — one specific moment, not a generic pain point. */}
        </div>
      </section>

      {/* ================================================================== */}
      {/*                     ONE REAL THING — AI CHAT                      */}
      {/* ================================================================== */}
      <section className="relative py-24 sm:py-32">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div
            ref={chatObs.ref}
            className={cn(
              "mx-auto max-w-2xl transition-all duration-700",
              chatObs.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            )}
          >
            <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-violet-400">
              Here&apos;s what it actually does
            </p>
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-[#F5F5F7] sm:text-4xl">
              Ask your pipeline a question. Get a draft.
            </h2>
            <ChatTranscript />
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*                            FEATURES                                */}
      {/* ================================================================== */}
      <section id="features" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div
            ref={featuresObs.ref}
            className={cn(
              "transition-all duration-700",
              featuresObs.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            )}
          >
            <h2 className="mb-4 text-center text-3xl font-bold tracking-tight text-[#F5F5F7] sm:text-4xl">
              What FlowPilot does
            </h2>
            <p className="mb-14 text-center text-[#52525B]">
              One tool, not five. Built for how freelancers actually work.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* AI Proposals — the hero feature */}
            <div
              className={cn(
                "group relative glass glass-hover rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(124,58,237,0.1)] sm:col-span-2 lg:col-span-1",
                featuresObs.inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              )}
              style={{ transitionDelay: "80ms" }}
            >
              <span className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                Core feature
              </span>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 transition-all duration-300 group-hover:from-violet-500 group-hover:to-blue-500 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                <Sparkles className="h-6 w-6 text-violet-300 transition-colors duration-300 group-hover:text-white" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#F5F5F7]">
                AI Proposals
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#71717A]">
                Type &ldquo;2-week landing page, $3,000&rdquo; and get a formatted proposal with
                your rate card and terms already filled in. Edit the details, send it from the
                same screen. Most people go from brief to sent proposal in under a minute.
              </p>
            </div>

            {[
              {
                icon: Users,
                title: "Lead tracking",
                desc: "Kanban board for your pipeline: New → Contacted → Proposal Sent → Won. Every lead has a status, a last-contact date, and a next-follow-up reminder. You see the whole picture without opening a spreadsheet.",
              },
              {
                icon: FolderKanban,
                title: "Project boards",
                desc: "Drag tasks between columns. Set deadlines. Attach files. When a project finishes, generate the invoice from the same board — no re-entering details.",
              },
              {
                icon: Receipt,
                title: "Invoicing",
                desc: "One-click invoice from a completed project. Stripe and PayPal on Pro. Automatic reminders when an invoice goes past due.",
              },
              {
                icon: Bot,
                title: "AI assistant",
                desc: "It reads your actual data. Ask \u201Cwho haven\u2019t I followed up with?\u201D and get a list with names and dates — not a chatbot pretending to help.",
              },
            ].map((feat, i) => (
              <div
                key={feat.title}
                className={cn(
                  "group glass glass-hover rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(124,58,237,0.1)]",
                  featuresObs.inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                )}
                style={{ transitionDelay: `${(i + 1) * 80}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 transition-all duration-300 group-hover:from-violet-500 group-hover:to-blue-500 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                  <feat.icon className="h-6 w-6 text-violet-300 transition-colors duration-300 group-hover:text-white" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#F5F5F7]">
                  {feat.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#71717A]">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*                            PRICING                                 */}
      {/* ================================================================== */}
      <section id="pricing" className="relative py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-[700px] px-4 sm:px-6 lg:px-8">
          <div
            ref={pricingObs.ref}
            className={cn(
              "transition-all duration-700",
              pricingObs.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            )}
          >
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-[#F5F5F7] sm:text-4xl">
              Pricing
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Free */}
            <div
              className={cn(
                "glass rounded-2xl p-6 transition-all duration-500",
                pricingObs.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              )}
            >
              <h3 className="text-base font-semibold text-[#F5F5F7]">Free</h3>
              <div className="mt-3">
                <span className="text-3xl font-bold text-[#F5F5F7]">$0</span>
                <span className="text-sm text-[#52525B]"> / month</span>
              </div>
              <ul className="mt-5 space-y-2.5">
                {[
                  "Up to 10 clients",
                  "Basic lead tracking",
                  "3 AI proposals/month",
                  "Simple invoicing",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                    <Check className="h-4 w-4 text-emerald-400" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="mt-6 block">
                <Button variant="outline" className="w-full border-white/[0.08] bg-transparent text-[#F5F5F7] hover:bg-white/5">
                  Start for Free
                </Button>
              </Link>
            </div>

            {/* Pro */}
            <div
              className={cn(
                "relative rounded-2xl border border-violet-500/30 bg-[#0F0F17] p-6 shadow-[0_0_40px_rgba(124,58,237,0.08)] transition-all duration-500",
                pricingObs.inView ? "opacity-100 translate-y-0 delay-100" : "opacity-0 translate-y-5"
              )}
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-3 py-0.5 text-[11px] font-semibold text-white">
                Most used
              </span>
              <h3 className="text-base font-semibold text-[#F5F5F7]">Pro</h3>
              <div className="mt-3">
                <span className="text-3xl font-bold text-[#F5F5F7]">$19</span>
                <span className="text-sm text-[#52525B]"> / month</span>
              </div>
              <ul className="mt-5 space-y-2.5">
                {[
                  "Unlimited clients",
                  "Unlimited AI proposals",
                  "Workflow automation",
                  "Stripe & PayPal",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                    <Check className="h-4 w-4 text-emerald-400" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="mt-6 block">
                <Button className="w-full bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:from-violet-600 hover:to-blue-600">
                  Start Pro Trial
                </Button>
              </Link>
              <p className="mt-2.5 text-center text-xs text-[#52525B]">
                14-day trial. No card needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*                               FAQ                                  */}
      {/* ================================================================== */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-[560px] px-4 sm:px-6 lg:px-8">
          <div
            ref={faqObs.ref}
            className={cn(
              "transition-all duration-700",
              faqObs.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            )}
          >
            <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-[#F5F5F7]">
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
      <section className="relative py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/15 blur-[120px]" />
        </div>

        <div
          ref={ctaObs.ref}
          className={cn(
            "relative mx-auto max-w-[640px] px-4 text-center transition-all duration-700",
            ctaObs.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          )}
        >
          <h2 className="text-3xl font-bold tracking-tight text-[#F5F5F7] sm:text-4xl">
            Try it — takes two minutes to add your first lead.
          </h2>
          <p className="mt-4 text-base text-[#52525B]">
            Free while in beta. No credit card, no sales call.
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              className="mt-8 gap-2 bg-gradient-to-r from-violet-500 to-blue-500 text-white shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] hover:from-violet-600 hover:to-blue-600"
            >
              Start for Free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
