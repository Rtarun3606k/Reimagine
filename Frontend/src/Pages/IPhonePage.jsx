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
  const { model } = useParams(); // Extract the 'model' parameter from the URL
  console.log(model);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_URL}/single/single/${model}`
      );
      const data = await response.json();
      if (
        typeof data.product.image === "object" &&
        !Array.isArray(data.product.image)
      ) {
        data.product.image = Object.values(data.product.image);
      }
      setData(data);
      console.log(typeof data.product.image);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchProductsAll = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_URL}/products/allProducts`
      );
      const data = await response.json();
      console.log(data);
      setData2(data.reverse());
      console.log(Data2);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handelOrder = async () => {
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
      console.log(data);
      if (response.ok) {
        toast.success("Order placed successfully");
      } else {
        toast.error("Order failed");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handelCart = async () => {
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
      console.log(data);
      if (response.ok) {
        toast.success("Item added to caret successfully");
      } else {
        toast.error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchProductsAll();
  }, [model]); // Add 'model' as a dependency to re-fetch when it changes

  return (
    <div className="container mx-auto p-4 flex flex-col justify-center">
      {Data && Data.product && (
        <>
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-white">
              {Data.product.name}
            </h1>
            <p className="text-xl text-gray-400 mt-2">
              Starting at ₹{Data.product.price}
            </p>
          </div>
          <ImageSlider images={Data.product.image} id={model} />
          <div className="flex flex-col justify-center items-center w-full product-details mt-8 bg-gradient-to-r from-[#0f0f10] to-[#12131b]  p-8 rounded-lg shadow-lg">
            <div className="flex flex-wrap justify-between items-center w-full">
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-semibold text-white">
                  Product Details
                </h2>
                <h1 className="text-5xl font-bold text-white">
                  {Data.product.name}
                </h1>
                <p className="text-lg text-[#86869e] mt-4">
                  {Data.product.description}
                </p>
                <p className="text-lg text-[#86869e] mt-4">
                  Stock: {Data.product.stock}
                </p>
              </div>
              <div className="w-full md:w-1/2 mt-8 md:mt-0">
                <div className="colors">
                  <h3 className="text-2xl font-semibold text-white">
                    Available Colors
                  </h3>
                  <ul className="list-disc list-inside mt-2">
                    {Data.product.colors.map((color, index) => (
                      <li key={index} className="text-lg text-[#86869e]">
                        {color}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="sizes mt-8">
                  <h3 className="text-2xl font-semibold text-white">
                    Available Sizes
                  </h3>
                  <ul className="list-disc list-inside mt-2">
                    {Data.product.sizes.map((size, index) => (
                      <li key={index} className="text-lg text-[#86869e]">
                        {size}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <button
                onClick={handelOrder}
                className="px-6 py-2 bg-blue-500 text-white hover:bg-blue-700 transition-colors duration-300 rounded-lg mr-4"
              >
                Buy Now
              </button>
              <button
                onClick={handelCart}
                className="px-6 py-2 bg-green-500 text-white hover:bg-green-700 transition-colors duration-300 rounded-lg"
              >
                Add to Cart
              </button>
            </div>
            <div className="reviews mt-8 text-center">
              <h3 className="text-2xl font-semibold text-white">
                Customer Reviews
              </h3>
              <ul className="list-disc list-inside mt-2">
                {Data.product.reviews.length > 0 ? (
                  Data.product.reviews.map((review, index) => (
                    <li key={index} className="text-lg text-[#86869e]">
                      {review}
                    </li>
                  ))
                ) : (
                  <p className="text-lg text-gray-400">No reviews available</p>
                )}
              </ul>
            </div>
          </div>
        </>
      )}
      <div>
        <h1 className="text-3xl font-semibold text-white mt-8 text-center">
          More Products
        </h1>
        <ProductCard models={Data2} />
      </div>
    </div>
  );
};

export default IPhonePage;
