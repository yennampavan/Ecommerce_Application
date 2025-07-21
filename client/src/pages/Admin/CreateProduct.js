import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./createproduct.css";

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState(null);
  const [id, setId] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  // Load single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      if (data?.success) {
        const p = data.product;
        setName(p.name);
        setId(p._id);
        setDescription(p.description);
        setPrice(p.price);
        setCategory(p.category._id);
        setQuantity(p.quantity);
        setShipping(p.shipping ? "1" : "0");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getSingleProduct();
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Dashboard - Create Product">
      <div className="admin-dashboard-container">
        <div className="admin-sidebar">
          <AdminMenu />
        </div>
        <div className="admin-main">
          <h2 className="page-title">Create Product</h2>
          <div className="form-container">
            {/* LEFT SIDE */}
            <div className="form-left">
              <select
                className="input-field"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                value={name}
                placeholder="Product Name"
                className="input-field"
                onChange={(e) => setName(e.target.value)}
              />

              <textarea
                value={description}
                placeholder="Product Description"
                className="input-field"
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="number"
                value={price}
                placeholder="Price"
                className="input-field"
                onChange={(e) => setPrice(e.target.value)}
              />

              <input
                type="number"
                value={quantity}
                placeholder="Quantity"
                className="input-field"
                onChange={(e) => setQuantity(e.target.value)}
              />

              <select
                className="input-field"
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}
              >
                <option value="">Shipping Available?</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>

              <button className="btn-create" onClick={handleUpdate}>
                Update Product
              </button>
            </div>

            {/* RIGHT SIDE */}
            <div className="form-right">
              <label className="upload-btn">
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
                {photo ? photo.name : "Upload Photo"}
              </label>
              { 
                photo?(
                  <>
                  <div className="preview-container">
                <img
                  src={
                    photo
                      ? URL.createObjectURL(photo)
                      : `/api/v1/product/product-photo/${id}`
                  }
                  alt="product-preview"
                  className="photo-preview"
                />
              </div>
                  </>
                ):(
                  <></>
                )
              }
              
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
