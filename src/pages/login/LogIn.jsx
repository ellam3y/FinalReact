import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../Store/authStore";

const LogIn = () => {
  const navigate = useNavigate();
  const { login, notifications, setNotifications } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // حالة "تذكرني"
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // التحقق من localStorage أو sessionStorage عند إعادة تحميل الصفحة
    const storedIsAuthenticated =
      localStorage.getItem("isAuthenticated") ||
      sessionStorage.getItem("isAuthenticated");
    if (storedIsAuthenticated) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        login(user); // إذا كانت الجلسة موجودة، يتم تسجيل الدخول مباشرة
      }
    }
  }, [login]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      const storageType = rememberMe ? localStorage : sessionStorage;
      storageType.setItem("isAuthenticated", "true");
      storageType.setItem("user", JSON.stringify(user)); // حفظ بيانات المستخدم في الجلسة
      login(user);

      // إضافة إشعار وهمي عند تسجيل الدخول
      setNotifications([
        {
          message: `مرحبًا ${user.username}! تم تسجيل الدخول بنجاح.`,
          type: "success",
        },
      ]);

      const redirectTo = localStorage.getItem("redirectTo");

      if (redirectTo) {
        localStorage.removeItem("redirectTo");
        navigate(redirectTo);
      } else {
        navigate("/");
      }
    } else {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }

    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-4">تسجيل الدخول</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        {notifications.length > 0 && (
          <div className="alert alert-success">
            {notifications[notifications.length - 1].message}
          </div>
        )}
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
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label className="form-check-label">تذكرني</label>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "جاري الدخول..." : "دخول"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
