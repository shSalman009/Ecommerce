import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Loading from "./components/Loading";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import useAuthcheck from "./hooks/useAuthcheck";
import BlogPostPage from "./pages/BlogPostPage";
import CategoryPage from "./pages/CategoryPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SingleCategoryProducts from "./pages/SingleCategoryProducts";
import BlogsPage from "./pages/blogs/BlogsPage";
import CartPage from "./pages/cart/CartPage";
import HomePage from "./pages/home/HomePage";
import ProductsPage from "./pages/products/ProductsPage";
import SingleProductPage from "./pages/singleProduct/SingleProductPage";

export default function App() {
  const authCheck = useAuthcheck();

  return authCheck ? (
    <BrowserRouter>
      <Toaster />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/cart" element={<CartPage />} />
          </Route>

          <Route path="/products" element={<ProductsPage />} />
          <Route path="/:category" element={<SingleCategoryProducts />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:blogId" element={<BlogPostPage />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route path="/categories" element={<CategoryPage />} />

          <Route path="/products/:slug" element={<SingleProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  ) : (
    <Loading />
  );
}
