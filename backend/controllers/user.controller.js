import bcrypt from 'bcryptjs';  
import jwt from '../lib/jwt.js';
import { userModel } from "../models/user.model.js";  

// Lógica para manejar las peticiones GET para obtener todos los usuarios
export const getUsers = async (req, res) => {
    try {
        // Busca todos los usuarios en la base de datos
        const users = await userModel.find();

        // Verifica si se encontraron usuarios
        if (users.length === 0) {
            // Si no se encontraron usuarios, responde con un error 404
            return res.status(404).json({ message: 'No se encontraron usuarios' });
        }

        // Si se encontraron usuarios, responde con una lista de usuarios
        return res.status(200).json(users);
    } catch (error) {
        // Manejo de errores en caso de fallo en la operación
        return res.status(500).json({ message: error.message });
    }
};

// Lógica para manejar las peticiones POST para crear un nuevo usuario
export const postUser = async (req, res) => {
    // Extrae los datos del usuario del cuerpo de la solicitud
    const { username, lastName, address, phone, email, password } = req.body;

    // Verifica si todos los campos requeridos están presentes
    if (!username || !lastName ||  !address|| !phone  || !email || !password  ) {
        // Si falta algún campo, responde con un error 400
        return res.status(400).json({ message: 'Debe ingresar todos los campos requeridos: nombre, contraseña, correo, apellidos, dirección y número de contacto' });
    }

    try {
        // Encripta la contraseña con un salt de 10 rondas
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crea un nuevo usuario en la base de datos con la contraseña encriptada
        const newUser = await userModel.create({
            username,
            lastName,
            address,
            phone,
            email,
            password: hashedPassword,
        });

        // Responde con el nuevo usuario creado y un código de estado 201 (creado)
        return res.status(201).json(newUser);
    } catch (error) {
        // Manejo de errores en caso de fallo en la operación
        return res.status(500).json({ message: error.message });
    }
};

// Lógica para manejar las peticiones DELETE para eliminar un usuario por ID
export const deleteUserById = async (req, res) => {
    try {
        // Extrae el ID del usuario a eliminar de los parámetros de la solicitud
        const idForDelete = req.params.id;

        // Busca y elimina el usuario por ID
        const userDelete = await userModel.findByIdAndDelete(idForDelete);

        // Verifica si el usuario fue encontrado y eliminado
        if (!userDelete) {
            // Si no se encontró un usuario para eliminar, responde con un error 404
            return res.status(404).json({ message: 'No hay usuario a eliminar' });
        }

        // Responde con un mensaje de éxito y un código de estado 200 (OK)
        return res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        // Manejo de errores en caso de fallo en la operación
        return res.status(500).json({ message: error.message });
    }
};

// Lógica para manejar las peticiones PUT para actualizar un usuario por ID
export const putUserById = async (req, res) => {
    // Extrae la nueva contraseña del cuerpo de la solicitud si está presente
    const { password } = req.body;

    try {
        // Extrae el ID del usuario a actualizar de los parámetros de la solicitud
        const idForUpdate = req.params._id;

        // Encripta la nueva contraseña si se proporciona
        if (password) {
            req.body.password = await bcrypt.hash(password, 10);
        }

        // Busca y actualiza el usuario por ID con los nuevos datos
        const userUpdate = await userModel.findByIdAndUpdate(idForUpdate, req.body, { new: true });

        // Verifica si el usuario fue encontrado y actualizado
        if (!userUpdate) {
            // Si no se encontró un usuario para actualizar, responde con un error 404
            return res.status(404).json({ message: 'No hay usuario a modificar' });
        }

        // Responde con el usuario actualizado y un mensaje de éxito
        return res.status(200).json({ message: 'Usuario actualizado correctamente', user: userUpdate });
    } catch (error) {
        // Manejo de errores en caso de fallo en la operación
        return res.status(500).json({ message: error.message });
    }  
};

// Controlador para obtener el perfil del usuario autenticado
export const getUserProfile = async (req, res) => {
    try {
        // Obtener el token del encabezado 'Authorization'
        const token = req.headers.authorization?.split(' ')[1];

        // Verificar si el token está presente
        if (!token) {
            return res.status(401).json({ message: 'Token no encontrado' });
        }

        // Decodificar el token para obtener el ID del usuario
        const decoded = await jwt.verifyToken(token);

        // Obtener el ID del usuario decodificado
        const userId = decoded.id;

        // Busca al usuario en la base de datos por su ID
        const user = await userModel.findById(userId).select('-password'); 

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Devuelve la información del usuario
        return res.status(200).json(user);
    } catch (error) {
        // Imprimir el error para depuración
        console.error('Error al obtener el perfil del usuario:', error.message);
        return res.status(500).json({ message: 'Error al obtener el perfil del usuario' });
    }
};