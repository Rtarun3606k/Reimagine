import React from "react";
import { Slide, Zoom } from "react-slideshow-image";

import "react-slideshow-image/dist/styles.css";

const Store = () => {
  const images = [
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  ];

  return (
    <center>
      <div
        className="slide-container flex flex-col justify-center p-4 rounded-lg"
        style={{ width: "80%", background: "rgb(134 134 139 / 10%)" }}
      >
        <Slide scale={0.4}>
          {images.map((each, index) => (
            <center>
              {" "}
              <p className="absolute top-1/4 ml-12  z-50">
                POsition Lorem ipsum dolor sit amet consectetur, adipisicing
                elit. Eum, reprehenderit! Nemo, ducimus.
              </p>
              <img
                className="rounded-lg"
                key={index}
                style={{ width: "80%", height: "70vh" }}
                src={each}
              />
            </center>
          ))}
        </Slide>
      </div>
    </center>
  );
};

export default Store;
