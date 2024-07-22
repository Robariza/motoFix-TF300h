// Importaciones
import express from 'express';
import { getAdmins, postAdmin, deleteAdminById, putAdminById } from '../controllers/admin.controller.js';

// Configuramos el Router de express
const adminsRouter = express.Router();

// Definimos nuestras rutas

// Ruta para la petición GET
adminsRouter.get('/obtenerAdministradores', getAdmins);

// Ruta para la petición POST
adminsRouter.post('/registrarAdministrador', postAdmin);

// Ruta para la petición DELETE
adminsRouter.delete('/eliminarAdministrador/:_id', deleteAdminById);

// Ruta para la petición PUT
adminsRouter.put('/actualizarAdministrador/:_id', putAdminById);

// Exportación de rutas
export default adminsRouter;
