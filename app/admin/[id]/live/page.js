"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/lib/firestore-client';
import { doc, onSnapshot } from "firebase/firestore";
import Spinner from '@/app/components/spinner';
import { calculateTimeLeft } from '@/utils/timeleft';
import YouTubePlayer from '@/app/components/youtube';
import { useRouter } from 'next/navigation'; // Use Next.js router for navigation

const LivePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [gameData, setGameData] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 });

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "games", id), (doc) => {
      setGameData(doc.data());
    });

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
          <YouTubePlayer id="ZwAedB0G78U" className="absolute inset-0" />
          <div className="absolute left-1/2 transform -translate-x-1/2 text-9xl bg-black px-20 py-10">
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