import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function crearRegistrosDePrueba() {
  // Crear sucursales y otras entidades como en el ejemplo anterior
}

crearRegistrosDePrueba()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
