"use client"; // Ensure this is a Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use Next.js router for navigation
import Image from 'next/image';

export default function Home() {
  // todo add language selector for session
  // 
  const [churchName, setChurchName] = useState('');
  const [language, setLanguage] = useState('nb');
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
          church: churchName, 
          language: language,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Game created:", data);
        const { id } = data;

        // Redirect to another page after successful API request
        router.push(`/admin/${id}`);
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
            className="block w-full h-12 px-4 text-white text-center font-bold border border-white bg-transparent focus:outline-none"
            style={{ textTransform: 'uppercase' }} // Force uppercase display in CSS
          />
          <select
            className="block w-full h-12 px-4 text-white text-center uppercase font-bold border border-white bg-transparent focus:outline-none"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="nb">Norsk</option>
            <option value="en">English</option>
            <option value="de">Deutsch</option>
            <option value="fr">Français</option>
            <option value="it">Italiano</option>
            <option value="nl">Nederlands</option>
            <option value="pl">Polski</option>
            <option value="pt">Português</option>
            <option value="ro">Română</option>
            <option value="ru">Русский</option>
          </select>
          {/* Launch Session Button */}
          <button
            onClick={handleLaunchSession}
            className="w-full h-12 text-black font-bold bg-white hover:bg-gray-300 transition duration-300"
          >
            LAUNCH SESSION
          </button>
        </div>
      </div>
    </div>
  );
}
