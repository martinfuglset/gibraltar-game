"use server";

import { NextResponse } from 'next/server';
import { db } from '../../../lib/firestore';

import { Timestamp } from 'firebase-admin/firestore';

export async function POST(request) {
  const { id } = await request.json();

  await db.collection("games").doc(id).update({
    state: 'finished',
  });

  // TODO calculate result here
  /*
  for (i in 1..10) 
  if more than 50% of submissions for question i are correct than add 1 point to the result
  10 points is success
  
  */


  return NextResponse.json({ result: "11" });
}
