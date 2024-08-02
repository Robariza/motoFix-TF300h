import mongoose from 'mongoose';
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
        type: String,
        trim: true
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

// Middleware para actualizar el campo 'updatedAt' solo si hay cambios
productSchema.pre('save', function (next) {
    if (this.isModified()) {
        this.updatedAt = Date.now();
    }
    next();
});

// Creación y exportación del modelo
export const productModel = mongoose.model('Product', productSchema);
