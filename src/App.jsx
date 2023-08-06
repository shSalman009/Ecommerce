import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Loading from "./components/Loading";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import useAuthcheck from "./hooks/useAuthcheck";
import BlogsPage from "./pages/blogs/BlogsPage";
import CartPage from "./pages/cart/CartPage";
import CategoryPage from "./pages/category/CategoryPage";
import CategoryProducts from "./pages/categoryProducts/CategoryProducts";
import Checkout from "./pages/checkout/Checkout";
import ContactPage from "./pages/contact/ContactPage";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import OrderPage from "./pages/order/OrderPage";
import ProductsPage from "./pages/products/ProductsPage";
import RegisterPage from "./pages/register/RegisterPage";
import SingleBlogPage from "./pages/singleBlog/SingleBlogPage";
import SingleProductPage from "./pages/singleProduct/SingleProductPage";
import SuccessPaymentPage from "./pages/success/SuccessPaymentPage";

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
          <Route path="/:category" element={<CategoryProducts />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:blogId" element={<SingleBlogPage />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route path="/categories" element={<CategoryPage />} />

          <Route path="/products/:slug" element={<SingleProductPage />} />

          <Route path="/checkout/:id?" element={<Checkout />} />

          <Route
            path="/order-success/:orderId"
            element={<SuccessPaymentPage />}
          />
          <Route path="/order" element={<OrderPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  ) : (
    <Loading />
  );
}
