import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Configurar dotenv para cargar variables de entorno
dotenv.config();

// Obtener la clave secreta desde las variables de entorno
const secretKey = process.env.SECRET_KEY;

// Verificar que secretKey esté definida
if (!secretKey) {
    throw new Error('La clave secreta JWT no está definida en las variables de entorno');
}

// Función para generar un token
const generateToken = (payload) => {
    try {
        // Genera un JWT firmado con la clave secreta y con una expiración de 1 hora
        return jwt.sign(payload, secretKey, { expiresIn: '1h' });
    } catch (error) {
        // Maneja cualquier error que ocurra durante la generación del token
        throw new Error('Error al generar JWT: ' + error.message);
    }
};

// Función para verificar un token
const verifyToken = (token) => {
    try {
        // Verifica y decodifica el token usando la clave secreta
        return jwt.verify(token, secretKey);
    } catch (error) {
        // Maneja cualquier error que ocurra durante la verificación del token
        throw new Error('Error al decodificar JWT: ' + error.message);
    }
};

// Exportar funciones como objeto
export default { generateToken, verifyToken };
