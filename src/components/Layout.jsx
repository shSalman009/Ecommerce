import React from "react";
import { Outlet } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <>
      <div className="fixed top-0 inset-x-0 z-50">
        <Header />
        <Navbar />
      </div>
      <div className="h-[116px]"></div>
      <Breadcrumb />
      <Outlet />
      <Footer />
    </>
  );
}
