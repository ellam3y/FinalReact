import React from "react";
import Header from "../../componants/header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../componants/footer/Footer";
import MainContent from "../../componants/mainContent/MainContent";

export default function Layout() {
  return (
    <div className="layout d-flex flex-column justify-content-start align-items-center w-100 h-100">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
