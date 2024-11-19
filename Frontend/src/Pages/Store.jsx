import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ImageSlider from "../components/ImageSlider";
import VideoSlider from "../components/VideoSlider";

const Store = () => {
  const [Data, setData] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_URL}/products/allProducts`
      );
      const data = await response.json();
      console.log(data);
      // data = data.reverse();
      setData(data.reverse());
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    // Add any side effects here
    fetchProducts();
  }, []);
  return (
    <div className="z-50 flex-col justify-center items-center">
      {/* <ImageSlider /> */}
      <center>
        <div className="w-[80%] h-[50%] flex items-center justify-center rounded-xl">
          <VideoSlider />
        </div>
      </center>
      <ProductCard models={Data} />
    </div>
  );
};

export default Store;
