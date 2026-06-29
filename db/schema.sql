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


-- ============================================================
-- 9) TREATMENT LISTINGS (doctor-created) + favorites + catalogs.
--    Re-runnable. Run once in the Supabase SQL Editor.
-- ============================================================

-- 9a) Hospitals & hotels (a small catalog doctors pick from / add to)
create table if not exists public.hospitals (
  id uuid primary key default gen_random_uuid(),
  name text not null, city text, country text,
  maps_url text, description text, image_url text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);
create table if not exists public.hotels (
  id uuid primary key default gen_random_uuid(),
  name text not null, city text, country text,
  maps_url text, description text, image_url text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);
alter table public.hospitals enable row level security;
alter table public.hotels    enable row level security;
-- public read (detail page is public); doctors/admins write
drop policy if exists hosp_read on public.hospitals;
drop policy if exists hosp_write on public.hospitals;
drop policy if exists hosp_update on public.hospitals;
create policy hosp_read on public.hospitals for select to anon, authenticated using (true);
create policy hosp_write on public.hospitals for insert to authenticated
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('doctor','admin')));
create policy hosp_update on public.hospitals for update to authenticated
  using (created_by = auth.uid() or public.is_admin()) with check (created_by = auth.uid() or public.is_admin());
drop policy if exists hotel_read on public.hotels;
drop policy if exists hotel_write on public.hotels;
drop policy if exists hotel_update on public.hotels;
create policy hotel_read on public.hotels for select to anon, authenticated using (true);
create policy hotel_write on public.hotels for insert to authenticated
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('doctor','admin')));
create policy hotel_update on public.hotels for update to authenticated
  using (created_by = auth.uid() or public.is_admin()) with check (created_by = auth.uid() or public.is_admin());

-- 9b) Listings (a doctor's treatment offer; references the TR taxonomy by id)
create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  doctor_id uuid not null references public.profiles(id) on delete cascade,
  code text not null,
  status text not null default 'draft' check (status in ('draft','published')),
  country_id int, city_id int, unit_id int, treatment_id int, method_id int,
  headline text,
  process text,
  hospital_id uuid references public.hospitals(id) on delete set null,
  hotel_id    uuid references public.hotels(id)    on delete set null,
  location_name text, location_maps_url text,
  transport_title text, transport_desc text, transport_image text,
  advantages text,
  price_amount numeric, price_currency text default 'EUR', price_installments int, price_monthly numeric,
  photos jsonb not null default '[]'::jsonb,   -- up to 8 image URLs (app-enforced)
  created_at timestamptz not null default now()
);
create index if not exists listings_taxo_idx on public.listings (status, unit_id, treatment_id, method_id, country_id, city_id);
alter table public.listings enable row level security;
drop policy if exists listings_select_public on public.listings;
drop policy if exists listings_select_auth   on public.listings;
drop policy if exists listings_insert         on public.listings;
drop policy if exists listings_update         on public.listings;
drop policy if exists listings_delete         on public.listings;
-- anon + logged-out visitors read PUBLISHED listings (finder + detail page)
create policy listings_select_public on public.listings for select to anon using (status = 'published');
create policy listings_select_auth on public.listings for select to authenticated
  using (status = 'published' or doctor_id = auth.uid() or public.is_admin());
create policy listings_insert on public.listings for insert to authenticated
  with check (doctor_id = auth.uid()
              and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('doctor','admin')));
create policy listings_update on public.listings for update to authenticated
  using (doctor_id = auth.uid() or public.is_admin()) with check (doctor_id = auth.uid() or public.is_admin());
create policy listings_delete on public.listings for delete to authenticated
  using (doctor_id = auth.uid() or public.is_admin());

-- 9c) Favorites (per user; doctor / treatment / hospital / clinic / listing)
create table if not exists public.favorites (
  user_id uuid not null references public.profiles(id) on delete cascade,
  kind    text not null check (kind in ('doctor','treatment','hospital','clinic','listing')),
  ref_id  text not null,
  label   text,
  meta    jsonb,
  created_at timestamptz not null default now(),
  primary key (user_id, kind, ref_id)
);
alter table public.favorites enable row level security;
drop policy if exists fav_all on public.favorites;
create policy fav_all on public.favorites for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- 9d) Listing photos storage bucket (public read; doctor writes own folder)
insert into storage.buckets (id, name, public) values ('listing-photos','listing-photos', true)
  on conflict (id) do nothing;
