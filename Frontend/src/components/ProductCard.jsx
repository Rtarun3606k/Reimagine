import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const models = [
  {
    id: "1",
    name: "iPhone 15",
    displaySize: '6.1" display',
    price: "From ₹79900.00",
    monthly: "₹5492.00/mo.",
  },
  {
    id: "2",
    name: "iPhone 15 Plus",
    displaySize: '6.7" display',
    price: "From ₹89900.00",
    monthly: "₹6325.00/mo.",
  },
  {
    id: "3",
    name: "iPhone 15 Pro",
    displaySize: '6.1" display',
    price: "From ₹134900.00",
    monthly: "₹7492.00/mo.",
  },
  {
    id: "4",
    name: "iPhone 15 Pro Max",
    displaySize: '6.7" display',
    price: "From ₹159900.00",
    monthly: "₹8825.00/mo.",
  },
];

const ProductCard = ({ models }) => {
  console.log(models);
  // models = models.reverse();
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

  return (
    <Link className="text-grey-300 py-2 models-section opacity-100 z-50">
      <div className="max-w-[90vw] mx-auto px-4">
        <div className="flex flex-wrap gap-8 mt-12 justify-center">
          {models.map((model, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="text-center bg-gray-300 p-4 rounded-lg w-[calc(25%-1rem)]"
            >
              {/* {model.image.map((img, index) => {
                return (
                  <>
                    <img
                      src={`${
                        import.meta.env.VITE_REACT_APP_URL
                      }/products/product/${model._id}/image/${index}`}
                      alt=""
                    />
                  </>
                );
              })} */}

              <img
                src={`${import.meta.env.VITE_REACT_APP_URL}/products/product/${
                  model._id
                }/image/${0}`}
                alt=""
              />
              {/* {model.image.map ? (
                <img
                  src={`${
                    import.meta.env.VITE_REACT_APP_URL
                  }/products/product/${model._id}/image/${image}`}
                  alt={model.name}
                  className="w-full h-auto mb-8"
                />
              ) : (
                <div className="w-full h-auto mb-8 bg-gray-200">Loading...</div>
              )} */}
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
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-8">
          * Instant cashback available with eligible cards. EMI available with
          most leading banks.
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
