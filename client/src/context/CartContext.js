import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  // const fetchcart= ()=>{
  //   const data= axios.get('/api/v1/cart/');
  // }
  // fetchcart();  
  // Add product to cart (with quantity 1 if not exists)
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart[product._id];
      if (existingItem) {
        return {
          ...prevCart,
          [product._id]: {
            ...existingItem,
            quantity: existingItem.quantity + 1,
          },
        };
      } else {
        return {
          ...prevCart,
          [product._id]: {
            ...product,
            quantity: 1,
          },
        };
      }
    });
  };

  // Increase quantity
  const increaseQuantity = (productId) => {
    setCart((prevCart) => {
      const item = prevCart[productId];
      if (!item) return prevCart;
      return {
        ...prevCart,
        [productId]: {
          ...item,
          quantity: item.quantity + 1,
        },
      };
    });
  };

  // Decrease quantity (if 1, remove it)
  const decreaseQuantity = (productId) => {
    setCart((prevCart) => {
      const item = prevCart[productId];
      if (!item) return prevCart;

      if (item.quantity === 1) {
        const { [productId]: _, ...rest } = prevCart;
        return rest;
      } else {
        return {
          ...prevCart,
          [productId]: {
            ...item,
            quantity: item.quantity - 1,
          },
        };
      }
    });
  };

  // Remove from cart completely
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const { [productId]: _, ...rest } = prevCart;
      return rest;
    });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
