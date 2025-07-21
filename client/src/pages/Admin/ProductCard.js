import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.photo}
          alt={product.name}
          className="product-image"
        />
      </div>
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-info">💰 Price: ₹{product.price}</p>
        <p className="product-info">📦 Category: {product.category}</p>
        <p className="product-info">📊 Quantity: {product.quantity}</p>
      </div>
      <div className="product-actions">
        <button className="btn edit-btn" onClick={onEdit}>
          ✏️ Edit Details
        </button>
        <button className="btn delete-btn" onClick={onDelete}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
