import { create } from "zustand";

// إنشاء متجر لإدارة حالة تسجيل الدخول
const useAuthStore = create((set) => ({
  user: null, // بيانات المستخدم (مثل التوكن أو اسم المستخدم)
  isAuthenticated: false, // حالة تسجيل الدخول

  // دالة لتسجيل الدخول
  login: (userData) => set({ user: userData, isAuthenticated: true }),

  // دالة لتسجيل الخروج
  logout: () => {
    localStorage.removeItem("authToken"); // إزالة التوكن إذا كنت تستخدمه
    set({ user: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
