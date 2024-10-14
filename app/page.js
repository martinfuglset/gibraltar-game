"use client"; // Ensure this is a Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use Next.js router for navigation
import Image from 'next/image';

export default function Home() {
  const [churchName, setChurchName] = useState('');
  const router = useRouter(); // For routing to another page

  const handleLaunchSession = async () => {
    if (!churchName) {
      alert("Please enter a church name");
      return;
    }

    try {
      console.log("Sending data to the API...");

      // Make a POST request to the create-game endpoint
      const response = await fetch(`/api/create-game`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          church: churchName,  // Send church name in the request body
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Game created:", data);
        const { id } = data;

        // Redirect to another page after successful API request
        router.push(`/session/${id}`);
      } else {
        console.error("Failed to create game");
      }
    } catch (error) {
      console.error("Error sending data to the API:", error);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-black via-gray-900 to-black animate-gradient">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-50 animate-gradient"></div>
      <div className="relative z-10 text-center">
        {/* Logo Image */}
        <Image 
          src="/logo.png" // Your logo in the public folder
          alt="Operation Gibraltar"
          width={600}  // Increased logo size
          height={200}
          className="mx-auto mb-8"
        />

        {/* Wrapper for Input and Button */}
        <div className="max-w-md mx-auto space-y-4 text-xl tracking-wide">
          {/* Input Field */}
          <input
            type="text"
            placeholder="CHURCH NAME"
            value={churchName}
            onChange={(e) => setChurchName(e.target.value.toUpperCase())} // Capture input and force uppercase
            className="block w-full h-12 px-4 text-white text-center font-bold border border-white bg-transparent focus:outline-none font-stardos"
            style={{ textTransform: 'uppercase' }} // Force uppercase display in CSS
          />

          {/* Launch Session Button */}
          <button
            onClick={handleLaunchSession}
            className="w-full h-12 text-black font-bold bg-white hover:bg-gray-300 transition duration-300 font-stardos"
          >
            LAUNCH SESSION
          </button>
        </div>
      </div>
    </div>
  );
}
