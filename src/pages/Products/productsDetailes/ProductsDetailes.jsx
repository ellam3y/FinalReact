import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCartStore } from "../../../Store/StoreCart";
import { useWishlistStore } from "../../../Store/StoreWishlist";
import { useGetProduct } from "../../../Store/StoreToGetProduct";
import {
  FaRegHeart,
  FaHeart,
  FaShoppingCart,
  FaMinus,
  FaPlus,
} from "react-icons/fa";

export default function ProductDetails() {
  // Get product ID from URL parameters
  const params = useParams();
  const productId = params.id || params.productId || params.productsId;

  // State management
  const [productData, setProductData] = useState(null);
  const [imageProduct, setImageProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  // Get stores from Zustand
  const { products } = useGetProduct();
  const { addToCart, cart } = useCartStore();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlistStore();

  // Get product data from products array
  const getProductData = () => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImageProduct(foundProduct.image[0]);

      // Check if product is in wishlist or cart
      setIsInWishlist(wishlist.some((item) => item._id === productId));
      setIsInCart(cart.some((item) => item._id === productId));
    }
  };

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (productData) {
      addToCart({ ...productData, quantity });
      setIsInCart(true);
    }
  };

  // Handle add/remove from wishlist
  const handleWishlist = () => {
    if (productData) {
      if (isInWishlist) {
        removeFromWishlist(productId);
        setIsInWishlist(false);
      } else {
        addToWishlist(productData);
        setIsInWishlist(true);
      }
    }
  };

  // Load product data on mount and when products or productId changes
  useEffect(() => {
    if (products.length > 0 && productId) {
      getProductData();
    }
  }, [products, productId, wishlist, cart]);

  // If no product data yet, show loading
  if (!productData) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5" dir="rtl">
      <div className="row g-4">
        {/* Product Images Section */}
        <div className="col-md-6">
          {/* Main product image */}
          <div className="position-relative mb-4 rounded shadow overflow-hidden">
            <img
              src={imageProduct}
              className="w-100 h-auto rounded"
              alt={productData.title}
              style={{ objectFit: "cover", maxHeight: "400px" }}
            />
          </div>

          {/* Thumbnail gallery */}
          <div className="d-flex flex-wrap gap-2 mb-3 justify-content-center">
            {productData.image.map((item, index) => (
              <div
                key={index}
                className={`border rounded p-1 ${
                  imageProduct === item ? "border-primary" : "border-secondary"
                }`}
                style={{ width: "70px", height: "70px" }}
              >
                <img
                  src={item}
                  alt={`${productData.title} - Image ${index + 1}`}
                  className="img-fluid rounded"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => setImageProduct(item)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="col-md-6">
          {/* Breadcrumb Navigation */}
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/" className="text-decoration-none">
                  الرئيسية
                </a>
              </li>
              <li className="breadcrumb-item">
                <a href="/productss" className="text-decoration-none">
                  المنتجات
                </a>
              </li>
              <li className="breadcrumb-item">
                <a
                  href={`/productss/productsCategory/${productData.category}`}
                  className="text-decoration-none"
                >
                  {productData.category}
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {productData.title}
              </li>
            </ol>
          </nav>

          {/* Product Title and Category */}
          <h1 className="fs-2 fw-bold mb-2">{productData.title}</h1>
          <span className="badge bg-primary mb-3">{productData.category}</span>

          {/* Product Price */}
          <p className="fs-3 text-success fw-bold mb-3">
            ${productData.price.toFixed(2)}
          </p>

          {/* Product Description */}
          <div className="mb-4">
            <p className="text-muted">{productData.description}</p>
          </div>

          {/* Product Specifications */}
          {productData.specifications && (
            <div className="mb-4">
              <h5 className="mb-2">المواصفات</h5>
              <table className="table table-bordered">
                <tbody>
                  {productData.specifications.map((spec, index) => (
                    <tr key={index}>
                      <th
                        scope="row"
                        className="bg-light"
                        style={{ width: "30%" }}
                      >
                        {spec.label}
                      </th>
                      <td>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="mb-4">
            <label htmlFor="quantity" className="form-label fw-bold">
              الكمية
            </label>
            <div className="input-group" style={{ width: "150px" }}>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                <FaMinus />
              </button>
              <input
                type="number"
                id="quantity"
                className="form-control text-center"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setQuantity(quantity + 1)}
              >
                <FaPlus />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="d-flex gap-2 mt-4">
            <button
              className="btn btn-primary px-4 py-2 flex-grow-1 d-flex align-items-center justify-content-center gap-2"
              onClick={handleAddToCart}
            >
              <FaShoppingCart />
              <span>
                {isInCart ? "تم الإضافة إلى السلة" : "إضافة إلى السلة"}
              </span>
            </button>
            <button
              className={`btn ${
                isInWishlist ? "btn-danger" : "btn-outline-danger"
              } px-3 py-2 d-flex align-items-center justify-content-center`}
              onClick={handleWishlist}
              aria-label={
                isInWishlist ? "إزالة من المفضلة" : "إضافة إلى المفضلة"
              }
            >
              {isInWishlist ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-5">
        <h3 className="mb-4 fw-bold">منتجات مشابهة</h3>
        <div className="row row-cols-2 row-cols-md-4 g-4">
          {products
            .filter(
              (item) =>
                item.category === productData.category && item._id !== productId
            )
            .slice(0, 4)
            .map((relatedProduct, index) => (
              <div className="col" key={index}>
                <div className="card h-100 shadow-sm hover-shadow">
                  <img
                    src={relatedProduct.image[0]}
                    alt={relatedProduct.title}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{relatedProduct.title}</h5>
                    <p className="card-text text-primary fw-bold">
                      ${relatedProduct.price.toFixed(2)}
                    </p>
                    <a
                      href={`/products/productCategory/${relatedProduct._id}`}
                      className="btn btn-sm btn-outline-primary mt-2"
                    >
                      عرض التفاصيل
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
