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
        </Routes>
      </Router>
    </div>
  );
};

export default APPRouter;