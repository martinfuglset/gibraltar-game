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
  
  return NextResponse.json({ result: "1" });
}
