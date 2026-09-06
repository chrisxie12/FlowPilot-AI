import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlowPilot AI",
  description: "AI-powered business operating system for freelancers.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 antialiased">{children}</body>
    </html>
  );
}
