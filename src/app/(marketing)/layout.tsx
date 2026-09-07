import Link from "next/link";
import { Zap } from "lucide-react";
import { StickyNav } from "@/components/marketing/sticky-nav";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#0A0A0F]">
      <StickyNav />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-white/[0.06] py-8">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-blue-500">
                <Zap className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm text-[#A1A1AA]">FlowPilot</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-[#A1A1AA]">
              <a href="#features" className="transition-colors hover:text-[#F5F5F7]">Features</a>
              <a href="#pricing" className="transition-colors hover:text-[#F5F5F7]">Pricing</a>
              <Link href="/login" className="transition-colors hover:text-[#F5F5F7]">Log In</Link>
            </div>
            <p className="text-xs text-[#52525B]">
              &copy; {new Date().getFullYear()} FlowPilot
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
