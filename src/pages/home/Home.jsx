import styles from "./home.module.css";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // استايلات أساسية
import "swiper/css/navigation"; // لو عايز أزرار
import "swiper/css/pagination"; // لو عايز دوائر
import Image from "../../assets/imgs/ChatGPT_Image_Apr_13__2025__12_43_57_AM-removebg.png";

// لو هتستخدم خواص إضافية
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

export default function Home() {
  const [products] = useState([
    { id: 1, name: "Product 1", image: "path/to/image1.jpg" },
    { id: 2, name: "Product 2", image: "path/to/image2.jpg" },
    { id: 3, name: "Product 3", image: "path/to/image3.jpg" },
    { id: 4, name: "Product 4", image: "path/to/image4.jpg" },
    { id: 5, name: "Product 5", image: "path/to/image5.jpg" },
    { id: 6, name: "Product 6", image: "path/to/image6.jpg" },
    { id: 7, name: "Product 7", image: "path/to/image7.jpg" },
    { id: 8, name: "Product 8", image: "path/to/image8.jpg" },
    { id: 9, name: "Product 9", image: "path/to/image9.jpg" },
    { id: 10, name: "Product 10", image: "path/to/image10.jpg" },
    { id: 11, name: "Product 11", image: "path/to/image11.jpg" },
    { id: 12, name: "Product 12", image: "path/to/image12.jpg" },
  ]);

  return (
    <div
      className="home  col-12 d-flex flex-column   justify-content-start align-items-center "
      id={styles.home}
    >
      <div className="home-content d-flex flex-column gap-5 justify-content-center align-items-center col-12">
        {/* <div
          className=" col-12 d-flex flex-row flex-wrap justify-content-evenly  align-items-center"
          id={styles.Hero}
        >
          <div className=" col-12 col-md-5 p-5 d-flex  flex-column gap-5">
            <h1 className="">
              اهلا بكم ف موقع{" "}
              <span className="fw-bolder text-decoration-underline">
                ابورضا
              </span>{" "}
              للمنتجات البيلاستيكيه ومنتجات التعبيئه والتغليف
            </h1>
            <p className="fw-semibold fs-5"> اطلب الان وحنوصللك لحد الباب </p>
            <Link to="/shop" className="col-6 col-md-5 btn" id={styles.Shop}>
              Shop Now
            </Link>
          </div>
          <div className=" col-12 col-md-5 d-flex justify-content-center align-items-center">
            <img src={Image} className="w-75  " alt="" />
          </div>
        </div> */}
        <div
          className="col-12 "
          id={styles.Hero}
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.85)), url('/hero-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            // borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
          }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 col-md-6 p-5 d-flex flex-column gap-4">
                <span className="badge bg-primary rounded-pill px-3 py-2 mb-2 w-fit">
                  أفضل منتجات التعبئة
                </span>
                <h1 className="display-4 fw-bold">
                  اهلا بكم في موقع{" "}
                  <span className="text-primary border-bottom border-2 border-secondary">
                    ابورضا
                  </span>{" "}
                  للمنتجات البلاستيكية
                </h1>
                <p className="fw-semibold fs-5 text-muted">
                  اطلب الان وحنوصللك لحد الباب مع افضل جودة واسعار في السوق
                </p>
                <div className="d-flex gap-3 mt-3">
                  <Link
                    to="/shop"
                    className="btn btn-primary btn-lg rounded-pill px-4 py-2 shadow-sm"
                  >
                    تسوق الآن <i className="bi bi-arrow-left-short"></i>
                  </Link>
                  <Link
                    to="/contact"
                    className="btn btn-outline-dark btn-lg rounded-pill px-4 py-2"
                  >
                    تواصل معنا
                  </Link>
                </div>
              </div>
              <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
                <img src={Image} className="img-fluid" alt="منتجات ابو رضا" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 p-4 d-flex flex-column gap-4 ">
          <h2 className="">المنتجات الاكثر طلبا</h2>
          <div className=" slider-wrapper col-12 border-1 border-black p-2">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              loop={true}
            >
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className="card p-3" id={styles.slider}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="col-12 mt-5" id={styles.New}>
          <h2>المنتجات المضافة حديثا</h2>
          <div className="products-grid col-12 border-1 border-black p-4 d-flex flex-wrap justify-content-center">
            {products.slice(-5).map((product) => (
              <div
                key={product.id}
                className="product-card m-2 p-3 border border-black text-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image mb-2"
                />
                <h5 className="product-name">{product.name}</h5>
              </div>
            ))}
          </div>
        </div>

        <div className="col-12 mt-5" id={styles.opinion}>
          <h2>اراء العملاء</h2>
          <div className="testimonials col-12 d-flex flex-column gap-4 align-items-center">
            <div className="testimonial p-3 border border-black text-center w-75">
              <p className="testimonial-text">
                "منتجات رائعة وخدمة ممتازة! أنصح الجميع بالتعامل مع هذا الموقع."
              </p>
              <h5 className="testimonial-author">- محمد علي</h5>
            </div>
            <div className="testimonial p-3 border border-black text-center w-75">
              <p className="testimonial-text">
                "جودة عالية وسرعة في التوصيل. شكراً لكم!"
              </p>
              <h5 className="testimonial-author">- فاطمة أحمد</h5>
            </div>
            <div className="testimonial p-3 border border-black text-center w-75">
              <p className="testimonial-text">
                "أفضل موقع للمنتجات البلاستيكية. سأطلب مرة أخرى بالتأكيد."
              </p>
              <h5 className="testimonial-author">- أحمد حسن</h5>
            </div>
          </div>
        </div>

        <div className="col-12 mt-5" id={styles.faq}>
          <h2>الأسئلة الشائعة</h2>
          <div className="faq-list col-12 d-flex flex-column gap-3">
            <div className="faq-item p-3 border border-black">
              <h5 className="faq-question">ما هي طرق الدفع المتاحة؟</h5>
              <p className="faq-answer">
                نقبل الدفع عن طريق البطاقات الائتمانية والدفع عند الاستلام.
              </p>
            </div>
            <div className="faq-item p-3 border border-black">
              <h5 className="faq-question">كم يستغرق وقت التوصيل؟</h5>
              <p className="faq-answer">
                عادةً ما يتم التوصيل خلال 3-5 أيام عمل.
              </p>
            </div>
            <div className="faq-item p-3 border border-black">
              <h5 className="faq-question">هل يمكنني إرجاع المنتج؟</h5>
              <p className="faq-answer">
                نعم، يمكنك إرجاع المنتج خلال 14 يومًا من تاريخ الاستلام.
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 mt-5" id={styles.gallery}>
          <h2>معرض الصور</h2>
          <div className="gallery-grid col-12 d-flex flex-wrap justify-content-center gap-3">
            {products.slice(0, 6).map((product) => (
              <div
                key={product.id}
                className="gallery-item border border-black p-2"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="gallery-image"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="col-12 mt-5">
          <h2>مميزاتنا</h2>
          <div className="features col-12 d-flex flex-wrap justify-content-around">
            <div className="feature-card p-3 border border-black text-center m-2">
              <h5 className="feature-title">جودة عالية</h5>
              <p className="feature-description">
                نقدم منتجات بجودة ممتازة لضمان رضا العملاء.
              </p>
            </div>
            <div className="feature-card p-3 border border-black text-center m-2">
              <h5 className="feature-title">أسعار تنافسية</h5>
              <p className="feature-description">
                أسعارنا تناسب الجميع مع الحفاظ على الجودة.
              </p>
            </div>
            <div className="feature-card p-3 border border-black text-center m-2">
              <h5 className="feature-title">توصيل سريع</h5>
              <p className="feature-description">
                نوفر خدمة توصيل سريعة وآمنة لجميع الطلبات.
              </p>
            </div>
            <div className="feature-card p-3 border border-black text-center m-2">
              <h5 className="feature-title">دعم العملاء</h5>
              <p className="feature-description">
                فريق دعم متوفر للإجابة على جميع استفساراتكم.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
