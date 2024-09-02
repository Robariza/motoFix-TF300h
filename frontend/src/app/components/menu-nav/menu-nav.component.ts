import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./menu-nav.component.css']
})
export class MenuNavComponent implements OnInit {
  isVisibleRegister = false;
  isVisibleLogin = false;
  isAuthenticated = false;
  isAdmin = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getToken().subscribe(token => {
      this.isAuthenticated = !!token;
    });

    this.authService.getUserRole().subscribe(role => {
      this.isAdmin = role === 'admin';
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
    this.isAdmin = false;
    this.router.navigate(['/hpage']);
  }
}