import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import Products from "./pages/website/Products";
import NotFound from "./pages/website/NotFound";
import ProductDetails from "./pages/website/ProductDetails";
import About from "./pages/website/About";
import HomePage from "./pages/website/HomePage";
import Cart from "./pages/website/Cart";
import AdminLogin from "./pages/Dashboard/AdminLogin";
import Layout from "./Layout";
import Offers from "./pages/website/Offers";

const ProtectedRoute = ({ children }) => {
  if (localStorage.getItem("adminToken")) {
    return children;
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

const AuthRoute = ({ children }) => {
  if (localStorage.getItem("adminToken")) {
    return <Navigate to="/admin" replace={true} />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/productDetails/:id" element={<ProductDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AuthRoute>
              <AdminLogin />
            </AuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
