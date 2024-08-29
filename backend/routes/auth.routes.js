import express from 'express';
import bcrypt from 'bcryptjs';
import jwtUtils from '../lib/jwt.js';
import { userModel } from '../models/user.model.js'; 

// Crea un enrutador de Express para manejar las rutas de autenticación
const authRoutes = express.Router();

// Define la ruta de inicio de sesión (POST /login)
authRoutes.post('/login', async (req, res) => {
    // Extrae el correo electrónico y la contraseña del cuerpo de la solicitud
    const { email, password } = req.body;

    try {
        // Busca al usuario en la base de datos utilizando el correo electrónico proporcionado
        const user = await userModel.findOne({ email });
        
        // Si el usuario no existe, devuelve un error 401 (No autorizado)
        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
        // Utiliza bcrypt para hacer la comparación segura
        const isMatch = await bcrypt.compare(password, user.password);

        // Si la contraseña no coincide, devuelve un error 401 (No autorizado)
        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Si la contraseña es correcta, genera un token JWT para el usuario
        // El token se usa para autenticar al usuario en futuras solicitudes
        const token = await jwtUtils.generateToken(user);

        // Devuelve el token en la respuesta con un código de estado 200 (OK)
        return res.status(200).json({ token });
    } catch (error) {
        // Si ocurre un error en el proceso, devuelve un error 500 (Error interno del servidor)
        return res.status(500).json({ message: 'Error en el inicio de sesión', error: error.message });
    }
});

// Ruta de registro (POST)
authRoutes.post('/signin', async (req, res) => {
    const { name, lastName, address, phone, email, password } = req.body;

    try {
        // Verifica si el correo o nombre de usuario ya están registrados
        const existingUser = await userModel.findOne({ $or: [{ email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo electrónico o nombre de usuario ya están registrados' });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crea un nuevo usuario
        const newUser = new userModel({
            name,
            lastName,
            address,
            phone,
            email,
            password: hashedPassword,
            
        });

        // Guarda el nuevo usuario en la base de datos
        await newUser.save();

        // Devuelve una respuesta de éxito
        return res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        return res.status(500).json({ message: 'Error en el registro', error: error.message });
    }
});

export default authRoutes;
