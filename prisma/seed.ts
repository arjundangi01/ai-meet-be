import { PrismaClient } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient();

  const min = 3001;
  const max = 3005;
  await prisma.containerPort.createMany({
    data: Array.from({ length: max - min + 1 }, (_, i) => ({
      port: min + i,
    })),
  });
  console.log('seeded successfully');
}

main();
