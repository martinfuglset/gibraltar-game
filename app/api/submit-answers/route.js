"use server";

import { NextResponse } from 'next/server';
import { db } from '../../../lib/firestore';

import { Timestamp } from 'firebase-admin/firestore';

export async function POST(request) {
  const { answers, id, team } = await request.json();

  // create submissions document
  const submission = {
    game: id,
    team,
    answers,
    timestamp: Timestamp.now()
  };

  await db.collection("submissions").add(submission);
  
  return NextResponse.json({ result: "ok" });
}
