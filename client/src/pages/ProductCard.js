import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
import AddToCart from "../components/AddToCart";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    // Prevent navigation if "Add to Cart" button is clicked
    if (e.target.closest(".add-to-cart-btn-new")) return;
    navigate(`/product/${product.slug}`);
  };

  return (
    <div className="product-card-new" onClick={handleCardClick} style={{ cursor: "pointer" }}>
      <div className="product-image-new">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info-new">
        <h3 className="product-name-new">{product.name}</h3>
        <p className="product-price-new">₹{product.price}</p>

        <div className="add-to-cart-btn-new" onClick={(e) => e.stopPropagation()}>
          <AddToCart product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
