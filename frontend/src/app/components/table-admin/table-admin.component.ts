import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormAdminComponent } from '../form-admin/form-admin.component';

export interface TableItem {
  [key: string]: any; 
}

@Component({
  selector: 'app-table-admin',
  standalone: true,
  imports: [CommonModule, FormAdminComponent],
  templateUrl: './table-admin.component.html',
  styleUrls: ['./table-admin.component.css']
})
export class TableAdminComponent {
  @Input() data: TableItem[] = [];
  @Input() headers: string[] = [];
  @Output() edit = new EventEmitter<TableItem>();
  @Output() delete = new EventEmitter<TableItem>();

  isFormVisible = false;
  formConfig: any = {};
  formData: any = {};

  onEdit(item: TableItem): void {
    this.edit.emit(item);
  }

  onDelete(item: TableItem): void {
    this.delete.emit(item);
  }

  openFormModal(): void {
    this.isFormVisible = true;
  }

  closeFormModal(): void {
    this.isFormVisible = false;
  }

  handleSave(data: any): void {
    this.data.push(data); 
    this.closeFormModal();
  }
}
