import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import { toast } from 'react-toastify';
import './createCategory.css';

const CreateCategory = () => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-category');
      if (data?.success) setCategories(data.category);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load categories');
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // Handle create/update category
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        const { data } = await axios.put(`/api/v1/category/update-category/${editId}`, { name });
        if (data?.success) {
          toast.success('Category updated');
          setEditing(false);
          setEditId(null);
        } else {
          toast.error('Update failed');
        }
      } else {
        const { data } = await axios.post('/api/v1/category/create-category', { name });
        if (data?.success) {
          toast.success(`${name} created`);
        } else {
          toast.error(data.message);
        }
      }

      setName('');
      getAllCategories();
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  // Start edit mode
  const handleEdit = (id, currentName) => {
    setName(currentName);
    setEditId(id);
    setEditing(true);
  };

  // Delete category
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/api/v1/category/delete-category/${id}`);
      if (data?.success) {
        toast.success('Category deleted');
        getAllCategories();
      } else {
        toast.error('Failed to delete category');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error deleting category');
    }
  };

  return (
    <Layout>
      <div className="admin-dashboard-container">
        <div className="admin-sidebar">
          <AdminMenu />
        </div>
        <div className="admin-main">
          <h2>{editing ? 'Edit Category' : 'Manage Category'}</h2>

          <form className="category-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <button type="submit">{editing ? 'Update' : 'Submit'}</button>
            {editing && (
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setEditing(false);
                  setName('');
                  setEditId(null);
                }}
              >
                Cancel
              </button>
            )}
          </form>

          <table className="category-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((cat) => (
                <tr key={cat._id}>
                  <td>{cat.name}</td>
                  <td>
                    <button
                      className="btn edit-btn"
                      onClick={() => handleEdit(cat._id, cat.name)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn delete-btn"
                      onClick={() => handleDelete(cat._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
