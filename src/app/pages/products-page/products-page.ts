
import { Component, inject, signal, computed } from '@angular/core';
import { ProductCard } from '../../product-card/product-card';
import { CartService } from '../../services/cart-service';
import { ProductsDataService } from '../../services/products-data.service';
import { SearchForm } from '../../search-form/search-form';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [ProductCard, SearchForm],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
})
export class ProductsPage {
  cartService = inject(CartService);
  productsDataService = inject(ProductsDataService);
  searchQuery = signal('');

  filteredProducts = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) {
      return this.productsDataService.products();
    }
    return this.productsDataService.products().filter(p => 
      p.name.toLowerCase().includes(query) ||
      (p.description?.toLowerCase().includes(query) ?? false)
    );
  });

  receiveAddToCart(id: number) {
    const product = this.productsDataService.getProductById(id);
    if (product) {
      this.cartService.addToCart(product);
    }
  }

  onSearchChange(query: string) {
    this.searchQuery.set(query);
  }
}
