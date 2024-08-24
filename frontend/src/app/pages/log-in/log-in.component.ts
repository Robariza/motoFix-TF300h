import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Input } from '@angular/core';
import { SignInComponent } from '../sign-in/sign-in.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink,SignInComponent, CommonModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  
  @Input() toggleRegister: () => void = () => {};

  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder) {
    // Define el formulario reactivo
    this.loginForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberUser: [false]
    });
  }

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Método para manejar la acción de "Olvidé mi contraseña"
  onForgotPassword() {
    alert('Inicia el proceso de recuperación de contraseña.');
  }
}
