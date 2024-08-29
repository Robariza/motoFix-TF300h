import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; // Cambia a withInterceptorsFromDi
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AuthService } from './services/auth.service';
import { authInterceptor } from './shared/auth.interceptor';
import { errorInterceptor } from './shared/error-response.interceptor';

// Configuración de la aplicación con interceptores basados en inyección de dependencias
export const appConfig: ApplicationConfig = {
  providers: [
    AuthService, // Provisión del servicio de autenticación
    provideHttpClient(withInterceptorsFromDi()), // Uso de interceptores desde la inyección de dependencias
    provideRouter(routes),
    {
      provide: 'HTTP_INTERCEPTORS',
      useFactory: authInterceptor, // Usar la fábrica para proporcionar el interceptor de autenticación
      deps: [AuthService], // Dependencias necesarias para el interceptor
      multi: true
    },
    {
      provide: 'HTTP_INTERCEPTORS',
      useFactory: errorInterceptor, // Usar la fábrica para proporcionar el interceptor de error
      multi: true
    }
  ]
};

