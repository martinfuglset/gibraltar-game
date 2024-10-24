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
      QRCode.toDataURL(`${domain}/session/${id}`, { width: 800 })
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
        <div className="absolute left-16 top-16">
          { src && <div class="bg-white w-3/5 rounded-[50px] p-4">
            <img src={src} class="w-full" alt="QR Code" />
          </div> }
        </div>
        <div class="absolute bottom-0 left-16 w-3/5 bg-beige min-h-52 rounded-t-[50px] pt-4 px-4">
            <div class="border-yellow border-t border-x h-full w-full rounded-t-[50px] p-8 relative uppercase text-yellow text-2xl leading-relaxed">
              <h4 class="absolute top-8 right-8 text-brown text-3xl font-bold">Instructions</h4>
              <p>
                Two ships are approaching your fortress! <br />
                1. SCAN THE QR CODE <br />
                2. Select your team <br />
                3. ANSWER THE QUESTIONS <br />
              </p>
              <p class="mt-2">
                You have 5 minutes to defend the fortress, so make every second count!
              </p>
              <p class="mt-2">
                If the majority of your team answers a question incorrectly, you will miss your shot at the ship.
              </p>
            </div>
        </div>
        <button className="
          absolute bottom-4 right-4 bg-gradient-to-b from-brgr1 to-brgr2 w-3/12 text-6xl h-32 cursor-pointer uppercase
          text-yellow border border-yellow rounded-3xl
        " onClick={startGame}>
          start game
        </button>
      </div>
    </div>
  );
}
