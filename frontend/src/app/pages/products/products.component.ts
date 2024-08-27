import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/products';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products$: Observable<Product[]> | undefined;

  constructor(private  productsService : ProductsService) {}

  ngOnInit() {
    // Obtiene la lista de productos cuando el componente se inicializa
    this.products$ = this.productsService.getProducts();
  }

}
