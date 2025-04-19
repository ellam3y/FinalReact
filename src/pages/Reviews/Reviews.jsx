import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function Reviews() {
  const [reviews, setReviews] = useState([
    {
      name: "محمد",
      rating: 5,
      comment: "خدمة ممتازة والتوصيل كان سريع 👌",
      date: "14 أبريل 2025",
    },
    {
      name: "سارة",
      rating: 4,
      comment: "المنتجات بجودة عالية لكن التغليف يحتاج تحسين.",
      date: "13 أبريل 2025",
    },
  ]);

  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    comment: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.rating && newReview.comment) {
      setReviews([
        { ...newReview, date: new Date().toLocaleDateString("ar-EG") },
        ...reviews,
      ]);
      setNewReview({ name: "", rating: 0, comment: "" });
    }
  };

  const renderStars = (count) => {
    return [...Array(5)].map((_, i) => (
      <FaStar key={i} color={i < count ? "#ffc107" : "#e4e5e9"} />
    ));
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">آراء العملاء</h2>

      {/* ⭐ التقييم العام */}
      <div className="text-center mb-4">
        <div style={{ fontSize: "24px" }}>{renderStars(4)}</div>
        <p className="text-muted">متوسط التقييم 4 من 5</p>
      </div>

      {/* 📄 قائمة التقييمات */}
      <div className="mb-5">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="border rounded p-3 mb-3 bg-white shadow-sm"
          >
            <div className="d-flex justify-content-between">
              <strong>{review.name}</strong>
              <span className="text-muted small">{review.date}</span>
            </div>
            <div className="text-warning">{renderStars(review.rating)}</div>
            <p className="mb-0">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* ✍️ نموذج إضافة تقييم */}
      <div className="card p-4 shadow-sm">
        <h5 className="mb-3">أضف تقييمك</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="اسمك"
              value={newReview.name}
              onChange={(e) =>
                setNewReview({ ...newReview, name: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label d-block">تقييمك:</label>
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={24}
                style={{ cursor: "pointer" }}
                color={newReview.rating >= star ? "#ffc107" : "#e4e5e9"}
                onClick={() => setNewReview({ ...newReview, rating: star })}
              />
            ))}
          </div>

          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="اكتب تعليقك..."
              rows="3"
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            إرسال التقييم
          </button>
        </form>
      </div>
    </div>
  );
}
