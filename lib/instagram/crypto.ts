// lib/instagram/crypto.ts
//
// AES-256-GCM token encryption for the SocialAccount store.
//
// Format on the wire (all base64):
//   [ iv (12 bytes) | ciphertext (variable) | authTag (16 bytes) ]
//
// Why this format:
//   - 12-byte IV is the standard length for GCM. Node's `createCipheriv`
//     rejects other lengths for `aes-256-gcm`.
//   - Storing the IV alongside the ciphertext means the store is a
//     self-contained blob — no per-row IV table to maintain.
//   - The auth tag is appended so a tampered blob fails the GCM integrity
//     check on decrypt, not silently returns garbage.
//
// Why this lives in its own module:
//   - The encryption key is process-wide. Mixing crypto with the
//     account-store code would mean every import of account-store also
//     loads the key, increasing the blast radius of an accidental leak.
//   - Same shape as the marketing project's lib/social/crypto.ts. We
//     duplicate ~30 lines here rather than share an npm package because
//     the two repos are independent deployments.

import "server-only";
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

/**
 * Resolve the 32-byte encryption key from TOKEN_ENCRYPTION_KEY.
 *
 * The env var is base64-encoded so a single line in .env represents 32
 * raw bytes — easier to copy-paste than a 64-char hex string with no
 * surrounding quotes. `openssl rand -base64 32` is the generator.
 *
 * Throws if unset or wrong length so a missing key fails loudly at first
 * read rather than silently returning broken ciphertext.
 */
function getKey(): Buffer {
  const raw = process.env.TOKEN_ENCRYPTION_KEY;
  if (!raw) {
    throw new Error(
      "TOKEN_ENCRYPTION_KEY is not set. Generate one with `openssl rand -base64 32` and add it to .env.",
    );
  }
  const key = Buffer.from(raw, "base64");
  if (key.length !== 32) {
    throw new Error(
      `TOKEN_ENCRYPTION_KEY must decode to 32 bytes (got ${key.length}). Regenerate with \`openssl rand -base64 32\`.`,
    );
  }
  return key;
}

/**
 * Encrypt a plaintext token. Returns a base64 string suitable for
 * Postgres TEXT storage. Each call uses a fresh random IV — encrypting
 * the same plaintext twice yields different ciphertexts.
 */
export function encryptToken(plaintext: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", getKey(), iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, ciphertext, tag]).toString("base64");
}

/**
 * Decrypt a base64 token produced by `encryptToken`. Throws if the
 * ciphertext is truncated, the auth tag fails, or the encryption key
 * has been rotated since the row was written.
 */
export function decryptToken(encoded: string): string {
  const buf = Buffer.from(encoded, "base64");
  if (buf.length < 12 + 16) {
    throw new Error("encrypted token is too short to be valid");
  }
  const iv = buf.subarray(0, 12);
  const tag = buf.subarray(buf.length - 16);
  const ciphertext = buf.subarray(12, buf.length - 16);
  const decipher = createDecipheriv("aes-256-gcm", getKey(), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf8");
}
