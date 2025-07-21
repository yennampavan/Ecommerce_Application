import React from "react";
import { useSearch } from "../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import "./SearchInput.css";
import './Layout/Header.css'

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
  <input
    type="text"
    className="search-input"
    placeholder="Search for products..."
    value={values.keyword}
    onChange={(e) => setValues({ ...values, keyword: e.target.value })}
  />
  <button type="submit" className="search-btn">🔍</button>
</form>

  );
};

export default SearchInput;
