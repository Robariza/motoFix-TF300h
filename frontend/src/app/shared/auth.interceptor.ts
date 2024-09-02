import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export function authInterceptor(request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  const authService = inject(AuthService);

  return authService.getToken().pipe(
    switchMap(token => {
      const authRequest = token ?
        request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) :
        request;
      return next(authRequest);
    })
  );
}
