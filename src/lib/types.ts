export type BookingMethod = "whatsapp" | "instagram";
export type EventStatus = "open" | "waitlist" | "closed";

export interface SiteSettings {
  id: number;
  logo_text: string;
  footer_tagline: string;
  contact_email: string;
  address_line: string;
  whatsapp_number: string;
  instagram_handle: string;
  instagram_url: string;
  primary_booking_method: BookingMethod;
}

export interface HeroSection {
  id: number;
  heading: string;
  subheading: string;
  featured_title: string;
  featured_date: string;
  featured_time: string;
  featured_location: string;
  image_url: string;
  primary_cta_label: string;
  secondary_cta_label: string;
  secondary_cta_link: string;
}

export interface Workshop {
  id: string;
  title: string;
  category: string;
  description: string;
  image_url: string;
  sort_order: number;
  is_active: boolean;
}

export interface ScheduleEvent {
  id: string;
  workshop_title: string;
  date: string;
  time: string;
  location: string;
  price_label: string;
  seats_total: number;
  status: EventStatus;
  description: string;
  image_url: string;
  is_featured: boolean;
  sort_order: number;
}

export interface Story {
  id: string;
  title: string;
  published_date: string;
  excerpt: string;
  body: string | null;
  image_url: string;
  sort_order: number;
}

export interface AboutPage {
  id: number;
  heading: string;
  intro_paragraph: string;
  story_paragraph: string;
  image_url: string;
  pillar_1_title: string;
  pillar_1_desc: string;
  pillar_2_title: string;
  pillar_2_desc: string;
  pillar_3_title: string;
  pillar_3_desc: string;
}

export interface InstagramGalleryItem {
  id: string;
  image_url: string;
  link: string;
  sort_order: number;
}
