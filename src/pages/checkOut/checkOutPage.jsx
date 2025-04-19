import React, { useState } from "react";
import { useCartStore } from "../../Store/StoreCart";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
export default function Checkout() {
  const { cart, clearCart } = useCartStore();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // هنا ممكن تبعت البيانات لـ backend أو API
    alert(
      `تم إرسال الطلب بنجاح ✅\nشكراً يا ${form.name}!\nالمبلغ: ${total} جنيه`
    );

    clearCart();
  };

  if (cart.length === 0) {
    return <div className="text-center mt-5">لا يوجد منتجات لإتمام الطلب.</div>;
  }

  return (
    <div className="container py-5" dir="rtl">
      <h3 className="mb-4">🧾 إتمام الطلب</h3>

      <form onSubmit={handleSubmit} className="mb-5">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">الاسم الكامل</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">رقم الهاتف</label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label">العنوان</label>
            <textarea
              className="form-control"
              name="address"
              rows="3"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <hr className="my-5" />

        <h5>🛍️ ملخص الطلب</h5>
        <ul className="list-group mb-3">
          {cart.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{item.title}</strong> × {item.quantity}
              </div>
              <span>{item.price * item.quantity} جنيه</span>
            </li>
          ))}
          <li className="list-group-item d-flex justify-content-between">
            <strong>الإجمالي الكلي:</strong>
            <strong className="text-success">{total} جنيه</strong>
          </li>
        </ul>

        <button
          type="submit"
          className="btn btn-primary w-100 rounded-pill mt-3"
        >
          تأكيد الطلب
        </button>
      </form>
    </div>
  );
}
