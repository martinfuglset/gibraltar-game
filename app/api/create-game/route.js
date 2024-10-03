"use server";

import { NextResponse } from 'next/server';
import { db } from '../../../lib/firestore';

import { Timestamp } from 'firebase-admin/firestore';

export async function POST(request) {
  const { church } = await request.json();

  const doc = await db.collection("games").add({
    church: church,
    start: Timestamp.now(),
  });
  
  return NextResponse.json({ id: doc.id });
}
