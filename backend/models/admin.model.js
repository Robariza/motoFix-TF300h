// Importación Schema (plantilla)
import mongoose from 'mongoose';
const schema = mongoose.Schema;

const adminSchema = new schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Por favor, ingrese un correo válido']
    },
    role: {
        type: String,
        default: 'admin'
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

// Middleware para actualizar el campo 'updatedAt' antes de cada guardado
adminSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Exportar el modelo de administrador
export const Admin = mongoose.model('Admin', adminSchema);