
import { Component, output, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-form.html',
  styleUrl: './search-form.css',
})
export class SearchForm {
  searchQuery = model<string>('');
  searchChange = output<string>();

  onSearchChange() {
    this.searchChange.emit(this.searchQuery());
  }
}
