import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function UserAccount() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">👤 حساب المستخدم</h2>

      <ul className="nav nav-pills mb-3">
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              "nav-link" + (isActive ? " active" : "")
            }
          >
            الملف الشخصي
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="order-history"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " active" : "")
            }
          >
            الطلبات
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="wishlist"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " active" : "")
            }
          >
            المفضلة
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="notifications"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " active" : "")
            }
          >
            الإشعارات
          </NavLink>
        </li>
      </ul>

      {/* هنا يظهر محتوى كل تبويب حسب المسار */}
      <div className="tab-content p-3 border rounded bg-light">
        <Outlet />
      </div>
    </div>
  );
}
