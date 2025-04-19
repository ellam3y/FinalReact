import React, { useState, useEffect } from "react";
import { useProductStore } from "../../Store/StoreProduct";
import { useCartStore } from "../../Store/StoreCart";
import { useWishlistStore } from "../../Store/StoreWishlist";
import { useGetProduct } from "../../Store/StoreToGetProduct";
import ReactPaginate from "react-paginate";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import { FaSearch, FaFilter, FaTimesCircle } from "react-icons/fa";
import ProductItem from "../../componants/productItems/productItems";

export default function AllProductsPage() {
  // Access all stores
  const { categories } = useProductStore();
  const { addToCart } = useCartStore();
  const { addToWishlist } = useWishlistStore();
  const { products, GetProducts, isLoading, error } = useGetProduct();

  // Local state for filtering and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [sortBy, setSortBy] = useState("default");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const itemsPerPage = 9;

  // Fetch products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      if (typeof GetProducts === "function") {
        await GetProducts();
      }
    };

    loadProducts();
  }, [GetProducts]);

  // Handle adding product to cart
  const handleAddToCart = (product) => {
    addToCart(product);
    // Optional: Show confirmation toast/message
    alert("تمت إضافة المنتج إلى السلة");
  };

  // Handle adding product to wishlist
  const handleAddToWishlist = (product) => {
    addToWishlist(product);
    // Optional: Show confirmation toast/message
    alert("تمت إضافة المنتج إلى المفضلة");
  };

  // Filter and sort products
  const filteredProducts = products
    ? products
        .filter((product) => {
          const matchCategory =
            selectedCategory === "الكل" ||
            product.category === selectedCategory;
          const matchSearch =
            product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.name?.toLowerCase().includes(searchTerm.toLowerCase());
          const matchMinPrice = !minPrice || product.price >= Number(minPrice);
          const matchMaxPrice = !maxPrice || product.price <= Number(maxPrice);
          return matchCategory && matchSearch && matchMinPrice && matchMaxPrice;
        })
        .sort((a, b) => {
          if (sortBy === "price-asc") return a.price - b.price;
          if (sortBy === "price-desc") return b.price - a.price;
          if (sortBy === "name-asc")
            return (a.title || a.name)?.localeCompare(b.title || b.name);
          if (sortBy === "name-desc")
            return (b.title || b.name)?.localeCompare(a.title || a.name);
          return 0;
        })
    : [];

  // Get current page products
  const paginatedProducts = filteredProducts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Handle pagination
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
    window.scrollTo(0, 0);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("الكل");
    setSortBy("default");
    setMinPrice("");
    setMaxPrice("");
    setCurrentPage(0);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container py-5 text-center" dir="rtl">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">جاري التحميل...</span>
        </div>
        <p className="mt-2">جاري تحميل المنتجات...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container py-5" dir="rtl">
        <div className="alert alert-danger">
          <h4 className="alert-heading">حدث خطأ!</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5" dir="rtl">
      {/* Header with filter toggle */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">🛍️ تسوق منتجاتنا</h2>
        <button
          className="btn btn-outline-primary d-md-none"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <FaFilter /> {isFilterOpen ? "إخفاء الفلاتر" : "عرض الفلاتر"}
        </button>
      </div>

      {/* Filter and sort section */}
      <div
        className={`row mb-4 ${isFilterOpen ? "d-flex" : "d-none d-md-flex"}`}
      >
        {/* Search */}
        <div className="col-md-4 mb-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="🔍 ابحث عن منتج..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setSearchTerm("")}
              >
                <FaTimesCircle />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="col-md-3 mb-3">
          <select
            className="form-select"
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option value="الكل">📁 كل الأقسام</option>
            {categories &&
              categories
                .filter((cat) => cat !== "الكل")
                .map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="col-md-3 mb-3">
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              placeholder="السعر من"
              min="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              className="form-control"
              placeholder="السعر إلى"
              min="0"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        {/* Sort Order */}
        <div className="col-md-2 mb-3">
          <select
            className="form-select"
            onChange={(e) => setSortBy(e.target.value)}
            value={sortBy}
          >
            <option value="default">🔃 الترتيب</option>
            <option value="price-asc">⬆️ السعر (تصاعدي)</option>
            <option value="price-desc">⬇️ السعر (تنازلي)</option>
            <option value="name-asc">🔠 الاسم (أ-ي)</option>
            <option value="name-desc">🔡 الاسم (ي-أ)</option>
          </select>
        </div>
      </div>

      {/* Results summary */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <p className="mb-0">عدد المنتجات: {filteredProducts.length}</p>

        {(searchTerm ||
          selectedCategory !== "الكل" ||
          minPrice ||
          maxPrice ||
          sortBy !== "default") && (
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={resetFilters}
          >
            إعادة ضبط الفلاتر
          </button>
        )}
      </div>

      {/* Products grid */}
      {products && products.length > 0 ? (
        paginatedProducts.length > 0 ? (
          <div className="row">
            {paginatedProducts.map((product) => (
              <div key={product._id} className="col-md-6 col-lg-4 mb-4">
                <ProductItem
                  id={product._id}
                  image={product.image}
                  title={product.title || product.name}
                  price={product.price}
                  category={product.category}
                  onAddToCart={handleAddToCart}
                  onAddToWishlist={handleAddToWishlist}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-info text-center p-5">
            <h4>لا توجد منتجات تطابق البحث</h4>
            <p>حاول تغيير معايير البحث أو إعادة ضبط الفلاتر</p>
            <button className="btn btn-primary mt-3" onClick={resetFilters}>
              إعادة ضبط الفلاتر
            </button>
          </div>
        )
      ) : (
        <div className="alert alert-warning text-center p-5">
          <h4>لم يتم العثور على منتجات</h4>
          <p>يبدو أنه لا توجد منتجات متاحة حالياً</p>
        </div>
      )}

      {/* Pagination */}
      {filteredProducts.length > itemsPerPage && (
        <ReactPaginate
          previousLabel="السابق"
          nextLabel="التالي"
          breakLabel="..."
          pageCount={Math.ceil(filteredProducts.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName="pagination justify-content-center mt-4"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          activeClassName="active"
        />
      )}
    </div>
  );
}
