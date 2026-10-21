-- BuilderiY STAGING only.
-- Project: oefoqcwkbzocbkwsynrt
-- Apply manually in the Staging SQL editor. Do not run against production.
-- Additive only: creates a private bucket and metadata table.
-- Does not update, move, or delete existing Guide rows or guide-images objects.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'guide-step-videos',
  'guide-step-videos',
  false,
  104857600,
  array['video/mp4', 'video/quicktime']
)
on conflict (id) do nothing;

create table if not exists public.guide_step_videos (
  guide_id uuid not null references public.guides (id) on delete cascade,
  step_id uuid not null,
  storage_path text not null,
  file_name text not null,
  content_type text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (guide_id, step_id)
);

alter table public.guide_step_videos enable row level security;

revoke all on table public.guide_step_videos from public, anon;
grant select, insert, update, delete on table public.guide_step_videos to authenticated;

drop policy if exists guide_step_videos_admin_all on public.guide_step_videos;
create policy guide_step_videos_admin_all
on public.guide_step_videos
for all
to authenticated
using (
  exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.is_guide_admin is true
  )
)
with check (
  exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.is_guide_admin is true
  )
);

-- Private bucket. Guide admins can upload, replace, and remove.
-- No anon or public read policy. No playback policy in this phase.

drop policy if exists guide_step_videos_admin_insert on storage.objects;
create policy guide_step_videos_admin_insert
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'guide-step-videos'
  and exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.is_guide_admin is true
  )
);

drop policy if exists guide_step_videos_admin_select on storage.objects;
create policy guide_step_videos_admin_select
on storage.objects
for select
to authenticated
using (
  bucket_id = 'guide-step-videos'
  and exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.is_guide_admin is true
  )
);

drop policy if exists guide_step_videos_admin_update on storage.objects;
create policy guide_step_videos_admin_update
on storage.objects
for update
to authenticated
using (
  bucket_id = 'guide-step-videos'
  and exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.is_guide_admin is true
  )
)
with check (
  bucket_id = 'guide-step-videos'
  and exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.is_guide_admin is true
  )
);

drop policy if exists guide_step_videos_admin_delete on storage.objects;
create policy guide_step_videos_admin_delete
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'guide-step-videos'
  and exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.is_guide_admin is true
  )
);
