import { productModel } from '../models/product.model.js';

// Lógica petición GET
export const getProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        if (products.length === 0) {
            return res.status(404).json({ message: 'No se encontraron productos' });
        }
        return res.status(200).json(products); // Cambiado a `json` para mantener consistencia
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Lógica de petición POST
export const postProduct = async (req, res) => {
    const { name, description, price, category, stock, images } = req.body;

    if (!name || !description || !price || !category || !stock || !images) {
        return res.status(400).json({ message: 'Debe ingresar todos los campos requeridos: nombre, descripción, precio, categoría, stock e imágenes' });
    }

    try {
        const newProduct = await productModel.create(req.body);
        return res.status(201).json(newProduct);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Lógica de petición DELETE
export const deleteProductById = async (req, res) => {
    const { id } = req.params; // Cambiado a `id` en lugar de `_id`
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

// Lógica de petición PUT
export const putProductById = async (req, res) => {
    const { id } = req.params; // Cambiado a `id` en lugar de `_id`
    try {
        const productUpdated = await productModel.findByIdAndUpdate(id, req.body, { new: true }); // `{ new: true }` para retornar el documento actualizado
        if (!productUpdated) {
            return res.status(404).json({ message: 'No se encontró el producto a modificar' });
        }
        return res.status(200).json({ message: 'Producto actualizado correctamente', product: productUpdated });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
