import { Component, inject } from '@angular/core';
import { ProductCard } from '../../product-card/product-card';
import { CartService } from '../../services/cart-service';
import { ProductsDataService } from '../../services/products-data.service';

@Component({
  selector: 'app-products-page',
  imports: [ProductCard],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
})
export class ProductsPage {
  // inject() is the modern Angular 17+ way to inject dependencies
  cartService = inject(CartService);
  productsDataService = inject(ProductsDataService);

  // Event handler: Receives product ID from child ProductCard component
  receiveAddToCart(id: number) {
    const product = this.productsDataService.getProductById(id);
    if (product) {
      this.cartService.addToCart(product);
    }
  }
}
