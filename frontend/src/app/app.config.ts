import { ApplicationConfig, inject } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AuthService } from './services/auth.service';
import { errorInterceptor } from './shared/error-response.interceptor';
import { authInterceptor } from './shared/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [AuthService,
    provideHttpClient(
      withInterceptors([
        // Interceptor de autenticación
        (req, next) => {
          const authService = inject(AuthService);
          return authInterceptor(authService)(req, next);
        },
        errorInterceptor
      ])
    ),
    provideRouter(routes),
  ]
};
