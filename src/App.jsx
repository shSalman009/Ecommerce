import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Loading from "./components/Loading";
import PageNotFound from "./components/PageNotFound";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import useAuthcheck from "./hooks/useAuthcheck";
import BlogsPage from "./pages/blogs/BlogsPage";
import CartPage from "./pages/cart/CartPage";
import CategoryPage from "./pages/category/CategoryPage";
import CategoryProducts from "./pages/categoryProducts/CategoryProducts";
import Checkout from "./pages/checkout/Checkout";
import ContactPage from "./pages/contact/ContactPage";
import ForgotPasswordPage from "./pages/forgotPassword/ForgotPasswordPage";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import OrderPage from "./pages/order/OrderPage";
import ProductsPage from "./pages/products/ProductsPage";
import RegisterPage from "./pages/register/RegisterPage";
import ResetPasswordPage from "./pages/resetPassword/ResetPasswordPage";
import SingleBlogPage from "./pages/singleBlog/SingleBlogPage";
import SingleProductPage from "./pages/singleProduct/SingleProductPage";
import SuccessPaymentPage from "./pages/success/SuccessPaymentPage";

export default function App() {
  const authChecking = useAuthcheck();

  return authChecking ? (
    <Loading />
  ) : (
    <BrowserRouter>
      <Toaster />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="/reset-password/:token"
              element={<ResetPasswordPage />}
            />
          </Route>

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/checkout/:id?" element={<Checkout />} />{" "}
            <Route
              path="/order-success/:orderId"
              element={<SuccessPaymentPage />}
            />
          </Route>

          <Route path="/products" element={<ProductsPage />} />
          <Route path="/category/:category" element={<CategoryProducts />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:blogId" element={<SingleBlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/products/:slug" element={<SingleProductPage />} />
        </Route>
        {/* Not found route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
