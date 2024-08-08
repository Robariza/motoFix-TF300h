import mongoose from 'mongoose';
import { updateTimestamp } from '../middlewares/updateTimestamp.js';

const { Schema } = mongoose;

// Definir el esquema de categoría
const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Aplicar el middleware para actualizar el campo 'updatedAt'
categorySchema.pre('save', updateTimestamp);

// Creación y exportación del modelo
export const categoryModel = mongoose.model('Category', categorySchema);
