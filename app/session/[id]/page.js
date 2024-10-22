"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/lib/firestore-client';
import { doc, onSnapshot } from "firebase/firestore";
import Spinner from '@/app/components/spinner';
import { calculateTimeLeft } from '@/utils/timeleft';

const SessionPage = () => {
  const { id } = useParams();
  const [gameData, setGameData] = useState(null);
  const [team, setTeam] = useState(null);
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
        setTimeLeft(calculateTimeLeft(gameData.startTime));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameData]);

  useEffect(() => {
    const storedTeam = localStorage.getItem(`team_${id}`);
    if (storedTeam) {
      setTeam(storedTeam);
    }
  }, []);

  const selectTeam = (team) => {
    // store team in localStorage and in state variable
    setTeam(team);
    localStorage.setItem(`team_${id}`, team);
  }

  if (!gameData) {
    return <div className="h-screen flex items-center justify-center">
      <Spinner />
    </div>;
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      { (gameData && gameData.state == "started") && 
        <div class="text-center flex-col mb-20">
          <p className="text-4xl fixed px-10 py-10 w-full left-0 top-0 bg-black">
            {timeLeft.minutes}:{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}
          </p>
          <div className="mt-40">
            <div className="mt-10">
              Question 1
            </div>
            <div className="mt-10">
              Question 2
            </div>
            <div className="mt-10">
              Question 3
            </div>
            <div className="mt-10">
              Question 4
            </div>
            <div className="mt-10">
              Question 5
            </div>
            <div className="mt-10">
              Question 6
            </div>
            <div className="mt-10">
              Question 7
            </div>
            <div className="mt-10">
              Question 8
            </div>
            <div className="mt-10">
              Question 9
            </div>
            <div className="mt-10">
              Question 10
            </div>
          </div>
        </div>
      }

      { (gameData && gameData.state == "not-started") && (
        <>
          {!team && (
            <div className="flex flex-col text-center">
              <h2 className="uppercase text-4xl">Select your team</h2>
              <button onClick={() => selectTeam("red")} className="bg-red-400 mt-6 h-32 text-3xl uppercase w-96 cursor-pointer">
                Team Red
              </button>
              <button onClick={() => selectTeam("blue")} className="bg-blue-400 mt-6 h-32 text-3xl uppercase w-96 cursor-pointer">
                Team Blue
              </button>
            </div>
            )
          }
          { team &&  (
              <div className="flex flex-col text-center">
                <h2 className="uppercase text-4xl">Waiting for the game to start</h2>
                <p className="text-3xl mt-6">You are on team <span className="uppercase">{team}</span></p>
              </div>
            )
          }
        </>
      )}

      { (gameData && gameData.state == "finished") && (
        <div className="flex flex-col text-center">
          <h2 className="uppercase text-4xl">Game over</h2>
        </div>
      )}
      
      <div className="hidden">
        <pre>{JSON.stringify(gameData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default SessionPage;