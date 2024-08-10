import { categoryModel } from "../models/category.model.js";

// Controlador para obtener todas las categorías
export const getAllCategories = async (req, res) => {
    try {
        // Busca todas las categorías en la base de datos
        const categories = await categoryModel.find();
        // Responde con el array de categorías y un código de estado 200 (OK)
        res.status(200).json(categories);
    } catch (error) {
        // Si ocurre un error, lo registra en la consola y responde con un error 500 (Internal Server Error)
        console.error('Error al obtener categorías:', error);
        res.status(500).json({ message: 'Error al obtener categorías' });
    }
};

// Controlador para obtener una categoría por su ID
export const getCategoryById = async (req, res) => {
    // Extrae el ID de la categoría de los parámetros de la solicitud
    const { id } = req.params;
    try {
        // Busca la categoría en la base de datos usando el ID proporcionado
        const category = await categoryModel.findById(id);
        // Si no se encuentra la categoría, responde con un error 404 (Not Found)
        if (!category) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        // Responde con la categoría encontrada y un código de estado 200 (OK)
        res.status(200).json(category);
    } catch (error) {
        // Si ocurre un error, lo registra en la consola y responde con un error 500 (Internal Server Error)
        console.error('Error al obtener la categoría:', error);
        res.status(500).json({ message: 'Error al obtener la categoría' });
    }
};

// Controlador para crear una nueva categoría
export const createCategory = async (req, res) => {
    // Extrae los datos de la nueva categoría del cuerpo de la solicitud
    const { name, description } = req.body;
    try {
        // Crea una nueva categoría con los datos proporcionados
        const newCategory = new categoryModel({ name, description });
        // Guarda la nueva categoría en la base de datos
        const savedCategory = await newCategory.save();
        // Responde con la categoría guardada y un código de estado 201 (Created)
        res.status(201).json(savedCategory);
    } catch (error) {
        // Si ocurre un error, lo registra en la consola y responde con un error 400 (Bad Request)
        console.error('Error al crear la categoría:', error);
        res.status(400).json({ message: 'Error al crear la categoría', error });
    }
};

// Controlador para actualizar una categoría existente
export const updateCategory = async (req, res) => {
    // Extrae el ID de la categoría y los datos actualizados del cuerpo de la solicitud
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        // Busca y actualiza la categoría en la base de datos usando el ID proporcionado
        // La opción { new: true } devuelve el documento actualizado
        // La opción { runValidators: true } aplica validaciones al actualizar el documento
        const updatedCategory = await categoryModel.findByIdAndUpdate(
            id,
            { name, description },
            { new: true, runValidators: true }
        );
        // Si no se encuentra la categoría, responde con un error 404 (Not Found)
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        // Responde con la categoría actualizada y un código de estado 200 (OK)
        res.status(200).json(updatedCategory);
    } catch (error) {
        // Si ocurre un error, lo registra en la consola y responde con un error 400 (Bad Request)
        console.error('Error al actualizar la categoría:', error);
        res.status(400).json({ message: 'Error al actualizar la categoría', error });
    }
};

// Controlador para eliminar una categoría
export const deleteCategory = async (req, res) => {
    // Extrae el ID de la categoría de los parámetros de la solicitud
    const { id } = req.params;
    try {
        // Busca y elimina la categoría de la base de datos usando el ID proporcionado
        const deletedCategory = await categoryModel.findByIdAndDelete(id);
        // Si no se encuentra la categoría, responde con un error 404 (Not Found)
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        // Responde con un mensaje de éxito y la categoría eliminada, con un código de estado 200 (OK)
        res.status(200).json({ message: 'Categoría eliminada', deletedCategory });
    } catch (error) {
        // Si ocurre un error, lo registra en la consola y responde con un error 500 (Internal Server Error)
        console.error('Error al eliminar la categoría:', error);
        res.status(500).json({ message: 'Error al eliminar la categoría' });
    }
};
