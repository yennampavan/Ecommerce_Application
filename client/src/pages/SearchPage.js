import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import ProductCard from "./ProductCard"; // adjust path if needed

const SearchPage = () => {
  const [values, setValues] = useSearch();

  return (
    <Layout title={"Search Results"}>
      <div className="container py-4">
        <div className="text-center mb-4">
          <h2>Search Results</h2>
          <p className="text-muted">
            {values?.results.length < 1
              ? "No products found"
              : `Found ${values?.results.length} product(s)`}
          </p>
        </div>

        <div className="d-flex flex-wrap justify-content-center gap-4">
          {values?.results.map((product) => (
            <ProductCard
              key={product._id}
              product={{
                ...product,
                image: `/api/v1/product/product-photo/${product._id}`,
              }}
              onAddToCart={() => {
                // handle add to cart logic here
                console.log("Add to cart clicked for", product.name);
              }}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
