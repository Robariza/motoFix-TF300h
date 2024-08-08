import express from 'express';
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory} from '../controllers/category.controller.js';

const categoryRoutes = express.Router();

// Ruta para obtener todas las categorías
categoryRoutes.get('/', getAllCategories);

// Ruta para obtener una categoría por ID
categoryRoutes.get('/:id', getCategoryById);

// Ruta para crear una nueva categoría
categoryRoutes.post('/', createCategory);

// Ruta para actualizar una categoría existente
categoryRoutes.put('/:id', updateCategory);

// Ruta para eliminar una categoría
categoryRoutes.delete('/:id', deleteCategory);

export default categoryRoutes;
