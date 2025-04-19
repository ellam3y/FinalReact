import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
// import { currency } from '../../../store';

export default function ProductItem({
  id,
  image,
  title,
  price,
  category,
  onAddToCart,
  onAddToWishlist,
}) {
  // Handle image source - accept both string and array formats
  const imageSource = Array.isArray(image) ? image[0] : image;

  // Product name could be title or name
  const productName = title || "منتج";

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent link navigation
    if (onAddToCart) {
      onAddToCart({ id, image, title, price, category });
    }
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault(); // Prevent link navigation
    if (onAddToWishlist) {
      onAddToWishlist({ id, image, title, price, category });
    }
  };

  return (
    <div className="card h-100 rounded-3 border-0 overflow-hidden shadow-sm">
      <Link to={`productCategory/${id}`} className="text-decoration-none">
        <div className="position-relative">
          <img
            src={
              imageSource ||
              "https://via.placeholder.com/300x300?text=صورة+المنتج"
            }
            alt={productName}
            className="card-img-top"
            style={{
              height: "220px",
              objectFit: "cover",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          />
          {category && (
            <span className="position-absolute top-0 end-0 bg-primary text-white m-2 py-1 px-2 rounded-pill fs-8">
              {category}
            </span>
          )}
        </div>

        <div className="card-body">
          <h5 className="card-title text-dark">{productName}</h5>
          <p className="card-text text-primary fw-bold">${price}</p>
        </div>
      </Link>

      <div className="card-footer bg-white border-0 d-flex justify-content-between">
        <button
          className="btn btn-sm btn-primary flex-grow-1 me-1"
          onClick={handleAddToCart}
        >
          إضافة للسلة
        </button>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={handleAddToWishlist}
        >
          <FaRegHeart />
        </button>
      </div>
    </div>
  );
}
