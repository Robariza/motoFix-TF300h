// Importaciones
import express from 'express';
import { getUsers, postUser, deleteUserById, putUserById, getUserProfile } from '../controllers/user.controller.js';
import auth from '../middlewares/auth.js'

// Configuramos el Router de express
const usersRouter = express.Router();

// Definimos nuestras rutas

// Ruta para la petición GET
usersRouter.get('/', getUsers);

// Ruta para la petición POST
usersRouter.post('/', postUser);

// Ruta para la petición DELETE
usersRouter.delete('/:id', deleteUserById);

// Ruta para la petición PUT
usersRouter.put('/:id', putUserById);

// Ruta para obtener el perfil del usuario autenticado
usersRouter.get('/profile', auth(), getUserProfile)

// Exportación de rutas
export default usersRouter;
