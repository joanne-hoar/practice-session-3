import { Component, input, inject, computed } from '@angular/core';
import { ProductsDataService } from '../../services/products-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail-page',
  imports: [],
  templateUrl: './product-detail-page.html',
  styleUrl: './product-detail-page.css',
})
export class ProductDetailPage {
  // Route parameter automatically bound via withComponentInputBinding
  id = input<string>();

  productsService = inject(ProductsDataService);
  router = inject(Router);
  
  // Computed signal - automatically updates when id changes
  product = computed(() => {
    const productId = this.id();
    return productId ? this.productsService.getProductById(Number(productId)) : undefined;
  });

  // Navigate back to products page
  goBack() {
    this.router.navigate(['/products']);
  }
}
