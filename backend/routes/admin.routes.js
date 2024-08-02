// Importaciones
import express from 'express';
import { getAdmins, postAdmin, deleteAdminById } from '../controllers/admin.controller.js';

// Configuramos el Router de express
const adminsRouter = express.Router();

// Definimos nuestras rutas

// Ruta para la petición GET
adminsRouter.get('/', getAdmins);

// Ruta para la petición POST
adminsRouter.post('/', postAdmin);

// Ruta para la petición DELETE
adminsRouter.delete('/:id', deleteAdminById);

// Exportación de rutas
export default adminsRouter;
