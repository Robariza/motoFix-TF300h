import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LogInComponent } from './log-in.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

// Mock del servicio de autenticación
class MockAuthService {
  login(password: string, email: string) {
    return of({ token: 'mockToken' });
  }
}

// Mock del Router
class MockRouter {
  navigate = jasmine.createSpy('navigate').and.returnValue(Promise.resolve(true)); // Devuelve una promesa resuelta
}

describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LogInComponent], // Agrega LogInComponent a imports
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario de inicio de sesión correctamente', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.controls['email']).toBeDefined();
    expect(component.loginForm.controls['password']).toBeDefined();
  });

  it('debería mostrar un mensaje de error si el formulario es inválido al intentar enviar', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');

    component.onSubmit();

    expect(component.errorMessage).toBeNull();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('debería mostrar un mensaje de error si las credenciales son incorrectas', () => {
    spyOn(authService, 'login').and.returnValue(throwError({ status: 401 }));
    component.loginForm.controls['email'].setValue('test@test.com');
    component.loginForm.controls['password'].setValue('wrongPassword');

    component.onSubmit();

    expect(component.errorMessage).toBe('Credenciales incorrectas. Intenta de nuevo.');
  });

  it('debería alternar la visibilidad de la contraseña', () => {
    expect(component.showPassword).toBeFalse();

    component.togglePasswordVisibility();
    expect(component.showPassword).toBeTrue();

    component.togglePasswordVisibility();
    expect(component.showPassword).toBeFalse();
  });
});
