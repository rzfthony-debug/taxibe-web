import { createClient } from "@supabase/supabase-js";

// URL and anon key are public by design (Supabase RLS enforces access control)
const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? "";
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY ?? "";

// Service role key must NEVER use NEXT_PUBLIC_ prefix — server-only
const service = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export const supabase = createClient(url, anon);
export const adminDb = createClient(url, service);
