import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const models = [
  {
    name: "iPhone 15",
    displaySize: '6.1" display',
    price: "From ₹79900.00",
    monthly: "₹5492.00/mo.",
    image: "assets/images/iphone15.png",
  },
  {
    name: "iPhone 15 Plus",
    displaySize: '6.7" display',
    price: "From ₹89900.00",
    monthly: "₹6325.00/mo.",
    image: "assets/images/iphone15plus.png",
  },
  {
    name: "iPhone 15 Pro",
    displaySize: '6.1" display',
    price: "From ₹134900.00",
    monthly: "₹7492.00/mo.",
    image: "assets/images/iphone15pro.png",
  },
  {
    name: "iPhone 15 Pro Max",
    displaySize: '6.7" display',
    price: "From ₹159900.00",
    monthly: "₹8825.00/mo.",
    image: "assets/images/iphone15promax.png",
  },
  {
    name: "iPhone 15 Pro Max",
    displaySize: '6.7" display',
    price: "From ₹159900.00",
    monthly: "₹8825.00/mo.",
    image: "assets/images/iphone15promax.png",
  },
  {
    name: "iPhone 15 Pro Max",
    displaySize: '6.7" display',
    price: "From ₹159900.00",
    monthly: "₹8825.00/mo.",
    image: "assets/images/iphone15promax.png",
  },
];

const ProductCard = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
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
  }, []);

  return (
    <section className="text-grey-300 py-2 models-section opacity-100 z-50">
      <div className="max-w-[90vw] mx-auto px-4">
        <div className="flex flex-wrap gap-8 mt-12 justify-center">
          {models.map((model, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="text-center bg-gray-300 p-4 rounded-lg w-[calc(25%-1rem)]"
            >
              <img
                src={model.image}
                alt={model.name}
                className="w-full h-auto mb-8"
              />
              <h3 className="text-2xl font-semibold mb-2">{model.name}</h3>
              <p className="text-gray-500 mb-2">{model.displaySize}</p>
              <p className="text-xl mb-1">{model.price}</p>
              <p className="text-gray-500 text-sm mb-4">
                From {model.monthly} with instant cashback*
              </p>
              <Link
                to={`/shop/${model.name.toLowerCase().replace(/\s+/g, "-")}`}
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
    </section>
  );
};

export default ProductCard;
