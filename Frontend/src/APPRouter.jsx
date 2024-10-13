import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../src/Pages/Home";
import * as Sentry from "@sentry/react";
import Layout from "./Pages/Layout";

const APPRouter = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} /> */}
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default APPRouter;
