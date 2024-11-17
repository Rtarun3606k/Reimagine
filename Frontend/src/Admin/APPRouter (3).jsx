import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../src/Pages/Home";
import * as Sentry from "@sentry/react";
import Layout from "./Pages/Layout";
import IPhonePage from "./Pages/Page";
import Iphone from "./Pages/Iphone";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Store from "./Pages/Store";
import AdminLayout from "./Pages/Admin/AdminLayout";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminProducts from "./Pages/Admin/AdminProducts";
import AdminOrders from "./Pages/Admin/AdminOrders";

const APPRouter = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/iphone" element={<Iphone />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/store" element={<Store />} />
          </Route>
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
};

export default APPRouter;