import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { ProductsPage } from './pages/products-page/products-page';
import { ViewCartPage } from './pages/view-cart-page/view-cart-page';
import { ProductDetailPage } from './pages/product-detail-page/product-detail-page';

// Route configuration: Maps URLs to components
export const routes: Routes = [
  // Redirect empty path to /home
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  
  // Route definitions
  { path: 'home', component: HomePage },
  { path: 'products', component: ProductsPage },
  { path: 'products/:id', component: ProductDetailPage },  // Route parameter :id
  { path: 'cart', component: ViewCartPage }
];