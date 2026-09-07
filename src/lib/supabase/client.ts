import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // During build time, env vars may not be available
    // Return a mock client that won't crash
    return createSupabaseClient("https://placeholder.supabase.co", "placeholder");
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
}
