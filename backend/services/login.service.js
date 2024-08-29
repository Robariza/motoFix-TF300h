import { userModel } from '../models/user.model.js'; 
import bcrypt from 'bcryptjs'; 
import jwtUtils from '../lib/jwt.js';

// Función para manejar el inicio de sesión y generación de token
export const loginService = async (req, res) => {
    // Extrae el email y la contraseña del cuerpo de la solicitud
    const { email, password } = req.body;

    try {
        // Busca un usuario en la base de datos que coincida con el email proporcionado
        const user = await userModel.findOne({ email });
        // Si no se encuentra el usuario, responde con un error 404
        if (!user) {
            return res.status(404).json({
                status: '404',
                message: 'Usuario no encontrado, registrese'
            });
        }

        // Compara la contraseña proporcionada con la almacenada en la base de datos
        const isPasswordValid = await bcrypt.compare(password, user.password);
        // Si la contraseña es incorrecta, responde con un error 401
        if (!isPasswordValid) {
            return res.status(401).json({
                status: '401',
                message: 'Contraseña incorrecta'
            });
        }

        // Prepara el payload que se incluirá en el token JWT
        const payload = {
            id: user._id.toString(), // Convierte el ID del usuario a string para el payload
            name: user.username,
            role: user.role
        };

        // Genera un token JWT utilizando el payload
        const token = await jwtUtils.generateToken(payload);

        // Responde con un mensaje de éxito y el token generado
        return res.status(200).json({
            status: '200',
            message: 'Inicio de sesión exitoso',
            token
        });

    } catch (error) {
        // Si ocurre algún error durante el proceso, responde con un error 500
        return res.status(500).json({
            status: '500',
            message: 'Hubo un error al iniciar sesión',
            error: error.message || 'Error interno del servidor'
        });
    }
};
