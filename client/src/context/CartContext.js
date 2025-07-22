import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const token = JSON.parse(localStorage.getItem("auth"))?.token;
  console.log("Token:", token);

  // Fetch cart from server
  const fetchCart = async () => {
    try {
      // console.log(localStorage.getItem("token"));
      const { data } = await axios.get("/api/v1/cart/", {
      // headers: {
      //   Authorization: token,
      // },
    });
      const cartItems = data.cart || [];
      const formattedCart = {};
      cartItems.forEach((item) => {
        formattedCart[item.product._id] = {
          ...item.product,
          quantity: item.quantity,
        };
      });
      setCart(formattedCart);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  // Add product to cart
  const addToCart = async (product) => {
    try {
      await axios.post("/api/v1/cart/add", { productId: product._id });
      await fetchCart();
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  // Increase quantity
  const increaseQuantity = async (productId) => {
    try {
      await axios.post("/api/v1/cart/increase", { productId });
      await fetchCart();
    } catch (err) {
      console.error("Error increasing quantity:", err);
    }
  };

  // Decrease quantity
  const decreaseQuantity = async (productId) => {
    try {
      await axios.post("/api/v1/cart/decrease", { productId });
      await fetchCart();
    } catch (err) {
      console.error("Error decreasing quantity:", err);
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      await axios.post("/api/v1/cart/remove", { productId });
      await fetchCart();
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  useEffect(() => {
    fetchCart(); // fetch cart on component mount
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
