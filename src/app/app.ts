import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer], // Standalone component imports
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Simple string property - no need for signal since this never changes
  title = 'Joanne\'s Market';
}
