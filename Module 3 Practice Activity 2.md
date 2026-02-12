# Front End Frameworks: Module 3: Practice Activity 2

## Angular Reactive Forms with Custom Validation

### Learning Objectives
- Master Angular reactive forms and custom validators needed for Assignment 3
- Implement programmatic navigation after form submission
- Create custom validator functions for complex validation rules

### Prerequisites
- Complete Module 1 Practice Activities and Practice Activity 1

---

## Part 1: Add Product Review Form

Continue in your `practice-session` project. We'll add a review form to the product detail page to practice reactive forms and validation.

### Step 1: Understand the Goal

We'll create a form where users can submit product reviews with:
- Reviewer name (text validation)
- Email (email validation)
- Rating (number validation)
- Review text (length validation)

This demonstrates the **same concepts** you'll need for Assignment 3, but in a different context.

### Step 2: Make ProductCard Reusable (Optional Display Modes)

First, let's update ProductCard to support different display modes:

Update `product-card.ts`:

```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../product';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product!: Product;
  
  // Optional inputs for flexible display
  @Input() showLink = true;          // Show link to detail page?
  @Input() showAddButton = true;     // Show add to cart button?
  @Input() showDescription = false;  // Show full description?

  @Output() addToCartEvent = new EventEmitter<number>();

  onAddToCart() {
    this.addToCartEvent.emit(this.product.id);
  }
}
```

Update `product-card.html` to use conditional rendering:

```html
<div class="product-card">
  @if (showLink) {
    <a [routerLink]="['/products', product.id]" class="product-link">
      <img [src]="'assets/products/' + product.image" [alt]="product.name" />
      <h3>{{ product.name }}</h3>
    </a>
  } @else {
    <img [src]="'assets/products/' + product.image" [alt]="product.name" />
    <h3>{{ product.name }}</h3>
  }
  
  @if (showDescription && product.description) {
    <p class="description">{{ product.description }}</p>
  }
  
  @if (showAddButton) {
    <button class="add-btn" (click)="onAddToCart()">Add to Cart</button>
  }
</div>
```

### Step 3: Reuse ProductCard in Product Detail

Now update `product-detail.ts` to use ProductCard instead of duplicating markup:

```typescript
import { Component, input, inject, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product-service';
import { Router } from '@angular/router';
import { ProductCard } from '../../product-card/product-card';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [ReactiveFormsModule, ProductCard],  // Import ProductCard!
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail {
  id = input<string>();
  productService = inject(ProductService);
  router = inject(Router);
  fb = inject(FormBuilder);
  
  product = computed(() => {
    const productId = this.id();
    return productId ? this.productService.getProduct(Number(productId)) : undefined;
  });

  // Reactive form with multiple validators
  reviewForm: FormGroup = this.fb.group({
    reviewerName: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z ]+$')  // Only letters and spaces
    ]],
    email: ['', [
      Validators.required,
      Validators.email  // Built-in email validator
    ]],
    rating: ['', [
      Validators.required,
      Validators.min(1),
      Validators.max(5)
    ]],
    reviewText: ['', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(500)
    ]],
    wouldRecommend: [false, Validators.requiredTrue]
  });

  onSubmitReview() {
    if (this.reviewForm.valid) {
      console.log('Review submitted:', this.reviewForm.value);
      alert('Thank you for your review!');
      this.reviewForm.reset();
    }
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}
```

---

## Part 2: Create the Review Form Template

Update `product-detail.html` to include the product info AND the review form:

