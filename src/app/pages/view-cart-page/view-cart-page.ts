import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { ProductCard } from '../../product-card/product-card';

@Component({
  selector: 'app-view-cart-page',
  imports: [ProductCard],
  templateUrl: './view-cart-page.html',
  styleUrl: './view-cart-page.css'
})
export class ViewCartPage {
  // Inject the cart service to access and modify cart state
  cartService = inject(CartService);

  // Remove a specific item by its index in the cart array
  removeItem(index: number): void {
    this.cartService.removeFromCart(index);
  }

  // Clear all items with user confirmation
  // Uses native browser confirm dialog for simplicity
  clearAll(): void {
    if (confirm('Remove all items from cart?')) {
      this.cartService.clearCart();
    }
  }
}
