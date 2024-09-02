import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  @Output() closeModal = new EventEmitter<void>();
  @Input() toggleLogin: () => void = () => { };

  signForm: FormGroup;
  showPassword: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
  ) {
    this.signForm = this.fb.group({
      username: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      email: ['', [Validators.required, Validators.email]],
      role:['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.signForm.valid) {
      const user = this.signForm.value;

      this.registrationService.register(user).subscribe({
        next: (response) => {
          if (response) {
            this.closeModal.emit(); // Cierra el modal de registro
            this.toggleLogin(); // Abre el modal de inicio de sesión
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
            this.errorMessage = 'Error al registrar usuario. Verifica tus credenciales e intenta de nuevo.';
          }
        }
      });
    }
  }
}
