"use server";

import { NextResponse } from 'next/server';
import { db } from '../../../lib/firestore';

import { Timestamp } from 'firebase-admin/firestore';

export async function POST(request) {
  const { id } = await request.json();

  const startTime = Timestamp.now();
  
  await db.collection("games").doc(id).update({
    state: 'started',
    startTime: startTime
  });
  
  return NextResponse.json({ startTime: startTime.toDate() });
}
