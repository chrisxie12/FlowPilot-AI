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
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-slate-200/60 bg-white/80 backdrop-blur-xl shadow-sm"
          : "border-transparent bg-white"
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-indigo-500" />
          <span className="text-lg font-bold text-slate-900">FlowPilot AI</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
          >
            Pricing
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
          >
            How It Works
          </a>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Log In
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              size="sm"
              className="bg-indigo-500 text-white hover:bg-indigo-600"
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
            <X className="h-6 w-6 text-slate-900" />
          ) : (
            <Menu className="h-6 w-6 text-slate-900" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 pb-6 pt-4 md:hidden">
          <nav className="flex flex-col gap-4">
            <a
              href="#features"
              className="text-sm font-medium text-slate-600"
              onClick={() => setMobileOpen(false)}
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-slate-600"
              onClick={() => setMobileOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-slate-600"
              onClick={() => setMobileOpen(false)}
            >
              How It Works
            </a>
            <hr className="border-slate-200" />
            <Link href="/login" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Log In
              </Button>
            </Link>
            <Link href="/signup" onClick={() => setMobileOpen(false)}>
              <Button className="w-full bg-indigo-500 text-white hover:bg-indigo-600">
                Start for Free
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
