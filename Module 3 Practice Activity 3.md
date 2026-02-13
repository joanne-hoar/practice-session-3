---

# Front End Frameworks: Module 3: Practice Activity 3

## React Form Validation and Routing

### Learning Objective

- Demonstrate client-side form validation in React
- Navigate between pages using React Router

### Prerequisites

- Complete Module 2 Practice Activities (React products page and cart)

---

## Step 1: Add Order Form to Products Page

When the user clicks the submit button on the products page, navigate to an order form page.

In your products page, add a button to submit the cart and navigate to `/order`.

---

## Step 2: Create Order Form Component

Create `src/components/OrderForm.jsx`:

```jsx
import { useState } from 'react';

function OrderForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', country: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = 'Name required';
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) errs.email = 'Invalid email';
    if (!form.phone.match(/^\d{10}$/)) errs.phone = '10 digits required';
    if (!form.address) errs.address = 'Address required';
    if (form.country !== 'Canada') errs.country = 'Must select Canada';
    return errs;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Render fields and error messages */}
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      {errors.name && <span>{errors.name}</span>}
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      {errors.email && <span>{errors.email}</span>}
      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
      {errors.phone && <span>{errors.phone}</span>}
      <input name="address" value={form.address} onChange={handleChange} placeholder="Address" />
      {errors.address && <span>{errors.address}</span>}
      <select name="country" value={form.country} onChange={handleChange}>
        <option value="">Select Country</option>
        <option value="Canada">Canada</option>
        <option value="United States">United States</option>
      </select>
      {errors.country && <span>{errors.country}</span>}
      <button type="submit" disabled={Object.keys(validate()).length > 0}>Submit</button>
    </form>
  );
}

export default OrderForm;
```

---

## Step 3: Display Order Summary

After successful submission, display a summary of the products ordered and delivery details.

Create `src/components/OrderSummary.jsx`:

```jsx
function OrderSummary({ cart, details }) {
  return (
    <div>
      <h2>Order Summary</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>{item.name} x {item.quantity}</li>
        ))}
      </ul>
      <h3>Delivery Details:</h3>
      <pre>{JSON.stringify(details, null, 2)}</pre>
    </div>
  );
}

export default OrderSummary;
```

---

## Step 4: Routing Between Products, Order Form, and Order Summary


Use React Router to navigate between the products page, order form, and order summary. Here is a sample setup:

### Set up routes in your main App component:

```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './components/Products';
import OrderForm from './components/OrderForm';
import OrderSummary from './components/OrderSummary';

function App() {
  const [cart, setCart] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/products" element={<Products cart={cart} setCart={setCart} />} />
        <Route path="/order" element={<OrderForm onSubmit={setOrderDetails} />} />
        <Route path="/summary" element={<OrderSummary cart={cart} details={orderDetails} />} />
      </Routes>
    </Router>
  );
}
```

---

### Navigate between pages using React Router's `useNavigate` hook

In your Products page, after submitting the cart, navigate to `/order`:

```jsx
import { useNavigate } from 'react-router-dom';

function Products({ cart, setCart }) {
  const navigate = useNavigate();
  // ...product logic...
  return (
    <button onClick={() => navigate('/order')}>Checkout</button>
  );
}
```

In your OrderForm, after successful submission, navigate to `/summary`:

```jsx
import { useNavigate } from 'react-router-dom';

function OrderForm({ onSubmit }) {
  const navigate = useNavigate();
  // ...form logic...
  const handleSubmit = e => {
    e.preventDefault();
    // ...validation logic...
    if (formIsValid) {
      onSubmit(form);
      navigate('/summary');
    }
  };
  // ...
}
```

This setup ensures smooth navigation between the products page, order form, and order summary.

---

## Bonus

Explore and implement [Formik](https://formik.org/) or [Yup](https://github.com/jquense/yup) for enhanced form management and validation.

---

## Next Steps

Congratulations, you thoroughly understand React form validation and routing! This is not required for Assignment 3.