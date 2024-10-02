"use client"; // Add this at the top to ensure it's treated as a Client Component

import { useState } from "react";
import { useRouter } from "next/navigation"; // Use the updated 'next/navigation' for routing in Next.js 13+
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase"; // Import your Firestore database
import Image from "next/image";

export default function Home() {
  const [churchName, setChurchName] = useState("");
  const router = useRouter(); // Use the 'next/navigation' version for routing

  const handleLaunchSession = async () => {
    if (!churchName) {
      alert("Please enter a church name");
      return;
    }

    try {
      // Add a new document to the "games" collection
      await addDoc(collection(db, "games"), {
        church: churchName,
        start: new Date(), // Automatically adds the current date/time
      });

      // Redirect to another page after the document is added
      router.push("/session"); // Assuming you have a '/session' page
    } catch (error) {
      console.error("Error adding document: ", error);
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
          width={600} // Increased logo size
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
