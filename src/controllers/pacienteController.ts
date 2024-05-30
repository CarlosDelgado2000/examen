import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const crearPaciente = async (req: Request, res: Response) => {
  const { nombre, identificacion, sucursalId } = req.body;

  try {
    const paciente = await prisma.paciente.create({
      data: { nombre, identificacion, sucursalId },
    });
    res.json(paciente);
  } catch (error) {
    res.status(500).json({ error: 'Error creando el paciente' });
  }
};

// Agrega más métodos para manejar otras operaciones CRUD
