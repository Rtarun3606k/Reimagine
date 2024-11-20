import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { get_access_token } from "../utils/Cookies";

gsap.registerPlugin(ScrollTrigger);

const ProductCard = ({ models, deletel }) => {
  console.log(models);
  const cardsRef = useRef([]);
  const [images, setImages] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
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
    };

    fetchImages();

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
          trigger: cardsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [models]);

  const handelDelete = async (id) => {
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
    } else {
      console.error("Failed to delete product");
    }
  };

  return (
    <div className="text-grey-300 py-2 models-section opacity-100 z-50">
      <div className="max-w-[90vw] mx-auto px-4">
        <div className="flex flex-wrap gap-8 mt-12 justify-center">
          {models.map((model, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="text-center bg-gray-300 p-4 rounded-lg w-[calc(25%-1rem)]"
            >
              <img
                src={`${import.meta.env.VITE_REACT_APP_URL}/products/product/${
                  model._id
                }/image/${0}`}
                alt=""
              />
              <h3 className="text-2xl font-semibold mb-2">{model.name}</h3>
              <p className="text-gray-500 mb-2">{model.displaySize}</p>
              <p className="text-xl mb-1">{model.price}</p>
              <p className="text-gray-500 text-sm mb-4">
                From {model.monthly} with instant cashback*
              </p>
              <Link
                to={`/${model._id}`}
                className="px-6 py-2 bg-blue-500 text-white hover:bg-blue-700 transition-colors duration-300 rounded-lg z-50"
              >
                Buy
              </Link>
              {deletel && (
                <button
                  onClick={() => handelDelete(model._id)}
                  className="bg-red-400 px-6 py-2 text-white hover:bg-red-600 transition-colors duration-300 rounded-lg mt-4"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-8">
          * Instant cashback available with eligible cards. EMI available with
          most leading banks.
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
