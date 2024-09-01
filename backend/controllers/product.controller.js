import { productModel } from '../models/product.model.js';
import { categoryModel } from '../models/category.model.js';
import mongoose from 'mongoose';

// Lógica para manejar la petición GET de productos
export const getProducts = async (req, res) => {
    try {
        // Buscar todos los productos en la base de datos y popular el campo 'category'
        const products = await productModel.find().populate('category');

        // Si no se encuentran productos, enviar una respuesta 404
        if (products.length === 0) {
            return res.status(404).json({ message: 'No se encontraron productos' });
        }

        // Si se encuentran productos, enviar una respuesta 200 con los productos
        return res.status(200).json(products);
    } catch (error) {
        // En caso de error en la búsqueda, enviar una respuesta 500
        return res.status(500).json({ message: error.message });
    }
};

// Lógica para manejar la petición GET de un producto por su ID
export const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await productModel.findById(id).populate('category');
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// Lógica para manejar la petición POST para crear un nuevo producto
export const postProduct = async (req, res) => {
    const { name, description, price, category, stock, images } = req.body;

    if (!name || !description || !price || !category || !stock || !images) {
        return res.status(400).json({ message: 'Debe ingresar todos los campos requeridos: nombre, descripción, precio, categoría, stock e imágenes' });
    }

    try {
        const categoryExists = await categoryModel.findById(category);
        if (!categoryExists) {
            return res.status(400).json({ message: 'La categoría proporcionada no existe' });
        }

        const newProduct = await productModel.create({ 
            name, 
            description, 
            price, 
            category, 
            stock, 
            images 
        });

        return res.status(201).json(newProduct);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Lógica para manejar la petición DELETE para eliminar un producto por su ID
export const deleteProductById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID de producto inválido' });
    }

    try {
        const productDeleted = await productModel.findByIdAndDelete(id);

        if (!productDeleted) {
            return res.status(404).json({ message: 'No se encontró el producto a eliminar' });
        }

        return res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Lógica para manejar la petición PUT para actualizar un producto por su ID
export const putProductById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID de producto inválido' });
    }

    try {
        const productUpdated = await productModel.findByIdAndUpdate(id, req.body, { new: true }).populate('category');

        if (!productUpdated) {
            return res.status(404).json({ message: 'No se encontró el producto a modificar' });
        }

        return res.status(200).json({ message: 'Producto actualizado correctamente', product: productUpdated });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
