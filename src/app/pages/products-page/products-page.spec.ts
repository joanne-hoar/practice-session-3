import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsPage } from './products-page';
import { CartService } from '../../services/cart-service';
import { ProductsDataService } from '../../services/products-data.service';

describe('ProductsPage', () => {
  let component: ProductsPage;
  let fixture: ComponentFixture<ProductsPage>;
  let cartService: CartService;
  let productsDataService: ProductsDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsPage);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    productsDataService = TestBed.inject(ProductsDataService);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have access to products from data service', () => {
    expect(component.productsDataService.products().length).toBeGreaterThan(0);
  });

  it('should add product to cart when receiveAddToCart is called', () => {
    const initialCount = cartService.itemCount();
    const productId = productsDataService.products()[0].id;
    
    component.receiveAddToCart(productId);
    
    expect(cartService.itemCount()).toBe(initialCount + 1);
  });

  it('should not crash when adding non-existent product', () => {
    const initialCount = cartService.itemCount();
    
    component.receiveAddToCart(999);
    
    expect(cartService.itemCount()).toBe(initialCount);
  });
});
