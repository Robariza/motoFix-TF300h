import jwtUtils from '../lib/jwt.js';

// Middleware para validar autenticación y roles
const auth = (requiredRole) => {
    return async (req, res, next) => {
        try {
            // Obtener el token del encabezado 'Authorization'
            // El encabezado debería estar en el formato 'Bearer <token>'
            // Usamos split(' ')[1] para extraer el token
            const token = req.headers.authorization?.split(' ')[1];
            
            // Verificar si el token está presente
            if (!token) {
                return res.status(401).json({ message: 'Token no encontrado' });
            }

            // Verificar el token usando la función verifyToken del módulo jwtUtils
            // Esta función decodifica el token y verifica su validez
            const decoded = await jwtUtils.verifyToken(token);

            // Validar el rol del usuario si se requiere un rol específico
            if (requiredRole && decoded.role !== requiredRole) {
                return res.status(403).json({ message: 'Permiso denegado' });
            }

            // Continuar con el siguiente middleware o controlador
            next();
        } catch (error) {
            // Manejar errores de autenticación o decodificación del token
            return res.status(500).json({ message: 'Error en la autenticación' });
        }
    };
};

export default auth;
