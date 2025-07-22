import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import "./ProductDetails.css"; // Import CSS
import AddToCart from "../components/AddToCart";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="product-details-container">
        <div className="product-main">
          <div className="product-image">
            <img src={`/api/v1/product/product-photo/${product._id}`} alt={product.name} />
          </div>
          <div className="product-info">
            <h2>{product.name}</h2>
            <p className="description"><b>Product Description:</b>{product.description}</p>
            <p className="price">₹{product.price}</p>
            <p className="category"><b>Category: </b>{product?.category?.name}</p>
            <AddToCart product={product} />
            {/* <button className="add-to-cart-btn">Add to Cart</button> */}
          </div>
        </div>

        <div className="similar-products-section">
          <hr />
          <h2>Similar Products</h2>
          {relatedProducts.length < 1 ? (
            <p>No Similar Products Found</p>
          ) : (
            <div className="product-grid">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p._id}
                  product={{
                    ...p,
                    image: `/api/v1/product/product-photo/${p._id}`,
                  }}
                  onAddToCart={() => console.log("Add to cart:", p.name)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
