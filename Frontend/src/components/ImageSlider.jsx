import React from "react";
import { Slide, Zoom } from "react-slideshow-image";
// import "../Css/Product.scss";
import "react-slideshow-image/dist/styles.css";

const ImageSlider = () => {
  const images = [
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  ];
  return (
    <>
      <center>
        <div
          className="slide-container flex flex-col justify-center p-4 rounded-lg"
          style={{ width: "80%", background: "rgb(134 134 139 / 10%)" }}
        >
          <Slide scale={0.4}>
            {images.map((each, index) => (
              <center
                className="flex justify-center flex-row-reverse items-center gap-2"
                style={{
                  width: "80%",
                  height: "70vh",
                  // backgroundImage:
                  //   "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
                }}
              >
                {" "}
                <div
                  className="flex  flex-col justify-center items-center gap-2"
                  style={{
                    height: "90%",
                  }}
                >
                  <p
                    className="font-extrabold text-2xl"
                    style={{
                      background:
                        "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    POsition Lorem ipsum dolor sit amet consectetur, adipisicing
                    elit. Eum, reprehenderit! Nemo, ducimus.
                  </p>
                  <p
                    style={{
                      background:
                        "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    POsition Lorem ipsum dolor sit amet consectetur, adipisicing
                    elit. Eum, reprehenderit! Nemo, ducimus.
                  </p>
                </div>
                <img
                  className="rounded-lg"
                  key={index}
                  style={{ width: "60%", height: "70vh" }}
                  src={each}
                />
              </center>
            ))}
          </Slide>
        </div>
      </center>
    </>
  );
};

export default ImageSlider;
