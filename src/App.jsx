import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

import Home from './Home';
import { CartProvider } from './context/CartContext';
import ErrorBoundary from './components/ErrorBoundary';
import Orders from './components/Orders';
import Invoice from './components/Invoice';

const initialOptions = {
  clientId: 'AfWYm6QC7jJgK6aNmSSPKagBpZzMOuc2qC6gOBYlIlGXme82YmuSQKqXH3wDUuJd5EOTr4KPgNUdEGGj',
  currency: 'USD',
  intent: 'capture',
};

function App() {
  return (
    <CartProvider>
      <PayPalScriptProvider options={initialOptions}>
        <Router>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<Invoice />} />

            </Routes>
          </ErrorBoundary>
        </Router>
      </PayPalScriptProvider>
    </CartProvider>
  );
}

export default App;