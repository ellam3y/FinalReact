import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../Store/authStore";

const Regs = () => {
  const navigate = useNavigate();
  const { setNotifications } = useAuthStore();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // تحقق من أن جميع الحقول مليئة
    if (!username || !email || !password) {
      setError("جميع الحقول مطلوبة");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    // إضافة إشعار وهمي
    setNotifications([
      {
        message: "تم التسجيل بنجاح. يمكنك الآن تسجيل الدخول.",
        type: "success",
      },
    ]);

    navigate("/login");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-4">التسجيل</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">اسم المستخدم</label>
            <input
              type="text"
              className="form-control"
              placeholder="اسم المستخدم"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
            تسجيل
          </button>
        </form>
      </div>
    </div>
  );
};

export default Regs;
// تم استخدام مكتبة Zustand لإدارة الحالة في التطبيق.
