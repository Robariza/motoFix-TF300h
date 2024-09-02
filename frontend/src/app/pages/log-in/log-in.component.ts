import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { SignInComponent } from '../sign-in/sign-in.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, SignInComponent, CommonModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {

  @Input() toggleRegister: () => void = () => { };
  @Output() closeModal = new EventEmitter<void>();

  loginForm: FormGroup;
  showPassword: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberUser: [false]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.errorMessage = null; // Limpia mensajes de error anteriores

    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(password, email).subscribe({
      next: (response) => {
        if (response && response.token) { // Verifica que hay un token
          this.closeModal.emit(); // Cierra el modal
          this.router.navigate(['/hpage']); // Navega a la ruta de inicio
        } else {
          this.errorMessage = 'Error inesperado. Intenta de nuevo.';
        }
      },
      error: (err) => {
        if (err.status === 401) {
          this.errorMessage = 'Credenciales incorrectas. Intenta de nuevo.';
        } else if (err.status === 0) {
          this.errorMessage = 'Error de red. Verifica tu conexión e intenta de nuevo.';
        } else {
          this.errorMessage = 'Error de autenticación. Verifica tus credenciales e intenta de nuevo.';
        }
      }
    });
  }
}