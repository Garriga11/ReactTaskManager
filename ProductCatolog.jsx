import React, { useState, useEffect } from "react";
import axios from "axios";


const ProductCard = ({ product }) => {
  const [viewDetails, setViewDetails] = useState(false);

  const toggleDetails = () => setViewDetails(!viewDetails);

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} width={100} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <p>{product.category}</p>
      <button onClick={toggleDetails}>
        {viewDetails ? "Hide Details" : "View Details"}
      </button>
      {viewDetails && <p>{product.description}</p>}
    </div>
  );
};

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortByPrice, setSortByPrice] = useState("low");

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products", err);
        setLoading(false);
      });
  }, []);

  // Filter products by category
  const filteredProducts = products.filter(
    (product) =>
      categoryFilter === "all" || product.category === categoryFilter
  );

  // Sort products by price
  const sortedProducts = [...filteredProducts].sort((a, b) =>
    sortByPrice === "low" ? a.price - b.price : b.price - a.price
  );

  return (
    <div>
      <h1>Product Catalog</h1>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <>
          <div>
            <label>Category: </label>
            <select onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelery</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
            </select>
          </div>

          <div>
            <label>Sort by Price: </label>
            <select onChange={(e) => setSortByPrice(e.target.value)}>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
            </select>
          </div>

          <div>
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCatalog;

