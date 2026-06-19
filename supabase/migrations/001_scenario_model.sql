-- Task 001: Scenario model + reference countries
-- Run in Supabase SQL editor

create extension if not exists "pgcrypto";

create table if not exists countries (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  currency_code text not null
);

create table if not exists scenarios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  name text not null,
  country_id uuid not null references countries(id),
  salary_mode text not null default 'annual' check (salary_mode in ('annual', 'monthly')),
  annual_salary numeric,
  monthly_salary numeric,
  bonus numeric not null default 0,
  raise_rate numeric not null default 0,
  insurance_rate numeric not null default 0,
  pension_rate numeric not null default 0,
  living_cost numeric not null,
  rent_cost numeric not null,
  created_at timestamptz not null default now()
);

create index if not exists scenarios_user_id_idx on scenarios (user_id);
create index if not exists scenarios_country_id_idx on scenarios (country_id);

-- Seed reference countries for MVP
insert into countries (name, currency_code) values
  ('United Kingdom', 'GBP'),
  ('Hong Kong', 'HKD'),
  ('Singapore', 'SGD'),
  ('Taiwan', 'TWD'),
  ('Japan', 'JPY')
on conflict (name) do nothing;

-- Allow anon access for demo user until Task 008 auth
alter table countries enable row level security;
alter table scenarios enable row level security;

create policy "countries_read_all" on countries for select using (true);

create policy "scenarios_demo_user_select" on scenarios
  for select using (user_id = '00000000-0000-0000-0000-000000000001'::uuid);

create policy "scenarios_demo_user_insert" on scenarios
  for insert with check (user_id = '00000000-0000-0000-0000-000000000001'::uuid);
