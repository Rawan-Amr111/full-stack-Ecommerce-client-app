import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages";
import AboutPage from "./pages/About";
import ProductsPage from "./pages/products";

import SimpleCard from "./components/Auth/Login";
import ProductPage from "./pages/product";
import AppLayout from "./components/Layout/AppLayout";
import CookieService from "./services/CookieService";
import CartDrawer from "./components/CartDrawer";

import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardProducts from "./pages/dashboard";
import Categories from "./pages/dashboard/Categories";

const App = () => {
  const token = CookieService.getCookie("jwt");

  return (
    <>
      <CartDrawer />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardProducts />} />
          <Route path="categories" element={<Categories />} />
        </Route>

        <Route path="/login" element={<SimpleCard isAuthenticated={token} />} />
      </Routes>
    </>
  );
};

export default App;
