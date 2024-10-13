// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/Pages/Home";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
import * as Sentry from "@sentry/react";
import APPRouter from "./APPRouter";

const App = () => {
  return <APPRouter />;
};

export default Sentry.withProfiler(App);
