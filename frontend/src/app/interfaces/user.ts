export interface User {
    _id: string
    // Nombre de usuario del usuario
    username: string;
    // Contraseña del usuario
    email: string;
    // Primer nombre del usuario (opcional)
    firstName?: string;
    // Apellido del usuario (opcional)
    lastName?: string;
    // Dirección del usuario (opcional)
    address?: string;
    // Número de teléfono del usuario (opcional)
    phone?: string;
}
