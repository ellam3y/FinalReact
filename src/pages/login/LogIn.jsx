import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../Store/authStore";

const LogIn = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore(); // لتمرير بيانات المستخدم وتسجيله
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // محاولة الحصول على بيانات المستخدم من localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    // التحقق من بيانات المستخدم
    if (user && user.email === email && user.password === password) {
      // تسجيل الدخول بنجاح
      localStorage.setItem("isAuthenticated", "true");
      login(user); // حفظ بيانات المستخدم في المتجر (zustand)

      // التحقق من وجود صفحة يجب إعادة التوجيه إليها بعد تسجيل الدخول
      const redirectTo = localStorage.getItem("redirectTo");

      if (redirectTo) {
        localStorage.removeItem("redirectTo"); // إزالة الـ URL بعد إعادة التوجيه
        navigate(redirectTo); // العودة إلى الصفحة التي كان المستخدم يحاول الوصول إليها
      } else {
        navigate("/"); // إذا لم يكن هناك صفحة محمية، نعود إلى الصفحة الرئيسية
      }
    } else {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-4">تسجيل الدخول</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">البريد الإلكتروني</label>
            <input
              type="email"
              className="form-control"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">كلمة المرور</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            دخول
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
