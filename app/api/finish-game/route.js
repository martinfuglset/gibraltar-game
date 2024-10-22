"use server";

import { NextResponse } from 'next/server';
import { db } from '../../../lib/firestore';

import { Timestamp } from 'firebase-admin/firestore';

export async function POST(request) {
  const { id } = await request.json();

  await db.collection("games").doc(id).update({
    state: 'finished',
  });

  // get all submissions for the game
  const submissions = await db.collection("submissions").where("game", "==", id).get();
  let scores = {
    "red": {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
    },
    "blue": {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
    }
  };

  submissions.forEach((doc) => {
    const submission = doc.data();
    const team = submission.team;
    if (submission.answers.q1 === "3") {
      scores[team][1]++;
    } else {
      scores[team][1]--;
    }
    if (submission.answers.q2 === "40") {
      scores[team][2]++;
    } else {
      scores[team][2]--;
    }
    if (submission.answers.q3 === "2") {
      scores[team][3]++;
    } else {
      scores[team][3]--;
    }
    if (submission.answers.q4 === "6") {
      scores[team][4]++;
    } else {
      scores[team][4]--;
    }
    if (submission.answers.q5 === "57") {
      scores[team][5]++;
    } else {
      scores[team][5]--;
    }
    if (submission.answers.q6 === "40") {
      scores[team][6]++;
    } else {
      scores[team][6]--;
    }
    if (submission.answers.q7 === "3") {
      scores[team][7]++;
    } else {
      scores[team][7]--;
    }
    if (submission.answers.q8 === "6") {
      scores[team][8]++;
    } else {
      scores[team][8]--;
    }
    if (submission.answers.q9 === "33") {
      scores[team][9]++;
    } else {
      scores[team][9]--;
    }
    if (submission.answers.q10 === "0") {
      scores[team][10]++;
    } else {
      scores[team][10]--;
    }
  });
  
  
  let redPassed = true;
  let bluePassed = true;

  // if any question has a score less than 0, the team failed the test
  for (let i = 1; i <= 10; i++) {
    if (scores["red"][i] <= 0) {
      redPassed = false;
    }
    if (scores["blue"][i] <= 0) {
      bluePassed = false;
    }
  }

  const stats = {
    "red": redPassed ? "passed" : "failed",
    "blue": bluePassed ? "passed" : "failed",
  }

  const result = redPassed && bluePassed ? "11" : redPassed ? "01" : bluePassed ? "10" : "00";

  return NextResponse.json({ result: result });
}
