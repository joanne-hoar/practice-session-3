import { TestBed } from '@angular/core/testing';
import { ProductsDataService } from './products-data.service';

describe('ProductsDataService', () => {
  let service: ProductsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have products', () => {
    expect(service.products().length).toBeGreaterThan(0);
  });

  it('should get product by id', () => {
    const product = service.getProductById(1);
    expect(product).toBeDefined();
    expect(product?.name).toBe('Can of Beans');
  });

  it('should return undefined for non-existent product', () => {
    const product = service.getProductById(999);
    expect(product).toBeUndefined();
  });
});
