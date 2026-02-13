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
      image: "can-of-beans.jpg",
      description: "Full of magical moments, this can of beans could be yours!"
    },
    {
      id: 2,
      name: "Bag of Crisps",
      image: "bag-of-crisps.jpg",
      description: "That should say chips. Any flavour you want."
    },
    {
      id: 3,
      name: "Gummy Bears",
      image: "gummy-bears.jpg",
      description: "Be sure to specify quantity as we have too many and will send you a lot."
    },
    {
      id: 4,
      name: "T-Shirt",
      image: "t-shirt.jpg",
      description: "Wear this t-shirt and you will have good luck. And, good look!"
    },
    {
      id: 5,
      name: "Hobo Bag",
      image: "hobo-bag.jpg",
      description: "Fits everything you need."
    },
    {
      id: 6,
      name: "Shoes",
      image: "shoes.jpg",
      description: "Shown one, comes in pairs."
    },
    {
      id: 7,
      name: "Shorts",
      image: "shorts.jpg",
      description: "Complete the look."
    },
    {
      id: 8,
      name: "Postcard",
      image: "postcard.jpg",
      description: "Writing to let them know that you're thinking of them."
    },
    {
      id: 9,
      name: "Pens",
      image: "pens.jpg",
      description: "Contains ink. For writing."
    }
  ]);

  // Helper method to find a product by ID
  // Returns undefined if product not found (type-safe with optional chaining)
  getProductById(id: number): Product | undefined {
    return this.products().find(p => p.id === id);
  }
}
