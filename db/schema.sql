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
  -- only guard real logged-in non-admin clients; allow server-side / SQL editor
  -- operations (auth.uid() is null there) so admins can be promoted via SQL
  if auth.uid() is not null and not public.is_admin() then
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
-- public (logged-out) visitors can read PUBLISHED posts on the blog pages
drop policy if exists blog_select_public on public.blog_posts;
create policy blog_select_public on public.blog_posts for select to anon
  using (status = 'published');
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


-- ============================================================
-- 7) CHAT UPGRADE (avatars, attachments, reactions, mute/delete,
--    reports). Re-runnable. Run this block once in the SQL Editor.
-- ============================================================

-- 7a) Avatar photo URL on profiles
alter table public.profiles add column if not exists avatar_url text;

-- 7b) Messages: attachments, listing context, reactions
alter table public.messages add column if not exists attachment_url  text;
alter table public.messages add column if not exists attachment_type text;   -- 'document' | 'photo'
alter table public.messages add column if not exists attachment_name text;
alter table public.messages add column if not exists listing_code    text;   -- e.g. HP-03-027-114
alter table public.messages add column if not exists listing_label   text;   -- human-readable listing title
alter table public.messages add column if not exists reactions       jsonb not null default '{}'::jsonb; -- { "<userId>": "❤️" }
-- attachment-only messages may have an empty body
alter table public.messages alter column body drop not null;
-- realtime UPDATE (reactions / read flips) needs the full row in the payload
alter table public.messages replica identity full;

-- 7c) React to a message (sender OR receiver; one emoji per user; '' clears it).
--     SECURITY DEFINER so it can update without widening the RLS update policy
--     (which only lets the receiver flip `read`).
create or replace function public.react_to_message(p_message_id uuid, p_emoji text)
returns void language plpgsql security definer
set search_path = public as $$
declare uid uuid := auth.uid();
begin
  if uid is null then return; end if;
  if not exists (
    select 1 from public.messages m
    where m.id = p_message_id and (m.sender_id = uid or m.receiver_id = uid)
  ) then
    return;  -- only a participant may react
  end if;
  if p_emoji is null or p_emoji = '' then
    update public.messages set reactions = reactions - uid::text where id = p_message_id;
  else
    update public.messages
      set reactions = jsonb_set(coalesce(reactions, '{}'::jsonb), array[uid::text], to_jsonb(p_emoji), true)
      where id = p_message_id;
  end if;
end; $$;
grant execute on function public.react_to_message(uuid, text) to authenticated;

-- 7d) Per-user conversation state: mute + "delete chat" (soft, per user).
--     cleared_at hides messages created on/before it FOR THIS USER ONLY; a new
--     message makes the thread reappear (WhatsApp-style). No per-message delete.
create table if not exists public.conversation_state (
  user_id    uuid not null references public.profiles(id) on delete cascade,
  peer_id    uuid not null references public.profiles(id) on delete cascade,
  muted      boolean not null default false,
  cleared_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, peer_id)
);
alter table public.conversation_state enable row level security;
drop policy if exists convstate_all on public.conversation_state;
create policy convstate_all on public.conversation_state
  for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- 7e) Reports (a user — typically a patient — reports another, e.g. a doctor)
create table if not exists public.reports (
  id          uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  reported_id uuid not null references public.profiles(id) on delete cascade,
  reason      text,
  detail      text,
  status      text not null default 'open' check (status in ('open','reviewed','dismissed')),
  created_at  timestamptz not null default now()
);
alter table public.reports enable row level security;
drop policy if exists reports_insert       on public.reports;
drop policy if exists reports_select        on public.reports;
drop policy if exists reports_update_admin  on public.reports;
create policy reports_insert on public.reports for insert to authenticated
  with check (reporter_id = auth.uid());
create policy reports_select on public.reports for select to authenticated
  using (reporter_id = auth.uid() or public.is_admin());
create policy reports_update_admin on public.reports for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- 7f) Storage buckets for avatars + chat uploads (public read; write to own folder)
insert into storage.buckets (id, name, public) values ('avatars','avatars', true)
  on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('chat-uploads','chat-uploads', true)
  on conflict (id) do nothing;

drop policy if exists avatars_read   on storage.objects;
drop policy if exists avatars_write  on storage.objects;
drop policy if exists avatars_update on storage.objects;
drop policy if exists avatars_delete on storage.objects;
create policy avatars_read on storage.objects for select to public
  using (bucket_id = 'avatars');
create policy avatars_write on storage.objects for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
create policy avatars_update on storage.objects for update to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);
create policy avatars_delete on storage.objects for delete to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists chat_read  on storage.objects;
drop policy if exists chat_write on storage.objects;
create policy chat_read on storage.objects for select to public
  using (bucket_id = 'chat-uploads');
create policy chat_write on storage.objects for insert to authenticated
  with check (bucket_id = 'chat-uploads' and (storage.foldername(name))[1] = auth.uid()::text);


-- ============================================================
-- 8) BLOG IMAGES + ADMIN ANNOUNCEMENTS. Re-runnable. Run once.
-- ============================================================

-- 8a) Blog post cover image
alter table public.blog_posts add column if not exists image_url text;

-- 8b) Announcements: admin broadcasts (read-only for recipients; no replies)
create table if not exists public.announcements (
  id         uuid primary key default gen_random_uuid(),
  author_id  uuid references public.profiles(id) on delete set null,
  title      text,
  body       text not null,
  audience   text not null default 'all' check (audience in ('all','doctors','patients')),
  created_at timestamptz not null default now()
);
alter table public.announcements enable row level security;
drop policy if exists ann_select    on public.announcements;
drop policy if exists ann_admin_all on public.announcements;
-- recipients can READ announcements aimed at them; only admins can write/delete
create policy ann_select on public.announcements for select to authenticated using (
  public.is_admin()
  or audience = 'all'
  or (audience = 'doctors'  and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'doctor'))
  or (audience = 'patients' and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'patient'))
);
create policy ann_admin_all on public.announcements for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- 8c) Blog images storage bucket (public read; doctor/admin write to own folder)
insert into storage.buckets (id, name, public) values ('blog-images','blog-images', true)
  on conflict (id) do nothing;
drop policy if exists blog_img_read  on storage.objects;
drop policy if exists blog_img_write on storage.objects;
create policy blog_img_read on storage.objects for select to public
  using (bucket_id = 'blog-images');
create policy blog_img_write on storage.objects for insert to authenticated
  with check (bucket_id = 'blog-images' and (storage.foldername(name))[1] = auth.uid()::text);
