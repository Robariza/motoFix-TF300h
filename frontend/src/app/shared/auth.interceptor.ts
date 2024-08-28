import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export function authInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {
  const authService = inject(AuthService);

  return authService.getToken().pipe(
    tap((token: string | null) => {
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    }),
    switchMap(() => next(request))
  );
}
