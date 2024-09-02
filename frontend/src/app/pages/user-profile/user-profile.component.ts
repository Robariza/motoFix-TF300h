import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../interfaces/order';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  user: User | null = null;  // Inicializa como null para manejar carga
  orders: Order[] = [
    { id: 'ORD001', date: new Date('2023-05-15'), total: 99.99, status: 'Entregado' },
    { id: 'ORD002', date: new Date('2023-06-01'), total: 149.99, status: 'Enviado' },
    { id: 'ORD003', date: new Date('2023-06-10'), total: 79.99, status: 'Pendiente' }
  ];

  constructor(private userService: UserService) { } // Inyecta el servicio

  ngOnInit(): void {
    this.loadUserProfile();  // Carga el perfil del usuario al iniciar
  }

  loadUserProfile(): void {
    this.userService.getUserProfile().subscribe(
      (user) => {
        this.user = user;  // Asigna el usuario obtenido
      },
      (error) => {
        console.error('Error al cargar el perfil del usuario', error);
      }
    );
  }

  getFullName(): string {
    if (this.user?.firstName && this.user?.lastName) {
      return `${this.user.firstName} ${this.user.lastName}`;
    } else if (this.user?.firstName) {
      return this.user.firstName;
    } else if (this.user?.lastName) {
      return this.user.lastName;
    } else {
      return 'N/A';
    }
  }
}