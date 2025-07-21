import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./CategoryProduct.css";

const CategoryProduct = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});

  useEffect(() => {
    if (params?.slug) getProductsByCategory();
  }, [params?.slug]);

  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="category-container">
        <h2 className="category-title">Category - {category?.name}</h2>
        <p className="result-count">{products?.length} result(s) found</p>
        <div className="category-product-grid">
          {products?.map((product) => (
            <ProductCard
              key={product._id}
              product={{
                ...product,
                image: `/api/v1/product/product-photo/${product._id}`,
              }}
              onAddToCart={() => console.log("Add to cart:", product.name)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
