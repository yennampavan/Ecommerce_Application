import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import ProductCard from "./ProductCard";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  // Fetch all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  // Fetch all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      if (data?.success) {
        setProducts(data.products);
        setAllProducts(data.products);
      }
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  // Handle delete product
  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const { data } = await axios.delete(`/api/v1/product/delete-product/${productId}`);
        if (data?.success) {
          toast.success("Product deleted successfully");
          getAllProducts(); // refresh list
        } else {
          toast.error(data.message || "Failed to delete");
        }
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Something went wrong while deleting");
      }
    }
  };

  // Handle edit product
  const handleEdit = (slug) => {
    navigate(`/dashboard/admin/update-product/${slug}`);
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setSelectedCategory(selected);

    if (selected === "all") {
      setProducts(allProducts);
    } else {
      const filtered = allProducts.filter(
        (product) => product.category?.name === selected
      );
      setProducts(filtered);
    }
  };

  useEffect(() => {
    getAllCategories();
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="admin-dashboard-container">
        <div className="admin-sidebar">
          <AdminMenu />
        </div>
        <div className="admin-main">
          <div className="page-title">
            <h1>All Products</h1>
            
          </div>
          <select
              className="category-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c._id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>

          <div className="products-grid">
            {products.map((p) => (
              <ProductCard
                key={p._id}
                product={{
                  name: p.name,
                  price: p.price,
                  category: p.category?.name || "N/A",
                  quantity: p.quantity,
                  photo: `/api/v1/product/product-photo/${p._id}`,
                }}
                onEdit={() => handleEdit(p.slug)}
                onDelete={() => handleDelete(p._id)}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
