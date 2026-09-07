"use client";

import { use } from "react";
import Link from "next/link";

const invoiceData = {
  id: "INV-002",
  status: "Sent",
  issueDate: "2026-09-01",
  dueDate: "2026-09-15",
  from: {
    name: "FlowPilot Agency",
    address: "742 Innovation Drive, Suite 200",
    city: "Austin, TX 78701",
    email: "billing@flowpilot.io",
    phone: "+1 (512) 555-0199",
  },
  to: {
    name: "TechStart Inc",
    address: "1200 Market Street, Floor 8",
    city: "San Francisco, CA 94102",
    email: "accounts@techstart.io",
    contact: "Jordan Kim",
  },
  items: [
    {
      description: "Mobile App UI/UX Design",
      quantity: 1,
      unitPrice: 9500.0,
    },
    {
      description: "iOS Development (Sprint 1-3)",
      quantity: 1,
      unitPrice: 12000.0,
    },
    {
      description: "Backend API Integration",
      quantity: 40,
      unitPrice: 50.0,
    },
    {
      description: "QA Testing & Bug Fixes",
      quantity: 20,
      unitPrice: 37.5,
    },
  ],
  subtotal: 23500.0,
  tax: 1880.0,
  discount: 630.0,
  total: 24750.0,
  notes:
    "Payment is due within 14 days. Late payments may incur a 2% monthly fee. Please reference the invoice number in your payment.",
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const statusStyles: Record<string, string> = {
  Draft: "bg-gray-100 text-gray-700",
  Sent: "bg-blue-100 text-blue-700",
  Paid: "bg-green-100 text-green-700",
  Overdue: "bg-red-100 text-red-700",
  Cancelled: "bg-yellow-100 text-yellow-700",
};

export default function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const inv = { ...invoiceData, id };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/invoices"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Invoices
        </Link>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Edit
          </button>
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Send
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
            Mark as Paid
          </button>
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Download PDF
          </button>
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Print
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="flex items-start justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{inv.id}</h1>
            <p className="text-sm text-gray-500 mt-1">
              Issued {formatDate(inv.issueDate)}
            </p>
          </div>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusStyles[inv.status]}`}
          >
            {inv.status}
          </span>
        </div>

        <div className="flex items-center gap-10 text-xs text-gray-400 mb-8">
          <div>
            <p className="font-medium text-gray-500 mb-0.5">Issue Date</p>
            <p className="text-sm text-gray-900">{formatDate(inv.issueDate)}</p>
          </div>
          <div>
            <p className="font-medium text-gray-500 mb-0.5">Due Date</p>
            <p className="text-sm text-gray-900">{formatDate(inv.dueDate)}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12 mb-10">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              From
            </p>
            <p className="text-sm font-semibold text-gray-900">{inv.from.name}</p>
            <p className="text-sm text-gray-600">{inv.from.address}</p>
            <p className="text-sm text-gray-600">{inv.from.city}</p>
            <p className="text-sm text-gray-600 mt-1">{inv.from.email}</p>
            <p className="text-sm text-gray-600">{inv.from.phone}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Bill To
            </p>
            <p className="text-sm font-semibold text-gray-900">{inv.to.name}</p>
            <p className="text-sm text-gray-600">{inv.to.address}</p>
            <p className="text-sm text-gray-600">{inv.to.city}</p>
            <p className="text-sm text-gray-600 mt-1">{inv.to.email}</p>
            <p className="text-sm text-gray-600">Attn: {inv.to.contact}</p>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">
                  Description
                </th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3 w-20">
                  Qty
                </th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3 w-32">
                  Unit Price
                </th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3 w-32">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {inv.items.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-50 last:border-0"
                >
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {item.description}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-right">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-right">
                    {formatCurrency(item.unitPrice)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 text-right">
                    {formatCurrency(item.quantity * item.unitPrice)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <div className="w-72 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium text-gray-900">
                {formatCurrency(inv.subtotal)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Tax (8%)</span>
              <span className="font-medium text-gray-900">
                {formatCurrency(inv.tax)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Discount</span>
              <span className="font-medium text-red-600">
                -{formatCurrency(inv.discount)}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between">
                <span className="text-base font-semibold text-gray-900">
                  Total Due
                </span>
                <span className="text-xl font-bold text-gray-900">
                  {formatCurrency(inv.total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {inv.notes && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Notes
            </p>
            <p className="text-sm text-gray-600">{inv.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
