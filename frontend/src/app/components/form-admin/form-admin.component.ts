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
  @Input() isVisible: boolean = false;
  @Input() formConfig: any;
  @Input() formData: any = {};

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
