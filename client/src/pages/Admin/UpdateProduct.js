import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./createproduct.css";

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      const prod = data?.product;
      setName(prod.name);
      setId(prod._id);
      setDescription(prod.description);
      setPrice(prod.price);
      setCategory(prod.category._id);
      setQuantity(prod.quantity);
      setShipping(prod.shipping ? "1" : "0");
      setId(prod._id)
    } catch (err) {
      console.log(err);
      toast.error("Error getting product");
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      toast.error("Error loading categories");
    }
  };

  useEffect(() => {
    getAllCategory();
    getSingleProduct();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.put(`/api/v1/product/update-product/${id}`, productData);
      if (data?.success) {
        toast.success("Product updated successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
    // Handle delete product
  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const { data } = await axios.delete(`/api/v1/product/delete-product/${productId}`);
        if (data?.success) {
          toast.success("Product deleted successfully");
          navigate('/dashboard/admin/products');
        } else {
          toast.error(data.message || "Failed to delete");
        }
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Something went wrong while deleting");
      }
    }
  };

  return (
    <Layout title="Dashboard - Update Product">
      <div className="admin-dashboard-container">
        <div className="admin-sidebar">
          <AdminMenu />
        </div>
        <div className="admin-main">
          <h2 className="page-title">Update Product</h2>
          <div className="form-container">
            <div className="form-left">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                className="input-field"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option value="">Select a category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <label htmlFor="photo">Product Photo</label>
              <label htmlFor="photo" className="upload-btn">
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  hidden
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
                {photo ? photo.name : "Upload Photo"}
              </label>

              {photo ? (
                <div className="preview-container">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="preview"
                    className="photo-preview"
                  />
                </div>
              ) : (
                <div className="preview-container">
                  <img
                    src={`/api/v1/product/product-photo/${id}`}
                    alt="product"
                    className="photo-preview"
                  />
                </div>
              )}

              <label htmlFor="name">Product Name</label>
              <input
                id="name"
                type="text"
                value={name}
                placeholder="Write a name"
                className="input-field"
                onChange={(e) => setName(e.target.value)}
              />

              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                placeholder="Write a description"
                className="input-field"
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
              />

              <label htmlFor="price">Price (₹)</label>
              <input
                id="price"
                type="number"
                value={price}
                placeholder="Write a Price"
                className="input-field"
                onChange={(e) => setPrice(e.target.value)}
              />

              <label htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                type="number"
                value={quantity}
                placeholder="Write a Quantity"
                className="input-field"
                onChange={(e) => setQuantity(e.target.value)}
              />

              <label htmlFor="shipping">Shipping Available?</label>
              <select
                id="shipping"
                className="input-field"
                onChange={(e) => setShipping(e.target.value)}
                value={shipping}
              >
                <option value="">Select Shipping</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>

              <button className="btn-create" onClick={handleUpdate}>
                Update Product
              </button>
              <button className="btn-delete" onClick={()=>handleDelete(id)}>
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
