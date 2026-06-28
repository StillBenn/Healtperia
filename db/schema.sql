-- ============================================================
-- Healthperia — Supabase schema + security (Row Level Security)
-- Run this ONCE in: Supabase Dashboard → SQL Editor → New query → Run.
-- Safe to re-run (uses IF NOT EXISTS / OR REPLACE / drop-recreate).
-- ============================================================

-- ---------- 1) PROFILES (one row per auth user) ----------
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  role       text not null default 'patient' check (role in ('patient','doctor','admin')),
  status     text not null default 'active'  check (status in ('active','pending','suspended','deleted')),
  name       text,
  email      text,
  phone      text,
  country    text,
  city       text,
  specialty  text,
  license    text,
  bio        text,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

-- helper: is the current user an admin? (security definer → bypasses RLS, no recursion)
create or replace function public.is_admin()
returns boolean language sql security definer stable
set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

drop policy if exists profiles_select_auth on public.profiles;
drop policy if exists profiles_insert_self on public.profiles;
drop policy if exists profiles_update_self on public.profiles;
drop policy if exists profiles_admin_all   on public.profiles;

create policy profiles_select_auth on public.profiles
  for select to authenticated using (true);
create policy profiles_insert_self on public.profiles
  for insert to authenticated with check (id = auth.uid());
create policy profiles_update_self on public.profiles
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy profiles_admin_all on public.profiles
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- non-admins can NOT change their own role/status (anti privilege-escalation)
create or replace function public.guard_profile_update()
returns trigger language plpgsql security definer
set search_path = public as $$
begin
  if not public.is_admin() then
    new.role   := old.role;
    new.status := old.status;
  end if;
  return new;
end; $$;
drop trigger if exists trg_guard_profile_update on public.profiles;
create trigger trg_guard_profile_update
  before update on public.profiles
  for each row execute function public.guard_profile_update();

-- auto-create a profile when a user signs up (reads name/role/etc from metadata)
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer
set search_path = public as $$
declare r text := coalesce(new.raw_user_meta_data->>'role','patient');
begin
  if r not in ('patient','doctor') then r := 'patient'; end if;   -- never self-assign admin
  insert into public.profiles (id, role, status, name, email, phone, country, specialty, license)
  values (
    new.id, r,
    case when r = 'doctor' then 'pending' else 'active' end,
    new.raw_user_meta_data->>'name',
    new.email,
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'country',
    new.raw_user_meta_data->>'specialty',
    new.raw_user_meta_data->>'license'
  );
  return new;
end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- 2) APPOINTMENTS ----------
create table if not exists public.appointments (
  id           uuid primary key default gen_random_uuid(),
  patient_id   uuid not null references public.profiles(id) on delete cascade,
  doctor_id    uuid not null references public.profiles(id) on delete cascade,
  treatment    text,
  note         text,
  scheduled_at timestamptz,
  status       text not null default 'pending' check (status in ('pending','accepted','rejected','completed','cancelled')),
  created_at   timestamptz not null default now()
);
alter table public.appointments enable row level security;

drop policy if exists appt_select        on public.appointments;
drop policy if exists appt_insert_patient on public.appointments;
drop policy if exists appt_update_party   on public.appointments;

create policy appt_select on public.appointments for select to authenticated
  using (patient_id = auth.uid() or doctor_id = auth.uid() or public.is_admin());
create policy appt_insert_patient on public.appointments for insert to authenticated
  with check (patient_id = auth.uid());
create policy appt_update_party on public.appointments for update to authenticated
  using  (doctor_id = auth.uid() or patient_id = auth.uid() or public.is_admin())
  with check (doctor_id = auth.uid() or patient_id = auth.uid() or public.is_admin());

-- ---------- 3) MESSAGES (patient ↔ doctor chat) ----------
create table if not exists public.messages (
  id          uuid primary key default gen_random_uuid(),
  sender_id   uuid not null references public.profiles(id) on delete cascade,
  receiver_id uuid not null references public.profiles(id) on delete cascade,
  body        text not null,
  read        boolean not null default false,
  created_at  timestamptz not null default now()
);
alter table public.messages enable row level security;

drop policy if exists msg_select         on public.messages;
drop policy if exists msg_insert         on public.messages;
drop policy if exists msg_update_receiver on public.messages;

create policy msg_select on public.messages for select to authenticated
  using (sender_id = auth.uid() or receiver_id = auth.uid() or public.is_admin());
create policy msg_insert on public.messages for insert to authenticated
  with check (sender_id = auth.uid());
create policy msg_update_receiver on public.messages for update to authenticated
  using (receiver_id = auth.uid()) with check (receiver_id = auth.uid());

-- ---------- 4) BLOG POSTS ----------
create table if not exists public.blog_posts (
  id         uuid primary key default gen_random_uuid(),
  author_id  uuid references public.profiles(id) on delete set null,
  title      text not null,
  body       text,
  section    text default 'Blog',
  status     text not null default 'draft' check (status in ('draft','published')),
  created_at timestamptz not null default now()
);
alter table public.blog_posts enable row level security;

drop policy if exists blog_select on public.blog_posts;
drop policy if exists blog_insert on public.blog_posts;
drop policy if exists blog_update on public.blog_posts;
drop policy if exists blog_delete on public.blog_posts;

create policy blog_select on public.blog_posts for select to authenticated
  using (status = 'published' or author_id = auth.uid() or public.is_admin());
create policy blog_insert on public.blog_posts for insert to authenticated
  with check (author_id = auth.uid()
              and exists (select 1 from public.profiles where id = auth.uid() and role in ('doctor','admin')));
create policy blog_update on public.blog_posts for update to authenticated
  using (author_id = auth.uid() or public.is_admin())
  with check (author_id = auth.uid() or public.is_admin());
create policy blog_delete on public.blog_posts for delete to authenticated
  using (author_id = auth.uid() or public.is_admin());

-- ---------- 5) REALTIME (live messages + appointment updates) ----------
do $$ begin
  begin alter publication supabase_realtime add table public.messages;     exception when others then null; end;
  begin alter publication supabase_realtime add table public.appointments; exception when others then null; end;
end $$;

-- ---------- 6) PROMOTE YOUR ADMIN ----------
-- After you register your admin account in the app, run this once with YOUR email:
-- update public.profiles set role='admin', status='active' where email = 'admin@healthperia.com';
