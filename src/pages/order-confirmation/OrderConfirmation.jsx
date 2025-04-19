import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export default function OrderConfirmation() {
  // بيانات وهمية – استبدلها ببيانات حقيقية من الـ state أو API
  const orderDetails = {
    orderNumber: "LLM-202504141234",
    totalAmount: "850 EGP",
    deliveryDate: "17 أبريل 2025",
    paymentMethod: "الدفع عند الاستلام",
    shippingAddress: "القاهرة - شارع التحرير - مبنى رقم 25",
    items: [
      { name: "رول بلاستيك شفاف", qty: 2 },
      { name: "أكياس تعبئة 20x30", qty: 5 },
      { name: "علب بلاستيك 500ml", qty: 3 },
    ],
  };

  return (
    <section className="py-5 bg-light">
      <div className="container text-center">
        <FaCheckCircle size={80} className="text-success mb-3" />
        <h2 className="fw-bold mb-3">تم تأكيد طلبك بنجاح!</h2>
        <p className="text-muted mb-4">
          شكرًا لك على الشراء. رقم طلبك هو:{" "}
          <strong className="text-dark">{orderDetails.orderNumber}</strong>
        </p>

        <div className="row justify-content-center text-start">
          <div className="col-md-8">
            <div className="card shadow-sm p-4 mb-4">
              <h5 className="mb-3">ملخص الطلب</h5>
              <ul className="list-group mb-3">
                {orderDetails.items.map((item, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between"
                  >
                    <span>{item.name}</span>
                    <span>الكمية: {item.qty}</span>
                  </li>
                ))}
              </ul>
              <p>
                <strong>الإجمالي:</strong> {orderDetails.totalAmount}
              </p>
              <p>
                <strong>طريقة الدفع:</strong> {orderDetails.paymentMethod}
              </p>
              <p>
                <strong>العنوان:</strong> {orderDetails.shippingAddress}
              </p>
              <p>
                <strong>التوصيل المتوقع:</strong> {orderDetails.deliveryDate}
              </p>
            </div>

            <div className="d-flex justify-content-between">
              <Link to="/" className="btn btn-outline-primary">
                العودة للصفحة الرئيسية
              </Link>
              <Link to="/track-order" className="btn btn-success">
                تتبع الطلب
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