drop policy if exists listing_img_read  on storage.objects;
drop policy if exists listing_img_write on storage.objects;
create policy listing_img_read on storage.objects for select to public
  using (bucket_id = 'listing-photos');
create policy listing_img_write on storage.objects for insert to authenticated
  with check (bucket_id = 'listing-photos' and (storage.foldername(name))[1] = auth.uid()::text);

-- 9e) SEED — one example published listing using the screenshot texts.
--     Doctor info comes from the demo doctor's PROFILE (enriched below).
do $$
declare v_doc uuid; v_hosp uuid; v_hotel uuid;
begin
  select id into v_doc from public.profiles where email = 'doktor@healthperia.com' limit 1;
  if v_doc is null then raise notice 'demo doctor not found; skipping listing seed'; return; end if;

  update public.profiles set
    specialty = coalesce(nullif(specialty,''), 'Obezite ve Metabolik Cerrahi Uzmanı'),
    bio = coalesce(nullif(bio,''), $md$1987 tarihinde Ege Üniversitesi Tıp Fakültesinde tıp eğitimine başladı. 1994 yılında tıp doktoru olarak mezun oldu. 1994–97 yılları arasında Ege Üniversitesi Tıp Fakültesi İç Hastalıkları Anabilim Dalında ihtisas yaptı. 1997–2001 tarihleri arasında Genel Cerrahi ihtisasını tamamladı. 2005 yılında Doçent, 2010 yılında Profesör oldu. Halen aynı üniversitede öğretim üyesi olarak görevini sürdürmekte olup, mesai sonrası özel muayenehanesinde hizmet vermektedir.$md$)
  where id = v_doc;

  insert into public.hospitals (name, city, country, maps_url, description, created_by)
  select 'Acıbadem Taksim Hastanesi','İstanbul','Türkiye','https://maps.app.goo.gl/svtiWqsEeBV9Vc5D8',
    $md$Acıbadem Sağlık Grubu'nun 18. hastanesi olan Acıbadem Taksim Hastanesi, Ekim 2018'te hizmete açıldı. Genel amaçlı bir hastane olarak konumlanan Acıbadem Taksim, yaklaşık 24 bin metrekarelik kapalı alana sahip 93 yatak kapasiteli hastanede 7 ameliyathane bulunuyor. Genel Cerrahi, Estetik & Plastik Rekonstrüktif Cerrahi, Kadın Doğum, Beyin ve Sinir Cerrahisi, Ortopedi ve Travmatoloji, Göz, KBB ve Üroloji başta olmak üzere geniş bir branş yelpazesinde hizmet vermektedir.$md$, v_doc
  where not exists (select 1 from public.hospitals where name = 'Acıbadem Taksim Hastanesi');
  select id into v_hosp from public.hospitals where name = 'Acıbadem Taksim Hastanesi' limit 1;

  insert into public.hotels (name, city, country, maps_url, description, created_by)
  select 'TZL Suites Nişantaşı İstanbul','İstanbul','Türkiye','https://maps.app.goo.gl/W39o37DuVpbrSdY6',
    $md$Nişantaşı'nın merkezinde, modern ve konforlu suit odalarıyla tedavi sürecinizde size ev konforu sunan bir konaklama seçeneğidir. Hastaneye ve şehir merkezine yakın konumu sayesinde ulaşım kolaylığı sağlar; refakatçiniz için de uygun konaklama imkânı sunar.$md$, v_doc
  where not exists (select 1 from public.hotels where name = 'TZL Suites Nişantaşı İstanbul');
  select id into v_hotel from public.hotels where name = 'TZL Suites Nişantaşı İstanbul' limit 1;

  if not exists (select 1 from public.listings where code = 'HP-MIDE01') then
    insert into public.listings (doctor_id, code, status, country_id, city_id, unit_id, treatment_id, method_id,
      headline, process, hospital_id, hotel_id, location_name, location_maps_url,
      transport_title, transport_desc, advantages,
      price_amount, price_currency, price_installments, price_monthly, photos)
    values (v_doc, 'HP-MIDE01', 'published', 3, 26, 1, 7, 16,
      'Lazer Teknolojisi ile Ağrısız Tedavi',
      $md$Tüp Mide (Sleeve Gastrektomi) Ameliyatı Nedir?
Tüp mide yani Sleeve Gastrektomi ameliyatı midenin cerrahi işlemle bir tüp (boru) haline getirilmesidir. Ameliyatla midenin büyük bir kısmı geri dönüşü olmayacak şekilde çıkarılarak yemek borusunun devamı gibi bir sistem haline getirilir. Midenin şekli tüp şekline benzediği için tüp mide ameliyatı olarak isimlendirilir. Tüp mide ameliyatının tek etkisi midenin hacminin küçültülmesi üzerine değildir; mideden salgılanan açlık hormonu üzerinde de ciddi etkisi bulunmaktadır.

Tüp Mide Ameliyatı Hangi Hastalıklarda Kullanılır?
Tüp mide birincil olarak bir morbid obezite tedavisidir. Morbid obeziteye eşlik eden birçok hastalık, tip 2 diyabet dâhil, bu cerrahi tedaviden yüksek oranda fayda görür. Ayrıca tüp mide ameliyatı ileri derece obez hastalarda bir geçiş ameliyatı olarak da kullanılabilir.

Tüp Mide Ameliyatı Nasıl Yapılır?
Tüp mide ameliyatı genel anestezi altında yapılan bir ameliyattır. Neredeyse her zaman kapalı yani laparoskopik yöntemlerle yapılır. Ameliyat sırasında mideyi çok küçültmemek için yemek borusunun çapı kadar mide girişine bir kalibrasyon tüpü yerleştirilir. Damarlanma ve kanamayla ilgili önlemler alındıktan sonra mide özel kesici ve kapatıcı aletlerle boydan boya kesilir.

Tüp Mide Ameliyatı Hangi Hastalar İçin Uygundur?
Tüp mide ameliyatı günümüzde morbid obez hastalar için uygulanan cerrahi teknikler arasında en sık tercih edilen yöntemdir. Tüp mide ameliyatını ilerleyen dönemde diğer ameliyat tekniklerine dönüştürme şansı bulunmaktadır.

Tüp Mide Ameliyatı Öncesi ve Ameliyat Günü Nelere Dikkat Edilmelidir?
Tüp mide ameliyatı öncesinde hastalar çok geniş tetkiklerden geçmektedir. Diyet uzmanları, psikoloji ve psikiyatri uzmanları da hastayı kontrol eder. Hasta genellikle ameliyat günü hastaneye yatar; ameliyattan sonra hastanede kalma süresi 2–3 gündür.$md$,
      v_hosp, v_hotel, 'Acıbadem Taksim Hastanesi', 'https://maps.app.goo.gl/svtiWqsEeBV9Vc5D8',
      'Full Transfer Hizmeti — Mercedes-Benz Vito VIP (2022)',
      $md$VIP transfer; şehir içi, şehirler arası veya havalimanı transferlerinde kullanılan bir ulaşım yöntemidir. Kullanıcılarına standart bir transfer hizmetine göre çok daha konforlu bir deneyim sunar. Aracınız ihtiyaçlarınız doğrultusunda seçilir; tek başınıza, aileniz ya da arkadaşlarınızla yapacağınız seyahatlerde yolculuğunuz daha konforlu hâle gelir. Transfer hizmeti sunan personeller sizi seçtiğiniz noktada karşılar.$md$,
      $md$Tedavi süreci boyunca refakatçi hizmeti. İsteğiniz doğrultusunda gece sizinle de kalabilir.$md$,
      1300, 'EUR', 2, 650, '[]'::jsonb);
  end if;
