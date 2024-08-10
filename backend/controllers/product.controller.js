import { productModel } from '../models/product.model.js';

// Lógica para manejar la petición GET de productos
export const getProducts = async (req, res) => {
    try {
        // Buscar todos los productos en la base de datos
        const products = await productModel.find();

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

// Lógica para manejar la petición POST para crear un nuevo producto
export const postProduct = async (req, res) => {
    // Obtener los datos del nuevo producto del cuerpo de la petición
    const { name, description, price, category, stock, images } = req.body;

    // Verificar los campos requeridos
    if (!name || !description || !price || !category || !stock || !images) {
        return res.status(400).json({ message: 'Debe ingresar todos los campos requeridos: nombre, descripción, precio, categoría, stock e imágenes' });
    }

    try {
        // Crear un nuevo producto en la base de datos
        const newProduct = await productModel.create(req.body);

        // Enviar una respuesta 201 con el nuevo producto creado
        return res.status(201).json(newProduct);
    } catch (error) {
        // En caso de error al crear el producto, enviar una respuesta 500
        return res.status(500).json({ message: error.message });
    }
};

// Lógica para manejar la petición DELETE para eliminar un producto por su ID
export const deleteProductById = async (req, res) => {
    // Obtener el ID del producto a eliminar de los parámetros de la petición
    const { id } = req.params;

    try {
        // Buscar y eliminar el producto en la base de datos por su ID
        const productDeleted = await productModel.findByIdAndDelete(id);

        // Si no se encuentra el producto, enviar una respuesta 404
        if (!productDeleted) {
            return res.status(404).json({ message: 'No se encontró el producto a eliminar' });
        }

        // Enviar una respuesta 200 confirmando que el producto fue eliminado
        return res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        // En caso de error al eliminar el producto, enviar una respuesta 500
        return res.status(500).json({ message: error.message });
    }
};

// Lógica para manejar la petición PUT para actualizar un producto por su ID
export const putProductById = async (req, res) => {
    // Obtener el ID del producto a actualizar de los parámetros de la petición
    const { id } = req.params;

    try {
        // Buscar y actualizar el producto en la base de datos por su ID
        // { new: true } hace que la función devuelva el documento actualizado
        const productUpdated = await productModel.findByIdAndUpdate(id, req.body, { new: true });

        // Si no se encuentra el producto, enviar una respuesta 404
        if (!productUpdated) {
            return res.status(404).json({ message: 'No se encontró el producto a modificar' });
        }

        // Enviar una respuesta 200 con el producto actualizado
        return res.status(200).json({ message: 'Producto actualizado correctamente', product: productUpdated });
    } catch (error) {
        // En caso de error al actualizar el producto, enviar una respuesta 500
        return res.status(500).json({ message: error.message });
    }
};
