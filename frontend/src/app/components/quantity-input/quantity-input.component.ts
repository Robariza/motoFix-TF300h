import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quantity-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './quantity-input.component.html',
  styleUrl: './quantity-input.component.css'
})
export class QuantityInputComponent {
  // Almacena la cantidad actual
  quantity: number = 1;

  // Incrementa la cantidad en 1
  increment(){
    this.quantity++; // ++ -> operador que incrementa en 1 a la cantidad actual
  }

  // Método para decrementar la cantidad en 1
  // -> No permite que la cantidad sea menor que 1
  decrement(){
    if(this.quantity > 1){
      this.quantity--; // -- -> operador que resta en 1 a la cantidad actual
    }
  }
}
