import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/common/Layout";
import Loading from "./components/common/Loading";
import PrivateRoute from "./components/common/PrivateRoute";
import PublicRoute from "./components/common/PublicRoute";
import { useGetProductsQuery } from "./features/products/productsApi";
import useAuthcheck from "./hooks/useAuthcheck";
import BlogPostPage from "./pages/BlogPostPage";
import BlogsPage from "./pages/BlogsPage";
import CartPage from "./pages/CartPage";
import CategoryPage from "./pages/CategoryPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductsPage";
import RegisterPage from "./pages/RegisterPage";
import SingleCategoryProducts from "./pages/SingleCategoryProducts";
import SingleProductPage from "./pages/SingleProductPage";

export default function App() {
  const authCheck = useAuthcheck();

  // load products initially
  const { data, isLoading, isSuccess } = useGetProductsQuery();

  // loading text for loading screen
  const text = !authCheck
    ? "Authenticating"
    : isLoading
    ? "Products Fetching"
    : "Loading";

  return authCheck && isSuccess ? (
    <BrowserRouter>
      <Toaster />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          {/* Private Routes */}
          <Route element={<PrivateRoute />}></Route>

          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route path="/products" element={<ProductPage />} />
          <Route path="/:category" element={<SingleCategoryProducts />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:blogId" element={<BlogPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/categories" element={<CategoryPage />} />

          <Route path="/products/:slug" element={<SingleProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  ) : (
    <Loading text={text} />
  );
}
