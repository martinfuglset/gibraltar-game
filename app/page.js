"use client"; // Ensure this is a Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use Next.js router for navigation
import Image from 'next/image';

export default function Home() {
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
      </div>
    </div>
  );
}
