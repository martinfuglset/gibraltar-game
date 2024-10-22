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
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 });
  const [answers, setAnswers] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: '',
    q7: '',
    q8: '',
    q9: '',
    q10: ''
  });

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
          clearInterval(timer); // Clear the interval to stop the countdown
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameData]);

  useEffect(() => {
    const storedTeam = localStorage.getItem(`team_${id}`);
    if (storedTeam) {
      setTeam(storedTeam);
    }

    const storedSubmitted = localStorage.getItem(`submitted_${id}`);
    if (storedSubmitted) {
      setHasSubmitted(true);
    }
  }, []);

  const selectTeam = (team) => {
    // store team in localStorage and in state variable
    setTeam(team);
    localStorage.setItem(`team_${id}`, team);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/submit-answers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, team, answers })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);

      setHasSubmitted(true);
      localStorage.setItem(`submitted_${id}`, 'true');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!gameData) {
    return <div className="h-screen flex items-center justify-center">
      <Spinner />
    </div>;
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      { (gameData && gameData.state == "started" && team) && 
        <div className="text-center flex-col mb-20 w-full px-4">
          <p className="text-4xl fixed px-10 py-10 w-full left-0 top-0 bg-black">
            {timeLeft.minutes}:{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}
          </p>
          { !hasSubmitted && (
            <div className="mt-40"> 
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className="mt-10 text-2xl">
                  <div>Question {i + 1}</div>
                  <input
                    className="text-black text-xl w-full text-center py-2"
                    name={`q${i + 1}`}
                    type="number"
                    pattern="[0-9]*"
                    value={answers[`q${i + 1}`]}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
              <button
                onClick={handleSubmit}
                className="uppercase text-2xl bg-red-400 w-full py-2 rounded-lg mt-20"
              >
                Submit answers
              </button>
            </div>
          )}
          { hasSubmitted && 
            <div className="mt-20 text-4xl">
              <p>Waiting for results</p>
            </div>
          }
        </div>
      }

      { (gameData && gameData.state !== "finished") && (
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
          { (team && gameData.state == "not-started") && (
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