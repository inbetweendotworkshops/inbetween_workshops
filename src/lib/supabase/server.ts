import "server-only";
import { createClient } from "@supabase/supabase-js";

// Used in Server Components / route handlers for public reads.
export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

// Service-role client: bypasses RLS. Only ever import this from
// admin API route handlers, after the session cookie has been verified.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );
}
