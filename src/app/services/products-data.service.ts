import { Injectable, signal } from '@angular/core';
import { Product } from '../product';

@Injectable({
  providedIn: 'root', // Singleton service available app-wide
})
export class ProductsDataService {
  // Signal containing all product data - centralized data source
  // Using a signal makes this reactive: any component reading this
  // will automatically update if the products change
  products = signal<Product[]>([
    {
      id: 1,
      name: "Can of Beans",
      image: "can-of-beans.jpg"    
    },
    {
      id: 2,
      name: "Bag of Crisps",
      image: "bag-of-crisps.jpg"
    },
    {
      id: 3,
      name: "Gummy Bears",
      image: "gummy-bears.jpg"
    },
    {
      id: 4,
      name: "T-Shirt",
      image: "t-shirt.jpg"
    },
    {
      id: 5,
      name: "Hobo Bag",
      image: "hobo-bag.jpg"
    },
    {
      id: 6,
      name: "Shoes",
      image: "shoes.jpg",
    },
    {
      id: 7,
      name: "Shorts",
      image: "shorts.jpg"
    },
    {
      id: 8,
      name: "Postcard",
      image: "postcard.jpg"
    },
    {
      id: 9,
      name: "Pens",
      image: "pens.jpg"
    }
  ]);

  // Helper method to find a product by ID
  // Returns undefined if product not found (type-safe with optional chaining)
  getProductById(id: number): Product | undefined {
    return this.products().find(p => p.id === id);
  }
}
