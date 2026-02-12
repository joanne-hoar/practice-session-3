import { TestBed } from '@angular/core/testing';
import { CartService } from './cart-service';
import { Product } from '../product';

describe('CartService', () => {
  let service: CartService;
  
  const mockProduct1: Product = {
    id: 1,
    name: 'Test Product 1',
    image: 'test1.jpg'
  };
  
  const mockProduct2: Product = {
    id: 2,
    name: 'Test Product 2',
    image: 'test2.jpg'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should start with an empty cart', () => {
    expect(service.items().length).toBe(0);
  });
  
  it('should add a product to the cart', () => {
    service.addToCart(mockProduct1);
    
    expect(service.items().length).toBe(1);
    expect(service.items()[0]).toEqual(mockProduct1);
  });
  
  it('should add the same product multiple times', () => {
    service.addToCart(mockProduct1);
    service.addToCart(mockProduct1);
    
    expect(service.items().length).toBe(2);
    expect(service.items()[0]).toEqual(mockProduct1);
    expect(service.items()[1]).toEqual(mockProduct1);
  });
  
  it('should add multiple different products', () => {
    service.addToCart(mockProduct1);
    service.addToCart(mockProduct2);
    
    expect(service.items().length).toBe(2);
    expect(service.items()[0]).toEqual(mockProduct1);
    expect(service.items()[1]).toEqual(mockProduct2);
  });

  it('should compute item count correctly', () => {
    expect(service.itemCount()).toBe(0);
    
    service.addToCart(mockProduct1);
    expect(service.itemCount()).toBe(1);
    
    service.addToCart(mockProduct2);
    expect(service.itemCount()).toBe(2);
  });

  it('should remove item from cart by index', () => {
    service.addToCart(mockProduct1);
    service.addToCart(mockProduct2);
    
    service.removeFromCart(0);
    
    expect(service.items().length).toBe(1);
    expect(service.items()[0]).toEqual(mockProduct2);
  });

  it('should clear all items from cart', () => {
    service.addToCart(mockProduct1);
    service.addToCart(mockProduct2);
    
    service.clearCart();
    
    expect(service.items().length).toBe(0);
    expect(service.itemCount()).toBe(0);
  });
});
