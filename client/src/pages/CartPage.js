import React from "react";
import { useCartContext } from "../context/CartContext";
import './CartPage.css';
import Layout from "../components/Layout/Layout";

const CartPage = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCartContext();

  const cartItems = Object.values(cart);

  const deliveryCharge = 50;
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalPayable = subtotal + deliveryCharge;

  return (
    <Layout>
    <div className="cart-page">
      <div className="cart-items">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div className="cart-item" key={item._id}>
              <img src={item.image} alt={item.title} />
              <div className="item-details">
                <h4>{item.title}</h4>
                <p>₹{item.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => decreaseQuantity(item._id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item._id)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item._id)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
        {cartItems.length > 0 && (
          <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
        )}
      </div>

      <div className="cart-summary">
        <h2>Summary</h2>
        <div className="summary-detail">
          <span>Items Total:</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-detail">
          <span>Delivery Charges:</span>
          <span>₹{deliveryCharge.toFixed(2)}</span>
        </div>
        <hr />
        <div className="summary-total">
          <strong>Total Payable:</strong>
          <strong>₹{totalPayable.toFixed(2)}</strong>
        </div>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
    </Layout>
  );
};

export default CartPage;
