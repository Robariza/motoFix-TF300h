import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  form: FormGroup;
  showModal = false;
  users: User[] = [];
  selectedUserId: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['user'],
      lastName: [''],
      address: [''],
      phone: ['']
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  openModal(user?: User) {
    if (user) {
      this.selectedUserId = user._id;
      this.form.patchValue(user);
      this.form.get('password')?.disable();
    } else {
      this.selectedUserId = null;
      this.form.reset({
        role: 'user'
      });
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.form.get('password')?.enable();
  }

  onSubmit() {
    if (this.form.valid) {
      const user: User = this.form.value;
      if (this.selectedUserId) {
        // Actualizar un usuario existente
        this.userService.updateUser(this.selectedUserId, user).subscribe(() => {
          this.loadUsers();
          this.closeModal();
        });
      } else {
        // Crear un nuevo usuario
        this.userService.createUser(user).subscribe(() => {
          this.loadUsers();
          this.closeModal();
        });
      }
    }
  }

  loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }
}