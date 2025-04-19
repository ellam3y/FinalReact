import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import useAuthStore from "./Store/authStore";

// الصفحات
import Home from "./pages/home/Home";
import Products from "./pages/Products/Products";
import ProductsDetailes from "./pages/Products/productsDetailes/ProductsDetailes";
import Checkout from "./pages/checkOut/checkOutPage";
import ContactUs from "./pages/ContactUs/ContactUs";
import AboutUs from "./pages/About Us/AboutUs";
import CartPage from "./pages/CartPage/CartPage";
import TrackOrder from "./pages/Track Order/TrackOrder";
import OrderConfirmation from "./pages/order-confirmation/OrderConfirmation";
import Reviews from "./pages/Reviews/Reviews";
import WishlistPage from "./pages/useracount/Wishlist/Wishlist";
import UserAcount from "./pages/useracount/UserAcount";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import OrderHistory from "./pages/useracount/OrderHistory/OrderHistory";
import Regs from "./pages/regs/Regs";
import LogIn from "./pages/login/LogIn";
import ProtectedRoute from "./componants/ProtectedRoute";
import Layout from "./pages/Layout/Layout";
import Error from "./pages/Error/ErrorPage/Error";

// استايلات
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "bootstrap/dist/js/bootstrap.min.js";
import "react-bootstrap";

export default function App() {
  const { login } = useAuthStore();

  // ✅ مزامنة حالة الدخول مع localStorage بعد الريفريش
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (isAuthenticated && storedUser) {
      login(storedUser);
    }
  }, []);

  return (
    <div className="app d-flex flex-column w-100">
      <Routes>
        {/* 🌐 الموقع العام */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="products">
            <Route index element={<Products />} />
            <Route path=":productCategory" element={<Products />} />
            <Route path=":productCategory/:id" element={<ProductsDetailes />} />
          </Route>

          <Route path="contact-us" element={<ContactUs />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="reviews" element={<Reviews />} />

          {/* 🛡️ المسارات المحمية */}
          <Route element={<ProtectedRoute />}>
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order-confirmation" element={<OrderConfirmation />} />
            <Route path="track-order" element={<TrackOrder />} />

            <Route path="user-account" element={<UserAcount />}>
              <Route index element={<ProfilePage />} />
              <Route path="order-history" element={<OrderHistory />} />
              <Route path="wishlist" element={<WishlistPage />} />
              <Route path="notifications" element={<h1>Notifications</h1>} />
            </Route>
          </Route>
        </Route>

        {/* 🧑‍💻 تسجيل الدخول والتسجيل */}
        <Route path="login" element={<LogIn />} />
        <Route path="register" element={<Regs />} />

        {/* ❌ صفحة الخطأ */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}
