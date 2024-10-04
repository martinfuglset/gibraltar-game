import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let app;
if (!getApps().length) {
  app = initializeApp();
} else {
  app = getApps()[0];
}

export const db = getFirestore(app);
