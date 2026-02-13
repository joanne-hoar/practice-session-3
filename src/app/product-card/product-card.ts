import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../product';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})

export class ProductCard {
  @Input() product!: Product;
  // Optional inputs for flexible display
  @Input() showLink = true;          // Show link to detail page?
  @Input() showAddButton = true;     // Show add to cart button?
  @Input() showDescription = false;  // Show full description?

  @Output() addToCartEvent = new EventEmitter<number>();

  onAddToCart() {
    this.addToCartEvent.emit(this.product.id);
  }
}

