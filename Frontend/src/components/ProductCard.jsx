import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { get_access_token } from "../utils/Cookies";
import "../Css/Product.css";

gsap.registerPlugin(ScrollTrigger);

const ProductCard = ({ models, deletel }) => {
  console.log(models);
  const cardsRef = useRef([]);
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const imagePromises = models.map(async (model, index) => {
          const response = await fetch(`/products/${model.id}/image/0`);
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          return { id: model.id, url };
        });

        const imageResults = await Promise.all(imagePromises);
        const imageMap = imageResults.reduce((acc, image) => {
          acc[image.id] = image.url;
          return acc;
        }, {});

        setImages(imageMap);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    if (models && models.length > 0) {
      fetchImages();
    } else {
      setLoading(false);
    }

    // GSAP Animation
    if (cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [models]);

  const handelDelete = async (id) => {
    try {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${get_access_token()}`,
        },
      };
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_URL}/products/${id}`,
        options
      );
      if (response.ok) {
        console.log("Product deleted successfully");
        // You might want to add a callback here to refresh the product list
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="product-card-container py-8">
        <div className="max-w-[90vw] mx-auto px-4">
          <div className="flex flex-wrap gap-8 mt-12 justify-center">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="product-card text-center w-[calc(25%-1rem)] animate-pulse"
              >
                <div className="w-full h-48 bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded mb-2 w-3/4 mx-auto"></div>
                <div className="h-5 bg-gray-700 rounded mb-1 w-1/2 mx-auto"></div>
                <div className="h-4 bg-gray-700 rounded mb-4 w-4/5 mx-auto"></div>
                <div className="h-10 bg-gray-700 rounded w-24 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!models || models.length === 0) {
    return (
      <div className="product-card-container py-16">
        <div className="max-w-[90vw] mx-auto px-4 text-center">
          <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-gray-600"
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
          <h3 className="section-title text-2xl mb-4">No Products Available</h3>
          <p className="section-subtitle">
            Check back later for new arrivals and exciting products!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-card-container py-8">
      <div className="max-w-[90vw] mx-auto px-4">
        <div className="flex flex-wrap gap-8 mt-12 justify-center">
          {models.map((model, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="product-card text-center w-[calc(25%-1rem)]"
            >
              <img
                src={`${import.meta.env.VITE_REACT_APP_URL}/products/product/${
                  model._id
                }/image/${0}`}
                alt={model.name || "Product image"}
                loading="lazy"
              />
              <h3>{model.name}</h3>
              <p className="product-card-specs">{model.displaySize}</p>
              <p className="product-card-price">
                ₹{model.price?.toLocaleString()}
              </p>
              <p className="product-card-monthly">
                From ₹{model.monthly} with instant cashback*
              </p>
              <div className="flex flex-col items-center gap-2">
                <Link to={`/${model._id}`} className="product-card-buy-btn">
                  Buy Now
                </Link>
                {deletel && (
                  <button
                    onClick={() => handelDelete(model._id)}
                    className="product-card-delete-btn"
                  >
                    Delete Product
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="product-card-disclaimer">
          * Instant cashback available with eligible cards. EMI available with
          most leading banks.
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
