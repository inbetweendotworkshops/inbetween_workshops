import { createClient } from "@supabase/supabase-js";

// Public, read-only client (safe to use in Client Components).
// Content tables have public SELECT policies, see supabase/schema.sql.
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
