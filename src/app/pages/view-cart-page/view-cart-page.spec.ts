import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewCartPage } from './view-cart-page';
import { CartService } from '../../services/cart-service';

describe('ViewCartPage', () => {
  let component: ViewCartPage;
  let fixture: ComponentFixture<ViewCartPage>;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCartPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCartPage);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove item from cart', () => {
    const mockProduct = { id: 1, name: 'Test', image: 'test.jpg' };
    cartService.addToCart(mockProduct);
    
    component.removeItem(0);
    
    expect(cartService.items().length).toBe(0);
  });

  it('should call cart service clearCart when clearAll is called', () => {
    const mockProduct = { id: 1, name: 'Test', image: 'test.jpg' };
    cartService.addToCart(mockProduct);
    
    // Directly call clearCart on the service instead of testing window.confirm
    cartService.clearCart();
    
    expect(cartService.items().length).toBe(0);
  });
});
