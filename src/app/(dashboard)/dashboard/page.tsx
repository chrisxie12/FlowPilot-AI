"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  UserPlus,
  Users,
  FolderKanban,
  Receipt,
  Clock,
  Sparkles,
  Plus,
  FileText,
  Briefcase,
  CreditCard,
  Bot,
  MessageSquare,
  CheckCircle,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { StatCard } from "@/components/layout/stat-card";
import { PageHeader } from "@/components/layout/page-header";
import Link from "next/link";

const stats = [
  {
    title: "Expected Revenue",
    value: "$12,450",
    icon: DollarSign,
    change: "+12%",
    trend: "up" as const,
  },
  {
    title: "Active Leads",
    value: "8",
    icon: UserPlus,
    change: "+3",
    trend: "up" as const,
  },
  {
    title: "Active Clients",
    value: "5",
    icon: Users,
    change: "+1",
    trend: "up" as const,
  },
  {
    title: "Active Projects",
    value: "3",
    icon: FolderKanban,
    change: "0%",
    trend: "neutral" as const,
  },
  {
    title: "Outstanding Invoices",
    value: "$4,200",
    icon: Receipt,
    change: "-$800",
    trend: "down" as const,
  },
  {
    title: "Follow-ups Due",
    value: "3",
    icon: Clock,
    change: "2 urgent",
    trend: "neutral" as const,
  },
];

const quickActions = [
  { label: "Add Lead", icon: UserPlus, href: "/leads", color: "bg-blue-500" },
  { label: "Add Client", icon: Users, href: "/clients", color: "bg-emerald-500" },
  { label: "Create Proposal", icon: FileText, href: "/proposals", color: "bg-violet-500" },
  { label: "Create Project", icon: FolderKanban, href: "/projects", color: "bg-amber-500" },
  { label: "Create Invoice", icon: CreditCard, href: "/invoices", color: "bg-rose-500" },
  { label: "Ask AI", icon: Bot, href: "/ai", color: "bg-indigo-500" },
];

const recentActivity = [
  {
    id: 1,
    icon: CheckCircle,
    iconColor: "text-emerald-500",
    title: "Invoice #1042 marked as paid",
    description: "Acme Corp - $2,400",
    time: "2 hours ago",
  },
  {
    id: 2,
    icon: MessageSquare,
    iconColor: "text-blue-500",
    title: "New message from Sarah Johnson",
    description: "Re: Website redesign proposal",
    time: "4 hours ago",
  },
  {
    id: 3,
    icon: ArrowUpRight,
    iconColor: "text-violet-500",
    title: "Lead 'TechStart Inc' moved to Proposal Sent",
    description: "Estimated value: $3,800",
    time: "Yesterday",
  },
  {
    id: 4,
    icon: TrendingUp,
    iconColor: "text-amber-500",
    title: "Project 'Brand Identity' milestone completed",
    description: "75% progress - Logo & guidelines delivered",
    time: "Yesterday",
  },
  {
    id: 5,
    icon: UserPlus,
    iconColor: "text-rose-500",
    title: "New lead added: GreenLeaf Solutions",
    description: "Referred by Acme Corp",
    time: "2 days ago",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back. Here's your business overview."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            change={stat.change}
            trend={stat.trend}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-indigo-100 bg-gradient-to-br from-indigo-50/80 to-violet-50/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100">
                <Sparkles className="h-4 w-4 text-indigo-600" />
              </div>
              AI Business Insight
            </CardTitle>
            <Badge
              variant="secondary"
              className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
            >
              <Sparkles className="mr-1 h-3 w-3" />
              Powered by AI
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-slate-700">
              You have 3 leads that haven't received a follow-up in the last 5 days.
              Consider reaching out to maintain engagement. Consistent follow-ups
              increase conversion rates by up to 30%.
            </p>
            <div className="mt-4 flex gap-2">
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                View Leads
              </Button>
              <Button size="sm" variant="outline">
                Dismiss
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => (
              <Link key={action.label} href={action.href}>
                <Button
                  variant="outline"
                  className="flex w-full items-center justify-start gap-2 border-slate-200 bg-white hover:bg-slate-50"
                >
                  <div className={`flex h-7 w-7 items-center justify-center rounded-md ${action.color}`}>
                    <action.icon className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-sm">{action.label}</span>
                </Button>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
          <Button variant="ghost" size="sm" className="text-slate-500">
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 rounded-lg border border-slate-100 p-3 transition-colors hover:bg-slate-50"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-50">
                  <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-900">{activity.title}</p>
                  <p className="text-xs text-slate-500">{activity.description}</p>
                </div>
                <span className="shrink-0 text-xs text-slate-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
