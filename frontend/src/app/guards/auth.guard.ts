import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take, catchError } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getToken().pipe(
    take(1), // Solo toma el primer valor emitido
    map(token => {
      if (token) {
        return true; // El usuario está autenticado
      } else {
        router.navigate(['/hpage']); // Redirigir al home si no está autenticado
        return false; // Bloquear el acceso a la ruta
      }
    }),
    catchError(() => {
      // Manejo de errores en caso de fallo al obtener el token
      router.navigate(['/hpage']);
      return [false];
    })
  );
};
