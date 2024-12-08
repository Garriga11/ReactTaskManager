import React, { useState } from "react";

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

export default ProductCard;