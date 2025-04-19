import React from "react";
import { useWishlistStore } from "../../../Store/StoreWishlist";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlistStore();

  return (
    <div className="container py-5" dir="rtl">
      <h2 className="mb-4 fw-bold text-center text-primary">قائمة المفضلة</h2>

      {wishlist.length === 0 ? (
        <div className="text-center py-5">
          <img
            src="/empty_wishlist.svg"
            alt="قائمة المفضلة فارغة"
            style={{ width: "150px", marginBottom: "20px" }}
          />
          <h4 className="text-muted">قائمة المفضلة فارغة</h4>
          <Link to="/productss" className="btn btn-primary mt-3">
            استعرض المنتجات
          </Link>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {wishlist.map((item) => (
            <div key={item._id} className="col">
              <div className="card shadow-sm h-100 position-relative border-0 rounded-4">
                <button
                  className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2 rounded-circle"
                  onClick={() => removeFromWishlist(item._id)}
                  aria-label="حذف من المفضلة"
                >
                  <FaTrashAlt />
                </button>

                <img
                  src={item.image[0]}
                  alt={item.title}
                  className="card-img-top rounded-top-4"
                  style={{ height: "200px", objectFit: "cover" }}
                />

                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{item.title}</h5>
                  <p className="text-success fw-bold">
                    ${item.price.toFixed(2)}
                  </p>
                  <Link
                    to={`/products/productCategory/${item._id}`}
                    className="btn btn-outline-primary btn-sm mt-2"
                  >
                    عرض التفاصيل
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
