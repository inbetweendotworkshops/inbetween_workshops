import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

export const CONTENT_IMAGES_BUCKET = "content-images";

export async function ensureContentImagesBucket(supabase: SupabaseClient) {
  const { data: buckets } = await supabase.storage.listBuckets();
  if (!buckets?.some((b) => b.name === CONTENT_IMAGES_BUCKET)) {
    const { error } = await supabase.storage.createBucket(
      CONTENT_IMAGES_BUCKET,
      { public: true },
    );
    if (error) throw error;
  }
}
