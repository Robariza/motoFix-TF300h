import mongoose from 'mongoose';
import { updateTimestamp } from '../middlewares/updateTimestamp.js';

const { Schema } = mongoose;

// Definir el esquema de producto
const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    images: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

// Aplicar el middleware para actualizar el campo 'updatedAt'
productSchema.pre('save', updateTimestamp);

// Creación y exportación del modelo
export const productModel = mongoose.model('Product', productSchema);
