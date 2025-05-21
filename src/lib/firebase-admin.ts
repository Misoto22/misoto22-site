import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Handle private key format for Vercel deployment
const privateKey = process.env.FIREBASE_PRIVATE_KEY ? 
  process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined;

const firebaseConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey,
  }),
};

// Initialize Firebase Admin only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { db };