import React from "react";
import { Link } from "react-router-dom";
import "../Css/Products.css";

const IPhonePage = () => {
  return (
    <>
      <div className="product-page">
        <header className="product-header">
          <h1>Apple</h1>
        </header>
        <nav className="product-nav">
          <a href="#">Mac</a>
          <a href="#">iPad</a>
          <a href="#">iPhone</a>
          <a href="#">Watch</a>
          <a href="#">TV</a>
          <a href="#">Music</a>
          <a href="#">Support</a>
        </nav>
        <main className="product-main">
          <section className="product-hero-section">
            <h2>iPhone 15 Pro</h2>
            <p>Pro. Beyond.</p>
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="iPhone 15 Pro"
            />
          </section>
          <section className="product-features-section">
            <div className="product-feature">
              <h3>A17 Pro chip</h3>
              <p>Fastest chip ever in a smartphone</p>
            </div>
            <div className="product-feature">
              <h3>Pro camera system</h3>
              <p>48MP Main | Ultra Wide | Telephoto</p>
            </div>
            <div className="product-feature">
              <h3>Action button</h3>
              <p>Customize for your favorite features</p>
            </div>
          </section>
        </main>
        <footer className="product-footer">
          <p>&copy; 2024 Apple Inc. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default IPhonePage;
