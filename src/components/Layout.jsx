import React from "react";
import { Outlet } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";
import Topbar from "./Topbar";

export default function Layout() {
  return (
    <>
      <Topbar />
      <Header />
      <Navbar />
      <Breadcrumb />
      <Outlet />
      <Footer />
    </>
  );
}
