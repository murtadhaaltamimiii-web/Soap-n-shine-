import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

// Firebase config from environment variables (secure)
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// GUARD CLAUSE: Prevent initialization during build if env vars are missing
// This happens during Vercel static page generation (SSG/ISR)
let app: FirebaseApp | null = null;
let auth: Auth | null = null;

if (firebaseConfig.apiKey && typeof window !== 'undefined') {
    // Only initialize on the client-side when API key is available
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
}

export { auth };
export default app;
