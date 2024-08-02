// Importación Schema (plantilla)
import mongoose from 'mongoose';
const schema = mongoose.Schema;

// Estructuración de la información
const userSchema = new schema({
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
        // match -> asegura que los correos ingresados tengan un formato válido [expresión regular, mensaje de error]
        match: [/.+\@.+\..+/, 'Por favor, ingrese un correo válido']
    },
    roleUser: {
        type: String,
        default: 'customer'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },

    // Campos adicionales para el perfil de usuario
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
});

// Middleware para actualizar el campo 'updatedAt' antes de cada guardado
userSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Creación y exportación del modelo
export const userModel = mongoose.model('usuario', userSchema);