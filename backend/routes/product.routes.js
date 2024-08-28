//Importaciones
import express from 'express';
import { getProducts, getProductById, postProduct, deleteProductById, putProductById } from '../controllers/product.controller.js';
import auth from '../middlewares/auth.js'

// Configuramos el Router de express
const productsRouter = express.Router();

// Definimos nuestras rutas

// Ruta para la petición GET
productsRouter.get('/', getProducts);

// Ruta para la petición GET por ID
productsRouter.get('/product/:id', getProductById);

// Ruta para la petición POST
productsRouter.post('/', postProduct);

// Ruta para la petición DELETE por ID
productsRouter.delete('/:id', deleteProductById);

// Ruta para la petición PUT por ID
productsRouter.put('/:id', putProductById);

// Exportación rutas
export default productsRouter;
