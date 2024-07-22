import { adminModel } from "../models/admin.model.js";

// Lógica petición GET
export const getAdmins = async (req, res) => {
    // Manejo de errores
    try {
        let admins = await adminModel.find();
        // Validación en el caso de que no hayan administradores
        if (admins.length === 0) {
            return res.status(404).json({ message: 'No se encontraron administradores' });
        }
        
        return res.status(200).send(admins);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Lógica de petición POST
export const postAdmin = async (req, res) => {
    const { username, password, email, firstName, lastName, address, phone } = req.body;

    // Validación de que se hayan ingresado todos los datos
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'Debe ingresar todos los campos requeridos: nombre de usuario, contraseña y correo' });
    }

    try {
        const newAdmin = await adminModel.create(req.body);
        return res.status(201).json(newAdmin);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Lógica de petición DELETE
export const deleteAdminById = async (req, res) => {
    try {
        let idForDelete = req.params._id;
        let adminDelete = await adminModel.findByIdAndDelete(idForDelete);

        // Validación cuando no encontramos el administrador solicitado
        if (!adminDelete) {
            return res.status(404).json({ message: 'No hay administrador a eliminar' });
        }

        return res.status(200).json({ message: 'Administrador eliminado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Lógica de petición PUT
export const putAdminById = async (req, res) => {
    try {
        let idForUpdate = req.params._id;
        let adminUpdate = await adminModel.findByIdAndUpdate(idForUpdate, req.body, { new: true });

        // Validación cuando no encontramos el administrador solicitado
        if (!adminUpdate) {
            return res.status(404).json({ message: 'No hay administrador a modificar' });
        }

        return res.status(200).json({ message: 'Administrador actualizado correctamente', admin: adminUpdate });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
