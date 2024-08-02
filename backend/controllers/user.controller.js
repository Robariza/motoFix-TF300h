import { userModel } from "../models/user.model.js";

// Lógica petición GET
export const getUsers = async (req, res) => {
    // Manejo de errores
    try {
        let users = await userModel.find();
        if (users.length === 0) {
            return res.status(404).json({ message: 'No se encontraron usuarios' });
        }
        
        return res.status(200).send(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Lógica de petición POST
export const postUser = async (req, res) => {
    const { username, password, email, firstName, lastName, address, phone } = req.body;

    if (!username || !password || !email || !firstName || !lastName || !address || !phone) {
        return res.status(400).json({ message: 'Debe ingresar todos los campos requeridos: nombre de usuario, contraseña, correo, nombres, apellidos, dirección y número de contacto' });
    }

    try {
        const newUser = await userModel.create(req.body);
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Lógica de petición DELETE
export const deleteUserById = async (req, res) => {
    try {
        let idForDelete = req.params._id;
        let userDelete = await userModel.findByIdAndDelete(idForDelete);

        if (!userDelete) {
            return res.status(404).json({ message: 'No hay usuario a eliminar' });
        }

        return res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Lógica de petición PUT
export const putUserById = async (req, res) => {
    try {
        let idForUpdate = req.params._id;
        let userUpdate = await userModel.findByIdAndUpdate(idForUpdate, req.body, { new: true });

        if (!userUpdate) {
            return res.status(404).json({ message: 'No hay usuario a modificar' });
        }

        return res.status(200).json({ message: 'Usuario actualizado correctamente', user: userUpdate });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
