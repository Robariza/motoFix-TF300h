import adminModel from "../models/admin.model.js";

// Lógica petición GET
export const getAdmins = async (req, res) => {
    try {
        const admins = await adminModel.find();
        if (admins.length === 0) {
            return res.status(404).json({ message: 'No se encontraron administradores' });
        }
        return res.status(200).json(admins); 
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Lógica de petición POST
export const postAdmin = async (req, res) => {
    const { username, password, email, role, firstName, lastName, address, phone } = req.body;

    if (!username || !password || !email || !role) {
        return res.status(400).json({ message: 'Debe ingresar todos los campos requeridos: nombre de usuario, contraseña y correo' });
    }

    try {
       
        const newAdmin = await adminModel.create({ username, password, email, role, firstName, lastName, address, phone });
        return res.status(201).json(newAdmin);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Lógica de petición DELETE
export const deleteAdminById = async (req, res) => {
    try {
        const idForDelete = req.params.id; 
        const adminDelete = await adminModel.findByIdAndDelete(idForDelete);

        if (!adminDelete) {
            return res.status(404).json({ message: 'No hay administrador a eliminar' });
        }

        return res.status(200).json({ message: 'Administrador eliminado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


