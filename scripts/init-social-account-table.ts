// scripts/init-social-account-table.ts
import { config as loadDotenv } from 'dotenv'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../src/generated/prisma/client'

loadDotenv()

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Ensuring SocialAccount table exists...')

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "SocialAccount" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "platform" TEXT NOT NULL,
      "externalId" TEXT NOT NULL,
      "displayName" TEXT,
      "pageId" TEXT,
      "pageName" TEXT,
      "accessTokenEnc" TEXT NOT NULL,
      "expiresAt" TIMESTAMP(3),
      "scopes" TEXT,
      "connectedById" TEXT,
      "connectedByEmail" TEXT,
      "lastRefreshedAt" TIMESTAMP(3),
      "refreshCount" INTEGER NOT NULL DEFAULT 0,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `)

  await prisma.$executeRawUnsafe(`
    CREATE UNIQUE INDEX IF NOT EXISTS "SocialAccount_platform_externalId_key"
    ON "SocialAccount"("platform", "externalId");
  `)

  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS "SocialAccount_platform_idx"
    ON "SocialAccount"("platform");
  `)

  console.log('✓ Table and indexes verified successfully.')

  // Test insert and delete with Prisma client
  const testId = 'test-smoke-' + Date.now()
  const created = await prisma.socialAccount.create({
    data: {
      id: testId,
      platform: 'instagram_test',
      externalId: 'ext-smoke-123',
      displayName: '@test_user',
      accessTokenEnc: 'smoke_enc_test',
    },
  })
  console.log('✓ Smoke insert successful:', created.id)

  const deleted = await prisma.socialAccount.delete({
    where: { id: testId },
  })
  console.log('✓ Smoke delete successful:', deleted.id)

  await prisma.$disconnect()
}

main().catch((err) => {
  console.error('Error initializing SocialAccount table:', err)
  process.exit(1)
})
