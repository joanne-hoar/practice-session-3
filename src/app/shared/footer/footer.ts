import { Component } from '@angular/core';
import { VERSION } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  // Angular version information
  angularVersion = VERSION.full;
}
