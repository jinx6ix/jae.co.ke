import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import 'dotenv/config';
import { Pool } from 'pg';

// Create a pool
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// Create the adapter
const adapter = new PrismaPg(pool);
// Instantiate PrismaClient with the adapter
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Adding accessibility test data...');
  await prisma.destination.upsert({
    where: { id: 'dest-accessibility-test' },
    update: {},
    create: {
      id: 'dest-accessibility-test',
      name: 'Wheelchair Accessible Test Reserve',
      country: 'KENYA',
      isWheelchairAccessible: true,
      accessibilityVerificationLevel: 'A',
      accessibilityNotes: 'Fully verified for wheelchair access',
    },
  });
  await prisma.vehicle.upsert({
    where: { id: 'veh-accessibility-test' },
    update: {},
    create: {
      id: 'veh-accessibility-test',
      name: 'Accessible Safari Landcruiser',
      type: 'LAND_CRUISER',
      seats: 7,
      isWheelchairAccessible: true,
      accessibilityVerificationLevel: 'A',
      accessibilityNotes: 'Lift-equipped and accessible for wheelchair users',
    },
  });
  console.log('✅ Accessibility test data added.');
}
main().catch(e => console.error(e)).finally(async () => {
    await prisma.$disconnect()
    await pool.end()
});
