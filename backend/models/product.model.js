// Importación Schema (plantilla)
import mongoose from "mongoose";
const schema = mongoose.Schema;

// Definir el esquema de producto
const productSchema = new schema({
    name: {
        type: String,
        required: true,
        // trim -> Elimina espacios en blanco para evitar problemas
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
        type: String
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

// Middleware para actualizar el campo 'updatedAt' antes de cada guardado
productSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Creación y exportación del modelo 
export const productModel = mongoose.model('productos', productSchema);