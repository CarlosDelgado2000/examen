import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cerrarSucursal(sucursalId: number) {
  const sucursalCerrada = await prisma.sucursal.findFirst({
    where: { destino: 'CLOSED' },
  });

  if (!sucursalCerrada) {
    throw new Error('Sucursal CLOSED no encontrada');
  }

  const closedSucursalId = sucursalCerrada.id;

  const pacientesMovidos = await prisma.paciente.updateMany({
    where: { sucursalId },
    data: { sucursalId: closedSucursalId },
  });

  const signosVitalesMovidos = await prisma.signo_vital.updateMany({
    where: { sucursalId },
    data: { sucursalId: closedSucursalId },
  });

  const controlesMovidos = await prisma.control.updateMany({
    where: { sucursalId },
    data: { sucursalId: closedSucursalId },
  });

  return {
    pacientes: pacientesMovidos.count,
    signosVitales: signosVitalesMovidos.count,
    controles: controlesMovidos.count,
  };
}

async function cerrarSucursalConCallback(sucursalId: number, callback: (result: any) => void) {
  try {
    const result = await cerrarSucursal(sucursalId);
    console.log('Sucursal cerrada con éxito:', result);
    callback(result);
  } catch (error) {
    console.error('Error cerrando la sucursal:', error);
  }
}

const mostrarResultados = (result: any) => {
  console.log('Elementos movidos por entidad:', result);
};

cerrarSucursalConCallback(1, mostrarResultados)
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
