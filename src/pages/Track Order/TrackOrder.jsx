import { useState } from "react";

export default function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState("");
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    // مثال وهمي – استبدله باستدعاء API حقيقي من Strapi
    setTimeout(() => {
      setTrackingInfo({
        orderNumber,
        status: "قيد التوصيل",
        estimatedDelivery: "16 أبريل 2025",
        currentLocation: "مخزن القاهرة",
        history: [
          { date: "13 أبريل", info: "تم تجهيز الطلب" },
          { date: "14 أبريل", info: "جارٍ الشحن" },
          { date: "15 أبريل", info: "في طريقه للتسليم" },
        ],
      });
      setLoading(false);
    }, 1500);
  };

  const steps = [
    { label: "تجهيز الطلب", key: "prepared" },
    { label: "الشحن", key: "shipped" },
    { label: "في الطريق", key: "on_the_way" },
    { label: "تم التوصيل", key: "delivered" },
  ];

  const getCurrentStep = (status) => {
    switch (status) {
      case "تم التوصيل":
        return 3;
      case "في طريقه للتسليم":
        return 2;
      case "جارٍ الشحن":
        return 1;
      case "تم تجهيز الطلب":
        return 0;
      default:
        return 0;
    }
  };

  return (
    <div>
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h1 className="fw-bold">تتبع الطلب</h1>
            <p className="text-muted">أدخل رقم الطلب لمعرفة حالة شحنتك</p>
          </div>

          <form
            className="row justify-content-center mb-4"
            onSubmit={handleTrackOrder}
          >
            <div className="col-md-6">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="أدخل رقم الطلب"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                required
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary btn-lg">
                {loading ? "جارٍ التتبع..." : "تتبع"}
              </button>
            </div>
          </form>

          {trackingInfo && (
            <>
              <div className="card shadow p-4">
                <h5 className="mb-3">
                  تفاصيل التتبع للطلب رقم: {trackingInfo.orderNumber}
                </h5>
                <p>
                  <strong>الحالة الحالية:</strong> {trackingInfo.status}
                </p>
                <p>
                  <strong>التسليم المتوقع:</strong>{" "}
                  {trackingInfo.estimatedDelivery}
                </p>
                <p>
                  <strong>الموقع الحالي:</strong> {trackingInfo.currentLocation}
                </p>

                <hr />
                <h6>سجل الطلب:</h6>
                <ul className="list-group">
                  {trackingInfo.history.map((item, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between"
                    >
                      <span>{item.date}</span>
                      <span>{item.info}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <h6 className="mb-3">حالة الطلب:</h6>
                <div className="d-flex justify-content-between align-items-center">
                  {steps.map((step, index) => {
                    const current = getCurrentStep(trackingInfo.status);
                    const isCompleted = index < current;
                    const isActive = index === current;

                    return (
                      <div
                        key={step.key}
                        className="text-center flex-fill position-relative"
                        style={{ minWidth: "80px" }}
                      >
                        <div
                          className={`rounded-circle mx-auto mb-2 ${
                            isCompleted
                              ? "bg-success text-white"
                              : isActive
                              ? "bg-primary text-white"
                              : "bg-secondary text-white"
                          }`}
                          style={{
                            width: "40px",
                            height: "40px",
                            lineHeight: "40px",
                            fontSize: "18px",
                          }}
                        >
                          {isCompleted ? "✓" : index + 1}
                        </div>
                        <div
                          className={`small ${
                            isCompleted || isActive
                              ? "text-dark fw-bold"
                              : "text-muted"
                          }`}
                        >
                          {step.label}
                        </div>

                        {index < steps.length - 1 && (
                          <div
                            className={`position-absolute top-50 start-100 translate-middle-y w-100 border-bottom ${
                              index < current
                                ? "border-success"
                                : "border-secondary"
                            }`}
                            style={{ zIndex: -1, height: "2px" }}
                          ></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
