// APPRouter.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../src/Pages/Home";
import * as Sentry from "@sentry/react";
import Layout from "./Pages/Layout";
import IPhonePage from "./Pages/IPhonePage";
import Iphone from "./Pages/Iphone";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Store from "./Pages/Store";
import Profile from "./Pages/Profile";
import SupportPage from "./Pages/suport";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminLayout from "./Admin/AdminLayout";
import AdminUsers from "./Admin/AdminUsers";
import AdminSettings from "./Admin/AdminSettings";
import About from "./Pages/About";

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
            <Route path="/store" element={<Store />}></Route>
            <Route path=":model" element={<IPhonePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/about" element={<About />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
};

export default APPRouter;
