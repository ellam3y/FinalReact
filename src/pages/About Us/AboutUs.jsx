export default function AboutUs() {
  return (
    <div>
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bold">من نحن</h1>
            <p className="text-muted">اكتشف قصة نجاحنا وما يجعلنا مختلفين</p>
          </div>
          <div className="row align-items-center">
            <div className="col-md-6">
              <img
                src="/images/about-us.jpg"
                alt="عن اللمعي"
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-md-6">
              <h3 className="fw-bold mb-3">اللمعي لتغليف المنتجات</h3>
              <p>
                نحن متجر متخصص في بيع جميع أنواع مواد التعبئة والتغليف بالجملة
                والتجزئة. نوفر أكياس، أكواب، أطباق، رولات بلاستيكية، فويل، فوم،
                مناديل، وغيرها الكثير.
              </p>
              <p>
                رؤيتنا هي تقديم منتجات ذات جودة عالية بأسعار تنافسية، وخدمة
                عملاء ممتازة سواء في الشراء أونلاين أو من داخل المتجر.
              </p>
              <p className="text-primary fw-semibold">
                نحن هنا لخدمة عملك وتسهيل احتياجات التغليف لديك.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
