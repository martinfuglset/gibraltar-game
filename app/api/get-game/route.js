"use server";

import { NextResponse } from 'next/server';
import { db } from '../../../lib/firestore';

export async function GET(request) {
  const id = request.nextUrl.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const doc = await db.collection("games").doc(id).get();
  if (!doc.exists) {
    return NextResponse.json({ error: "Game not found" }, { status: 404 });
  }

  // return doc data as well as the ID
  return NextResponse.json({ id: doc.id, ...doc.data() });
}
