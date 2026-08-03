import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import MenuPage from "../pages/customer/MenuPage";
import CartPage from "../pages/customer/CartPage";
import CheckoutPage from "../pages/customer/CheckoutPage";
import OrderSuccess from "../pages/customer/OrderSuccess";
import AdminLogin from "../pages/admin/AdminLogin";
import Dashboard from "../pages/admin/Dashboard";
import ProtectedRoute from "../components/admin/ProtectedRoute";
import AdminOrders from "../pages/admin/AdminOrders";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route path="/menu/:menuId" element={<MenuPage />} />

        <Route path="/cart" element={<CartPage />} />

        <Route path="/checkout" element={<CheckoutPage />} />

        <Route path="/success" element={<OrderSuccess />} />
        <Route
    path="/admin/orders"
    element={<AdminOrders />}
/>


        <Route
    path="/admin/login"
    element={<AdminLogin />}
/>

<Route
    path="/admin/dashboard"
    element={
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;