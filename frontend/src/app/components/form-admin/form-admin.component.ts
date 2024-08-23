import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-admin',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, FormsModule],
  templateUrl: './form-admin.component.html',
  styleUrl: './form-admin.component.css'
})
export class FormAdminComponent {
  @Input() isVisible: boolean = false; // Verifica el nombre de la propiedad aquí
  @Input() formConfig: any; // Ajusta el tipo según la configuración de tu formulario
  @Input() formData: any = {}; // Cambia el tipo según la estructura de tus datos

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  submitForm(): void {
    this.save.emit(this.formData);
    this.closeModal();
  }

  closeModal(): void {
    this.close.emit();
  }
}
