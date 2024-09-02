import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/products';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$: Observable<Product[]> | undefined;

  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit() {
    this.products$ = this.productsService.getProducts();
  }

  // Método para manejar la selección de un producto
  viewProduct(id: string) {
    this.router.navigate(['/product', id]);
  }
}
