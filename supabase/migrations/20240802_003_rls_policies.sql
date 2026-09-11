alter table public.users enable row level security;
alter table public.workflows enable row level security;

-- Users can read/update only their own row
create policy "users can read own profile"
  on public.users for select using (auth.uid() = id::text);
create policy "users can update own profile"
  on public.users for update using (auth.uid() = id::text);

-- Workflows policies (owner‑only)
create policy "owner can read workflow"
  on public.workflows for select using (auth.uid() = user_id::text);
create policy "owner can insert workflow"
  on public.workflows for insert with check (auth.uid() = user_id::text);
create policy "owner can update workflow"
  on public.workflows for update using (auth.uid() = user_id::text);
