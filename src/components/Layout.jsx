import React from "react";
import { Outlet } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
  return (
    <>
      <Header />
      <div className="h-[58px] xs:h-[68px] md:h-[160px] lg:h-[116px]"></div>
      <Breadcrumb />
      <Outlet />
      <Footer />
    </>
  );
}
