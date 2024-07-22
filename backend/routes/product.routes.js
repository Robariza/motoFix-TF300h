//Importaciones
import express from 'express';
import { getProducts, postProduct, deleteProductById, putProductById } from '../controllers/product.controller.js';


//configuramos el Router de express
const productsRouter = express.Router();


//Definimos nuestras rutas

//Ruta para la petición GET
productsRouter.get('/obtenerProductos',getProducts);

//Ruta para la petición POST
productsRouter.post('/registrarProducto', postProduct);

//Ruta para la petición DELETE
productsRouter.delete('/eliminarProducto/:_id', deleteProductById);

//Ruta para la petición PUT
productsRouter.put('/actualizarProducto/:_id', putProductById);

//Exportación rutas
export default productsRouter;