import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../interfaces/order';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  user: User = {
    _id: 'df4sd5f4sf45sdf5sd4f85sfsdf5s4f5s',
    username: 'johndoe',
    email: 'johndoe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St, Anytown, AN 12345',
    phone: '+1 (555) 123-4567'
  };

  orders: Order[] = [
    { id: 'ORD001', date: new Date('2023-05-15'), total: 99.99, status: 'Entregado' },
    { id: 'ORD002', date: new Date('2023-06-01'), total: 149.99, status: 'Enviado' },
    { id: 'ORD003', date: new Date('2023-06-10'), total: 79.99, status: 'Pendiente' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  getFullName(): string {
    if (this.user.firstName && this.user.lastName) {
      return `${this.user.firstName} ${this.user.lastName}`;
    } else if (this.user.firstName) {
      return this.user.firstName;
    } else if (this.user.lastName) {
      return this.user.lastName;
    } else {
      return 'N/A';
    }
  }
}