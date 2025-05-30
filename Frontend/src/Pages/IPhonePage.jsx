import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../components/ImageSlider";
import "../Css/Product.css";
import ProductCard from "../components/ProductCard";
import { toast } from "react-toastify";
import { get_access_token } from "../utils/Cookies";

const IPhonePage = () => {
  const [Data, setData] = useState(null);
  const [Data2, setData2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { model } = useParams(); // Extract the 'model' parameter from the URL

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_URL}/single/single/${model}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.status}`);
      }

      const data = await response.json();

      // Ensure image is an array
      if (
        data.product &&
        typeof data.product.image === "object" &&
        !Array.isArray(data.product.image)
      ) {
        data.product.image = Object.values(data.product.image);
      }

      // Ensure arrays exist with fallbacks
      data.product.colors = data.product.colors || [];
      data.product.sizes = data.product.sizes || [];
      data.product.reviews = data.product.reviews || [];

      setData(data);
    } catch (error) {
      console.error("Error fetching product:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsAll = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_URL}/products/allProducts`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }

      const data = await response.json();
      setData2(Array.isArray(data) ? data.reverse() : []);
    } catch (error) {
      console.error("Error fetching all products:", error);
    }
  };

  const handelOrder = async () => {
    if (!get_access_token()) {
      toast.error("Please login to place an order");
      return;
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${get_access_token()}`,
      },
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_URL}/user/order/${model}`,
        options
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Order placed successfully! 🎉");
      } else {
        toast.error(data.message || "Order failed. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Network error. Please check your connection.");
    }
  };

  const handelCart = async () => {
    if (!get_access_token()) {
      toast.error("Please login to add items to cart");
      return;
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${get_access_token()}`,
      },
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_URL}/user/cart/${model}`,
        options
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Item added to cart successfully! 🛒");
      } else {
        toast.error(
          data.message || "Failed to add item to cart. Please try again."
        );
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Network error. Please check your connection.");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchProductsAll();
  }, [model]); // Add 'model' as a dependency to re-fetch when it changes

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center product-page">
        <div className="text-center">
          <div className="inline-block loading-spinner h-12 w-12 rounded-full"></div>
          <p className="loading-text mt-4 text-lg">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center product-page">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="section-title text-2xl mb-2">
            Oops! Something went wrong
          </h2>
          <p className="error-text mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary px-6 py-3 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!Data || !Data.product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center product-page">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-gray-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-7 7-7-7"
              />
            </svg>
          </div>
          <h2 className="section-title text-2xl mb-2">Product Not Found</h2>
          <p className="section-subtitle mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => window.history.back()}
            className="btn-primary px-6 py-3 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white product-page">
      {/* Hero Section */}
      <div className="relative product-hero py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10"></div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold gradient-text mb-6 animate-fade-in">
            {Data.product.name}
          </h1>
          <p className="text-2xl md:text-3xl section-subtitle font-light">
            Starting at{" "}
            <span className="price-highlight font-semibold bg-blue-400/10 px-3 py-1 rounded-full">
              ₹{Data.product.price?.toLocaleString()}
            </span>
          </p>
        </div>
      </div>

      {/* Image Slider Section */}
      <div className="py-16 px-4 bg-gradient-to-b from-black to-gray-900/50">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <ImageSlider images={Data.product.image} id={model} />
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="glass-card rounded-3xl p-8 md:p-12 shadow-2xl">
            {/* Main Product Info */}
            <div className="grid lg:grid-cols-2 gap-12 mb-12">
              <div className="space-y-6">
                <div>
                  <h2 className="text-sm uppercase section-subtitle tracking-wider mb-2">
                    Product Details
                  </h2>
                  <h3 className="section-title text-3xl md:text-4xl mb-4">
                    {Data.product.name}
                  </h3>
                  <p className="product-description text-lg leading-relaxed">
                    {Data.product.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="stock-text">
                    <span className="font-semibold">{Data.product.stock}</span>{" "}
                    units in stock
                  </span>
                </div>
              </div>

              <div className="space-y-8">
                {/* Colors */}
                {Data.product.colors && Data.product.colors.length > 0 && (
                  <div>
                    <h3 className="section-title text-xl mb-4 flex items-center">
                      <span className="w-6 h-6 bg-gradient-to-r from-red-400 to-blue-400 rounded-full mr-3"></span>
                      Available Colors
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {Data.product.colors.map((color, index) => (
                        <span
                          key={index}
                          className="option-chip px-4 py-2 rounded-full border hover:border-gray-500 transition-colors"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sizes */}
                {Data.product.sizes && Data.product.sizes.length > 0 && (
                  <div>
                    <h3 className="section-title text-xl mb-4 flex items-center">
                      <span className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3"></span>
                      Available Sizes
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {Data.product.sizes.map((size, index) => (
                        <span
                          key={index}
                          className="option-chip px-4 py-2 rounded-full border hover:border-gray-500 transition-colors"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={handelOrder}
                className="btn-primary w-full sm:w-auto px-8 py-4 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Buy Now
                </span>
              </button>
              <button
                onClick={handelCart}
                className="btn-secondary w-full sm:w-auto px-8 py-4 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13v6a2 2 0 002 2h8a2 2 0 002-2v-6"
                    />
                  </svg>
                  Add to Cart
                </span>
              </button>
            </div>

            {/* Reviews Section */}
            <div className="border-t border-gray-700 pt-8">
              <h3 className="section-title text-2xl mb-6 text-center">
                Customer Reviews
              </h3>
              {Data.product.reviews && Data.product.reviews.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Data.product.reviews.map((review, index) => (
                    <div
                      key={index}
                      className="review-card p-4 rounded-xl border border-gray-700"
                    >
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-4 h-4 fill-current"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="product-description text-sm">{review}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <p className="section-subtitle text-lg">
                    No reviews available yet
                  </p>
                  <p className="product-description text-sm">
                    Be the first to review this product!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* More Products Section */}
      <div className="py-16 px-4 bg-gradient-to-t from-gray-900 to-black">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title text-3xl md:text-4xl mb-4">
              Explore More Products
            </h2>
            <p className="section-subtitle text-lg">
              Discover our complete range of premium devices
            </p>
          </div>
          <ProductCard models={Data2} />
        </div>
      </div>
    </div>
  );
};

export default IPhonePage;
