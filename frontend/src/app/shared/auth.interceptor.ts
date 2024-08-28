import { HttpInterceptorFn, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export function authInterceptor(authService: AuthService): HttpInterceptorFn {
  return (req, next) => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
    }
    return next(req).pipe(
      tap(event => {}),
      catchError((error: HttpErrorResponse) => handleErrorResponse(error))
    );

    function handleErrorResponse(error: HttpErrorResponse) {
      console.error(`Error: ${error.status}, message: ${error.message}`);
      if (error.status === 401) {
        authService.logout(); // Utiliza el servicio de autenticación para cerrar sesión
      }
      return throwError(() => error.message);
    }
  };
}
