import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError, of } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../interfaces/category';

@Component({
  selector: 'app-admin-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-category.component.html',
  styleUrl: './admin-category.component.css'
})
export class AdminCategoryComponent implements OnInit {
  form: FormGroup;
  showModal = false;
  categories: Category[] = [];
  editingCategoryId: string | null = null;

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit() {
    this.loadCategories();
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.form.reset();
    this.editingCategoryId = null;
  }

  onSubmit() {
    if (this.form.valid) {
      const request$ = this.editingCategoryId
        ? this.categoryService.updateCategory(this.editingCategoryId, this.form.value)
        : this.categoryService.createCategory(this.form.value);

      request$.pipe(
        catchError(error => {
          // Manejo del error
          console.error('Error en la solicitud:', error);
          alert('Ocurrió un error. Por favor, intente de nuevo.');
          return of(null); // Retorna un observable vacío para continuar la cadena
        })
      ).subscribe(() => {
        this.loadCategories();
        this.closeModal();
      });
    }
  }

  loadCategories() {
    this.categoryService.getAllCategories().pipe(
      catchError(error => {
        // Manejo del error
        console.error('Error al cargar categorías:', error);
        alert('Ocurrió un error al cargar las categorías.');
        return of([]); // Retorna un array vacío en caso de error
      })
    ).subscribe(categories => this.categories = categories);
  }

  editCategory(category: Category) {
    this.editingCategoryId = category._id;
    this.form.patchValue({
      name: category.name,
      description: category.description
    });
    this.openModal();
  }

  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id).pipe(
      catchError(error => {
        // Manejo del error
        console.error('Error al eliminar la categoría:', error);
        alert('Ocurrió un error al eliminar la categoría.');
        return of(null); // Retorna un observable vacío para continuar la cadena
      })
    ).subscribe(() => this.loadCategories());
  }
}