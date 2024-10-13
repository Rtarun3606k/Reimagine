import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../src/Pages/Home";
import * as Sentry from "@sentry/react";
import Layout from "./Pages/Layout";
import IPhonePage from "./Pages/Page";
import Iphone from "./Pages/Iphone";

const APPRouter = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/store" element={<IPhonePage />} />
            <Route path="/iphone" element={<Iphone />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default APPRouter;
