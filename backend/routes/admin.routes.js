import express from 'express'; 
import { getAdmins, postAdmin, deleteAdminById, updateAdminById } from '../controllers/admin.controller.js'; 
import auth from '../middlewares/auth.js'; 

// Configuramos el Router de express
const adminsRouter = express.Router(); 

// Definimos nuestras rutas

// Ruta para la petición GET
adminsRouter.get('/', auth('admin'), getAdmins);
// Usa el middleware de autenticación 'auth' que requiere el rol 'admin'

// Ruta para la petición POST
adminsRouter.post('/', auth('admin'), postAdmin);

// Ruta para la petición PUT
adminsRouter.put('/:id', auth('admin'), updateAdminById);


// Ruta para la petición DELETE
adminsRouter.delete('/:id', auth('admin'), deleteAdminById);
// Esta ruta maneja las solicitudes DELETE a '/admin/:id' (donde ':id' es el ID del administrador a eliminar)
// Usa el middleware de autenticación 'auth' que requiere el rol 'admin'

// Exportación de rutas
export default adminsRouter;

