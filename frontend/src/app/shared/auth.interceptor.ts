import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

// El interceptor debe ser una función con la firma correcta para HttpInterceptorFn
export function authInterceptor(request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  const authService = inject(AuthService);

  return authService.getToken().pipe(
    switchMap(token => {
      // Clonar la solicitud y agregar el encabezado de autorización si hay un token
      const authRequest = token ? 
        request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : 
        request;
      return next(authRequest);
    })
  );
}
