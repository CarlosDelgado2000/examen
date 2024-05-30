import { Router } from 'express';
import { crearPaciente } from '../controllers/pacienteController';

const router = Router();

router.post('/', crearPaciente);

// Agrega más rutas para otras operaciones CRUD

export default router;
