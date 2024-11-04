import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Iphone() {
  const component = useRef();
  const slider = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let panels = gsap.utils.toArray(".panel");

      const numPanels = panels.length;

      // Animation to move panels horizontally
      gsap.to(panels, {
        xPercent: -100 * (numPanels - 1),
        ease: "none",
        scrollTrigger: {
          trigger: slider.current,
          pin: true,
          scrub: 1,
          snap: 1 / (numPanels - 1),
          end: () => "+=" + slider.current.offsetWidth,
          markers: false, // Disable markers for production
        },
      });
    }, component);

    return () => ctx.revert(); // Cleanup on component unmount
  }, []);

  return (
    <div className="App" ref={component}>
      {/* Slider container */}
      <div
        ref={slider}
        className="container"
        style={{
          width: `${100 * 4}vw`, // Adjust container width based on number of panels (4 panels => 400vw)
          height: "100vh",
          display: "flex",
        }}
      >
        {/* Panel 1 */}
        <div
          className="description panel blue"
          style={{
            flex: "0 0 100vw", // Ensure each panel takes 100vw width
            height: "100vh",
          }}
        >
          <div>
            SCROLL DOWN
            <div className="scroll-down">
              <div className="arrow"></div>
            </div>
          </div>
        </div>
        {/* Panel 2 */}
        <div
          className="panel bg-red-400"
          style={{
            flex: "0 0 100vw", // Each panel takes 100vw
            height: "100vh",
          }}
        >
          ONE
        </div>
        {/* Panel 3 */}
        <div
          className="panel bg-orange-500"
          style={{
            flex: "0 0 100vw", // Each panel takes 100vw
            height: "100vh",
          }}
        >
          TWO
        </div>
        {/* Panel 4 */}
        <div
          className="panel bg-purple-500"
          style={{
            flex: "0 0 100vw", // Each panel takes 100vw
            height: "100vh",
          }}
        >
          THREE
        </div>
      </div>

      {/* Last Container */}
      <div className="lastContainer" style={{ height: "100vh" }}>
        Last Container
      </div>
    </div>
  );
}
