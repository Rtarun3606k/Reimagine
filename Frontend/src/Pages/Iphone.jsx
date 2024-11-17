import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import IPhoneNav from "../components/IPhoneNav";
import PromoBanner from "../components/PromoBanner";
import { Link } from "react-router-dom";
import { ChevronRight, Plus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Apple Intelligence",
    subtitle: "Powerful possibilities.",
    description:
      "With intelligent features that adapt to how you use your iPhone, everything becomes more personalized.",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-model-unselect-gallery-2-202309?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693010535312",
    gradient: "from-gray-900 to-gray-800",
  },
  {
    title: "Cutting-Edge Cameras",
    subtitle: "Picture your best photos and videos.",
    description: "Advanced camera system for stunning photos in any light.",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-7inch-blue?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923777972",
    gradient: "from-blue-900 to-blue-800",
  },
  {
    title: "A18 Pro Chip",
    subtitle: "Fast that lasts.",
    description: "The world's most powerful smartphone chip.",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-model-unselect-gallery-1-202309?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693010531869",
    gradient: "from-orange-900 to-orange-800",
  },
  {
    title: "Beautiful Innovation",
    subtitle: "By design.",
    description: "Crafted with premium materials and advanced technology.",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-7inch-pink?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923777519",
    gradient: "from-purple-900 to-purple-800",
  },
];

const models = [
  {
    name: "iPhone 15",
    displaySize: '6.1" display',
    price: "From ₹79900.00",
    monthly: "₹5492.00/mo.",
    image:
      // "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-7inch-blue?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923777972",
      // "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-7inch-blue?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923777972",
      "assets/images/iphone15.png",
  },
  {
    name: "iPhone 15 Plus",
    displaySize: '6.7" display',
    price: "From ₹89900.00",
    monthly: "₹6325.00/mo.",
    image:
      // "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-plus-finish-select-202309-6-7inch_GEO_US?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923780078",
      "assets/images/iphone15plus.png",
  },
  {
    name: "iPhone 15 Pro",
    displaySize: '6.1" display',
    price: "From ₹134900.00",
    monthly: "₹7492.00/mo.",
    image:
      // "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-model-unselect-gallery-2-202309?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693010535312",
      "assets/images/iphone15pro.png",
  },
  {
    name: "iPhone 15 Pro Max",
    displaySize: '6.7" display',
    price: "From ₹159900.00",
    monthly: "₹8825.00/mo.",
    image:
      // "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-finish-select-202309-6-7inch_GEO_US?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693009279096",
      "assets/images/iphone15promax.png",
  },
];

export default function Iphone() {
  const component = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top center",
        },
      });

      gsap.from(".model-card", {
        x: -100,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".models-section",
          start: "top center",
        },
      });
    }, component);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-black min-h-screen" ref={component}>
      <div className="sticky mt-6">{/* <IPhoneNav /> */}</div>
      <PromoBanner />

      <main className="pt-[120px]">
        {/* Hero Section */}
        <section
          className="max-w-[1200px] mx-auto px-4 py-20 text-center relative opacity-70"
          style={{
            // backgroundImage:
            // "url(https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-7inch-blue?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923777972)",
            backgroundImage:
              "url(https://photos5.appleinsider.com/gallery/56314-114642-15-Pro-colors-xl.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)",
          }}
        >
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 text-white bg-clip-text">
            iPhone 15
          </h1>
          <p className="text-3xl text-gray-400 mb-8">Designed to be loved.</p>
          <div className="flex justify-center gap-4 mb-12">
            <Link
              to="/shop/iphone-15"
              className="px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
            >
              Buy
            </Link>
            <Link
              to="/iphone-15/learn-more"
              className="px-8 py-3 text-blue-500 hover:underline"
            >
              Learn more <ChevronRight className="inline-block w-4 h-4" />
            </Link>
          </div>
          <div className="flex justify-center items-end gap-8">
            <img
              src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-plus-finish-select-202309-6-7inch_GEO_US?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923780078"
              alt="iPhone 15 Plus"
              className="w-1/4 transform hover:scale-105 transition-transform duration-300"
            />
            <img
              src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-finish-select-202309-6-7inch_GEO_US?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693009279096"
              alt="iPhone 15 Pro Max"
              className="w-1/3 transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </section>

        {/* Features Grid */}
        <section className="max-w-[1200px] mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 features-grid">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`feature-card relative overflow-hidden rounded-3xl bg-gradient-to-br ${feature.gradient} p-8 aspect-square`}
              >
                <div className="relative z-10">
                  <h3 className="text-sm text-gray-300 mb-2">
                    {feature.title}
                  </h3>
                  <h2 className="text-3xl font-semibold mb-4">
                    {feature.subtitle}
                  </h2>
                  <p className="text-gray-100">{feature.description}</p>
                  <button className="absolute bottom-8 right-8 p-2 rounded-full bg-gray-800/50 hover:bg-gray-800 transition-colors">
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Models Section */}
        <section className=" text-grey-300 py-20 models-section">
          <div className="max-w-[980px] mx-auto px-4">
            <h2 className="text-4xl font-semibold mb-2">
              Which iPhone is right for you?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mt-12">
              {models.map((model, index) => (
                <div
                  key={index}
                  className="model-card text-center bg-gray-300 p-4 rounded-lg"
                >
                  <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-auto mb-8 mix-blend-multiply"
                  />
                  <h3 className="text-2xl font-semibold mb-2">{model.name}</h3>
                  <p className="text-gray-500 mb-2">{model.displaySize}</p>
                  <p className="text-xl mb-1">{model.price}</p>
                  <p className="text-gray-500 text-sm mb-4">
                    From {model.monthly} with instant cashback*
                  </p>
                  <Link
                    to={`/shop/${model.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="inline-block px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
                  >
                    Buy
                  </Link>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500 mt-8">
              * Instant cashback available with eligible cards. EMI available
              with most leading banks.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
