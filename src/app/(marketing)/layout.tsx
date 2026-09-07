import Link from "next/link";
import { Zap } from "lucide-react";
import { StickyNav } from "@/components/marketing/sticky-nav";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <StickyNav />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-slate-100 py-8">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-indigo-500" />
              <span className="text-sm font-medium text-slate-700">FlowPilot AI</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <a href="#features" className="hover:text-slate-600">Features</a>
              <a href="#pricing" className="hover:text-slate-600">Pricing</a>
              <Link href="/login" className="hover:text-slate-600">Log In</Link>
            </div>
            <p className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} FlowPilot AI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
