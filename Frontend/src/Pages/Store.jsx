import React from "react";
import ProductCard from "../components/ProductCard";
import ImageSlider from "../components/ImageSlider";
import VideoSlider from "../components/VideoSlider";

const Store = () => {
  return (
    <div className="z-50 flex-col justify-center items-center">
      {/* <ImageSlider /> */}
      <center>
        <div className="w-[80%] h-[50%] flex items-center justify-center rounded-xl">
          <VideoSlider />
        </div>
      </center>
      <ProductCard />
    </div>
  );
};

export default Store;
