import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AuthService } from './services/auth.service';
import { authInterceptor } from './shared/auth.interceptor';
import { errorInterceptor } from './shared/error-response.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    AuthService,
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor]) 
    ),
    provideRouter(routes)
  ]
};
