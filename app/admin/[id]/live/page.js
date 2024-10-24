"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/lib/firestore-client';
import { doc, onSnapshot } from "firebase/firestore";
import Spinner from '@/app/components/spinner';
import { calculateTimeLeft } from '@/utils/timeleft';
import YouTubePlayer from '@/app/components/youtube';
import QRCode from 'qrcode';
import { useRouter } from 'next/navigation'; // Use Next.js router for navigation

const LivePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [gameData, setGameData] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 });
  const [src, setSrc] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "games", id), (doc) => {
      setGameData(doc.data());
    });

    // get the domain from the request, including the protocol
    const domain = window.location.origin;
    QRCode.toDataURL(`${domain}/session/${id}`, { width: 800 })
      .then(url => setSrc(url))
      .catch(err => console.error(err));

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [id]);

  useEffect(() => {
    if (gameData && gameData.startTime) {
      // Set the initial time left immediately
      setTimeLeft(calculateTimeLeft(gameData.startTime));

      const timer = setInterval(() => {
        const newTimeLeft = calculateTimeLeft(gameData.startTime);
        setTimeLeft(newTimeLeft);

        if (newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
          // finish-game api call
          fetch(`/api/finish-game`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: id,  // Send church name in the request body
            }),
          }).then(response => {
            if (response.status === 200) {
              response.json().then(data => {
                const result = data.result;
                router.push(`/admin/${id}/result/${result}`);
              });
            }
          });
          clearInterval(timer); // Clear the interval to stop the countdown
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameData]);

  return (
    <div className="h-screen flex items-center justify-center">
      {gameData ? (
        <div className="relative h-screen w-full">
          <div className="absolute left-16 top-16 z-50">
            { src && <div class="bg-white w-2/5 rounded-[50px] p-4">
              <img src={src} class="w-full" alt="QR Code" />
            </div> }
          </div>
          <YouTubePlayer id="ZwAedB0G78U" className="absolute inset-0" />
          <div className="absolute left-1/2 transform -translate-x-1/2 text-yellow text-9xl bg-brown rounded-b-[50px] px-20 py-10 font-stardos">
            <p>{timeLeft.minutes}:{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}</p>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default LivePage;