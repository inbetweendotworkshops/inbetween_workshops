import "server-only";
import { createServerClient } from "@/lib/supabase/server";
import type {
  AboutPage,
  HeroSection,
  InstagramGalleryItem,
  ScheduleEvent,
  SiteSettings,
  Story,
  Workshop,
} from "@/lib/types";

const FALLBACK_SETTINGS: SiteSettings = {
  id: 1,
  logo_text: "Inbetween Workshops",
  footer_tagline:
    "Small-batch craft workshops across Bangalore. Made in the hours inbetween.",
  contact_email: "hello@inbetweenworkshops.in",
  address_line: "Indiranagar, Bangalore",
  whatsapp_number: "",
  instagram_handle: "inbetween_workshops",
  instagram_url: "https://www.instagram.com/inbetween_workshops",
  primary_booking_method: "instagram",
  schedule_enabled: true,
  schedule_empty_message:
    "No events scheduled, we'll be coming back with a banger event.",
};

const FALLBACK_HERO: HeroSection = {
  id: 1,
  heading: "Photo Embroidery",
  subheading:
    "Bring a printed photograph and stitch into it — thread halos, confetti skies, little embroidered notes. No stitching experience needed, we start from the very first knot.",
  featured_title: "Photo Embroidery",
  featured_date: "5 Sep 2026",
  featured_time: "3:30 PM",
  featured_location: "Sable Cafe, Indiranagar",
  image_url: "",
  primary_cta_label: "Book a seat",
  secondary_cta_label: "All workshops",
  secondary_cta_link: "/workshops",
};

const FALLBACK_ABOUT: AboutPage = {
  id: 1,
  heading: "Made in the hours inbetween",
  intro_paragraph:
    "Inbetween Workshops is a Bangalore-based craft studio for accessible, intimate creative evenings.",
  story_paragraph:
    "We started in 2024 with one embroidery evening and eight strangers.",
  image_url: "",
  pillar_1_title: "Small tables",
  pillar_1_desc: "Groups capped at 12 so everyone gets real instruction.",
  pillar_2_title: "Everything included",
  pillar_2_desc:
    "All materials, tools and your finished piece are part of the fee.",
  pillar_3_title: "Absolute beginners",
  pillar_3_desc: "No prior craft experience needed, ever.",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .single();
  return data ?? FALLBACK_SETTINGS;
}

export async function getHero(): Promise<HeroSection> {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("hero_section")
    .select("*")
    .eq("id", 1)
    .single();
  return data ?? FALLBACK_HERO;
}

export async function getAboutPage(): Promise<AboutPage> {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("about_page")
    .select("*")
    .eq("id", 1)
    .single();
  return data ?? FALLBACK_ABOUT;
}

export async function getWorkshops(
  activeOnly = true,
): Promise<Workshop[]> {
  const supabase = createServerClient();
  let query = supabase
    .from("workshops")
    .select("*")
    .order("sort_order", { ascending: true });
  if (activeOnly) query = query.eq("is_active", true);
  const { data } = await query;
  return data ?? [];
}

export async function getScheduleEvents(): Promise<ScheduleEvent[]> {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("schedule_events")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export async function getStories(): Promise<Story[]> {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("stories")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export async function getStoryBySlug(slug: string): Promise<Story | null> {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("stories")
    .select("*")
    .eq("slug", slug)
    .single();
  return data ?? null;
}

export async function getInstagramGallery(): Promise<InstagramGalleryItem[]> {
  const supabase = createServerClient();
  const { data } = await supabase
    .from("instagram_gallery")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}
