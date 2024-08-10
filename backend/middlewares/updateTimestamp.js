// Middleware de Mongoose para actualizar la marca de tiempo `updatedAt`
export const updateTimestamp = function (next) {
    // Verificar si el documento ha sido modificado
    // `this.isModified()` devuelve true si se ha realizado algún cambio en el documento
    if (this.isModified()) {
        // Si el documento ha sido modificado, actualiza el campo `updatedAt`
        // `Date.now()` devuelve la fecha y hora actuales
        this.updatedAt = Date.now();
    }
    // Llama a `next()` para continuar con el siguiente middleware o proceso de guardado
    // Es importante llamar a `next()` para que la operación de guardado continúe
    next();
};
