import { Component, OnInit } from '@angular/core';
import { QuantityInputComponent } from '../../components/quantity-input/quantity-input.component';
import { ActivatedRoute } from '@angular/router'; 
import { ProductsService } from '../../services/products.service'; 
import { Product } from '../../interfaces/products';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports:[QuantityInputComponent, CommonModule],
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  product: Product | undefined; // Variable de tipo `Product` para almacenar los detalles

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID del producto:', id); // Verifica si se obtiene el ID
    if (id) {
      this.productsService.getProductById(id).subscribe((product: Product) => {
        this.product = product; // Asigna el producto a la variable
        console.log('Producto obtenido:', this.product); // Verifica si se obtiene el producto
      });
    }
  }
}
