import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})

export class ProductCard {
  // @Input: Receives data from parent component
  // ! (definite assignment) tells TypeScript this will be set by Angular
  @Input() product!: Product; 

  // @Output: Sends events to parent component
  // EventEmitter<number> means this event will emit the product ID
  @Output() addToCartEvent = new EventEmitter<number>();

  // Triggered on button click - emits product ID to parent
  // This demonstrates child-to-parent communication pattern
  onAddToCart() {
    this.addToCartEvent.emit(this.product.id);
  }
}

