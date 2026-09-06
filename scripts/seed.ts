/**
 * One-time content seed.
 *
 * Downloads the real photos from the reference site
 * (inbetween-crafts-hub.lovable.app), re-hosts them in Supabase Storage,
 * and inserts the real copy from that site into every content table.
 *
 * Usage: npm run seed   (requires .env.local with Supabase keys)
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { CONTENT_IMAGES_BUCKET, ensureContentImagesBucket } from "../src/lib/storage";

config({ path: ".env.local" });

const SOURCE = "https://inbetween-crafts-hub.lovable.app";
const BUCKET = CONTENT_IMAGES_BUCKET;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const SOURCE_IMAGES = {
  slide1: "/assets/slide-1-8dPe-U5p.jpg", // group stitching around a table
  slide2: "/assets/slide-2-BVvGVry8.jpg", // hands stitching thread into a photograph
  slide3: "/assets/slide-3-CcRxovZF.jpg", // flat lay of thread, scissors, polaroids
  ig1: "/assets/ig-1-CHUrWFng.jpg", // laughing group around a workshop table
  ig2: "/assets/ig-2-DCCA-Yw6.jpg", // block printing table
  ig3: "/assets/ig-3-5WEF7pO2.jpg", // pouring wax into candle jars
  ig4: "/assets/ig-4-GO4V8PIW.jpg", // collage & journaling desk
  ig5: "/assets/ig-5-9-VnRwuK.jpg", // painting tote bags
  ig6: "/assets/ig-6-D7vAVp8v.jpg", // macrame cords
} as const;

type ImageKey = keyof typeof SOURCE_IMAGES;

async function rehostImage(key: ImageKey): Promise<string> {
  const path = SOURCE_IMAGES[key];
  const res = await fetch(`${SOURCE}${path}`);
  if (!res.ok) throw new Error(`Failed to download ${path}: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const destPath = path.replace(/^\/assets\//, "");

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(destPath, buffer, { contentType: "image/jpeg", upsert: true });
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(destPath);
  return data.publicUrl;
}

async function main() {
  console.log("Ensuring storage bucket exists...");
  await ensureContentImagesBucket(supabase);

  console.log("Downloading and re-hosting images...");
  const urls: Record<ImageKey, string> = {} as Record<ImageKey, string>;
  for (const key of Object.keys(SOURCE_IMAGES) as ImageKey[]) {
    urls[key] = await rehostImage(key);
    console.log(`  ${key} -> ${urls[key]}`);
  }

  console.log("Seeding site_settings...");
  await supabase
    .from("site_settings")
    .update({
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
    })
    .eq("id", 1);

  console.log("Seeding hero_section...");
  await supabase
    .from("hero_section")
    .update({
      heading: "Photo Embroidery",
      subheading:
        "Bring a printed photograph and stitch into it — thread halos, confetti skies, little embroidered notes. No stitching experience needed, we start from the very first knot.",
      featured_title: "Photo Embroidery",
      featured_date: "5th September",
      featured_time: "3:30 PM onwards",
      featured_location: "Sable Cafe, Indiranagar, Bangalore",
      image_url: urls.slide1,
      primary_cta_label: "Book a seat",
      secondary_cta_label: "All workshops",
      secondary_cta_link: "/workshops",
    })
    .eq("id", 1);

  console.log("Seeding about_page...");
  await supabase
    .from("about_page")
    .update({
      heading: "Made in the hours inbetween",
      intro_paragraph:
        "Inbetween Workshops is a Bangalore-based craft studio for accessible, intimate creative evenings — no experience required, ever.",
      story_paragraph:
        "We started in 2024 with one embroidery evening and eight strangers around a table. Since then we've added block printing, candle pouring and a handful of other hands-on crafts, always keeping tables small and beginners welcome.",
      image_url: urls.ig1,
      pillar_1_title: "Small tables",
      pillar_1_desc:
        "Groups capped at 12 so everyone gets real instruction, not a lecture.",
      pillar_2_title: "Everything included",
      pillar_2_desc:
        "All materials, tools and your finished piece are part of the session fee.",
      pillar_3_title: "Absolute beginners",
      pillar_3_desc:
        "No prior craft experience needed — we start from the very first step.",
    })
    .eq("id", 1);

  console.log("Seeding workshops...");
  await supabase.from("workshops").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("workshops").insert([
    {
      title: "Photo Embroidery",
      category: "Textile",
      description:
        "Stitch colour, memory and mess straight onto your own photographs.",
      image_url: urls.slide2,
      sort_order: 0,
      is_active: true,
    },
    {
      title: "Block Printing",
      category: "Print",
      description:
        "Carve, ink and print your own repeat pattern onto cotton totes and napkins.",
      image_url: urls.ig2,
      sort_order: 1,
      is_active: true,
    },
    {
      title: "Candle Pouring",
      category: "Home",
      description:
        "Soy wax, dried flowers and scent blending — take home three jars.",
      image_url: urls.ig3,
      sort_order: 2,
      is_active: true,
    },
    {
      title: "Collage & Journaling",
      category: "Paper",
      description:
        "A slow afternoon of cutting, pasting and writing your way through a spread.",
      image_url: urls.ig4,
      sort_order: 3,
      is_active: true,
    },
    {
      title: "Tote Painting",
      category: "Paint",
      description:
        "Fabric paints, stencils and a very loud playlist. Wearable by evening.",
      image_url: urls.ig5,
      sort_order: 4,
      is_active: true,
    },
    {
      title: "Macrame Knotting",
      category: "Fibre",
      description:
        "Learn six core knots and finish a wall hanging in one sitting.",
      image_url: urls.ig6,
      sort_order: 5,
      is_active: true,
    },
  ]);

  console.log("Seeding schedule_events...");
  await supabase.from("schedule_events").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("schedule_events").insert([
    {
      workshop_title: "Photo Embroidery",
      date: "5 Sep 2026",
      time: "3:30 PM",
      location: "Sable Cafe, Indiranagar",
      price_label: "₹1,800 · all materials included",
      seats_total: 12,
      status: "open",
      description:
        "Bring a printed photograph and stitch into it — thread halos, confetti skies, little embroidered notes.",
      image_url: urls.slide2,
      is_featured: true,
      sort_order: 0,
    },
  ]);

  console.log("Seeding stories...");
  await supabase.from("stories").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("stories").insert([
    {
      slug: "why-we-started",
      title: "Why we started Inbetween",
      published_date: "12 August 2026",
      excerpt:
        "A note on the hours between work and sleep, and why they deserve something made by hand.",
      body: null,
      image_url: urls.ig1,
      sort_order: 0,
    },
    {
      slug: "notes-from-the-embroidery-table",
      title: "Notes from the embroidery table",
      published_date: "28 July 2026",
      excerpt:
        "What twelve strangers stitched into their photographs on a rainy Sunday in Indiranagar.",
      body: null,
      image_url: urls.slide1,
      sort_order: 1,
    },
    {
      slug: "how-to-host-a-craft-evening",
      title: "How to host a craft evening at home",
      published_date: "9 July 2026",
      excerpt:
        "Five things we've learnt about tables, timing, snacks and the awkward first ten minutes.",
      body: null,
      image_url: urls.ig4,
      sort_order: 2,
    },
  ]);

  console.log("Seeding instagram_gallery...");
  await supabase.from("instagram_gallery").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("instagram_gallery").insert(
    (["ig1", "ig2", "ig3", "ig4", "ig5", "ig6"] as ImageKey[]).map(
      (key, i) => ({
        image_url: urls[key],
        link: "https://www.instagram.com/inbetween_workshops",
        sort_order: i,
      }),
    ),
  );

  console.log("Done!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
