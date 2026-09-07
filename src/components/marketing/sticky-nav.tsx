"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/[0.06] bg-[#0A0A0F]/80 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="text-base font-semibold text-[#F5F5F7]">FlowPilot</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm text-[#A1A1AA] transition-colors hover:text-[#F5F5F7]"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-sm text-[#A1A1AA] transition-colors hover:text-[#F5F5F7]"
          >
            Pricing
          </a>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-[#A1A1AA] hover:text-[#F5F5F7] hover:bg-white/5">
              Log In
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              size="sm"
              className="bg-gradient-to-r from-violet-500 to-blue-500 text-white hover:from-violet-600 hover:to-blue-600 shadow-[0_0_20px_rgba(124,58,237,0.3)]"
            >
              Start for Free
            </Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-6 w-6 text-[#F5F5F7]" />
          ) : (
            <Menu className="h-6 w-6 text-[#F5F5F7]" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/[0.06] bg-[#0A0A0F]/95 backdrop-blur-xl px-4 pb-6 pt-4 md:hidden">
          <nav className="flex flex-col gap-4">
            <a
              href="#features"
              className="text-sm text-[#A1A1AA]"
              onClick={() => setMobileOpen(false)}
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-sm text-[#A1A1AA]"
              onClick={() => setMobileOpen(false)}
            >
              Pricing
            </a>
            <div className="border-t border-white/[0.06] pt-4" />
            <Link href="/login" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-[#A1A1AA] hover:text-[#F5F5F7] hover:bg-white/5">
                Log In
              </Button>
            </Link>
            <Link href="/signup" onClick={() => setMobileOpen(false)}>
              <Button className="w-full bg-gradient-to-r from-violet-500 to-blue-500 text-white hover:from-violet-600 hover:to-blue-600">
                Start for Free
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
