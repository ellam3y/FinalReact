// src/Store/StoreToGetProduct.js
import { create } from "zustand";
import { products as dummyProducts } from "../assets/frontend_assets/assets";

export const useGetProduct = create((set) => ({
  products: dummyProducts, // Store the actual products array
  isLoading: false,
  error: null,

  // Function to fetch products (currently just returns dummy data)
  GetProducts: async () => {
    set({ isLoading: true });
    try {
      // In a real app, you would fetch from an API here
      // For now, we're just using the dummy data
      set({ products: dummyProducts, isLoading: false });
      return dummyProducts;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      console.error("Error fetching products:", error);
    }
  },

  // Function to update products
  setProducts: (newProducts) => set({ products: newProducts }),
}));
