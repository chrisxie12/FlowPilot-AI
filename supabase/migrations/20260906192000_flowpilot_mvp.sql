create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  company text,
  currency text not null default 'USD',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  company text,
  email text,
  phone text,
  website text,
  service text,
  estimated_budget numeric(12,2) default 0,
  lead_source text,
  notes text,
  status text not null default 'New',
  lead_score integer not null default 0 check (lead_score between 0 and 100),
  created_date date default current_date,
  last_contacted_date date,
  next_follow_up_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete set null,
  name text not null,
  company text,
  email text,
  phone text,
  website text,
  notes text,
  status text not null default 'Active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.proposals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete cascade,
  project_title text not null,
  project_description text,
  services text[] not null default '{}',
  price numeric(12,2) not null default 0,
  timeline text,
  additional_requirements text,
  content text,
  status text not null default 'Draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.proposal_items (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid not null references public.proposals(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  amount numeric(12,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete cascade,
  proposal_id uuid references public.proposals(id) on delete set null,
  project_name text not null,
  description text,
  start_date date,
  due_date date,
  budget numeric(12,2) default 0,
  status text not null default 'Planning',
  progress integer not null default 0 check (progress between 0 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  description text,
  due_date date,
  priority text not null default 'Medium',
  status text not null default 'To Do',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  invoice_number text not null,
  issue_date date,
  due_date date,
  tax numeric(6,2) default 0,
  discount numeric(6,2) default 0,
  total numeric(12,2) default 0,
  status text not null default 'Draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, invoice_number)
);

create table if not exists public.invoice_items (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.invoices(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  description text not null,
  quantity numeric(10,2) not null default 1,
  unit_price numeric(12,2) not null default 0,
  line_total numeric(12,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ai_generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  generation_type text not null,
  input jsonb not null default '{}'::jsonb,
  output text not null,
  model text,
  created_at timestamptz not null default now()
);

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace trigger set_profiles_updated_at before update on public.profiles for each row execute function public.handle_updated_at();
create or replace trigger set_leads_updated_at before update on public.leads for each row execute function public.handle_updated_at();
create or replace trigger set_clients_updated_at before update on public.clients for each row execute function public.handle_updated_at();
create or replace trigger set_proposals_updated_at before update on public.proposals for each row execute function public.handle_updated_at();
create or replace trigger set_proposal_items_updated_at before update on public.proposal_items for each row execute function public.handle_updated_at();
create or replace trigger set_projects_updated_at before update on public.projects for each row execute function public.handle_updated_at();
create or replace trigger set_tasks_updated_at before update on public.tasks for each row execute function public.handle_updated_at();
create or replace trigger set_invoices_updated_at before update on public.invoices for each row execute function public.handle_updated_at();
create or replace trigger set_invoice_items_updated_at before update on public.invoice_items for each row execute function public.handle_updated_at();

alter table public.profiles enable row level security;
alter table public.leads enable row level security;
alter table public.clients enable row level security;
alter table public.proposals enable row level security;
alter table public.proposal_items enable row level security;
alter table public.projects enable row level security;
alter table public.tasks enable row level security;
alter table public.invoices enable row level security;
alter table public.invoice_items enable row level security;
alter table public.ai_generations enable row level security;

create policy "Users manage own profile" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "Users manage own leads" on public.leads for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage own clients" on public.clients for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage own proposals" on public.proposals for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage own proposal items" on public.proposal_items for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage own projects" on public.projects for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage own tasks" on public.tasks for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage own invoices" on public.invoices for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage own invoice items" on public.invoice_items for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users manage own ai generations" on public.ai_generations for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
