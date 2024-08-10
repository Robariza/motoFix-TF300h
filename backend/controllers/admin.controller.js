import bcrypt from 'bcryptjs';  // Importa bcryptjs para manejar el hash de contraseñas
import adminModel from "../models/admin.model.js";  // Importa el modelo de administrador desde el archivo de modelos

// Lógica de petición GET para obtener todos los administradores
export const getAdmins = async (req, res) => {
    try {
        // Busca todos los administradores en la base de datos
        const admins = await adminModel.find();
        
        // Si no se encuentran administradores, responde con un estado 404 y un mensaje
        if (admins.length === 0) {
            return res.status(404).json({ message: 'No se encontraron administradores' });
        }
        
        // Responde con el estado 200 y la lista de administradores
        return res.status(200).json(admins); 
    } catch (error) {
        // En caso de error, responde con un estado 500 y el mensaje de error
        return res.status(500).json({ message: error.message });
    }
};

// Crea un nuevo administrador
export const postAdmin = async (req, res) => {
    const { username, password, email, role } = req.body;

    // Verifica que los campos obligatorios estén presentes
    if (!username || !password || !email || !role) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    try {
        // Comprueba si el administrador ya existe
        const existingAdmin = await adminModel.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Administrador ya existe' });
        }

        // Encripta la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crea el nuevo administrador
        const newAdmin = await adminModel.create({
            username,
            password: hashedPassword,
            email,
            role
        });

        // Responde con el nuevo administrador
        return res.status(201).json(newAdmin);
    } catch (error) {
        // Responde con un error en caso de fallo
        return res.status(500).json({ message: error.message });
    }
};


// Lógica de petición DELETE para eliminar un administrador por ID
export const deleteAdminById = async (req, res) => {
    try {
        // Obtiene el ID del administrador a eliminar desde los parámetros de la solicitud
        const idForDelete = req.params.id;

        // Busca y elimina el administrador con el ID proporcionado
        const adminDelete = await adminModel.findByIdAndDelete(idForDelete);

        // Si no se encuentra un administrador con el ID dado, responde con un estado 404 y un mensaje
        if (!adminDelete) {
            return res.status(404).json({ message: 'No hay administrador a eliminar' });
        }

        // Responde con el estado 200 y un mensaje de éxito
        return res.status(200).json({ message: 'Administrador eliminado correctamente' });
    } catch (error) {
        // En caso de error, responde con un estado 500 y el mensaje de error
        return res.status(500).json({ message: error.message });
    }
};

// Actualiza un administrador por ID
export const updateAdminById = async (req, res) => {
    // Obtiene el ID del administrador a actualizar
    const idToUpdate = req.params.id;
    // Obtiene los datos nuevos del cuerpo de la solicitud
    const { username, password, email, role, firstName, lastName, address, phone } = req.body;

    // Verifica que al menos un campo esté presente para la actualización
    if (!username && !password && !email && !role && !firstName && !lastName && !address && !phone) {
        return res.status(400).json({ message: 'Debe ingresar al menos un campo para actualizar' });
    }

    try {
        // Prepara los datos para actualizar
        let updatedFields = { username, email, role, firstName, lastName, address, phone };
        // Si se proporciona una nueva contraseña, encripta la nueva contraseña
        if (password) {
            updatedFields.password = await bcrypt.hash(password, 10);
        }

        // Actualiza el administrador en la base de datos y devuelve el documento actualizado
        const updatedAdmin = await adminModel.findByIdAndUpdate(idToUpdate, updatedFields, { new: true });

        // Si no se encuentra el administrador, responde con un error
        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Administrador no encontrado' });
        }

        // Responde con el administrador actualizado
        return res.status(200).json(updatedAdmin);
    } catch (error) {
        // Responde con un error si ocurre una excepción
        return res.status(500).json({ message: error.message });
    }
};

