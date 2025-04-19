export default function ContactUs() {
  return (
    <div>
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bold">تواصل معنا</h1>
            <p className="text-muted">نسعد بخدمتك والرد على جميع استفساراتك</p>
          </div>

          <div className="row">
            <div className="col-md-6 mb-4">
              <h5 className="mb-3">معلومات الاتصال</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="bi bi-telephone-fill me-2 text-primary"></i>
                  0100-000-0000
                </li>
                <li className="mb-2">
                  <i className="bi bi-envelope-fill me-2 text-primary"></i>
                  support@allam3y.com
                </li>
                <li className="mb-2">
                  <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
                  شارع اللمعي، القاهرة، مصر
                </li>
              </ul>
            </div>

            <div className="col-md-6">
              <h5 className="mb-3">أرسل لنا رسالة</h5>
              <form className="row g-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="الاسم الكامل"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="البريد الإلكتروني"
                    required
                  />
                </div>
                <div className="col-12">
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="اكتب رسالتك هنا..."
                    required
                  ></textarea>
                </div>
                <div className="col-12 text-end">
                  <button type="submit" className="btn btn-primary">
                    إرسال الرسالة
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
