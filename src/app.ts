import express from 'express';
import bodyParser from 'body-parser';
import pacienteRoutes from './routes/pacienteRoutes';
import signoVitalRoutes from './routes/signoVitalRoutes';
import controlRoutes from './routes/controlRoutes';

const app = express();
app.use(bodyParser.json());

app.use('/pacientes', pacienteRoutes);
app.use('/signos-vitales', signoVitalRoutes);
app.use('/controles', controlRoutes);

app.put('/moverControles', async (req, res) => {
  const { ids, sucursalOrigenId, sucursalDestinoId } = req.body;
  const prisma = new PrismaClient();

  try {
    const controles = await prisma.control.findMany({
      where: {
        id: { in: ids },
        sucursalId: sucursalOrigenId,
      },
    });

    if (controles.length !== ids.length) {
      return res.status(400).json({ error: 'Algunos IDs no pertenecen a la sucursal origen' });
    }

    await prisma.control.updateMany({
      where: { id: { in: ids } },
      data: { sucursalId: sucursalDestinoId },
    });

    res.json({ message: 'Controles movidos exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error moviendo los controles' });
  } finally {
    await prisma.$disconnect();
  }
});

app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});
