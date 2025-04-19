import styles from "./footer.module.css";
import {
  FaEnvelope,
  FaInstagram,
  FaRegUserCircle,
  FaShoppingCart,
} from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { LuFacebook } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div
      className="footer-container d-flex flex-column justify-content-center align-items-center w-100 position-relative bottom-0 start-0 "
      id={styles["footer-container"]}
    >
      <footer className="footer d-flex flex-column flex-md-row p-4 justify-content-center align-items-center w-100">
        <div
          className="container-fluid d-flex justify-content-center align-items-center"
          id={styles["footer"]}
        >
          <p className="text-light">تواصل معنا عبر:</p>
          <Link to="https://www.facebook.com" className=" mx-2">
            <LuFacebook />
          </Link>
          <Link to="https://www.twitter.com" className=" mx-2">
            <FiTwitter />
          </Link>
          <Link to="https://www.instagram.com" className=" mx-2">
            <FaInstagram />
          </Link>
        </div>
        <div className="container-fluid d-flex justify-content-center align-items-center">
          <p className="text-light">جميع الحقوق محفوظة &copy; 2025</p>
        </div>
        <div
          className="user-account  d-lg-none col-6 col-md-4  d-flex flex-row justify-content-evenly align-items-center d-flex"
          id={styles["icons"]}
        >
          <Link className="nav-link text-light" to="/user-account">
            <FaRegUserCircle size={24} />
          </Link>
          <Link className="nav-link text-light" to="/cart">
            <FaShoppingCart size={24} />
          </Link>

          <Link className="nav-link text-light" to="/contact-us">
            <FaEnvelope size={24} />
          </Link>
        </div>
      </footer>
    </div>
  );
}
