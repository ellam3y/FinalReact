import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import useAuthStore from "../Store/authStore";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // إذا لم يكن المستخدم مسجلاً، نحفظ الصفحة التي كان يحاول الوصول إليها
    if (!isAuthenticated) {
      localStorage.setItem("redirectTo", window.location.pathname);
    }
  }, [isAuthenticated]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/register" replace />;
};

export default ProtectedRoute;