end $$;


-- ============================================================
-- 10) PER-SECTION PHOTOS + more example listings. Re-runnable.
-- ============================================================

-- each section (process/doctor/place/transport/hotel) has its own photo set
alter table public.listings add column if not exists section_photos jsonb not null default '{}'::jsonb;

do $$
declare v_doc uuid; v_hosp uuid; v_hotel uuid;
begin
  select id into v_doc from public.profiles where email = 'doktor@healthperia.com' limit 1;
  if v_doc is null then return; end if;
  select id into v_hosp  from public.hospitals where name = 'Acıbadem Taksim Hastanesi' limit 1;
  select id into v_hotel from public.hotels    where name = 'TZL Suites Nişantaşı İstanbul' limit 1;

  -- FUE Saç Ekimi — İstanbul / Plastik ve Estetik Cerrahi / Saç Ekimi / FUE
  if not exists (select 1 from public.listings where code = 'HP-SAC01') then
    insert into public.listings (doctor_id, code, status, country_id, city_id, unit_id, treatment_id, method_id,
      headline, process, hospital_id, hotel_id, location_name, transport_title, transport_desc, advantages,
      price_amount, price_currency, price_installments, price_monthly)
    values (v_doc, 'HP-SAC01', 'published', 3, 27, 9, 70, 292,
      'Mikro FUE ile Doğal Saç Ekimi',
      $md$FUE Saç Ekimi Nedir?
FUE (Follicular Unit Extraction), saç köklerinin tek tek alınıp ekim bölgesine yerleştirildiği, iz bırakmayan modern bir saç ekimi yöntemidir.

İşlem Nasıl Yapılır?
Lokal anestezi altında, donör bölgeden alınan greftler açılan mikro kanallara doğal saç çıkış açısına uygun olarak yerleştirilir. İşlem ortalama 6–8 saat sürer ve aynı gün taburcu olunur.$md$,
      v_hosp, v_hotel, 'Acıbadem Taksim Hastanesi',
      'Full Transfer Hizmeti', 'Havalimanı ve klinik arası özel VIP araç transferi sağlanır.',
      'Operasyon sonrası ilk yıkama ve bakım kliniğimizde ücretsizdir.',
      2200, 'EUR', 3, 733);
  end if;

  -- Diş İmplantı — Antalya / Ağız ve Diş Sağlığı / Diş İmplantları / Tek Diş İmplant
  if not exists (select 1 from public.listings where code = 'HP-DIS01') then
    insert into public.listings (doctor_id, code, status, country_id, city_id, unit_id, treatment_id, method_id,
      headline, process, location_name, advantages, price_amount, price_currency, price_installments, price_monthly)
    values (v_doc, 'HP-DIS01', 'published', 3, 24, 4, 30, 146,
      'Tek Seansta Diş İmplantı',
      $md$İmplant Tedavisi Nedir?
Diş implantı, eksik dişlerin yerine çene kemiğine yerleştirilen titanyum vida ile kalıcı ve doğal görünümlü bir çözüm sunar.

Süreç
Muayene ve tomografi sonrası uygun implant planlanır; iyileşme sonrası üzerine kalıcı kron yerleştirilir.$md$,
      'Antalya Ağız ve Diş Sağlığı Merkezi',
      'Ömür boyu implant garantisi ve ücretsiz kontrol randevuları.',
      900, 'EUR', 2, 450);
  end if;

  -- Burun Estetiği — İzmir / Plastik ve Estetik Cerrahi / Burun Estetiği / Kapalı
  if not exists (select 1 from public.listings where code = 'HP-BUR01') then
    insert into public.listings (doctor_id, code, status, country_id, city_id, unit_id, treatment_id, method_id,
      headline, process, advantages, price_amount, price_currency, price_installments, price_monthly)
    values (v_doc, 'HP-BUR01', 'published', 3, 28, 9, 76, 327,
      'Kapalı Teknik Burun Estetiği',
      $md$Rinoplasti Nedir?
Burun estetiği (rinoplasti), burnun şekil ve fonksiyonunu iyileştirmek için yapılan cerrahi işlemdir.

Kapalı Teknik
Tüm kesiler burun içinden yapılır; dışarıda iz kalmaz, iyileşme süreci daha konforludur.$md$,
      'Süreç boyunca konaklama ve şehir içi ulaşım dahildir.',
      2800, 'EUR', 4, 700);
  end if;
end $$;
