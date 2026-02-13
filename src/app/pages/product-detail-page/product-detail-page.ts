
import { Component, input, inject, computed } from '@angular/core';
import { ProductsDataService } from '../../services/products-data.service';
import { Router } from '@angular/router';
import { ProductCard } from '../../product-card/product-card';
import { CartService } from '../../services/cart-service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [ProductCard, ReactiveFormsModule],
  templateUrl: './product-detail-page.html',
  styleUrl: './product-detail-page.css',
})
export class ProductDetailPage {
  // Route parameter automatically bound via withComponentInputBinding
  id = input<string>();

  productsService = inject(ProductsDataService);
  cartService = inject(CartService);
  router = inject(Router);
  fb = inject(FormBuilder);
  
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

  // Review form setup
  reviewForm: FormGroup = this.fb.group({
    reviewerName: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z ]+$')
    ]],
    rating: ['', [
      Validators.required,
      Validators.min(1),
      Validators.max(5)
    ]]
  });

  onSubmitReview() {
    if (this.reviewForm.valid) {
      // In a real app, submit to backend here
      console.log('Review submitted:', this.reviewForm.value);
      alert('Thank you for your review!');
      this.reviewForm.reset();
    }
  }

  // Navigate back to products page
  goBack() {
    this.router.navigate(['/products']);
  }
}
