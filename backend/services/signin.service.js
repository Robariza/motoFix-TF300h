import { userModel } from '../models/user.model.js'; 

import bcrypt from 'bcryptjs'; 
import jwtUtils from '../lib/jwt.js';

// Función para manejar el registro de un nuevo usuario
export const signinService = async (req, res) => {
    // Extrae los datos del cuerpo de la solicitud
    const { username, password, email, firstName, lastName, address, phone } = req.body;

    try {
        // Verifica si ya existe un usuario con el mismo correo electrónico o nombre de usuario
        const existingUser = await userModel.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({
                status: '400',
                message: 'El correo electrónico o nombre de usuario ya están registrados'
            });
        }

        // Encripta la contraseña proporcionada
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crea un nuevo usuario con los datos proporcionados
        const newUser = new userModel({
            username,
            password: hashedPassword,
            email,
            firstName,
            lastName,
            address,
            phone
        });

        // Guarda el nuevo usuario en la base de datos
        await newUser.save();

        // Prepara el payload que se incluirá en el token JWT (opcional)
        const payload = {
            id: newUser._id.toString(), // Convierte el ID del usuario a string para el payload
            username: newUser.username,
            role: newUser.role
        };

        // Genera un token JWT utilizando el payload (opcional)
        const token = await jwtUtils.generateToken(payload);

        // Responde con un mensaje de éxito y el token generado
        return res.status(201).json({
            status: '201',
            message: 'Registro exitoso',
            token
        });

    } catch (error) {
        // Si ocurre algún error durante el proceso, responde con un error 500
        return res.status(500).json({
            status: '500',
            message: 'Hubo un error al registrar el usuario',
            error: error.message || 'Error interno del servidor'
        });
    }
};