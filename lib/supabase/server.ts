// lib/supabase/server.ts
// Server-side Supabase client for jaetravel-expeditions API routes.
//
// The public site has no user authentication — it talks to Supabase as anon.
// Because the only table the public site writes is `online_bookings`, and the
// RLS policy for that table permits anon INSERT, this client uses the anon
// key (no service role). Cookies are not relevant here since there's no
// logged-in user, but we still thread them in case the future adds a
// customer portal.

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from './types';

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch { /* read-only in route handlers; safe to ignore */ }
        },
      },
    }
  );
}
