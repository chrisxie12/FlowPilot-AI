"use client";

import {
  Bot,
  Briefcase,
  FileText,
  FolderKanban,
  Home,
  Menu,
  Settings,
  UserSquare2,
  Users,
  Wallet,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/leads", label: "Leads", icon: UserSquare2 },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/proposals", label: "Proposals", icon: FileText },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/invoices", label: "Invoices", icon: Wallet },
  { href: "/ai-assistant", label: "AI Assistant", icon: Bot },
  { href: "/settings", label: "Settings", icon: Settings },
];

function NavList() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {links.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm",
              active ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100",
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <aside className="hidden min-h-screen w-64 border-r bg-white p-4 lg:block">
        <div className="mb-6 flex items-center gap-2 text-lg font-semibold">
          <Briefcase className="h-5 w-5" /> FlowPilot AI
        </div>
        <NavList />
        <div className="mt-8 rounded-lg border p-3 text-sm">
          <p className="font-medium">Signed in user</p>
          <p className="text-slate-500">Manage profile in Settings.</p>
        </div>
      </aside>

      <div className="border-b bg-white p-3 lg:hidden">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-4 w-4" /> Menu
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden" onClick={() => setOpen(false)}>
          <div
            className="h-full w-72 bg-white p-4"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Briefcase className="h-5 w-5" /> FlowPilot AI
              </div>
              <button type="button" onClick={() => setOpen(false)}>
                <X className="h-4 w-4" />
              </button>
            </div>
            <NavList />
          </div>
        </div>
      )}
    </>
  );
}
