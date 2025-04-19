import Logo from "../../../assets/imgs/IMG_20250406_233310.jpg";
import styles from "./Error.module.css";
export default function Error() {
  return (
    <div
      className="error-page d-flex flex-column justify-content-center align-items-center w-100 "
      style={{
        backgroundColor: "var(--text)",
        height: "100vh",
        direction: "rtl",
      }}
    >
      <div className="NotFound" id={styles["NotFound"]}>
        <h1 className="text-center text-light">404</h1>
        <h2 className="text-center text-light">الصفحه غير متوفره</h2>
        <p className="text-center text-light">
          عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها. قد تكون الصفحة
          محذوفة أو غير موجودة بعد.
        </p>
        <a href="/" className="btn " id={styles["btn"]}>
          العودة إلى الصفحة الرئيسيه
        </a>
      </div>
      <img src={Logo} style={{ margin: "auto" }} />
    </div>
  );
}
