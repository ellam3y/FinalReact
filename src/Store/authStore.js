import { create } from "zustand";

// متجر إدارة حالة المستخدم والإشعارات
const useAuthStore = create((set) => ({
  user: null, // بيانات المستخدم (مثل التوكن أو اسم المستخدم)
  isAuthenticated: false, // حالة تسجيل الدخول
  notifications: [], // قائمة الإشعارات

  login: (userData) => set({ user: userData, isAuthenticated: true }),

  logout: () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    set({ user: null, isAuthenticated: false });
  },

  setNotifications: (newNotifications) =>
    set({ notifications: newNotifications }),
}));

export default useAuthStore;
