// lib/prisma.ts  — Prisma 7 client singleton using @prisma/adapter-pg
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import { Pool } from 'pg';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function makeClient(): PrismaClient {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not set.');
  // jaedb/Supabase serves a self-signed or intermediated cert on this network:
  // keep TLS encryption on, but don't fail the connection on certificate-chain
  // verification ("self-signed certificate in certificate chain").
  const pool = new Pool({ connectionString: url, ssl: { rejectUnauthorized: false } });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? makeClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
