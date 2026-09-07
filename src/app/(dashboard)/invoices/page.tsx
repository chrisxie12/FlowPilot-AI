"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

const invoices = [
  {
    id: "INV-001",
    client: "Acme Corp",
    project: "Website Redesign",
    amount: 12500.0,
    dueDate: "2026-09-20",
    status: "Paid",
  },
  {
    id: "INV-002",
    client: "TechStart Inc",
    project: "Mobile App Development",
    amount: 24750.0,
    dueDate: "2026-09-15",
    status: "Sent",
  },
  {
    id: "INV-003",
    client: "GreenLeaf Studios",
    project: "Brand Identity Package",
    amount: 8200.0,
    dueDate: "2026-08-30",
    status: "Overdue",
  },
  {
    id: "INV-004",
    client: "Nova Solutions",
    project: "SEO Audit & Strategy",
    amount: 3400.0,
    dueDate: "2026-10-01",
    status: "Draft",
  },
  {
    id: "INV-005",
    client: "UrbanEdge Properties",
    project: "Property Listing Platform",
    amount: 18900.0,
    dueDate: "2026-09-10",
    status: "Cancelled",
  },
];

const statusColors: Record<string, string> = {
  Draft: "bg-gray-100 text-gray-700",
  Sent: "bg-blue-100 text-blue-700",
  Paid: "bg-green-100 text-green-700",
  Overdue: "bg-red-100 text-red-700",
  Cancelled: "bg-yellow-100 text-yellow-700",
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function InvoicesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = useMemo(() => {
    return invoices.filter((inv) => {
      const matchesSearch =
        inv.client.toLowerCase().includes(search.toLowerCase()) ||
        inv.id.toLowerCase().includes(search.toLowerCase()) ||
        inv.project.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || inv.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const totalOutstanding = invoices
    .filter((i) => i.status === "Sent" || i.status === "Overdue")
    .reduce((sum, i) => sum + i.amount, 0);

  const totalPaid = invoices
    .filter((i) => i.status === "Paid")
    .reduce((sum, i) => sum + i.amount, 0);

  const totalOverdue = invoices
    .filter((i) => i.status === "Overdue")
    .reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and track all your invoices
          </p>
        </div>
        <Link
          href="/invoices/new"
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Create Invoice
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm font-medium text-gray-500">Total Outstanding</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {formatCurrency(totalOutstanding)}
          </p>
          <p className="text-xs text-gray-400 mt-1">2 invoices pending</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm font-medium text-gray-500">Total Paid</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {formatCurrency(totalPaid)}
          </p>
          <p className="text-xs text-gray-400 mt-1">1 invoice paid</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm font-medium text-gray-500">Total Overdue</p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {formatCurrency(totalOverdue)}
          </p>
          <p className="text-xs text-gray-400 mt-1">1 invoice overdue</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search invoices..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="All">All Statuses</option>
          <option value="Draft">Draft</option>
          <option value="Sent">Sent</option>
          <option value="Paid">Paid</option>
          <option value="Overdue">Overdue</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                Invoice #
              </th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                Client
              </th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                Project
              </th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                Amount
              </th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                Due Date
              </th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                Status
              </th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((inv) => (
              <tr
                key={inv.id}
                className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <Link
                    href={`/invoices/${inv.id}`}
                    className="text-sm font-semibold text-blue-600 hover:underline"
                  >
                    {inv.id}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{inv.client}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{inv.project}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {formatCurrency(inv.amount)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {formatDate(inv.dueDate)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[inv.status]}`}
                  >
                    {inv.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/invoices/${inv.id}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-sm text-gray-400">
                  No invoices found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
