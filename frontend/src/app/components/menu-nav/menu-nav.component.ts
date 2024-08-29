import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { LogInComponent } from '../../pages/log-in/log-in.component';
import { SignInComponent } from '../../pages/sign-in/sign-in.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu-nav',
  standalone: true,
  imports: [RouterLink, LogInComponent, SignInComponent, CommonModule],
  templateUrl: './menu-nav.component.html',
  styleUrl: './menu-nav.component.css'
})
export class MenuNavComponent {
  isVisibleRegister = false;
  isVisibleLogin = false;
  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) {
    // Verifica el estado de autenticación al inicializar
    this.authService.getToken().subscribe(token => {
      this.isAuthenticated = !!token; // Actualiza el estado basado en el token
    });
  }

  toggleRegister(): void {
    this.isVisibleRegister = !this.isVisibleRegister;
    if (this.isVisibleRegister) this.isVisibleLogin = false;
  }

  toggleLogin(): void {
    this.isVisibleLogin = !this.isVisibleLogin;
    if (this.isVisibleLogin) this.isVisibleRegister = false;
  }

  onBackdropClick(event: MouseEvent): void {
    this.isVisibleRegister = false;
    this.isVisibleLogin = false;
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.router.navigate(['/hpage']);
  }
}

