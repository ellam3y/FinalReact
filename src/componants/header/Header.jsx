import { Link, NavLink } from "react-router-dom";
import {
  FaRegUserCircle,
  FaShoppingCart,
  FaEnvelope,
  FaSearch,
  FaRegHeart,
} from "react-icons/fa";

import Logo from "../../assets/imgs/IMG_20250406_233310.jpg";
import styles from "./header.module.css";
import { useCartStore } from "../../Store/StoreCart";
import { useWishlistStore } from "../../Store/StoreWishlist";

export default function Header() {
  const { cart } = useCartStore();
  const { wishlist } = useWishlistStore();

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm sticky-top w-100"
      id={styles.header}
    >
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img src={Logo} alt="Logo" height="40" />
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Main Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Navigation Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
            <li className="nav-item">
              <NavLink className="nav-link fw-medium text-light" to="/">
                الصفحه الرئيسية
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fw-medium text-light" to="/products">
                منتجاتنا
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fw-medium text-light" to="/about-us">
                من نحن
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link fw-medium text-light"
                to="/contact-us"
              >
                اتصل بنا
              </NavLink>
            </li>
          </ul>

          {/* Search Bar */}
          <form className="d-flex mx-lg-2 mb-3 mb-lg-0">
            <div className="input-group">
              <input
                type="search"
                className="form-control"
                placeholder="ابحث عن منتج"
                aria-label="Search"
              />
              <button
                className="btn text-light"
                id={styles.outLine}
                type="submit"
              >
                <FaSearch />
              </button>
            </div>
          </form>

          {/* Action Icons */}
          <div className="d-flex align-items-center gap-3">
            {/* Wishlist */}
            <div className="position-relative">
              <Link
                to="/user-account/wishlist"
                className="btn btn-outline-secondary rounded-circle mb-0"
              >
                <FaRegHeart />
                {wishlist.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </div>

            {/* Cart */}
            <div className="position-relative">
              <Link
                to="/cart"
                className="btn btn-outline-primary rounded-circle"
              >
                <FaShoppingCart />
                {cart.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                    {cart.length}
                  </span>
                )}
              </Link>
            </div>

            {/* User Account */}
            <Link
              to="/user-account"
              className="btn rounded-pill px-3 text-light"
              id={styles.bgColor}
            >
              <FaRegUserCircle className="me-1" /> دخول
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
