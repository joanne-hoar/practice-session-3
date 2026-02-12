import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../product';

@Injectable({
  providedIn: 'root', // Makes this service a singleton available throughout the app
})
export class CartService {
  // Signal: Reactive state that automatically updates the UI when changed
  items = signal<Product[]>([]);
  
  // Computed signal: Automatically recalculates when items() changes
  // More efficient than calling items().length directly in templates
  itemCount = computed(() => this.items().length);

  addToCart(product: Product): void {
    // Using spread operator [...] creates a new array (immutability)
    // This ensures Angular's change detection recognizes the update
    this.items.set([...this.items(), product]);
  }

  removeFromCart(index: number): void {
    // update() method provides current state and expects new state returned
    // filter() creates new array excluding item at specified index
    // Underscore (_) indicates we don't need the item value, just the index
    this.items.update(items => items.filter((_, i) => i !== index));
  }

  clearCart(): void {
    // Reset the signal to an empty array
    this.items.set([]);
  }
}
