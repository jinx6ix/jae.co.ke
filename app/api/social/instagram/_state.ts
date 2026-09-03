// app/api/social/instagram/_state.ts
//
// Tiny in-memory store for OAuth state tokens during the
// /api/social/instagram/connect → /api/social/instagram/callback round-trip.
//
// Why a module-local map (and not a DB table):
//   - The editor's browser is on the Meta dialog for at most a couple of
//     minutes. A 10-minute TTL covers that comfortably.
//   - State is sensitive (it proves the callback originated from our
//     /connect route) but it's not secret — leaking the state lets an
//     attacker attach their own authorization code to a victim's
//     in-flight flow, which is why we tie it to the editor's userId
//     in the callback handler.
//   - Process-local means: on serverless, two consecutive function
//     invocations might not share memory. In practice the editor's
//     browser hits the same region and the same function instance
//     within seconds. If we ever see a "state not found" bug in
//     production logs, the right move is a DB-backed store, not
//     more in-memory state.

interface PendingState {
  userId: string;
  userEmail: string;
  createdAt: number;
}

const STATE_TTL_MS = 10 * 60 * 1000; // 10 minutes

// Module-level map. Survives within a single server process; resets
// on cold start. Use a Map (not a plain object) so iteration order is
// stable and lookups are O(1).
const pending = new Map<string, PendingState>();

/** Persist a state token for 10 minutes. */
export function rememberOAuthState(state: string, payload: PendingState): void {
  // Sweep expired entries on every write. Cheap because the map is
  // tiny (at most a handful of in-flight flows) and avoids the need
  // for a background timer.
  const cutoff = Date.now() - STATE_TTL_MS;
  for (const [key, value] of pending) {
    if (value.createdAt < cutoff) pending.delete(key);
  }
  pending.set(state, payload);
}

/**
 * Look up a state token, return its metadata, and atomically consume
 * it (so a callback can't be replayed). Returns `null` for unknown
 * or expired states.
 */
export function consumeOAuthState(state: string): PendingState | null {
  const value = pending.get(state);
  if (!value) return null;
  pending.delete(state);
  if (Date.now() - value.createdAt > STATE_TTL_MS) return null;
  return value;
}
