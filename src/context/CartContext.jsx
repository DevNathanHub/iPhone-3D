import { createContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'iPhone 15 Pro',
      more: '/specs',
      color: 'Titanium Blue',
      price: '$0.03',
      quantity: 1,
      imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
      imageAlt: 'iPhone 15 Pro Image',
    },
   
  ]);
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, setCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;