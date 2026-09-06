import type { SiteSettings } from "@/lib/types";

// Builds the href for every "Book a seat" / "Get in touch" button site-wide,
// based on the booking method chosen in /admin/settings.
export function buildBookingLink(settings: SiteSettings, context?: string) {
  const message = context
    ? `Hi! I'd like to book a seat for "${context}".`
    : "Hi! I'd like to know more about your workshops.";

  if (settings.primary_booking_method === "instagram") {
    return `https://instagram.com/${settings.instagram_handle.replace(/^@/, "")}`;
  }

  const digits = settings.whatsapp_number.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
