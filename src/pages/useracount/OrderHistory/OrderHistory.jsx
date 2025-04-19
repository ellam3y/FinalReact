export default function OrderHistory() {
  const orders = [
    {
      id: "ORD123456",
      date: "2025-04-10",
      status: "تم التوصيل",
      total: "450 جنيه",
      items: [
        { name: "أكياس بلاستيك", quantity: 2 },
        { name: "علب شفافة", quantity: 1 },
      ],
    },
    {
      id: "ORD123457",
      date: "2025-03-28",
      status: "جاري التوصيل",
      total: "320 جنيه",
      items: [
        { name: "رول تغليف", quantity: 3 },
        { name: "ملاعق بلاستيك", quantity: 2 },
      ],
    },
  ];

  return (
    <div>
      <h4 className="mb-4">🧾 سجل الطلبات</h4>

      {orders.map((order) => (
        <div key={order.id} className="card mb-3">
          <div className="card-header d-flex justify-content-between">
            <span>
              رقم الطلب: <strong>{order.id}</strong>
            </span>
            <span className="badge bg-success">{order.status}</span>
          </div>
          <div className="card-body">
            <p>
              <strong>التاريخ:</strong> {order.date}
            </p>
            <p>
              <strong>الإجمالي:</strong> {order.total}
            </p>
            <p>
              <strong>المنتجات:</strong>
            </p>
            <ul className="list-group list-group-flush">
              {order.items.map((item, index) => (
                <li key={index} className="list-group-item">
                  {item.name} × {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      {orders.length === 0 && (
        <div className="alert alert-info text-center">
          لا يوجد طلبات حتى الآن.
        </div>
      )}
    </div>
  );
}
