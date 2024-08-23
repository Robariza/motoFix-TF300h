import { Component } from '@angular/core';
import { TableAdminComponent } from '../../components/table-admin/table-admin.component';

@Component({
  selector: 'app-admin-category',
  standalone: true,
  imports: [TableAdminComponent],
  templateUrl: './admin-category.component.html',
  styleUrl: './admin-category.component.css'
})
export class AdminCategoryComponent {

}
