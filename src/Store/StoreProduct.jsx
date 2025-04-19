import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [], // قائمة المنتجات
  categories: ["الكل", "أدوات مكتبية", "منتجات مطبخ", "أدوات تنظيف"], // الأقسام
  setProducts: (products) => set({ products }), // تحديث قائمة المنتجات
}));

export default useProductStore;
