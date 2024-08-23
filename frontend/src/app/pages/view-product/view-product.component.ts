import { Component } from '@angular/core';
import { QuantityInputComponent } from "../../components/quantity-input/quantity-input.component";

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [QuantityInputComponent],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent {

}
