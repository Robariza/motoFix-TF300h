import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/products';
import { Category } from '../../interfaces/category';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  form: FormGroup;
  showModal = false;
  products: Product[] = [];
  selectedProductId: string | null = null;

  constructor(private fb: FormBuilder, private productsService: ProductsService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      stock: ['', Validators.required],
      images: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getProducts().subscribe(data => this.products = data);
  }

  openModal(product?: Product) {
    if (product) {
      this.selectedProductId = product._id;
      this.form.patchValue(product);
    } else {
      this.selectedProductId = null;
      this.form.reset();
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;
      if (this.selectedProductId) {
        // Editar producto
        this.productsService.updateProductById(this.selectedProductId, formValue).subscribe(() => {
          this.loadProducts();
          this.closeModal();
        });
      } else {
        // Crear nuevo producto
        this.productsService.createProduct(formValue).subscribe(() => {
          this.loadProducts();
          this.closeModal();
        });
      }
    }
  }

  deleteProduct(id: string) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.productsService.deleteProductById(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }
}