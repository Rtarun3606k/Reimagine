import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import gsap from "gsap";
import "../Css/Profile.css";

const videos = [
  { url: "assets/videos/iphone1.mp4", title: "Video 1" },
  { url: "assets/videos/iphone2.mp4", title: "Video 2" },
  { url: "assets/videos/iphone3.mp4", title: "Video 3" },
];

const VideoSlider = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef(null);

  const handleNext = () => {
    gsap.to(playerRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        setCurrentVideoIndex((prevIndex) =>
          prevIndex === videos.length - 1 ? 0 : prevIndex + 1
        );
        gsap.to(playerRef.current, { opacity: 1, duration: 0.5 });
      },
    });
  };

  const handlePrev = () => {
    gsap.to(playerRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        setCurrentVideoIndex((prevIndex) =>
          prevIndex === 0 ? videos.length - 1 : prevIndex - 1
        );
        gsap.to(playerRef.current, { opacity: 1, duration: 0.5 });
      },
    });
  };

  const handleEnded = () => {
    handleNext();
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, duration * 1000); // Change video based on its duration
    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div className="container mx-auto p-5">
      <div className="relative bg-black shadow-2xl rounded-3xl text-white">
        <div ref={playerRef} className="rounded-3xl overflow-hidden">
          <ReactPlayer
            url={videos[currentVideoIndex].url}
            playing={playing}
            width="100%"
            height="100%"
            muted
            onEnded={handleEnded}
            onDuration={handleDuration}
          />
        </div>
        <div className="absolute top-1/2 transform -translate-y-1/2 left-4">
          <button
            onClick={handlePrev}
            className="bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-700 transition-colors duration-300"
          >
            <FaArrowLeft className="text-white" />
          </button>
        </div>
        <div className="absolute top-1/2 transform -translate-y-1/2 right-4">
          <button
            onClick={handleNext}
            className="bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-700 transition-colors duration-300"
          >
            <FaArrowRight className="text-white" />
          </button>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
          <h3 className="text-2xl font-semibold">
            {/* {videos[currentVideoIndex].title} */}
          </h3>
        </div>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 justify-center items-center">
          {videos.map((video, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full bg-gray-500 relative ${
                index === currentVideoIndex ? "w-16 h-1 bg-white" : ""
              }`}
            >
              {index === currentVideoIndex && (
                <div
                  className="absolute top-0 left-0 h-full bg-white rounded-full"
                  style={{
                    animation: `fill ${duration}s linear forwards`,
                  }}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoSlider;
