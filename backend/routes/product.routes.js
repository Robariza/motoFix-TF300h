//Importaciones
import express from 'express';
import { getProducts, postProduct, deleteProductById, putProductById } from '../controllers/product.controller.js';

// Configuramos el Router de express
const productsRouter = express.Router();

// Definimos nuestras rutas

// Ruta para la petición GET
productsRouter.get('/', getProducts);

// Ruta para la petición POST
productsRouter.post('/', postProduct);

// Ruta para la petición DELETE
productsRouter.delete('/:id', deleteProductById);

// Ruta para la petición PUT
productsRouter.put('/:id', putProductById);

// Exportación rutas
export default productsRouter;