```html
<div class="product-detail-container">
  @if (product(); as prod) {
    <!-- Reuse ProductCard component with custom display options! -->
    <div class="product-info">
      <app-product-card 
        [product]="prod"
        [showLink]="false"
        [showAddButton]="false"
        [showDescription]="true"
      ></app-product-card>
      
      <p class="category"><strong>Category:</strong> {{ prod.category }}</p>
      <button (click)="goBack()">Back to Products</button>
    </div>

    <!-- Review Form Section -->
    <div class="review-section">
      <h2>Write a Review</h2>
      
      <form [formGroup]="reviewForm" (ngSubmit)="onSubmitReview()">
        
        <!-- Reviewer Name Field -->
        <div class="form-group">
          <label for="reviewerName">Your Name *</label>
          <input 
            id="reviewerName"
            type="text" 
            formControlName="reviewerName"
            placeholder="Enter your name"
            [class.invalid]="reviewForm.get('reviewerName')?.touched && reviewForm.get('reviewerName')?.invalid"
          />
          @if (reviewForm.get('reviewerName')?.touched && reviewForm.get('reviewerName')?.invalid) {
            <div class="error">
              @if (reviewForm.get('reviewerName')?.errors?.['required']) {
                <span>Name is required.</span>
              }
              @if (reviewForm.get('reviewerName')?.errors?.['minlength']) {
                <span>Name must be at least 3 characters.</span>
              }
              @if (reviewForm.get('reviewerName')?.errors?.['pattern']) {
                <span>Name can only contain letters and spaces.</span>
              }
            </div>
          }
        </div>

        <!-- Email Field -->
        <div class="form-group">
          <label for="email">Email *</label>
          <input 
            id="email"
            type="email" 
            formControlName="email"
            placeholder="your@email.com"
            [class.invalid]="reviewForm.get('email')?.touched && reviewForm.get('email')?.invalid"
          />
          @if (reviewForm.get('email')?.touched && reviewForm.get('email')?.invalid) {
            <div class="error">
              @if (reviewForm.get('email')?.errors?.['required']) {
                <span>Email is required.</span>
              }
              @if (reviewForm.get('email')?.errors?.['email']) {
                <span>Please enter a valid email address.</span>
              }
            </div>
          }
        </div>

        <!-- Rating Field -->
        <div class="form-group">
          <label for="rating">Rating (1-5) *</label>
          <input 
            id="rating"
            type="number" 
            formControlName="rating"
            min="1"
            max="5"
            placeholder="5"
            [class.invalid]="reviewForm.get('rating')?.touched && reviewForm.get('rating')?.invalid"
          />
          @if (reviewForm.get('rating')?.touched && reviewForm.get('rating')?.invalid) {
            <div class="error">
              @if (reviewForm.get('rating')?.errors?.['required']) {
                <span>Rating is required.</span>
              }
              @if (reviewForm.get('rating')?.errors?.['min'] || reviewForm.get('rating')?.errors?.['max']) {
                <span>Rating must be between 1 and 5.</span>
              }
            </div>
          }
        </div>

        <!-- Review Text Field -->
        <div class="form-group">
          <label for="reviewText">Your Review *</label>
          <textarea 
            id="reviewText"
            formControlName="reviewText"
            rows="5"
            placeholder="Share your thoughts about this product..."
            [class.invalid]="reviewForm.get('reviewText')?.touched && reviewForm.get('reviewText')?.invalid"
          ></textarea>
          @if (reviewForm.get('reviewText')?.touched && reviewForm.get('reviewText')?.invalid) {
            <div class="error">
              @if (reviewForm.get('reviewText')?.errors?.['required']) {
                <span>Review text is required.</span>
              }
              @if (reviewForm.get('reviewText')?.errors?.['minlength']) {
                <span>Review must be at least 10 characters.</span>
              }
              @if (reviewForm.get('reviewText')?.errors?.['maxlength']) {
                <span>Review cannot exceed 500 characters.</span>
              }
            </div>
          }
          <small>{{ reviewForm.get('reviewText')?.value?.length || 0 }}/500 characters</small>
        </div>

        <!-- Would Recommend Checkbox -->
        <div class="form-group checkbox-group">
          <label>
            <input 
              type="checkbox" 
              formControlName="wouldRecommend"
            />
            I would recommend this product *
          </label>
          @if (reviewForm.get('wouldRecommend')?.touched && reviewForm.get('wouldRecommend')?.invalid) {
            <div class="error">Please confirm you would recommend this product.</div>
          }
        </div>

        <!-- Submit Button -->
        <button 
          type="submit" 
          [disabled]="!reviewForm.valid"
        >
          Submit Review
        </button>
      </form>
    </div>
    
  } @else {
    <div class="error">
      <h2>Product Not Found</h2>
      <button (click)="goBack()">Back to Products</button>
    </div>
  }
</div>
```

---

## Part 3: Style the Form

Update `product-detail.css`:

```css
.register-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="date"],
select {
  width: 100%;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;
}

input:focus,
select:focus {
  outline: none;
  border-color: #4CAF50;
}

```css
.product-detail-container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
}

.product-info {
  text-align: center;
  margin-bottom: 40px;
}

/* ProductCard handles its own styling, we just add spacing */
.product-info app-product-card {
  display: block;
  margin-bottom: 20px;
}

.category {
  font-size: 14px;
  color: #666;
  margin: 10px 0;
}

