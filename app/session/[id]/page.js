"use client";  // Add this as required

import { useState, useEffect } from "react";

export default function Session() {
  const [stage, setStage] = useState(0); // 0 for first image, 1 for second image, 2 for grid and boats
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes countdown in seconds
  const [boatPositions, setBoatPositions] = useState([
    { x: 0, y: "50%" },   // Start from the left edge (Boat 1)
    { x: "100%", y: "20%" }, // Start from the right edge (Boat 2)
    { x: "50%", y: "100%" }, // Start from the bottom edge (Boat 3)
  ]);

  // Handle transitions between images and to the grid
  useEffect(() => {
    if (stage < 2) {
      // Change stage after 10 seconds (10000 ms)
      const timer = setTimeout(() => {
        setStage((prevStage) => prevStage + 1);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // Countdown logic for the timer once the grid is displayed
  useEffect(() => {
    if (stage === 2 && timeLeft > 0) {
      const countdown = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000); // Countdown every second

      // Move the boats to the center over the 5 minutes
      const progress = 1 - timeLeft / 300; // Progress from 0 to 1 over 300 seconds
      setBoatPositions([
        { x: `${50 * progress}%`, y: "50%" },   // Move to the center horizontally
        { x: `${100 - 50 * progress}%`, y: "20%" }, // Move to the center from the right
        { x: "50%", y: `${100 - 50 * progress}%` }, // Move to the center from the bottom
      ]);

      return () => clearInterval(countdown);
    }
  }, [stage, timeLeft]);

  // Format the time to display as mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black text-white">
      {stage === 0 && (
        <img
          src="/Opening_movie.png"
          alt="Opening Movie"
          className="transition-opacity duration-1000 absolute opacity-100 z-10"
        />
      )}
      {stage === 1 && (
        <img
          src="/QR.png"
          alt="QR Code"
          className="transition-opacity duration-1000 absolute opacity-100 z-10"
        />
      )}
      {stage === 2 && (
        <div className="flex flex-col items-center">
          {/* 100x100 Grid */}
          <div
            className="grid grid-cols-100 grid-rows-100 w-screen h-screen"
            style={{ display: "grid", gridTemplateColumns: "repeat(100, 1fr)", gridTemplateRows: "repeat(100, 1fr)" }}
          >
            {Array.from({ length: 10000 }).map((_, index) => (
              <div key={index} className="border border-gray-600 w-full h-full"></div>
            ))}
          </div>

          {/* Moving Boats */}
          {boatPositions.map((pos, index) => (
            <div
              key={index}
              className="absolute"
              style={{
                left: pos.x,
                top: pos.y,
                transition: "left 1s linear, top 1s linear", // Smooth transitions
              }}
            >
              🚤 {/* Emoji representing the boat */}
            </div>
          ))}

          {/* Timer */}
          <div className="absolute bottom-5 text-xl font-bold">
            {formatTime(timeLeft)}
          </div>
        </div>
      )}
    </div>
  );
}
