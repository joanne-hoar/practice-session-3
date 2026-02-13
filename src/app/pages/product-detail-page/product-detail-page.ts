
import { Component, input, inject, computed } from '@angular/core';
import { ProductsDataService } from '../../services/products-data.service';
import { Router } from '@angular/router';
import { ProductCard } from '../../product-card/product-card';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [ProductCard],
  templateUrl: './product-detail-page.html',
  styleUrl: './product-detail-page.css',
})
export class ProductDetailPage {
  // Route parameter automatically bound via withComponentInputBinding
  id = input<string>();

  productsService = inject(ProductsDataService);
  cartService = inject(CartService);
  router = inject(Router);
  
  // Computed signal - automatically updates when id changes
  product = computed(() => {
    const productId = this.id();
    return productId ? this.productsService.getProductById(Number(productId)) : undefined;
  });

  // Add to cart handler for product-card
  addToCart(id: number) {
    const product = this.productsService.getProductById(id);
    if (product) {
      this.cartService.addToCart(product);
    }
  }

  // Navigate back to products page
  goBack() {
    this.router.navigate(['/products']);
  }
}
