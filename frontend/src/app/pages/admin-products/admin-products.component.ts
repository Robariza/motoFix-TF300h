import { Component } from '@angular/core';
import { TableAdminComponent } from '../../components/table-admin/table-admin.component';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [ TableAdminComponent],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent {

}
