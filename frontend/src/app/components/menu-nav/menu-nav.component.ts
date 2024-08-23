import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogInComponent } from '../../pages/log-in/log-in.component';
import { SignInComponent } from '../../pages/sign-in/sign-in.component';
import { CommonModule } from '@angular/common';

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
}
