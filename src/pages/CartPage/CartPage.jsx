import React from "react";
import { useCartStore } from "../../Store/StoreCart";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCartStore();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return <div className="text-center mt-5">سلتك فارغة 🛒</div>;
  }

  return (
    <div className="container py-5" dir="rtl">
      <h3 className="mb-4">🛒 سلة المشتريات</h3>
      <div className="table-responsive">
        <table className="table align-middle table-bordered bg-white">
          <thead className="table-light">
            <tr>
              <th>المنتج</th>
              <th>الكمية</th>
              <th>السعر</th>
              <th>الإجمالي</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      width="60"
                      className="rounded"
                    />
                    <span>{item.title}</span>
                  </div>
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    style={{ width: "80px" }}
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                  />
                </td>
                <td>{item.price} جنيه</td>
                <td>{item.price * item.quantity} جنيه</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-end mt-4">
        <h5>
          الإجمالي الكلي: <span className="text-success">{total} جنيه</span>
        </h5>
        <button className="btn btn-success mt-2 rounded-pill px-4">
          إتمام الطلب
        </button>
      </div>
    </div>
  );
}
