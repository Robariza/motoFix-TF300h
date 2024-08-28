import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { SignInComponent } from '../sign-in/sign-in.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink,SignInComponent, CommonModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  
  loginForm: FormGroup;
  showPassword: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Inicializa el formulario con validaciones
    this.loginForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberUser: [false]
    });
  }

  // Alterna la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Método para manejar el envío del formulario
  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { mail, password } = this.loginForm.value;

    this.authService.login(mail, password).subscribe({
      next: (response) => {
        // Si el login es exitoso, redirige al usuario
        this.router.navigate(['/home']);
      },
      error: (err) => {
        // Maneja los errores de autenticación
        this.errorMessage = 'Error de autenticación. Verifica tus credenciales e intenta de nuevo.';
      }
    });
  }
}