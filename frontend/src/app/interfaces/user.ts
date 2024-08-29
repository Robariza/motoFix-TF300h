export interface User {
    // Nombre de usuario del usuario
    name: string;
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
