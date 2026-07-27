import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import MenuPage from "../pages/customer/MenuPage";
import CartPage from "../pages/customer/CartPage";
import CheckoutPage from "../pages/customer/CheckoutPage";
import OrderSuccess from "../pages/customer/OrderSuccess";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route path="/menu/:menuId" element={<MenuPage />} />

        <Route path="/cart" element={<CartPage />} />

        <Route path="/checkout" element={<CheckoutPage />} />

        <Route path="/success" element={<OrderSuccess />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;