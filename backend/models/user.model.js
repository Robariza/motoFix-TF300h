import mongoose from 'mongoose';
import { updateTimestamp } from '../middlewares/updateTimestamp.js';

const { Schema } = mongoose;

// Define el esquema para el modelo de usuario
const userSchema = new Schema({
    // Nombre de usuario del usuario
    username: {
        type: String, // El campo es de tipo cadena de texto
        required: true, // Es obligatorio
        trim: true // Elimina espacios en blanco al principio y al final
    },
    // Contraseña del usuario
    password: {
        type: String, 
        required: true 
    },
    // Correo electrónico del usuario
    email: {
        type: String, 
        required: true, 
        unique: true, 
        match: [/.+\@.+\..+/, 'Por favor, ingrese un correo válido'] // Valida que el correo tenga el formato adecuado
    },
    // Rol del usuario
    role: {
        type: String,
        enum: ['user', 'admin'], // Solo 'user' o 'admin' son valores válidos
        default: 'user' // Valor por defecto
    },        
    // Fecha de creación del documento
    createdAt: {
        type: Date, // El campo es de tipo fecha
        default: Date.now // Se establece por defecto en la fecha y hora actual
    },
    // Fecha de la última actualización del documento
    updatedAt: {
        type: Date, 
        default: Date.now 
    },
    // Apellido del usuario
    lastName: {
        type: String, 
        trim: true 
    },
    // Dirección del usuario
    address: {
        type: String,
        trim: true 
    },
    // Número de teléfono del usuario
    phone: {
        type: String, 
        trim: true 
    },
});

// Aplica el middleware updateTimestamp antes de guardar el documento
// Esto actualizará el campo 'updatedAt' cada vez que se guarde el documento
userSchema.pre('save', updateTimestamp);

// Crea y exporta el modelo 'User' basado en el esquema definido
// Esto permite interactuar con la colección 'users' en MongoDB
export const userModel = mongoose.model('User', userSchema);