.review-section {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  background: #f9f9f9;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input[type="text"],
input[type="email"],
input[type="number"],
textarea {
  width: 100%;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

input.invalid,
textarea.invalid {
  border-color: #ff4444;
}

textarea {
  resize: vertical;
  font-family: inherit;
}

small {
  color: #666;
  font-size: 12px;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  font-weight: normal;
}

.checkbox-group input[type="checkbox"] {
  width: auto;
  margin-right: 10px;
}

.error {
  color: #ff4444;
  font-size: 14px;
  margin-top: 5px;
}

button {
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

button[type="submit"] {
  width: 100%;
  background: #4CAF50;
  color: white;
  border: none;
}

button[type="submit"]:hover:not(:disabled) {
  background: #45a049;
}

button[type="submit"]:disabled {
  background: #cccccc;
  cursor: not-allowed;
}
```

---

## Part 4: Add Custom Validators

Now let's create custom validators for more complex validation rules.

### Step 1: Create Validators File

Create `src/app/validators/review-validators.ts`:

```typescript
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Custom validator to ensure rating is within valid range
 * More flexible than min/max for teaching purposes
 */
export function ratingRangeValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    
    const value = Number(control.value);
    
    if (value < min || value > max) {
      return { ratingRange: { min, max, actual: value } };
    }
    
    return null;
  };
}

/**
 * Custom validator for review text quality
 * Ensures review contains meaningful content (not just repeated characters)
 */
export function meaningfulTextValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    
    const text = control.value.trim();
    
    // Check if text is just repeated characters (e.g., "aaaaaaa")
    const repeatedChar = /^(.)\1+$/;
    if (repeatedChar.test(text)) {
      return { meaningfulText: true };
    }
    
    // Check if text has at least 2 unique words
    const words = text.split(/\s+/).filter((w: string) => w.length > 0);
    const uniqueWords = new Set(words);
    
    if (uniqueWords.size < 2) {
      return { meaningfulText: true };
    }
    
    return null;
  };
}

/**
 * Custom validator to check for profanity or inappropriate content
 * Simplified version for teaching purposes
 */
export function noProfanityValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    
    // Simple list of words to block (extend as needed)
    const blockedWords = ['spam', 'fake', 'scam'];
    const text = control.value.toLowerCase();
    
    for (const word of blockedWords) {
      if (text.includes(word)) {
        return { profanity: true };
      }
    }
    
    return null;
  };
```

### Step 2: Use Custom Validators in the Review Form

Update `product-detail.ts` to import and use custom validators:

```typescript
import { Component, input, inject, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product-service';
import { Router } from '@angular/router';
import { ratingRangeValidator, meaningfulTextValidator, noProfanityValidator } from '../../validators/review-validators';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})

  registrationForm: FormGroup = this.fb.group({
    name: ['', [
      Validators.required, 
      Validators.minLength(5), 
      Validators.pattern('^[a-zA-Z ]+$')
    ]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [
      Validators.required, 
      phoneValidator()  // Custom validator
    ]],
    dateOfBirth: ['', [
      Validators.required,
      minimumAgeValidator(18)  // Custom validator with parameter
    ]],
    address: ['', [
      Validators.required,
      addressValidator()  // Custom validator
    ]],
    province: ['', Validators.required],
    country: ['', [
      Validators.required,
      canadaOnlyValidator()  // Custom validator
    ]],
    acceptTerms: [false, Validators.requiredTrue]
  });

  provinces = [
    'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
    'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia',
    'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon'
  ];

  countries = ['Canada', 'United States'];

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Form submitted:', this.registrationForm.value);
      
      // Navigate to products page
      this.router.navigate(['/products']);
    }
  }
}
```

### Step 3: Update Template to Show Custom Validator Errors

Update the relevant sections in `register-page.html`:

```html
<!-- Phone Field - Updated -->
<div class="form-group">
  <label for="phone">Phone Number *</label>
  <input 
    id="phone"
    type="tel" 
    formControlName="phone"
    placeholder="1234567890"
    [class.invalid]="registrationForm.get('phone')?.touched && registrationForm.get('phone')?.invalid"
  />
  @if (registrationForm.get('phone')?.touched && registrationForm.get('phone')?.invalid) {
    <div class="error">
      @if (registrationForm.get('phone')?.errors?.['required']) {
        <span>Phone number is required.</span>
      }
      @if (registrationForm.get('phone')?.errors?.['invalidPhone']) {
        <span>Phone must be exactly 10 digits.</span>
      }
    </div>
  }
</div>

<!-- Date of Birth - Updated -->
<div class="form-group">
  <label for="dateOfBirth">Date of Birth *</label>
  <input 
    id="dateOfBirth"
    type="date" 
    formControlName="dateOfBirth"
    [class.invalid]="registrationForm.get('dateOfBirth')?.touched && registrationForm.get('dateOfBirth')?.invalid"
  />
  @if (registrationForm.get('dateOfBirth')?.touched && registrationForm.get('dateOfBirth')?.invalid) {
    <div class="error">
      @if (registrationForm.get('dateOfBirth')?.errors?.['required']) {
        <span>Date of birth is required.</span>
      }
      @if (registrationForm.get('dateOfBirth')?.errors?.['minimumAge']) {
        <span>You must be at least 18 years old to register.</span>
      }
    </div>
  }
