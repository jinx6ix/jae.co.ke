// lib/supabase/client.ts
// Browser-side Supabase client for the public jaetravel-expeditions site.
//
// Uses the anon key (NEXT_PUBLIC_SUPABASE_ANON_KEY). The site's RLS policies
// restrict the anon key to INSERT-only on `online_bookings`. Never expose
// the service role to the browser.

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './types';

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
