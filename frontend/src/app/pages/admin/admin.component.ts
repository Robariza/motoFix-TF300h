import { Component } from '@angular/core';
import { TableAdminComponent } from '../../components/table-admin/table-admin.component';
import { FormAdminComponent } from "../../components/form-admin/form-admin.component";
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [TableAdminComponent, FormAdminComponent, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
}