// controllers/categoryController.js
import { categoryModel } from "../models/category.model.js";

// Obtener todas las categorías
export const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        res.status(500).json({ message: 'Error al obtener categorías' });
    }
};

// Obtener una categoría por ID
export const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await categoryModel.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error('Error al obtener la categoría:', error);
        res.status(500).json({ message: 'Error al obtener la categoría' });
    }
};

// Crear una nueva categoría
export const createCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        const newCategory = new categoryModel({ name, description });
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        console.error('Error al crear la categoría:', error);
        res.status(400).json({ message: 'Error al crear la categoría', error });
    }
};

// Actualizar una categoría existente
export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const updatedCategory = await categoryModel.findByIdAndUpdate(
            id,
            { name, description },
            { new: true, runValidators: true }
        );
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        console.error('Error al actualizar la categoría:', error);
        res.status(400).json({ message: 'Error al actualizar la categoría', error });
    }
};

// Eliminar una categoría
export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCategory = await categoryModel.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.status(200).json({ message: 'Categoría eliminada', deletedCategory });
    } catch (error) {
        console.error('Error al eliminar la categoría:', error);
        res.status(500).json({ message: 'Error al eliminar la categoría' });
    }
};