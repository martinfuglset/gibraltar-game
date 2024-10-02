"use client"; // Ensure this is a Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use Next.js router for navigation
import Image from 'next/image';

const apiRoot = 'https://api-vnbjtid72q-lz.a.run.app'; // Define the API root

export default function Home() {
  const [churchName, setChurchName] = useState('');
  const router = useRouter(); // For routing to another page

  const handleLaunchSession = async () => {
    if (!churchName) {
      alert("Please enter a church name");
      return;
    }

    // Generate a timestamp using the current date/time
    const timestamp = new Date().toISOString();

    try {
      console.log("Sending data to the API...");

      // Make a POST request to the create-game endpoint
      const response = await fetch(`${apiRoot}/create-game`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          church: churchName,  // Send church name in the request body
          start: timestamp,    // Send the timestamp
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Game created:", data);
        // Redirect to another page after successful API request
        router.push('/session');
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
        <div className="max-w-md mx-auto space-y-4">
          {/* Input Field */}
          <input
            type="text"
            placeholder="CHURCH NAME"
            value={churchName}
            onChange={(e) => setChurchName(e.target.value)} // Capture input
            className="block w-full h-12 px-4 text-white text-center border border-white bg-transparent focus:outline-none font-stardos"
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
