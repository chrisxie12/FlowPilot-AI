# FlowPilot AI

FlowPilot AI is an MVP business operating system for freelancers covering:

**Lead → Client → Proposal → Project → Tasks → Invoice → Follow-up**

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + reusable shadcn-style UI primitives
- Supabase Auth + PostgreSQL migration + RLS policies
- React Hook Form + Zod
- Lucide icons

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Without Supabase variables, the app still runs in MVP/demo mode with seeded data and mock AI responses.

## Database

Supabase migration is in:

`/home/runner/work/FlowPilot-AI/FlowPilot-AI/supabase/migrations/20260906192000_flowpilot_mvp.sql`

It creates:

- profiles
- leads
- clients
- proposals
- proposal_items
- projects
- tasks
- invoices
- invoice_items
- ai_generations

with UUID keys, timestamps, and row-level security.
