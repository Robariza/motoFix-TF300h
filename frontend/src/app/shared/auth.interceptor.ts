import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { tap, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export function authInterceptor(authService: AuthService) {
  return (request: HttpRequest<any>, next: HttpHandlerFn) => {
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
  };
}