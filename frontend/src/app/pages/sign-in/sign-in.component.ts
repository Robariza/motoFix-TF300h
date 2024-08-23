import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  @Input() toggleLogin : () => void = () => {}

  signForm: FormGroup; 
  showPassword: boolean = false;  

  constructor(private fb: FormBuilder) {
    // Inicialización del formulario con validaciones
    this.signForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],  // Validación para números
      mail: ['', [Validators.required, Validators.email]],  // Validación para correo electrónico
      password: ['', Validators.required]
    });
  }

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
