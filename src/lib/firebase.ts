'use client';

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDJHq52CxFb-CyovEygWCEedyg7UEeV7dI",
  authDomain: "proffertrack.firebaseapp.com",
  projectId: "proffertrack",
  storageBucket: "proffertrack.firebasestorage.app",
  messagingSenderId: "68707871575",
  appId: "1:68707871575:web:9121236c5ffcbe67bfec12"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
