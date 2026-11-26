// lib/prisma.ts  — Prisma 7 client singleton using @prisma/adapter-pg
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import { Pool } from 'pg';
import { parse as parseConnectionString } from 'pg-connection-string';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/**
 * Remove sslrootcert / sslcert / sslkey params from a Postgres URL.
 *
 * pg-connection-string calls fs.readFileSync() on these params at parse time,
 * which throws ENOENT in serverless environments where the file's relative
 * path ./prisma/prod-ca-2021.crt doesn't resolve from the process cwd.
 * We supply ssl: { rejectUnauthorized: false } ourselves instead.
 */
function stripSslFilePaths(connectionString: string): string {
  try {
    const u = new URL(connectionString);
    u.searchParams.delete('sslrootcert');
    u.searchParams.delete('sslcert');
    u.searchParams.delete('sslkey');
    return u.toString();
  } catch {
    // Fallback: regex for non-standard connection strings
    return connectionString.replace(/([?&])(sslrootcert|sslcert|sslkey)=[^&]*/g, '$1').replace(/[?&]$/, '').replace(/\?(&)/g, '?');
  }
}

function makeClient(): PrismaClient {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not set.');
  // jaedb/Supabase serves a self-signed or intermediated cert on this network:
  // keep TLS encryption on, but don't fail the connection on certificate-chain
  // verification ("self-signed certificate in certificate chain").
  //
  // pg-connection-string reads sslrootcert/sslcert/sslkey from disk during
  // parse(), so we remove those params first. Then we pass ssl:
  // { rejectUnauthorized: false } explicitly so it always wins.
  const cleanUrl = stripSslFilePaths(url);
  const parsed = parseConnectionString(cleanUrl);

  const pool = new Pool({
    ...parsed,
    ssl: {
      ...(typeof parsed.ssl === 'object' && parsed.ssl !== null ? parsed.ssl : {}),
      rejectUnauthorized: false,
    },
  });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? makeClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
