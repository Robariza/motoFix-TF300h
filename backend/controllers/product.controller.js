import {productModel} from '../models/product.model.js'

// Lógica petición GET
export const getProducts = async (req, res) => {
    //Manejo errores
    try {

        let products = await productModel.find();
        //validación en el caso de que no hayan productos
        if (products.length === 0) {
            return res.status(404).json({ message: 'no se encontraron productos' });
        }
        
        return res.status(200).send(products);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Logica de petición POST
export const postProduct = async (req, res) => {
    const { name, description, price, category, stock, images } = req.body;

    //validación de que se hayan ingresado todos los datos
    if (!name || !description || !price || !category || !stock || !images) {
        return res.status(400).json({ message: 'Debe ingresar todos los campos requeridos, nombre, descripción, precio, categoría, productos en stock e imágenes' });
    }

    try {
        const newProduct = await productModel.create(req.body);
        return res.status(201).json(newProduct);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Lógica de petición DELETE
export const deleteProductById = async (req, res) => {
    try {
        let idForDelete = req.params._id;
        let productDeleted = await productModel.findByIdAndDelete(idForDelete);

        //validación cuando no encontramos el producto solicitado
        if (!productDeleted) {
            return res.status(404).json({ message: 'No hay productos a eliminar' });
        }

        return res.status(200).json({ msg: 'Producto eliminado correctamente' });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Lógica de petición PUT
export const putProductById = async (req, res) => {
    try {
        let idForUpdate = req.params._id;
        let productUpdated = await productModel.findByIdAndUpdate(idForUpdate, req.body);

        //validación cuando no encontramos el producto solicitado
        if (!productUpdated) {
            return res.status(404).json({ message: 'LNo hay producto a modificar' });
        }

        return res.status(200).json({ message: 'Producto actualizado correctamente' });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};