"use client";  // Add this as required

import React, { useState, useEffect } from 'react';
import NotFound from '@/app/components/not-found';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation'; // Use Next.js router for navigation
import YouTubePlayer from '@/app/components/youtube';
import QRCode from 'qrcode';
import { getTranslation } from '@/utils/i18n';

export default function SessionPage() {
  const { id } = useParams();
  const router = useRouter();

  const [notFound, setNotFound] = useState(false);
  const [data, setData] = useState(null);
  const [src, setSrc] = useState('');
  
  useEffect(() => {
    fetch(`/api/get-game?id=${id}`)
      .then(response => {
        if (response.status === 404) {
          setNotFound(true);
        } else {
          return response.json();
        }
      })
      .then(data => {
        if (data) {
          setData(data);
        }
      })
      .catch(error => {
        console.error('Error fetching the game:', error);
        // Handle the error appropriately
      });

      // get the domain from the request, including the protocol
      const domain = window.location.origin;
      QRCode.toDataURL(`${domain}/session/${id}`, { width: 800, color: {
        dark: '#FFFFFF', // White color for the QR code
        light: '#000000' // Black background
      } })
        .then(url => setSrc(url))
        .catch(err => console.error(err));
  }, [id]);

  if (notFound) {
    return <NotFound />;
  }

  const startGame = async () => {
    // Make a POST request to the create-game endpoint
    const response = await fetch(`/api/start-game`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,  // Send church name in the request body
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Game started:", data);

      // Redirect to another page after successful API request
      router.push(`/admin/${id}/live`);
    } else {
      console.error("Failed to start game");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="relative h-screen w-full">
        <YouTubePlayer id="-QIl20iamS8" className="absolute inset-0" />
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/2 h-full items-center justify-center flex flex-col">
          { src && <img src={src} alt="QR Code" /> }
          <h2 className="uppercase text-5xl mt-10">{ getTranslation('scanToStart', data?.language) }</h2>
        </div>
        <button className="absolute bottom-0 right-0 bg-black w-96 text-4xl h-20 border-white cursor-pointer uppercase" onClick={startGame}>
          { getTranslation('startGame', data?.language) }
        </button>
      </div>
    </div>
  );
}
