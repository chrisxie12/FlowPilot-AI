"use client";

import { useState } from "react";

const tabs = ["Profile", "Billing", "Notifications"];

const billingHistory = [
  { date: "Sep 1, 2026", description: "Pro Plan — Monthly", amount: "$29.00", status: "Paid" },
  { date: "Aug 1, 2026", description: "Pro Plan — Monthly", amount: "$29.00", status: "Paid" },
  { date: "Jul 1, 2026", description: "Pro Plan — Monthly", amount: "$29.00", status: "Paid" },
  { date: "Jun 1, 2026", description: "Free Plan Upgrade", amount: "$0.00", status: "—" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile");

  const [profile, setProfile] = useState({
    fullName: "Alex Morgan",
    email: "alex@flowpilot.io",
    company: "FlowPilot Agency",
    phone: "+1 (512) 555-0199",
  });

  const [notifications, setNotifications] = useState({
    invoiceCreated: true,
    invoicePaid: true,
    invoiceOverdue: true,
    leadAssigned: true,
    projectUpdate: true,
    weeklyDigest: false,
    marketingEmails: false,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your account and preferences
        </p>
      </div>

      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 text-sm font-medium transition-colors relative ${
              activeTab === tab
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t" />
            )}
          </button>
        ))}
      </div>

      {activeTab === "Profile" && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-2xl">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Profile Information
          </h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, fullName: e.target.value }))
                }
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={profile.email}
                readOnly
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-400 mt-1">
                Email cannot be changed
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Company
              </label>
              <input
                type="text"
                value={profile.company}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, company: e.target.value }))
                }
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Phone
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, phone: e.target.value }))
                }
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="mt-6">
            <button className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      )}

      {activeTab === "Billing" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-2xl">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Current Plan
            </h2>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-semibold text-gray-900">Free Plan</p>
                <p className="text-sm text-gray-500 mt-0.5">
                  3 clients, 5 projects, basic invoicing
                </p>
              </div>
              <button className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                Upgrade to Pro — $29/mo
              </button>
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm text-blue-800 font-medium">Pro includes:</p>
              <ul className="mt-2 space-y-1 text-sm text-blue-700">
                <li>Unlimited clients and projects</li>
                <li>Advanced invoicing with recurring billing</li>
                <li>AI assistant with full capabilities</li>
                <li>Priority support</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-2xl">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Billing History
            </h2>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">
                    Date
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">
                    Description
                  </th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">
                    Amount
                  </th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {billingHistory.map((entry, idx) => (
                  <tr key={idx} className="border-b border-gray-50 last:border-0">
                    <td className="py-3 text-sm text-gray-600">{entry.date}</td>
                    <td className="py-3 text-sm text-gray-900">
                      {entry.description}
                    </td>
                    <td className="py-3 text-sm font-medium text-gray-900 text-right">
                      {entry.amount}
                    </td>
                    <td className="py-3 text-right">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          entry.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {entry.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "Notifications" && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-2xl">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Notification Preferences
          </h2>
          <div className="space-y-1">
            {(
              [
                ["invoiceCreated", "Invoice created", "When a new invoice is generated"],
                ["invoicePaid", "Invoice paid", "When a client pays an invoice"],
                ["invoiceOverdue", "Invoice overdue", "When an invoice passes its due date"],
                ["leadAssigned", "Lead assigned", "When a new lead is assigned to you"],
                ["projectUpdate", "Project update", "When a project status changes"],
                ["weeklyDigest", "Weekly digest", "Summary of your week's activity"],
                ["marketingEmails", "Marketing emails", "Product updates and tips"],
              ] as const
            ).map(([key, label, desc]) => (
              <div
                key={key}
                className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                </div>
                <button
                  onClick={() => toggleNotification(key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications[key] ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications[key] ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
