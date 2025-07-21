import React from "react";
import { useCartContext } from "../context/CartContext";
import './AddToCart.css'

const AddToCart = ({ product }) => {
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCartContext();
  const item = cart[product._id];

  return (
    <div className="add-to-cart-container">
      {item ? (
        <>
          <button className="add-to-cart" onClick={() => decreaseQuantity(product._id)}>-</button>
          <span className="quantity-count">{item.quantity}</span>
          <button className="add-to-cart" onClick={() => increaseQuantity(product._id)}>+</button>
        </>
      ) : (
        <button className="add-to-cart" onClick={() => addToCart(product)}>Add to Cart</button>
      )}
    </div>
  );
};

export default AddToCart;
