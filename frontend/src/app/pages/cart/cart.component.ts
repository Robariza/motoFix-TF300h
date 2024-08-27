import { Component,OnInit } from '@angular/core';
import { CartItem } from '../../interfaces/cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  shippingCost: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  get subtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  get total(): number {
    return this.subtotal + this.shippingCost;
  }

  removeItem(item: CartItem): void {
    const index = this.cartItems.findIndex(cartItem => cartItem.product._id === item.product._id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }

  updateQuantity(item: CartItem, change: number): void {
    const updatedQuantity = item.quantity + change;
    if (updatedQuantity > 0) {
      item.quantity = updatedQuantity;
    } else if (updatedQuantity === 0) {
      this.removeItem(item);
    }
  }

  applyPromoCode(code: string): void {
    console.log(`Código promocional aplicado: ${code}`);
  }

  checkout(): void {}
}