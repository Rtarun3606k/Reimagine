import React from "react";
import { Slide, Zoom } from "react-slideshow-image";
// import "../Css/Product.scss";
import "react-slideshow-image/dist/styles.css";

const ImageSlider = ({ images, id }) => {
  // const images = [
  //   "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  //   "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  //   "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  //   "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  // ];
  return (
    <>
      <center>
        <div
          className="slide-container flex flex-col justify-center p-4 rounded-lg"
          style={{ width: "80%", background: "rgb(134 134 139 / 10%)" }}
        >
          <Slide scale={0.4}>
            {images.map((each, index) => (
              <>
                <img
                  src={`${
                    import.meta.env.VITE_REACT_APP_URL
                  }/products/product/${id}/image/${index}`}
                  alt=""
                />
              </>
            ))}
          </Slide>
        </div>
      </center>
    </>
  );
};

export default ImageSlider;
