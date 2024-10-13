import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../src/Pages/Home";
import * as Sentry from "@sentry/react";
import Layout from "./Pages/Layout";
import Page from "./Pages/Page";

const APPRouter = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/page" element={<Page />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default APPRouter;
