import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../Css/Products.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import IPhoneNav from '../components/IPhoneNav';
import PromoBanner from '../components/PromoBanner';

gsap.registerPlugin(ScrollTrigger);

const iPhoneModels = [
  {
    title: "iPhone 15 Pro",
    subtitle: "Titanium. So strong. So light. So Pro.",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-model-unselect-gallery-2-202309?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693010535312",
    price: "From $999",
    gradient: "from-purple-600 via-pink-500 to-blue-500"
  },
  {
    title: "iPhone 15",
    subtitle: "New camera. New design. Newphoria.",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-model-unselect-gallery-2-202309_GEO_US?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692925254305",
    price: "From $799",
    gradient: "from-blue-400 via-teal-500 to-green-400"
  },
  {
    title: "iPhone 15 Plus",
    subtitle: "Plus size. Plus battery. Plus excitement.",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-plus-finish-select-202309-6-7inch_GEO_US?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923780078",
    price: "From $899",
    gradient: "from-pink-500 via-rose-500 to-orange-500"
  },
  {
    title: "iPhone 15 Pro Max",
    subtitle: "Ultimate iPhone. Ultimate experience.",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-finish-select-202309-6-7inch_GEO_US?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693009279096",
    price: "From $1199",
    gradient: "from-gray-900 via-gray-700 to-gray-500"
  }
];

const IPhonePage = () => {
  const component = useRef();
  const slider = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let panels = gsap.utils.toArray(".panel");
      
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: slider.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + slider.current.offsetWidth,
        },
      });

      // Animate the header text
      gsap.from(".header-text", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2
      });
    }, component);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="product-page">
        <header className="product-header">
          <h1>Apple</h1>
        </header>
        <nav className="product-nav">
          <a href="#">Mac</a>
          <a href="#">iPad</a>
          <a href="#">iPhone</a>
          <a href="#">Watch</a>
          <a href="#">TV</a>
          <a href="#">Music</a>
          <a href="#">Support</a>
        </nav>
        <main className="product-main" ref={component}>
          <IPhoneNav />
          <PromoBanner />
          
          <div className="pt-[150px]">
            <div className="flex flex-col items-center justify-center max-w-[980px] mx-auto px-4 py-20">
              <h1 className="header-text text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 text-transparent bg-clip-text">
                iPhone 15
              </h1>
              <p className="header-text text-3xl text-gray-400">
                Designed to be loved.
              </p>
            </div>

            <div
              ref={slider}
              className="container"
              style={{
                width: `${100 * iPhoneModels.length}vw`,
                height: "100vh",
                display: "flex",
              }}
            >
              {iPhoneModels.map((model, index) => (
                <div 
                  key={index}
                  className="panel" 
                  style={{ flex: "0 0 100vw", height: "100vh" }}
                >
                  <div className="relative h-full flex items-center justify-center">
                    <img 
                      src={model.image}
                      alt={model.title}
                      className="w-full h-full object-cover absolute inset-0"
                    />
                    <div className="relative z-10 text-center p-8 bg-black/30 backdrop-blur-sm rounded-3xl">
                      <h2 className={`text-5xl font-bold mb-4 bg-gradient-to-r ${model.gradient} text-transparent bg-clip-text`}>
                        {model.title}
                      </h2>
                      <p className="text-2xl text-white/90 mb-6">{model.subtitle}</p>
                      <p className="text-xl text-white/80 mb-8">{model.price}</p>
                      <Link 
                        to={`/shop/${model.title.toLowerCase().replace(/\s+/g, '-')}`}
                        className="px-8 py-3 bg-white text-black rounded-full hover:bg-white/90 transition-colors duration-300"
                      >
                        Buy Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <footer className="product-footer">
          <p>&copy; 2024 Apple Inc. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default IPhonePage;