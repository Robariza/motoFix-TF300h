// Importación Schema (plantilla)
import mongoose from 'mongoose';
import { updateTimestamp } from '../middlewares/updateTimestamp.js';
import { userModel } from './user.model.js';

const schema = mongoose.Schema;

const adminSchema = new schema({
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Aplicar el middleware para actualizar el campo 'updatedAt'
adminSchema.pre('save', updateTimestamp);

// Exportar el modelo de administrador
const adminModel = userModel.discriminator('Admin', adminSchema);

export default adminModel;