import "server-only";
import { createAdminClient } from "@/lib/supabase/server";
import type {
  AboutPage,
  HeroSection,
  InstagramGalleryItem,
  ScheduleEvent,
  SiteSettings,
  Story,
  Workshop,
} from "@/lib/types";

// Server-side reads for the admin panel. Runs only behind the auth-gated
// /admin routes, so it's safe to use the service-role client here and get
// every row (including inactive workshops etc.) rather than the public view.

export async function adminGetHero(): Promise<HeroSection> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("hero_section")
    .select("*")
    .eq("id", 1)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function adminGetAbout(): Promise<AboutPage> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("about_page")
    .select("*")
    .eq("id", 1)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function adminGetSettings(): Promise<SiteSettings> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function adminGetWorkshops(): Promise<Workshop[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("workshops")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return data;
}

export async function adminGetSchedule(): Promise<ScheduleEvent[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("schedule_events")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return data;
}

export async function adminGetStories(): Promise<Story[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return data;
}

export async function adminGetInstagramGallery(): Promise<
  InstagramGalleryItem[]
> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("instagram_gallery")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return data;
}
