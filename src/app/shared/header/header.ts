import { Component, Input, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  // @Input: Receives the title text from parent component (App)
  @Input() title!: string;
  
  // Inject cart service to display live cart count in navigation
  // The computed signal itemCount() will automatically update the UI
  cartService = inject(CartService);
}
