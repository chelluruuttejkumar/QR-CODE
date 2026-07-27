import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MenuPage from "../pages/customer/MenuPage";
import CartPage from "../pages/customer/CartPage";
import CheckoutPage from "../pages/customer/CheckoutPage";
import OrderSuccess from "../pages/customer/OrderSuccess";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default Route */}
        <Route
          path="/"
          element={<Navigate to="/menu/1" replace />}
        />

        {/* Menu Page */}
        <Route
          path="/menu/:menuId"
          element={<MenuPage />}
        />

        {/* Cart */}
        <Route
          path="/cart"
          element={<CartPage />}
        />

        {/* Checkout */}
        <Route
          path="/checkout"
          element={<CheckoutPage />}
        />

        {/* Success */}
        <Route
          path="/success"
          element={<OrderSuccess />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;