</div>

<!-- Address - Updated -->
<div class="form-group">
  <label for="address">Street Address *</label>
  <input 
    id="address"
    type="text" 
    formControlName="address"
    placeholder="123 Main St"
    [class.invalid]="registrationForm.get('address')?.touched && registrationForm.get('address')?.invalid"
  />
  @if (registrationForm.get('address')?.touched && registrationForm.get('address')?.invalid) {
    <div class="error">
      @if (registrationForm.get('address')?.errors?.['required']) {
        <span>Address is required.</span>
      }
      @if (registrationForm.get('address')?.errors?.['invalidAddress']) {
        <span>Address can only contain letters, numbers, and spaces.</span>
      }
    </div>
  }
</div>

<!-- Country - Updated -->
<div class="form-group">
  <label for="country">Country *</label>
  <select 
    id="country"
    formControlName="country"
    [class.invalid]="registrationForm.get('country')?.touched && registrationForm.get('country')?.invalid"
  >
    <option value="">Select a country</option>
    @for (ctry of countries; track ctry) {
      <option [value]="ctry">{{ ctry }}</option>
    }
  </select>
  @if (registrationForm.get('country')?.touched && registrationForm.get('country')?.invalid) {
    <div class="error">
      @if (registrationForm.get('country')?.errors?.['required']) {
        <span>Country is required.</span>
      }
      @if (registrationForm.get('country')?.errors?.['canadaOnly']) {
        <span>Only Canadian addresses are accepted at this time.</span>
      }
    </div>
  }
</div>

<!-- Submit Button - Simplified -->
<button 
  type="submit" 
  [disabled]="!registrationForm.valid"
>
  Submit Registration
</button>
```

---

## Part 5: Test Your Review Form

### Testing Checklist:

1. **Required Field Validation:**
   - Try submitting empty form → All fields should show errors when touched
   
2. **Reviewer Name Validation:**
   - Try "Jo" → Should fail (less than 3 characters)
   - Try "John123" → Should fail (contains numbers)
   - Try "John" → Should pass ✓

3 **Email Validation:**
   - Try "notanemail" → Should fail
   - Try "test@example.com" → Should pass ✓

4. **Rating Validation (Custom Validator):**
   - Try "0" → Should fail (below range)
   - Try "6" → Should fail (above range)
   - Try "3" → Should pass ✓

5. **Review Text Validation (Multiple Custom Validators):**
   - Try "aaaaaaa" → Should fail (repeated characters - meaningfulText validator)
   - Try "Good" → Should fail (less than 2 unique words - meaningfulText validator)
   - Try "This is spam" → Should fail (noProfanity validator)
   - Try "Great product! Highly recommend" → Should pass ✓

6. **Would Recommend Checkbox:**
   - Leave unchecked → Submit button disabled
   - Check it → Submit button enabled ✓

7. **Form Submission:**
   - Fill all fields correctly → Submit button should be enabled
   - Click submit → Form should reset and show success message

---

## Summary

In this practice activity, you learned:

✅ **Reactive Forms** - Using `FormBuilder` to create forms in a DIFFERENT context than the assignment  
✅ **Built-in Validators** - `required`, `email`, `min`, `max`, `minLength`, `maxLength`, `requiredTrue`  
✅ **Custom Validators** - Creating reusable validator functions  
✅ **Parameterized Validators** - Validators that accept arguments (like `ratingRangeValidator(1, 5)`)  
✅ **Multiple Validators** - Applying several validators to one field  
✅ **Visual Feedback** - Showing validation errors with modern `@if` syntax  
✅ **Conditional Button State** - Disabling submit until form is valid  
✅ **Form Reset** - Clearing form after successful submission  
✅ **Component Reusability** - Using ProductCard in different contexts with optional inputs  
✅ **Component Composition** - Combining components to build complex UIs  

**Key Concepts for Assignment 3:**
- Same reactive forms approach works for ANY form
- Custom validators are functions that return `ValidatorFn`
- Validators can be simple (no params) or parameterized
- Always check if value exists before validating
- Use modern `@if` syntax for error messages
- Reuse components by making them flexible with optional `@Input()` properties

---

**Next Steps:** Practice Activity 3 will cover client-side validation in React.