import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  form: FormGroup;
  showModal = false;
  items: any[] = [];
  editMode = false; // Controla si estamos en modo edición
  currentItem: any = null; // Guarda el administrador actualmente seleccionado para edición

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: [''],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
      // Agrega otros campos si es necesario
    });
  }

  ngOnInit() {
    this.loadItems();
  }

  openModal(item: any = null) {
    this.editMode = !!item;
    this.currentItem = item;
    if (this.editMode && this.currentItem) {
      this.form.patchValue({
        username: this.currentItem.username,
        password: '', // No mostramos la contraseña en el formulario, pero la puedes manejar si es necesario
        email: this.currentItem.email,
        role: this.currentItem.role
        // Agrega otros campos si es necesario
      });
    } else {
      this.form.reset(); // Reinicia el formulario para la creación de un nuevo administrador
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  loadItems() {
    this.adminService.getAllItems().subscribe({
      next: (data) => {
        this.items = data;
        console.log(data);
      },
      error: (err) => {
        console.error('Error al cargar los items:', err);
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      if (this.editMode && this.currentItem) {
        // Si estamos en modo edición, actualiza el administrador
        this.adminService.updateItemById(this.currentItem._id, formData).subscribe({
          next: (response) => {
            console.log('Administrador actualizado:', response);
            this.closeModal();
            this.loadItems();
          },
          error: (err) => {
            console.error('Error al actualizar el administrador:', err);
          }
        });
      } else {
        // Si estamos en modo creación, crea un nuevo administrador
        this.adminService.createItem(formData).subscribe({
          next: (response) => {
            console.log('Administrador creado:', response);
            this.closeModal();
            this.loadItems();
          },
          error: (err) => {
            console.error('Error al crear el administrador:', err);
          }
        });
      }
    }
  }

  editItem(item: any) {
    this.openModal(item);
  }

  deleteItem(id: string) {
    this.adminService.deleteItemById(id).subscribe({
      next: () => {
        console.log('Administrador eliminado');
        this.loadItems();
      },
      error: (err) => {
        console.error('Error al eliminar el administrador:', err);
      }
    });
  }
}