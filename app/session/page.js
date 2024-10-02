"use client";  // Add this at the top

import { useState, useEffect } from "react";

export default function Session() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide the image after 10 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000); // 10000 ms = 10 seconds

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black text-white">
      <img
        src="/Opening_movie.png"
        alt="Opening Movie"
        className={`transition-opacity duration-1000 absolute ${isVisible ? "opacity-100" : "opacity-0"} z-10`}
      />
      <img
        src="/QR.png"
        alt="QR Code"
        className="absolute z-0"
      />
    </div>
  );
}
