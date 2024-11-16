import React, { useLayoutEffect, useRef } from 'react';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import IPhoneCard from '../components/IPhoneCard';

gsap.registerPlugin(ScrollTrigger);

const iPhoneModels = [
  {
    model: '15 Pro',
    price: '999',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch_GEO_US?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693009279082',
    color: 'gray'
  },
  {
    model: '15',
    price: '799',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch_GEO_US?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923777466',
    color: 'blue'
  },
  {
    model: '15 Plus',
    price: '899',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-plus-finish-select-202309-6-7inch_GEO_US?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923780078',
    color: 'pink'
  },
  {
    model: '15 Pro Max',
    price: '1199',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-finish-select-202309-6-7inch_GEO_US?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693009279096',
    color: 'black'
  }
];

export default function Iphone() {
  const component = useRef();
  const slider = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let panels = gsap.utils.toArray(".panel");

      const numPanels = panels.length;

      gsap.to(panels, {
        xPercent: -100 * (numPanels - 1),
        ease: "none",
        scrollTrigger: {
          trigger: slider.current,
          pin: true,
          scrub: 1,
          snap: 1 / (numPanels - 1),
          end: () => "+=" + slider.current.offsetWidth,
          markers: false,
        },
      });
    }, component);

    return () => ctx.revert();
  }, []);

  return (
    <div className="App" ref={component}>
      <div
        ref={slider}
        className="container"
        style={{
          width: `${100 * 5}vw`, // Updated to 5 panels
          height: "100vh",
          display: "flex",
        }}
      >
        <div
          className="description panel blue"
          style={{
            flex: "0 0 100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 className="text-4xl font-bold mb-4">iPhone 15 Models</h1>
          <div>
            SCROLL DOWN
            <div className="scroll-down">
              <div className="arrow"></div>
            </div>
          </div>
        </div>
        {iPhoneModels.map((model, index) => (
          <div
            key={index}
            className={`panel bg-gray-900`}
            style={{
              flex: "0 0 100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IPhoneCard {...model} />
          </div>
        ))}
      </div>

      <div className="lastContainer" style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <h2 className="text-3xl font-bold">Discover the iPhone 15 Family</h2>
      </div>
    </div>
  );
}