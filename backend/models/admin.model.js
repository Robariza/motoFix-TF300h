// Importación Schema (plantilla)
import mongoose from 'mongoose';
import { userModel } from './user.model.js';

const schema = mongoose.Schema;

const adminSchema = new schema({
    roleAdmin: {
        type: String,
        default: 'admin'
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware para actualizar el campo 'updatedAt' antes de cada guardado
adminSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Exportar el modelo de administrador
const adminModel = userModel.discriminator('Admin', adminSchema);

export default adminModel;