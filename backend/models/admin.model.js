import mongoose from 'mongoose';
import { updateTimestamp } from '../middlewares/updateTimestamp.js'; 
import { userModel } from './user.model.js'; 

const schema = mongoose.Schema;

// Crear un esquema específico para los administradores
const adminSchema = new schema({
    // Campo 'updatedAt' que almacena la fecha y hora de la última actualización
    updatedAt: {
        type: Date, // Tipo de datos: Date
        default: Date.now // Valor por defecto: la fecha y hora actuales
    }
});

// Aplicar un middleware que actualiza el campo 'updatedAt' antes de guardar el documento
adminSchema.pre('save', updateTimestamp);

// Exportar el modelo de administrador utilizando el modelo base de usuario
// 'discriminator' permite crear un modelo derivado basado en el esquema base (userModel)
const adminModel = userModel.discriminator('Admin', adminSchema);

// Exportar el modelo para su uso en otras partes de la aplicación
export default adminModel;
